import {
  GET_DATA_COMMENTS,
  CREATE_COMMENT,
  DELETE_COMMENT,
} from "../Type/Type";

const initialState = {
  Comment: [],
};

const Comments = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_COMMENT:
      return {
        ...state,
        Comment: [action.payload, ...state.Comment],
      };
    case GET_DATA_COMMENTS:
      return {
        ...state,
        Comment: action.payload,
      };
    case DELETE_COMMENT:
      return {
        ...state,
        Comment: state.Comment.filter((item) => item._id !== action.payload.id),
      };

    default:
      return state;
  }
};

export default Comments;
