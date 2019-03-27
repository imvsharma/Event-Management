import React, { Component } from 'react';
import './signup.css';
import Button from './../../components/Button/button';
import CREATE_USER from './../../graphql/mutation/user/user.mutation';
import { graphql } from 'react-apollo'



class SignupPage extends Component {
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
        this.props.mutate({
            variables: {
                email: this.state.email,
                password: this.state.password
            }
        }).then(({data}) => {
            console.log('data', data);
        }).catch((error) => {
            console.log('there was an error sending the query', error);
        });
    }


    render () {
        return(
            <div className="signup-container">
                <div className="signup-heading-container">Sign up</div>
                <div className="signup-form-container">
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
                        <Button name={'Signup'} styles={'signup-button'} click={this.handleSubmit} />
                    </div>
                </div>
            </div>
        )
        
    }
}

export default SignupPage = graphql(CREATE_USER)(SignupPage);