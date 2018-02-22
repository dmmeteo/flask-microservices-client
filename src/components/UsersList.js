import React from 'react';

const UsersList = (props) => {
    return (
        <div>
            {
                props.users.map((user) => {
                    return (
                        <h4 key={user.id} className='well'>
                            username: {user.username} <br/> email: {user.email}
                        </h4>
                    )
                })
            }
        </div>
    )
}

export default UsersList;
