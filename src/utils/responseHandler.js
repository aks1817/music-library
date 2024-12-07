export const responseHandler = (res, status, data, message, error) => {
  res.status(status).json({
    status,
    data,
    message,
    error,
  });
};

