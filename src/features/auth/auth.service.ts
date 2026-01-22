import api from "../../services/api";

export const loginApi = (data: any) => api.post("/login", data);
