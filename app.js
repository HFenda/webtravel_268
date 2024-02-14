const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const app = express();

mongoose.connect(
  "mongodb+srv://aliefendicharun21:harun@dbtravel268.wipejz0.mongodb.net/"
);

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://aliefendicharun21:harun@dbtravel268.wipejz0.mongodb.net/",
    }),
  })
);

app.use("/", require("./routes/index"));
app.use("/trips", require("./routes/trips"));
app.use("/admin", require("./routes/admin"));
app.use("/user", require("./routes/user"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
