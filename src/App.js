import React, {Component} from 'react';
import axios from 'axios';
import {Route, Switch} from 'react-router-dom';

import UsersList from './components/UsersList';
import About from './components/About';
import NavBar from './components/NavBar';
import Form from './components/Form';
import Logout from './components/Logout';
import UserStatus from './components/UserStatus';
import Message from './components/Message';


class App extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            title: 'FreeTestDriven',
            isAuthenticated: false,
            messageType: null,
            messageName: null
        };
    }

    componentWillMount(){
        if (window.localStorage.getItem('authToken')){
            this.setState({isAuthenticated: true})
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
        .catch((err) => {console.log(err)});
    }

    logoutUser() {
        window.localStorage.clear();
        this.setState({isAuthenticated: false});
    }

    loginUser(token) {
        window.localStorage.setItem('authToken', token);
        this.setState({isAuthenticated: true});
        this.getUsers();
        this.createMessage('Welcome!', 'success');
    }

    createMessage(name='Sanity Chech', type='success'){
        this.setState({
            messageName: name,
            messageType: type
        })
    }

    render() {
        return (
            <div>
                <NavBar 
                    title={this.state.title}
                    isAuthenticated={this.state.isAuthenticated}
                />
                <div className='container'>
                    {this.state.messageName && this.state.messageType &&
                        <Message
                            messageName={this.state.messageName}
                            messageType={this.state.messageType}
                        />
                    }
                    <div className='row'>
                        <div className='col-md-6'>
                            <br />
                            <Switch>
                                <Route exact path='/' render={() => (
                                    <UsersList users={this.state.users}/>
                                )}/>
                                <Route exact path='/about' component={About}/>
                                <Route exact path='/register' render={() => (
                                    <Form
                                        formType={'register'}
                                        isAuthenticated={this.state.isAuthenticated}
                                        loginUser={this.loginUser.bind(this)}
                                    />
                                )}/>
                                <Route exact path='/login' render={() => (
                                    <Form
                                        formType={'login'}
                                        isAuthenticated={this.state.isAuthenticated}
                                        loginUser={this.loginUser.bind(this)}
                                    />
                                )}/>
                                <Route exact path='/logout' render={() => (
                                    <Logout
                                        logoutUser={this.logoutUser.bind(this)}
                                        isAuthenticated={this.state.isAuthenticated}
                                    />
                                )} />
                                <Route exact path='/status' render={() => (
                                    <UserStatus 
                                        isAuthenticated={this.state.isAuthenticated}
                                    />
                                )} />
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;
