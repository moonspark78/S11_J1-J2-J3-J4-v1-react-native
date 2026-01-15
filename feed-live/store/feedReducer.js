const ADD_POST = 'ADD_POST';

export const addPost = (post) => ({
  type: ADD_POST,
  payload: post,
});

const initialState = {
  posts: [],
};

export default function feedReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    default:
      return state;
  }
}
