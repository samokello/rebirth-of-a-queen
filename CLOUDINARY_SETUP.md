# Cloudinary Setup Guide

## Overview
This guide will help you set up Cloudinary for image and video storage in the Rebirth of a Queen Foundation website.

## Step 1: Create Cloudinary Account

1. Go to [Cloudinary.com](https://cloudinary.com)
2. Sign up for a free account
3. Verify your email address
4. Log in to your dashboard

## Step 2: Get Your Credentials

1. In your Cloudinary dashboard, go to **Settings** → **Access Keys**
2. Copy the following information:
   - **Cloud Name**
   - **API Key**
   - **API Secret**

## Step 3: Configure Environment Variables

Add these variables to your `server/.env` file:

```env
# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```

## Step 4: Install Dependencies

The following packages have been installed:

### Server Dependencies
```bash
npm install cloudinary multer multer-storage-cloudinary
```

### Client Dependencies
```bash
npm install cloudinary-react --legacy-peer-deps
```

## Step 5: Features Implemented

### ✅ Backend Features
- **Cloudinary Configuration**: Set up in `server/config/cloudinary.js`
- **Upload Service**: Comprehensive upload service in `server/services/uploadService.js`
- **Upload Routes**: API endpoints in `server/routes/upload.js`
- **Product Model**: Updated to include Cloudinary image data
- **Shop Routes**: Enhanced to handle Cloudinary uploads

### ✅ Frontend Features
- **Admin Products**: Enhanced product management with Cloudinary uploads
- **Image Upload**: Drag & drop and file picker functionality
- **Image Preview**: Real-time preview of uploaded images
- **Image Management**: Add, remove, and reorder product images

## Step 6: API Endpoints

### Upload Endpoints
- `POST /api/upload/single` - Upload single file
- `POST /api/upload/multiple` - Upload multiple files
- `DELETE /api/upload/:publicId` - Delete file
- `GET /api/upload/info/:publicId` - Get file info
- `GET /api/upload/optimized/:publicId` - Get optimized URL

### Product Endpoints
- `GET /api/shop/admin/products` - Get all products (admin)
- `POST /api/shop/products` - Create product
- `PUT /api/shop/products/:id` - Update product
- `DELETE /api/shop/products/:id` - Delete product

## Step 7: Usage Examples

### Upload Images in Admin Dashboard
1. Go to Admin Dashboard → Products
2. Click "Add Product" or "Edit Product"
3. In the Images section, click "Upload Images"
4. Select one or more image files
5. Images will be uploaded to Cloudinary automatically
6. Preview and manage uploaded images

### Product Image Structure
```javascript
{
  url: "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/product.jpg",
  cloudinaryId: "rebirth-of-a-queen/product_abc123",
  alt: "Product description",
  isPrimary: true,
  width: 800,
  height: 600,
  format: "jpg",
  bytes: 123456
}
```

## Step 8: Cloudinary Dashboard Features

### Transformations
- Automatic image optimization
- Responsive images
- Format conversion (WebP, AVIF)
- Quality optimization

### Folders
- Images are organized in `rebirth-of-a-queen/` folder
- Subfolders for different content types

### Security
- Signed uploads for admin access
- Public read access for frontend display
- Automatic backup and versioning

## Step 9: Testing

### Test Upload
1. Start your server: `npm run dev`
2. Go to Admin Dashboard
3. Try uploading images to a product
4. Check Cloudinary dashboard for uploaded files

### Test Image Display
1. Create a product with images
2. View the product on the frontend
3. Verify images load correctly
4. Check responsive behavior

## Step 10: Optimization

### Image Optimization
- Automatic WebP conversion
- Quality optimization
- Responsive image sizes
- Lazy loading support

### Performance
- CDN delivery
- Automatic caching
- Compression optimization
- Fast loading times

## Troubleshooting

### Common Issues

1. **Upload Fails**
   - Check Cloudinary credentials
   - Verify file size limits (10MB)
   - Check file format support

2. **Images Not Loading**
   - Verify Cloudinary URLs
   - Check CORS settings
   - Verify public access

3. **Authentication Errors**
   - Check JWT token
   - Verify admin role
   - Check API key permissions

### Support
- Cloudinary Documentation: [docs.cloudinary.com](https://docs.cloudinary.com)
- Cloudinary Support: [support.cloudinary.com](https://support.cloudinary.com)

## Security Best Practices

1. **Environment Variables**: Never commit credentials to version control
2. **Access Control**: Use signed uploads for admin functions
3. **File Validation**: Validate file types and sizes
4. **Rate Limiting**: Implement upload rate limiting
5. **Monitoring**: Monitor upload usage and costs

## Cost Management

### Free Tier Limits
- 25 GB storage
- 25 GB bandwidth/month
- 25,000 transformations/month

### Monitoring Usage
- Check Cloudinary dashboard regularly
- Monitor bandwidth usage
- Optimize image sizes and formats

## Next Steps

1. **Video Uploads**: Extend to support video uploads
2. **Advanced Transformations**: Add custom image transformations
3. **Bulk Operations**: Implement bulk image upload/delete
4. **Image Editing**: Add in-browser image editing
5. **Analytics**: Track image usage and performance

---

**Note**: This setup provides a robust foundation for image management. The system is scalable and can handle growth in content and traffic.
