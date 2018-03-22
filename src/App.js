import React, {Component} from 'react';
import axios from 'axios';
import {Route, Switch} from 'react-router-dom';

import UsersList from './components/UsersList';
import AddUser from './components/AddUser';
import About from './components/About';
import NavBar from './components/NavBar';
import Form from './components/Form';
import Logout from './components/Logout';
import UserStatus from './components/UserStatus';


class App extends Component {
    constructor() {
        super()
        this.state = {
            users: [],
            username: '',
            email: '',
            title: 'FreeTestDriven',
            formData: {
                username: '',
                email: '',
                password: ''
            },
            isAuthenticated: false
        }
    }

    componentDidMount() {
        this.getUsers()
    }

    getUsers() {
        axios.get(`${process.env.REACT_APP_USERS_SERVICE_URL}/users`)
        .then((res) => { 
            this.setState({ users: res.data.data.users }); 
        })
        .catch((err) => {console.log(err);})
    }

    logoutUser() {
        window.localStorage.clear();
        this.setState({isAuthenticated: false});
    }

    addUser(event) {
        event.preventDefault();
        const data = {
            username: this.state.username,
            email: this.state.email
        }

        axios.post(`${process.env.REACT_APP_USERS_SERVICE_URL}/users`, data)
        .then((res) => {
            this.getUsers();
            this.setState({username: '', email: ''})
        })
        .catch((err) => { console.log(err); })
    }

    handleChange(event) {
        const obj = {};
        obj[event.target.name] = event.target.value;
        this.setState(obj);
    }

    handleUserFormSubmit(event) {
        event.preventDefault();
        const formType = window.location.href.split('/').reverse()[0];
        console.log(process.env.REACT_APP_USERS_SERVICE_URL);
        let data;
        if (formType === 'login') {
            data = {
                email: this.state.formData.email,
                password: this.state.formData.password
            }
        }
        if (formType === 'register') {
            data = {
                username: this.state.formData.username,
                email: this.state.formData.email,
                password: this.state.formData.password
            }
        }
        const url = `${process.env.REACT_APP_USERS_SERVICE_URL}/auth/${formType}`
        axios.post(url, data)
        .then((res) => {
            this.setState({
                formData: {
                    username: '',
                    email: '',
                    password: ''
                },
                username: '',
                email: '',
                isAuthenticated: true
            });
            window.localStorage.setItem('authToken', res.data.auth_token);
            this.getUsers();
        })
        .catch((err) => { console.log(err); })
    }

    handleFormChange(event) {
        const obj = this.state.formData;
        obj[event.target.name] = event.target.value;
        this.setState(obj);
    }

    render() {
        return (
            <div>
                <NavBar title={this.state.title} />
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-6'>
                            <br />
                            <Switch>
                                <Route exact path='/' render={() => (
                                    <div>
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
                                )}/>
                                <Route exact path='/about' component={About}/>
                                <Route exact path='/register' render={() => (
                                    <Form
                                        formType={'Register'}
                                        formData={this.state.formData}
                                        handleUserFormSubmit={this.handleUserFormSubmit.bind(this)}
                                        handleFormChange={this.handleFormChange.bind(this)}
                                        isAuthenticated={this.state.isAuthenticated}
                                    />
                                )}/>
                                <Route exact path='/login' render={() => (
                                    <Form
                                        formType={'Login'}
                                        formData={this.state.formData}
                                        handleUserFormSubmit={this.handleUserFormSubmit.bind(this)}
                                        handleFormChange={this.handleFormChange.bind(this)}
                                        isAuthenticated={this.state.isAuthenticated}
                                    />
                                )}/>
                                <Route exact path='/logout' render={() => (
                                    <Logout
                                        logoutUser={this.logoutUser.bind(this)}
                                        isAuthenticated={this.state.isAuthenticated}
                                    />
                                )} />
                                <Route exact path='/status' component={UserStatus}/>
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App
