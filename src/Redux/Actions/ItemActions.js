import {
  ITEM_LIST_REQUEST,
  ITEM_LIST_FAIL,
  ITEM_LIST_SUCCESS,
  ITEM_DELETE_REQUEST,
  ITEM_DELETE_SUCCESS,
  ITEM_DELETE_FAIL,
  ITEM_DETAIL_REQUEST,
  ITEM_DETAIL_SUCCESS,
  ITEM_DETAIL_FAIL,
  ITEM_CREATE_REQUEST,
  ITEM_CREATE_SUCCESS,
  ITEM_CREATE_FAIL,
  ITEM_UPDATE_REQUEST,
  ITEM_UPDATE_SUCCESS,
  ITEM_UPDATE_FAIL,
} from "../Constants/ItemConstants";
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
export const listItem = () => async (dispatch) => {
  try {
    dispatch({ type: ITEM_LIST_REQUEST });
    const { data } = await axios.get(`${URL}/api/items`);
    dispatch({
      type: ITEM_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ITEM_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Item Detail
export const itemDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: ITEM_DETAIL_REQUEST });
    const { data } = await axios.get(`${URL}/api/items/${id}`);
    dispatch({
      type: ITEM_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }

    dispatch({
      type: ITEM_DETAIL_FAIL,
      payload: message,
    });
  }
};

//Admin Item Delete By ID
export const deleteItem = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ITEM_DELETE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`${URL}/api/items/${id}`, config);
    dispatch({ type: ITEM_DELETE_SUCCESS });
    dispatch(listItem());
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
      type: ITEM_DELETE_FAIL,
      payload: message,
    });
    toast.error(message, ToastObjects);
  }
};

//Admin item Create Action
export const itemCreate =
  (
    name,
    price,
    type,
    mainImage,
    subImages,
    street,
    city,
    country,
    interiorFeatures,
    exteriorFeatures,
    bedrooms,
    bathrooms,
    description,
    size,
    mapIframe
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: ITEM_CREATE_REQUEST });

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
        `${URL}/api/items/`,
        {
          name,
          price,
          type,
          mainImage,
          subImages,
          street,
          city,
          country,
          interiorFeatures,
          exteriorFeatures,
          bedrooms,
          bathrooms,
          description,
          size,
          mapIframe,
        },
        config
      );

      dispatch({ type: ITEM_CREATE_SUCCESS, payload: data });
      toast.success("Item Added Successfully", ToastObjects);
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }

      dispatch({
        type: ITEM_CREATE_FAIL,
        payload: message,
      });
      let err;
      message.toLowerCase() == "Network Error".toLowerCase()
        ? (err = "Images may be too large")
        : (err = message);
      toast.error(err, ToastObjects);
    }
  };

// UPDATE PRODUCT
export const updateItem = (item) => async (dispatch, getState) => {
  try {
    dispatch({ type: ITEM_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `${URL}/api/items/${item._id}`,
      item,
      config
    );

    dispatch({ type: ITEM_UPDATE_SUCCESS, payload: data });
    dispatch({ type: ITEM_DETAIL_SUCCESS, payload: data });
    toast.success("Item Updated Successfully", ToastObjects);
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }

    dispatch({
      type: ITEM_UPDATE_FAIL,
      payload: message,
    });
    toast.error(message, ToastObjects);
  }
};
