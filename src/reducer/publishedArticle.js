import { PUBLIC_ARTICLE_LIST } from "../actions/types";

export default function (state = [], action) {
  switch (action.type) {
    case PUBLIC_ARTICLE_LIST:
      state = [...action.payload];
      return state;

    default:
      return state;
  }
}
