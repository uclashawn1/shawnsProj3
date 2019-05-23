import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_COUPONS,
  SHOP_ERROR,
  WISH_ERROR,
  COUPON_ERROR,
  UPDATE_SHOP,
  UPDATE_WISH,
  DELETE_COUPON,
  ADD_COUPON
} from "./types";

// Get coupons
export const getCoupons = () => async dispatch => {
  try {
    const res = await axios.get("/api/coupons");

    dispatch({
      type: GET_COUPONS,
      payload: res.body
    });
  } catch (err) {
    dispatch({
      type: COUPON_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add shop/wish
export const addShop = id => async dispatch => {
  try {
    const res = await axios.put(`/api/coupons/shop/${id}`);

    dispatch({
      type: UPDATE_SHOP,
      payload: { id, shop: res.body }
    });
  } catch (err) {
    dispatch({
      type: SHOP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const addWish = id => async dispatch => {
  try {
    const res = await axios.put(`/api/coupons/wish/${id}`);

    dispatch({
      type: UPDATE_WISH,
      payload: { id, wish: res.body }
    });
  } catch (err) {
    dispatch({
      type: WISH_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Remove shop/wish
export const removeShop = id => async dispatch => {
  try {
    const res = await axios.put(`/api/coupons/unshop/${id}`);

    dispatch({
      type: UPDATE_SHOP,
      payload: { id, shop: res.body }
    });
  } catch (err) {
    dispatch({
      type: SHOP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const removeWish = id => async dispatch => {
  try {
    const res = await axios.put(`/api/coupons/unwish/${id}`);

    dispatch({
      type: UPDATE_WISH,
      payload: { id, wish: res.body }
    });
  } catch (err) {
    dispatch({
      type: WISH_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete coupon
export const deleteCoupon = id => async dispatch => {
  try {
    await axios.delete(`/api/coupons/${id}`);

    dispatch({
      type: DELETE_COUPON,
      payload: id
    });

    dispatch(setAlert("Coupon Removed", "success"));
  } catch (err) {
    dispatch({
      type: COUPON_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add coupon

export const addCoupon = id => async dispatch => {
  try {
    await axios.add(`/api/coupons/${id}`);

    dispatch({
      type: ADD_COUPON,
      payload: id
    });

    dispatch(setAlert("Coupon Added", "success"));
  } catch (err) {
    dispatch({
      type: COUPON_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
