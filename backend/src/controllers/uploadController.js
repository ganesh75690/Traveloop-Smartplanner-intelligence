const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(process.cwd(), 'uploads');
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = uuidv4();
    const extension = path.extname(file.originalname);
    cb(null, `${uniqueSuffix}${extension}`);
  }
});

const fileFilter = (req, file, cb) => {
  // Allow only image files
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024, // 5MB default
    files: 5 // Maximum 5 files
  }
});

/**
 * Upload profile image
 * POST /api/upload/profile
 */
const uploadProfileImage = async (req, res) => {
  try {
    const uploadSingle = upload.single('image');
    
    uploadSingle(req, res, async (err) => {
      if (err) {
        console.error('Profile image upload error:', err);
        return res.status(400).json({
          success: false,
          message: err.message || 'Failed to upload profile image',
          error: 'UPLOAD_ERROR'
        });
      }

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'No image file provided',
          error: 'NO_FILE_PROVIDED'
        });
      }

      const imageUrl = `/uploads/${req.file.filename}`;
      
      res.json({
        success: true,
        message: 'Profile image uploaded successfully',
        data: {
          imageUrl,
          filename: req.file.filename,
          size: req.file.size
        }
      });
    });
  } catch (error) {
    console.error('Upload profile image error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload profile image',
      error: 'PROFILE_UPLOAD_ERROR'
    });
  }
};

/**
 * Upload trip images
 * POST /api/upload/trip
 */
const uploadTripImages = async (req, res) => {
  try {
    const uploadMultiple = upload.array('images', 5);
    
    uploadMultiple(req, res, async (err) => {
      if (err) {
        console.error('Trip images upload error:', err);
        return res.status(400).json({
          success: false,
          message: err.message || 'Failed to upload trip images',
          error: 'UPLOAD_ERROR'
        });
      }

      if (!req.files || req.files.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'No image files provided',
          error: 'NO_FILES_PROVIDED'
        });
      }

      const imageUrls = req.files.map(file => `/uploads/${file.filename}`);
      
      res.json({
        success: true,
        message: 'Trip images uploaded successfully',
        data: {
          imageUrls,
          count: req.files.length,
          files: req.files.map(file => ({
            filename: file.filename,
            size: file.size
          }))
        }
      });
    });
  } catch (error) {
    console.error('Upload trip images error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload trip images',
      error: 'TRIP_UPLOAD_ERROR'
    });
  }
};

/**
 * Upload community post image
 * POST /api/upload/community
 */
const uploadCommunityImage = async (req, res) => {
  try {
    const uploadSingle = upload.single('image');
    
    uploadSingle(req, res, async (err) => {
      if (err) {
        console.error('Community image upload error:', err);
        return res.status(400).json({
          success: false,
          message: err.message || 'Failed to upload community image',
          error: 'UPLOAD_ERROR'
        });
      }

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'No image file provided',
          error: 'NO_FILE_PROVIDED'
        });
      }

      const imageUrl = `/uploads/${req.file.filename}`;
      
      res.json({
        success: true,
        message: 'Community image uploaded successfully',
        data: {
          imageUrl,
          filename: req.file.filename,
          size: req.file.size
        }
      });
    });
  } catch (error) {
    console.error('Upload community image error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload community image',
      error: 'COMMUNITY_UPLOAD_ERROR'
    });
  }
};

/**
 * Upload journal images
 * POST /api/upload/journal
 */
const uploadJournalImages = async (req, res) => {
  try {
    const uploadMultiple = upload.array('images', 3);
    
    uploadMultiple(req, res, async (err) => {
      if (err) {
        console.error('Journal images upload error:', err);
        return res.status(400).json({
          success: false,
          message: err.message || 'Failed to upload journal images',
          error: 'UPLOAD_ERROR'
        });
      }

      if (!req.files || req.files.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'No image files provided',
          error: 'NO_FILES_PROVIDED'
        });
      }

      const imageUrls = req.files.map(file => `/uploads/${file.filename}`);
      
      res.json({
        success: true,
        message: 'Journal images uploaded successfully',
        data: {
          imageUrls,
          count: req.files.length,
          files: req.files.map(file => ({
            filename: file.filename,
            size: file.size
          }))
        }
      });
    });
  } catch (error) {
    console.error('Upload journal images error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload journal images',
      error: 'JOURNAL_UPLOAD_ERROR'
    });
  }
};

/**
 * Delete uploaded file
 * DELETE /api/upload/:filename
 */
const deleteUploadedFile = async (req, res) => {
  try {
    const { filename } = req.params;
    
    // Validate filename to prevent directory traversal
    if (!filename || filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
      return res.status(400).json({
        success: false,
        message: 'Invalid filename',
        error: 'INVALID_FILENAME'
      });
    }

    const filePath = path.join(process.cwd(), 'uploads', filename);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: 'File not found',
        error: 'FILE_NOT_FOUND'
      });
    }

    fs.unlinkSync(filePath);
    
    res.json({
      success: true,
      message: 'File deleted successfully'
    });
  } catch (error) {
    console.error('Delete uploaded file error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete file',
      error: 'FILE_DELETE_ERROR'
    });
  }
};

/**
 * Get uploaded file info
 * GET /api/upload/:filename/info
 */
const getFileInfo = async (req, res) => {
  try {
    const { filename } = req.params;
    
    // Validate filename
    if (!filename || filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
      return res.status(400).json({
        success: false,
        message: 'Invalid filename',
        error: 'INVALID_FILENAME'
      });
    }

    const filePath = path.join(process.cwd(), 'uploads', filename);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: 'File not found',
        error: 'FILE_NOT_FOUND'
      });
    }

    const stats = fs.statSync(filePath);
    
    res.json({
      success: true,
      data: {
        filename,
        size: stats.size,
        createdAt: stats.birthtime,
        modifiedAt: stats.mtime,
        url: `/uploads/${filename}`
      }
    });
  } catch (error) {
    console.error('Get file info error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get file info',
      error: 'FILE_INFO_ERROR'
    });
  }
};

module.exports = {
  uploadProfileImage,
  uploadTripImages,
  uploadCommunityImage,
  uploadJournalImages,
  deleteUploadedFile,
  getFileInfo
};
