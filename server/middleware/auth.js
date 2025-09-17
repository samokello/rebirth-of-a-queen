const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: 'Access token required' 
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ 
        success: false, 
        message: 'Invalid or expired token' 
      });
    }
    
    // Ensure we have the user ID and other necessary fields
    req.user = {
      userId: decoded.userId || decoded.id,
      _id: decoded.userId || decoded.id,
      email: decoded.email,
      role: decoded.role
    };
    next();
  });
};

const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: 'Access token required' 
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ 
        success: false, 
        message: 'Invalid or expired token' 
      });
    }
    
    if (decoded.role !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Admin access required' 
      });
    }
    
    // Ensure we have the user ID and other necessary fields
    req.user = {
      userId: decoded.userId || decoded.id,
      _id: decoded.userId || decoded.id,
      email: decoded.email,
      role: decoded.role
    };
    next();
  });
};

module.exports = {
  authenticateToken,
  authenticateAdmin
};
