import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "users.json");

async function readUsers() {
  const data = await fs.promises.readFile(filePath, "utf8");
  return JSON.parse(data);
}

async function writeUsers(users) {
  await fs.promises.writeFile(filePath, JSON.stringify(users, null, 2));
}

let users = await readUsers();
let userId = users.length > 0 ? Math.max(...users.map((t) => t.id)) + 1 : 1;

export async function emailExists(email) {
  const users = await readUsers();
  for (const user of users) {
    if (user.email === email) {
      return user;
    }
  }
  return false;
}

export async function registerUser({ email, hashedPassword }) {
  const users = await readUsers();
  const newUser = {
    id: userId++,
    email,
    hashedPassword,
  };
  users.push(newUser);
  await writeUsers(users);
  return newUser;
}

export async function storeToken({email, token}){
  const users = await readUsers()
  for (const user of users) {
    if (user.email === email) {
      user.token = token
      await writeUsers(users);
      return user;
    }
  }
  return false;
}