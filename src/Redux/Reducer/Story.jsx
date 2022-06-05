import {
  GET_DATA_BLOG,
  GET_DETAIL_STORY,
  GET_SLUG_FOR_LIKE,
} from "../Type/Type";

const initialState = {
  data: [],
  detailStory: [],
  storySlug: [],
  likeStatus: false,
};

const Story = (state = initialState, action) => {
  switch (action.type) {
    case GET_DATA_BLOG:
      return {
        ...state,
        data: action.payload,
      };
    case GET_DETAIL_STORY:
      return {
        ...state,
        detailStory: action.payload,
        likeStatus: action.payload?.data?.likes.find((item) =>
          item._id === state.storySlug._id
            ? (state.likeStatus = true)
            : (state.likeStatus = false)
        ),
      };
    case GET_SLUG_FOR_LIKE:
      return {
        ...state,
        storySlug: action.payload,
      };

    default:
      return state;
  }
};

export default Story;
