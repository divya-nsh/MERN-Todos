import { apiRq } from "../utils/apiRq";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    async mutationFn(v: { email: string; password: string }) {
      await apiRq.post("/user/login", v);
    },
    onSuccess() {
      navigate("/");
    },
  });
};

export const useSignup = () => {
  const navigate = useNavigate();

  return useMutation({
    async mutationFn(v: { email: string; password: string; name: string }) {
      await apiRq.post("/user/signup", v);
    },
    onSuccess() {
      navigate("/");
    },
  });
};
