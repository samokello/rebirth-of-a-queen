import React, { useState, useEffect } from 'react';
import { useFavorites } from '../context/FavoritesContext';
import { FaHeart, FaTrash, FaShoppingCart, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ProductRating from '../components/ProductRating';

const Favorites = () => {
  const { items: favorites, removeFromFavorites, clearFavorites, addToFavorites } = useFavorites();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState({ show: false, message: '' });

  // Debug: Log favorites to console
  console.log('Favorites page - Current favorites:', favorites);

  useEffect(() => {
    // Simulate loading to ensure context is ready
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    setNotification({ show: true, message: `${product.name} added to cart!` });
    setTimeout(() => setNotification({ show: false, message: '' }), 3000);
    // Optionally remove from favorites after adding to cart
    // removeFromFavorites(product._id);
  };

  const handleRemoveFromFavorites = async (product) => {
    try {
      await removeFromFavorites(product._id);
      setNotification({ show: true, message: `${product.name} removed from favorites` });
      setTimeout(() => setNotification({ show: false, message: '' }), 3000);
    } catch (error) {
      console.error('Error removing from favorites:', error);
      setNotification({ show: true, message: 'Failed to remove from favorites. Please try again.' });
      setTimeout(() => setNotification({ show: false, message: '' }), 3000);
    }
  };

  if (isLoading) {
    return (
      <div style={{
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '24px', color: '#3498db' }}>
          ⏳
        </div>
        <h2 style={{ marginBottom: '16px', color: '#2c3e50' }}>Loading favorites...</h2>
        <p style={{ color: '#7f8c8d', fontSize: '16px' }}>
          Please wait while we load your favorite products.
        </p>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div style={{
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '64px', marginBottom: '24px', color: '#e74c3c' }}>
          <FaHeart />
        </div>
        <h2 style={{ marginBottom: '16px', color: '#2c3e50' }}>No favorites yet</h2>
        <p style={{ marginBottom: '32px', color: '#7f8c8d', fontSize: '16px' }}>
          Start adding products to your favorites to see them here.
        </p>
        <button
          onClick={() => navigate('/shop')}
          style={{
            padding: '12px 24px',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#2980b9'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#3498db'}
        >
          <FaArrowLeft />
          Browse Products
        </button>
      </div>
    );
  }

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
        `}
      </style>
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
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
            zIndex: 1000,
            animation: 'slideIn 0.3s ease-out'
          }}>
            {notification.message}
          </div>
        )}

        {/* Debug Section */}
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '16px',
          borderRadius: '8px',
          marginBottom: '20px',
          border: '1px solid #dee2e6'
        }}>
          <h3 style={{ margin: '0 0 8px 0', color: '#495057' }}>Debug Info:</h3>
          <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#6c757d' }}>
            Favorites Count: {favorites.length}
          </p>
          <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#6c757d' }}>
            localStorage: {localStorage.getItem('favorites') ? 'Has data' : 'Empty'}
          </p>
          <details style={{ marginTop: '8px' }}>
            <summary style={{ cursor: 'pointer', fontSize: '14px', color: '#495057' }}>
              View Raw Favorites Data
            </summary>
            <pre style={{ 
              marginTop: '8px', 
              padding: '8px', 
              backgroundColor: '#e9ecef', 
              borderRadius: '4px',
              fontSize: '12px',
              overflow: 'auto',
              maxHeight: '200px'
            }}>
              {JSON.stringify(favorites, null, 2)}
            </pre>
          </details>
        </div>

        {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '32px',
        paddingBottom: '16px',
        borderBottom: '2px solid #ecf0f1'
      }}>
        <h1 style={{ fontSize: '28px', color: '#2c3e50', margin: 0 }}>
          My Favorites ({favorites.length} {favorites.length === 1 ? 'item' : 'items'})
        </h1>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => {
              const testProduct = {
                _id: 'test-' + Date.now(),
                name: 'Test Product',
                price: 1000,
                description: 'This is a test product',
                category: 'test',
                images: []
              };
              addToFavorites(testProduct);
              setNotification({ show: true, message: 'Test product added!' });
              setTimeout(() => setNotification({ show: false, message: '' }), 3000);
            }}
            style={{
              padding: '8px 16px',
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#2980b9'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#3498db'}
          >
            Add Test Product
          </button>
          <button
            onClick={clearFavorites}
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
            Clear All
          </button>
        </div>
      </div>

      {/* Favorites Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '24px',
        marginBottom: '32px'
      }}>
        {favorites.map((product) => (
          <div
            key={product._id}
            style={{
              border: '1px solid #e1e8ed',
              borderRadius: '12px',
              overflow: 'hidden',
              backgroundColor: 'white',
              transition: 'all 0.3s ease',
              position: 'relative',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
            }}
          >
            {/* Product Image */}
            <div style={{
              position: 'relative',
              width: '100%',
              height: '250px',
              background: '#f8f9fa',
              overflow: 'hidden'
            }}>
              {product.images?.[0]?.url ? (
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
                  No Image
                </div>
              )}

              {/* Favorite Icon */}
              <div style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                width: '36px',
                height: '36px',
                backgroundColor: 'rgba(255,255,255,0.9)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#e74c3c',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}>
                <FaHeart />
              </div>

              {/* Remove from Favorites */}
              <button
                onClick={() => handleRemoveFromFavorites(product)}
                style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  width: '36px',
                  height: '36px',
                  backgroundColor: 'rgba(255,255,255,0.9)',
                  borderRadius: '50%',
                  border: 'none',
                  color: '#e74c3c',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              >
                <FaTrash />
              </button>
            </div>

            {/* Product Info */}
            <div style={{ padding: '20px' }}>
              {/* Category */}
              <div style={{
                fontSize: '12px',
                color: '#666',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: '8px'
              }}>
                {product.category?.replace('-', ' ')}
              </div>

              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                margin: '0 0 12px 0',
                color: '#2c3e50',
                lineHeight: '1.3'
              }}>
                {product.name}
              </h3>

              {/* Rating */}
              <div style={{ marginBottom: '12px' }}>
                <ProductRating
                  currentRating={product.rating?.average || 0}
                  totalRatings={product.rating?.count || 0}
                  readonly={true}
                />
              </div>

              <p style={{
                fontSize: '14px',
                color: '#7f8c8d',
                margin: '0 0 16px 0',
                lineHeight: '1.4',
                height: '40px',
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical'
              }}>
                {product.description}
              </p>

              {/* Pricing */}
              <div style={{ marginBottom: '16px' }}>
                {product.onOffer && product.originalPrice ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <span style={{
                      fontSize: '20px',
                      fontWeight: 'bold',
                      color: '#e74c3c'
                    }}>
                      KSH {product.price.toFixed(0)}
                    </span>
                    <span style={{
                      fontSize: '14px',
                      color: '#e74c3c',
                      textDecoration: 'line-through',
                      fontWeight: '500'
                    }}>
                      KSH {product.originalPrice.toFixed(0)}
                    </span>
                    <span style={{
                      fontSize: '12px',
                      backgroundColor: '#e74c3c',
                      color: 'white',
                      padding: '2px 6px',
                      borderRadius: '8px',
                      fontWeight: 'bold'
                    }}>
                      -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </span>
                  </div>
                ) : (
                  <div style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: '#e74c3c'
                  }}>
                    KSH {product.price.toFixed(0)}
                  </div>
                )}
              </div>

              {/* Stock Status */}
              <div style={{
                fontSize: '12px',
                color: product.stock > 0 ? '#27ae60' : '#e74c3c',
                marginBottom: '16px',
                fontWeight: '500'
              }}>
                {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
              </div>

              <button
                onClick={() => handleAddToCart(product)}
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: '#3498db',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#2980b9'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#3498db'}
              >
                <FaShoppingCart />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Continue Shopping Button */}
      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <button
          onClick={() => navigate('/shop')}
          style={{
            padding: '16px 32px',
            backgroundColor: '#27ae60',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '18px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#229954'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#27ae60'}
        >
          <FaArrowLeft />
          Continue Shopping
        </button>
      </div>
      </div>
    </>
  );
};

export default Favorites;
