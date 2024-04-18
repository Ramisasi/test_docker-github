import * as indexRouter from "./modules/index.router.js";
import ConntionDB from "./DB/conntion.js";

import dotenv from "dotenv";
dotenv.config();
import ex from "express";
//asdasd
const app = ex();
const port = process.env.portNumber;
const basurl = process.env.basUrlName;
app.use(ex.json());

app.use(`${basurl}/auth`, indexRouter.authRouter);
app.use(`${basurl}/user`, indexRouter.userRouter);
app.use(`${basurl}/message`, indexRouter.messageRouter);

app.get("*", (req, res) => {
  res.json({ message: "In-Valid Router 5" });
});

ConntionDB();
app.listen(port, () => {
  console.log(`Server is Run at ........ddd........ ${port}`);
});
