import { useState } from 'react'
import { observer } from 'mobx-react-lite';
import { useAppDispatch } from '../../../hooks/redux';
import { fetchLogin } from '../../../store/reducers/auth/AuthService';

const LoginPage = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [username, setUsername] = useState<string>('')

    const dispatch = useAppDispatch()

    return (
        <div>
            <input
                type="text"
                value={email}
                placeholder='email'
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input
                type="username"
                placeholder='username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <button onClick={() => dispatch(fetchLogin({ email, username, password }))}>login</button>
        </div>

    )
}

export default observer(LoginPage)