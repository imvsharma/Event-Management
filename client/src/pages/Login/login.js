import React, { Component } from 'react';
import './login.css';
import Button from './../../components/Button/button';
import USER_LOGIN from './../../graphql/query/user/user.query';
import { withApollo } from 'react-apollo'
import authContext from '../../context/auth-context';

class LoginPage extends Component {
    static contextType = authContext;

    constructor (props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = event => {
        if(event.target.name === 'email') {
            this.setState({email: event.target.value});
        } else if(event.target.name === 'password') {
            this.setState({password: event.target.value});
        }

    }

    handleSubmit = event => {
        event.preventDefault();
        this.props.client.query({
            query: USER_LOGIN,
            variables: {
                email: this.state.email,
                password: this.state.password
            }
        }).then(({data}) => {
            console.log('login data', data);
            if(data.login.token) {
                this.context.login(data.login.userId, data.login.token, data.login.tokenExpiration);
            }
        }).catch(err => {
            console.log('Error', err)
        })
        
    }


    render () {
        return(
            <div className="login-container">
                <div className="login-heading-container">Sign in</div>
                <div className="login-form-container">
                    <div className="input-group">
                        <div className="input-container">
                            <input name="email" placeholder="Enter your email" value= {this.state.email} onChange= {this.handleChange}  />
                        </div>
                    </div>

                    <div className="input-group">
                        <div className="input-container">
                            <input name="password" placeholder="Enter your password" value= {this.state.password} onChange= {this.handleChange}  />
                        </div>
                    </div>
                    <div className="button-container">
                        <Button name={'Login'} styles={'login-button'} click={this.handleSubmit} />
                    </div>
                </div>
            </div>
        )
        
    }
}

export default LoginPage = withApollo(LoginPage)