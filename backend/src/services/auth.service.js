import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { getConnection, pool } from "../config/db.js";
import { HttpError, HttpUtils } from "../utils/http.utils.js";
import { mapUserToUserDTO } from "./user.service.js";

dotenv.config();

const saltRounds = parseInt(process.env.SALT_ROUNDS);

async function hashPassword(password) {
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
}

async function verifyPassword(password, hash) {
  const match = await bcrypt.compare(password, hash);
  return match;
}

async function login(email, password) {
  const client = await getConnection();
  try {
    const res = await client.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    const passwordValid = await verifyPassword(
      password,
      res.rows[0].password_hash
    );
    if (res.rowCount === 0 || !passwordValid) {
      throw new HttpError(
        "Invalid credentials",
        HttpUtils.BAD_REQUEST_ERROR_CODE
      );
    }
    return mapUserToUserDTO(res.rows[0]);
  } catch (error) {
    throw new HttpError(
      error.message,
      error.status ? error.status : HttpUtils.INTERNAL_SERVER_ERROR_CODE
    );
  } finally {
    client.release();
  }
}

export { hashPassword, verifyPassword, login };
