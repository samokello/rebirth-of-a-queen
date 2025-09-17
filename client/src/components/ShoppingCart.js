import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FaShoppingCart, FaTimes, FaMinus, FaPlus, FaCreditCard, FaWhatsapp, FaEye, FaTrash, FaCheckCircle } from 'react-icons/fa';

// Sample products for recommendations (copy from Shop.js)
const sampleProducts = [
  {
    id: 1,
    name: "Handcrafted Leather Bag - Premium Quality",
    category: "Leather Making",
    price: 2500,
    rating: 4.8,
    reviewCount: 24,
    description: "Beautiful handcrafted leather bag made with premium materials. Perfect for everyday use.",
    image: "/images/leather-making/leather.jpg",
    inWishlist: false
  },
  {
    id: 2,
    name: "Custom Fashion Dress - Elegant Design",
    category: "Fashion Design",
    price: 3500,
    rating: 4.9,
    reviewCount: 18,
    description: "Elegant custom-designed dress perfect for special occasions. Made with high-quality fabric.",
    image: "/images/fashion/fashion1.jpg",
    inWishlist: false
  },
  {
    id: 3,
    name: "Branded T-Shirt - Comfortable Fit",
    category: "Branding",
    price: 1200,
    rating: 4.6,
    reviewCount: 32,
    description: "Comfortable branded t-shirt with unique designs. Available in various sizes and colors.",
    image: "/images/branding/1.jpg",
    inWishlist: false
  },
  {
    id: 4,
    name: "Leather Wallet - Classic Design",
    category: "Leather Making",
    price: 800,
    rating: 4.7,
    reviewCount: 15,
    description: "Classic leather wallet with multiple card slots. Handcrafted with attention to detail.",
    image: "/images/leather-making/leather1 (1).jpg",
    inWishlist: false
  },
  {
    id: 5,
    name: "Designer Blouse - Professional Style",
    category: "Fashion Design",
    price: 2800,
    rating: 4.5,
    reviewCount: 21,
    description: "Stylish designer blouse perfect for professional settings. Made with breathable fabric.",
    image: "/images/fashion/fashion2.jpg",
    inWishlist: false
  },
  {
    id: 6,
    name: "Custom Logo Cap - High Quality",
    category: "Branding",
    price: 600,
    rating: 4.4,
    reviewCount: 28,
    description: "High-quality cap with custom logo embroidery. Perfect for promotional events.",
    image: "/images/branding/2.jpg",
    inWishlist: false
  }
];

// Styled components for professional cart
const CartOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  z-index: 1000;
  padding-top: 40px;
`;

const CartContainer = styled.div`
  background: #fff;
  border-radius: 18px;
  width: 95%;
  max-width: 520px;
  max-height: 92vh;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.18);
  display: flex;
  flex-direction: column;
`;

const CartHeader = styled.div`
  background: #f68b1e;
  color: white;
  padding: 18px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 2;
`;

const CartTitle = styled.h2`
  margin: 0;
  font-size: 1.3rem;
  font-weight: 700;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  transition: background 0.2s;
  &:hover {
    background: rgba(255,255,255,0.15);
  }
`;

const CartContent = styled.div`
  padding: 0 24px 0 24px;
  flex: 1 1 auto;
  overflow-y: auto;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  padding: 18px 0;
  border-bottom: 1px solid #f2f2f2;
  &:last-child { border-bottom: none; }
`;

const ItemImage = styled.img`
  width: 64px;
  height: 64px;
  object-fit: cover;
  border-radius: 10px;
  margin-right: 16px;
  background: #f8f9fa;
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const ItemName = styled.a`
  margin: 0 0 6px 0;
  font-size: 1rem;
  color: #222;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  &:hover { text-decoration: underline; color: #f68b1e; }
`;

const ItemPrice = styled.div`
  color: #f68b1e;
  font-weight: bold;
  font-size: 1rem;
`;

const ItemSubtotal = styled.div`
  color: #888;
  font-size: 0.98rem;
  margin-top: 2px;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const QuantityButton = styled.button`
  background: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 1rem;
  &:hover {
    background: #f68b1e;
    color: white;
    border-color: #f68b1e;
  }
