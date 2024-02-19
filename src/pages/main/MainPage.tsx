import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchGroups, fetchPaginateGroups } from '../../store/reducers/group/GroupService';
import { IUserToGroups } from '../../models/group/userToGroups';
import { useNavigate } from 'react-router-dom';
import { $socket } from '../../http';
import { groupsSlice } from '../../store/reducers/group/slices/GroupsSlice';
import { groupSlice } from '../../store/reducers/group/slices/GroupSlice';
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
  const { groups, isLoading, hasMore } = useAppSelector((state) => state.groupsReducer);
  const { showGroups } = useAppSelector((state) => state.groupReducer);

  const observer = useRef<IntersectionObserver | null>(null);

  const [page , setPage] = useState<number>(1);


  const lastGroup = useCallback((node) => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !hasMore) {
        setPage(prev => prev + 1);
        dispatch(fetchPaginateGroups({ page, pageSize: 10 }));
      }
    });
    if (node) observer.current.observe(node);
  }, [isLoading, hasMore]);


  useEffect(() => {
    dispatch(fetchGroups());
    navigate('/group/' + localStorage.getItem('lastGroupId'));
  }, [dispatch, navigate]);


  useEffect(() => {
    const handleGroup = (data: IUserToGroups) => {
      dispatch(groupsSlice.actions.createGroup(data));
    };

    $socket.on('create', handleGroup);
    return () => {
      $socket.removeListener('create', handleGroup);
    };
  }, []);


  const handleViewGroupsClick = (id: number) => {
    navigate('/group/' + id);
    dispatch(groupSlice.actions.showGroups());
  };

  return (
    <div className='main' style={{ display: 'flex' }}>
      <div className='settings' onClick={() => navigate({ pathname: mainRoutesEnum.SETTING })}>
        <i className='bx bx-cog' style={{ color: '#e5c200' }} ></i>
      </div>
      <CreateGroupModal setModal={setModal} isModal={modal} />
      {showGroups ? (
        <div className="groups-fullscreen">
          <i onClick={() => setModal(!modal)} className='bx bxs-plus-circle' style={{ color: '#fddf2f' }} ></i>
          {groups && groups.map((el: IUserToGroups, index: number) => {
            if(groups.length === index + 1) {
              return <div className='group' ref={lastGroup} key={el.group.id} onClick={() => handleViewGroupsClick(el.group.id)}>
                {el.group.groupAvatar && <img src={el.group.groupAvatar} />}{el.group.name && el.group.name}
              </div>;
            } else {
              return <div className='group' key={el.group.id} onClick={() => handleViewGroupsClick(el.group.id)}>
                {el.group.groupAvatar && <img src={el.group.groupAvatar} />}{el.group.name && el.group.name}
              </div>;
            }
          })}
        </div>
      ) : (
        <>
          <div className="groups">
            <i onClick={() => setModal(!modal)} className='bx bxs-plus-circle' style={{ color: '#fddf2f' }} ></i>
            {groups && groups.map((el: IUserToGroups, index: number) => {
              if(groups.length === index + 1){
                return <div ref={lastGroup}>
                  {el.group.id === Number(localStorage.getItem('lastGroupId')) ? (
                    <div className='current-group-id' key={el.group.id} onClick={() => handleViewGroupsClick(el.group.id)}>
                      {el.group.groupAvatar && <img src={el.group.groupAvatar} />}{el.group.name && el.group.name}
                    </div>
                  ) : (
                    <div className='group' key={el.group.id} onClick={() => navigate('/group/' + el.group.id)}>
                      {el.group.groupAvatar && <img src={el.group.groupAvatar} />}{el.group.name && el.group.name}
                    </div>
                  )}
                </div>;
              } else {
                return <>
                  {el.group.id === Number(localStorage.getItem('lastGroupId')) ? (
                    <div className='current-group-id' key={el.group.id} onClick={() => handleViewGroupsClick(el.group.id)}>
                      {el.group.groupAvatar && <img src={el.group.groupAvatar} />}{el.group.name && el.group.name}
                    </div>
                  ) : (
                    <div className='group' key={el.group.id} onClick={() => navigate('/group/' + el.group.id)}>
                      {el.group.groupAvatar && <img src={el.group.groupAvatar} />}{el.group.name && el.group.name}
                    </div>
                  )}
                </>;
              }
            })}
          </div>
          <div className='contentGroupId'>{children}</div>
        </>
      )}
    </div>
  );
};

export default MainPage;
