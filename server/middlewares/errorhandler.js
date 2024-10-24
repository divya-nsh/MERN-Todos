//@ts-check
import express from "express";
import mongoose from "mongoose";
import { ApiError } from "../utils/error.js";

/**
 * @type {express.ErrorRequestHandler}
 */
export function errorHanlder(err, req, res, next) {
  let error = {
    statusCode: 500,
    message: "Internal Server Error",
  };

  if (err.type === "entity.parse.failed") {
    error.statusCode = 400;
    error.message = "Invalid JSON format";
  }

  if (err.type === "entity.too.large") {
    error.statusCode = 413;
    error.message = "Request entity too large";
  }

  if (isMongoUniquErr(err)) {
    let keys = Object.keys(err.keyValue);
    const errors = keys.map((k) => ({
      [k]: {
        message: `Path ${k} with given value already exists`,
        kind: "DUPLICATE_KEY_ERROR",
      },
    }));
    error.statusCode = 409;
    error.message = errors[0][keys[0]].message;
    error.kind = "DUPLICATE_KEY_ERROR";
    // error.errors = errors;
  }

  if (isMongooseValidationErr(err)) {
    error.statusCode = 400;
    error.message = err.message;
    error.errors = flatternMongooseValErr(err);
    error.kind = "VALIDATION_ERROR";
  }

  if (typeof err === "string") {
    error = {
      statusCode: 400,
      message: err,
    };
  }

  if (err instanceof ApiError) {
    error.statusCode = err.statuscode;
    error.message = err.message;
    if (err.errors?.length) error.errors = err.errors;
  }

  if (error.statusCode === 500 && process.env.NODE_ENV !== "production") {
    error.stack = err?.stack;
    error.message = err?.message;
  }

  res.status(error.statusCode || 500).json(error);
}

function isMongoUniquErr(error) {
  return (
    error instanceof mongoose.mongo.MongoServerError && error.code === 11000
  );
}

function isMongooseValidationErr(error) {
  return error instanceof mongoose.Error.ValidationError;
}

export function flatternMongooseValErr(err, addValue = false, addPath = false) {
  const flatternError = {};
  if (err instanceof mongoose.Error.ValidationError) {
    for (const key in err.errors) {
      const fieldError = err.errors[key];
      flatternError[key] = {
        message: fieldError.message || "",
        path: fieldError.path || "",
        kind: fieldError.kind === "user defined" ? "custom" : fieldError.kind,
        name: fieldError.name,
      };

      if (addValue) {
        flatternError[key].value = fieldError.value;
      }
    }
  }
  return flatternError;
}
