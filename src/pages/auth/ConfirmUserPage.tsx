import { FC, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { mainRoutesEnum } from '../../utils/routes';
import { observer } from 'mobx-react-lite';
import { useAppDispatch } from '../../hooks/redux';
import { fetchConfirmAuth } from '../../store/reducers/auth/AuthService';

const ConfirmUser: FC = () => {

  const dispatch = useAppDispatch()

  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (id) {
      dispatch(fetchConfirmAuth({ id }))
      navigate(mainRoutesEnum.MAIN)
    }
  }, [id])

  return (
    <div>ConfirmUser</div>
  )
}

export default observer(ConfirmUser)
