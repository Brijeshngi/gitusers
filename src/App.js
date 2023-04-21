import "./App.css";
import axios from "axios";
import React, { useState } from "react";

function App() {
  const [users, setUsers] = useState("");
  const [repos, setRepos] = useState([]);
  console.log(repos);
  console.log("main users", users);

  const handleSearch = () => {
    var config = {
      method: "get",
      url: `https://api.github.com/users/${users}`,
    };

    axios(config)
      .then(function (response) {
        setUsers(response.data);

        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handleRepos = () => {
    var config = {
      method: "get",
      url: `https://api.github.com/users/${users}/repos`,
    };

    axios(config)
      .then(function (response) {
        if(response){
        setRepos(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <React.Fragment>
      
      <div className="search-bar">
        <input
          onChange={(event) => {
            setUsers(event.target.value);
          }}
          type="text"
          className="user-form"
          id="form"
          placeholder="Enter Github username "
        />
        <button
          onClick={() => {
            handleSearch();
            handleRepos();
          }}
        >
          Search
        </button>
      </div>
      {repos.length>0?(<div className="card">
        <div className="avatar-details">
          <img
            src={users.avatar_url}
            alt="git users avatar"
            className="avatar"
          />
          <button>{users.name}</button>
          <div className="user-info">
            <ul>
              <li>
                <div className="followers-count">{users.followers} <strong>Followers</strong></div>
                
              </li>
              <li>
                <div className="followers-count">{users.following} <strong>Followings</strong></div>
                
              </li>
              <li>
                <div className="followers-count">{users.public_repos}<strong>Repositories</strong></div>
                
              </li>
            </ul>
          </div>
        </div>

        <div className="repos">
          <div className="repos-heading">
            <h1>Repositories</h1>
          </div>

          <div>
            {repos.map((repoName) => (
              <a href={repoName.clone_url}>
                <ul>
                  <li>{repoName.name}</li>
                </ul>
              </a>
            ))}
          </div>
        </div>
      </div>):null}
      
    </React.Fragment>
  );
}

export default App;
