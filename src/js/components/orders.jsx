import React, { Component } from 'react';
import $ from 'jquery';
class Orders extends Component {
    constructor() {
      super()
      this.state = {
        items: null,
      }
    }
    componentDidMount(){
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
              url: '/orders/all',
              dataType: 'json',
              type: 'GET',
              data: null,
              success: function(data) {
                this.setState({items : data.data});
                console.log(data);
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
    }
    remove(id){
      var url = '/orders/' + id + '/delete'
      $.ajax({
        url: url,
        dataType: 'json',
        type: 'POST',
        data: null,
        success: function(data) {
          console.log(data);
          window.location.reload();
        }.bind(this),
        error: function(data) {
          console.log("Some Error occurred");
        }.bind(this)
    });
    }
    render(){
        return (
          <div className="container-fluid">
            <div className="row text-center">
              <br></br><br></br>
              {this.state.items != null && this.state.items.length != 0?
                this.state.items.map((item, index) => {
                    return(
                      <div className="col-md-12 row text-center" style={{cursor:'pointer',borderBottom:'2px solid black'}}>

                        <div className="col-md-3">
                          <img src={item.imageUrl} height='200px'></img>
                        </div>
                        <div className="col-md-7">
                          <br></br>
                          <h4>{item.itemName}</h4>
                          <p>{item.itemDescription}</p>
                        </div>
                        <div className="col-md-2">
                          <br></br>
                          <h4>Rs.{item.price}</h4>
                          <button className="btn btn-danger" onClick={() => this.remove(item._id)}>Remove</button>
                        </div>

                      </div>
                    )
                })
                 : <h1>No orders Found</h1>}

            </div>
          </div>
        );
    }
}

export default Orders
