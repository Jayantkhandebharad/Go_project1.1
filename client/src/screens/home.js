//import { JsonWebTokenError } from "jsonwebtoken";
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";
import { Link } from "react-router-dom";



const Home = () => {
  const [data, setData] = useState([]);
  const { state } = useContext(UserContext);
  useEffect(() => {
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

  // const makeComment = (text, postId) => {
  //   fetch("/comment", {
  //     method: "put",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + localStorage.getItem("jwt"),
  //     },
  //     body: JSON.stringify({
  //       text,
  //       postId,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {
  //       console.log(result);
  //       const newData = data.map((item) => {
  //         if (item._id === result._id) {
  //           return result;
  //         } else {
  //           return item;
  //         }
  //       });
  //       setData(newData);
  //     })
  //     .catch((err) => {
  //       console.warn(err.responseText);
  //       //console.log(err);
  //     });
  // };

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
      {/*previously added own profile on lift side */}
      {/*<div style={{
        display: "flex", flexDirection: "column-reverse", marginTop: "90px", maxWidth: "420px", width: "20%",
        alignSelf: "flex-start", position: "fixed"

      }}>
       // if you want to add profile card on frontend screen 
        <div className="card" style={{ padding: "2rem", margineTop: "0px", marginLeft: "30px" }}>
          <div style={{ display: "flex", flexDirection: "column", textAlign: "center", alignItems: "center", alignSelf: "center" }}>
            <img
              style={{
                width: "160px",
                height: "160px",
                borderRadius: "80px",
                alignSelf: "center"
              }}
              src={state ? state.pic : "loading..."}
              alt="profile"
            />
          </div>
          <div style={{ textAlign: "center" }}>
            <h5>{state ? state.name : "loading..."}</h5>
          </div>
        </div>
        </div>*/}

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
                {/* <p style={{ fontSize: "19px", marginTop: "-0.5rem", marginLeft: "1rem" }}>Members:: {item.members} </p>
                <p style={{ fontSize: "19px", marginTop: "-0.5rem", marginLeft: "1rem" }}>Domain:: {item.domain} </p>
                <p style={{ fontSize: "17px", marginTop: "-0.5rem", marginLeft: "1rem" }}>Techonologies used:: {item.tech} </p>
                <p style={{ fontSize: "17px", marginTop: "-0.5rem", marginLeft: "1rem" }}>Occassion:: {item.occasion} </p>
                <p style={{ fontSize: "17px", marginTop: "-0.5rem", marginLeft: "1rem" }}>is it open for collabration:: {item.apply} </p>
                <p style={{ fontSize: "15px", marginTop: "-0.5rem", marginLeft: "1rem" }}>Description:: {item.body} </p>
                <p style={{ fontSize: "15px", marginTop: "-0.5rem", marginLeft: "1rem" }}>for further reference::
                  <a href={item.hlink} target="_blank" style={{ cursor: PointerEvent }}>know more</a></p> */}
                {/* <div className="card-content">
                  <i className="material-icons" style={{ color: "rgb(174,74,34)" }}>
                    whatshot
                  </i>
                  {item.likes.includes(state._id) ? (
                    <i
                      className="material-icons" style={{ color: "black", marginLeft: "6px" }}
                      onClick={() => {
                        unlikePost(item._id);
                      }}
                    >
                      thumb_down
                    </i>
                  ) : (
                    <i
                      className="material-icons" style={{ color: "black", marginLeft: "6px" }}
                      onClick={() => {
                        likePost(item._id);
                      }}
                    >
                      thumb_up
                    </i>
                  )}
                  <h5> {item.likes.length} likes </h5>

                  {/* {item.comments.map((record) => {
                  return (
                    <h6 key={record._id}>
                      <span style={{ fontWeight: "500" }}>
                        {record.postedBy.name}
                      </span>
                      {record.text}
                    </h6>
                  );
                })}
                <form >
                  onSubmit={(e) => {
                    e.preventDefault();
                    makeComment(e.target[0].value, item._id);
                  }}
                >
                  <input type="text" placeholder=" add comment" />
                </form>
              </div> */}

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