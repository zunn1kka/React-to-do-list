import { $authHost, $host } from "./Index";
import { jwtDecode } from "jwt-decode";
export const registration = async (login, email, password) => {
  const { data } = await $host.post("/api/user/registration", {
    login,
    email,
    password,
  });
  localStorage.setItem("token", data.token);
  return jwtDecode(data.token);
};

export const login = async (login, password) => {
  const { data } = await $host.post("/api/user/login", { login, password });
  localStorage.setItem("token", data.token);
  return jwtDecode(data.token);
};

export const check = async () => {
  const { data } = await $authHost.get("/api/user/auth");
  localStorage.setItem("token", data.token);
  return jwtDecode(data.token);
};
