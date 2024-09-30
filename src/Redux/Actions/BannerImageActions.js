import {
  BANNER_IMAGE_LIST_REQUEST,
  BANNER_IMAGE_LIST_FAIL,
  BANNER_IMAGE_LIST_SUCCESS,
  BANNER_IMAGE_DELETE_REQUEST,
  BANNER_IMAGE_DELETE_SUCCESS,
  BANNER_IMAGE_DELETE_FAIL,
  BANNER_IMAGE_CREATE_REQUEST,
  BANNER_IMAGE_CREATE_SUCCESS,
  BANNER_IMAGE_CREATE_FAIL,
} from "../Constants/BannerImageConstants";
import { URL } from "../../Url";
import { toast } from "react-toastify";
import axios from "axios";
import { logout } from "./UserActions";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

//Get Items
export const listBannerImage = () => async (dispatch) => {
  try {
    dispatch({ type: BANNER_IMAGE_LIST_REQUEST });
    const { data } = await axios.get(`${URL}/api/bannerImage`);
    dispatch({
      type: BANNER_IMAGE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BANNER_IMAGE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//Admin Item Delete By ID
export const deleteBannerImage = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: BANNER_IMAGE_DELETE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`${URL}/api/bannerImage/${id}`, config);
    dispatch({ type: BANNER_IMAGE_DELETE_SUCCESS });
    dispatch(listBannerImage());
    toast.success("Item Deleted Successfully", ToastObjects);
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    if (
      message === "Not authorized, no token" ||
      message === "Not authorized, token invalid"
    ) {
      dispatch(logout());
    }

    dispatch({
      type: BANNER_IMAGE_DELETE_FAIL,
      payload: message,
    });
    toast.error(message, ToastObjects);
  }
};

//Admin item Create Action
export const createBannerImage = (imageUrl) => async (dispatch, getState) => {
  try {
    dispatch({ type: BANNER_IMAGE_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${URL}/api/bannerImage/`,
      { imageUrl },
      config
    );

    dispatch({ type: BANNER_IMAGE_CREATE_SUCCESS, payload: data });
    toast.success("Banner Image Added Successfully", ToastObjects);
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }

    dispatch({
      type: BANNER_IMAGE_CREATE_FAIL,
      payload: message,
    });
    let err;
    message.toLowerCase() == "Network Error".toLowerCase()
      ? (err = "Banner Image may be too large")
      : (err = message);
    toast.error(err, ToastObjects);
  }
};
