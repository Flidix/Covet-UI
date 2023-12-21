import { FC, useContext } from "react"
import { Context } from "../main"
import { Navigate, Route, Routes } from "react-router-dom"
import { authRoutesEnum, mainRoutesEnum, privateRoutes, publicRoutes } from "../utils/routes"
import { observer } from 'mobx-react-lite';

const AppRouter: FC = () => {

    const {auth} = useContext(Context)

    console.log(auth.isAuth);
    
    return (
        auth.isAuth
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