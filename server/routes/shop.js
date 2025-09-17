const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Order = require('../models/Order');
const { authenticateToken } = require('../middleware/auth');
const { uploadService } = require('../services/uploadService');

// @route   GET /api/shop/products
// @desc    Get all products with filtering and pagination
// @access  Public
router.get('/products', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      category,
      search,
      minPrice,
      maxPrice,
      inStock,
      featured,
      onSale,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const skip = (page - 1) * limit;
    let query = { status: 'active' };

    // Apply filters
    if (category) query.category = category;
    if (featured === 'true') query.isFeatured = true;
    if (onSale === 'true') query.isOnSale = true;
    if (inStock === 'true') query.stock = { $gt: 0 };
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    // Apply search
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const sort = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };

    const [products, total] = await Promise.all([
      Product.find(query)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit)),
      Product.countDocuments(query)
    ]);

    res.json({
      success: true,
      data: products,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalProducts: total,
        hasNextPage: page * limit < total,
        hasPrevPage: page > 1
      }
    });

  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products'
    });
  }
});

// @route   GET /api/shop/products/:id
// @desc    Get single product by ID
// @access  Public
router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      data: product
    });

  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch product'
    });
  }
});

// @route   GET /api/shop/products/slug/:slug
// @desc    Get product by slug
// @access  Public
router.get('/products/slug/:slug', async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      data: product
    });

  } catch (error) {
    console.error('Get product by slug error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch product'
    });
  }
});

// @route   GET /api/shop/categories
// @desc    Get product categories with counts
// @access  Public
router.get('/categories', async (req, res) => {
  try {
    const categories = await Product.aggregate([
      { $match: { status: 'active' } },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' }
        }
      },
      { $sort: { count: -1 } }
    ]);

    res.json({
      success: true,
      data: categories
    });

  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch categories'
    });
  }
});

// @route   GET /api/shop/featured
// @desc    Get featured products
// @access  Public
router.get('/featured', async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    const products = await Product.getFeaturedProducts(parseInt(limit));

    res.json({
      success: true,
      data: products
    });

  } catch (error) {
    console.error('Get featured products error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch featured products'
    });
  }
});

// @route   GET /api/shop/sale
// @desc    Get products on sale
// @access  Public
router.get('/sale', async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    const products = await Product.getSaleProducts(parseInt(limit));

    res.json({
      success: true,
      data: products
    });

  } catch (error) {
    console.error('Get sale products error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch sale products'
    });
  }
});

