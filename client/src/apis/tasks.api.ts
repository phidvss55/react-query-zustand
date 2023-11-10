import http from "../utils/http";

export const getAllTasks = () => http.get<any>("tasks");
