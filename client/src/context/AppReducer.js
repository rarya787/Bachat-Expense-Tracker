export default (state, action) => {
  switch (action.type) {
    case "GET_TRANSACTIONS":
      return {
        ...state,
        loading: false,
        transactions: action.payload,
      };
    case "DELETE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.filter(
          (transaction) => transaction._id !== action.payload
        ),
      };
    case "ADD_TRANSACTION":
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };
    case "TRANSACTION_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "LOGIN_SUCCESSFUL":
      return {
        ...state,
        user: action.payload,
      };
    case "REGISTER_SUCCESSFUL":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGIN_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "REGISTER_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "LOGOUT":
      return {};
    default:
      return state;
  }
};
