import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchGroup, sendMessage } from '../../store/reducers/group/GroupService';
import { $socket } from '../../http';
import { groupSlice } from '../../store/reducers/group/slices/GroupSlice';
import GroupInfo from '../../components/GroupInfo/GroupInfo';
import './GroupId.css'

export const GroupId: FC = () => {
  const [text, setText] = useState<string>('');
  const [groupInfo, setGroupInfo] = useState(false)

  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { messages, group } = useAppSelector(state => state.groupReducer);

  useEffect(() => {
    if (id) {
      dispatch(fetchGroup(id));
    }

  }, [id]);

  useEffect(() => {
    const handleMessage = (data: any) => {
      dispatch(groupSlice.actions.createMessage(data));
    };

    $socket.on('message', handleMessage);

    return () => {
      $socket.removeListener('message', handleMessage);
    };

  }, [id]);


  const handleSendMessage = () => {
    if (id) {
      const groupId = parseInt(id, 10);
      dispatch(sendMessage({ message: text, groupId }));
    }
  };

  return (
    <div className='groupId'>
      <div onClick={() => setGroupInfo(!groupInfo)} className='header'>
        <img src={group?.groupAvatar} />
        <div>{group?.name}</div>
      </div>
      <div className='messages-box'>
        <div className='messages'>
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
        <GroupInfo hidden={groupInfo} />
      </div>
    </div>
  );

};
