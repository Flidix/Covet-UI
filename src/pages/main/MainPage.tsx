import React, { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { createGroup, fetchGroups } from '../../store/reducers/group/GroupService';
import { IUserToGroups } from '../../models/group/userToGroups';
import { useNavigate } from 'react-router-dom';
import { $socket } from '../../http';
import { groupsSlice } from '../../store/reducers/group/slices/GroupsSlice';
import { groupSlice } from '../../store/reducers/group/slices/GroupSlice';
import { ILeaveResponse } from '../../models/responses/leaveResponse';

interface MainPageProps {
  children?: React.ReactNode;
}

const MainPage: FC<MainPageProps> = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { groups } = useAppSelector((state) => state.groupsReducer);
  const [text, setText] = useState<string>('');

  useEffect(() => {
    dispatch(fetchGroups());
  }, []);

  useEffect(() => {
    const handleOnJoin = (data: {group: IUserToGroups}) => {
      dispatch(groupsSlice.actions.joinGroup(data));

      dispatch(groupSlice.actions.onJoin(data.group));
    };
    $socket.on('join', handleOnJoin);
    return () => {
      $socket.removeListener('join', handleOnJoin);
    };
  }, []);

  useEffect(() => {
    const handleGroup = (data: IUserToGroups) => {
      dispatch(groupsSlice.actions.createGroup(data));
    };
    $socket.on('create', handleGroup);
    return () => {
      $socket.removeListener('create', handleGroup);
    };
  }, []);

  useEffect(() => {
    const handleLeave = (data: ILeaveResponse) => {
      console.log('Handling leave event:', data);
      dispatch(groupsSlice.actions.onLeave(data));
      dispatch(groupSlice.actions.onLeave(data));
    };

    console.log('Adding leave event listener');

    $socket.on('leave', handleLeave);

    return () => {
      console.log('Removing leave event listener');
      $socket.removeListener('leave', handleLeave);
    };

  }, []);




  return (
    <div style={{ display: 'flex' }}>
      <div>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
        <button onClick={() => dispatch(createGroup(text))}>send</button> <br />
        {groups && groups.map((el: IUserToGroups) => (
          <div key={el.group.id} onClick={() => navigate('/group/' + el.group.id)}>
            {el.group.name && el.group.name}
          </div>
        ))}
      </div>
      <div style={{ margin: '40px' }}>{children}</div>
    </div>
  );
};

export default MainPage;