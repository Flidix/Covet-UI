import { FC, useEffect } from 'react';
import { groupSlice, onTypingInterface } from '../../store/reducers/group/slices/GroupSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useNavigate } from 'react-router-dom';
import { $socket } from '../../http';
import { onTyping } from '../../store/reducers/group/GroupService';

interface HeaderGroupIdProps {
    id: string | undefined
    groupInfo: boolean
    text: string
    setGroupInfo: (value: boolean) => void
}

export const HeaderGroupId: FC<HeaderGroupIdProps> = ({ id, text, groupInfo, setGroupInfo }) => {

  const { group, isTyping } = useAppSelector(state => state.groupReducer);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(onTyping({ groupId: parseInt(id, 10) }));
    }
    const handleOnTyping = (data: onTypingInterface) => {
      if (data.user?.id !== Number(localStorage.getItem('userId'))) {
        dispatch(groupSlice.actions.onTyping({ ...data }));
      }
    };

    $socket.on('typing', handleOnTyping);

    return () => {
      $socket.removeListener('typing');
    };
  }, [text]);


  const handleViewGroupsClick = () => {
    navigate('/main');
    dispatch(groupSlice.actions.showGroups());
  };

  return (
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
  );
};
