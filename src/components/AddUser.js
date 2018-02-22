import React from 'react';

const AddUser = (props) => {
    return (
        <form onSubmit={(event) => props.addUser(event)}>
            <div>
                <input
                    name='username'
                    className='form-control input-lg'
                    placeholder='Enter a username'
                    required
                    value={props.username}
                    onChange={props.handleChange}
                />
            </div>
            <div>
                <input
                    name='email'
                    className='form-control input-lg'
                    type='email'
                    placeholder='Enter an email address'
                    required
                    value={props.email}
                    onChange={props.handleChange}
                />
            </div>
            <input
                type='submit'
                className='btn btn-primary btn-lg btn-block'
                value='Submit'
            />
        </form>
    )
}

export default AddUser;
