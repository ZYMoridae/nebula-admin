import React, { Component } from 'react';
import { 
  fetchNoteInfo
} from '../actions';


export default class User extends Component {
  componentDidMount() {
    const {info} = this.props;
    // this.props.dispatch(fetchNoteInfo({

    // }));
  }

  render() {
    return (
      <div className="Post">
        
      </div>
    )
  }
}
