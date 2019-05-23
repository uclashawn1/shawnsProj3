import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import CouponItem from "./CouponItem";
import GetAllCoupons from "./GetAllCoupons";
import { getCoupons } from "../../actions/coupons";

const Coupons = ({ getCoupons, coupon: { coupons, loading } }) => {
  useEffect(() => {
    getCoupons();
  }, [getCoupons]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Coupons</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Welcome to your Coupon Holder
      </p>
      <GetAllCoupons />
      <div className='posts'>
        {coupons.map(coupon => (
          <CouponItem key={coupon._id} coupon={coupon} />
        ))}
      </div>
    </Fragment>
  );
};

Coupons.propTypes = {
  getCoupons: PropTypes.func.isRequired,
  coupon: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  coupon: state.coupon
});

export default connect(
  mapStateToProps,
  { getCoupons }
)(Coupons);

// This file gets all the coupons from database and displays them onto the page.
