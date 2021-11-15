
export const cartReducer = (
  state = { cartItems: [], shippingInfo: {} },
  action
) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const item = action.payload;
      console.log(action.payload)

      const isItemExist = state.cartItems.find(
        (i) => i.product === item.product
      );
      console.log(isItemExist)
      if (isItemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) => i.product === isItemExist.product ? item : i)
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case "REMOVE_CART_ITEM":
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.product !== action.payload),
      };

    //save the shippingInfo
    case "SAVE_SHIPPING_INFO":
      return {
        ...state,
        shippingInfo: action.payload,
      };

    default:
      return state;
  }
};
