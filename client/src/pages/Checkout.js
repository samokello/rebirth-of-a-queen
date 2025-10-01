import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Login from '../components/Login';
import Register from '../components/Register';
import { 
  FaArrowLeft, 
  FaCreditCard, 
  FaTruck, 
  FaMobile, 
  FaUniversity, 
  FaPaypal, 
  FaLock,
  FaCheckCircle
} from 'react-icons/fa';

const Page = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
  padding: 2rem 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const CheckoutGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CheckoutSection = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e1e2f;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

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
  color: #1e1e2f;
  font-size: 0.9rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #8B5CF6;
  }
`;

const OrderSummary = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 2rem;
`;

const OrderItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #e5e7eb;
`;

const ItemImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 0.5rem;
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const ItemName = styled.div`
  font-weight: 600;
  color: #1e1e2f;
  margin-bottom: 0.25rem;
`;

const ItemPrice = styled.div`
  color: #666;
  font-size: 0.9rem;
`;

const PriceBreakdown = styled.div`
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 2px solid #e5e7eb;
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  
  &.total {
    font-weight: 700;
    font-size: 1.2rem;
    color: #1e1e2f;
    border-top: 1px solid #e5e7eb;
    padding-top: 1rem;
    margin-top: 1rem;
  }
`;

const PlaceOrderButton = styled.button`
  width: 100%;
  background: #8B5CF6;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 0.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 2rem;
  
  &:hover {
    background: #7c3aed;
    transform: translateY(-2px);
  }
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: #8B5CF6;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

const PaymentMethodGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const PaymentMethod = styled.div`
  border: 2px solid ${props => props.selected ? '#8B5CF6' : '#e5e7eb'};
  border-radius: 0.75rem;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.selected ? '#f8f9ff' : 'white'};
  position: relative;
  
  &:hover {
    border-color: #8B5CF6;
    background: #f8f9ff;
  }
`;

const PaymentIcon = styled.div`
  width: 48px;
  height: 48px;
  background: ${props => props.color};
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const PaymentName = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e1e2f;
  margin-bottom: 0.5rem;
`;

const PaymentDescription = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin: 0;
`;

const PopularBadge = styled.div`
  position: absolute;
  top: -8px;
  right: 16px;
  background: #e74c3c;
  color: white;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
`;

const CheckIcon = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  color: #27ae60;
  font-size: 1.2rem;
`;

