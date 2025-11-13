import express from "express";
import cors from "cors";
import authRouter from "./routes/authenticationRoute.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use(authRouter)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});