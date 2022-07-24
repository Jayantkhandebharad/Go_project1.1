import React, { useState, useContext, useReducer } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";
import M from "materialize-css";


const Login = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const PostData = () => {
    if (
      /^(([^&lt;&gt;()\[\]\\.,;:\s@"]+(\.[^&lt;&gt;()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      M.toast({
        html: "invalid email",
        classes: "#ef9a9a red darker-1",
      });
      return;
    }
    fetch("/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          M.toast({
            html: data.error,
            classes: "#ef9a9a red darker-1",
          });
        } else {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          dispatch({ type: "USER", payload: data.user });
          M.toast({
            html: "signnedin successfully!!",
            classes: "#43a047 green darken-1",
          });
          history.push("/home");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div class="outer" 
    style={{
      height:"48vw",
    }}>
      <div
        class="one"
        style={{
          margin: "20px auto",
        }}
      >
        <div class="inputbx" >
          <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div class="inputbx" >
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button
            className="btn waves-effect waves-light #64b5f6 blue darken-1"
            onClick={() => PostData()}
          >
            Login
          </button>
        </div>
      </div>
      <div className="two">
        <img src="https://res.cloudinary.com/jayu/image/upload/v1621873855/image_l904si.jpg" 
        style={{
          height:"48vw",
        }}
        />
      </div>
    </div>
  );
};

export default Login;
