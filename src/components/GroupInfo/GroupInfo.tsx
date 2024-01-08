import { FC, useState } from 'react';
import './GroupInfo.css';
import { useNavigate, useParams } from 'react-router-dom';
import { leave, onDelete, onJoin } from '../../store/reducers/group/GroupService';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { mainRoutesEnum } from '../../utils/routes';

interface Props {
    hidden: boolean;
}

const GroupInfo: FC<Props> = ({ hidden }) => {
    const [user, setUser] = useState<string>('');
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { users, group } = useAppSelector(state => state.groupReducer);

    const [text, setText] = useState('');
    const [copied, setCopied] = useState(false);

    const handleOnJoin = () => {
        if (id) {
            const userId = parseInt(user, 10);
            const groupId = parseInt(id, 10);
            dispatch(onJoin({ userId, groupId }));
            setUser('');
        }
    };

    const handleOnLeave = () => {
        if (id) {
            dispatch(leave({ groupId: parseInt(id, 10) }));
            navigate(mainRoutesEnum.MAIN);
        }
    };

    const handleOnDelete = () => {
        if (id) {
            dispatch(onDelete({ groupId: parseInt(id, 10) }));
            navigate(mainRoutesEnum.MAIN);
        }
    };

    const handleCopyText = (textToCopy: string) => {
        navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <>
            {hidden && (
                <div className='group-info-content'>
                    <div style={{ color: copied ? 'green' : 'red' }}>{`${copied}`}</div>
                    <div className="group-info">
                        <div className='users-info'>
                            {users && (
                                <div>
                                    {users.map(el => (
                                        <div className='user' key={el.userId}>
                                            <img src={el.user.userAvatar} className="avatar" alt="User Avatar" />
                                            <div>
                                                <div onClick={() => handleCopyText(el.user.email)} className='email'>{el.user.email}</div>
                                                <div onClick={() => handleCopyText(el.user.username)} className='user-name'>{el.user.username}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className='user-info-input'>
                            <button onClick={handleOnJoin}>send</button>
                            <input value={user} onChange={(e) => setUser(e.target.value)} type="text" />
                        </div>

                        {id && <button onClick={handleOnLeave}>leave</button>}
                        {group.userId === Number(localStorage.getItem('userId')) && <button onClick={handleOnDelete}>delete</button>}
                    </div>
                </div>
            )}
        </>
    );
};

export default GroupInfo;
