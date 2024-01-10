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

    const [copiedUserId, setCopiedUserId] = useState<number | null>(null);
    const [copiedField, setCopiedField] = useState<string | null>(null);

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

    const handleCopyText = (textToCopy: string, userId: number, field: string) => {
        navigator.clipboard.writeText(textToCopy);
        setCopiedUserId(userId);
        setCopiedField(field);
        setTimeout(() => {
            setCopiedUserId(null);
            setCopiedField(null);
        }, 2000);
    };

    return (
        <>
            {hidden && (
                <div className='group-info-content'>
                    <div className="group-info">
                        <div className='users-info'>
                            {users && (
                                <div>
                                    {users.map(el => (
                                        <div className='user' key={el.userId}>
                                            <img src={el.user.userAvatar} className="avatar" alt="User Avatar" />
                                            <div>
                                                <div className={`email-box ${copiedUserId === el.userId && copiedField === 'email' ? 'copied' : ''}`} onClick={() => handleCopyText(el.user.email, el.userId, 'email')}>
                                                    <i className={`bx bx-${copiedUserId === el.userId && copiedField === 'email' ? 'check' : 'copy'}`} style={{ color:'#e5c200' }}></i>
                                                    <div className='email'>{el.user.email}</div>
                                                </div>
                                                <div className={`user-name-box ${copiedUserId === el.userId && copiedField === 'username' ? 'copied' : ''}`} onClick={() => handleCopyText(el.user.username, el.userId, 'username')}>
                                                    <i className={`bx bx-${copiedUserId === el.userId && copiedField === 'username' ? 'check' : 'copy'}`} style={{ color:'#e5c200' }}></i>
                                                    <div className='user-name'>{el.user.username}</div>
                                                </div>
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
