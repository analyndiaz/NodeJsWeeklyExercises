const express = require("express");
const { userRouter } = require("./routers");

const PORT = process.env.port || 8080;
const app = express();

app.use(express.json());

app.use("/users", userRouter);

app.listen(PORT, () => {
  console.log(`Started server at port ${PORT}`);
});
