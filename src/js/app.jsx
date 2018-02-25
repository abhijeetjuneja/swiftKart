import React from 'react'
import ReactDOM from 'react-dom'
import styles from './style.css'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Home from './components/home'
import Login from './components/login'
import Signup from './components/signup'
import Dashboard from './components/dashboard'
import Orders from './components/orders'
import $ from 'jquery'

class App extends React.Component{
	// constructor to define initial state
	constructor() {
		super()
		this.state = {
			user: null,
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
			}.bind(this),
			error: function(data) {
				console.log("Some Error occurred");
			}.bind(this)
		});
	}

	render() {
		return (
         <Router>
					 <div>
						 <nav className="navbar navbar-default" style={{cursor:'pointer',borderBottom:'2px solid black'}}>
					   <div className="container-fluid">
					     <div className="navbar-header">
					       <a className="navbar-brand" href="/">Swift Cart</a>
					     </div>
					     <ul className="nav navbar-nav">
									 {this.state.user != null ?<li><a href="/orders">Orders&nbsp;&nbsp;</a><a href="/logout">Logout({this.state.user.firstName} {this.state.user.lastName})</a></li> : <a href="/login">Login</a>}
					     </ul>
					   </div>
						 <br></br>
					 </nav>
	         <Switch>
	            <Route exact path='/' component={Home} />
	            <Route exact path='/login' component={Login} />
							<Route exact path='/signup' component={Signup} />
							<Route exact path='/dashboard' component={Dashboard} updateCart={this.updateCart}/>
							<Route exact path='/orders' component={Orders} updateCart={this.updateCart}/>
	         </Switch>
				 </div>

         </Router>
      );
	}
}


export default App

ReactDOM.render(<App />, document.getElementById('root'))
