import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { IMessage } from '../../models/message/message';
import { UpdateMessageModal } from '../UI/UpdateMessageModal/UpdateMessageModal';
import { $socket } from '../../http';
import { groupSlice } from '../../store/reducers/group/slices/GroupSlice';
import { fetchGroup, fetchGroupMessage } from '../../store/reducers/group/GroupService';

export const MessageList: FC<{id: string}> = ({ id }) => {

  const { messages, isLoading, hasMoreMessages } = useAppSelector(state => state.groupReducer);

  const [selectedMessage, setSelectedMessage] = useState<IMessage | null>(null);
  const [page, setPage] = useState(1);

  const messagesRef = useRef<HTMLDivElement>(null);
  const observer = useRef<IntersectionObserver>();

  const lastMessageElement = useCallback(node => {
    if(isLoading) return;
    if(observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting && hasMoreMessages) {
        dispatch(fetchGroupMessage({ id, page: page + 1, pageSize: 10 }));
        setPage(prevPage => prevPage + 1);
        console.log('intersecting');
      }
    });
    if(node) observer.current.observe(node);

  }, [isLoading, hasMoreMessages]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleMessage = (data: any) => {
      dispatch(groupSlice.actions.createMessage(data));
    };

    $socket.on('message', handleMessage);

    return () => {
      $socket.removeListener('message', handleMessage);
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchGroup({ id, page: 1, pageSize: 10 }));
    setPage(1);
    localStorage.setItem('lastGroupId', id);
  }, [id]);

  if (messagesRef.current && page === 1) {
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }

  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>, message: IMessage) => {
    e.preventDefault();
    setSelectedMessage(message);
  };

  return (
    <div className='messages' ref={messagesRef}>
      {messages && messages  ? (
        messages.map((el: IMessage, index: number) => {
          if (index === 0) {
            return <div key={el.id}>
              <div
                onContextMenu={(e) => handleContextMenu(e, el)}
                className={'message'}
                ref={lastMessageElement}
              >
                <div className='user-info'>
                  <img src={el.user.userAvatar} className='avatar'/>
                  <div className='username'>{el.user.username}</div>
                </div>
                <p className='text'>{el.message}</p>
              </div>
              <UpdateMessageModal
                isModal={selectedMessage === el}
                message={el}
                setModal={() => setSelectedMessage(null)}
              />
            </div>;
          } else {
            return <React.Fragment key={el.id}>
              <div
                onContextMenu={(e) => handleContextMenu(e, el)}
                className={`message-${el.userId === Number(localStorage.getItem('userId'))}`}
              >
                <div className='user-info'>
                  <img src={el.user.userAvatar} className='avatar'/>
                  <div className='username'>{el.user.username}</div>
                </div>
                <p className='text'>{el.message}</p>
              </div>
              <UpdateMessageModal
                isModal={selectedMessage === el}
                message={el}
                setModal={() => setSelectedMessage(null)}
              />
            </React.Fragment>;
          }
        }
        )
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};
