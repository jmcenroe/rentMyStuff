// PDP (product detail page) for a detailed view at a listing 
// photo of item for rent, title, description, cost, seller rating 

import React, { Component } from 'react';
// import '../App.css';
// import NavBar from './header.js';
// import Row from './BSstuff.js';
// import Container from './BSstuff.js';
import './product-panel.css';


class ProductPanel extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        
    }

viewProfile = event => {
    this.props.history.push ({
        pathname: '/profile',
        state: {
            profileId: event.target.getAttribute('data-id')
        }
    });
}

remove = event => {
    console.log(event.target.id);
}

rent = event => {
    this.props.history.push({
        pathname: '/rent',
        state: {
            productId: event.target.id
        }
    });
}
    
  render () {
 
  return <div id={this.props.id} key={this.props.index}>
                <div className = "row productRow">
                    <div className="col-12 col-md-4 col-xl-4 imgCol">
                        <img src={this.props.imageURL} alt={this.props.itemName} className="productImage"/>
                    </div>
                    <div id={this.props.id} key={this.props.index} className="col-4 col-md-4 col-lg-4 col-xl-4 productInfo">
                        <h3>{this.props.itemName}</h3>
                        <h4>{this.props.itemDescription}</h4>
                    </div>
                    <div className="col-6 col-md-4 col-lg-4 col-xl-4 productPrice">
                        <div className="row align-left">{this.props.hourly !== null ? '$' + this.props.hourly +'/hr' : 'Hourly price not available.'}</div>
                        <div className="row align-left">{this.props.daily !== null ? '$' + this.props.daily +'/day' : 'Daily price not available'}</div>
                        <div className="row align-left">{this.props.weekly !== null ? '$' + this.props.weekly +'/week' : 'Weekly price not available'}</div>
                        <div className="row align-left">{this.props.monthly !== null ? '$' + this.props.monthly +'/month' : 'Monthly price not available'}</div>
                        <div className="row d-flex" id="rentee">
                        {this.props.profileDisabled == 'false' ?
                            <div data-id={this.props.userId} onClick={this.viewProfile.bind(this)}>
                                Owned by: <img src={this.props.userImage} alt={this.props.userName} data-id={this.props.userId} id="userIcon"/> {this.props.userName}
                            </div>  
                            : '' }
                            {this.props.edit ? 
                            <button className="btn btn-mine" id={this.props.id} onClick={this.props.remove}>Remove Item</button>
                        : this.props.rentDisabled == 'true' ? '' : <button className="btn btn-mine" id={this.props.id} onClick={this.rent.bind(this)}>Rent Item</button>}
                    </div>
                    </div>
                    
                  </div>

            </div>

  }
}

export default ProductPanel;

