import { GroupId } from '../pages/GroupId/GroupId';
import { SettingPage } from '../pages/Setting/SettingPage';
import ConfirmUserPage from '../pages/auth/ConfirmUserPage';
import LoginPage from '../pages/auth/login/LoginPage';
import RegisterPage from '../pages/auth/register/RegisterPage';
import MainPage from '../pages/main/MainPage';

export enum authRoutesEnum {
    LOGIN = 'login',
    REGISTER = 'register',
    CONFIRM = 'confirm/user/:id',
  }

export enum mainRoutesEnum {
    MAIN = 'main',
    GROUP_ID = 'group/:id',
    SETTING = '/setting',
  }

export const publicRoutes = [
  {
    path: authRoutesEnum.LOGIN,
    exact: true,
    Component: <LoginPage/>,
  },
  {
    path: authRoutesEnum.REGISTER,
    exact: true,
    Component: <RegisterPage/>,
  },
  {
    path: authRoutesEnum.CONFIRM,
    Component: <ConfirmUserPage/>,
  },
];

export const  privateRoutes = [
  {
    path: mainRoutesEnum.MAIN,
    Component: <MainPage/>,
  },
  {
    path: mainRoutesEnum.GROUP_ID,
    Component: (
      <MainPage>
        <GroupId/>
      </MainPage>
    ),
  },
  {
    path: mainRoutesEnum.SETTING,
    Component: (
      <SettingPage/>
    )
  }
];

