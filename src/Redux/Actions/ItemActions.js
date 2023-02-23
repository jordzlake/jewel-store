import {
  ITEM_LIST_REQUEST,
  ITEM_LIST_FAIL,
  ITEM_LIST_SUCCESS,
} from "../Constants/ItemConstants";
import { URL } from "../../Url";

import axios from "axios";

export const listItem = () => async (dispatch) => {
  try {
    dispatch({ type: ITEM_LIST_REQUEST });
    const data = await axios.get(`${URL}/api/items`);
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