`;

const QuantityInput = styled.input`
  width: 36px;
  text-align: center;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 2px 0;
  margin: 0 2px;
  &:focus { border-color: #f68b1e; outline: none; }
`;

const RemoveButton = styled.button`
  background: #fff0ee;
  color: #ff4757;
  border: 1px solid #ff4757;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 0.8rem;
  margin-left: 10px;
  transition: all 0.2s;
  &:hover {
    background: #ff4757;
    color: white;
  }
`;

const CartFooter = styled.div`
  background: #fff;
  padding: 18px 24px;
  border-top: 1px solid #f2f2f2;
  box-shadow: 0 -2px 8px rgba(0,0,0,0.03);
  position: sticky;
  bottom: 0;
  z-index: 2;
`;

const TotalSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  font-size: 1.1rem;
  font-weight: bold;
`;

const SubtotalSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  color: #666;
  margin-bottom: 6px;
`;

const DeliveryInfo = styled.div`
  font-size: 0.95rem;
  color: #888;
  margin-bottom: 10px;
`;

const CouponRow = styled.form`
  display: flex;
  gap: 8px;
  margin-bottom: 10px;
`;

const CouponInput = styled.input`
  flex: 1;
  padding: 7px 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  &:focus { border-color: #f68b1e; outline: none; }
`;

const CouponButton = styled.button`
  background: #f68b1e;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 7px 16px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  &:hover { background: #e67e22; }
`;

const CouponStatus = styled.div`
  font-size: 0.95rem;
  color: #25d366;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const CheckoutButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const CheckoutButton = styled.button`
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const WhatsAppButton = styled(CheckoutButton)`
  background: #25d366;
  color: white;
  &:hover { background: #128c7e; }
`;

const PaymentButton = styled(CheckoutButton)`
  background: #f68b1e;
  color: white;
  &:hover { background: #e67e22; }
`;

const ContinueShoppingButton = styled(CheckoutButton)`
  background: #f8f9fa;
  color: #333;
  border: 1px solid #ddd;
  &:hover { background: #e9ecef; }
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 60px 20px 30px 20px;
  color: #666;
`;

const EmptyCartIcon = styled(FaShoppingCart)`
  font-size: 3rem;
  color: #ddd;
  margin-bottom: 15px;
`;

// Recommendations section
const RecommendationsSection = styled.div`
  background: #f8f9fa;
  padding: 18px 0 10px 0;
  border-top: 1px solid #f2f2f2;
`;

const RecommendationsTitle = styled.h3`
  font-size: 1.1rem;
  color: #222;
  font-weight: 700;
  margin: 0 0 12px 24px;
`;

const RecommendationsList = styled.div`
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding: 0 24px 10px 24px;
`;

const RecommendationCard = styled.div`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  min-width: 170px;
  max-width: 170px;
  flex: 0 0 170px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 10px 16px 10px;
  position: relative;
`;

const RecommendationImage = styled.img`
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
  background: #f8f9fa;
`;

const RecommendationName = styled.div`
  font-size: 0.98rem;
  color: #222;
  font-weight: 600;
  margin-bottom: 6px;
  text-align: center;
`;

const RecommendationPrice = styled.div`
  color: #f68b1e;
  font-weight: bold;
  font-size: 1rem;
  margin-bottom: 10px;
`;

const RecommendationActions = styled.div`
  display: flex;
  gap: 6px;
  width: 100%;
`;

const RecommendationButton = styled.button`
  flex: 1;
  padding: 7px 0;
  border: none;
  border-radius: 6px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

const AddToCartButton = styled(RecommendationButton)`
  background: #f68b1e;
  color: white;
  &:hover { background: #e67e22; }
`;

const ViewButton = styled(RecommendationButton)`
  background: #f8f9fa;
  color: #333;
  border: 1px solid #ddd;
  &:hover { background: #e9ecef; }
`;

const ConfirmDialogOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.3);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ConfirmDialogBox = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.13);
  padding: 32px 28px 24px 28px;
  min-width: 320px;
  max-width: 90vw;
  text-align: center;
`;

const ConfirmDialogTitle = styled.h4`
  margin: 0 0 12px 0;
  color: #f68b1e;
  font-size: 1.15rem;
`;

const ConfirmDialogActions = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 18px;
  justify-content: center;
`;

const ConfirmButton = styled.button`
  background: #f68b1e;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 18px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  &:hover { background: #e67e22; }
`;

const CancelButton = styled.button`
  background: #f8f9fa;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 8px 18px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  &:hover { background: #e9ecef; }
`;

const ShoppingCart = ({ isOpen, onClose, cart, onUpdateQuantity, onRemoveItem }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [viewProduct, setViewProduct] = useState(null);
  const [removeId, setRemoveId] = useState(null);
  const [coupon, setCoupon] = useState('');
  const [couponStatus, setCouponStatus] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const cartContentRef = useRef(null);

  // Accessibility: focus trap
  useEffect(() => {
    if (isOpen && cartContentRef.current) {
      cartContentRef.current.focus();
    }
  }, [isOpen]);

  const calculateSubtotal = () => {
    if (!cart || !Array.isArray(cart)) return 0;
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTotal = () => {
    let subtotal = calculateSubtotal();
    let discount = couponApplied ? 0.1 * subtotal : 0;
    return subtotal - discount;
  };

  const handleWhatsAppOrder = () => {
    setIsProcessing(true);
    const items = cart.map(item => 
      `${item.name} x${item.quantity} - KSh ${(item.price * item.quantity).toLocaleString()}`
    ).join('\n');
    const total = calculateTotal();
    const message = `Hello! I would like to place an order:\n\n${items}\n\nTotal: KSh ${total.toLocaleString()}\n\nPlease contact me to arrange payment and delivery.`;
    const whatsappUrl = `https://wa.me/254700000000?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setIsProcessing(false);
  };

  const handlePaymentOrder = () => {
    setIsProcessing(true);
    alert('Payment gateway integration coming soon!');
    setIsProcessing(false);
  };

  // Coupon logic (simple demo: code 'DISCOUNT10' gives 10% off)
  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (coupon.trim().toUpperCase() === 'DISCOUNT10') {
      setCouponStatus('Coupon applied! 10% off');
      setCouponApplied(true);
    } else {
      setCouponStatus('Invalid coupon code');
      setCouponApplied(false);
    }
  };

  // Remove confirmation
  const handleRemove = (id) => {
    setRemoveId(id);
  };
  const confirmRemove = () => {
    onRemoveItem(removeId);
    setRemoveId(null);
  };
  const cancelRemove = () => {
    setRemoveId(null);
  };

  // Recommendations
  const recommended = sampleProducts.filter(
    p => !cart.some(item => item.id === p.id)
  ).slice(0, 4);

  if (!isOpen) return null;

  return (
    <CartOverlay onClick={onClose} aria-modal="true" role="dialog">
      <CartContainer onClick={e => e.stopPropagation()}>
        <CartHeader>
          <CartTitle>
            <FaShoppingCart style={{ marginRight: '10px' }} />
            My Cart ({cart.length})
          </CartTitle>
          <CloseButton onClick={onClose} aria-label="Close cart">
            <FaTimes />
          </CloseButton>
        </CartHeader>

        <CartContent ref={cartContentRef} tabIndex={-1}>
          {cart.length === 0 ? (
            <EmptyCart>
              <EmptyCartIcon />
              <h3>Your cart is empty</h3>
              <p>Add some products to get started!</p>
              <ContinueShoppingButton onClick={onClose}>
                Continue Shopping
              </ContinueShoppingButton>
            </EmptyCart>
          ) : (
            cart.map(item => (
              <CartItem key={item.id}>
                <ItemImage src={item.image} alt={item.name} />
                <ItemInfo>
                  <ItemName href="#" tabIndex={0}>{item.name}</ItemName>
                  <ItemPrice>KSh {item.price.toLocaleString()}</ItemPrice>
                  <ItemSubtotal>Subtotal: KSh {(item.price * item.quantity).toLocaleString()}</ItemSubtotal>
                </ItemInfo>
                <QuantityControl>
                  <QuantityButton 
                    aria-label="Decrease quantity"
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    <FaMinus />
                  </QuantityButton>
                  <QuantityInput
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={e => {
                      let val = parseInt(e.target.value, 10);
                      if (isNaN(val) || val < 1) val = 1;
                      onUpdateQuantity(item.id, val);
                    }}
                    aria-label="Quantity"
                  />
                  <QuantityButton 
                    aria-label="Increase quantity"
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  >
                    <FaPlus />
                  </QuantityButton>
                </QuantityControl>
                <RemoveButton aria-label="Remove from cart" onClick={() => handleRemove(item.id)}>
                  <FaTrash />
                </RemoveButton>
              </CartItem>
            ))
          )}
        </CartContent>

        {/* Recommendations Section */}
        {recommended.length > 0 && (
          <RecommendationsSection>
            <RecommendationsTitle>You may also like</RecommendationsTitle>
            <RecommendationsList>
              {recommended.map(product => (
                <RecommendationCard key={product.id}>
                  <RecommendationImage src={product.image} alt={product.name} />
                  <RecommendationName>{product.name}</RecommendationName>
                  <RecommendationPrice>KSh {product.price.toLocaleString()}</RecommendationPrice>
                  <RecommendationActions>
                    <AddToCartButton onClick={() => onUpdateQuantity(product.id, 1)}>
                      <FaShoppingCart />
                      Add to Cart
                    </AddToCartButton>
                    <ViewButton onClick={() => setViewProduct(product)}>
                      <FaEye />
                      View
                    </ViewButton>
                  </RecommendationActions>
                </RecommendationCard>
              ))}
            </RecommendationsList>
          </RecommendationsSection>
        )}

        {cart.length > 0 && (
          <CartFooter>
            <SubtotalSection>
              <span>Subtotal:</span>
              <span>KSh {calculateSubtotal().toLocaleString()}</span>
            </SubtotalSection>
            <DeliveryInfo>Estimated delivery: 1-3 days (Nairobi), 2-5 days (other counties)</DeliveryInfo>
            <CouponRow onSubmit={handleApplyCoupon}>
              <CouponInput
                type="text"
                placeholder="Coupon code"
                value={coupon}
                onChange={e => setCoupon(e.target.value)}
                aria-label="Coupon code"
                disabled={couponApplied}
              />
              <CouponButton type="submit" disabled={couponApplied}>
                {couponApplied ? 'Applied' : 'Apply'}
              </CouponButton>
            </CouponRow>
            {couponStatus && (
              <CouponStatus>
                <FaCheckCircle /> {couponStatus}
              </CouponStatus>
            )}
            <TotalSection>
              <span>Total:</span>
              <span>KSh {calculateTotal().toLocaleString()}</span>
            </TotalSection>
            <CheckoutButtons>
              <ContinueShoppingButton onClick={onClose}>
                Continue Shopping
              </ContinueShoppingButton>
              <WhatsAppButton 
                onClick={handleWhatsAppOrder}
                disabled={isProcessing}
              >
                <FaWhatsapp />
                Order via WhatsApp
              </WhatsAppButton>
              <PaymentButton 
                onClick={handlePaymentOrder}
                disabled={isProcessing}
              >
                <FaCreditCard />
                Pay Online
              </PaymentButton>
            </CheckoutButtons>
          </CartFooter>
        )}

        {/* Remove confirmation dialog */}
        {removeId && (
          <ConfirmDialogOverlay>
            <ConfirmDialogBox>
              <ConfirmDialogTitle>Remove this item from your cart?</ConfirmDialogTitle>
              <ConfirmDialogActions>
                <ConfirmButton onClick={confirmRemove}>Remove</ConfirmButton>
                <CancelButton onClick={cancelRemove}>Cancel</CancelButton>
              </ConfirmDialogActions>
            </ConfirmDialogBox>
          </ConfirmDialogOverlay>
        )}
      </CartContainer>
    </CartOverlay>
  );
};

export default ShoppingCart; 