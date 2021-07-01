const express = require("express");
const mongoose = require("mongoose");
const app = express();
const { MONGOURI } = require("./keys");
const PORT = 5001;

mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("connected to mongos yeah");
});
mongoose.connection.on("error", (err) => {
  console.log("error aali jk :", err);
});

require("./models/user");
require("./models/post");

app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/post"));
app.use(require("./routes/user"));

app.listen(PORT, () => {
  console.log("server is running on ", PORT);
});
