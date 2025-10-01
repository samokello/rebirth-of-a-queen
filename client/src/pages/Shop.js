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
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [carouselSlides, setCarouselSlides] = useState([]);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
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

  // Countdown timer for promotion
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const endTime = new Date().getTime() + (7 * 24 * 60 * 60 * 1000); // 7 days from now
      const difference = endTime - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
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
          height: '140px',
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

        <div style={{ padding: '12px' }}>
          <div style={{
            fontSize: '10px',
            color: '#666',
            textTransform: 'uppercase',
            letterSpacing: '0.3px',
            marginBottom: '6px'
          }}>
            {product.category?.replace('-', ' ')}
          </div>

          <h3 style={{
            fontSize: '14px',
            fontWeight: '600',
            margin: '0 0 6px 0',
            color: '#2c3e50',
            lineHeight: '1.3',
            height: '32px',
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
                  fontSize: '16px',
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
                fontSize: '16px',
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
              padding: '8px',
              border: 'none',
              borderRadius: '6px',
              backgroundColor: isOutOfStock ? '#bdc3c7' : '#3498db',
              color: 'white',
              fontWeight: '600',
              cursor: isOutOfStock ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              fontSize: '12px'
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
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          
          @keyframes pulse {
            0%, 100% { opacity: 0.9; }
            50% { opacity: 1; }
          }
          
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            60% { transform: translateY(-5px); }
          }
          
          @keyframes slideInUp {
            0% {
              opacity: 0;
              transform: translateY(30px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes rotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
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
          @media (min-width: 769px) {
            .sidebar {
              position: relative !important;
              top: auto !important;
              height: auto !important;
              width: 240px !important;
              max-height: calc(100vh - 200px) !important;
            }
            .main-content {
              margin-left: 240px !important;
            }
          }
        `}
      </style>
      
      {/* Shop Header */}
      <div style={{
        backgroundColor: "#2c3e50",
        color: "white",
        padding: "20px 0",
        textAlign: "center",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
          <h1 style={{ margin: 0, fontSize: "32px", fontWeight: "700", marginBottom: "10px" }}>Rebirth Shop</h1>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "30px", flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "16px" }}>
              <FaTruck style={{ color: "#3498db" }} />
              <span>Free Delivery</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "16px" }}>
              <FaPhone style={{ color: "#3498db" }} />
              <span>+254 720339204</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
        {/* Sidebar Toggle Button - Mobile Only */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{
            position: "fixed",
            top: "20px",
            left: "20px",
            zIndex: 1001,
            background: "#3498db",
            border: "none",
            color: "white",
            fontSize: "20px",
            cursor: "pointer",
            padding: "12px",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            display: window.innerWidth <= 768 ? "flex" : "none",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <FaBars />
        </button>

        {/* Backdrop Overlay for Mobile */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 998,
              display: window.innerWidth <= 768 ? "block" : "none"
            }}
          />
        )}

        {/* Sidebar - Contained within shop page */}
        <div className="sidebar" style={{
          width: sidebarOpen ? "240px" : "0",
          backgroundColor: "white",
          borderRight: "1px solid #e1e8ed",
          transition: "width 0.3s ease",
          overflow: "hidden",
          position: "relative",
          zIndex: 1,
          boxShadow: sidebarOpen ? "2px 0 8px rgba(0,0,0,0.05)" : "none",
          overflowY: "auto",
          maxHeight: "calc(100vh - 200px)"
        }}>
          <div style={{ padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ margin: 0, color: "#2c3e50", fontSize: "16px", fontWeight: "600" }}>Filters</h3>
              <button
                onClick={() => setSidebarOpen(false)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#95a5a6",
                  fontSize: "18px",
                  cursor: "pointer",
                  padding: "4px",
                  display: window.innerWidth <= 768 ? "block" : "none"
                }}
              >
                ×
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {categories.map((cat) => (
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
                  {cat.label}
                </button>
              ))}
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
        <div className="main-content" style={{ 
          flex: 1, 
          marginLeft: sidebarOpen ? "240px" : "0",
          transition: "margin-left 0.3s ease",
          padding: "20px",
          position: "relative",
          zIndex: 0,
          minHeight: "100vh",
          marginTop: "0"
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



          {/* Fancy Promotion Section with Products */}
          <div style={{
            margin: "30px 0",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            borderRadius: "20px",
            padding: "40px",
            color: "white",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
          }}>
            {/* Animated Background Elements */}
            <div style={{
              position: "absolute",
              top: "-50px",
              right: "-50px",
              width: "200px",
              height: "200px",
              background: "rgba(255,255,255,0.1)",
              borderRadius: "50%",
              zIndex: 1,
              animation: "float 6s ease-in-out infinite"
            }} />
            <div style={{
              position: "absolute",
              bottom: "-30px",
              left: "-30px",
              width: "150px",
              height: "150px",
              background: "rgba(255,255,255,0.05)",
              borderRadius: "50%",
              zIndex: 1,
              animation: "float 8s ease-in-out infinite reverse"
            }} />
            
            <div style={{ position: "relative", zIndex: 2 }}>
              {/* Header Section */}
              <div style={{ textAlign: "center", marginBottom: "40px" }}>
                <div style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                  opacity: 0.9,
                  marginBottom: "10px",
                  animation: "pulse 2s infinite"
                }}>
                  🔥 Limited Time Offer
                </div>
                <h2 style={{
                  fontSize: "3rem",
                  fontWeight: "700",
                  margin: "0 0 15px 0",
                  lineHeight: "1.2",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.3)"
                }}>
                  Up to 50% OFF
                </h2>
                <p style={{
                  fontSize: "1.2rem",
                  opacity: 0.9,
                  marginBottom: "20px",
                  lineHeight: "1.5"
                }}>
                  Don't miss out on our biggest sale of the year! Premium leather goods, 
                  vitenge clothes, and branded items at unbeatable prices.
                </p>
                
                {/* Countdown Timer */}
                <div style={{
                  display: "flex",
                  gap: "15px",
                  marginBottom: "30px",
                  flexWrap: "wrap",
                  justifyContent: "center"
                }}>
                  {[
                    { value: timeLeft.days, label: "Days" },
                    { value: timeLeft.hours, label: "Hours" },
                    { value: timeLeft.minutes, label: "Mins" },
                    { value: timeLeft.seconds, label: "Secs" }
                  ].map((item, index) => (
                    <div key={index} style={{
                      background: "rgba(255,255,255,0.2)",
                      padding: "15px 20px",
                      borderRadius: "15px",
                      textAlign: "center",
                      minWidth: "80px",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255,255,255,0.3)",
                      animation: `bounce 2s infinite ${index * 0.2}s`
                    }}>
                      <div style={{ fontSize: "2rem", fontWeight: "700" }}>{item.value}</div>
                      <div style={{ fontSize: "12px", opacity: 0.8 }}>{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Promotional Products Grid */}
<div style={{
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "25px",
  marginBottom: "30px"
}}>
  {products.length > 0 ? products.slice(0, 3).map((product, index) => (
    <div key={product._id} style={{
      background: "rgba(255,255,255,0.1)",
      borderRadius: "20px",
      padding: "25px",
      textAlign: "center",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(255,255,255,0.2)",
      transition: "all 0.3s ease",
      animation: `slideInUp 0.8s ease-out ${index * 0.2}s both`,
      cursor: "pointer",
      position: "relative",
      overflow: "hidden"
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "translateY(-10px) scale(1.02)";
      e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.25)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "translateY(0) scale(1)";
      e.currentTarget.style.boxShadow = "none";
    }}
    onClick={() => {
      setCategory("");
      setSearch(product.name);
      setPage(1);
    }}
    >
      {/* Ribbon Badge */}
      <div style={{
        position: "absolute",
        top: "15px",
        left: "-30px",
        background: "#ff4757",
        color: "white",
        padding: "5px 40px",
        transform: "rotate(-45deg)",
        fontSize: "12px",
        fontWeight: "bold"
      }}>
        Hot Deal
      </div>

      {/* Product Image / Emoji */}
      <div style={{
        width: "120px",
        height: "120px",
        background: "rgba(255,255,255,0.2)",
        borderRadius: "15px",
        margin: "0 auto 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden"
      }}>
        {product?.images?.[0]?.url ? (
          <img
            src={product.images[0].url}
            alt={product.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }}
          />
        ) : (
          <span style={{ fontSize: "3rem" }}>
            {product.category === 'leather-bags' ? '🎒' : 
             product.category === 'vitenge-clothes' ? '👕' : 
             product.category === 'leather-accessories' ? '💼' : '🛍️'}
          </span>
        )}
      </div>

      {/* Product Name */}
      <h3 style={{
        fontSize: "1.2rem",
        fontWeight: "600",
        margin: "0 0 10px 0",
        color: "white",
        lineHeight: "1.3"
      }}>
        {product.name}
      </h3>

      {/* Price & Discount */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        marginBottom: "15px"
      }}>
        <span style={{
          fontSize: "1rem",
          textDecoration: "line-through",
          opacity: 0.7
        }}>
          KSh {Math.round(product.price * 1.5)}
        </span>
        <span style={{
          fontSize: "1.3rem",
          fontWeight: "700",
          color: "#ffeb3b"
        }}>
          KSh {product.price}
        </span>
      </div>

      {/* Discount Badge */}
      <div style={{
        background: "rgba(255,235,59,0.2)",
        color: "#ffeb3b",
        padding: "6px 14px",
        borderRadius: "20px",
        fontSize: "13px",
        fontWeight: "600",
        display: "inline-block",
        marginBottom: "15px",
        animation: "pulse 2s infinite"
      }}>
        Save {Math.round((1 - product.price / (product.price * 1.5)) * 100)}%
      </div>

      {/* CTA Button */}
      <button style={{
        background: "white",
        color: "#ff4757",
        border: "none",
        padding: "12px 24px",
        borderRadius: "25px",
        fontSize: "14px",
        fontWeight: "600",
        cursor: "pointer",
        transition: "all 0.3s ease",
        width: "100%"
      }}
      onMouseEnter={(e) => {
        e.target.style.background = "#ffeb3b";
        e.target.style.color = "#333";
      }}
      onMouseLeave={(e) => {
        e.target.style.background = "white";
        e.target.style.color = "#ff4757";
      }}
      onClick={(e) => {
        e.stopPropagation();
        addToCart(product);
      }}
      >
        Add to Cart
      </button>
    </div>
  )) : (
    // Skeleton Loader
    [...Array(3)].map((_, i) => (
      <div key={i} style={{
        background: "rgba(255,255,255,0.1)",
        borderRadius: "20px",
        padding: "25px",
        height: "320px",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255,255,255,0.2)",
        animation: "pulse 1.5s infinite"
      }} />
    ))
  )}
</div>

<style>
{`
  @keyframes pulse {
    0% { transform: scale(1); opacity: 0.9; }
    50% { transform: scale(1.05); opacity: 1; }
    100% { transform: scale(1); opacity: 0.9; }
  }
`}
</style>


              {/* Action Buttons */}
              <div style={{ display: "flex", gap: "15px", justifyContent: "center", flexWrap: "wrap" }}>
                <button style={{
                  background: "white",
                  color: "#667eea",
                  border: "none",
                  padding: "15px 30px",
                  borderRadius: "50px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 15px 30px rgba(0,0,0,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 10px 20px rgba(0,0,0,0.1)";
                }}
                onClick={() => {
                  setCategory("");
                  setSearch("offer");
                  setPage(1);
                }}
                >
                  Shop All Offers
                </button>
                <button style={{
                  background: "transparent",
                  color: "white",
                  border: "2px solid white",
                  padding: "15px 30px",
                  borderRadius: "50px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.3s ease"
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "white";
                  e.target.style.color = "#667eea";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "transparent";
                  e.target.style.color = "white";
                }}
                onClick={() => {
                  setCategory("");
                  setSearch("sale");
                  setPage(1);
                }}
                >
                  View All Sales
                </button>
              </div>
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
                  ? "repeat(auto-fill, minmax(180px, 1fr))" 
                  : "1fr",
                gap: "12px",
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