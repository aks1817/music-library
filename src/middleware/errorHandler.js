import { responseHandler } from '../utils/responseHandler.js';

export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  responseHandler(res, 500, null, 'Internal Server Error', err.message);
};

