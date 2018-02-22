import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';
import UsersList from './components/UsersList';
import AddUser from './components/AddUser';


class App extends Component {
    constructor() {
        super()
        this.state = {
            users: [],
            username: '',
            email: ''
        }
    }

    componentDidMount() {
        this.getUsers()
    }

    getUsers() {
        axios.get(`${process.env.REACT_APP_USERS_SERVISE_URL}/users`)
        .then((res) => { 
            this.setState({ users: res.data.data.users }); 
        })
        .catch((err) => {console.log(err);})
    }

    addUser(event) {
        event.preventDefault();
        const data = {
            username: this.state.username,
            email: this.state.email
        }

        axios.post(`${process.env.REACT_APP_USERS_SERVISE_URL}/users`, data)
        .then((res) => {
            this.getUsers();
            this.setState({username: '', email: ''})
        })
        .catch((err) => {console.log(err);})
    }

    handleChange(event) {
        const obj = {};
        obj[event.target.name] = event.target.value;
        this.setState(obj);
    }

    render() {
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-md-6'>
                        <br />
                            <h1>All Users</h1>
                        <hr /><br />
                        <AddUser
                            username={this.state.username}
                            email={this.state.email}
                            handleChange={this.handleChange.bind(this)}
                            addUser={this.addUser.bind(this)}
                        />
                        <br/>
                        <UsersList users={this.state.users}/>
                    </div>
                </div>
            </div>
        )
    }
}


ReactDOM.render(
    <App />,
    document.getElementById('root')
);
registerServiceWorker();
