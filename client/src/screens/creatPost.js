import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import M from "materialize-css";

const CreatPost = () => {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [members, setMembers] = useState("");
  const [occasion, setOccasion] = useState("");
  const [domain, setDomain] = useState("");
  const [tech, setTech] = useState("");
  const [apply, setApply] = useState("");
  const [hlink, setHlink] = useState("");

  useEffect(() => {
    if (url) {
      fetch("/createPost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          title,
          body,
          pic: url,
          members,
          occasion,
          domain,
          tech,
          apply,
          hlink,

        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            M.toast({
              html: data.error,
              classes: "#ef9a9a red darker-1",
            });
          } else {
            M.toast({
              html: "posted successfully!!",
              classes: "#43a047 green darken-1",
            });
            history.push("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [url]);

  const postDetails = () => {
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
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <from>
      <div class="crpost">
        <div
          className="card input-filed crpostcard"
          style={{
            alignSelf: 'center',
            maxWidth: "70%",
            padding: "20px",
            textAlign: "center",
          }}
        >
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Members"
            value={members}
            onChange={(e) => setMembers(e.target.value)}
          />

          <input
            type="text"
            placeholder="Domain"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
          />
          <input
            type="text"
            placeholder="sub-techonology"
            value={tech}
            onChange={(e) => setTech(e.target.value)}
          />
          <textarea
            type="text" size="300" rows="10"
            placeholder="Description"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <input
            type="text"
            placeholder="open for collabration/not"
            value={apply}
            onChange={(e) => setApply(e.target.value)}
          />
          <input
            type="text"
            placeholder="link for more info"
            value={hlink}
            onChange={(e) => setHlink(e.target.value)}
          />

          <input
            type="text"
            placeholder="occasion"
            value={occasion}
            onChange={(e) => setOccasion(e.target.value)}
          />
          <div className="file-field input-field">
            <div className="btn #64b5f6 blue darken-1">
              <span> Upload file </span>
              <input type="file" onChange={(e) => setImage(e.target.files[0])} />
            </div>
            <div className="file-path-wrapper">
              <input className="file-path validate" type="text" />
            </div>
          </div>
          <button
            className="btn waves-effect waves-light #64b5f6 blue darken-1"
            onClick={() => postDetails()}
          >
            Submit project
          </button>
        </div>
      </div>
    </from>
  );
};

export default CreatPost;
