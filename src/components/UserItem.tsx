import React from 'react'
import { IUserToGroups } from '../models/group/userToGroups'



export const UserItem: React.FC<{userToGroups: IUserToGroups}> = ({ userToGroups }) => {

  return (
    <div>
        {userToGroups.user.username}
    </div>
  )
}
