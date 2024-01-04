import { useState } from 'react'
import { observer } from 'mobx-react-lite';
import { useAppDispatch } from '../../../hooks/redux';
import { fetchLogin } from '../../../store/reducers/auth/AuthService';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthSchema } from '../../../validation/AuthValidation';
import './LoginPage.css'
const LoginPage = () => {
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
        dispatch(fetchLogin({ email, username, password }))
    }

    return (
        <div className='login'>

        <div className='loginWrapper'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>Login</h1>
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
                <button className='btn' type={'submit'}>login</button>

                <div className='register-link'>
                    <p>Don't have an account? <a href="http://localhost:5173/register">Register</a></p>
                </div>
            </form>
        </div>
        </div>


    )
}

export default observer(LoginPage)