import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userArticles from "./userArticles";
import publishedArticle from "./publishedArticle";

const appReducer = combineReducers({
  auth: authReducer,
  publishedArticle,
  userArticles,
});

const rootReducer = (state, action) => {
  if (action && action.type == "USER_AUTH_LOGOUT") {
    const { publishedArticle } = state;
    state = { publishedArticle };
  }

  return appReducer(state, action);
};

export default rootReducer;
