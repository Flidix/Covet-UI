import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchGroup, sendMessage } from '../../store/reducers/group/GroupService';

export const GroupId: FC = () => {
  const [text, setText] = useState<string>('');
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { messages, createMessage } = useAppSelector(state => state.groupReducer);

  useEffect(() => {
    if (id) {
      dispatch(fetchGroup(id));
    }
  }, [createMessage]);

  const handleSendMessage = () => {
    if (id) {
      const groupId = parseInt(id, 10);
      dispatch(sendMessage({ message: text, groupId }));
    }
  };

  return (
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
  );
};
