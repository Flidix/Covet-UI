import { useState } from 'react'
import { observer } from 'mobx-react-lite';
import { useAppDispatch } from '../../../hooks/redux';
import { fetchRegister } from '../../../store/reducers/auth/AuthService';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { AuthSchema } from '../../../validation/AuthValidation';
import './RegisterPage.css'
const RegisterPage = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [username, setUsername] = useState<string>('')

  const dispatch = useAppDispatch()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(AuthSchema),
    })

    const onSubmit = (data: any) => {
        console.log(data)
        dispatch(fetchRegister({ email, username, password }))
    }

  return (
        <div className='register'>
            <div className="registerWrapper">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1>Register</h1>
                    <div className='input-box'>
                        <input
                            {...register('email')}
                            type="text"
                            value={email}
                            placeholder='email'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && <div className='error'>{errors.email.message}</div>}
                    </div>
                    <div className="input-box">
                        <input
                            {...register('password')}
                            type="password"
                            placeholder='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.email && <div className='error'>{errors.password?.message}</div>}
                    </div>
                    <div className="input-box">
                        <input
                            {...register('username')}
                            type="username"
                            placeholder='username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        {errors.email && <div className='error'>{errors.username?.message}</div>}
                    </div>
                    <button className='btn' type={'submit'}>register</button>

                    <div className='login-link'>
                        <p>Already have an account? <a href="http://localhost:5173/login">Login</a></p>
                    </div>
                </form>
            </div>
      </div>
  )
}

export default observer(RegisterPage)