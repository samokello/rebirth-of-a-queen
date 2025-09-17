import React, { useState } from 'react';
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
  FaHeart,
  FaShare,
  FaCheck
} from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const navigate = useNavigate();

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

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "30px" }}>
          {/* Cart Items */}
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
              marginBottom: "25px",
              display: "flex",
              alignItems: "center",
              gap: "10px"
            }}>
              <FaShoppingBag />
              Cart Items
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "120px 1fr auto",
                    gap: "20px",
                    padding: "20px",
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
                    width: "120px",
                    height: "120px",
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
                        fontSize: "18px",
                        fontWeight: "600",
                        color: "#2c3e50",
                        margin: "0 0 8px 0",
                        lineHeight: "1.3"
                      }}>
                        {item.product?.name || 'Unknown Product'}
                      </h3>
                      <p style={{
                        fontSize: "14px",
                        color: "#666",
                        margin: "0 0 10px 0"
                      }}>
                        {item.product?.category?.replace('-', ' ') || 'Uncategorized'}
                      </p>
                      <div style={{
                        fontSize: "20px",
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
                      gap: "15px",
                      marginTop: "15px"
                    }}>
                      <span style={{ fontSize: "14px", fontWeight: "600", color: "#2c3e50" }}>Quantity:</span>
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
                            padding: "8px 12px",
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
                          padding: "8px 16px",
                          borderLeft: "1px solid #ddd",
                          borderRight: "1px solid #ddd",
                          fontSize: "16px",
                          fontWeight: "600",
                          minWidth: "50px",
                          textAlign: "center"
                        }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.product?._id || item.id, item.quantity + 1)}
                          style={{
                            padding: "8px 12px",
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
                      fontSize: "18px",
                      fontWeight: "bold",
                      color: "#2c3e50",
                      marginBottom: "10px"
                    }}>
                      KSH {((item.product?.price || 0) * (item.quantity || 0)).toFixed(0)}
                    </div>
                    
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button
                        onClick={() => removeFromCart(item.product?._id || item.id)}
                        style={{
                          padding: "8px",
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
            padding: "30px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            height: "fit-content",
            position: "sticky",
            top: "100px"
          }}>
            <h2 style={{
              fontSize: "24px",
              fontWeight: "600",
              color: "#2c3e50",
              marginBottom: "25px"
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
                padding: "15px 0",
                borderTop: "2px solid #e1e8ed",
                marginTop: "10px"
              }}>
                <span style={{ fontSize: "18px", fontWeight: "600", color: "#2c3e50" }}>Total</span>
                <span style={{ fontSize: "24px", fontWeight: "bold", color: "#3498db" }}>
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
                padding: "15px 24px",
                backgroundColor: isCheckingOut ? "#bdc3c7" : "#27ae60",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: isCheckingOut ? "not-allowed" : "pointer",
                transition: "all 0.2s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                marginBottom: "20px"
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