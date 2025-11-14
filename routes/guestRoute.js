import { Router } from "express";
import {ListAllArticles, ArticleDetails} from '../controllers/guestController.js'

const guestRouter = Router()

guestRouter.get('/home', ListAllArticles)
guestRouter.get('/article/:id', ArticleDetails)

export default guestRouter