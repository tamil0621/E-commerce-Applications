export default function errorHandler(error, req, res, next) {
  if (res.headersSent) return next(error);

  let status = error.statusCode || error.status || 500;
  let message = 'The server encountered an error. Please try again.';

  if (error.name === 'ValidationError') {
    status = 400;
    message = `Invalid request: ${Object.values(error.errors).map(item => item.message).join(', ')}`;
  } else if (error.code === 11000) {
    status = 409;
    message = 'A record with that value already exists.';
  } else if (error.name === 'CastError') {
    status = 400;
    message = 'The request contains an invalid identifier or value.';
  } else if (status < 500) {
    message = error.message || 'The request could not be completed.';
  }

  console.error(`${req.method} ${req.originalUrl} failed:`, error.message);
  res.status(status).json({ message });
}