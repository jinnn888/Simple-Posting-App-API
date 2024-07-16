import jwt from 'jsonwebtoken';
import User from '../model/userModel.js';

export const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1]; // Extract token from headers
    if (!token) {
      return res.status(401).send('Unauthorized'); // Return 401 if token is missing
    }
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN); // Verify and decode the token
    const userId = decoded.id;

    if (!userId) {
      return res.status(400).send('Invalid user ID'); // Return 400 if user ID is missing
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }

    req.user = user;
    next(); // Call next to proceed to the next middleware or route handler
  } catch (err) {
    console.error('Error in auth middleware:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
