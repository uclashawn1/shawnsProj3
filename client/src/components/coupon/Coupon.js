import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import CouponItem from "../coupons/CouponItem";
import { getCoupons } from "../../actions/coupons";
// import GetAllCoupons from "../coupons/GetAllCoupons";

const Coupon = ({ getCoupons, coupon: { coupon, loading }, auth, match }) => {
  useEffect(() => {
    getCoupons(match.params.id);
  }, [getCoupons, match.params.id]);

  return loading || coupon === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to='/coupons' className='btn'>
        Back To Coupons
      </Link>
      <CouponItem coupon={coupon} showActions={true} />
      <CouponItem couponId={coupon._id} />
      <div className='interests'>
        {coupon.map(shop => (
          <CouponItem key={shop._id} shop={shop} couponId={coupon._id} />
        ))}
      </div>
    </Fragment>
  );
};

Coupon.propTypes = {
  getCoupons: PropTypes.func.isRequired,
  coupon: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  coupon: state.coupon
});

export default connect(
  mapStateToProps,
  { getCoupons }
)(Coupon);
