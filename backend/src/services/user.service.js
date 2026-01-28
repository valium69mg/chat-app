import { getConnection, pool } from "../config/db.js";
import { hashPassword } from "./auth.service.js";
import { HttpError, HttpUtils } from "../utils/http.utils.js";

async function getUsers() {
  const client = await getConnection();
  try {
    const res = await client.query("SELECT * FROM users");
    if (res.rowCount === 0) {
      return [];
    }
    let users = res.rows;
    let usersDTO = users.map((user) => {
      return mapUserToUserDTO(user);
    });
    return usersDTO;
  } catch (error) {
    throw new HttpError(
      error.message,
      error.status ? error.status : HttpUtils.INTERNAL_SERVER_ERROR_CODE,
    );
  } finally {
    client.release();
  }
}

async function getUserById(id) {
  const client = await getConnection();
  try {
    const query = `SELECT * FROM users WHERE id = $1`;
    const values = [id];
    const res = await pool.query(query, values);
    if (res.rowCount === 0) {
      throw new HttpError(
        "User does not exists",
        HttpUtils.NOT_FOUND_ERROR_CODE,
      );
    }
    let user = res.rows[0];
    return mapUserToUserDTO(user);
  } catch (error) {
    throw new HttpError(
      error.message,
      error.status ? error.status : HttpUtils.INTERNAL_SERVER_ERROR_CODE,
    );
  } finally {
    client.release();
  }
}

async function getUserByEmail(email) {
  const client = await getConnection();
  try {
    const query = `
        SELECT id FROM users WHERE email = $1;
        `;
    const values = [email];
    const res = await pool.query(query, values);
    if (res.rowCount === 0) {
      return null;
    }
    return res.rows[0];
  } catch (error) {
    throw new HttpError(
      error.message,
      error.status ? error.status : HttpUtils.INTERNAL_SERVER_ERROR_CODE,
    );
  } finally {
    client.release();
  }
}

async function getUserByUsername(username) {
  const client = await getConnection();
  try {
    const query = `
        SELECT id FROM users WHERE username = $1;
        `;
    const values = [username];
    const res = await pool.query(query, values);
    if (res.rowCount === 0) {
      return null;
    }
    return res.rows[0];
  } catch (error) {
    throw new HttpError(
      error.message,
      error.status ? error.status : HttpUtils.INTERNAL_SERVER_ERROR_CODE,
    );
  } finally {
    client.release();
  }
}

async function createUser(username, email, password, first_name, last_name) {
  const client = await getConnection();
  try {
    if ((await getUserByEmail(email)) != null) {
      throw new HttpError(
        "Email already registered",
        HttpUtils.BAD_REQUEST_ERROR_CODE,
      );
    }
    if ((await getUserByUsername(username)) != null) {
      throw new HttpError(
        "Username already registered",
        HttpUtils.BAD_REQUEST_ERROR_CODE,
      );
    }
    const password_hash = await hashPassword(password);
    const query = `INSERT INTO users (username, email, password_hash, first_name, last_name)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, username, email;
        `;
    const values = [username, email, password_hash, first_name, last_name];
    const res = await pool.query(query, values);
    return mapUserToUserDTO(res.rows[0]);
  } catch (error) {
    throw new HttpError(
      error.message,
      error.status ? error.status : HttpUtils.INTERNAL_SERVER_ERROR_CODE,
    );
  } finally {
    client.release();
  }
}

async function updateUser(id, fieldsToUpdate) {
  const client = await getConnection();
  try {
    if (fieldsToUpdate.email) {
      const existingEmailUser = await getUserByEmail(fieldsToUpdate.email);
      if (existingEmailUser && existingEmailUser.id !== id) {
        throw new HttpError(
          "Email already registered",
          HttpUtils.BAD_REQUEST_ERROR_CODE,
        );
      }
    }

    if (fieldsToUpdate.username) {
      const existingUsernameUser = await getUserByUsername(
        fieldsToUpdate.username,
      );
      if (existingUsernameUser && existingUsernameUser.id !== id) {
        throw new HttpError(
          "Username already registered",
          HttpUtils.BAD_REQUEST_ERROR_CODE,
        );
      }
    }

    const setClauses = [];
    const values = [];
    let i = 1;

    for (const [key, value] of Object.entries(fieldsToUpdate)) {
      if (key === "password") {
        const password_hash = await hashPassword(value);
        setClauses.push(`password_hash = $${i}`);
        values.push(password_hash);
      } else {
        setClauses.push(`${key} = $${i}`);
        values.push(value);
      }
      i++;
    }

    if (setClauses.length === 0) {
      throw new HttpError(
        "No fields to update",
        HttpUtils.BAD_REQUEST_ERROR_CODE,
      );
    }

    values.push(id);
    const query = `UPDATE users SET ${setClauses.join(", ")} WHERE id = $${i} RETURNING *`;
    const res = await pool.query(query, values);

    if (res.rowCount === 0) {
      throw new HttpError("User not found", HttpUtils.NOT_FOUND_ERROR_CODE);
    }

    return mapUserToUserDTO(res.rows[0]);
  } catch (error) {
    throw new HttpError(
      error.message,
      error.status || HttpUtils.INTERNAL_SERVER_ERROR_CODE,
    );
  } finally {
    client.release();
  }
}

