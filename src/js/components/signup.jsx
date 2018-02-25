import React, { Component } from 'react';
import $ from 'jquery';

class Signup extends Component {
    // constructor to define initial state
    constructor() {
      super()
      this.state = {
        error : null,
        user : null
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
        firstName : this.refs.firstName.value,
        lastName  : this.refs.lastName.value,
        mobile    : this.refs.mobile.value,
        email     : this.refs.email.value,
        billingAddress : this.refs.billingAddress.value,
        password  : this.refs.password.value,
      }
      event.preventDefault();
      $.ajax({
        url: '/signup',
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
    componentWillReceiveProps(props) {
      console.log("props",props)
    }
    render(){
        return (
          <div className = "container-fluid">
            <hr/>
            <section className="container-fluid">
              <div className="signup text-center">
                <br></br><br></br>
                <h1>Sign up to Swift Cart</h1>
                <p> Fields marked with * are required  </p>
                <form onSubmit={(e) => this.handleSubmit(e)}  className="form-horizontal login-form">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name(*) :</label>
                    <div className="offset-sm-3 col-sm-6">
                      <input ref="firstName" type="text" placeholder="Enter First Name" name="firstName" required="required" className="form-control"/>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName" className="control-label col-sm-2">Last Name(*) :</label>
                    <div className="offset-sm-3 col-sm-6">
                      <input ref="lastName" type="text" placeholder="Enter Last Name" name="lastName" required="required" className="form-control"/>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="mobile" className="control-label col-sm-2">Mobile Number(*) :</label>
                    <div className="offset-sm-3 col-sm-6">
                      <input ref="mobile" type="number" placeholder="Enter Mobile Number" name="mobile" required="required" className="form-control"/>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" className="control-label col-sm-2">Email(*) :</label>
                    <div className="offset-sm-3 col-sm-6">
                      <input ref="email" type="text" placeholder="Enter Email" name="email" required="required" className="form-control"/>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="billingAddress" className="control-label col-sm-2">Postal Code(*) :</label>
                    <div className="offset-sm-3 col-sm-6">
                      <input ref="billingAddress" type="number" placeholder="Enter Postal Code" name="billingAddress" required="required" className="form-control"/>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="password" className="control-label col-sm-2">Password(*) :</label>
                    <div className="offset-sm-3 col-sm-6">
                      <input ref="password" type="password" placeholder="Enter password" name="password" required="required" className="form-control"/>
                    </div>
                  </div>
                  <div className="form-group submit create-item-button">
                    <div className="offset-sm-4 col-sm-4">
                      <button type="submit" className="btn btn-primary btn-create-item btn-lg">Sign up !</button>
                    </div>
                  </div>
                  <div className="form-group submit create-item-button">
                    <div className="offset-sm-4 col-sm-4">
                      Already have an account ? <a href="/login">Log In</a>
                    </div>
                  </div>
                  {this.state.error != null && this.state.error.error ? <div class="alert alert-danger">
                    <strong> {this.state.error.message} !</strong>
                  </div> : null}
                  {this.state.error != null && !this.state.error.error? <div class="alert alert-success">
                    <strong> Success ! Logged In !</strong>
                  </div> : null}


                </form>
              </div>
            </section>

          </div>
        );
    }
}

export default Signup
