import { responseHandler } from "../utils/responseHandler.js";

export const roleCheck = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return responseHandler(res, 401, null, "Unauthorized Access", null);
    }
    if (!roles.includes(req.user.role)) {
      return responseHandler(res, 403, null, "Forbidden Access", null);
    }
    next();
  };
};
