import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { responseHandler } from '../utils/responseHandler.js';

export const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.id, 'tokens.token': token });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    responseHandler(res, 401, null, 'Unauthorized Access', null);
  }
};

