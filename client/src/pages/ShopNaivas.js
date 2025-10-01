import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaHeart, FaShoppingCart, FaSearch, FaBars, FaTimes
} from 'react-icons/fa';
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";
import { API_MAIN } from '../api';
import ProductRating from '../components/ProductRating';

const ShopNaivas = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');
  const [viewMode, setViewMode] = useState('grid');
  const [favoriteNotification, setFavoriteNotification] = useState({ show: false, message: '', productId: null });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const { addToCart, getCartItemCount } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const PAGE_SIZE = 12;

  const categories = [
    { value: 'leather-bags', label: 'Leather Bags' },
    { value: 'vitenge-clothes', label: 'Vitenge Clothes' },
    { value: 'leather-accessories', label: 'Leather Accessories' },
    { value: 'branded-items', label: 'Branded Items' }
  ];

  const params = useMemo(() => {
    const p = new URLSearchParams();
    p.set("page", String(page));
    p.set("limit", String(PAGE_SIZE));
    if (search) p.set("search", search);
    if (category) p.set("category", category);
    if (priceRange.min) p.set("minPrice", priceRange.min);
    if (priceRange.max) p.set("maxPrice", priceRange.max);
    p.set("sort", sortOrder);
    return p;
  }, [page, search, category, priceRange, sortOrder]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await API_MAIN.get(`/shop/products?${params}`);
        if (data?.success) {
          setProducts(data.data || []);
          setTotalPages(Math.ceil((data.total || 0) / PAGE_SIZE));
        } else {
          setError('Failed to load products');
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [params]);


  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
  };

  const handleToggleFavorite = async (product) => {
    try {
      const wasFavorite = isFavorite(product._id);
      await toggleFavorite(product);
      setFavoriteNotification({
        show: true,
        message: wasFavorite ? 'Removed from favorites' : 'Added to favorites',
        productId: product._id
      });
      setTimeout(() => {
        setFavoriteNotification({ show: false, message: '', productId: null });
      }, 2000);
    } catch (error) {
      console.error('Error toggling favorite:', error);
      setFavoriteNotification({
        show: true,
        message: 'Failed to update favorites. Please try again.',
        productId: null
      });
      setTimeout(() => {
        setFavoriteNotification({ show: false, message: '', productId: null });
      }, 3000);
    }
  };

  const handleRatingSubmit = async (productId, rating) => {
    try {
      await API_MAIN.post(`/shop/products/${productId}/rating`, { rating });
      // Refresh products to show updated rating
      const { data } = await API_MAIN.get(`/shop/products?${params}`);
      if (data?.success) {
        setProducts(data.data || []);
      }
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  const calculateDiscount = (originalPrice, currentPrice) => {
    if (!originalPrice || originalPrice <= currentPrice) return 0;
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  };

  const getProductBadges = (product) => {
    const badges = [];
    if (product.onOffer) {
      badges.push({ type: 'sale', text: 'On Sale', color: '#f39c12' });
    }
    if (product.isFeatured) {
      badges.push({ type: 'featured', text: 'Featured', color: '#f39c12' });
    }
    if (product.isHotThisMonth) {
      badges.push({ type: 'hot', text: 'Hot This Month', color: '#e74c3c' });
    }
    if (product.stock <= 5 && product.stock > 0) {
      badges.push({ type: 'low-stock', text: 'Low Stock', color: '#f39c12' });
    }
    if (product.stock === 0) {
      badges.push({ type: 'out-of-stock', text: 'Out of Stock', color: '#95a5a6' });
    }
    return badges;
  };

  const ProductCard = ({ product }) => {
    const badges = getProductBadges(product);
    const discount = calculateDiscount(product.originalPrice, product.price);
    const isOutOfStock = product.stock === 0;
    const goToDetail = () => {
      window.location.href = `/product/${product._id}`;
    };

    return (
      <div className="product-card" style={{
        border: '1px solid #e1e8ed',
        borderRadius: '8px',
        overflow: 'hidden',
        backgroundColor: 'white',
        transition: 'all 0.3s ease',
        position: 'relative',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        cursor: 'pointer'
      }}
      onClick={goToDetail}
      >
        <div style={{ 
          position: 'relative', 
          width: '100%',
          height: '200px',
          background: '#f8f9fa',
          overflow: 'hidden'
        }}>
          {product?.images?.[0]?.url ? (
            <img
              src={product.images[0].url}
              alt={product.images[0]?.alt || product.name}
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover',
                objectPosition: 'center',
                transition: 'transform 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            />
          ) : (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              width: '100%',
              height: '100%',
              color: '#aaa',
              fontSize: '14px'
            }}>
              No Image Available
            </div>
          )}

          <div style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <button
              onClick={(e) => { e.stopPropagation(); handleToggleFavorite(product); }}
              data-product-id={product._id}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                border: 'none',
                backgroundColor: isFavorite(product._id) ? '#e74c3c' : 'rgba(255,255,255,0.95)',
                color: isFavorite(product._id) ? 'white' : '#666',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
              }}
            >
              <FaHeart />
            </button>
          </div>

          <div style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px'
          }}>
            {badges.map((badge, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: badge.color,
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '10px',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
              >
                {badge.text}
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: '16px' }}>
          <div style={{
            fontSize: '11px',
            color: '#666',
            textTransform: 'uppercase',
            letterSpacing: '0.3px',
            marginBottom: '8px'
          }}>
            {product.category?.replace('-', ' ')}
          </div>

          <h3 style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 8px 0',
            color: '#2c3e50',
            lineHeight: '1.3',
            height: '40px',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical'
          }}>
            {product.name}
          </h3>

          <ProductRating
            currentRating={product.rating?.average || 0}
            totalRatings={product.rating?.count || 0}
            onRatingSubmit={handleRatingSubmit}
            productId={product._id}
            readonly={false}
          />

          <div style={{ marginBottom: '12px' }}>
            {product.onOffer && product.originalPrice ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#e74c3c'
                }}>
                  KSH {(product.price || 0).toFixed(0)}
                </span>
                <span style={{
                  fontSize: '14px',
                  color: '#666',
                  textDecoration: 'line-through'
                }}>
                  KSH {(product.originalPrice || 0).toFixed(0)}
                </span>
                <span style={{
                  fontSize: '12px',
                  backgroundColor: '#e74c3c',
                  color: 'white',
                  padding: '2px 6px',
                  borderRadius: '8px',
                  fontWeight: 'bold'
                }}>
                  -{discount}%
                </span>
              </div>
            ) : (
              <span style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#2c3e50'
              }}>
                KSH {(product.price || 0).toFixed(0)}
              </span>
            )}
          </div>

          <div style={{
            fontSize: '12px',
            color: product.stock > 0 ? '#27ae60' : '#e74c3c',
            marginBottom: '12px',
            fontWeight: '500'
          }}>
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); addToCart(product); }}
            disabled={isOutOfStock}
            style={{
              width: '100%',
              padding: '12px',
              border: 'none',
              borderRadius: '8px',
              backgroundColor: isOutOfStock ? '#bdc3c7' : '#e74c3c',
              color: 'white',
              fontWeight: '600',
              cursor: isOutOfStock ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              fontSize: '14px'
            }}
            onMouseEnter={(e) => {
              if (!isOutOfStock) e.target.style.backgroundColor = '#c0392b';
            }}
            onMouseLeave={(e) => {
              if (!isOutOfStock) e.target.style.backgroundColor = '#e74c3c';
            }}
          >
            <FaShoppingCart />
            {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      {/* Naivas-style Header */}
      <div style={{
        backgroundColor: "white",
        borderBottom: "1px solid #e1e8ed",
        padding: "12px 0",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "15px" }}>
            {/* Logo and Navigation */}
            <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#2c3e50",
                    fontSize: "18px",
                    cursor: "pointer",
                    padding: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <FaBars />
                </button>
                <h1 style={{ margin: 0, fontSize: "24px", fontWeight: "700", color: "#2c3e50" }}>Rebirth Shop</h1>
              </div>
              
              {/* Category Navigation */}
              <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                {categories.slice(0, 4).map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => { setCategory(cat.value); setPage(1); }}
                    style={{
                      background: "none",
                      border: "none",
                      color: category === cat.value ? "#e74c3c" : "#2c3e50",
                      fontSize: "14px",
                      fontWeight: "600",
                      cursor: "pointer",
                      padding: "8px 12px",
                      borderRadius: "4px",
                      transition: "all 0.2s ease"
                    }}
                    onMouseEnter={(e) => {
                      if (category !== cat.value) {
                        e.target.style.backgroundColor = "#f8f9fa";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (category !== cat.value) {
                        e.target.style.backgroundColor = "transparent";
                      }
                    }}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Bar */}
            <div style={{ flex: 1, maxWidth: "400px", minWidth: "250px" }}>
              <form onSubmit={handleSearchSubmit} style={{ display: "flex", width: "100%" }}>
                <div style={{ position: "relative", flex: 1 }}>
                  <input
                    type="text"
                    placeholder="Search for products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "12px 16px 12px 45px",
                      border: "2px solid #e1e8ed",
                      borderRadius: "25px",
                      fontSize: "14px",
                      outline: "none",
                      transition: "border-color 0.2s ease"
                    }}
                    onFocus={(e) => e.target.style.borderColor = "#e74c3c"}
                    onBlur={(e) => e.target.style.borderColor = "#e1e8ed"}
                  />
                  <FaSearch style={{
                    position: "absolute",
                    left: "15px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#666",
                    fontSize: "14px"
                  }} />
                </div>
              </form>
            </div>

            {/* Cart and User Actions */}
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <button
                onClick={() => navigate('/favorites')}
                style={{
                  background: "none",
                  border: "none",
                  color: "#2c3e50",
                  fontSize: "16px",
                  cursor: "pointer",
                  padding: "8px",
                  borderRadius: "4px",
                  transition: "background-color 0.2s ease"
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = "#f8f9fa"}
                onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
              >
                <FaHeart />
              </button>
              <button
                onClick={() => navigate('/cart')}
                style={{
                  background: "#e74c3c",
                  border: "none",
                  color: "white",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                  padding: "10px 16px",
                  borderRadius: "20px",
                  transition: "background-color 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px"
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = "#c0392b"}
                onMouseLeave={(e) => e.target.style.backgroundColor = "#e74c3c"}
              >
                <FaShoppingCart />
                Cart ({getCartItemCount()})
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px", display: "flex", gap: "20px" }}>
        {/* Sidebar Filters */}
        <div style={{
          width: sidebarOpen ? "250px" : "0",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          transition: "width 0.3s ease",
          overflow: "hidden",
          height: "fit-content",
          position: "sticky",
          top: "100px"
        }}>
          {sidebarOpen && (
            <div style={{ padding: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h3 style={{ margin: 0, color: "#2c3e50", fontSize: "16px", fontWeight: "600" }}>Filters</h3>
                <button
                  onClick={() => setSidebarOpen(false)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#95a5a6",
                    fontSize: "16px",
                    cursor: "pointer",
                    padding: "4px"
                  }}
                >
                  <FaTimes />
                </button>
              </div>

              {/* Categories */}
              <div style={{ marginBottom: "25px" }}>
                <h4 style={{ margin: "0 0 12px 0", color: "#2c3e50", fontSize: "14px", fontWeight: "600" }}>Categories</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <button
                    onClick={() => { setCategory(""); setPage(1); }}
                    style={{
                      padding: "8px 12px",
                      borderRadius: "4px",
                      border: "none",
                      background: category === "" ? "#e74c3c" : "transparent",
                      color: category === "" ? "white" : "#2c3e50",
                      textAlign: "left",
                      fontSize: "13px",
                      cursor: "pointer",
                      transition: "all 0.2s ease"
                    }}
                  >
                    All Products
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => { setCategory(cat.value); setPage(1); }}
                      style={{
                        padding: "8px 12px",
                        borderRadius: "4px",
                        border: "none",
                        background: category === cat.value ? "#e74c3c" : "transparent",
                        color: category === cat.value ? "white" : "#2c3e50",
                        textAlign: "left",
                        fontSize: "13px",
                        cursor: "pointer",
                        transition: "all 0.2s ease"
                      }}
                      onMouseEnter={(e) => {
                        if (category !== cat.value) {
                          e.target.style.backgroundColor = "#f8f9fa";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (category !== cat.value) {
                          e.target.style.backgroundColor = "transparent";
                        }
                      }}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div style={{ marginBottom: "25px" }}>
                <h4 style={{ margin: "0 0 12px 0", color: "#2c3e50", fontSize: "14px", fontWeight: "600" }}>Price Range</h4>
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange({...priceRange, min: e.target.value})}
                    style={{
                      flex: 1,
                      padding: "8px 10px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      fontSize: "12px",
                      outline: "none"
                    }}
                  />
                  <span style={{ color: "#666", fontSize: "12px" }}>to</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({...priceRange, max: e.target.value})}
                    style={{
                      flex: 1,
                      padding: "8px 10px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      fontSize: "12px",
                      outline: "none"
                    }}
                  />
                </div>
                <button
                  onClick={() => {
                    setPriceRange({ min: '', max: '' });
                    setPage(1);
                  }}
                  style={{
                    marginTop: "10px",
                    background: "#e74c3c",
                    color: "white",
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "12px",
                    fontWeight: "600",
                    width: "100%"
                  }}
                >
                  Apply Filter
                </button>
              </div>

              {/* Sort Options */}
              <div>
                <h4 style={{ margin: "0 0 12px 0", color: "#2c3e50", fontSize: "14px", fontWeight: "600" }}>Sort By</h4>
                <select
                  value={sortOrder}
                  onChange={(e) => {
                    setSortOrder(e.target.value);
                    setPage(1);
                  }}
                  style={{
                    width: "100%",
                    padding: "8px 10px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    fontSize: "12px",
                    outline: "none",
                    backgroundColor: "white"
                  }}
                >
                  <option value="desc">Price: High to Low</option>
                  <option value="asc">Price: Low to High</option>
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Products Section */}
        <div style={{ flex: 1 }}>
          {/* Results Header */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
            padding: "15px 20px",
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
          }}>
            <div>
              <h2 style={{ margin: 0, fontSize: "18px", fontWeight: "600", color: "#2c3e50" }}>
                {category ? categories.find(c => c.value === category)?.label : 'All Products'}
              </h2>
              <p style={{ margin: "5px 0 0 0", fontSize: "14px", color: "#666" }}>
                {products.length} products found
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <button
                onClick={() => setViewMode("grid")}
                style={{
                  padding: "8px 12px",
                  border: "1px solid #ddd",
                  background: viewMode === "grid" ? "#e74c3c" : "white",
                  color: viewMode === "grid" ? "white" : "#2c3e50",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "12px"
                }}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode("list")}
                style={{
                  padding: "8px 12px",
                  border: "1px solid #ddd",
                  background: viewMode === "list" ? "#e74c3c" : "white",
                  color: viewMode === "list" ? "white" : "#2c3e50",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "12px"
                }}
              >
                List
              </button>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div style={{
              textAlign: "center",
              padding: "60px",
              fontSize: "18px",
              color: "#7f8c8d"
            }}>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>🛍️</div>
              Loading products...
            </div>
          )}
          
          {/* Error State */}
          {!!error && (
            <div style={{ 
              color: "#e74c3c", 
              marginBottom: "16px",
              padding: "16px",
              backgroundColor: "#fdf2f2",
              borderRadius: "8px",
              border: "1px solid #fecaca"
            }}>
              {error}
            </div>
          )}

          {/* Products Grid */}
          {!loading && !error && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: viewMode === "grid" 
                  ? "repeat(auto-fill, minmax(250px, 1fr))" 
                  : "1fr",
                gap: "20px",
                animation: "fadeIn 0.5s ease-out"
              }}
            >
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && products.length === 0 && (
            <div style={{
              textAlign: "center",
              padding: "60px 20px",
              color: "#7f8c8d"
            }}>
              <div style={{ fontSize: "64px", marginBottom: "20px" }}>🛍️</div>
              <h3 style={{ marginBottom: "12px", color: "#2c3e50", fontSize: "24px" }}>No products found</h3>
              <p style={{ fontSize: "16px" }}>Try adjusting your search or filter criteria</p>
            </div>
          )}

          {/* Pagination */}
          {!loading && !error && totalPages > 1 && (
            <div style={{ 
              display: "flex", 
              gap: "8px", 
              marginTop: "40px", 
              alignItems: "center",
              justifyContent: "center"
            }}>
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                style={{ 
                  padding: "12px 20px",
                  border: "1px solid #ddd",
                  backgroundColor: page <= 1 ? "#f8f9fa" : "white",
                  color: page <= 1 ? "#bdc3c7" : "#2c3e50",
                  borderRadius: "8px",
                  cursor: page <= 1 ? "not-allowed" : "pointer",
                  fontWeight: "600",
                  transition: "all 0.2s ease"
                }}
              >
                Previous
              </button>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    style={{
                      padding: "12px 16px",
                      border: "1px solid #ddd",
                      backgroundColor: page === pageNum ? "#e74c3c" : "white",
                      color: page === pageNum ? "white" : "#2c3e50",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontWeight: "600",
                      transition: "all 0.2s ease"
                    }}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              <button
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                style={{ 
                  padding: "12px 20px",
                  border: "1px solid #ddd",
                  backgroundColor: page >= totalPages ? "#f8f9fa" : "white",
                  color: page >= totalPages ? "#bdc3c7" : "#2c3e50",
                  borderRadius: "8px",
                  cursor: page >= totalPages ? "not-allowed" : "pointer",
                  fontWeight: "600",
                  transition: "all 0.2s ease"
                }}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Favorite Notification */}
      {favoriteNotification.show && (
        <div style={{
          position: 'fixed',
          top: '80px',
          right: '20px',
          backgroundColor: '#27ae60',
          color: 'white',
          padding: '12px 20px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          zIndex: 1000,
          animation: 'slideIn 0.3s ease-out'
        }}>
          {favoriteNotification.message}
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
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .product-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
          }
          
          @media (max-width: 768px) {
            .main-content {
              margin-left: 0 !important;
            }
            .sidebar {
              width: 100vw !important;
              top: 0 !important;
              height: 100vh !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ShopNaivas;
