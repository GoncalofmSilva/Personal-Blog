import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const articlesFilePath = path.join(__dirname, "../data/articles.json");

async function readArticles() {
  const data = await fs.promises.readFile(articlesFilePath, "utf8");
  return JSON.parse(data);
}

async function writeArticles(articles) {
  await fs.promises.writeFile(
    articlesFilePath,
    JSON.stringify(articles, null, 2)
  );
}

let articles = await readArticles();
let articleId =
  articles.length > 0 ? Math.max(...articles.map((t) => t.id)) + 1 : 1;

export async function getAllArticles() {
  const articles = await readArticles();
  return articles;
}

export async function updateArticle({ id, title, date, description }) {
  const articles = await readArticles();
  const index = articles.findIndex((article) => article.id === id);

  if (index !== -1) {
    articles[index] = { ...articles[index], title, date, description };
    await writeArticles(articles);
    return articles[index];
  }
  return null;
}

export async function createArticle({ title, date, description }) {
  const articles = await readArticles();
  const newArticle = {
    id: articleId++,
    title,
    date,
    description,
  };
  articles.push(newArticle);
  await writeArticles(articles);
  return newArticle;
}

export async function deleteArticle(id) {
  const articles = await readArticles();
  const index = articles.findIndex((article) => article.id === id);
  if (index !== -1) {
    const deleted = articles.splice(index, 1)[0];
    await writeArticles(articles);
    return deleted;
  }
  return null;
}