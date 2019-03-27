import React, { Component } from 'react';
import './event.css';
export default class EventPage extends Component {
    render () {
        return(
            <React.Fragment>
                <div className="search-input-container">
                    <div className="search-group">
                        <input type="search" placeholder="Find your next concert, cricket match or standup comedy" />
                    </div>
                </div>
                <div className="event-list-container">
                    <div className="event-menu">
                        Recent | Popular
                    </div>
                    <div className="event-list">
                        <div className="event-list-row">
                            <div className="event-item">
                                
                            </div>
                            <div className="event-item">
                                
                            </div>
                            <div className="event-item">
                                
                            </div>
                            <div className="event-item">
                                
                            </div>
                            <div className="event-item">
                                
                            </div>
                            <div className="event-item">
                                
                            </div>
                            <div className="event-item">
                                
                            </div>
                            <div className="event-item">
                                
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
        
    }
}