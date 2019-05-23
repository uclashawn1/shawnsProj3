import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  addShop,
  addWish,
  removeShop,
  removeWish,
  deleteCoupon
} from "../../actions/coupons";

const CouponItem = ({
  addShop,
  addWish,
  removeShop,
  removeWish,
  deleteCoupon,
  auth,
  coupon: { _id, title, user, shop, wish, image },
  showActions
}) => (
  <div className='post bg-white p-1 my-1'>
    <div>
      <Link to={`/profile/${user}`}>
        <img className='round-img' src={image} alt='' />
        <h4>{title}</h4>
      </Link>
    </div>

    <div>
      {showActions && (
        <Fragment>
          <button
            onClick={() => addShop(_id)}
            type='button'
            className='btn btn-light'
          >
            <i className='fas fa-thumbs-up' />{" "}
            <span>{shop.length > 0 && <span>{shop.length}</span>}</span>
          </button>
          <button
            onClick={() => removeShop(_id)}
            type='button'
            className='btn btn-light'
          >
            <i className='fas fa-thumbs-down' />
          </button>

          <button
            onClick={() => addWish(_id)}
            type='button'
            className='btn btn-light'
          >
            <i className='fas fa-thumbs-up' />{" "}
            <span>{wish.length > 0 && <span>{wish.length}</span>}</span>
          </button>
          <button
            onClick={() => removeWish(_id)}
            type='button'
            className='btn btn-light'
          >
            <i className='fas fa-thumbs-down' />
          </button>

          {!auth.loading && user === auth.user._id && (
            <button
              onClick={() => deleteCoupon(_id)}
              type='button'
              className='btn btn-danger'
            >
              <i className='fas fa-times' />
            </button>
          )}
        </Fragment>
      )}
    </div>
  </div>
);

CouponItem.defaultProps = {
  showActions: true
};

CouponItem.propTypes = {
  coupon: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addShop: PropTypes.func.isRequired,
  removeShop: PropTypes.func.isRequired,
  addWish: PropTypes.func.isRequired,
  removeWish: PropTypes.func.isRequired,
  deleteCoupon: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addShop, removeShop, addWish, removeWish, deleteCoupon }
)(CouponItem);

// This file handles labeling the coupons that have already been saved with shop/wish and also deleting coupons.
