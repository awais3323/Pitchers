import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { githubUser, githubUserFollowers, githubUserRepos } from "../../Store/Actions/userAction";
import Repo from "../Custom/Repo";
import Cards from "../Custom/Cards";
import "./index.css";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const { gitUser } = useSelector((state) => state.gitUser);
  const { gitUserRepo } = useSelector((state) => state.gitUserRepo);
  const { gitUserFollowers } = useSelector((state) => state.gitUserFollower);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(githubUser(user.user.username));
    dispatch(githubUserRepos(user.user.username));
    // dispatch(githubUserFollowers(user.user.username));
  }, []);
function navigateToCreateDiscussion(){
 navigate("/osp-create") 
}
  return (
    <>
      {gitUser != null ? (
        <>

          <div>
          <div className="profile-main">
            <div className="profile-main-pic">
              <img
                className="profile-main-dp"
                src={gitUser?.avatar_url}
                alt="...."
              />{" "}
            </div>
            <div className="profile-main-user">
              <span>
                <b>Name: </b> {user.user.name}
              </span>
              <span>
                <b>User Name: </b>
                {user.user.username}
              </span>
              <span>
                <b>Title: </b>
                {user.user.title}
              </span>
              <span>
                <b>Email: </b>
                {user.user.email}
              </span>
              <span>
                <b>Age: </b>
                {user.user.age}
              </span>
              <span>
                <b>Birth Date: </b>
                {user.user.date_of_birth}
              </span>
              <span>
                <b>Phone No: </b>
                {user.user.phone_no}
              </span>
            </div>
            <div className="profile-main-user profile-main-user-2">
              <span>
                <b>Location: </b> {gitUser?.location}
              </span>
              <span>
                <b>followers: </b> {gitUser?.followers}
              </span>
              <span>
                <b>following: </b> {gitUser?.following}
              </span>
              <span>
                <b>Public Repo: </b> {gitUser?.public_repos}
              </span>
              <span>
                <b>Twitter: </b> {gitUser?.twitter_username}
              </span>
              <span>
                <b>Company: </b> {gitUser?.company}
              </span>
            </div>
            </div>
            <div className="other-acts">
              <span className="create-discussion" onClick={navigateToCreateDiscussion}>Create a discussion</span>
            </div>
          </div>
        </>
      ) : (
        <span>Nothing is here</span>
      )}
      <div className="git-repo-box">
        <h3>Repos:</h3>
        <div className="git-repo-box-inside">
          {gitUserRepo?.map((gur, i) => (
            <Repo
              key={i}
              title={gur.name}
              desc={gur.description}
              url={gur.html_url}
              forks={gur.forks}
              open_issues={gur.open_issues}
              branch={gur.branch}
            />
          ))}
        </div>
      </div>
      <div className="git-repo-box">
        <h3>Followers:</h3>
        <div className="git-repo-box-inside">
          {gitUserFollowers?.map((gur, i) => (
            <Cards key={i} img={gur.avatar_url} name={gitUser} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Profile;
