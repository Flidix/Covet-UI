import { FC } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { authRoutesEnum, mainRoutesEnum, privateRoutes, publicRoutes } from '../utils/routes'
import { observer } from 'mobx-react-lite';
import { useAppSelector } from '../hooks/redux';

const AppRouter: FC = () => {

    const { isAuth } = useAppSelector(state => state.confirmAuthReducer)

    console.log(isAuth,111)
    return (
        isAuth
        ? (
            <Routes>
                {privateRoutes.map((route) => (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={<route.Component/>}
                        caseSensitive={route.exact}
                    />
                ))}
                <Route
                    path="*"
                    element={<Navigate to={mainRoutesEnum.MAIN} replace />}
                />
            </Routes>
        )
        :
        <Routes>
            {publicRoutes.map((route) => (
                <Route
                    key={route.path}
                    path={route.path}
                    element={<route.Component />}
                    caseSensitive={route.exact}
                />
            ))}
            <Route
                path="*"
                element={<Navigate to={authRoutesEnum.LOGIN} replace />}
            />
        </Routes>
    )
}

export default observer(AppRouter)