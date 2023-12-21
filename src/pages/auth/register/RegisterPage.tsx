import { useState, useContext } from "react"
import { Context } from "../../../main"
import { observer } from 'mobx-react-lite';

const RegisterPage = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [username, setUsername] = useState<string>('')

  const {auth} = useContext(Context)

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
          <button onClick={() => auth.register(email, username, password)}>register</button> 
      </div>
  )
}

export default observer(RegisterPage)