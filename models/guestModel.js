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
  await fs.promises.writeFile(articlesFilePath, JSON.stringify(articles, null, 2));
}

export async function validToken(){

}

export async function getAllArticles(){
    const articles = await readArticles()
    return articles
}

export async function getArticle(){

}