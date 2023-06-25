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
  CLEAR_ERRORS,
  GITUSER_FOLLOWERS_REQUEST,
  GITUSER_FOLLOWERS_SUCCESS,
  GITUSER_FOLLOWERS_FAIL,

} from "../constants";

export const userReducer = (state = { user: [] }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case LOGIN_FAIL:
    case REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const gitUserReducer = (state = { user: [] }, action) => {
  switch (action.type) {
    case GITUSER_REQUEST:
      return {
        loading: true,
        userExist: false,
      };
      case GITUSER_SUCCESS:
        return{
          ...state,
          loading:false,
          userExist:true,
          gitUser:action.payload
        }
      case GITUSER_FAIL:
        return{
          ...state,
          loading:false,
          userExist:false,
          gitUser:null,
          error:action.payload
        }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const gitUserReposReducer = (state = { user: [] }, action) => {
  switch (action.type) {
    case GITUSER_REPOS_REQUEST:
      return {
        loading: true,
      };
      case GITUSER_REPOS_SUCCESS:
        return{
          ...state,
          loading:false,
          gitUserRepo:action.payload
        }
      case GITUSER_REPOS_FAIL:
        return{
          ...state,
          loading:false,
          gitUserRepo:null,
          error:action.payload
        }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
export const gitUserFollowersReducer = (state = { user: [] }, action) => {
  switch (action.type) {
    case GITUSER_FOLLOWERS_REQUEST:
      return {
        loading: true,
      };
      case GITUSER_FOLLOWERS_SUCCESS:
        return{
          ...state,
          loading:false,
          gitUserFollowers:action.payload
        }
      case GITUSER_FOLLOWERS_FAIL:
        return{
          ...state,
          loading:false,
          gitUserFollowers:null,
          error:action.payload
        }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};