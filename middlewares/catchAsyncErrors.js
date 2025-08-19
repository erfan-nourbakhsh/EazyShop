module.exports = (func) => (req, res, next) => 
  // Export a higher-order function that takes an async function 'func' 
  // and returns a new middleware function for Express

  Promise.resolve(func(req, res, next)) 
  // Call the original async function and wrap it in Promise.resolve to handle both async and sync functions

  .catch(next); 
  // If the function throws an error or rejects, pass the error to the next middleware (Express error handler)
