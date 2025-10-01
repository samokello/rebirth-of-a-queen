import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { FaPlus, FaEdit, FaTrash, FaUpload, FaTimes, FaSpinner, FaImage, FaSearch, FaFilter, FaSortAmountDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AdminProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    shortDescription: '',
    price: '',
    originalPrice: '',
    category: '',
    stock: '0',
    images: [],
    status: 'draft',
    isFeatured: false,
    isOnSale: false,
    onOffer: false,
    isHotThisMonth: false,
    offerPercentage: '',
    offerEndDate: '',
    weight: '',
    dimensions: {
      length: '',
      width: '',
      height: '',
      unit: 'cm'
    },
    color: '',
    material: '',
    brand: '',
    tags: [],
    metaTitle: '',
    metaDescription: '',
    seoKeywords: '',
    specifications: []
  });

  const categories = [
    'leather-bags',
    'leather-wallets', 
    'leather-accessories',
    'vitenge-clothes',
    'branded-clothes',
    'branded-bottles',
    'aprons',
    'other'
  ];

    const statuses = ['draft', 'active', 'inactive', 'archived'];

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage,
        limit: 20,
        sortBy,
        sortOrder,
        ...(searchTerm && { search: searchTerm }),
        ...(selectedCategory && { category: selectedCategory }),
        ...(selectedStatus && { status: selectedStatus })
      });

      const response = await fetch(`/api/shop/admin/products?${params}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setProducts(data.products);
        setTotalPages(data.pagination.totalPages);
      } else {
        console.error('Failed to fetch products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm, selectedCategory, selectedStatus, sortBy, sortOrder]);

  useEffect(() => {
    // Check if admin is logged in
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      navigate('/admin/login');
      return;
    }
    
    fetchProducts();
  }, [fetchProducts, navigate]);


  const handleImageUpload = async (files) => {
    if (!files || files.length === 0) {
      console.log('No files selected');
      return;
    }

    setUploading(true);
    try {
      console.log('Uploading files:', files.length, 'files');
      
      // Log file details for debugging
      Array.from(files).forEach((file, index) => {
        console.log(`File ${index + 1}:`, {
          name: file.name,
          type: file.type,
          size: file.size,
          lastModified: file.lastModified
        });
      });

      const formData = new FormData();
      Array.from(files).forEach((file, index) => {
        console.log(`File ${index + 1}:`, file.name, file.type, file.size);
        formData.append('files', file);
      });

      const token = localStorage.getItem('adminToken');
      if (!token) {
        throw new Error('No authentication token found. Please log in as admin.');
      }

      const response = await fetch('/api/upload/multiple', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      console.log('Upload response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('Upload successful:', data);
        
        const newImages = data.data.map(img => ({
          url: img.secure_url,
          cloudinaryId: img.public_id,
          alt: '',
          width: img.width,
          height: img.height,
          format: img.format,
          bytes: img.bytes
        }));
        
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, ...newImages]
        }));
        
        console.log('Images added to form data');
      } else {
        const errorData = await response.json();
        console.error('Upload failed:', errorData);
        
        // For now, let's create a temporary preview even if upload fails
        // This helps test the UI while Cloudinary is being configured
        const tempImages = Array.from(files).map((file, index) => ({
          url: URL.createObjectURL(file),
          cloudinaryId: `temp-${Date.now()}-${index}`,
          alt: file.name,
          width: 0,
          height: 0,
          format: file.type.split('/')[1],
          bytes: file.size,
          isTemp: true
        }));
        
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, ...tempImages]
        }));
        
        alert(`Upload failed: ${errorData.message || 'Unknown error'}. Created temporary preview.`);
      }
    } catch (error) {
      console.error('Error uploading images:', error);
      
      // Create temporary preview for testing
      const tempImages = Array.from(files).map((file, index) => ({
        url: URL.createObjectURL(file),
        cloudinaryId: `temp-${Date.now()}-${index}`,
        alt: file.name,
        width: 0,
        height: 0,
        format: file.type.split('/')[1],
        bytes: file.size,
        isTemp: true
      }));
      
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...tempImages]
      }));
      
      alert(`Upload error: ${error.message}. Created temporary preview for testing.`);
    } finally {
      setUploading(false);
    }
  };

  // Drag and drop handlers
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      console.log('Files dropped:', files.length);
      handleImageUpload(files);
    }
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSave = async () => {
    try {
      // Validate required fields
      if (!formData.name || !formData.price || !formData.category || formData.stock === '') {
        alert('Please fill in all required fields: Name, Price, Category, and Stock');
        return;
      }

      // Validate stock is non-negative
      if (parseInt(formData.stock) < 0) {
        alert('Stock cannot be negative. Please enter a valid stock quantity.');
        return;
      }

      // Validate that onOffer products have originalPrice
      if (formData.onOffer && !formData.originalPrice) {
        alert('Original price is required when product is on offer. Please enter the original price.');
        return;
      }

      // Prepare product data
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
        stock: Math.max(0, parseInt(formData.stock) || 0),
        offerPercentage: formData.offerPercentage ? parseInt(formData.offerPercentage) : null,
        weight: formData.weight ? parseFloat(formData.weight) : null,
        dimensions: {
          length: formData.dimensions.length ? parseFloat(formData.dimensions.length) : null,
          width: formData.dimensions.width ? parseFloat(formData.dimensions.width) : null,
          height: formData.dimensions.height ? parseFloat(formData.dimensions.height) : null,
          unit: formData.dimensions.unit || 'cm'
        },
        // Remove temporary images
        images: formData.images.filter(img => !img.isTemp)
      };

      const url = editingProduct 
        ? `/api/shop/products/${editingProduct._id}`
        : '/api/shop/products';
      
      const method = editingProduct ? 'PUT' : 'POST';

      console.log('Saving product:', productData);
      console.log('Stock value:', formData.stock, 'Parsed stock:', productData.stock);

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(productData)
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Product saved successfully:', result);
        
        alert(editingProduct ? 'Product updated successfully!' : 'Product created successfully!');
        setShowModal(false);
        setEditingProduct(null);
        resetForm();
        fetchProducts();
      } else {
        const error = await response.json();
        console.error('Error saving product:', error);
        alert(`Error saving product: ${error.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error saving product:', error);
      alert(`Error saving product: ${error.message}`);
    }
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch(`/api/shop/products/${productId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
          }
        });

        if (response.ok) {
          fetchProducts();
        }
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name || '',
      description: product.description || '',
      shortDescription: product.shortDescription || '',
      price: product.price || '',
      originalPrice: product.originalPrice || '',
      category: product.category || '',
      stock: product.stock !== undefined ? product.stock.toString() : '0',
      images: product.images || [],
      status: product.status || 'draft',
      isFeatured: product.isFeatured || false,
      isOnSale: product.isOnSale || false,
      onOffer: product.onOffer || false,
      isHotThisMonth: product.isHotThisMonth || false,
      offerPercentage: product.offerPercentage || '',
      offerEndDate: product.offerEndDate ? new Date(product.offerEndDate).toISOString().split('T')[0] : '',
      weight: product.weight || '',
      dimensions: product.dimensions || { length: '', width: '', height: '', unit: 'cm' },
      color: product.color || '',
      material: product.material || '',
      brand: product.brand || '',
      tags: product.tags || [],
      metaTitle: product.metaTitle || '',
      metaDescription: product.metaDescription || '',
      seoKeywords: product.seoKeywords || '',
      specifications: product.specifications || []
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      shortDescription: '',
      price: '',
      originalPrice: '',
      category: '',
      stock: '0',
      images: [],
      status: 'draft',
      isFeatured: false,
      isOnSale: false,
      onOffer: false,
      isHotThisMonth: false,
      offerPercentage: '',
      offerEndDate: '',
      weight: '',
      dimensions: {
        length: '',
        width: '',
        height: '',
        unit: 'cm'
      },
      color: '',
      material: '',
      brand: '',
      tags: [],
      metaTitle: '',
      metaDescription: '',
      seoKeywords: '',
      specifications: []
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleDimensionChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      dimensions: {
        ...prev.dimensions,
        [field]: value
      }
    }));
  };

  const addTag = (tag) => {
    if (tag && !formData.tags.includes(tag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };


  return (
    <Container>
      <Header>
        <HeaderContent>
          <Title>Product Management</Title>
          <Stats>
            <StatCard>
              <StatNumber>{products.length}</StatNumber>
              <StatLabel>Total Products</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>{products.filter(p => p.status === 'active').length}</StatNumber>
              <StatLabel>Active</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>{products.filter(p => p.stock === 0).length}</StatNumber>
              <StatLabel>Out of Stock</StatLabel>
            </StatCard>
          </Stats>
        </HeaderContent>
        <AddButton onClick={() => setShowModal(true)}>
          <FaPlus /> Add Product
        </AddButton>
      </Header>

      <Filters>
        <SearchContainer>
          <SearchIcon><FaSearch /></SearchIcon>
          <SearchInput
            type="text"
            placeholder="Search products by name, category, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchContainer>
        <FilterGroup>
          <FilterLabel><FaFilter /> Category</FilterLabel>
          <Select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat.replace('-', ' ').toUpperCase()}</option>
            ))}
          </Select>
        </FilterGroup>
        <FilterGroup>
          <FilterLabel><FaFilter /> Status</FilterLabel>
          <Select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
            <option value="">All Status</option>
            {statuses.map(status => (
              <option key={status} value={status}>{status.toUpperCase()}</option>
            ))}
          </Select>
        </FilterGroup>
        <FilterGroup>
          <FilterLabel><FaSortAmountDown /> Sort By</FilterLabel>
          <Select value={`${sortBy}-${sortOrder}`} onChange={(e) => {
            const [field, order] = e.target.value.split('-');
            setSortBy(field);
            setSortOrder(order);
          }}>
            <option value="createdAt-desc">Newest First</option>
            <option value="createdAt-asc">Oldest First</option>
            <option value="name-asc">Name A-Z</option>
            <option value="name-desc">Name Z-A</option>
            <option value="price-asc">Price Low-High</option>
            <option value="price-desc">Price High-Low</option>
            <option value="stock-asc">Stock Low-High</option>
            <option value="stock-desc">Stock High-Low</option>
          </Select>
        </FilterGroup>
      </Filters>

      {loading ? (
        <LoadingContainer>
          <LoadingSpinner>
            <FaSpinner className="spinner" />
            <LoadingText>Loading products...</LoadingText>
          </LoadingSpinner>
        </LoadingContainer>
      ) : products.length === 0 ? (
        <EmptyState>
          <EmptyIcon><FaImage /></EmptyIcon>
          <EmptyTitle>No Products Found</EmptyTitle>
          <EmptyMessage>
            {searchTerm || selectedCategory || selectedStatus 
              ? 'No products match your current filters. Try adjusting your search criteria.'
              : 'Get started by adding your first product to the store.'
            }
          </EmptyMessage>
          {!searchTerm && !selectedCategory && !selectedStatus && (
            <AddButton onClick={() => setShowModal(true)}>
              <FaPlus /> Add Your First Product
            </AddButton>
          )}
        </EmptyState>
      ) : (
        <>
          <ProductGrid>
            {products.map(product => (
              <ProductCard key={product._id}>
                <ProductImage>
                  {product.images && product.images.length > 0 ? (
                    <img src={product.images[0].url} alt={product.name} />
                  ) : (
                    <PlaceholderImage>
                      <FaImage />
                      <span>No Image</span>
                    </PlaceholderImage>
                  )}
                  {product.isFeatured && <FeaturedBadge>Featured</FeaturedBadge>}
                  {product.onOffer && <OfferBadge>On Offer</OfferBadge>}
                </ProductImage>
                <ProductInfo>
                  <ProductName>{product.name}</ProductName>
                  <ProductCategory>{product.category?.replace('-', ' ').toUpperCase()}</ProductCategory>
                  <ProductPrice>KSH {product.price?.toLocaleString()}</ProductPrice>
                  {product.originalPrice && (
                    <OriginalPrice>KSH {product.originalPrice.toLocaleString()}</OriginalPrice>
                  )}
                  <ProductStock stock={product.stock}>
                    <StockIcon />
                    {product.stock === 0 ? 'Out of Stock' : `${product.stock} in stock`}
                  </ProductStock>
                  <ProductStatus status={product.status}>{product.status}</ProductStatus>
                </ProductInfo>
                <ProductActions>
                  <ActionButton onClick={() => handleEdit(product)} title="Edit Product">
                    <FaEdit />
                  </ActionButton>
                  <ActionButton onClick={() => handleDelete(product._id)} title="Delete Product" danger>
                    <FaTrash />
                  </ActionButton>
                </ProductActions>
              </ProductCard>
            ))}
          </ProductGrid>
          
          {totalPages > 1 && (
            <Pagination>
              <PageButton 
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </PageButton>
              <PageInfo>
                Page {currentPage} of {totalPages}
              </PageInfo>
              <PageButton 
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </PageButton>
            </Pagination>
          )}
        </>
      )}

      {showModal && (
        <ModalOverlay onClick={() => setShowModal(false)}>
          <Modal onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</ModalTitle>
              <CloseButton onClick={() => setShowModal(false)}>
                <FaTimes />
              </CloseButton>
            </ModalHeader>

            <ModalContent>
              <FormSection>
                <SectionTitle>Basic Information</SectionTitle>
                <FormGrid>
                  <FormGroup>
                    <Label>Product Name *</Label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter product name"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Category *</Label>
                    <Select name="category" value={formData.category} onChange={handleInputChange}>
                      <option value="">Select Category</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat.replace('-', ' ').toUpperCase()}</option>
                      ))}
                    </Select>
                  </FormGroup>
                </FormGrid>

                <FormGroup>
                  <Label>Description *</Label>
                  <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter product description"
                    rows="4"
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Short Description</Label>
                  <Textarea
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleInputChange}
                    placeholder="Enter short description"
                    rows="2"
                  />
                </FormGroup>
              </FormSection>

              <FormSection>
                <SectionTitle>Pricing & Inventory</SectionTitle>
                <FormGrid>
                  <FormGroup>
                    <Label>Price (KSH) *</Label>
                    <Input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="0"
                      step="1"
                    />
                  </FormGroup>
                  {formData.onOffer && (
                    <FormGroup>
                      <Label>Original Price (KSH) - for offer discount</Label>
                      <Input
                        type="number"
                        name="originalPrice"
                        value={formData.originalPrice}
                        onChange={handleInputChange}
                        placeholder="0"
                        step="1"
                        required={formData.onOffer}
                      />
                    </FormGroup>
                  )}
                  <FormGroup>
                    <Label>Stock *</Label>
                    <Input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleInputChange}
                      placeholder="0"
                      min="0"
                      step="1"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Status</Label>
                    <Select name="status" value={formData.status} onChange={handleInputChange}>
                      {statuses.map(status => (
                        <option key={status} value={status}>{status.toUpperCase()}</option>
                      ))}
                    </Select>
                  </FormGroup>
                </FormGrid>
              </FormSection>

              <FormSection>
                <SectionTitle>Images</SectionTitle>
                <ImageUploadArea
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  style={{
                    borderColor: isDragOver ? '#007bff' : '#ddd',
                    background: isDragOver ? '#e3f2fd' : '#fafafa',
                    transform: isDragOver ? 'scale(1.02)' : 'scale(1)'
                  }}
                >
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => {
                      console.log('File input changed:', e.target.files);
                      handleImageUpload(e.target.files);
                    }}
                    style={{ display: 'none' }}
                    id="image-upload"
                    disabled={uploading}
                  />
                  <div 
                    onClick={() => {
                      console.log('Upload area clicked');
                      if (!uploading) {
                        const fileInput = document.getElementById('image-upload');
                        if (fileInput) {
                          console.log('Triggering file input click');
                          fileInput.click();
                        } else {
                          console.error('File input not found');
                        }
                      } else {
                        console.log('Upload in progress, ignoring click');
                      }
                    }}
                    style={{ 
                      cursor: uploading ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '10px'
                    }}
                  >
                    <UploadButton 
                      type="button" 
                      disabled={uploading}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (!uploading) {
                          document.getElementById('image-upload').click();
                        }
                      }}
                    >
                      {uploading ? <FaSpinner className="spinner" /> : <FaUpload />}
                      {uploading ? 'Uploading...' : 'Upload Images'}
                    </UploadButton>
                    <p style={{ fontSize: '12px', color: '#666', margin: '0' }}>
                      Supported formats: JPG, PNG, GIF, WebP. Max size: 10MB per file.
                    </p>
                    <p style={{ fontSize: '11px', color: '#999', margin: '0' }}>
                      Click anywhere in this area or drag & drop files here
                    </p>
                  </div>
                </ImageUploadArea>

                {formData.images.length > 0 && (
                  <ImageGrid>
                    {formData.images.map((image, index) => (
                      <ImagePreview key={index}>
                        <img 
                          src={image.url} 
                          alt={`Product ${index + 1}`} 
                          onError={(e) => {
                            console.error('Image failed to load:', image.url);
                            e.target.style.display = 'none';
                          }}
                        />
                        {image.isTemp && (
                          <div style={{
                            position: 'absolute',
                            top: '5px',
                            left: '5px',
                            background: 'rgba(255, 193, 7, 0.9)',
                            color: '#000',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            fontSize: '10px',
                            fontWeight: 'bold'
                          }}>
                            TEMP
                          </div>
                        )}
                        <RemoveImageButton onClick={() => removeImage(index)}>
                          <FaTimes />
                        </RemoveImageButton>
                      </ImagePreview>
                    ))}
                  </ImageGrid>
                )}

                {formData.images.length === 0 && !uploading && (
                  <div style={{ 
                    textAlign: 'center', 
                    padding: '20px', 
                    border: '2px dashed #ddd', 
                    borderRadius: '8px',
                    marginTop: '10px',
                    color: '#666'
                  }}>
                    <FaImage style={{ fontSize: '24px', marginBottom: '8px' }} />
                    <p>No images uploaded yet</p>
                    <p style={{ fontSize: '12px' }}>Click "Upload Images" to add product photos</p>
                  </div>
                )}
              </FormSection>

              <FormSection>
                <SectionTitle>Product Features</SectionTitle>
                <FormGrid>
                  <CheckboxGroup>
                    <Checkbox
                      type="checkbox"
                      name="isFeatured"
                      checked={formData.isFeatured}
                      onChange={handleInputChange}
                    />
                    <CheckboxLabel>Featured Product</CheckboxLabel>
                  </CheckboxGroup>
                  <CheckboxGroup>
                    <Checkbox
                      type="checkbox"
                      name="isOnSale"
                      checked={formData.isOnSale}
                      onChange={handleInputChange}
                    />
                    <CheckboxLabel>On Sale</CheckboxLabel>
                  </CheckboxGroup>
                  <CheckboxGroup>
                    <Checkbox
                      type="checkbox"
                      name="onOffer"
                      checked={formData.onOffer}
                      onChange={handleInputChange}
                    />
                    <CheckboxLabel>On Offer (Special Discount)</CheckboxLabel>
                  </CheckboxGroup>
                  <CheckboxGroup>
                    <Checkbox
                      type="checkbox"
                      name="isHotThisMonth"
                      checked={formData.isHotThisMonth}
                      onChange={handleInputChange}
                    />
                    <CheckboxLabel>Hot This Month</CheckboxLabel>
                  </CheckboxGroup>
                </FormGrid>

                {formData.isOnSale && (
                  <FormGrid>
                    <FormGroup>
                      <Label>Offer Percentage</Label>
                      <Input
                        type="number"
                        name="offerPercentage"
                        value={formData.offerPercentage}
                        onChange={handleInputChange}
                        placeholder="0"
                        min="0"
                        max="100"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>Offer End Date</Label>
                      <Input
                        type="date"
                        name="offerEndDate"
                        value={formData.offerEndDate}
                        onChange={handleInputChange}
                      />
                    </FormGroup>
                  </FormGrid>
                )}
              </FormSection>

              <FormSection>
                <SectionTitle>Product Details</SectionTitle>
                <FormGrid>
                  <FormGroup>
                    <Label>Weight (kg)</Label>
                    <Input
                      type="number"
                      name="weight"
                      value={formData.weight}
                      onChange={handleInputChange}
                      placeholder="0"
                      step="0.01"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Color</Label>
                    <Input
                      type="text"
                      name="color"
                      value={formData.color}
                      onChange={handleInputChange}
                      placeholder="Enter color"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Material</Label>
                    <Input
                      type="text"
                      name="material"
                      value={formData.material}
                      onChange={handleInputChange}
                      placeholder="Enter material"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Brand</Label>
                    <Input
                      type="text"
                      name="brand"
                      value={formData.brand}
                      onChange={handleInputChange}
                      placeholder="Enter brand"
                    />
                  </FormGroup>
                </FormGrid>

                <FormGroup>
                  <Label>Dimensions (cm)</Label>
                  <DimensionGrid>
                    <Input
                      type="number"
                      placeholder="Length"
                      value={formData.dimensions.length}
                      onChange={(e) => handleDimensionChange('length', e.target.value)}
                      step="0.1"
                    />
                    <Input
                      type="number"
                      placeholder="Width"
                      value={formData.dimensions.width}
                      onChange={(e) => handleDimensionChange('width', e.target.value)}
                      step="0.1"
                    />
                    <Input
                      type="number"
                      placeholder="Height"
                      value={formData.dimensions.height}
                      onChange={(e) => handleDimensionChange('height', e.target.value)}
                      step="0.1"
                    />
                    <Select
                      value={formData.dimensions.unit}
                      onChange={(e) => handleDimensionChange('unit', e.target.value)}
                    >
                      <option value="cm">cm</option>
                      <option value="inch">inch</option>
                    </Select>
                  </DimensionGrid>
                </FormGroup>
              </FormSection>

              <FormSection>
                <SectionTitle>Tags</SectionTitle>
                <TagInput
                  type="text"
                  placeholder="Add a tag and press Enter"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addTag(e.target.value);
                      e.target.value = '';
                    }
                  }}
                />
                {formData.tags.length > 0 && (
                  <TagList>
                    {formData.tags.map((tag, index) => (
                      <Tag key={index}>
                        {tag}
                        <RemoveTagButton onClick={() => removeTag(tag)}>
                          <FaTimes />
                        </RemoveTagButton>
                      </Tag>
                    ))}
                  </TagList>
                )}
              </FormSection>

              <FormSection>
                <SectionTitle>SEO</SectionTitle>
                <FormGroup>
                  <Label>Meta Title</Label>
                  <Input
                    type="text"
                    name="metaTitle"
                    value={formData.metaTitle}
                    onChange={handleInputChange}
                    placeholder="Enter meta title"
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Meta Description</Label>
                  <Textarea
                    name="metaDescription"
                    value={formData.metaDescription}
                    onChange={handleInputChange}
                    placeholder="Enter meta description"
                    rows="2"
                  />
                </FormGroup>
                <FormGroup>
                  <Label>SEO Keywords</Label>
                  <Input
                    type="text"
                    name="seoKeywords"
                    value={formData.seoKeywords}
                    onChange={handleInputChange}
                    placeholder="Enter SEO keywords"
                  />
                </FormGroup>
              </FormSection>
            </ModalContent>

            <ModalFooter>
              <CancelButton onClick={() => setShowModal(false)}>Cancel</CancelButton>
              <SaveButton onClick={handleSave}>
                {editingProduct ? 'Update Product' : 'Create Product'}
              </SaveButton>
            </ModalFooter>
          </Modal>
        </ModalOverlay>
      )}
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    opacity: 0.3;
    pointer-events: none;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  gap: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const HeaderContent = styled.div`
  flex: 1;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: white;
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  background: linear-gradient(45deg, #fff, #f0f0f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Stats = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 1rem 1.5rem;
  text-align: center;
  min-width: 120px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

const StatNumber = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.25rem;
`;

const StatLabel = styled.div`
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
`;

const AddButton = styled.button`
  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
  font-size: 1rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 107, 107, 0.4);
    background: linear-gradient(135deg, #ff5252, #d63031);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const Filters = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 1.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  flex: 1;
  min-width: 300px;
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.6);
  font-size: 1rem;
  z-index: 1;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
  
  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.5);
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);
  }
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 180px;
`;

const FilterLabel = styled.label`
  font-size: 0.85rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Select = styled.select`
  padding: 0.75rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 0.9rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.5);
    background: rgba(255, 255, 255, 0.15);
  }
  
  option {
    background: #333;
    color: white;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`;

