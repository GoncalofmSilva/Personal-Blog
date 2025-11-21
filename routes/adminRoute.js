import { Router } from "express";
import {
  ListAllArticles,
  EditArticle,
  AddArticle,
  RemoveArticle,
} from "../controllers/adminController.js";
import { verifyToken, verifyRole } from "../middlewares/guestMiddleware.js";

const adminRouter = Router();

adminRouter.get("/admin", verifyToken, verifyRole(["admin"]), ListAllArticles);
adminRouter.put("/edit/:id", verifyToken, verifyRole(["admin"]), EditArticle);
adminRouter.post("/new", verifyToken, verifyRole(["admin"]), AddArticle);
adminRouter.delete("/delete/:id", verifyToken, verifyRole(["admin"]), RemoveArticle);

export default adminRouter;