import { Router } from "express";

const adminRouter = Router()

adminRouter.get('/admin')
adminRouter.put('/edit/:id')
adminRouter.post('/new')

export default adminRouter