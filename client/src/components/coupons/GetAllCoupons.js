// *** I don't think we need a Post Form. Please double check****
import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addCoupon } from "../../actions/coupons";
// const config = require("config");
const couponAPI = "api_key";

class GetAllCoupons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    axios
      .get(`https://api.discountapi.com/v2/deals?=${couponAPI}`)
      .then(response => {
        console.log(response);
        const data = response.data.deals;
        console.log(data);
        this.setState({ data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className='App'>
        {this.state.data.map((item, index) => (
          <GetAllCoupons key={index} {...item} />
        ))}
      </div>
    );
  }
}

// const Coupons = getCoupons() => { coupon, shop, wish };

GetAllCoupons = props => (
  <card>
    <h3>
      <strong>Title: </strong> {props.deal.title}
    </h3>
    <div>
      <img src={props.deal.image_url} alt='' />
    </div>
    {/* <p>${props.coupon.description}</p>
    <button className='left'>${props.coupon.shop}</button>
    <button className='right'>${props.coupon.wish}</button> */}
    <div>${props.deal.expires}</div>

    <h4>Value At: ${props.deal.value}</h4>
    <h4>Discount: {Math.round(props.deal.discount_percentage * 100)}%</h4>
    <h3>Now: ${props.deal.price}</h3>
    <h3>
      <a href={props.deal.url}>Buy Now</a>
    </h3>
  </card>
);

GetAllCoupons.propTypes = {
  addCoupons: PropTypes.func.isRequired
};

export default connect(
  null,
  { addCoupon }
)(GetAllCoupons);

// var request = new XMLHttpRequest()

//     componentDidMount() {
//       request.open('GET', 'https://discountapi.com/', true)
//     };

//       request.onload = function() {
//       // Begin accessing JSON data here
//       var data = JSON.parse(this.response)
//       if (request.status >= 200 && request.status < 400) {
//         data.forEach = coupon => {
//           return(
//             <container>
//              `<card>
//                 <h1>
//                 ${coupon.title}
//                 </h1>
//                 <div>
//                 ${coupon.image}
//                 </div>
//                 <p>
//                 ${coupon.description}
//                 </p>
//                 <div>
//                 ${coupon.expires}
//                 </div>
//                 <button className='left'>
//                 ${coupon.shop}
//                 </button>
//                 <button className='right'>
//                 ${coupon.wish}
//                 </button>
//               </card>`
//             </container>

//           );
//         }}}

//     const GetAllCoupons = ({addCoupons}) => {
//     request.send()
//     };

//   GetAllCoupons.propTypes = {
//     addCoupons: PropTypes.func.isRequired
//   };

//   export default connect(
//     null,
//     { addCoupons }
//   )(GetAllCoupons);
