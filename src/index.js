import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';


class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        this.getUsers()
    }

    getUsers() {
        axios.get(`${process.env.REACT_APP_USERS_SERVISE_URL}/users`)
        .then((res) => {console.log(res);})
        .catch((err) => {console.log(err);})
    }

    render() {
        let users = this.props.users;
        let newsTemplate;

        if (users.length > 0) {
            newsTemplate = users.map((user) => (
                    <h4 key={user.id} className="well">
                        <strong>{ user.username }</strong> - <em>{user.created_at}</em>
                    </h4>
                )
            )
        }
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-md-4'>
                        <br />
                            <h1>All Users</h1>
                        <hr /><br />
                        {newsTemplate}
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
