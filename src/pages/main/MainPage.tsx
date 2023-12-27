import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { createGroup, fetchGroups } from '../../store/reducers/group/GroupService';
import { IUserToGroups } from '../../models/group/userToGroups';

const MainPage = () => {
  const dispatch = useAppDispatch();
  const { groups, createCgroup } = useAppSelector(state => state.groupsReducer);
  const [text, setText] = useState<string>('');

  useEffect(() => {
    dispatch(fetchGroups());
  }, [createCgroup]);

  return (
    <div>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={() => dispatch(createGroup(text))}>send</button> <br />
      {groups.map((el: IUserToGroups, index) => (
        <div key={index}>{el.group.name}</div>
      ))}
    </div>
  );
};

export default MainPage;
