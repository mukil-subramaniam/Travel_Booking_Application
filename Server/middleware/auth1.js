// import jwt from 'jsonwebtoken';
// import User from '../models/User.js';

// export default async (req, res, next) => {
//   const token = req.header('x-auth-token');
//   if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = { id: decoded.userId }; // Attach the user ID to req.user
//     next();
//   } catch (err) {
//     res.status(401).json({ message: 'Token is not valid' });
//   }
// };

import jwt from 'jsonwebtoken';

export default async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  console.log(token);
  if (!token) return res.status(401).json({ message: 'No token, authorization denieddddd' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.userId }; // Attach the user ID to req.user
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
