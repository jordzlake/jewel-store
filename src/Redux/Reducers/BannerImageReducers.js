import {
  BANNER_IMAGE_CREATE_FAIL,
  BANNER_IMAGE_CREATE_REQUEST,
  BANNER_IMAGE_CREATE_RESET,
  BANNER_IMAGE_CREATE_SUCCESS,
  BANNER_IMAGE_DELETE_FAIL,
  BANNER_IMAGE_DELETE_REQUEST,
  BANNER_IMAGE_DELETE_SUCCESS,
  BANNER_IMAGE_LIST_FAIL,
  BANNER_IMAGE_LIST_REQUEST,
  BANNER_IMAGE_LIST_SUCCESS,
} from "./../Constants/BannerImageConstants";

//List all items
export const bannerImageListReducer = (
  state = { bannerImages: [] },
  action
) => {
  switch (action.type) {
    case BANNER_IMAGE_LIST_REQUEST:
      return { loading: true, bannerImages: [] };
    case BANNER_IMAGE_LIST_SUCCESS:
      return { loading: false, bannerImages: action.payload };
    case BANNER_IMAGE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//Delete item by id
export const bannerImageDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case BANNER_IMAGE_DELETE_REQUEST:
      return { loading: true };
    case BANNER_IMAGE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case BANNER_IMAGE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//Create Item
export const bannerImageCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case BANNER_IMAGE_CREATE_REQUEST:
      return { loading: true };
    case BANNER_IMAGE_CREATE_SUCCESS:
      return { loading: false, success: true, bannerImage: action.payload };
    case BANNER_IMAGE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case BANNER_IMAGE_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
