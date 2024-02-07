import { FC, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useAppDispatch } from '../../hooks/redux';
import { fetchConfirmAuth } from '../../store/reducers/auth/AuthService';

const ConfirmUser: FC = () => {

  const dispatch = useAppDispatch()

  const { id } = useParams()

  useEffect(() => {
    if (id) {
      dispatch(fetchConfirmAuth({ id }))
    }
  }, [id])

  return (
    <div>ConfirmUser</div>
  )
}

export default observer(ConfirmUser)
