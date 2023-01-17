import request from "./request";

export const RegisterApi =(params)=> request.post('/user/register',params)

export const LoginApi =(params)=> request.post('/user/login',params)

export const TaskListApi = (params) => request.get("/tasks", { params });

export const TaskCreateApi = (params) => request.post("/task", params );

export const TaskUpdateApi = (params) => request.put(`/task/${params.id}`, params );

export const TaskDeleteApi = (params) => request.delete(`/task/${params.id}`);
