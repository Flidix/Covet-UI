import React, { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchGroups } from '../../store/reducers/group/GroupService';
import { IUserToGroups } from '../../models/group/userToGroups';
import { useNavigate } from 'react-router-dom';
import { $socket } from '../../http';
import { groupsSlice } from '../../store/reducers/group/slices/GroupsSlice';
import { groupSlice } from '../../store/reducers/group/slices/GroupSlice';
import { ILeaveResponse } from '../../models/responses/leaveResponse';
import './MainPage.css';
import { CreateGroupModal } from '../../components/UI/CreateGroupModal/CreateGroupModal';
import { mainRoutesEnum } from '../../utils/routes';

interface MainPageProps {
  children?: React.ReactNode;
}

const MainPage: FC<MainPageProps> = ({ children }) => {
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { groups } = useAppSelector((state) => state.groupsReducer);
  const { showGroups } = useAppSelector((state) => state.groupReducer);

  useEffect(() => {
    dispatch(fetchGroups());
    navigate('/group/' + localStorage.getItem('lastGroupId'));

  }, []);

  useEffect(() => {
    const handleOnJoin = (data: { group: IUserToGroups }) => {
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
      dispatch(groupsSlice.actions.onLeave(data));
      dispatch(groupSlice.actions.onLeave(data));
    };

    $socket.on('leave', handleLeave);

    return () => {
      $socket.removeListener('leave', handleLeave);
    };
  }, []);

  useEffect(() => {
    const handleDelete = (data: ILeaveResponse) => {
      console.log(data);
      dispatch(groupsSlice.actions.onDelete(data));
    };

    $socket.on('delete', handleDelete);

    return () => {
      $socket.removeListener('delete', handleDelete);
    };
  }, []);

  const handleViewGroupsClick = (id: number) => {
    navigate('/group/' + id)
    dispatch(groupSlice.actions.showGroups())
  }

  return (
    <div className='main' style={{ display: 'flex' }}>
      <div className='settings' onClick={() => navigate({ pathname: mainRoutesEnum.SETTING })}>
        <i className='bx bx-cog' style={{ color: '#e5c200' }} ></i>
      </div>
      <CreateGroupModal setModal={setModal} isModal={modal} />
      {showGroups ? (
        <div className="groups-fullscreen">
          <i onClick={() => setModal(!modal)} className='bx bxs-plus-circle' style={{ color: '#fddf2f' }} ></i>
          {groups && groups.map((el: IUserToGroups) => (
            <div className='group' key={el.group.id} onClick={() => handleViewGroupsClick(el.group.id)}>
              {el.group.groupAvatar && <img src={el.group.groupAvatar} />}{el.group.name && el.group.name}
            </div>
          ))}
        </div>
      ) : (
        <>
        <div className="groups">
          <i onClick={() => setModal(!modal)} className='bx bxs-plus-circle' style={{ color: '#fddf2f' }} ></i>
          {groups && groups.map((el: IUserToGroups) => (
            <>
              {el.group.id === Number(localStorage.getItem('lastGroupId')) ? (
                <div className='current-group-id' key={el.group.id} onClick={() => handleViewGroupsClick(el.group.id)}>
                  {el.group.groupAvatar && <img src={el.group.groupAvatar} />}{el.group.name && el.group.name}
                </div>
              ) : (
              <div className='group' key={el.group.id} onClick={() => navigate('/group/' + el.group.id)}>
                {el.group.groupAvatar && <img src={el.group.groupAvatar} />}{el.group.name && el.group.name}
              </div>
              )}
            </>
          ))}
        </div>
        <div className='contentGroupId'>{children}</div>
        </>
      )}
    </div>
  );
};

export default MainPage;
