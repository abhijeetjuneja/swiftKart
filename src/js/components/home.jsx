import React, { Component } from 'react';
import { render } from 'react-dom';
import $ from 'jquery';

class Home extends Component {
    constructor() {
      super()
      this.state = {
        user: null
      }
    }

    // Fired eactly after the component was mounted
    componentDidMount() {
      $.ajax({
        url: '/me',
        dataType: 'json',
        type: 'GET',
        data: null,
        success: function(data) {
          this.setState({user : data.data});
          if(!data.error)
          this.props.history.push('/dashboard');
        }.bind(this),
        error: function(data) {
          console.log("Some Error occurred");
        }.bind(this)
      });
    }
    render(){
        return (
          <div className = "container-fluid text-center">
            <br></br><br></br>
            <h1>Welcome to Swift Cart</h1>
            <h4>Signup to get started !</h4>
            <br/><br/><br/>
            <a href="/signup"><button className="btn btn-primary btn-lg">Signup</button></a>
          </div>
        );
    }
}

export default Home
