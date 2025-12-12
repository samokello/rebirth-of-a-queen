import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { API_MAIN } from '../api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { 
  FaCreditCard, 
  FaMobile, 
  FaUniversity, 
  FaLock,
  FaCheckCircle,
  FaUser,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaShieldAlt,
  FaGift,
  FaPlus,
  FaMinus
} from 'react-icons/fa';

// Professional Checkout Page Container
const CheckoutPage = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

// Progress Steps
const ProgressContainer = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const ProgressSteps = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 2px;
    background: #e5e7eb;
    z-index: 1;
  }
`;

const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
  background: white;
  padding: 0 1rem;
`;

const StepCircle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.$active ? '#667eea' : props.$completed ? '#10b981' : '#e5e7eb'};
  color: ${props => props.$active || props.$completed ? 'white' : '#9ca3af'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  margin-bottom: 0.5rem;
  transition: all 0.3s ease;
`;

const StepLabel = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${props => props.$active ? '#667eea' : props.$completed ? '#10b981' : '#9ca3af'};
  text-align: center;
`;

// Main Checkout Grid
const CheckoutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 2rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

// Checkout Form Section
const CheckoutSection = styled(motion.div)`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f3f4f6;
`;

const SectionIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e1e2f;
  margin: 0;
`;

const SectionSubtitle = styled.p`
  color: #6b7280;
  margin: 0;
  font-size: 0.9rem;
`;

// Form Styles
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 600;
  color: #374151;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Input = styled.input`
  padding: 0.875rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: #fafafa;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    background: white;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
  
  &::placeholder {
    color: #9ca3af;
  }
`;

const Select = styled.select`
  padding: 0.875rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 1rem;
  background: #fafafa;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    background: white;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const TextArea = styled.textarea`
  padding: 0.875rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 1rem;
  background: #fafafa;
  min-height: 100px;
  resize: vertical;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    background: white;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

// Payment Methods
const PaymentMethods = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const PaymentMethod = styled.div`
  border: 2px solid ${props => props.$selected ? '#667eea' : '#e5e7eb'};
  border-radius: 12px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.$selected ? '#f8faff' : 'white'};
  
  &:hover {
    border-color: #667eea;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
  }
`;

const PaymentIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: ${props => props.$color || '#667eea'};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const PaymentName = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e1e2f;
  margin: 0 0 0.5rem 0;
`;

const PaymentDescription = styled.p`
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0;
`;

const PaymentBadge = styled.span`
  background: #10b981;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  margin-top: 0.5rem;
  display: inline-block;
`;

// Order Summary
const OrderSummary = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 2rem;
  height: fit-content;
`;

const SummaryHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f3f4f6;
`;

const SummaryTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e1e2f;
  margin: 0;
`;

const OrderItems = styled.div`
  margin-bottom: 2rem;
`;

const OrderItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #f3f4f6;
  
  &:last-child {
    border-bottom: none;
  }
`;

const ItemImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
  background: #f3f4f6;
`;

const ItemDetails = styled.div`
  flex: 1;
`;

const ItemName = styled.h4`
  font-size: 0.9rem;
  font-weight: 600;
  color: #1e1e2f;
  margin: 0 0 0.25rem 0;
`;

const ItemPrice = styled.p`
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0;
`;

const ItemQuantity = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const QuantityButton = styled.button`
  width: 24px;
  height: 24px;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  background: white;
  color: #6b7280;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #667eea;
    color: #667eea;
  }
`;

const QuantityInput = styled.input`
  width: 40px;
  text-align: center;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  padding: 0.25rem;
  font-size: 0.875rem;
`;

const PriceSummary = styled.div`
  margin-top: 2rem;
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  color: #6b7280;
  
  &.total {
    border-top: 2px solid #e5e7eb;
    font-weight: 700;
    font-size: 1.1rem;
    color: #1e1e2f;
    margin-top: 1rem;
  }
`;

const CheckoutButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SecurityBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #10b981;
  font-size: 0.875rem;
  font-weight: 600;
  margin-top: 1rem;
  justify-content: center;
`;

// Loading and Success States
const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const LoadingContent = styled.div`
  background: white;
  border-radius: 16px;
  padding: 3rem;
  text-align: center;
  max-width: 400px;
  width: 90%;
`;

const LoadingSpinner = styled.div`
  width: 48px;
  height: 48px;
  border: 4px solid #e5e7eb;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.h3`
  color: #1e1e2f;
  margin: 0 0 0.5rem 0;
`;

const LoadingSubtext = styled.p`
  color: #6b7280;
  margin: 0;
`;

// Professional Checkout Component
const ProfessionalCheckout = () => {
  const navigate = useNavigate();
  const { items: cart, getCartTotal, updateQuantity, removeFromCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const { showSuccess, showError } = useNotification();
  
  // State management
  const [currentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [availableMethods, setAvailableMethods] = useState([]);
  
  // Form data
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address?.street || '',
    city: user?.address?.city || '',
    state: user?.address?.state || 'Nairobi',
    zipCode: user?.address?.postalCode || '',
    country: user?.address?.country || 'Kenya',
    deliveryInstructions: ''
  });

  // Payment methods configuration
  const paymentMethods = [
    {
      id: 'paystack',
      name: 'Paystack',
      description: 'Pay with card, bank transfer, or mobile money',
      icon: <FaCreditCard />,
      color: '#667eea',
      badge: 'Recommended'
    },
    {
      id: 'mpesa',
      name: 'M-Pesa',
      description: 'Pay directly with your M-Pesa account',
      icon: <FaMobile />,
      color: '#00a86b'
    },
    {
      id: 'bank_transfer',
      name: 'Bank Transfer',
      description: 'Direct bank transfer to our account',
      icon: <FaUniversity />,
      color: '#1f2937'
    }
  ];

  // Load available payment methods
  useEffect(() => {
    const loadPaymentMethods = async () => {
      try {
        const { data } = await API_MAIN.get('/payments/methods');
        if (data?.success) {
          setAvailableMethods(data.data || paymentMethods);
        } else {
          setAvailableMethods(paymentMethods);
        }
      } catch (error) {
        console.log('Using default payment methods');
        setAvailableMethods(paymentMethods);
      }
    };
    
    loadPaymentMethods();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { returnUrl: '/checkout' } });
    }
  }, [isAuthenticated, navigate]);

  // Redirect if cart is empty
  useEffect(() => {
    if (cart.length === 0) {
      navigate('/cart');
    }
  }, [cart.length, navigate]);

  // Calculate totals
  const subtotal = getCartTotal();
  const shipping = subtotal >= 2000 ? 0 : 200;
  const tax = subtotal * 0.16; // 16% VAT
  const total = subtotal + shipping + tax;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePaymentMethodSelect = (methodId) => {
    setSelectedPaymentMethod(methodId);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity);
    } else {
      removeFromCart(productId);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("clicked")
    if (!selectedPaymentMethod) {
      showError('Error', 'Please select a payment method');
      return;
    }

    setIsProcessing(true);
    
    try {
      // Create order data
      const orderData = {
        items: cart.map(item => ({
          product: item.product._id,
          quantity: item.quantity
        })),
        paymentMethod: selectedPaymentMethod,
        subtotal,
        shippingCost: shipping,
        tax,
        total,
        currency: 'KES',
        status: 'pending',
        customer: formData
      };

      // Create order
      const { data: orderResult } = await API_MAIN.post('/shop/orders', orderData);
      const orderId = orderResult.data.orderId;

      // Process payment based on method
      if (selectedPaymentMethod === 'paystack') {
        const { data: initRes } = await API_MAIN.post('/payment/initialize', { orderId });
        if (initRes?.status) {
          window.location.href = initRes.data.authorizationUrl;
          return;
        }
      }

      if (selectedPaymentMethod === 'mpesa') {
        const { data: mpesaRes } = await API_MAIN.post('/mpesa/stk-push', {
          orderId,
          phone: formData.phone,
          amount: total
        });
        
        if (mpesaRes?.success) {
          showSuccess('Success', 'M-Pesa payment initiated. Check your phone for payment prompt.');
          navigate(`/order-confirmation/${orderId}`);
          return;
        }
      }

      // For bank transfer
      if (selectedPaymentMethod === 'bank_transfer') {
        showSuccess('Success', 'Order created successfully. You will receive bank details via email.');
        navigate(`/order-confirmation/${orderId}`);
        return;
      }

    } catch (error) {
      console.error('Checkout error:', error);
      showError('Error', 'Failed to process checkout. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const steps = [
    { id: 1, label: 'Information', icon: <FaUser /> },
    { id: 2, label: 'Payment', icon: <FaCreditCard /> },
    { id: 3, label: 'Review', icon: <FaCheckCircle /> }
  ];

  if (!isAuthenticated || cart.length === 0) {
    return null;
  }

  return (
    <CheckoutPage>
      <Container>
        {/* Progress Steps */}
        <ProgressContainer>
          <ProgressSteps>
            {steps.map((step) => (
              <Step key={step.id}>
                <StepCircle 
                  $active={currentStep === step.id}
                  $completed={currentStep > step.id}
                >
                  {currentStep > step.id ? <FaCheckCircle /> : step.icon}
                </StepCircle>
                <StepLabel 
                  $active={currentStep === step.id}
                  $completed={currentStep > step.id}
                >
                  {step.label}
                </StepLabel>
              </Step>
            ))}
          </ProgressSteps>
        </ProgressContainer>

        <CheckoutGrid>
          {/* Checkout Form */}
          <div>
            <CheckoutSection
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <SectionHeader>
                <SectionIcon>
                  <FaUser />
                </SectionIcon>
                <div>
                  <SectionTitle>Contact Information</SectionTitle>
                  <SectionSubtitle>We'll use this information to contact you about your order</SectionSubtitle>
                </div>
              </SectionHeader>

              <Form onSubmit={handleSubmit}>
                <FormRow>
                  <FormGroup>
                    <Label>
                      <FaUser />
                      First Name *
                    </Label>
                    <Input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your first name"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>
                      <FaUser />
                      Last Name *
                    </Label>
                    <Input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your last name"
                    />
                  </FormGroup>
                </FormRow>

                <FormRow>
                  <FormGroup>
                    <Label>
                      <FaEnvelope />
                      Email Address *
                    </Label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your email"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>
                      <FaPhone />
                      Phone Number *
                    </Label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your phone number"
                    />
                  </FormGroup>
                </FormRow>

                <FormGroup>
                  <Label>
                    <FaMapMarkerAlt />
                    Delivery Address *
                  </Label>
                  <Input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your delivery address"
                  />
                </FormGroup>

                <FormRow>
                  <FormGroup>
                    <Label>City *</Label>
                    <Input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your city"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>State/County *</Label>
                    <Select
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="Nairobi">Nairobi</option>
                      <option value="Mombasa">Mombasa</option>
                      <option value="Kisumu">Kisumu</option>
                      <option value="Nakuru">Nakuru</option>
                      <option value="Eldoret">Eldoret</option>
                      <option value="Thika">Thika</option>
                      <option value="Malindi">Malindi</option>
                      <option value="Kitale">Kitale</option>
                    </Select>
                  </FormGroup>
                </FormRow>

                <FormRow>
                  <FormGroup>
                    <Label>Postal Code</Label>
                    <Input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      placeholder="Enter postal code"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Country</Label>
                    <Select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                    >
                      <option value="Kenya">Kenya</option>
                      <option value="Uganda">Uganda</option>
                      <option value="Tanzania">Tanzania</option>
                    </Select>
                  </FormGroup>
                </FormRow>

                <FormGroup>
                  <Label>Delivery Instructions (Optional)</Label>
                  <TextArea
                    name="deliveryInstructions"
                    value={formData.deliveryInstructions}
                    onChange={handleInputChange}
                    placeholder="Any special delivery instructions..."
                  />
                </FormGroup>

                {/* Payment Methods */}
                <div style={{ marginTop: '2rem' }}>
                  <SectionHeader>
                    <SectionIcon>
                      <FaCreditCard />
                    </SectionIcon>
                    <div>
                      <SectionTitle>Payment Method</SectionTitle>
                      <SectionSubtitle>Choose your preferred payment method</SectionSubtitle>
                    </div>
                  </SectionHeader>

                  <PaymentMethods>
                    {availableMethods.map((method) => (
                      <PaymentMethod
                        key={method.id}
                        $selected={selectedPaymentMethod === method.id}
                        onClick={() => handlePaymentMethodSelect(method.id)}
                      >
                        <PaymentIcon $color={method.color}>
                          {method.icon}
                        </PaymentIcon>
                        <PaymentName>{method.name}</PaymentName>
                        <PaymentDescription>{method.description}</PaymentDescription>
                        {method.badge && <PaymentBadge>{method.badge}</PaymentBadge>}
                      </PaymentMethod>
                    ))}
                  </PaymentMethods>
                </div>
              </Form>
            </CheckoutSection>
          </div>

          {/* Order Summary */}
          <OrderSummary>
            <SummaryHeader>
              <SectionIcon>
                <FaGift />
              </SectionIcon>
              <SummaryTitle>Order Summary</SummaryTitle>
            </SummaryHeader>

            <OrderItems>
              {cart.map((item) => (
                <OrderItem key={item.product._id}>
                  <ItemImage 
                    src={item.product.image || '/images/placeholder.jpg'} 
                    alt={item.product.name}
                  />
                  <ItemDetails>
                    <ItemName>{item.product.name}</ItemName>
                    <ItemPrice>KSh {item.product.price.toLocaleString()}</ItemPrice>
                    <ItemQuantity>
                      <QuantityButton 
                        onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)}
                      >
                        <FaMinus />
                      </QuantityButton>
                      <QuantityInput 
                        type="number" 
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.product._id, parseInt(e.target.value))}
                        min="1"
                      />
                      <QuantityButton 
                        onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}
                      >
                        <FaPlus />
                      </QuantityButton>
                    </ItemQuantity>
                  </ItemDetails>
                </OrderItem>
              ))}
            </OrderItems>

            <PriceSummary>
              <PriceRow>
                <span>Subtotal</span>
                <span>KSh {subtotal.toLocaleString()}</span>
              </PriceRow>
              <PriceRow>
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `KSh ${shipping.toLocaleString()}`}</span>
              </PriceRow>
              <PriceRow>
                <span>Tax (16%)</span>
                <span>KSh {tax.toLocaleString()}</span>
              </PriceRow>
              <PriceRow className="total">
                <span>Total</span>
                <span>KSh {total.toLocaleString()}</span>
              </PriceRow>
            </PriceSummary>

            <CheckoutButton 
              type="submit" 
              disabled={!selectedPaymentMethod || isProcessing}
              onClick={handleSubmit}
              
            >
              <FaLock />
              {isProcessing ? 'Processing...' : 'Complete Order'}
            </CheckoutButton>

            <SecurityBadge>
              <FaShieldAlt />
              <span>Secure Payment Protected</span>
            </SecurityBadge>
          </OrderSummary>
        </CheckoutGrid>
      </Container>

      {/* Loading Overlay */}
      <AnimatePresence>
        {isProcessing && (
          <LoadingOverlay>
            <LoadingContent>
              <LoadingSpinner />
              <LoadingText>Processing Your Order</LoadingText>
              <LoadingSubtext>Please wait while we process your payment...</LoadingSubtext>
            </LoadingContent>
          </LoadingOverlay>
        )}
      </AnimatePresence>
    </CheckoutPage>
  );
};

export default ProfessionalCheckout;
