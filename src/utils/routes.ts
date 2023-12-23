import ConfirmUser from '../pages/auth/ConfirmUserPage';
import LoginPage from '../pages/auth/login/LoginPage';
import RegisterPage from '../pages/auth/register/RegisterPage';
import MainPage from '../pages/main/MainPage';

export enum authRoutesEnum {
    LOGIN = 'login',
    REGISTER = 'register',
    CONFIRM = 'confirm/user/:id'
}


export enum mainRoutesEnum {
    MAIN = 'main',
}


export const publicRoutes = [
    {
        path: authRoutesEnum.LOGIN,
        exact: true,
        Component: LoginPage
    },
    {
        path: authRoutesEnum.REGISTER,
        exact: true,
        Component: RegisterPage
    },
    {
        path: authRoutesEnum.CONFIRM,
        exact: true,
        Component: ConfirmUser
    }
]

export const privateRoutes = [
    {
        path: mainRoutesEnum.MAIN,
        exact: true,
        Component: MainPage
    }
]
