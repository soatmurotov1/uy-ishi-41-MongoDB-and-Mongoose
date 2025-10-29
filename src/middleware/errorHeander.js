export const errorHandler = (req, res, error) => {
  console.error(error.stack)
  return res.status(error.status || 500).json({ message: error.message || `error in the server` })
}