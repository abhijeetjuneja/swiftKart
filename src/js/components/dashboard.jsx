import React, { Component } from 'react';
import { render } from 'react-dom';
import $ from 'jquery';

class Dashboard extends Component {
    constructor() {
      super()
      this.state = {
        user: null,
        data: null,
        cartLength:0,
      }
      this.submitCart = this.submitCart.bind(this);
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
          if(data.error)
            this.props.history.push('/login');
          else {
            $.ajax({
              url: '/items/all',
              dataType: 'json',
              type: 'GET',
              data: null,
              success: function(data) {
                this.setState({items : data.data});
              }.bind(this),
              error: function(data) {
                console.log("Some Error occurred");
              }.bind(this)
          });
        }
        }.bind(this),
        error: function(data) {
          console.log("Some Error occurred");
        }.bind(this)
      });
      $.ajax({
        url: '/cart/all',
        dataType: 'json',
        type: 'GET',
        data: null,
        success: function(data) {
          this.setState({cartLength : data.data.length});
          console.log(data);
        }.bind(this),
        error: function(data) {
          console.log("Some Error occurred");
        }.bind(this)
      });
    }
    handleClick(e){
      $.ajax({
        url: '/cart/add',
        dataType: 'json',
        type: 'POST',
        data: e,
        success: function(data) {
          console.log("done");
          console.log(data.message);
          this.setState({cartLength:this.state.cartLength + 1});
        }.bind(this),
        error: function(data) {
          console.log("Some Error occurred");
        }.bind(this)
      });
    }
    submitCart(){
      $.ajax({
        url: '/orders/add',
        dataType: 'json',
        type: 'POST',
        data: null,
        success: function(data) {
          console.log("generated orders");
          this.props.history.push('/orders');
        }.bind(this),
        error: function(data) {
          console.log("Some Error occurred");
        }.bind(this)
      });
    }
    render(){
        return (
          <div className="container-fluid">
            <br></br><br></br>
            <div style={{position:'fixed',bottom:20,right:20,zIndex:3}}>
 						 {this.state.cartLength != 0 ? <button className="btn btn-success btn-lg" onClick={this.submitCart}>Charge ! ({this.state.cartLength})</button> : <button className="btn btn-danger btn-lg">No Items in Cart</button>}
 					 </div>
            {this.state.items != null ?
              <div className="container-fluid row text-center">
                {this.state.items.map((item, index) => {
                    return(
                      <div className="col-md-3 text-center" style={{cursor:'pointer'}}>
                        <img src={item.imageUrl} width='250px' height='300px'>
                        </img><br></br>
                        <b><h4>{item.itemName}</h4></b>
                        <h4>Rs.{item.price}</h4>
                        <p>{item.discount} % OFF</p>
                        <button className="btn btn-primary" onClick={() => this.handleClick(item)}>Add to Cart</button>
                        <br></br><br></br><br></br><br></br>
                      </div>
                    )
                })}
              </div>
                : <h1>No items found</h1>}
          </div>
        );
    }
}

export default Dashboard
