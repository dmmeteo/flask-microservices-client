import React, {Component} from 'react';
import axios from 'axios';

class UserStatus extends Component {
    constructor(props){
        super(props)
        this.state = {
            created_at: '',
            email: '',
            id: '',
            username: ''
        }
    }
    componentDidMount(){
        this.getUserStatus();
    }
    getUserStatus(event){
        const options = {
            url: `${process.env.REACT_APP_USERS_SERVICE_URL}/auth/status`,
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${window.localStorage.authToken}`
            }
        };
        return axios(options)
        .then((res) => { 
            let data = res.data.data
            this.setState({
                created_at: data.created_at,
                email: data.email,
                id: data.id,
                username: data.username
            })
        })
        .catch((err) => { console.log(err) })
    }
    render(){
        return (
            <div>
                <ul>
                    <li>
                        <strong>User ID:</strong> {this.state.id}
                    </li>
                    <li>
                        <strong>Email:</strong> {this.state.email}
                    </li>
                    <li>
                        <strong>Username:</strong> {this.state.username}
                    </li>
                </ul>
            </div>
        )
    }
}

export default UserStatus