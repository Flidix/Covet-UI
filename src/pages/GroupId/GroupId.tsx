import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux';
import { fetchGroup } from '../../store/reducers/group/GroupService';
import './GroupId.css';
import GroupInfo from '../../components/GroupInfo/GroupInfo';
import { HeaderGroupId } from '../../components/GroupId/HeaderGroupId';
import { MessageList } from './../../components/GroupId/MessageList';
import { MessageInputs } from '../../components/GroupId/MessageInputs';



export const GroupId: FC = () => {
  const [text, setText] = useState<string>('');
  const [groupInfo, setGroupInfo] = useState(false);

  const { id } = useParams<{ id: string }>();

  return (
    <div className='group-id'>
      <HeaderGroupId
        text={text}
        id={id}
        groupInfo={groupInfo}
        setGroupInfo={setGroupInfo}
      />
      <div className='content'>
        <div className='messages-box'>
          {id && (
            <>
              <MessageList
                id={id}
              />
              <MessageInputs
                setText={setText}
                text={text}
                id={id}
              />
            </>

          )}
        </div>
        <div className='info-box'>
          <GroupInfo hidden={groupInfo} />
        </div>
      </div>
    </div>
  );
};