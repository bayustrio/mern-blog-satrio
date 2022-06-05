import * as Type from "../Type/Type";
const initState = {
  dataAuth: {
    username: "",
    password: "",
    email: "",
    confirmPassword: "",
  },
  data: [],
  slug: [],
};

const Auth = (state = initState, action) => {
  switch (action.type) {
    case Type.HANDLE_CHANGE:
      return {
        ...state,
        dataAuth: { ...state.dataAuth, [action.name]: action.value },
      };

    case Type.CREATE_ACCOUNT:
      return {
        ...state,
        data: action.payload,
      };
    case Type.GET_DATA_SLUG:
      return {
        ...state,
        slug: action.payload,
      };
    default:
      return state;
  }
};

export default Auth;
