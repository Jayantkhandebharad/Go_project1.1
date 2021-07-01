const mongoose = require("mongoose");
const express = require("express");
const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  postedBy: {
    type: ObjectId,
    ref: "User",
  },
  members: {
    type: String,
    required: true,
  },
  occasion: {
    type: String,
    required: true,
  },
  domain: {
    type: String,
    required: true,
  },
  tech: {
    type: String,
    required: true,
  },
  apply: {
    type: String,
    required: true,
  },
  hlink: {
    type: String,
    required: true,
  },
  comments: [
    {
      text: String,
      postedBy: { type: ObjectId, ref: "User" },
    },
  ],
  likes: [{ type: ObjectId, ref: "User" }],
});
mongoose.model("post", postSchema);
