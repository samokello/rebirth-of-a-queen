import React, { useEffect, useMemo, useState } from "react";
import { API_MAIN } from "../api";
import { 
  FaHeart, FaShoppingCart, FaSearch, FaBars,
  FaHome, FaShoppingBag, FaGift, FaTruck, FaPhone
} from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";
import ProductRating from "../components/ProductRating";
import BootstrapCarousel from "../components/BootstrapCarousel";

const PAGE_SIZE = 12;

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [viewMode, setViewMode] = useState("grid");
  const [favoriteNotification, setFavoriteNotification] = useState({ show: false, message: '', productId: null });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [carouselSlides, setCarouselSlides] = useState([]);
  
  const { addToCart, getCartItemCount, getCartTotal } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const params = useMemo(() => {
    const p = new URLSearchParams();
    p.set("page", String(page));
    p.set("limit", String(PAGE_SIZE));
    if (search) p.set("search", search);
    if (category) p.set("category", category);
    p.set("sortBy", sortBy);
    p.set("sortOrder", sortOrder);
    return p;
  }, [page, search, category, sortBy, sortOrder]);

  useEffect(() => {
    let isMounted = true;
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");
        const { data } = await API_MAIN.get(`/shop/products?${params.toString()}`);
        if (!isMounted) return;
        if (data?.success) {
          setProducts(Array.isArray(data.data) ? data.data : []);
          setTotalPages(data?.pagination?.totalPages || 1);
        } else {
          setError(data?.message || "Failed to load products");
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        setError("Unable to load products. Ensure the API is running and DB is connected.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchProducts();
    return () => {
      isMounted = false;
    };
  }, [params]);

  // Fetch products for carousel
  useEffect(() => {
    const fetchCarouselProducts = async () => {
      try {
        const { data } = await API_MAIN.get('/shop/products?limit=20&sortBy=createdAt&sortOrder=desc');
        if (data?.success && Array.isArray(data.data)) {
          // Filter products with images and take first 5
          const productsWithImages = data.data.filter(product => 
            product.images && product.images.length > 0 && product.images[0].url
          ).slice(0, 5);
          
          // Create carousel slides from product data
          const slides = productsWithImages.map((product, index) => {
            const categories = [
              { value: "leather-bags", label: "Leather Bags", kicker: "Premium Leather" },
              { value: "leather-wallets", label: "Leather Wallets", kicker: "Elegant Wallets" },
              { value: "leather-accessories", label: "Leather Accessories", kicker: "Fine Accessories" },
              { value: "vitenge-clothes", label: "Vitenge Clothes", kicker: "Vibrant Vitenge" },
              { value: "branded-clothes", label: "Branded Clothes", kicker: "Branded Style" },
              { value: "branded-bottles", label: "Branded Bottles", kicker: "Quality Bottles" },
              { value: "aprons", label: "Aprons", kicker: "Professional Aprons" }
            ];
            
            const categoryInfo = categories.find(cat => cat.value === product.category) || 
                                { label: "Premium Products", kicker: "Quality Items" };
            
            return {
              image: product.images[0].url,
              alt: product.images[0].alt || product.name,
              kicker: categoryInfo.kicker,
              title: product.name,
              subtitle: product.description ? 
                (product.description.length > 120 ? 
                  product.description.substring(0, 120) + '...' : 
                  product.description) : 
                `Discover our premium ${categoryInfo.label.toLowerCase()}`,
              buttonText: "Shop Now",
              buttonHref: `/product/${product._id}`
            };
          });
          
          setCarouselSlides(slides);
        }
      } catch (err) {
        console.error('Error fetching carousel products:', err);
        // Fallback slides
        setCarouselSlides([
          {
            image: "/slides/slide-1.jpg",
            kicker: "New Arrivals",
            title: "Handcrafted Leather Collection",
            subtitle: "Premium quality leather goods made with care and purpose.",
            buttonText: "Shop Leather",
            buttonHref: "#leather-bags"
          }
        ]);
      }
    };
    
    fetchCarouselProducts();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
  };

  const handleRatingSubmit = async (rating, productId) => {
    try {
      const response = await API_MAIN.post(`/shop/products/${productId}/rate`, { rating });
      if (response.data?.success) {
        setProducts(prevProducts => 
          prevProducts.map(product => 
            product._id === productId 
              ? { ...product, rating: response.data.data.rating }
              : product
          )
        );
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error submitting rating:', error);
      return false;
    }
  };

  const handleToggleFavorite = async (product) => {
    const wasFavorite = isFavorite(product._id);
    try {
      await toggleFavorite(product);
      const message = wasFavorite ? 'Removed from favorites' : 'Added to favorites';
      setFavoriteNotification({ show: true, message, productId: product._id });
      setTimeout(() => {
        setFavoriteNotification(prev => prev.productId === product._id ? { show: false, message: '', productId: null } : prev);
      }, 2000);
    } catch (error) {
      console.error('Error toggling favorite:', error);
      setFavoriteNotification({ 
        show: true, 
        message: 'Failed to update favorites. Please try again.', 
        productId: product._id 
      });
      setTimeout(() => {
        setFavoriteNotification(prev => prev.productId === product._id ? { show: false, message: '', productId: null } : prev);
      }, 3000);
    }
  };

  const calculateDiscount = (originalPrice, currentPrice) => {
    if (!originalPrice || originalPrice <= currentPrice) return 0;
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  };

  const getProductBadges = (product) => {
    const badges = [];
    if (product.onOffer && product.originalPrice) {
      badges.push({ type: 'offer', text: `${calculateDiscount(product.originalPrice, product.price)}% OFF`, color: '#e74c3c' });
    }
    if (product.isOnSale) {
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
        borderRadius: '12px',
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
          height: '220px',
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
                  letterSpacing: '0.3px'
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
                  fontSize: '11px',
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
              backgroundColor: isOutOfStock ? '#bdc3c7' : '#3498db',
              color: 'white',
              fontWeight: '600',
              cursor: isOutOfStock ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              fontSize: '14px'
            }}
            onMouseEnter={(e) => {
              if (!isOutOfStock) e.target.style.backgroundColor = '#2980b9';
            }}
            onMouseLeave={(e) => {
              if (!isOutOfStock) e.target.style.backgroundColor = '#3498db';
            }}
          >
            <FaShoppingCart />
            {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
    );
  };

  const categories = [
    { value: "", label: "All Categories", icon: FaHome },
    { value: "leather-bags", label: "Leather Bags", icon: FaShoppingBag },
    { value: "leather-wallets", label: "Leather Wallets", icon: FaShoppingBag },
    { value: "leather-accessories", label: "Leather Accessories", icon: FaGift },
    { value: "vitenge-clothes", label: "Vitenge Clothes", icon: FaShoppingBag },
    { value: "branded-clothes", label: "Branded Clothes", icon: FaShoppingBag },
    { value: "branded-bottles", label: "Branded Bottles", icon: FaGift },
    { value: "aprons", label: "Aprons", icon: FaShoppingBag },
    { value: "other", label: "Other", icon: FaGift }
  ];

  return (
    <>
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
        `}
      </style>
      
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
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{
                background: "none",
                border: "none",
                color: "white",
                fontSize: "20px",
                cursor: "pointer",
                padding: "8px"
              }}
            >
              <FaBars />
            </button>
            <h1 style={{ margin: 0, fontSize: "24px", fontWeight: "700" }}>Rebirth Shop</h1>
          </div>
          
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px" }}>
              <FaTruck style={{ color: "#3498db" }} />
              <span>Free Delivery</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px" }}>
              <FaPhone style={{ color: "#3498db" }} />
              <span>+254 720339204</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
        {/* Sidebar */}
        <div style={{
          width: sidebarOpen ? "280px" : "0",
          backgroundColor: "white",
          borderRight: "1px solid #e1e8ed",
          transition: "width 0.3s ease",
          overflow: "hidden",
          position: "fixed",
          left: 0,
          top: "60px",
          height: "calc(100vh - 60px)",
          zIndex: 999,
          boxShadow: sidebarOpen ? "2px 0 10px rgba(0,0,0,0.1)" : "none"
        }}>
          <div style={{ padding: "20px" }}>
            <h3 style={{ marginBottom: "20px", color: "#2c3e50", fontSize: "18px", fontWeight: "600" }}>Categories</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {categories.map((cat) => {
                const IconComponent = cat.icon;
                return (
                  <button
                    key={cat.value}
                    onClick={() => { setCategory(cat.value); setPage(1); }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "12px 16px",
                      border: "none",
                      backgroundColor: category === cat.value ? "#3498db" : "transparent",
                      color: category === cat.value ? "white" : "#2c3e50",
                      borderRadius: "8px",
                      cursor: "pointer",
                      textAlign: "left",
                      fontSize: "14px",
                      fontWeight: "500",
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
                    <IconComponent />
                    {cat.label}
                  </button>
                );
              })}
            </div>

            <div style={{ marginTop: "30px" }}>
              <h4 style={{ marginBottom: "15px", color: "#2c3e50", fontSize: "16px", fontWeight: "600" }}>Price Range</h4>
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <input
                  type="number"
                  placeholder="Min"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange({...priceRange, min: e.target.value})}
                  style={{
                    padding: "8px 12px",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    fontSize: "14px",
                    width: "80px"
                  }}
                />
                <span style={{ color: "#666" }}>to</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({...priceRange, max: e.target.value})}
                  style={{
                    padding: "8px 12px",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    fontSize: "14px",
                    width: "80px"
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ 
          flex: 1, 
          marginLeft: sidebarOpen ? "280px" : "0",
          transition: "margin-left 0.3s ease",
          padding: "20px",
          position: "relative",
          zIndex: 0
        }}>
          {/* Search and Filter Bar */}
          <div style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "12px",
            marginBottom: "20px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
          }}>
            <div style={{ display: "flex", gap: "15px", alignItems: "center", flexWrap: "wrap" }}>
              <form onSubmit={handleSearchSubmit} style={{ display: "flex", flex: 1, minWidth: "300px" }}>
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
                      borderRadius: "8px",
                      fontSize: "16px",
                      outline: "none",
                      transition: "border-color 0.2s ease"
                    }}
                    onFocus={(e) => e.target.style.borderColor = "#3498db"}
                    onBlur={(e) => e.target.style.borderColor = "#e1e8ed"}
                  />
                  <FaSearch style={{
                    position: "absolute",
                    left: "15px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#666",
                    fontSize: "16px"
                  }} />
                </div>
                <button
                  type="submit"
                  style={{
                    padding: "12px 24px",
                    backgroundColor: "#3498db",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    fontWeight: "600",
                    cursor: "pointer",
                    marginLeft: "10px",
                    transition: "background-color 0.2s ease"
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = "#2980b9"}
                  onMouseLeave={(e) => e.target.style.backgroundColor = "#3498db"}
                >
                  Search
                </button>
              </form>

              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{
                    padding: "12px 16px",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    fontSize: "14px",
                    backgroundColor: "white"
                  }}
                >
                  <option value="createdAt">Newest First</option>
                  <option value="price">Price</option>
                  <option value="name">Name</option>
                  <option value="rating">Rating</option>
                </select>

                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  style={{
                    padding: "12px 16px",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    fontSize: "14px",
                    backgroundColor: "white"
                  }}
                >
                  <option value="desc">High to Low</option>
                  <option value="asc">Low to High</option>
                </select>

                <div style={{ display: "flex", border: "1px solid #ddd", borderRadius: "8px", overflow: "hidden" }}>
                  <button
                    onClick={() => setViewMode("grid")}
                    style={{
                      padding: "12px 16px",
                      border: "none",
                      backgroundColor: viewMode === "grid" ? "#3498db" : "white",
                      color: viewMode === "grid" ? "white" : "#666",
                      cursor: "pointer",
                      transition: "all 0.2s ease"
                    }}
                  >
                    Grid
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    style={{
                      padding: "12px 16px",
                      border: "none",
                      backgroundColor: viewMode === "list" ? "#3498db" : "white",
                      color: viewMode === "list" ? "white" : "#666",
                      cursor: "pointer",
                      transition: "all 0.2s ease"
                    }}
                  >
                    List
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bootstrap Carousel */}
          <BootstrapCarousel
            height={500}
            slides={carouselSlides}
          />

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
                  ? "repeat(auto-fill, minmax(280px, 1fr))" 
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
              
              <span style={{ 
                padding: "12px 20px",
                backgroundColor: "#3498db",
                color: "white",
                borderRadius: "8px",
                fontWeight: "600"
              }}>
                Page {page} of {totalPages}
              </span>
              
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

          {/* Cart Summary */}
          {getCartItemCount() > 0 && (
            <div style={{
              position: "fixed",
              bottom: "20px",
              right: "20px",
              backgroundColor: "#2c3e50",
              color: "white",
              padding: "16px 20px",
              borderRadius: "12px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
              zIndex: 1000,
              cursor: "pointer"
            }}
            onClick={() => window.location.href = "/cart"}
            >
              <div style={{ marginBottom: "8px", fontWeight: "600", display: "flex", alignItems: "center", gap: "8px" }}>
                <FaShoppingCart />
                Cart ({getCartItemCount()} items)
              </div>
              <div style={{ fontSize: "14px", opacity: 0.9 }}>
                Total: KSH {(getCartTotal() || 0).toFixed(0)}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Shop;