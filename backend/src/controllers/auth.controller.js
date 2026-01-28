import { login } from "../services/auth.service.js";
import { HttpUtils } from "../utils/http.utils.js";
import { validateUserFieldsForLogin } from "../services/user.service.js";

async function handleLogin(req, res) {
  try {
    const { email, password } = req.body;
    await validateUserFieldsForLogin(email, password);
    const user = await login(email, password);
    return HttpUtils.success(res, HttpUtils.OK_CODE, user);
  } catch (error) {
    return HttpUtils.error(res, error);
  }
}

export { handleLogin };
