import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchGroup, onJoin, sendMessage } from '../../store/reducers/group/GroupService';
import { $socket } from '../../http';
import { groupSlice } from '../../store/reducers/group/slices/GroupSlice';

export const GroupId: FC = () => {
  const [text, setText] = useState<string>('');
  const [user, setUser] = useState<string>('');

  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { messages, users, createUser } = useAppSelector(state => state.groupReducer);

  useEffect(() => {
    if (id) {
      dispatch(fetchGroup(id));
    }

  }, [id, createUser]);

  useEffect(() => {
    const handleMessage = (data: any) => {
      dispatch(groupSlice.actions.createMessage(data));
    };

    $socket.on('message', handleMessage);

    return () => {
      $socket.removeListener('message', handleMessage);
    };

  }, [id]);


  useEffect(() => {
    const handleOnJoin = (data: any) => {
      dispatch(groupSlice.actions.onJoin(data));
    };

    $socket.on('join', handleOnJoin);



    return () => {
      $socket.removeListener('join', handleOnJoin);
    };
  }, [id])

  const handleSendMessage = () => {
    if (id) {
      const groupId = parseInt(id, 10);
      dispatch(sendMessage({ message: text, groupId }));
    }
  };

  const handleOnJoin = () => {
    if (id) {
      const userId = parseInt(user, 10);
      const groupId = parseInt(id, 10);
      dispatch(onJoin({ userId, groupId }));
    }
  }

  return (
    <div style={{ display: 'flex' }}>
      <div>
        <div>
          {messages && messages ? (
            messages.map(el => <div key={el.id}>{el.message}</div>)
          ) : (
            <div>Loading...</div>
          )}
        </div>
        <input value={text} onChange={(e) => setText(e.target.value)} type="text" />
        <button onClick={handleSendMessage}>send</button>
      </div>
      <div>
        {users &&
          <div style={{ alignItems: 'space-between' }}>
            {users && users.map(el => <div>{el.user.username}</div>)}
          </div>
        }

        <input value={user} onChange={(e) => setUser(e.target.value)} type="text" />
        <button onClick={handleOnJoin}>send</button>
      </div>
    </div>
  );
};
