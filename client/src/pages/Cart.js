import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { 
  FaTrash, 
  FaMinus, 
  FaPlus, 
  FaShoppingBag, 
  FaArrowLeft,
  FaTruck,
  FaShieldAlt,
  FaCreditCard,
  FaUndo,
  FaCheck
} from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import { API_MAIN } from '../api';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, clearCart, addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [isCheckingOut] = useState(false);
  const navigate = useNavigate();
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [notification, setNotification] = useState({ show: false, message: '' });

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = () => {
    if (isAuthenticated) {
      navigate('/checkout');
    } else {
      navigate('/login', { state: { returnUrl: '/checkout' } });
    }
  };

  const calculateSubtotal = () => {
    return items.reduce((total, item) => {
      const price = item.product?.price || 0;
      const quantity = item.quantity || 0;
      return total + (price * quantity);
    }, 0);
  };

  const calculateDelivery = () => {
    const subtotal = calculateSubtotal();
    return subtotal >= 2000 ? 0 : 200; // Free delivery over KSH 2000
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateDelivery();
  };

  // Load related products based on cart categories
  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const categories = Array.from(new Set(
          items
            .map((i) => i.product?.category)
            .filter((c) => typeof c === 'string' && c.trim().length > 0)
        ));

        const productIdsInCart = new Set(
          items.map((i) => i.product?._id || i.product?.id).filter(Boolean)
        );

        let fetched = [];
        if (categories.length > 0) {
          const topCategories = categories.slice(0, 2);
          const responses = await Promise.all(
            topCategories.map((cat) => API_MAIN.get(`/shop/products?category=${encodeURIComponent(cat)}&limit=8`))
          );
          responses.forEach(({ data }) => {
            if (data?.success && Array.isArray(data.data)) {
              fetched = fetched.concat(data.data);
            }
          });
        } else {
          const { data } = await API_MAIN.get(`/shop/products?limit=8`);
          if (data?.success && Array.isArray(data.data)) {
            fetched = data.data;
          }
        }

        const uniqueById = new Map();
        fetched.forEach((p) => {
          if (p && p._id && !productIdsInCart.has(p._id)) {
            uniqueById.set(p._id, p);
          }
        });
        setRelatedProducts(Array.from(uniqueById.values()).slice(0, 8));
      } catch (err) {
        console.error('Failed to load related products for cart:', err);
      }
    };

    fetchRelated();
  }, [items]);

  if (items.length === 0) {
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
              <h1 style={{ margin: 0, fontSize: "20px", fontWeight: "600" }}>Shopping Cart</h1>
            </div>
          </div>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          padding: '40px 20px',
          textAlign: 'center'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '60px 40px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            maxWidth: '500px',
            width: '100%'
          }}>
            <div style={{ fontSize: '80px', marginBottom: '20px' }}>🛒</div>
            <h2 style={{ 
              fontSize: '28px', 
              color: '#2c3e50', 
              marginBottom: '16px',
              fontWeight: '600'
            }}>
              Your cart is empty
            </h2>
            <p style={{ 
              fontSize: '16px', 
              color: '#7f8c8d', 
              marginBottom: '30px',
              lineHeight: '1.5'
            }}>
              Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
            </p>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => navigate('/shop')}
                style={{
                  padding: '15px 30px',
                  backgroundColor: '#3498db',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#2980b9'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#3498db'}
              >
                <FaShoppingBag />
                Start Shopping
              </button>
              <button
                onClick={() => navigate('/')}
                style={{
                  padding: '15px 30px',
                  backgroundColor: 'transparent',
                  color: '#3498db',
                  border: '2px solid #3498db',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#3498db';
                  e.target.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#3498db';
                }}
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {/* Notification */}
      {notification.show && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          backgroundColor: '#27ae60',
          color: 'white',
          padding: '12px 20px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          zIndex: 1000
        }}>
          {notification.message}
        </div>
      )}
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
            <h1 style={{ margin: 0, fontSize: "20px", fontWeight: "600" }}>
              Shopping Cart ({items.length} {items.length === 1 ? 'item' : 'items'})
            </h1>
          </div>
          
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px" }}>
              <FaTruck style={{ color: "#3498db" }} />
              <span>Free Delivery</span>
            </div>
            <button
              onClick={clearCart}
              style={{
                padding: '8px 16px',
                backgroundColor: '#e74c3c',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#c0392b'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#e74c3c'}
            >
              Clear Cart
            </button>
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
          <span style={{ color: "#2c3e50" }}>Shopping Cart</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "20px" }}>
          {/* Cart Items */}
          <div style={{
            backgroundColor: "white",
            borderRadius: "12px",
            padding: "20px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
          }}>
            <h2 style={{
              fontSize: "20px",
              fontWeight: "600",
              color: "#2c3e50",
              marginBottom: "16px",
              display: "flex",
              alignItems: "center",
              gap: "10px"
            }}>
              <FaShoppingBag />
              Cart Items
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "120px 1fr auto",
                    gap: "12px",
                    padding: "12px",
                    border: "1px solid #e1e8ed",
                    borderRadius: "12px",
                    backgroundColor: "#fafbfc",
                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#3498db";
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(52, 152, 219, 0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#e1e8ed";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {/* Product Image */}
                  <div style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "8px",
                    overflow: "hidden",
                    backgroundColor: "#f8f9fa"
                  }}>
                    {item.product?.images && item.product.images[0] ? (
                      <img
                        src={item.product.images[0].url}
                        alt={item.product.name}
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
                        fontSize: "12px"
                      }}>
                        No Image
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <h3 style={{
                        fontSize: "16px",
                        fontWeight: "600",
                        color: "#2c3e50",
                        margin: "0 0 8px 0",
                        lineHeight: "1.3"
                      }}>
                        {item.product?.name || 'Unknown Product'}
                      </h3>
                      <p style={{
                        fontSize: "12px",
                        color: "#666",
                        margin: "0 0 10px 0"
                      }}>
                        {item.product?.category?.replace('-', ' ') || 'Uncategorized'}
                      </p>
                      <div style={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        color: "#3498db"
                      }}>
                        KSH {(item.product?.price || 0).toFixed(0)}
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginTop: "10px"
                    }}>
                      <span style={{ fontSize: "12px", fontWeight: "600", color: "#2c3e50" }}>Qty:</span>
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        border: "1px solid #ddd",
                        borderRadius: "6px",
                        overflow: "hidden"
                      }}>
                        <button
                          onClick={() => handleQuantityChange(item.product?._id || item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          style={{
                            padding: "6px 10px",
                            border: "none",
                            backgroundColor: item.quantity <= 1 ? "#f8f9fa" : "white",
                            color: item.quantity <= 1 ? "#bdc3c7" : "#2c3e50",
                            cursor: item.quantity <= 1 ? "not-allowed" : "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                          }}
                        >
                          <FaMinus />
                        </button>
                        <span style={{
                          padding: "6px 12px",
                          borderLeft: "1px solid #ddd",
                          borderRight: "1px solid #ddd",
                          fontSize: "14px",
                          fontWeight: "600",
                          minWidth: "40px",
                          textAlign: "center"
                        }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.product?._id || item.id, item.quantity + 1)}
                          style={{
                            padding: "6px 10px",
                            border: "none",
                            backgroundColor: "white",
                            color: "#2c3e50",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                          }}
                        >
                          <FaPlus />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    justifyContent: "space-between"
                  }}>
                    <div style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: "#2c3e50",
                      marginBottom: "8px"
                    }}>
                      KSH {((item.product?.price || 0) * (item.quantity || 0)).toFixed(0)}
                    </div>
                    
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button
                        onClick={() => {
                          removeFromCart(item.product?._id || item.id);
                          setNotification({ show: true, message: 'Item removed from cart' });
                          setTimeout(() => setNotification({ show: false, message: '' }), 2000);
                        }}
                        style={{
                          padding: "6px",
                          border: "none",
                          backgroundColor: "#e74c3c",
                          color: "white",
                          borderRadius: "6px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "all 0.2s ease"
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = "#c0392b"}
                        onMouseLeave={(e) => e.target.style.backgroundColor = "#e74c3c"}
                        title="Remove item"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div style={{
            backgroundColor: "white",
            borderRadius: "12px",
            padding: "20px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            height: "fit-content",
            position: "sticky",
            top: "100px"
          }}>
            <h2 style={{
              fontSize: "20px",
              fontWeight: "600",
              color: "#2c3e50",
              marginBottom: "16px"
            }}>
              Order Summary
            </h2>

            {/* Price Breakdown */}
            <div style={{ marginBottom: "25px" }}>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px 0",
                borderBottom: "1px solid #f1f3f4"
              }}>
                <span style={{ fontSize: "16px", color: "#666" }}>Subtotal ({items.length} items)</span>
                <span style={{ fontSize: "16px", fontWeight: "600", color: "#2c3e50" }}>
                  KSH {calculateSubtotal().toFixed(0)}
                </span>
              </div>
              
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px 0",
                borderBottom: "1px solid #f1f3f4"
              }}>
                <span style={{ fontSize: "16px", color: "#666" }}>Delivery</span>
                <span style={{ 
                  fontSize: "16px", 
                  fontWeight: "600", 
                  color: calculateDelivery() === 0 ? "#27ae60" : "#2c3e50"
                }}>
                  {calculateDelivery() === 0 ? "FREE" : `KSH ${calculateDelivery()}`}
                </span>
              </div>

              {calculateDelivery() > 0 && (
                <div style={{
                  fontSize: "12px",
                  color: "#666",
                  textAlign: "center",
                  padding: "8px",
                  backgroundColor: "#f8f9fa",
                  borderRadius: "6px",
                  margin: "10px 0"
                }}>
                  Add KSH {(2000 - calculateSubtotal()).toFixed(0)} more for free delivery
                </div>
              )}

              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px 0",
                borderTop: "2px solid #e1e8ed",
                marginTop: "10px"
              }}>
                <span style={{ fontSize: "16px", fontWeight: "600", color: "#2c3e50" }}>Total</span>
                <span style={{ fontSize: "20px", fontWeight: "bold", color: "#3498db" }}>
                  KSH {calculateTotal().toFixed(0)}
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              style={{
                width: "100%",
                padding: "12px 16px",
                backgroundColor: isCheckingOut ? "#bdc3c7" : "#27ae60",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "600",
                cursor: isCheckingOut ? "not-allowed" : "pointer",
                transition: "all 0.2s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                marginBottom: "16px"
              }}
              onMouseEnter={(e) => {
                if (!isCheckingOut) e.target.style.backgroundColor = "#229954";
              }}
              onMouseLeave={(e) => {
                if (!isCheckingOut) e.target.style.backgroundColor = "#27ae60";
              }}
            >
              <FaCheck />
              {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
            </button>

            {/* Security Features */}
            <div style={{
              borderTop: "1px solid #e1e8ed",
              paddingTop: "20px"
            }}>
              <h3 style={{
                fontSize: "16px",
                fontWeight: "600",
                color: "#2c3e50",
                marginBottom: "15px"
              }}>
                Secure Checkout
              </h3>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                gap: "10px"
              }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px",
                  backgroundColor: "#f8f9fa",
                  borderRadius: "6px",
                  fontSize: "12px",
                  color: "#666"
                }}>
                  <FaShieldAlt style={{ color: "#3498db" }} />
                  <span>SSL Secure</span>
                </div>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px",
                  backgroundColor: "#f8f9fa",
                  borderRadius: "6px",
                  fontSize: "12px",
                  color: "#666"
                }}>
                  <FaCreditCard style={{ color: "#3498db" }} />
                  <span>Safe Payment</span>
                </div>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px",
                  backgroundColor: "#f8f9fa",
                  borderRadius: "6px",
                  fontSize: "12px",
                  color: "#666"
                }}>
                  <FaUndo style={{ color: "#3498db" }} />
                  <span>Easy Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      {/* You May Also Like */}
      {relatedProducts.length > 0 && (
        <div style={{ maxWidth: '1200px', margin: '20px auto 40px', padding: '0 20px' }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
          }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#2c3e50',
              marginBottom: '16px'
            }}>
              You May Also Like
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '12px'
            }}>
              {relatedProducts.map((p) => (
                <div
                  key={p._id}
                  onClick={() => navigate(`/product/${p._id}`)}
                  style={{
                    border: '1px solid #e1e8ed',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    backgroundColor: 'white',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
                  }}
                >
                  <div style={{ width: '100%', height: '140px', backgroundColor: '#f8f9fa', overflow: 'hidden' }}>
                    {p.images?.[0]?.url ? (
                      <img src={p.images[0].url} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', color: '#aaa', fontSize: '14px' }}>No Image</div>
                    )}
                  </div>
                  <div style={{ padding: '12px' }}>
                    <div style={{ fontSize: '12px', color: '#666', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
                      {p.category?.replace('-', ' ')}
                    </div>
                    <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#2c3e50', margin: '0 0 6px 0', lineHeight: '1.3' }}>
                      {p.name}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#3498db' }}>KSH {Number(p.price || 0).toFixed(0)}</div>
                      <button
                        onClick={(e) => { e.stopPropagation(); addToCart(p, 1); setNotification({ show: true, message: `${p.name} added to cart` }); setTimeout(() => setNotification({ show: false, message: '' }), 2000); }}
                        style={{
                          padding: '8px 10px',
                          backgroundColor: '#3498db',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2980b9'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3498db'}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

        {/* Continue Shopping */}
        <div style={{
          marginTop: "30px",
          textAlign: "center"
        }}>
          <button
            onClick={() => navigate('/shop')}
            style={{
              padding: "12px 24px",
              backgroundColor: "transparent",
              color: "#3498db",
              border: "2px solid #3498db",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.2s ease",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px"
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#3498db";
              e.target.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "transparent";
              e.target.style.color = "#3498db";
            }}
          >
            <FaShoppingBag />
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;