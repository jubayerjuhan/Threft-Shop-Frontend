import { authAxios } from "../../Utils/Axios/axios.js"


/**
 * add items to cart
 * we will get a id and then we will fetch the product from database from that particular id 
 */
export const addToCart = (productId, quantity) => async (dispatch, getState) => {
  const { data } = await authAxios.get(`/api/v1/product/${productId}`)
  console.log('data...', data)


  dispatch({
    type: "ADD_TO_CART", payload: {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      stock: data.product.stock,
      image: data.product.images[0],
      quantity

    }
  })
  const cartState = JSON.stringify(getState().cart.cartItems)
  localStorage.setItem('cart', cartState)
}


/**
 * Remove From Cart Items in Cart Page
 */
export const removeFromCart = (id) => async (dispatch, getState) => {
  console.log(id)
  dispatch({ type: 'REMOVE_CART_ITEM', payload: id })

  const cartState = JSON.stringify(getState().cart.cartItems)
  localStorage.setItem('cart', cartState)
}


/**
 * Save shipping information
 */
export const saveShippingInfo = (shipping) => async (dispatch, getState) => {
  dispatch({ type: 'SAVE_SHIPPING_INFO', payload: shipping })
  localStorage.setItem('shipping', JSON.stringify(getState().cart.shippingInfo))

}