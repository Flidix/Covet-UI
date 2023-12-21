import { FC, useContext, useEffect } from "react"
import { Context } from "../../main"
import { useNavigate, useParams } from 'react-router-dom';
import { mainRoutesEnum } from "../../utils/routes";
import { observer } from 'mobx-react-lite';

const ConfirmUser: FC = () => {

  const {auth} = useContext(Context)
  const {id} = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (id) {
      auth.confirm(id);
      navigate(mainRoutesEnum.MAIN)
    }
  }, [id])

  return (
    <div>ConfirmUser</div>
  )
}

export default observer(ConfirmUser)
