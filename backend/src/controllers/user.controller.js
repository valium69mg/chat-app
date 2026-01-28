import {
  createUser,
  getUsers,
  getUserById,
  replaceUser,
  updateUser,
  deleteUser,
  validateUserFieldsForCreation,
} from "../services/user.service.js";
import { HttpUtils, HttpError } from "../utils/http.utils.js";

async function handleGetUsers(req, res) {
  try {
    const users = await getUsers();
    return HttpUtils.success(res, HttpUtils.OK_CODE, users);
  } catch (error) {
    return HttpUtils.error(res, error);
  }
}

async function handleCreateUsers(req, res) {
  try {
    validateUserFieldsForCreation(req.body);
    const { username, email, password, first_name, last_name } = req.body;
    const user = await createUser(
      username,
      email,
      password,
      first_name,
      last_name,
    );
    return HttpUtils.success(res, HttpUtils.CREATED_CODE, user);
  } catch (error) {
    return HttpUtils.error(res, error);
  }
}

async function handleGetUserById(req, res) {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    return HttpUtils.success(res, HttpUtils.OK_CODE, user);
  } catch (error) {
    return HttpUtils.error(res, error);
  }
}

async function handleUpdateUser(req, res) {
  try {
    const { id } = req.params;
    const fieldsToUpdate = req.body;
    const user = await updateUser(id, fieldsToUpdate);
    return HttpUtils.success(res, HttpUtils.OK_CODE, user);
  } catch (error) {
    return HttpUtils.error(res, error);
  }
}

async function handleReplaceUser(req, res) {
  try {
    const { id } = req.params;
    const { username, email, password, first_name, last_name } = req.body;
    const user = await replaceUser(
      id,
      username,
      email,
      password,
      first_name,
      last_name,
    );
    return HttpUtils.success(res, HttpUtils.OK_CODE, user);
  } catch (error) {
    return HttpUtils.error(res, error);
  }
}

async function handleDeleteUser(req, res) {
  try {
    const { id } = req.params;
    const user = await deleteUser(id);
    return HttpUtils.success(res, HttpUtils.OK_CODE, user);
  } catch (error) {
    return HttpUtils.error(res, error);
  }
}

export {
  handleGetUsers,
  handleCreateUsers,
  handleGetUserById,
  handleUpdateUser,
  handleReplaceUser,
  handleDeleteUser,
};
