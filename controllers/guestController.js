import {
  validToken,
  getAllArticles,
  getArticle,
} from "../models/guestModel.js";

export async function ListAllArticles(req, res) {
  try {
    const {token} = req.parameters
    
    const verifyToken = await validToken(token)
    if(verifyToken) {
        
    }

    const articles = await getAllArticles();

    res.status(201).json({ message: "All Articles Listed", articles });
  } catch (error) {
    res.status(500).json({ message: "Error Listing Articles" });
  }
}

export async function ArticleDetails() {}