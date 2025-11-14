import express from "express";
import cors from "cors";
import authRouter from "./routes/authRoute.js";
import guestRouter from "./routes/guestRoute.js";
//import adminRouter from "./routes/adminRoute.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use(authRouter)
app.use(guestRouter)
//app.use(adminRouter)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});