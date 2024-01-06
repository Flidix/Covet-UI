import { FC, useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchGroup, leave, onDelete, onJoin, sendMessage } from '../../store/reducers/group/GroupService';
import { $socket } from '../../http';
import { groupSlice } from '../../store/reducers/group/slices/GroupSlice';
import { mainRoutesEnum } from '../../utils/routes';
import './GroupId.css';

export const GroupId: FC = () => {
  const [text, setText] = useState<string>('');
  const [user, setUser] = useState<string>('');

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { messages, users, group } = useAppSelector(state => state.groupReducer);

  const handleViewGroupsClick = () => {
    dispatch(groupSlice.actions.showGroups())
  };

  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (id) {
      dispatch(fetchGroup(id));
      localStorage.setItem('lastGroupId', id);
    }
  }, [id]);

  useEffect(() => {
    const handleMessage = (data: any) => {
      dispatch(groupSlice.actions.createMessage(data));
      scrollToBottom();
    };

    $socket.on('message', handleMessage);

    return () => {
      $socket.removeListener('message', handleMessage);
    };
  }, [id, messages]);

  const scrollToBottom = () => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  };

  const handleSendMessage = () => {
    if (id) {
      const groupId = parseInt(id, 10);
      dispatch(sendMessage({ message: text, groupId }));
      scrollToBottom();
    }
  };

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
      navigate(mainRoutesEnum.MAIN);
    }
  }

  const handleOnDelete = () => {
    if (id) {
      dispatch(onDelete({ groupId: parseInt(id, 10) }));
      navigate(mainRoutesEnum.MAIN);
    }
  }

  return (
    <div className='groupId'>
      <div className='header'>
        <button className="view-groups-button" onClick={handleViewGroupsClick}>
          View Groups
        </button>
        <img src={group?.groupAvatar} alt="Group Avatar" />
        <div>{group?.name}</div>
      </div>
      <div className='messages-box'>
        <div className='messages' ref={messagesRef}>
          {messages && messages ? (
            messages.map(el => (
              <div className={`message-${el.userId === Number(localStorage.getItem('userId'))}`} key={el.id}>
                <p>{el.message}</p>
              </div>
            ))
          ) : (
            <div>Loading...</div>
          )}
        </div>
        <div className="inputs">
          <button onClick={handleSendMessage}>send</button>
          <input value={text} onChange={(e) => setText(e.target.value)} type="text" />
        </div>
      </div>
      <div>
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
      </div>
    </div>
  );
};
