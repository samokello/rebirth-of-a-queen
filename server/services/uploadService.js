const cloudinary = require('../config/cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configure Cloudinary storage for multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'rebirth-of-a-queen',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'mp4', 'mov', 'avi'],
    transformation: [
      { width: 1000, height: 1000, crop: 'limit' },
      { quality: 'auto' }
    ]
  }
});

// Configure multer upload
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Check file type
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image and video files are allowed'), false);
    }
  }
});

// Upload single file
const uploadSingle = upload.single('file');

// Upload multiple files
const uploadMultiple = upload.array('files', 10);

// Upload service functions
const uploadService = {
  // Upload single image/video
  uploadFile: (file, folder = 'general') => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(file.path, {
        folder: `rebirth-of-a-queen/${folder}`,
        resource_type: 'auto',
        transformation: [
          { width: 1000, height: 1000, crop: 'limit' },
          { quality: 'auto' }
        ]
      }, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  },

  // Upload multiple files
  uploadMultipleFiles: (files, folder = 'general') => {
    const uploadPromises = files.map(file => uploadService.uploadFile(file, folder));
    return Promise.all(uploadPromises);
  },

  // Delete file from Cloudinary
  deleteFile: (publicId) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  },

  // Get file info
  getFileInfo: (publicId) => {
    return new Promise((resolve, reject) => {
      cloudinary.api.resource(publicId, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  },

  // Generate optimized URL
  getOptimizedUrl: (publicId, options = {}) => {
    const defaultOptions = {
      width: 800,
      height: 600,
      crop: 'fill',
      quality: 'auto',
      format: 'auto'
    };
    
    const finalOptions = { ...defaultOptions, ...options };
    return cloudinary.url(publicId, finalOptions);
  }
};

module.exports = {
  upload,
  uploadSingle,
  uploadMultiple,
  uploadService
};
