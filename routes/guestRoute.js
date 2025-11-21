import { Router } from "express";
import { ListAllArticles, ArticleDetails } from '../controllers/guestController.js'
import { verifyToken, verifyRole } from '../middlewares/guestMiddleware.js'

const guestRouter = Router()

guestRouter.get('/home', verifyToken, verifyRole(["guest"]), ListAllArticles)
guestRouter.get('/article/:id', verifyToken, verifyRole(["guest"]), ArticleDetails)

export default guestRouter