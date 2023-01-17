import {  LockOutlined, UserOutlined, } from '@ant-design/icons';
import { LoginForm, ProFormCheckbox, ProFormText, ProConfigProvider, } from '@ant-design/pro-components';
import { message } from 'antd';
import {Link, useNavigate} from "react-router-dom";
import "./less/Login.less"
import {LoginApi} from "../request/api";

function Login() {
    const navigate = useNavigate();

    const onFinish = (values) => {
        console.log('Success:', values);
        LoginApi({
            user_name: values.username,
            password: values.password,
        }).then(res=>{
            console.log(res)
            if (res.status === 200){
                localStorage.setItem("token",res.data.token);
                localStorage.setItem("user_name",res.data.user.user_name);
                // 跳转
                setTimeout(()=>{
                    navigate('/')
                },750)
            }else{
                message.error(res.msg).then(r => "")
            }
        })
    };

    return (
        <div className="login">
            <div className="login_box">
                <ProConfigProvider hashed={false}>
                <div style={{ backgroundColor: 'white' }}>
                <LoginForm
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                <h1>登陆</h1>
                <ProFormText
                    name="username"
                    fieldProps={{
                        size: 'large',
                        prefix: <UserOutlined className={'prefixIcon'}/>}}
                    placeholder={'请输入用户名'}
                    rules={[{
                        required: true,
                        message: '请输入用户名!'},
                ]}/>
                <ProFormText.Password
                    name="password"
                    fieldProps={{
                        size: 'large',
                        prefix: <LockOutlined className={'prefixIcon'}/>}}
                    placeholder={'请输入密码'}
                    rules={[{
                        required: true,
                        message: '请输入密码！'}]}/>
                <div style={{marginBlockEnd: 24}}>
                    <ProFormCheckbox noStyle name="autoLogin">
                        记住密码
                    </ProFormCheckbox>
                    <Link style={{
                        float: 'right',
                    }} to="/register">还没账号?立即注册</Link>
                </div>
            </LoginForm>
                    </div>
        </ProConfigProvider>
            </div>
        </div>);
}

export default Login;