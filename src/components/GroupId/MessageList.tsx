import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { IMessage } from '../../models/message/message';
import { UpdateMessageModal } from '../UI/UpdateMessageModal/UpdateMessageModal';
import { $socket } from '../../http';
import { groupSlice } from '../../store/reducers/group/slices/GroupSlice';
import {
  fetchGroup,
  fetchGroupMessage,
} from '../../store/reducers/group/GroupService';

export const MessageList: FC<{ id: string }> = ({ id }) => {
  const { messages, isLoading, hasMoreMessages } = useAppSelector(
    (state) => state.groupReducer
  );

  const [selectedMessage, setSelectedMessage] = useState<IMessage | null>(null);
  const [page, setPage] = useState(1);

  const messagesRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef(null);
  const lastMessageId = messages[0]?.id;

  useEffect(() => {
    let a = false;
    let b = page;
    const handler = async (e) => {
      if (!messagesRef.current) return;
      if (messagesRef.current.scrollTop <= 40 && !a && hasMoreMessages) {
        a = true;
        setPage((page) => {
          b = page + 1;

          return page + 1;
        });

        await refetch(b);

        const c = document.querySelector(`.message-${lastMessageId}`);
        c?.scrollIntoView({ behavior: 'instant', block: 'end' });

        a = false;
      }
    };

    const setup = async () => {
      if (!messagesRef.current) return;

      messagesRef.current.addEventListener('scroll', handler);
    };

    setup();

    return () => {
      messagesRef.current?.removeEventListener('scroll', handler);
    };
  }, [lastMessageId, isLoading]);

  const refetch = async (page: number) => {
    if (page !== 1) {
      await dispatch(fetchGroupMessage({ id, page, pageSize: 10 }));
      return new Promise((res) => setTimeout(() => res(1), 200));
    } else if (messagesRef.current) {
      setTimeout(() => {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
      }, 100);
    }
  };

  useEffect(() => {
    refetch(1);
  }, []);

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
    localStorage.setItem('lastGroupId', id);
  }, [id]);

  const handleContextMenu = (
    e: React.MouseEvent<HTMLDivElement>,
    message: IMessage
  ) => {
    e.preventDefault();
    setSelectedMessage(message);
  };

  return (
    <div className="messages" ref={messagesRef}>
      <div ref={lastMessageRef} />
      {messages && messages ? (
        messages.map((el: IMessage, index: number) => {
          if (index === 0) {
            return (
              <div className={`message-${el.id}`} key={el.id}>
                <div
                  onContextMenu={(e) => handleContextMenu(e, el)}
                  className={'message'}
                >
                  <div className="user-info">
                    <img src={el.user.userAvatar} className="avatar" />
                    <div className="username">{el.user.username}</div>
                  </div>
                  <p className="text">{el.message}</p>
                </div>
                <UpdateMessageModal
                  isModal={selectedMessage === el}
                  message={el}
                  setModal={() => setSelectedMessage(null)}
                />
              </div>
            );
          } else {
            return (
              <React.Fragment key={el.id}>
                <div
                  onContextMenu={(e) => handleContextMenu(e, el)}
                  className={`message-${el.id} message-${
                    el.userId === Number(localStorage.getItem('userId'))
                  }`}
                >
                  <div className="user-info">
                    <img src={el.user.userAvatar} className="avatar" />
                    <div className="username">{el.user.username}</div>
                  </div>
                  <p className="text">{el.message}</p>
                </div>
                <UpdateMessageModal
                  isModal={selectedMessage === el}
                  message={el}
                  setModal={() => setSelectedMessage(null)}
                />
              </React.Fragment>
            );
          }
        })
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};
