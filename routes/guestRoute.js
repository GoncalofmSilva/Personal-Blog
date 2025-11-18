import { Router } from "express";
import {ListAllArticles, ArticleDetails} from '../controllers/guestController.js'
import {verifyToken} from '../middlewares/guestMiddleware.js'

const guestRouter = Router()

guestRouter.get('/home', verifyToken, ListAllArticles)
guestRouter.get('/article/:id', verifyToken, ArticleDetails)

export default guestRouter