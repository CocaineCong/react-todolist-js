import request from "./request";

export const RegisterApi =(params)=> request.post('/user/register',params)

export const LoginApi =(params)=> request.post('/user/login',params)
