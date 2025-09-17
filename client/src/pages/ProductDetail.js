import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  FaShoppingCart, 
  FaHeart, 
  FaStar, 
  FaArrowLeft, 
  FaShare, 
  FaTruck, 
  FaShieldAlt, 
  FaUndo, 
  FaCreditCard, 
  FaMinus,
  FaPlus,
  FaCheck,
  FaPhone
} from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { API_MAIN } from '../api';

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const { data } = await API_MAIN.get(`/shop/products/${productId}`);
        if (data?.success && data.data) {
          setProduct(data.data);
          setSelectedImage(0);
          loadRelatedProducts(data.data.category);
        } else {
          navigate('/shop');
        }
      } catch (e) {
        console.error('Error loading product:', e);
        navigate('/shop');
      } finally {
        setLoading(false);
      }
    };
    if (productId) loadProduct();
  }, [productId, navigate]);

  const loadRelatedProducts = async (category) => {
    try {
      const { data } = await API_MAIN.get(`/shop/products?category=${category}&limit=4`);
      if (data?.success && data.data) {
        setRelatedProducts(data.data.filter(p => p._id !== productId));
      }
    } catch (e) {
      console.error('Error loading related products:', e);
    }
  };

  const handleQuantityChange = (newQuantity) => {
    const stockLeft = typeof product?.stock === 'number' ? product.stock : product?.stockCount;
    if (newQuantity >= 1 && (!stockLeft || newQuantity <= stockLeft)) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      setMessage('Product added to cart successfully!');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const handleBuyNow = () => {
    if (product) {
      addToCart(product, quantity);
      navigate('/cart');
    }
  };

  const handleToggleFavorite = async () => {
    if (product) {
      try {
        await toggleFavorite(product);
        setMessage(isFavorite(product._id) ? 'Removed from favorites' : 'Added to favorites');
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
      } catch (error) {
        setMessage('Failed to update favorites');
        setShowError(true);
        setTimeout(() => setShowError(false), 3000);
      }
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.name,
        text: `Check out this product: ${product?.name}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setMessage('Link copied to clipboard!');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    }
  };

  const calculateDiscount = (originalPrice, currentPrice) => {
    if (!originalPrice || originalPrice <= currentPrice) return 0;
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8f9fa'
      }}>
        <div style={{
          textAlign: 'center',
          padding: '40px',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🛍️</div>
          <h3 style={{ color: '#2c3e50', marginBottom: '8px' }}>Loading Product...</h3>
          <p style={{ color: '#7f8c8d' }}>Please wait while we fetch the product details</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8f9fa'
      }}>
        <div style={{
          textAlign: 'center',
          padding: '40px',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>❌</div>
          <h3 style={{ color: '#2c3e50', marginBottom: '8px' }}>Product Not Found</h3>
          <p style={{ color: '#7f8c8d', marginBottom: '20px' }}>The product you're looking for doesn't exist</p>
          <button
            onClick={() => navigate('/shop')}
            style={{
              padding: '12px 24px',
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  const discount = calculateDiscount(product.originalPrice, product.price);
  const isOutOfStock = product.stock === 0;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {/* Top Navigation Bar */}
      <div style={{
        backgroundColor: "#2c3e50",
        color: "white",
        padding: "12px 0",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <button
              onClick={() => navigate('/shop')}
              style={{
                background: "none",
                border: "none",
                color: "white",
                fontSize: "20px",
                cursor: "pointer",
                padding: "8px"
              }}
            >
              <FaArrowLeft />
            </button>
            <h1 style={{ margin: 0, fontSize: "20px", fontWeight: "600" }}>Product Details</h1>
          </div>
          
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px" }}>
              <FaTruck style={{ color: "#3498db" }} />
              <span>Free Delivery</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px" }}>
              <FaPhone style={{ color: "#3498db" }} />
              <span>+254 700 000 000</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
        {/* Breadcrumb */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "20px 0",
          fontSize: "14px",
          color: "#666"
        }}>
          <Link to="/" style={{ color: "#3498db", textDecoration: "none" }}>Home</Link>
          <span>/</span>
          <Link to="/shop" style={{ color: "#3498db", textDecoration: "none" }}>Shop</Link>
          <span>/</span>
          <span style={{ color: "#2c3e50" }}>{product.category?.replace('-', ' ')}</span>
          <span>/</span>
          <span style={{ color: "#2c3e50" }}>{product.name}</span>
        </div>

        {/* Main Product Section */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "40px",
          backgroundColor: "white",
          borderRadius: "12px",
          padding: "30px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          marginBottom: "30px"
        }}>
          {/* Product Images */}
          <div>
            <div style={{
              position: "relative",
              width: "100%",
              height: "400px",
              backgroundColor: "#f8f9fa",
              borderRadius: "12px",
              overflow: "hidden",
              marginBottom: "15px"
            }}>
              {product.images && product.images[selectedImage] ? (
                <img
                  src={product.images[selectedImage].url}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center"
                  }}
                />
              ) : (
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: "100%",
                  color: "#aaa",
                  fontSize: "16px"
                }}>
                  No Image Available
                </div>
              )}

              {/* Discount Badge */}
              {product.onOffer && discount > 0 && (
                <div style={{
                  position: "absolute",
                  top: "15px",
                  left: "15px",
                  backgroundColor: "#e74c3c",
                  color: "white",
                  padding: "6px 12px",
                  borderRadius: "20px",
                  fontSize: "14px",
                  fontWeight: "bold"
                }}>
                  -{discount}% OFF
                </div>
              )}

              {/* Action Buttons */}
              <div style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                display: "flex",
                flexDirection: "column",
                gap: "10px"
              }}>
                <button
                  onClick={handleToggleFavorite}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    border: "none",
                    backgroundColor: isFavorite(product._id) ? "#e74c3c" : "rgba(255,255,255,0.95)",
                    color: isFavorite(product._id) ? "white" : "#666",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.2s ease",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
                  }}
                >
                  <FaHeart />
                </button>
                <button
                  onClick={handleShare}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    border: "none",
                    backgroundColor: "rgba(255,255,255,0.95)",
                    color: "#666",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.2s ease",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
                  }}
                >
                  <FaShare />
                </button>
              </div>
            </div>

            {/* Thumbnail Images */}
            {product.images && product.images.length > 1 && (
              <div style={{
                display: "flex",
                gap: "10px",
                overflowX: "auto",
                paddingBottom: "5px"
              }}>
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    style={{
                      minWidth: "80px",
                      height: "80px",
                      borderRadius: "8px",
                      overflow: "hidden",
                      border: selectedImage === index ? "3px solid #3498db" : "2px solid #e1e8ed",
                      cursor: "pointer",
                      backgroundColor: "#f8f9fa"
                    }}
                  >
                    <img
                      src={image.url}
                      alt={`${product.name} ${index + 1}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover"
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div>
            <div style={{ marginBottom: "20px" }}>
              <div style={{
                fontSize: "12px",
                color: "#666",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginBottom: "8px"
              }}>
                {product.category?.replace('-', ' ')}
              </div>
              <h1 style={{
                fontSize: "28px",
                fontWeight: "700",
                color: "#2c3e50",
                margin: "0 0 15px 0",
                lineHeight: "1.3"
              }}>
                {product.name}
              </h1>

              {/* Rating */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "20px"
              }}>
                <div style={{ display: "flex", gap: "2px" }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      style={{
                        color: star <= (product.rating?.average || 0) ? "#f39c12" : "#ddd",
                        fontSize: "16px"
                      }}
                    />
                  ))}
                </div>
                <span style={{ color: "#666", fontSize: "14px" }}>
                  ({product.rating?.count || 0} reviews)
                </span>
              </div>

              {/* Price */}
              <div style={{ marginBottom: "25px" }}>
                {product.onOffer && product.originalPrice ? (
                  <div style={{ display: "flex", alignItems: "center", gap: "15px", flexWrap: "wrap" }}>
                    <span style={{
                      fontSize: "32px",
                      fontWeight: "bold",
                      color: "#e74c3c"
                    }}>
                      KSH {product.price.toFixed(0)}
                    </span>
                    <span style={{
                      fontSize: "20px",
                      color: "#666",
                      textDecoration: "line-through"
                    }}>
                      KSH {product.originalPrice.toFixed(0)}
                    </span>
                    <span style={{
                      fontSize: "14px",
                      backgroundColor: "#e74c3c",
                      color: "white",
                      padding: "4px 8px",
                      borderRadius: "12px",
                      fontWeight: "bold"
                    }}>
                      Save KSH {(product.originalPrice - product.price).toFixed(0)}
                    </span>
                  </div>
                ) : (
                  <span style={{
                    fontSize: "32px",
                    fontWeight: "bold",
                    color: "#2c3e50"
                  }}>
                    KSH {product.price.toFixed(0)}
                  </span>
                )}
              </div>

              {/* Stock Status */}
              <div style={{
                fontSize: "14px",
                color: product.stock > 0 ? "#27ae60" : "#e74c3c",
                marginBottom: "25px",
                fontWeight: "500",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}>
                <FaCheck style={{ color: product.stock > 0 ? "#27ae60" : "#e74c3c" }} />
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </div>

              {/* Quantity Selector */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
                marginBottom: "25px"
              }}>
                <span style={{ fontSize: "16px", fontWeight: "600", color: "#2c3e50" }}>Quantity:</span>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  overflow: "hidden"
                }}>
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                    style={{
                      padding: "12px 16px",
                      border: "none",
                      backgroundColor: quantity <= 1 ? "#f8f9fa" : "white",
                      color: quantity <= 1 ? "#bdc3c7" : "#2c3e50",
                      cursor: quantity <= 1 ? "not-allowed" : "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <FaMinus />
                  </button>
                  <span style={{
                    padding: "12px 20px",
                    borderLeft: "1px solid #ddd",
                    borderRight: "1px solid #ddd",
                    fontSize: "16px",
                    fontWeight: "600",
                    minWidth: "60px",
                    textAlign: "center"
                  }}>
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={isOutOfStock}
                    style={{
                      padding: "12px 16px",
                      border: "none",
                      backgroundColor: isOutOfStock ? "#f8f9fa" : "white",
                      color: isOutOfStock ? "#bdc3c7" : "#2c3e50",
                      cursor: isOutOfStock ? "not-allowed" : "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{
                display: "flex",
                gap: "15px",
                marginBottom: "30px"
              }}>
                <button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  style={{
                    flex: 1,
                    padding: "15px 24px",
                    border: "none",
                    borderRadius: "8px",
                    backgroundColor: isOutOfStock ? "#bdc3c7" : "#3498db",
                    color: "white",
                    fontWeight: "600",
                    cursor: isOutOfStock ? "not-allowed" : "pointer",
                    transition: "all 0.2s ease",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    fontSize: "16px"
                  }}
                  onMouseEnter={(e) => {
                    if (!isOutOfStock) e.target.style.backgroundColor = "#2980b9";
                  }}
                  onMouseLeave={(e) => {
                    if (!isOutOfStock) e.target.style.backgroundColor = "#3498db";
                  }}
                >
                  <FaShoppingCart />
                  {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
                </button>
                <button
                  onClick={handleBuyNow}
                  disabled={isOutOfStock}
                  style={{
                    flex: 1,
                    padding: "15px 24px",
                    border: "2px solid #3498db",
                    borderRadius: "8px",
                    backgroundColor: "white",
                    color: "#3498db",
                    fontWeight: "600",
                    cursor: isOutOfStock ? "not-allowed" : "pointer",
                    transition: "all 0.2s ease",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    fontSize: "16px"
                  }}
                  onMouseEnter={(e) => {
                    if (!isOutOfStock) {
                      e.target.style.backgroundColor = "#3498db";
                      e.target.style.color = "white";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isOutOfStock) {
                      e.target.style.backgroundColor = "white";
                      e.target.style.color = "#3498db";
                    }
                  }}
                >
                  Buy Now
                </button>
              </div>

              {/* Product Features */}
              <div style={{
                borderTop: "1px solid #e1e8ed",
                paddingTop: "20px"
              }}>
                <h3 style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#2c3e50",
                  marginBottom: "15px"
                }}>
                  Product Features
                </h3>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "15px"
                }}>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "10px",
                    backgroundColor: "#f8f9fa",
                    borderRadius: "8px"
                  }}>
                    <FaTruck style={{ color: "#3498db" }} />
                    <span style={{ fontSize: "14px", color: "#2c3e50" }}>Free Delivery</span>
                  </div>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "10px",
                    backgroundColor: "#f8f9fa",
                    borderRadius: "8px"
                  }}>
                    <FaShieldAlt style={{ color: "#3498db" }} />
                    <span style={{ fontSize: "14px", color: "#2c3e50" }}>Secure Payment</span>
                  </div>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "10px",
                    backgroundColor: "#f8f9fa",
                    borderRadius: "8px"
                  }}>
                    <FaUndo style={{ color: "#3498db" }} />
                    <span style={{ fontSize: "14px", color: "#2c3e50" }}>Easy Returns</span>
                  </div>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "10px",
                    backgroundColor: "#f8f9fa",
                    borderRadius: "8px"
                  }}>
                    <FaCreditCard style={{ color: "#3498db" }} />
                    <span style={{ fontSize: "14px", color: "#2c3e50" }}>Multiple Payment Options</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div style={{
          backgroundColor: "white",
          borderRadius: "12px",
          padding: "30px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          marginBottom: "30px"
        }}>
          <h2 style={{
            fontSize: "24px",
            fontWeight: "600",
            color: "#2c3e50",
            marginBottom: "20px"
          }}>
            Product Description
          </h2>
          <div style={{
            fontSize: "16px",
            lineHeight: "1.6",
            color: "#555"
          }}>
            {product.description || "No description available for this product."}
          </div>
        </div>

        {/* Delivery & Returns Information */}
        <div style={{
          backgroundColor: "white",
          borderRadius: "12px",
          padding: "30px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          marginBottom: "30px"
        }}>
          <h2 style={{
            fontSize: "24px",
            fontWeight: "600",
            color: "#2c3e50",
            marginBottom: "25px"
          }}>
            Delivery & Returns
          </h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "25px"
          }}>
            <div>
              <h3 style={{
                fontSize: "18px",
                fontWeight: "600",
                color: "#2c3e50",
                marginBottom: "15px",
                display: "flex",
                alignItems: "center",
                gap: "10px"
              }}>
                <FaTruck style={{ color: "#3498db" }} />
                Delivery Information
              </h3>
              <ul style={{
                listStyle: "none",
                padding: 0,
                margin: 0
              }}>
                <li style={{
                  padding: "8px 0",
                  borderBottom: "1px solid #f1f3f4",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px"
                }}>
                  <FaCheck style={{ color: "#27ae60", fontSize: "12px" }} />
                  <span>Free delivery on orders over KSH 2,000</span>
                </li>
                <li style={{
                  padding: "8px 0",
                  borderBottom: "1px solid #f1f3f4",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px"
                }}>
                  <FaCheck style={{ color: "#27ae60", fontSize: "12px" }} />
                  <span>Standard delivery: 2-3 business days</span>
                </li>
                <li style={{
                  padding: "8px 0",
                  borderBottom: "1px solid #f1f3f4",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px"
                }}>
                  <FaCheck style={{ color: "#27ae60", fontSize: "12px" }} />
                  <span>Express delivery available</span>
                </li>
                <li style={{
                  padding: "8px 0",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px"
                }}>
                  <FaCheck style={{ color: "#27ae60", fontSize: "12px" }} />
                  <span>Track your order online</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 style={{
                fontSize: "18px",
                fontWeight: "600",
                color: "#2c3e50",
                marginBottom: "15px",
                display: "flex",
                alignItems: "center",
                gap: "10px"
              }}>
                <FaUndo style={{ color: "#3498db" }} />
                Returns & Exchanges
              </h3>
              <ul style={{
                listStyle: "none",
                padding: 0,
                margin: 0
              }}>
                <li style={{
                  padding: "8px 0",
                  borderBottom: "1px solid #f1f3f4",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px"
                }}>
                  <FaCheck style={{ color: "#27ae60", fontSize: "12px" }} />
                  <span>30-day return policy</span>
                </li>
                <li style={{
                  padding: "8px 0",
                  borderBottom: "1px solid #f1f3f4",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px"
                }}>
                  <FaCheck style={{ color: "#27ae60", fontSize: "12px" }} />
                  <span>Free return shipping</span>
                </li>
                <li style={{
                  padding: "8px 0",
                  borderBottom: "1px solid #f1f3f4",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px"
                }}>
                  <FaCheck style={{ color: "#27ae60", fontSize: "12px" }} />
                  <span>Easy online return process</span>
                </li>
                <li style={{
                  padding: "8px 0",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px"
                }}>
                  <FaCheck style={{ color: "#27ae60", fontSize: "12px" }} />
                  <span>Full refund guarantee</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div style={{
            backgroundColor: "white",
            borderRadius: "12px",
            padding: "30px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
          }}>
            <h2 style={{
              fontSize: "24px",
              fontWeight: "600",
              color: "#2c3e50",
              marginBottom: "25px"
            }}>
              Related Products
            </h2>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px"
            }}>
              {relatedProducts.map((relatedProduct) => (
                <div
                  key={relatedProduct._id}
                  onClick={() => navigate(`/product/${relatedProduct._id}`)}
                  style={{
                    border: "1px solid #e1e8ed",
                    borderRadius: "12px",
                    overflow: "hidden",
                    backgroundColor: "white",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)";
                  }}
                >
                  <div style={{
                    width: "100%",
                    height: "200px",
                    backgroundColor: "#f8f9fa",
                    overflow: "hidden"
                  }}>
                    {relatedProduct.images && relatedProduct.images[0] ? (
                      <img
                        src={relatedProduct.images[0].url}
                        alt={relatedProduct.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover"
                        }}
                      />
                    ) : (
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        height: "100%",
                        color: "#aaa",
                        fontSize: "14px"
                      }}>
                        No Image
                      </div>
                    )}
                  </div>
                  <div style={{ padding: "15px" }}>
                    <h3 style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#2c3e50",
                      margin: "0 0 8px 0",
                      lineHeight: "1.3"
                    }}>
                      {relatedProduct.name}
                    </h3>
                    <div style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      color: "#3498db"
                    }}>
                      KSH {relatedProduct.price.toFixed(0)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Success/Error Notifications */}
      {showSuccess && (
        <div style={{
          position: "fixed",
          top: "80px",
          right: "20px",
          backgroundColor: "#27ae60",
          color: "white",
          padding: "12px 20px",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          zIndex: 1000,
          animation: "slideIn 0.3s ease-out"
        }}>
          {message}
        </div>
      )}

      {showError && (
        <div style={{
          position: "fixed",
          top: "80px",
          right: "20px",
          backgroundColor: "#e74c3c",
          color: "white",
          padding: "12px 20px",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          zIndex: 1000,
          animation: "slideIn 0.3s ease-out"
        }}>
          {message}
        </div>
      )}

      <style>
        {`
          @keyframes slideIn {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ProductDetail;
