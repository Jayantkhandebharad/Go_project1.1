import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../App";
import { useParams } from "react-router-dom";


const Profile = () => {
  const [userProfile, setProfile] = useState(null);
  const { state, dispatch } = useContext(UserContext);
  const { userid } = useParams();
  console.log(userid);
  useEffect(() => {
    fetch(`/user/${userid}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setProfile(result);
      });
  }, []);
  return (
    <>
      <div style={{ backgroundColor: "#D0EFFF", minHeight: "41.5rem" }}>
        {userProfile ? (

          <div style={{ maxWidth: "600px", margin: "auto", }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                margin: "0px 0px",
                borderBottom: "1px solid grey",
                paddingTop: "100px",
              }}
            >
              <div>
                <img
                  style={{
                    width: "160px",
                    height: "160px",
                    borderRadius: "80px",
                  }}
                  src={userProfile.user.pic}
                  alt="profile"
                />
              </div>
              <div>
                <h4>{userProfile.user.name}</h4>
                <h5>{userProfile.user.email}</h5>
                <h5>{userProfile.user.rig_id}</h5>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "108%",
                  }}
                >
                  <h6>{userProfile.posts.length} projects</h6>{" "}
                </div>
              </div>
            </div>
            <div className="gallery">
              {userProfile.posts.map((item) => {
                return (
                  <img
                    key={item._id}
                    className="item"
                    src={item.photo}
                    alt={item.title}
                  />
                );
              })}
            </div>
          </div>
        ) : (
          <h2>loading...</h2>
        )}
      </div>
    </>
  );
};

export default Profile;
