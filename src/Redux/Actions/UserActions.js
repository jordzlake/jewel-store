import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from "../Constants/UserConstants";
import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "../../Url";
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

// LOGIN
export const login = (username, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${URL}/api/users/login`,
      { username, password },
      config
    );

    if (!data.isAdmin === true) {
      toast.error("You are not an Admin", ToastObjects);
      dispatch({
        type: USER_LOGIN_FAIL,
      });
    } else {
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
      toast.success("Login Success", ToastObjects);
    }

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    toast.error(message, ToastObjects);
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }

    dispatch({
      type: USER_LOGIN_FAIL,
      payload: message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
};
