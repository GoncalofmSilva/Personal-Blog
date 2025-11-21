import { Router } from "express";
import {
  ListAllArticles,
  EditArticle,
  AddArticle,
  RemoveArticle,
} from "../controllers/adminController.js";
import { verifyToken } from "../middlewares/guestMiddleware.js";

const adminRouter = Router();

adminRouter.get("/admin", verifyToken, ListAllArticles);
adminRouter.put("/edit/:id", verifyToken, EditArticle);
adminRouter.post("/new", verifyToken, AddArticle);
adminRouter.delete("/delete/:id", verifyToken, RemoveArticle);

export default adminRouter;