// @route   POST /api/shop/orders
// @desc    Create a new order (Requires authentication)
// @access  Private
router.post('/orders', authenticateToken, async (req, res) => {
  try {
    const {
      items, // Allow items to be sent from frontend
      paymentMethod,
      subtotal,
      shippingCost,
      tax,
      total,
      currency = 'KES',
      status = 'pending'
    } = req.body;

    // Get user information
    const User = require('../models/User');
    const user = await User.findById(req.user.userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Use provided items or fall back to user's cart
    let orderItems = items;
    if (!orderItems || orderItems.length === 0) {
      // Fall back to user's server cart
      const userWithCart = await User.findById(req.user.userId).populate('cart.product');
      orderItems = userWithCart.cart;
    }
    
    // Validate required fields
    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cart is empty. Add items to cart before checkout.'
      });
    }

    if (!paymentMethod) {
      return res.status(400).json({
        success: false,
        message: 'Payment method is required'
      });
    }

    // Use user's information as customer
    const customer = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      address: user.address?.street || '',
      city: user.address?.city || '',
      state: user.address?.state || 'Nairobi',
      postalCode: user.address?.postalCode || '00100',
      country: user.address?.country || 'Kenya'
    };

    // Process order items and validate stock
    const processedOrderItems = [];
    let calculatedSubtotal = 0;

    for (const item of orderItems) {
      // Handle both old format (item.product) and new format (item.product._id)
      const productId = item.product._id || item.product;
      const product = await Product.findById(productId);
      
      if (!product) {
        return res.status(400).json({
          success: false,
          message: `Product ${productId} not found`
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${product.name}. Available: ${product.stock}, Requested: ${item.quantity}`
        });
      }

      const itemTotal = product.price * item.quantity;
      calculatedSubtotal += itemTotal;

      processedOrderItems.push({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        customization: item.customization || {},
        total: itemTotal
      });
    }

    // Use provided totals or calculate them
    const finalSubtotal = subtotal || calculatedSubtotal;
    const finalShippingCost = shippingCost || (finalSubtotal > 10000 ? 0 : 1000);
    const finalTax = tax || (finalSubtotal * 0.16);
    const finalTotal = total || (finalSubtotal + finalShippingCost + finalTax);

    // Create order
    const order = new Order({
      customer,
      shippingAddress: customer.address ? {
        street: customer.address,
        city: customer.city,
        state: customer.state || 'Nairobi',
        postalCode: customer.postalCode || '00100',
        country: customer.country || 'Kenya'
      } : null,
      billingAddress: customer.address ? {
        street: customer.address,
        city: customer.city,
        state: customer.state || 'Nairobi',
        postalCode: customer.postalCode || '00100',
        country: customer.country || 'Kenya'
      } : null,
      items: processedOrderItems,
      subtotal: finalSubtotal,
      shippingCost: finalShippingCost,
      tax: finalTax,
      total: finalTotal,
      paymentMethod,
      customerNotes: customer.notes || '',
      currency: currency
    });

    await order.save();

    // Update product stock
    for (const item of processedOrderItems) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.quantity }
      });
    }

    // Clear user's cart after successful order
    await user.clearCart();

    // Add order to user's order history
    user.orders.push(order._id);
    await user.save();

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: {
        orderId: order._id,
        orderNumber: order.orderNumber,
        total: order.total
      }
    });

  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create order'
    });
  }
});

// @route   GET /api/shop/orders
// @desc    Get user orders
// @access  Private
router.get('/orders', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;

    const orders = await Order.find({ 'customer.email': req.user.email })
      .sort({ orderDate: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate('items.product');

    const total = await Order.countDocuments({ 'customer.email': req.user.email });

    res.json({
      success: true,
      data: orders,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalOrders: total
      }
    });

  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders'
    });
  }
});

// @route   GET /api/shop/orders/:id
// @desc    Get single order
// @access  Private
router.get('/orders/:id', authenticateToken, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.product');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check if user owns this order
    if (order.customer.email !== req.user.email) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    res.json({
      success: true,
      data: order
    });

  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch order'
    });
  }
});

// @route   PUT /api/shop/orders/:id/cancel
// @desc    Cancel order
// @access  Private
router.put('/orders/:id/cancel', authenticateToken, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    if (order.customer.email !== req.user.email) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    if (order.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Order cannot be cancelled'
      });
    }

    order.status = 'cancelled';
    await order.save();

    // Restore product stock
    for (const item of order.items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: item.quantity }
      });
    }

    res.json({
      success: true,
      message: 'Order cancelled successfully'
    });

  } catch (error) {
    console.error('Cancel order error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to cancel order'
    });
  }
});

// @route   POST /api/shop/products/:id/rate
// @desc    Rate a product
// @access  Public
router.post('/products/:id/rate', async (req, res) => {
  try {
    const { rating } = req.body;
    const productId = req.params.id;

    // Validate rating
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 1 and 5'
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Update product rating
    const currentTotal = product.rating.average * product.rating.count;
    const newCount = product.rating.count + 1;
    const newAverage = (currentTotal + rating) / newCount;

    product.rating = {
      average: Math.round(newAverage * 10) / 10, // Round to 1 decimal place
      count: newCount
    };

    await product.save();

    res.json({
      success: true,
      message: 'Rating submitted successfully',
      data: {
        rating: product.rating
      }
    });

  } catch (error) {
    console.error('Rate product error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit rating'
    });
  }
});

// @route   GET /api/shop/stats
// @desc    Get shop statistics
// @access  Public
router.get('/stats', async (req, res) => {
  try {
    const [productStats, orderStats] = await Promise.all([
      Product.aggregate([
        { $match: { status: 'active' } },
        {
          $group: {
            _id: null,
            totalProducts: { $sum: 1 },
            averagePrice: { $avg: '$price' },
            minPrice: { $min: '$price' },
            maxPrice: { $max: '$price' },
            totalStock: { $sum: '$stock' }
          }
        }
      ]),
      Order.getOrderStats()
    ]);

    res.json({
      success: true,
      data: {
        products: productStats[0] || {
          totalProducts: 0,
          averagePrice: 0,
          minPrice: 0,
          maxPrice: 0,
          totalStock: 0
        },
        orders: orderStats
      }
    });

  } catch (error) {
    console.error('Get shop stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch shop statistics'
    });
  }
});

// ==================== ADMIN PRODUCT MANAGEMENT ROUTES ====================

// @route   POST /api/shop/products
// @desc    Create a new product (Admin only)
// @access  Private (Admin)
router.post('/products', authenticateToken, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin privileges required.'
      });
    }

    const {
      name,
      description,
      shortDescription,
      price,
      originalPrice,
      category,
      stock,
      images = [],
      status = 'active',
      isFeatured = false,
      isOnSale = false,
      onOffer = false,
      isHotThisMonth = false,
      offerPercentage,
      offerEndDate,
      weight,
      dimensions,
      color,
      material,
      brand,
      tags = [],
      metaTitle,
      metaDescription,
      seoKeywords,
      specifications = []
    } = req.body;

    // Validate required fields
    if (!name || !description || !price || !category || stock === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Name, description, price, category, and stock are required'
      });
    }

    // Validate stock is non-negative
    if (parseInt(stock) < 0) {
      return res.status(400).json({
        success: false,
        message: 'Stock cannot be negative'
      });
    }

    // Validate that onOffer products have originalPrice
    if (onOffer && !originalPrice) {
      return res.status(400).json({
        success: false,
        message: 'Original price is required when product is on offer'
      });
    }

    // Slug is generated uniquely by Product pre-save hook

    // Process images to include Cloudinary data
    const processedImages = images.map((img, index) => ({
      url: img.url,
      cloudinaryId: img.cloudinaryId || img.public_id,
      alt: img.alt || `${name} image ${index + 1}`,
      isPrimary: index === 0, // First image is primary
      width: img.width,
      height: img.height,
      format: img.format,
      bytes: img.bytes
    }));

    const product = new Product({
      name,
      // slug will be auto-generated
      description,
      shortDescription,
      price: parseFloat(price),
      originalPrice: originalPrice ? parseFloat(originalPrice) : undefined,
      category,
      stock: Math.max(0, parseInt(stock) || 0),
      images: processedImages,
      status,
      isFeatured,
      isOnSale,
      onOffer,
      isHotThisMonth,
      offerPercentage: offerPercentage ? parseFloat(offerPercentage) : undefined,
      offerEndDate: offerEndDate ? new Date(offerEndDate) : undefined,
      weight,
      dimensions,
      color,
      material,
      brand,
      tags,
      metaTitle,
      metaDescription,
      seoKeywords,
      specifications,
      createdBy: req.user._id
    });

    await product.save();

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product
    });

  } catch (error) {
    console.error('Create product error:', error);
    // Handle duplicate key errors (e.g., slug or sku uniqueness)
    if (error && (error.code === 11000 || error.code === 11001)) {
      const duplicateField = Object.keys(error.keyValue || {})[0] || 'field';
      return res.status(409).json({
        success: false,
        message: `Duplicate value for ${duplicateField}. Please use a different value.`,
        field: duplicateField
      });
    }
    // Handle validation errors with detailed messages
    if (error && error.name === 'ValidationError') {
      const details = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: details
      });
    }
    res.status(500).json({
      success: false,
      message: 'Failed to create product',
      error: error.message
    });
  }
});

// @route   PUT /api/shop/products/:id
// @desc    Update a product (Admin only)
// @access  Private (Admin)
router.put('/products/:id', authenticateToken, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin privileges required.'
      });
    }

    const {
      name,
      description,
      shortDescription,
      price,
      originalPrice,
      category,
      stock,
      images,
      status,
      isFeatured,
      isOnSale,
      onOffer,
      isHotThisMonth,
      offerPercentage,
      offerEndDate,
      weight,
      dimensions,
      color,
      material,
      brand,
      tags,
      metaTitle,
      metaDescription,
      seoKeywords,
      specifications
    } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Validate that onOffer products have originalPrice
    if (onOffer && !originalPrice) {
      return res.status(400).json({
        success: false,
        message: 'Original price is required when product is on offer'
      });
    }

    // Update fields
    if (name) {
      product.name = name; // slug will be recalculated by pre-save hook
    }
    if (description !== undefined) product.description = description;
    if (shortDescription !== undefined) product.shortDescription = shortDescription;
    if (price !== undefined) product.price = parseFloat(price);
    if (originalPrice !== undefined) product.originalPrice = originalPrice ? parseFloat(originalPrice) : undefined;
    if (category !== undefined) product.category = category;
    if (stock !== undefined) product.stock = Math.max(0, parseInt(stock) || 0);
    if (images !== undefined) {
      // Process images to include Cloudinary data
      const processedImages = images.map((img, index) => ({
        url: img.url,
        cloudinaryId: img.cloudinaryId || img.public_id,
        alt: img.alt || `${product.name} image ${index + 1}`,
        isPrimary: index === 0, // First image is primary
        width: img.width,
        height: img.height,
        format: img.format,
        bytes: img.bytes
      }));
      product.images = processedImages;
    }
    if (status !== undefined) product.status = status;
    if (isFeatured !== undefined) product.isFeatured = isFeatured;
    if (isOnSale !== undefined) product.isOnSale = isOnSale;
    if (onOffer !== undefined) product.onOffer = onOffer;
    if (isHotThisMonth !== undefined) product.isHotThisMonth = isHotThisMonth;
    if (offerPercentage !== undefined) product.offerPercentage = offerPercentage ? parseFloat(offerPercentage) : undefined;
    if (offerEndDate !== undefined) product.offerEndDate = offerEndDate ? new Date(offerEndDate) : undefined;
    if (weight !== undefined) product.weight = weight;
    if (dimensions !== undefined) product.dimensions = dimensions;
    if (color !== undefined) product.color = color;
    if (material !== undefined) product.material = material;
    if (brand !== undefined) product.brand = brand;
    if (tags !== undefined) product.tags = tags;
    if (metaTitle !== undefined) product.metaTitle = metaTitle;
    if (metaDescription !== undefined) product.metaDescription = metaDescription;
    if (seoKeywords !== undefined) product.seoKeywords = seoKeywords;
    if (specifications !== undefined) product.specifications = specifications;
    product.updatedBy = req.user._id;

    await product.save();

    res.json({
      success: true,
      message: 'Product updated successfully',
      data: product
    });

  } catch (error) {
    console.error('Update product error:', error);
    if (error && (error.code === 11000 || error.code === 11001)) {
      const duplicateField = Object.keys(error.keyValue || {})[0] || 'field';
      return res.status(409).json({
        success: false,
        message: `Duplicate value for ${duplicateField}. Please use a different value.`,
        field: duplicateField
      });
    }
    if (error && error.name === 'ValidationError') {
      const details = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: details
      });
    }
    res.status(500).json({
      success: false,
      message: 'Failed to update product',
      error: error.message
    });
  }
});

// @route   DELETE /api/shop/products/:id
// @desc    Delete a product (Admin only)
// @access  Private (Admin)
router.delete('/products/:id', authenticateToken, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin privileges required.'
      });
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });

  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete product',
      error: error.message
    });
  }
});

// @route   GET /api/shop/admin/products
// @desc    Get all products for admin management
// @access  Private (Admin)
router.get('/admin/products', authenticateToken, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin privileges required.'
      });
    }

    const {
      page = 1,
      limit = 50,
      category,
      search,
      status,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const skip = (page - 1) * limit;
    let query = {};

    // Apply filters
    if (category) query.category = category;
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const sort = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };

    const [products, total] = await Promise.all([
      Product.find(query)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit)),
      Product.countDocuments(query)
    ]);

    res.json({
      success: true,
      products,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalProducts: total,
        hasNextPage: page * limit < total,
        hasPrevPage: page > 1
      }
    });

  } catch (error) {
    console.error('Get products (admin) error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products'
    });
  }
});

module.exports = router; 