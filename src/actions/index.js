import { notification } from "antd";
import axios from "axios";
import {
  USER_AUTH_LOGIN,
  USER_AUTH_LOGOUT,
  USER_ARTICLE_ADD,
  USER_ARTICLE_LIST,
  USER_ARTICLE_UPDATE,
  PUBLIC_ARTICLE_LIST,
} from "./types";

export const login = (req) => async (dispatch) => {
  try {
    const payload = await axios.post("auth/login", req);

    if (payload.data.error) {
      notification.error({
        message: "Sign in",
        description: payload.data.error,
      });
    } else if (payload.data) {
      dispatch({
        type: USER_AUTH_LOGIN,
        payload: payload.data,
      });
      notification.success({
        message: "Sign in successfull",
      });
    }
  } catch (e) {
    notification.error({
      message: "Sign in",
      description: "Server Error!",
    });
  }
};

export const logout = (req) => async (dispatch) => {
  try {
    await axios.post("auth/logout", req);
    dispatch({
      type: USER_AUTH_LOGOUT,
      payload: [],
    });
    return true;
  } catch (e) {
    return false;
  }
};

export const getUser = () => async (dispatch) => {
  try {
    const payload = await axios.get("api/user");

    if (payload.data.error) {
    } else if (payload.data) {
      dispatch({
        type: USER_AUTH_LOGIN,
        payload: payload.data,
      });
    }
  } catch (e) {}
};

export const signup = (req) => async (dispatch) => {
  try {
    const payload = await axios.post("auth/signup", req);

    if (payload.data.error) {
      notification.error({
        message: "Sign-up error",
        description: payload.data.error,
      });
      return false;
    } else if (payload.data.name) {
      notification.success({
        message: "Sign up successful",
      });
      return true;
    }
  } catch (e) {
    notification.error({
      message: "Sign up",
      description: "Server Error!",
    });
    return false;
  }
};

export const getArticle = (req = {}) => async (dispatch) => {
  const notification_context = "Get article";
  try {
    const payload = await axios.get("api/article", req);
    debugger;
    if (payload.data.error) {
      notification.error({
        message: notification_context,
        description: payload.data.error,
      });
    } else if (payload.data) {
      dispatch({
        type: USER_ARTICLE_LIST,
        payload: payload.data,
      });
      notification.success({
        message: notification_context,
        description: " article list fetched ",
      });
    }
  } catch (e) {
    notification.error({
      message: notification_context,
      description: e.message,
    });
  }
};

export const getPublishedArticle = (req = {}) => async (dispatch) => {
  const notification_context = "Get article";
  try {
    const payload = await axios.get("public/article", req);

    if (payload.data.error) {
      notification.error({
        message: notification_context,
        description: payload.data.error,
      });
    } else if (payload.data) {
      dispatch({
        type: PUBLIC_ARTICLE_LIST,
        payload: payload.data,
      });
      if (payload.data.length == 0) {
        notification.success({
          message: notification_context,
          description: "No Article found login to create one",
        });
      }
    }
  } catch (e) {
    notification.error({
      message: notification_context,
      description: e.message,
    });
  }
};

export const addArticle = (req) => async (dispatch) => {
  const notification_context = "Add article";
  try {
    const payload = await axios.post("api/article", req);

    if (payload.data.error) {
      notification.error({
        message: notification_context,
        description: payload.data.error,
      });
      return false;
    } else if (payload.data) {
      dispatch({
        type: USER_ARTICLE_ADD,
        payload: payload.data,
      });
      notification.success({
        message: notification_context,
        description: "article Added",
      });

      return true;
    }
  } catch (e) {
    notification.error({
      message: notification_context,
      description: e,
    });

    return false;
  }
};

export const updateArticle = (id, req) => async (dispatch) => {
  const notification_context = "article";
  try {
    const payload = await axios.patch(`api/article/${id}`, req);

    if (payload.data.error) {
      notification.error({
        message: notification_context,
        description: payload.data.error,
      });
      return false;
    } else if (payload.data) {
      dispatch({
        type: USER_ARTICLE_UPDATE,
        payload: payload.data,
      });
      notification.success({
        message: notification_context,
        description: "article update",
      });

      return true;
    }
  } catch (e) {
    notification.error({
      message: notification_context,
      description: e.message,
    });

    return false;
  }
};
