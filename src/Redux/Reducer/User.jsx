import { GET_DATA_USER } from "../Type/Type";

const initState = {
  user: [],
};

const User = (state = initState, action) => {
  switch (action.type) {
    case GET_DATA_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default User;
