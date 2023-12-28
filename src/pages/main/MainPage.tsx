import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  createGroup,
  fetchGroups,
} from '../../store/reducers/group/GroupService';
import { IUserToGroups } from '../../models/group/userToGroups';
<<<<<<< Updated upstream
import { useNavigate } from 'react-router-dom';
=======
import { $socket } from '../../http';
import { groupsSlice } from '../../store/reducers/group/slices/GroupsSlice';
>>>>>>> Stashed changes

interface MainPageProps {
  children?: React.ReactNode;
}

const MainPage: FC<MainPageProps> = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { groups, createCgroup } = useAppSelector(
    (state) => state.groupsReducer
  );
  const [text, setText] = useState<string>('');

  useEffect(() => {
    dispatch(fetchGroups());
  }, [createCgroup]);

  useEffect(() => {
    $socket.on('create', (data: any) => {
      dispatch(groupsSlice.actions.createGroup(data));
    });

    return () => {
      $socket.removeListener('create');
    };
  }, []);

  return (
<<<<<<< Updated upstream
    <div style={{ display: 'flex', }}>
      <div>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
        <button onClick={() => dispatch(createGroup(text))}>send</button> <br />
        {groups.map((el: IUserToGroups) => (
          <div onClick={() => navigate('/group/' + el.group.id)} key={el.group.id}>
            {el.group.name}
          </div>
        ))}
      </div>
      <div style={{ margin: '40px', }}>{children}</div>
=======
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={() => dispatch(createGroup(text))}>send</button> <br />
      {groups.map((el: IUserToGroups, index) => (
        <div key={index}>{el.group.name}</div>
      ))}
>>>>>>> Stashed changes
    </div>
  );
};

export default MainPage;
