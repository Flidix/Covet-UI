import { FC, useEffect } from 'react';
import './UpdateMessageModal.css';
import { IMessage } from '../../../models/message/message';
import { useAppDispatch } from '../../../hooks/redux';
import { onDeleteMessage, onUpdateMessage } from '../../../store/reducers/group/GroupService';
import { deleteMessageResponse, groupSlice, onUpdateMessageResponse } from '../../../store/reducers/group/slices/GroupSlice';
import { $socket } from '../../../http';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { UpdateMessageSchema } from '../../../validation/UpdateMessageValidation';

interface UpdateMessageModalProps {
  setModal: () => void;
  isModal: boolean;
  message: IMessage;
}

export const UpdateMessageModal: FC<UpdateMessageModalProps> = (props) => {

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(UpdateMessageSchema),
  });

  useEffect(() => {
    const handleOnDeleteMessage = (data: deleteMessageResponse) => {
      dispatch(groupSlice.actions.onDeleteMessage(data));
    };

    $socket.on('deleteMessage', handleOnDeleteMessage);

    return () => {
      $socket.removeListener('deleteMessage');
    };
  }, []);

  const handleDeleteMessage = (messageId: number) => {
    dispatch(onDeleteMessage({ messageId }));
  };

  useEffect(() => {
    const handleOnUpdateMessage = (data: onUpdateMessageResponse) => {
      dispatch(groupSlice.actions.onUpdateMessage(data));
    };

    $socket.on('updateMessage', handleOnUpdateMessage);

    return () => {
      $socket.removeListener('updateMessage', handleOnUpdateMessage);
    };
  }, []);

  const handleUpdateMessage = (data: { text: string }) => {
    dispatch(onUpdateMessage({ messageId: props.message.id, message: data.text }));
  };

  return (
    <div>
      {props.isModal && (
        <div onClick={props.setModal} className="message-modal-background">
          <div className="message-modal" onClick={(e) => e.stopPropagation()}>
            <div className='delete-message'>
              <button onClick={() => handleDeleteMessage(props.message.id)}>delete</button>
            </div>
            <form onSubmit={handleSubmit(handleUpdateMessage)}>
              <div className='update-message'>
                <input
                  {...register('text')}
                  defaultValue={props.message.message}
                  type="text"
                />
                <button type='submit'>update</button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
};
