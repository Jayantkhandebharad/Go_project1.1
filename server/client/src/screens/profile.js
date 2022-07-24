import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../App";


const Profile = () => {
  const [mypics, setPics] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const [image, setImage] = useState("");
  const [url, setUrl] = useState(undefined);


  useEffect(() => {
    fetch("/mypost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setPics(result.mypost);
      });
  }, []);

  useEffect(() => {
    if (image) {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "instaclone");
      data.append("cloud_name", "jayu");
      fetch("	https://api.cloudinary.com/v1_1/jayu/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {

          // localStorage.setItem("user", JSON.stringify({ ...state, pic: data.url }))
          // dispatch(({ type: "UPDATEPIC", payload: data.url }))
          fetch("/updatepic", {
            method: "put",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + localStorage.getItem("jwt")
            }, body: JSON.stringify({
              pic: data.url
            })
          }).then(res => res.json())
            .then(result => {
              console.log(result)
              localStorage.setItem("user", JSON.stringify({ ...state, pic: result.pic }))
              dispatch(({ type: "UPDATEPIC", payload: result.pic }))
            })

        })
        .catch((err) => {
          console.log(err);
        });
    }

  }, [image])
  const updatePhoto = (file) => {
    setImage(file)

  };

  return (
    <div style={{ backgroundColor: "#D0EFFF", minHeight: "41.5rem" }}>
      <div style={{ maxWidth: "600px", margin: "auto" }} >
        <div
          style={{
            display: "flex",
            paddingTop: "100px",
            justifyContent: "space-around",
            margin: "0px 0px",
            borderBottom: "1px solid grey",
          }}
        >
          <div>
            <img
              style={{ width: "160px", height: "160px", borderRadius: "80px" }}
              src={state ? state.pic : "loading.."}
              alt="profile"
            />
            <div className="file-field input-field">
              <div className="btn #64b5f6 blue darken-1">
                <span> Update profile pic</span>
                <input type="file" onChange={(e) => updatePhoto(e.target.files[0])} />
              </div>
              <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
              </div>
            </div>
          </div>
          <div>
            <h4>{state ? state.name : "loading..."}</h4>
            <h4>{state ? state.rig_id : "loading..."}</h4>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "108%",
              }}
            >
              <h6> {mypics.length} projects </h6>
            </div>
          </div>
        </div>
        <div className="gallery">
          {mypics.map((item) => {
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
    </div>
  );
};

export default Profile;
