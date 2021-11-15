export const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case "ORDER_REQ":
    case "GET_ORDER_REQ":
      return {
        ...state,
        loading: true,
      }
    case "ORDER_SUCCESS":
    case "GET_ORDER_SUCCESS":
      return {
        ...state,
        loading: false,
        orders: action.payload ? action.payload : "",
      }
    case "ORDER_FAILED":
    case "GET_ORDER_FAILED":
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case "CLEAR_ERRORS":
      return {
        ...state,
        error: null
      }

    default:
      return state;
  }
}

export const singleOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case "SINGLE_ORDER_REQ":
      return {
        ...state,
        loading: true,
      }
    case "SINGLE_ORDER_SUCCESS":
      return {
        ...state,
        loading: false,
        order: action.payload
      }
    case "SINGLE_ORDER_FAILED":
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    default:
      return state;
  }
}


/**
 * ?admin get all orders
 */

export const adminAllOrdersReducer = (state = {}, action) => {
  switch (action.type) {
    case "ADMIN_ALL_ORDERS_REQ":
      return {
        ...state,
        loading: true,
      }
    case "ADMIN_ALL_ORDERS_SUCCESS":
      return {
        ...state,
        loading: false,
        orders: action.payload
      }
    case "ADMIN_ALL_ORDERS_FAILED":
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    default:
      return state;
  }
}


export const updateOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case "UPDATE_ORDER_REQ":
      return {
        ...state,
        loading: true,
      }
    case "UPDATE_ORDER_SUCCESS":
      return {
        ...state,
        loading: false,
        success: action.payload
      }
    case "UPDATE_ORDER_FAILED":
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload
      }
    case "UPDATE_ORDER_RESET":
      return {
        ...state,
        success: null
      }
    default:
      return state;
  }
}

export const deleteOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case 'DELETE_ORDER_REQ':
      return {
        ...state,
        loading: true
      };
    case 'DELETE_ORDER_SUCCESS':
      return {
        ...state,
        loading: false,
        success: action.payload
      };
    case 'DELETE_ORDER_FAILED':
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case 'DELETE_ORDER_RESET':
      return {
        ...state,
        success: null
      };

    default:
      return state;
  }
}