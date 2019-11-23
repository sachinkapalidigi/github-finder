import React, { Component } from "react";
import PropTypes from "prop-types";
import Spinner from "../layouts/Spinner";
import { Link } from "react-router-dom";
import Repos from "../Repos/Repos";

class User extends Component {
  componentDidMount() {
    this.props.getUser(this.props.match.params.login);
    this.props.getRepos(this.props.match.params.login);
  }
  render() {
    const {
      name,
      avatar_url,
      location,
      bio,
      blog,
      login,
      html_url,
      company,
      followers,
      following,
      public_repos,
      public_gists,
      hireable
    } = this.props.user;

    const { loading, repos } = this.props;

    if (loading) {
      return <Spinner />;
    }

    return (
      <>
        <Link to="/" className="btn btn-light">
          Back to Search
        </Link>
        Hireable :{" "}
        {hireable ? (
          <i className="fas fa-check text-success" />
        ) : (
          <i className="fas fa-times-circle text-danger" />
        )}
        <div className="card grid-2">
          <div className="all-center">
            <img
              src={avatar_url}
              alt="Profile"
              className="round-img"
              style={{ width: "150px" }}
            />
          </div>
          <div>
            <h3>{name}</h3>
            <p>Location : {location}</p>
            {bio && (
              <>
                <h4>Bio</h4>
                <p>{bio}</p>
                <a className="btn btn-dark" href={html_url}>
                  Visit Github Profile
                </a>
              </>
            )}

            <ul>
              <li>{login && <strong>{login}</strong>}</li>
              <li>{company && <strong>{company}</strong>}</li>
              <li>{blog && <strong>{blog}</strong>}</li>
            </ul>
          </div>
        </div>
        <div className="card text-center">
          <button className="badge badge-primary">
            Followers : {followers}
          </button>
          <button className="badge badge-success">
            Following : {following}
          </button>
          <button className="badge badge-light">
            Public Repos : {public_repos}
          </button>
          <button className="badge badge-dark">
            Public Gists : {public_gists}
          </button>
        </div>
        <div>
          <Repos repos={repos} />
        </div>
      </>
    );
  }
}

User.propTypes = {
  loading: PropTypes.bool,
  getUser: PropTypes.func,
  user: PropTypes.object,
  repos: PropTypes.array.isRequired,
  getRepos: PropTypes.func.isRequired
};

export default User;
