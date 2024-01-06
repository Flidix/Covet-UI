import { FC, useState } from 'react';
import './GroupInfo.css'
import { useNavigate, useParams } from 'react-router-dom';
import { leave, onDelete, onJoin } from '../../store/reducers/group/GroupService';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { mainRoutesEnum } from '../../utils/routes';

interface props {
    hidden: boolean
}

export const GroupInfo: FC<props> = ({ hidden }) => {

    const [user, setUser] = useState<string>('');
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const { users, group } = useAppSelector(state => state.groupReducer);

    const handleOnJoin = () => {
        if (id) {
            const userId = parseInt(user, 10);
            const groupId = parseInt(id, 10);
            dispatch(onJoin({ userId, groupId }));
            setUser('');
        }
    }

    const handleOnLeave = () => {
        if (id) {
            dispatch(leave({ groupId: parseInt(id, 10) }));
            navigate(mainRoutesEnum.MAIN)
        }
    }

    const handleOnDelete = () => {
        if (id) {
            dispatch(onDelete({ groupId: parseInt(id, 10) }));
            navigate(mainRoutesEnum.MAIN)
        }
    }

    return (
        <>
            {hidden &&
                <div className="group-info">
                    {users && (
                        <div style={{ alignItems: 'space-between' }}>
                            {users.map(el => (
                                <div key={el.userId}>{el.user.username}</div>
                            ))}
                        </div>
                    )}

                    <input value={user} onChange={(e) => setUser(e.target.value)} type="text" />
                    <button onClick={handleOnJoin}>send</button>

                    {id && <button onClick={handleOnLeave}>leave</button>}
                    {group.userId === Number(localStorage.getItem('userId')) && <button onClick={handleOnDelete}>delete</button>}
                </div>}
        </>
    );
};

export default GroupInfo;
