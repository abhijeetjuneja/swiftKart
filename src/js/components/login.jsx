import React, { Component } from 'react';
import { render } from 'react-dom';
import $ from 'jquery';

class Login extends Component {
    // constructor to define initial state
    constructor() {
      super()
      this.state = {
        error : null,
        user  : null
      }
    }
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
    handleSubmit(event) {
      var user = {
        email     : this.refs.email.value,
        password  : this.refs.password.value,
      }
      event.preventDefault();
      $.ajax({
        url: '/login',
        dataType: 'json',
        type: 'POST',
        data: user,
        success: function(data) {
          this.setState({error : data});
          if(!data.error)
          this.props.history.push('/dashboard');
          window.location.reload();
        }.bind(this),
        error: function(data) {
          this.setState({error : "Some Error occurred"});
          console.log("Some Error occurred");
        }.bind(this)
      });
    }
    render(){
        return (
          <div className="container-fluid row text-center main-login">
            <div className="login text-center col-xs-12 col-lg-12">
              <div className="login-heading">
                <br></br><br></br>
                <h2>Login to FlashCart.com !</h2>
                <hr/>
              </div>
              <form onSubmit={(e) => this.handleSubmit(e)} className="form-horizontal login-form">
                <div className="form-group">
                  <label htmlFor="email" className="control-label col-sm-2 col-sm-offset-2">Email:</label>
                  <div className="offset-sm-3 col-sm-6">
                    <input ref="email" type="email" placeholder="Enter email" name="email" required="required" className="form-control"/>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="pwd" className="control-label col-sm-2 col-sm-offset-2">Password:</label>
                  <div className="offset-sm-3 col-sm-6">
                    <input ref="password" type="password" placeholder="Enter password" name="password" required="required" className="form-control"/>
                  </div>
                </div>
                <div className="form-group submit">
                  <div className="offset-sm-4 col-sm-4">
                    <button type="submit" className="btn btn-primary">Login</button>
                  </div>
                </div>
                {this.state.error != null && this.state.error.error ? <div class="alert alert-danger">
                  <strong> {this.state.error.message} !</strong>
                </div> : null}
                {this.state.error != null && !this.state.error.error ? <div class="alert alert-success">
                  <strong> Success ! Logged In !</strong>
                </div> : null}
              </form>
              <p>Haven't Registered Yet? <a href="/signup"><b>Sign Up Here!</b></a></p>
            </div>
          </div>

        );
    }
}

export default Login
