import {
  GET_COUPONS,
  SHOP_ERROR,
  WISH_ERROR,
  COUPON_ERROR,
  UPDATE_SHOP,
  UPDATE_WISH,
  DELETE_COUPON,
  ADD_COUPON
} from "../actions/types";

const initialState = {
  coupons: [],
  coupon: null,
  loading: false,
  error: {}
};
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_COUPONS:
      return {
        ...state,
        coupons: action.payload,
        loading: false
      };

    case ADD_COUPON:
      return {
        ...state,
        coupon: [action.payload, ...state.coupons],
        loading: false
      };
    case DELETE_COUPON:
      return {
        ...state,
        coupons: state.coupons.filter(coupon => coupon._id !== action.payload)
      };
    case SHOP_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case WISH_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case UPDATE_SHOP:
      return {
        ...state,
        SHOP: state.shop.map(shop =>
          shop._id === action.payload.id
            ? { ...shop, shop: action.payload.shop }
            : shop
        ),
        loading: false
      };
    case UPDATE_WISH:
      return {
        ...state,
        wish: state.wish.map(wish =>
          wish._id === action.payload.id
            ? { ...wish, wish: action.payload.wish }
            : wish
        ),
        loading: false
      };
    case COUPON_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
