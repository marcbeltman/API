// vervangt de try catch in de controllers

const asyncHandler = fn => (req, res, next) => 
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = asyncHandler;