const Checkout = () => {
  const navigate = useNavigate();
  const { items: cart, getCartTotal, clearCart } = useCart();
  const { isAuthenticated, user, getAuthHeaders } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Kenya'
  });

  // Payment Methods
  const paymentMethods = [
    {
      id: 'mpesa',
      name: 'M-Pesa',
      description: 'Pay with M-Pesa mobile money',
      icon: <FaMobile />,
      color: '#00A86B',
      popular: true
    },
    {
      id: 'paystack',
      name: 'Paystack',
      description: 'Cards, Bank Transfer, USSD, Mobile Money',
      icon: <FaCreditCard />,
      color: '#00A86B',
      popular: true
    },
    {
      id: 'paypal',
      name: 'PayPal',
      description: 'Pay with your PayPal account',
      icon: <FaPaypal />,
      color: '#0070BA'
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      description: 'Direct bank transfer',
      icon: <FaUniversity />,
      color: '#1E3A8A'
    }
  ];

  const subtotal = getCartTotal();
  const shipping = subtotal > 10000 ? 0 : 1000; // Free shipping over KSH 10,000
  const TAX_RATE = 0.02; // 2% tax
  const tax = subtotal * TAX_RATE;
  const total = subtotal + shipping + tax;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if user is authenticated
    if (!isAuthenticated) {
      setShowLogin(true);
      return;
    }

    if (!selectedPaymentMethod) {
      alert('Please select a payment method');
      return;
    }

    if (cart.length === 0) {
      alert('Your cart is empty. Please add items to your cart before checkout.');
      return;
    }

    setIsProcessing(true);
    
    try {
      // Create order data with cart items
      const orderData = {
        items: cart, // Send cart items directly
        paymentMethod: selectedPaymentMethod,
        subtotal,
        shipping,
        tax,
        total,
        currency: 'KES',
        status: 'pending'
      };

      // Create order first
      console.log('Sending order data:', orderData);
      
      const orderResponse = await fetch('/api/shop/orders', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(orderData)
      });

      console.log('Order response status:', orderResponse.status);
      
      if (!orderResponse.ok) {
        const errorData = await orderResponse.json();
        console.error('Order creation error:', errorData);
        throw new Error(errorData.message || 'Failed to create order');
      }

      const orderResult = await orderResponse.json();
      console.log('Order created successfully:', orderResult);
      const orderId = orderResult.data.orderId;

      // Initiate payment based on selected method
      let paymentData = {
        orderId: orderId,
        paymentMethod: selectedPaymentMethod
      };

      // Add phone number for M-Pesa
      if (selectedPaymentMethod === 'mpesa') {
        paymentData.phoneNumber = formData.phone;
      }

      console.log('Sending payment data:', paymentData);
      
      const paymentResponse = await fetch('/api/payments/initiate', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(paymentData)
      });

      console.log('Payment response status:', paymentResponse.status);

      if (!paymentResponse.ok) {
        const errorData = await paymentResponse.json();
        console.error('Payment initiation error:', errorData);
        throw new Error(errorData.message || 'Failed to initiate payment');
      }

      const paymentResult = await paymentResponse.json();
      console.log('Payment initiated successfully:', paymentResult);

      // Handle different payment methods
      if (selectedPaymentMethod === 'paystack') {
        // For Paystack, redirect to payment page
        window.location.href = paymentResult.data.authorizationUrl;
        return;
      } else if (selectedPaymentMethod === 'paypal') {
        // Redirect to PayPal
        window.location.href = paymentResult.data.approvalUrl;
        return;
      } else if (selectedPaymentMethod === 'bank') {
        // Show bank transfer details
        alert(`Bank Transfer Details:\n\nBank: ${paymentResult.data.bankDetails.bankName}\nAccount: ${paymentResult.data.bankDetails.accountNumber}\nReference: ${paymentResult.data.bankDetails.reference}\nAmount: KSH ${paymentResult.data.bankDetails.amount}\n\nPlease complete the transfer and send proof to payments@rebirthofaqueen.org`);
      } else if (selectedPaymentMethod === 'mpesa') {
        // M-Pesa payment initiated
        alert('M-Pesa payment initiated! Please check your phone for the payment prompt and enter your M-Pesa PIN.');
      }

      // Clear cart and redirect to success page
      clearCart();
      navigate('/order-success', { 
        state: { 
          orderId: orderId,
          orderNumber: orderResult.data.orderNumber,
          paymentMethod: selectedPaymentMethod,
          total: total,
          paymentData: paymentResult.data
        }
      });

    } catch (error) {
      console.error('Order creation error:', error);
      alert(`Failed to place order: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  if (cart.length === 0) {
    return (
      <Page>
        <Container>
          <CheckoutSection>
            <SectionTitle>Your cart is empty</SectionTitle>
            <p>Please add some items to your cart before proceeding to checkout.</p>
            <BackButton onClick={() => navigate('/shop')}>
              <FaArrowLeft />
              Continue Shopping
            </BackButton>
          </CheckoutSection>
        </Container>
      </Page>
    );
  }

  return (
    <Page>
      {showLogin && (
        <Login 
          onClose={() => setShowLogin(false)} 
          onSwitchToRegister={() => {
            setShowLogin(false);
            setShowRegister(true);
          }}
        />
      )}
      {showRegister && (
        <Register 
          onClose={() => setShowRegister(false)} 
          onSwitchToLogin={() => {
            setShowRegister(false);
            setShowLogin(true);
          }}
        />
      )}
      <Container>
        <BackButton onClick={() => navigate('/cart')}>
          <FaArrowLeft />
          Back to Cart
        </BackButton>
        {!isAuthenticated && (
          <div style={{ 
            backgroundColor: '#fff3cd', 
            border: '1px solid #ffeaa7', 
            color: '#856404', 
            padding: '1rem', 
            borderRadius: '8px', 
            marginBottom: '1rem',
            textAlign: 'center'
          }}>
            <strong>Login Required:</strong> Please login to continue with your purchase. Your cart will be saved to your account.
          </div>
        )}

        <CheckoutGrid>
          <div>
            <CheckoutSection>
              <SectionTitle>
                <FaTruck />
                Shipping Information
              </SectionTitle>
              <Form onSubmit={handleSubmit}>
                <FormRow>
                  <FormGroup>
                    <Label>First Name *</Label>
                    <Input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Last Name *</Label>
                    <Input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </FormGroup>
                </FormRow>
                
                <FormRow>
                  <FormGroup>
                    <Label>Email *</Label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Phone *</Label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </FormGroup>
                </FormRow>

                <FormGroup>
                  <Label>Address *</Label>
                  <Input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
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
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>State/County *</Label>
                    <Input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                    />
                  </FormGroup>
                </FormRow>

                <FormRow>
                  <FormGroup>
                    <Label>ZIP Code</Label>
                    <Input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Country *</Label>
                    <Input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                    />
                  </FormGroup>
                </FormRow>
              </Form>
            </CheckoutSection>

            <CheckoutSection>
              <SectionTitle>
                <FaLock />
                Choose Payment Method
              </SectionTitle>
              
              <PaymentMethodGrid>
                {paymentMethods.map((method) => (
                  <PaymentMethod
                    key={method.id}
                    selected={selectedPaymentMethod === method.id}
                    onClick={() => setSelectedPaymentMethod(method.id)}
                  >
                    {method.popular && <PopularBadge>Popular</PopularBadge>}
                    {selectedPaymentMethod === method.id && (
                      <CheckIcon>
                        <FaCheckCircle />
                      </CheckIcon>
                    )}
                    
                    <PaymentIcon color={method.color}>
                      {method.icon}
                    </PaymentIcon>
                    
                    <PaymentName>{method.name}</PaymentName>
                    <PaymentDescription>{method.description}</PaymentDescription>
                  </PaymentMethod>
                ))}
              </PaymentMethodGrid>

              {selectedPaymentMethod === 'mpesa' && (
                <div style={{ 
                  backgroundColor: '#f8f9fa', 
                  padding: '16px', 
                  borderRadius: '8px',
                  marginTop: '16px'
                }}>
                  <h4 style={{ margin: '0 0 8px 0', color: '#2c3e50' }}>M-Pesa Payment Instructions:</h4>
                  <ol style={{ margin: 0, paddingLeft: '20px', color: '#666' }}>
                    <li>You will receive an M-Pesa prompt on your phone</li>
                    <li>Enter your M-Pesa PIN to complete payment</li>
                    <li>You will receive a confirmation SMS</li>
                  </ol>
                </div>
              )}


              {selectedPaymentMethod === 'paystack' && (
                <div style={{ 
                  backgroundColor: '#f8f9fa', 
                  padding: '16px', 
                  borderRadius: '8px',
                  marginTop: '16px'
                }}>
                  <h4 style={{ margin: '0 0 8px 0', color: '#2c3e50' }}>Paystack Payment:</h4>
                  <p style={{ margin: 0, color: '#666' }}>
                    You will be redirected to Paystack to complete your payment securely.
                    Supports cards, bank transfers, USSD, and mobile money.
                  </p>
                </div>
              )}

              {selectedPaymentMethod === 'paypal' && (
                <div style={{ 
                  backgroundColor: '#f8f9fa', 
                  padding: '16px', 
                  borderRadius: '8px',
                  marginTop: '16px'
                }}>
                  <h4 style={{ margin: '0 0 8px 0', color: '#2c3e50' }}>PayPal Payment:</h4>
                  <p style={{ margin: 0, color: '#666' }}>
                    You will be redirected to PayPal to complete your payment securely.
                  </p>
                </div>
              )}

              {selectedPaymentMethod === 'bank' && (
                <div style={{ 
                  backgroundColor: '#f8f9fa', 
                  padding: '16px', 
                  borderRadius: '8px',
                  marginTop: '16px'
                }}>
                  <h4 style={{ margin: '0 0 8px 0', color: '#2c3e50' }}>Bank Transfer Details:</h4>
                  <div style={{ color: '#666', fontSize: '14px' }}>
                    <p><strong>Bank:</strong> Equity Bank Kenya</p>
                    <p><strong>Account Name:</strong> Rebirth of a Queen</p>
                    <p><strong>Account Number:</strong> 1234567890</p>
                    <p><strong>Branch Code:</strong> 001</p>
                    <p style={{ marginTop: '8px', fontStyle: 'italic' }}>
                      Please include your order number in the reference field.
                    </p>
                  </div>
                </div>
              )}
            </CheckoutSection>
          </div>

          <OrderSummary>
            <SectionTitle>Order Summary</SectionTitle>
            
            {cart.map((item) => (
              <OrderItem key={item.product._id}>
                <ItemImage 
                  src={item.product.images?.[0]?.url || '/placeholder.jpg'} 
                  alt={item.product.name} 
                />
                <ItemInfo>
                  <ItemName>{item.product.name}</ItemName>
                  <ItemPrice>KSH {item.product.price.toFixed(0)} x {item.quantity}</ItemPrice>
                </ItemInfo>
                <div>KSH {(item.product.price * item.quantity).toFixed(0)}</div>
              </OrderItem>
            ))}

            <PriceBreakdown>
              <PriceRow>
                <span>Subtotal</span>
                <span>KSH {subtotal.toFixed(0)}</span>
              </PriceRow>
              <PriceRow>
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `KSH ${shipping.toFixed(0)}`}</span>
              </PriceRow>
              <PriceRow>
                <span>Tax (2%)</span>
                <span>KSH {tax.toFixed(0)}</span>
              </PriceRow>
              <PriceRow className="total">
                <span>Total</span>
                <span>KSH {total.toFixed(0)}</span>
              </PriceRow>
            </PriceBreakdown>

            <PlaceOrderButton
              onClick={handleSubmit}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : `Place Order - KSH ${total.toFixed(0)}`}
            </PlaceOrderButton>
          </OrderSummary>
        </CheckoutGrid>
      </Container>
    </Page>
  );
};

export default Checkout; 