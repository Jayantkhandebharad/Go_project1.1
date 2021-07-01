import React, { useEffect, createContext, useReducer, useContext } from "react";
import NavBar from "./components/navbar";
import "./App.css";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import Home from "./screens/home";
import Login from "./screens/login";
import Profile from "./screens/profile";
import Signup from "./screens/signup";
import CreatPost from "./screens/creatPost";
import { reducer, initialState } from "./reducers/userReducer";
import UserProfile from "./screens/UserProfile";
import OpenPost from "./screens/OpenPost";
export const UserContext = createContext();

const Routing = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("USER"));

    if (user) {
      dispatch({ type: "USER", payload: user });
    } else {
      history.push("/login");
    }
  }, []);
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/creatPost">
        <CreatPost />
      </Route>

      <Route path="/profile/:userid">
        <UserProfile />
      </Route>

      <Route path="/OpenPost/:postid">
        <OpenPost />
      </Route>
    </Switch>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <NavBar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
