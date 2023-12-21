import { BrowserRouter } from "react-router-dom"
import AppRouter from './components/AppRouter';
import { useContext, useEffect } from "react";
import { Context } from "./main";
import { observer } from 'mobx-react-lite';

function App() {

  const {auth} = useContext(Context)

  useEffect(() => {
    if (localStorage.getItem('refreshToken')) {
      auth.checkAuth()
    }
  }, [])

  return (
    <div className="app">
      {auth.isLoading
        ? <div></div>
        :
        <BrowserRouter>
        <AppRouter/>
        </BrowserRouter>
      }
    </div>
  )
}

export default observer(App)