async function replaceUser(
  id,
  username,
  email,
  password,
  first_name,
  last_name,
) {
  const client = await getConnection();
  try {
    const existingEmailUser = await getUserByEmail(email);
    if (existingEmailUser && existingEmailUser.id !== id) {
      throw new HttpError(
        "Email already registered",
        HttpUtils.BAD_REQUEST_ERROR_CODE,
      );
    }

    const existingUsernameUser = await getUserByUsername(username);
    if (existingUsernameUser && existingUsernameUser.id !== id) {
      throw new HttpError(
        "Username already registered",
        HttpUtils.BAD_REQUEST_ERROR_CODE,
      );
    }

    const password_hash = await hashPassword(password);
    const query = `
      UPDATE users
      SET username = $1, email = $2, password_hash = $3, first_name = $4, last_name = $5
      WHERE id = $6
      RETURNING *;
    `;
    const values = [username, email, password_hash, first_name, last_name, id];
    const res = await pool.query(query, values);

    if (res.rowCount === 0) {
      throw new HttpError("User not found", HttpUtils.NOT_FOUND_ERROR_CODE);
    }

    return mapUserToUserDTO(res.rows[0]);
  } catch (error) {
    throw new HttpError(
      error.message,
      error.status || HttpUtils.INTERNAL_SERVER_ERROR_CODE,
    );
  } finally {
    client.release();
  }
}

async function deleteUser(id) {
  const client = await getConnection();
  try {
    const query = `DELETE FROM users WHERE id = $1 RETURNING *`;
    const values = [id];
    const res = await pool.query(query, values);

    if (res.rowCount === 0) {
      throw new HttpError("User not found", HttpUtils.NOT_FOUND_ERROR_CODE);
    }

    return mapUserToUserDTO(res.rows[0]);
  } catch (error) {
    throw new HttpError(
      error.message,
      error.status || HttpUtils.INTERNAL_SERVER_ERROR_CODE,
    );
  } finally {
    client.release();
  }
}

function mapUserToUserDTO(user) {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    firstName: user.first_name,
    lastName: user.last_name,
  };
}

async function validateUserFieldsForLogin(email, password) {
  validateEmail(email);
  if (password == null) {
    throw new HttpError(
      "Password must not be null",
      HttpUtils.BAD_REQUEST_ERROR_CODE,
    );
  }
  let userByEmail = await getUserByEmail(email);
  if (!userByEmail) {
    throw new HttpError(
      "Invalid credentials",
      HttpUtils.BAD_REQUEST_ERROR_CODE,
    );
  }
}

function validateUserFieldsForCreation(user) {
  validateUsername(user.username);
  validateEmail(user.email);
  validatePassword(user.password);
  validateFirstName(user.first_name);
  validateLastName(user.last_name);
}

function validateUsername(username) {
  if (username == null) {
    throw new HttpError(
      "Username must not be null",
      HttpUtils.BAD_REQUEST_ERROR_CODE,
    );
  }

  const lowerLimit = 3;
  const higherLimit = 20;
  if (username.length < lowerLimit || username.length > higherLimit) {
    throw new HttpError(
      `Username must be between ${lowerLimit} and ${higherLimit} characters`,
      HttpUtils.BAD_REQUEST_ERROR_CODE,
    );
  }
}

function validateEmail(email) {
  if (email == null) {
    throw new HttpError(
      "Email must not be null",
      HttpUtils.BAD_REQUEST_ERROR_CODE,
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new HttpError(
      "Invalid email format",
      HttpUtils.BAD_REQUEST_ERROR_CODE,
    );
  }
}

function validatePassword(password) {
  if (password == null) {
    throw new HttpError(
      "Password must not be null",
      HttpUtils.BAD_REQUEST_ERROR_CODE,
    );
  }

  const lowerLimit = 6;
  const higherLimit = 50;
  if (password.length < lowerLimit || password.length > higherLimit) {
    throw new HttpError(
      `Password must be between ${lowerLimit} and ${higherLimit} characters`,
      HttpUtils.BAD_REQUEST_ERROR_CODE,
    );
  }
}

function validateFirstName(firstName) {
  if (firstName == null) {
    throw new HttpError(
      "First name must not be null",
      HttpUtils.BAD_REQUEST_ERROR_CODE,
    );
  }

  if (firstName.trim().length === 0) {
    throw new HttpError(
      "First name cannot be empty",
      HttpUtils.BAD_REQUEST_ERROR_CODE,
    );
  }
}

function validateLastName(lastName) {
  if (lastName == null) {
    throw new HttpError(
      "Last name must not be null",
      HttpUtils.BAD_REQUEST_ERROR_CODE,
    );
  }

  if (lastName.trim().length === 0) {
    throw new HttpError(
      "Last name cannot be empty",
      HttpUtils.BAD_REQUEST_ERROR_CODE,
    );
  }
}

export {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  replaceUser,
  deleteUser,
  mapUserToUserDTO,
  validateUserFieldsForCreation,
  validateUserFieldsForLogin,
};
