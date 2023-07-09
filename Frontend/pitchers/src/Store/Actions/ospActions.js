import {
  GET_ALL_OSP_REQUEST,
  GET_ALL_OSP_SUCCESS,
  GET_ALL_OSP_FAIL,
} from "../constants";

export const getAllOsps = (getAllOsp) => async (dispatch) => {
  let response;
  try {
    dispatch({
      type: GET_ALL_OSP_REQUEST,
    });

    response = await getAllOsp();
    console.log(response)
    if (response.data) {
      dispatch({ type: GET_ALL_OSP_SUCCESS, payload: response.data.registerUser });
    } else {
      dispatch({
        type: GET_ALL_OSP_FAIL,
        payload: response.data.loginUser.errors[0].message,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_ALL_OSP_FAIL,
      payload: response,
    });
  }
};
