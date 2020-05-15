import { USER_ARTICLE_ADD, USER_ARTICLE_LIST } from "../actions/types";

export default function (state = [], action) {
  switch (action.type) {
    case USER_ARTICLE_LIST:
      state = [...action.payload];
      return state;

    case USER_ARTICLE_ADD:
      state = [action.payload, ...state];
      return state;

    default:
      return state;
  }
}
