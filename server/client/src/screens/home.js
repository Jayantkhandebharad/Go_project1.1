//import { JsonWebTokenError } from "jsonwebtoken";
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";
import { Link, useHistory } from "react-router-dom";


const Home = () => {
  const [data, setData] = useState([]);
  const { state } = useContext(UserContext);
  const history = useHistory();
  useEffect(() => {
    if(!state){
      history.push('/login')
    }
    fetch("/allpost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setData(result.post);
      });
  }, []);

  const likePost = (id) => {
    fetch("/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const unlikePost = (id) => {
    fetch("/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deletePost = (postid) => {
    fetch(`/deletepost/${postid}`, {
      method: "delete",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = data.filter((item) => {
          return item._id !== result._id;
        });
        setData(newData);
      })
      .catch((err) => {
        console.warn(err.responseText);
        //console.log(err);
      });
  };



  return (
    <div style={{ backgroundcolor: "#D0EFFF", }}>
      

      <div className="home" style={{ display: "flex", flexDirection: "column-reverse" }}>
        {data.map((item) => {
          return (
            <Link style={{ color: "black", alignSelf: "center" }} to={"/openpost/" + item._id}>
              <div className="card home-card" style={{ width: "1100px", display: "flex", flexDirection: "column", alignItems: "flex-start" }} key={item._id}>
                <p style={{ fontSize: "24px", fontWeight: "700", color: "black", width: "100%", alignItems: "center" }}>
                  <div className="card-image" style={{ alignSelf: "center", display: 'flex', alignItems: "center", flexDirection: "column" }}>
                    <Link style={{ alignSelf: "center" }}
                      to={
                        item.postedBy._id !== state._id
                          ? "/profile/" + item.postedBy._id
                          : "/profile/"
                      }
                    >
                      <img src={item.postedBy.pic} style={{
                        width: "160px",
                        height: "160px",
                        borderRadius: "80px",
                      }} />
                    </Link>

                  </div>
                  <div style={{ alignSelf: "center", display: 'flex', alignItems: "center", flexDirection: "column" }}>
                    <Link style={{ color: "black", alignSelf: "center" }}
                      to={
                        item.postedBy._id !== state._id
                          ? "/profile/" + item.postedBy._id
                          : "/profile/"
                      }
                    >
                      {item.postedBy.name}
                    </Link>


                  </div>
                  <div style={{ alignSelf: "flex-end", }}>
                    {item.postedBy._id === state._id && (
                      <i
                        className="material-icons"
                        style={{ float: "right", color: "black", padding: "1px", marginTop: "-0.5rem" }}
                        onClick={() => deletePost(item._id)}
                      >
                        delete
                      </i>
                    )}
                  </div>
                </p>
                <div className="card-image">
                  {/* <img src={item.photo} alt={item.title} /> */}
                </div>

                <p style={{ fontSize: "23px", fontWeight: "600", alignSelf: "center", marginTop: "-0.5rem" }}>Title: {item.title} </p>
                
              </div>
            </Link>
          );
        })}

        <div className="card home-card" style={{ width: "1100px", marginTop: "75px" }}> <p style={{
          paddingTop: "12px",
          paddingLeft: "10px", marginTop: "0px", fontSize: "30px", fontWeight: "800"
        }}>Posts</p></div>
      </div>
    </div >
  );
};

export default Home;