import React from 'react';

const Form = (props) => {
    <div>
        <h1>{props.formType}</h1>
        <hr/><br/>
        <form onSubmit={(event) => props.handleUserFormSubmit(event)}>
            {props.FormType === 'Register' &&
                <div className="form-group">
                    <input 
                        name='username'
                        className="form-control input-lg"
                        placeholder="Enter a username"
                        required
                        value={props.formData.username}
                        onChange={props.handleFormChange}
                    />
                </div>
            }
            <div className="form-group">
                <input
                    name='email'
                    className='form-control import-lg'
                    type='email'
                    placeholder='Enter an email addres'
                    required
                    value={props.formData.email}
                    onChange={props.handleFormChange}
                />
            </div>
            <div className="form-group">
                <input
                    name='password'
                    className='form-control import-lg'
                    type='password'
                    placeholder='Enter a password'
                    required
                    value={props.formData.password}
                    onChange={props.handleFormChange}
                />
            </div>
            <input
                type="submit"
                className="btn btn-primary btn-lg btn-block"
                value="Submit"
            />
        </form>
    </div>
}

export default Form
