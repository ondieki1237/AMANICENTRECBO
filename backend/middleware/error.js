const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({
    error: err.message || 'Server Error',
    details: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};

export default errorHandler;