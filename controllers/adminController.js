import {
  getAllArticles,
  updateArticle,
  createArticle,
  deleteArticle,
} from "../models/adminModel.js";

export async function ListAllArticles(req, res) {
  try {
    const articles = await getAllArticles();

    res.status(201).json({ message: "All Articles Listed", articles });
  } catch (error) {
    res.status(500).json({ message: "Error Listing Articles" });
  }
}

export async function EditArticle(req, res) {
  try {
    const id = parseInt(req.params.id);
    const { title, date, description } = req.body;

    const updatedArticle = await updateArticle({
      id,
      title,
      date,
      description,
    });

    res.status(201).json({ message: "Article Updated", updatedArticle });
  } catch (error) {
    res.status(500).json({ message: "Error Updating Article" });
  }
}

export async function AddArticle(req, res) {
  try {
    const { title, date, description } = req.body;

    if (!title || !date || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newArticle = await createArticle({ title, date, description });

    res.status(201).json({ message: "Article Added", newArticle });
  } catch (error) {
    res.status(500).json({ message: "Error Adding Article" });
  }
}

export async function RemoveArticle(req, res) {
  try {
    const id = parseInt(req.params.id);

    const deletedArticle = await deleteArticle(id);

    res.status(201).json({ message: "Article Deleted", deletedArticle });
  } catch (error) {
    res.status(500).json({ message: "Error Deleting Article" });
  }
}