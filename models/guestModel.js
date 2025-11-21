import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const usersFilePath = path.join(__dirname, "../data/users.json");
const articlesFilePath = path.join(__dirname, "../data/articles.json");

async function readUsers() {
  const data = await fs.promises.readFile(usersFilePath, "utf8");
  return JSON.parse(data);
}

async function writeUsers(users) {
  await fs.promises.writeFile(usersFilePath, JSON.stringify(users, null, 2));
}

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

export async function getAllArticles() {
  const articles = await readArticles();
  return articles;
}

export async function getArticle(id) {
  const articles = await readArticles();
  for (const article of articles) {
    if (article.id === id) {
      // Use object destructuring:
      // - `id: _` pulls out the id property but assigns it to `_` (unused)
      // - `...rest` collects all other properties into a new object
      //const { id: _, ...rest } = article;
      return article;
    }
  }
  return false;
}