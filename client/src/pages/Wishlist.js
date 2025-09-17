import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { FaShoppingCart, FaHeart, FaStar, FaEye, FaTrash, FaArrowLeft } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import ProductDetailModal from '../components/ProductDetailModal';
import { UserContext } from '../context/UserContext';

// Styled Components
const WishlistContainer = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
  padding: 20px;
`;

const WishlistContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  background: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 20px;
`;

const BackButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #f68b1e;
  text-decoration: none;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 4px;
  transition: all 0.3s ease;
  
  &:hover {
    background: #f68b1e;
    color: white;
  }
`;

const HeaderInfo = styled.div`
  flex: 1;
`;

const Title = styled.h1`
  font-size: 24px;
  color: #333;
  margin: 0 0 5px 0;
`;

const Subtitle = styled.p`
  color: #666;
  margin: 0;
  font-size: 14px;
`;

const WishlistCount = styled.span`
  background: #f68b1e;
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
`;

const EmptyWishlist = styled.div`
  background: white;
  border-radius: 8px;
  padding: 60px 20px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const EmptyIcon = styled.div`
  font-size: 48px;
  color: #ddd;
  margin-bottom: 20px;
`;

const EmptyTitle = styled.h2`
  color: #333;
  margin-bottom: 10px;
  font-size: 20px;
`;

const EmptyText = styled.p`
  color: #666;
  margin-bottom: 30px;
  font-size: 14px;
`;

const ShopButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #f68b1e;
  color: white;
  text-decoration: none;
  padding: 12px 24px;
  border-radius: 4px;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    background: #e67e22;
    transform: translateY(-2px);
  }
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
`;

const ProductCard = styled(motion.div)`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }
`;

const ProductImageContainer = styled.div`
  position: relative;
  height: 200px;
  overflow: hidden;
  background: #f8f9fa;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${ProductCard}:hover & {
    transform: scale(1.05);
  }
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 2;
  color: #ff4757;

  &:hover {
    background: #ff4757;
    color: white;
    transform: scale(1.1);
  }
`;

const ProductInfo = styled.div`
  padding: 15px;
`;

const ProductTitle = styled.h3`
  font-size: 14px;
  color: #333;
  margin-bottom: 8px;
  line-height: 1.3;
  font-weight: 500;
`;

const ProductRating = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 8px;
`;

const Stars = styled.div`
  display: flex;
  gap: 1px;
`;

const Star = styled(FaStar)`
  color: ${props => props.filled ? '#ffd700' : '#ddd'};
  font-size: 12px;
`;

const RatingText = styled.span`
  color: #666;
  font-size: 12px;
`;

const ProductPrice = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #f68b1e;
  margin-bottom: 15px;
`;

const ProductActions = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 10px 12px;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

const AddToCartButton = styled(ActionButton)`
  background: #f68b1e;
  color: white;

  &:hover {
    background: #e67e22;
  }
`;

const ViewButton = styled(ActionButton)`
  background: #f8f9fa;
  color: #333;
  border: 1px solid #ddd;

  &:hover {
    background: #e9ecef;
  }
`;

const Wishlist = () => {
  const { items: wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart: addToCartContext } = useCart();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const { user } = useContext(UserContext);

  const addToCart = (product) => {
    if (!user) {
      alert('Please log in to add items to your cart.');
      window.location.href = '/login';
      return;
    }
    addToCartContext(product);
    alert(`${product.name} added to cart!`);
  };

  const removeFromWishlistHandler = (productId) => {
    removeFromWishlist(productId);
  };

  const viewProduct = (product) => {
    setSelectedProduct(product);
    setIsDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedProduct(null);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star key={i} filled={i <= rating} />
      );
    }
    return stars;
  };

  return (
    <WishlistContainer>
      <WishlistContent>
        <Header>
          <BackButton to="/shop">
            <FaArrowLeft />
            Back to Shop
          </BackButton>
          <HeaderInfo>
            <Title>My Wishlist</Title>
            <Subtitle>Products you've saved for later</Subtitle>
          </HeaderInfo>
          <WishlistCount>{wishlistItems.length} items</WishlistCount>
        </Header>

        <AnimatePresence>
          {wishlistItems.length > 0 ? (
            <ProductsGrid>
              {wishlistItems.map((product, index) => (
                <ProductCard
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  <ProductImageContainer>
                    <ProductImage src={product.image} alt={product.name} />
                    <RemoveButton
                      onClick={() => removeFromWishlistHandler(product.id)}
                      title="Remove from wishlist"
                    >
                      <FaTrash />
                    </RemoveButton>
                  </ProductImageContainer>
                  
                  <ProductInfo>
                    <ProductTitle>{product.name}</ProductTitle>
                    
                    <ProductRating>
                      <Stars>
                        {renderStars(product.rating)}
                      </Stars>
                      <RatingText>({product.reviewCount})</RatingText>
                    </ProductRating>
                    
                    <ProductPrice>KSh {product.price.toLocaleString()}</ProductPrice>
                    
                    <ProductActions>
                      <AddToCartButton onClick={() => addToCart(product)} disabled={!user}>
                        <FaShoppingCart />
                        Add to Cart
                      </AddToCartButton>
                      <ViewButton onClick={() => viewProduct(product)}>
                        <FaEye />
                        View
                      </ViewButton>
                    </ProductActions>
                  </ProductInfo>
                </ProductCard>
              ))}
            </ProductsGrid>
          ) : (
            <EmptyWishlist
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <EmptyIcon>
                <FaHeart />
              </EmptyIcon>
              <EmptyTitle>Your wishlist is empty</EmptyTitle>
              <EmptyText>
                Start adding products to your wishlist to save them for later
              </EmptyText>
              <ShopButton to="/shop">
                <FaShoppingCart />
                Browse Products
              </ShopButton>
            </EmptyWishlist>
          )}
        </AnimatePresence>
      </WishlistContent>

      <ProductDetailModal
        isOpen={isDetailModalOpen}
        onClose={closeDetailModal}
        product={selectedProduct}
        onAddToCart={addToCart}
        onToggleWishlist={() => {}}
        isInWishlist={true}
      />
    </WishlistContainer>
  );
};

export default Wishlist; 