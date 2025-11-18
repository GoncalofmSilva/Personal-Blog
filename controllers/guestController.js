import { getAllArticles, getArticle } from "../models/guestModel.js";

export async function ListAllArticles(req, res) {
  try {
    const articles = await getAllArticles();

    res.status(201).json({ message: "All Articles Listed", articles });
  } catch (error) {
    res.status(500).json({ message: "Error Listing Articles" });
  }
}

export async function ArticleDetails(req, res) {
  try {
    const { id } = req.params;

    const article = await getArticle(Number(id));

    if (!article) {
      console.log(article)
      return res.status(404).json({ message: "Article not found" });
    }

    res.status(200).json({ message: "Article Details", article });
  } catch (error) {
    res.status(500).json({ message: "Error Show Article Details"})
  }
}
