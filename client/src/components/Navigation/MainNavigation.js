import React from 'react';
import { NavLink} from 'react-router-dom';
import './MainNavigation.css';
import Button from './../Button/button';
import history from '../../history';
import authContext from '../../context/auth-context';


class Navigation extends React.Component {
    navigateByButton = (event) => {
        event.preventDefault();
        if(history.location.pathname === '/login') {
            history.replace('/signup');
        } else {
            history.replace('/login');
        }
    }

    render () {
        return(
            <authContext.Consumer>
                {(context) => {
                    console.log('')
                    return(<header>
                                <div className="logo">
                                    <span>
                                        Event Fusion
                                    </span>
                                </div>
                                <div className="nav-items">
                                    <NavLink className="nav-item" to="/events">
                                        Events
                                    </NavLink>

                                    {context.token &&
                                        <React.Fragment>
                                            <NavLink className="nav-item" to="/bookings">Bookings</NavLink>
                                            <Button name={'Create an event'} styles={'create-event'} />
                                            <Button name={'Log-out'} styles={'nav-button'} click={context.logout} />
                                        </React.Fragment>
                                    }
                                    {
                                       !context.token &&
                                       <React.Fragment>
                                           {history.location.pathname === '/login' && <Button name={'Sign-up'} styles={'nav-button'} click={this.navigateByButton} />}
                                           {(history.location.pathname === '/signup'|| history.location.pathname === '/events') && <Button name={'Sign-in'} styles={'nav-button'} click={this.navigateByButton} />}
                                       </React.Fragment> 
                                    }
                                    
                                    </div>
                            </header>)
                }}
            </authContext.Consumer>
    )}
}


export default Navigation