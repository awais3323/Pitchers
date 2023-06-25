import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  GITUSER_REQUEST,
  GITUSER_SUCCESS,
  GITUSER_FAIL,
  GITUSER_REPOS_REQUEST,
  GITUSER_REPOS_SUCCESS,
  GITUSER_REPOS_FAIL,
  GITUSER_FOLLOWERS_REQUEST,
  GITUSER_FOLLOWERS_SUCCESS,
  GITUSER_FOLLOWERS_FAIL,
} from "../constants";
import axios from "axios";

export const login = (data, logIn) => async (dispatch) => {
  let response;
  try {
    dispatch({
      type: LOGIN_REQUEST,
    });

    response = await logIn({ options: data });
    if (response.data.loginUser.status) {
      dispatch({ type: LOGIN_SUCCESS, payload: response.data.loginUser });
    } else {
      dispatch({
        type: LOGIN_FAIL,
        payload: response.data.loginUser.errors[0].message,
      });
    }
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: response,
    });
  }
};

export const register = (data, register) => async (dispatch) => {
  let response;
  try {
    dispatch({
      type: REGISTER_REQUEST,
    });

    response = await register({ options: data });
    if (response.data.registerUser.status) {
      dispatch({ type: REGISTER_SUCCESS, payload: response.data.registerUser });
    } else {
      dispatch({
        type: REGISTER_FAIL,
        payload: response.data.loginUser.errors[0].message,
      });
    }
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: response,
    });
  }
};

export const githubUser = (username) => async (dispatch) => {
  let response;
  console.log("1", username);
  try {
    dispatch({
      type: GITUSER_REQUEST,
    });

    response = await axios.get(`https://api.github.com/users/${username}`,{
      "Authorization":"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"
    });
    dispatch({ type: GITUSER_SUCCESS, payload: response.data });
    
  } catch (error) {
    dispatch({
      type: GITUSER_FAIL,
      payload: response,
    });
  }
};
export const githubUserRepos = (username) => async (dispatch) => {
  let response;
  console.log("1", username);
  try {
    dispatch({
      type: GITUSER_REPOS_REQUEST,
    });

    response = await axios.get(`https://api.github.com/users/${username}/repos`,{
      "Authorization":"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"
    });
    dispatch({ type: GITUSER_REPOS_SUCCESS, payload: response.data});
    
  } catch (error) {
    dispatch({
      type: GITUSER_REPOS_FAIL,
      payload: response,
    });
  }
};

export const githubUserFollowers = (username) => async (dispatch) => {
  let response;
  console.log("1", username);
  try {
    dispatch({
      type: GITUSER_FOLLOWERS_REQUEST,
    });

    response = await axios.get(`https://api.github.com/users/${username}/followers`,{
      "Authorization":"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"
    });
    dispatch({ type: GITUSER_FOLLOWERS_SUCCESS, payload: response.data});
    
  } catch (error) {
    dispatch({
      type: GITUSER_FOLLOWERS_FAIL,
      payload: response,
    });
  }
};