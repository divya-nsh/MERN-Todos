import express from "express";

/**
 * @param {(req:express.Request & {userId?:string},res:express.Response,next:()=>void)=>Promise<any>} handler
 * @returns {import("express").RequestHandler}
 */
export function handleAsync(handler) {
  return async (res, rej, next) => {
    try {
      await handler(res, rej, next);
    } catch (error) {
      next(error);
    }
  };
}
