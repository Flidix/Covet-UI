import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { authRoutesEnum, mainRoutesEnum, privateRoutes, publicRoutes } from '../utils/routes';
import { useAppSelector } from '../hooks/redux';

const AppRouter: FC = () => {
  const { isAuth } = useAppSelector(state => state.confirmAuthReducer);

  return (
    <Routes>
      {isAuth ? (
        privateRoutes.map(route => (
          <Route
            key={route.path}
            path={route.path}
            element={route.Component}
          />
        ))
      ) : (
        publicRoutes.map(route => (
          <Route
            key={route.path}
            path={route.path}
            element={route.Component}
          />
        ))
      )}
      <Route
        path="*"
        element={<Navigate to={isAuth ? mainRoutesEnum.MAIN : authRoutesEnum.LOGIN} replace />}
      />
    </Routes>
  );
};

export default AppRouter;