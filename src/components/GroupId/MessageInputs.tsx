import { FC } from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { sendMessage } from '../../store/reducers/group/GroupService';

interface MessageInputsProps {
    id: string;
    text: string;
    setText: (text: string) => void;
}
export const MessageInputs: FC<MessageInputsProps> = ({ id, text, setText }) => {

  const dispatch = useAppDispatch();

  const handleSendMessage = () => {
    if (id) {
      const groupId = parseInt(id, 10);
      dispatch(sendMessage({ message: text, groupId }));
    }
  };
  return (
    <div className="inputs">
      <button onClick={handleSendMessage}>send</button>
      <input value={text} onChange={(e) => setText(e.target.value)} type="text" />
    </div>
  );
};
