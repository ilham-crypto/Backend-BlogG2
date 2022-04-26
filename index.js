const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const app = express();
const db = require("./config/db").promise();

dotenv.config();
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "http://localhost:3001"],
  })
);
app.use(express.urlencoded({ extended: true }));

const post = require("./routes/postsRouter.js");
app.use("/api/post", post);
const category = require("./routes/categoryRouter.js");
app.use("/api/category", category);
const comment = require("./routes/commentRouter.js");
app.use("/api/comment", comment);
const users = require("./routes/userRouter.js");
app.use("/api/users", users);

app.use("/Images", express.static("./Images"));

const PORT = process.env.PORT || 2020;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

app.post("/getPostId", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM  posts where id = ? ", [
      req.body.ids,
    ]);
    if (rows.length > 0) {
      return res.json({ success: true, listId: rows });
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/editPost", async (req, res) => {
  try {
    const [update] = await db.execute(
      "UPDATE `posts` SET `title`=?, `description`=? WHERE id = ?",
      [req.body.title, req.body.description, req.body.ids]
    );
    if (update.affectedRows === 1) {
      return res.json({ success: true });
    }
  } catch (err) {
    console.log(err);
  }
});
