const express = require('express');
const router = express.Router();
const { uploadSingle, uploadMultiple, uploadService } = require('../services/uploadService');
const { authenticateToken } = require('../middleware/auth');

// Upload single file
router.post('/single', authenticateToken, (req, res) => {
  uploadSingle(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    try {
      const result = {
        public_id: req.file.filename,
        url: req.file.path,
        secure_url: req.file.path.replace('http://', 'https://'),
        format: req.file.format,
        resource_type: req.file.resource_type,
        bytes: req.file.bytes,
        width: req.file.width,
        height: req.file.height
      };

      res.json({
        success: true,
        message: 'File uploaded successfully',
        data: result
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error processing upload',
        error: error.message
      });
    }
  });
});

// Upload multiple files
router.post('/multiple', authenticateToken, (req, res) => {
  uploadMultiple(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message
      });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No files uploaded'
      });
    }

    try {
      const results = req.files.map(file => ({
        public_id: file.filename,
        url: file.path,
        secure_url: file.path.replace('http://', 'https://'),
        format: file.format,
        resource_type: file.resource_type,
        bytes: file.bytes,
        width: file.width,
        height: file.height
      }));

      res.json({
        success: true,
        message: 'Files uploaded successfully',
        data: results
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error processing uploads',
        error: error.message
      });
    }
  });
});

// Delete file
router.delete('/:publicId', authenticateToken, async (req, res) => {
  try {
    const { publicId } = req.params;
    const result = await uploadService.deleteFile(publicId);
    
    res.json({
      success: true,
      message: 'File deleted successfully',
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting file',
      error: error.message
    });
  }
});

// Get file info
router.get('/info/:publicId', authenticateToken, async (req, res) => {
  try {
    const { publicId } = req.params;
    const result = await uploadService.getFileInfo(publicId);
    
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error getting file info',
      error: error.message
    });
  }
});

// Get optimized URL
router.get('/optimized/:publicId', (req, res) => {
  try {
    const { publicId } = req.params;
    const { width, height, crop, quality, format } = req.query;
    
    const options = {};
    if (width) options.width = parseInt(width);
    if (height) options.height = parseInt(height);
    if (crop) options.crop = crop;
    if (quality) options.quality = quality;
    if (format) options.format = format;
    
    const url = uploadService.getOptimizedUrl(publicId, options);
    
    res.json({
      success: true,
      data: { url }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error generating optimized URL',
      error: error.message
    });
  }
});

module.exports = router;