const LoadingSpinner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 3rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  
  .spinner {
    animation: spin 1s linear infinite;
    color: white;
    font-size: 2rem;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.div`
  color: white;
  font-size: 1.1rem;
  font-weight: 500;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  margin: 2rem 0;
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 1rem;
`;

const EmptyTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
  margin-bottom: 0.5rem;
`;

const EmptyMessage = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  margin-bottom: 2rem;
  max-width: 400px;
  line-height: 1.5;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const ProductCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
    background: rgba(255, 255, 255, 1);
  }
`;

const ProductImage = styled.div`
  height: 220px;
  overflow: hidden;
  position: relative;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  &:hover img {
    transform: scale(1.05);
  }
`;

const PlaceholderImage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  color: #666;
  font-size: 0.9rem;
  gap: 0.5rem;
  
  svg {
    font-size: 2rem;
    opacity: 0.5;
  }
`;

const FeaturedBadge = styled.div`
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  box-shadow: 0 2px 8px rgba(255, 107, 107, 0.3);
`;

const OfferBadge = styled.div`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: linear-gradient(135deg, #4ecdc4, #44a08d);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  box-shadow: 0 2px 8px rgba(78, 205, 196, 0.3);
`;

const ProductInfo = styled.div`
  padding: 1.5rem;
`;

const ProductName = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #333;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ProductCategory = styled.div`
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 0.75rem;
  text-transform: uppercase;
  font-weight: 500;
  letter-spacing: 0.5px;
`;

const ProductPrice = styled.div`
  font-size: 1.3rem;
  font-weight: 700;
  color: #2d3436;
  margin-bottom: 0.5rem;
`;

const OriginalPrice = styled.div`
  font-size: 1rem;
  color: #999;
  text-decoration: line-through;
  margin-bottom: 0.5rem;
`;

const ProductStock = styled.div`
  font-size: 0.85rem;
  color: ${props => props.stock === 0 ? '#e17055' : '#00b894'};
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
`;

const StockIcon = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.stock === 0 ? '#e17055' : '#00b894'};
`;

const ProductStatus = styled.div`
  display: inline-block;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: ${props => {
    switch (props.status) {
      case 'active': return 'linear-gradient(135deg, #00b894, #00a085)';
      case 'draft': return 'linear-gradient(135deg, #fdcb6e, #e17055)';
      case 'inactive': return 'linear-gradient(135deg, #e17055, #d63031)';
      default: return 'linear-gradient(135deg, #ddd, #bbb)';
    }
  }};
  color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const ProductActions = styled.div`
  display: flex;
  gap: 0.75rem;
  padding: 1.5rem;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  background: rgba(248, 249, 250, 0.5);
`;

const ActionButton = styled.button`
  background: ${props => props.danger ? 'linear-gradient(135deg, #e17055, #d63031)' : 'linear-gradient(135deg, #74b9ff, #0984e3)'};
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  font-size: 0.9rem;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    background: ${props => props.danger ? 'linear-gradient(135deg, #d63031, #b71c1c)' : 'linear-gradient(135deg, #0984e3, #0770c4)'};
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
`;

const PageButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  
  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PageInfo = styled.div`
  color: white;
  font-weight: 500;
  font-size: 0.9rem;
`;

// Modal Styles
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  z-index: 99999;
  padding: 20px;
  padding-left: 280px;

  @media (max-width: 768px) {
    padding-left: 20px;
  }
`;

const Modal = styled.div`
  background: white;
  border-radius: 20px;
  width: 90%;
  max-width: 900px;
  max-height: 85vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: modalSlideIn 0.3s ease-out;
  margin-left: auto;
  margin-right: 20px;

  @keyframes modalSlideIn {
    from {
      opacity: 0;
      transform: translateX(20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @media (max-width: 1200px) {
    max-width: 700px;
    margin-right: 10px;
  }

  @media (max-width: 768px) {
    width: 95%;
    max-width: none;
    margin: 0 10px;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  border-bottom: 1px solid #eee;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  padding: 0.5rem;

  &:hover {
    color: #333;
  }
`;

const ModalContent = styled.div`
  padding: 2rem;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 2rem;
  border-top: 1px solid #eee;
`;

const FormSection = styled.div`
  margin-bottom: 2.5rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #007bff;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }
`;

const Textarea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  font-size: 1rem;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Checkbox = styled.input`
  width: 1.2rem;
  height: 1.2rem;
`;

const CheckboxLabel = styled.label`
  font-weight: 500;
  color: #333;
`;

const ImageUploadArea = styled.div`
  border: 2px dashed #ddd;
  border-radius: 0.5rem;
  padding: 2rem;
  text-align: center;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
  background: #fafafa;
  
  &:hover {
    border-color: #007bff;
    background: #f0f8ff;
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

const UploadButton = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 auto;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .spinner {
    animation: spin 1s linear infinite;
  }
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
`;

const ImagePreview = styled.div`
  position: relative;
  border-radius: 0.5rem;
  overflow: hidden;
  aspect-ratio: 1;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const RemoveImageButton = styled.button`
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
  background: rgba(255, 0, 0, 0.8);
  color: white;
  border: none;
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.8rem;

  &:hover {
    background: rgba(255, 0, 0, 1);
  }
`;

const DimensionGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 100px;
  gap: 0.5rem;
`;

const TagInput = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  font-size: 1rem;
  margin-bottom: 1rem;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Tag = styled.span`
  background: #e9ecef;
  color: #495057;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const RemoveTagButton = styled.button`
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  font-size: 0.8rem;
  padding: 0;

  &:hover {
    color: #dc3545;
  }
`;

const CancelButton = styled.button`
  background: #6c757d;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #5a6268;
  }
`;

const SaveButton = styled.button`
  background: #28a745;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #218838;
  }
`;

export default AdminProducts; 