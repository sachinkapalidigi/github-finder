import React from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "./componetnts/layouts/Navbar";
import "./App.css";
import Users from "./componetnts/users/Users";
import axios from "axios";
import Search from "./componetnts/users/Search";
import { Alert } from "./componetnts/layouts/Alert";
import About from "./componetnts/pages/About";
import User from "./componetnts/users/User";

class App extends React.Component {
  state = {
    users: [],
    loading: false,
    user: {},
    alert: null
  };

  // async componentDidMount() {
  //   this.setState({
  //     loading: true
  //   });
  //   // axios.get(`https://api.github.com/user?client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
  //   // const res = await axios.get("https://api.github.com/users");
  //   const res = { data: [] };
  //   this.setState({ users: res.data, loading: false });
  // }

  // get single user
  getUser = async username => {
    this.setState({ loading: true });

    const res = await axios.get(`https://api.github.com/users/${username}`);

    this.setState({ user: res.data, loading: false });
  };

  // set alert
  setAlert = (message, type) => {
    this.setState({
      alert: { message, type }
    });

    setTimeout(() => this.setState({ alert: null }), 5000);
  };

  clearUsers = () => {
    this.setState({ users: [], loading: false });
  };

  // Search Github Users
  searchUsers = async text => {
    this.setState({
      loading: true
    });
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}`
    );
    this.setState({ users: res.data.items, loading: false });
  };

  render() {
    const { users, loading, alert, user } = this.state;
    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <Alert alert={alert} />
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <>
                  <Search
                    clearUsers={this.clearUsers}
                    searchUsers={this.searchUsers}
                    setAlert={this.setAlert}
                    {...props}
                    showClear={users.length > 0 ? true : false}
                  />
                  <Users loading={loading} users={users} />
                </>
              )}
            />
            <Route exact path="/about" component={About} />
            <Route
              exact
              path="/user/:login"
              render={props => (
                <User
                  {...props}
                  getUser={this.getUser}
                  loading={loading}
                  user={user}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
