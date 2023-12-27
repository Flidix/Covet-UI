import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/AppRouter';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { fetchCheckAuth } from './store/reducers/auth/AuthService';

function App() {

  const { isLoading } = useAppSelector(state => state.confirmAuthReducer)

  const dispatch = useAppDispatch()


  useEffect(() => {
    if (localStorage.getItem('refreshToken')) {
      dispatch(fetchCheckAuth())
    }
  }, [])

  return (
    <div className="app">
      {isLoading
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
