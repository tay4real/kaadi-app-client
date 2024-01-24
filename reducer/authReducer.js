let defaultState = {
  user: null,
  isLoading: false,
  error: null
};


let authReducer = (state = defaultState, action) => {
  switch(action.type){
    case "LOAD_USER_START":
      return Object.assign({}, state, {isLoading: true});

    case "LOAD_USER_SUCCESS":
      return Object.assign({}, state, {
        user: action.payload,
        error: null,
        isLoading: false
      });
    case "LOAD_USER_FAILURE":
      return Object.assign({}, state, {
        error: action.payload,
        user: null,
        isLoading: false
      });
    case "USER_SIGNOUT":
      return Object.assign({}, state, {
        user: null
      })
    default:
      return state;
  }
}

export default authReducer;
