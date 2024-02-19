import { FC } from 'react';
import { CreateGroupForm } from '../../CreateGroupForm';
import './CreateGroupModal.css';
interface CreateGroupModalProps {
    setModal: (value: boolean) => void
    isModal: boolean
}

export const CreateGroupModal: FC<CreateGroupModalProps> = ( props ) => {

  return (
    <div>{
      props.isModal &&
                <div onClick={() => props.setModal(false)} className="modal-background">
                  <div className="modal" onClick={(e) => e.stopPropagation()}>
                    <CreateGroupForm setModal={props.setModal}/>
                  </div>
                </div>
    }</div>
  );
};
