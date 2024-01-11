import { FC, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchGroup, onTyping, sendMessage } from '../../store/reducers/group/GroupService';
import { $socket } from '../../http';
import { groupSlice, onTypingInterface } from '../../store/reducers/group/slices/GroupSlice';
import GroupInfo from '../../components/GroupInfo/GroupInfo';
import './GroupId.css'

export const GroupId: FC = () => {
  const [text, setText] = useState<string>('');
  const [groupInfo, setGroupInfo] = useState(false)

  const navigate = useNavigate()

  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { messages, group, isTyping } = useAppSelector(state => state.groupReducer);

  const handleViewGroupsClick = () => {
    navigate('/main')
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

  useEffect(() => {
      if (id) {
        dispatch(onTyping({ groupId: parseInt(id, 10) }));
      }
      const handleOnTyping = (data: onTypingInterface) => {
          if (data.user?.id !== Number(localStorage.getItem('userId'))) {
            dispatch(groupSlice.actions.onTyping({ ...data }));
          }
      }

      $socket.on('typing', handleOnTyping);

      return () => {
        $socket.removeListener('typing');
      };
  }, [text]);

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

  return (
    <div className='groupId'>
      <div onClick={() => setGroupInfo(!groupInfo)} className='header'>
        {isTyping.map((item: onTypingInterface) => (
          <div key={item.user?.id}>
            {item.isTyping && id && item.groupId === parseInt(id, 10) && (
              <div>{item.user?.username} is typing...</div>
            )}
          </div>
        ))}
        <i className='bx bx-left-arrow-alt' style={{ color: '#1b1b1b' }} onClick={handleViewGroupsClick} ></i>
        <img src={group?.groupAvatar} />
        <div>{group?.name}</div>
      </div>
      <div className='content'>
        <div className='messages-box'>
            <div className='messages' ref={messagesRef}>
            {messages && messages ? (
                messages.map(el => (
                <div className={`message-${el.userId === Number(localStorage.getItem('userId'))}`} key={el.id}>
                    <div className='user-info'>
                        <img src={el.user.userAvatar} className='avatar'/>
                        <div className='username'>{el.user.username}</div>
                    </div>
                    <p className='text'>{el.message}</p>
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
        <div className='info-box'>
            <GroupInfo hidden={groupInfo} />
        </div>
      </div>
    </div>
  );
};
