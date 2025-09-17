import React from 'react';
import styled from 'styled-components';
import { FaTimes, FaShoppingCart, FaHeart, FaStar, FaWhatsapp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  z-index: 99999;
  backdrop-filter: blur(8px);
  padding-right: 20px;

  @media (max-width: 768px) {
    justify-content: center;
    padding-right: 0;
    padding: 20px;
  }
`;

const ModalContent = styled(motion.div)`
  background: white;
  border-radius: 20px;
  width: 90%;
  max-width: 800px;
  max-height: 85vh;
  overflow: hidden;
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.3);
  margin-left: auto;
  margin-right: 20px;

  @media (max-width: 1200px) {
    width: 85%;
    max-width: 700px;
  }

  @media (max-width: 768px) {
    width: 95%;
    max-width: 600px;
    margin: 10px auto;
  }
`;

const ModalHeader = styled.div`
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 20px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 1.5rem;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const ModalBody = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ImageSection = styled.div`
  position: relative;
  height: 400px;
  overflow: hidden;
  
  @media (max-width: 768px) {
    height: 300px;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const InfoSection = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ProductCategory = styled.span`
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 6px 15px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 15px;
  display: inline-block;
  width: fit-content;
`;

const ProductTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 15px;
  color: #333;
  font-weight: 600;
  line-height: 1.2;
`;

const ProductDescription = styled.p`
  color: #666;
  line-height: 1.7;
  font-size: 1rem;
  margin-bottom: 20px;
`;

const ProductRating = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const Stars = styled.div`
  display: flex;
  gap: 3px;
`;

const Star = styled(FaStar)`
  color: ${props => props.filled ? '#ffd700' : '#ddd'};
  font-size: 18px;
`;

const RatingText = styled.span`
  color: #666;
  font-size: 1rem;
`;

const ProductPrice = styled.div`
  font-size: 2.2rem;
  font-weight: bold;
  color: #667eea;
  margin-bottom: 25px;
`;

const ProductFeatures = styled.div`
  margin-bottom: 25px;
`;

const FeatureTitle = styled.h4`
  color: #333;
  margin-bottom: 10px;
  font-size: 1.1rem;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FeatureItem = styled.li`
  color: #666;
  margin-bottom: 8px;
  padding-left: 20px;
  position: relative;
  
  &:before {
    content: "✓";
    position: absolute;
    left: 0;
    color: #667eea;
    font-weight: bold;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 15px;
  margin-top: auto;
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 15px 25px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const AddToCartButton = styled(ActionButton)`
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
  }
`;

const WishlistButton = styled(ActionButton)`
  background: #f8f9fa;
  color: #667eea;
  border: 2px solid #667eea;

  &:hover {
    background: #667eea;
    color: white;
    transform: translateY(-2px);
  }

  &.wishlisted {
    background: #ff4757;
    color: white;
    border-color: #ff4757;
  }
`;

const WhatsAppButton = styled(ActionButton)`
  background: #25d366;
  color: white;

  &:hover {
    background: #128c7e;
    transform: translateY(-2px);
  }
`;

const ProductDetailModal = ({ isOpen, onClose, product, onAddToCart, onToggleWishlist, isInWishlist }) => {
  if (!product) return null;

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star key={i} filled={i <= rating} />
      );
    }
    return stars;
  };

  const handleWhatsApp = () => {
    const message = `Hello! I'm interested in the ${product.name} (KSh ${product.price.toLocaleString()}). Can you tell me more about this product?`;
    const whatsappUrl = `https://wa.me/254700000000?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <ModalContent
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <ModalHeader>
              <ModalTitle>Product Details</ModalTitle>
              <CloseButton onClick={onClose}>
                <FaTimes />
              </CloseButton>
            </ModalHeader>
            
            <ModalBody>
              <ImageSection>
                <ProductImage src={product.image} alt={product.name} />
              </ImageSection>
              
              <InfoSection>
                <div>
                  <ProductCategory>{product.category}</ProductCategory>
                  <ProductTitle>{product.name}</ProductTitle>
                  <ProductDescription>{product.description}</ProductDescription>
                  
                  <ProductRating>
                    <Stars>
                      {renderStars(product.rating)}
                    </Stars>
                    <RatingText>({product.reviewCount} reviews)</RatingText>
                  </ProductRating>
                  
                  <ProductPrice>KSh {product.price.toLocaleString()}</ProductPrice>
                  
                  <ProductFeatures>
                    <FeatureTitle>Product Features:</FeatureTitle>
                    <FeatureList>
                      <FeatureItem>Handcrafted with premium materials</FeatureItem>
                      <FeatureItem>Unique design and quality finish</FeatureItem>
                      <FeatureItem>Perfect for everyday use</FeatureItem>
                      <FeatureItem>Made with love and attention to detail</FeatureItem>
                    </FeatureList>
                  </ProductFeatures>
                </div>
                
                <ActionButtons>
                  <AddToCartButton onClick={() => onAddToCart(product)}>
                    <FaShoppingCart />
                    Add to Cart
                  </AddToCartButton>
                  <WishlistButton 
                    onClick={() => onToggleWishlist(product)}
                    className={isInWishlist ? 'wishlisted' : ''}
                  >
                    <FaHeart />
                    {isInWishlist ? 'Wishlisted' : 'Wishlist'}
                  </WishlistButton>
                  <WhatsAppButton onClick={handleWhatsApp}>
                    <FaWhatsapp />
                    Inquire
                  </WhatsAppButton>
                </ActionButtons>
              </InfoSection>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

export default ProductDetailModal; 