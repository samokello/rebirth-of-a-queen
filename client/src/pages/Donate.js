import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// --- Styled Components ---
const Page = styled.div`
  min-height: 100vh;

  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 3rem 1rem;
`;

const DonationCard = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 1.5rem;
  max-width: 560px;
  width: 100%;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
`;

/* Progress Bar */
const ProgressWrapper = styled.div`
  margin-bottom: 1.5rem;
`;

const ProgressText = styled.div`
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.4rem;
`;

const ProgressBar = styled.div`
  background: #e5e7eb;
  border-radius: 9999px;
  height: 14px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #7c3aed, #8b5cf6);
  width: ${({ progress }) => progress}%;
  transition: width 0.4s ease;
`;

/* Recent Donors */
const DonorCarouselWrapper = styled.div`
  margin: 1.5rem 0;
  .slick-slider {
    max-width: 100%;
  }
  .slick-slide {
    padding: 0 6px;
  }
`;

const DonorCard = styled.div`
  background: #f9fafb;
  border-radius: 8px;
  padding: 0.6rem 0.8rem;
  text-align: center;
  font-size: 0.85rem;
  font-weight: 600;
  color: #374151;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
`;

const DonorAvatar = styled.div`
  width: 42px;
  height: 42px;
  background: #7c3aed;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 0.4rem;
  font-weight: bold;
  font-size: 0.9rem;
`;

/* Amount + Toggle */
const AmountSection = styled.div`
  margin: 1.5rem 0;
`;

const AmountButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.6rem;
  margin-bottom: 0.8rem;
`;

const AmountButton = styled.button`
  flex: 1;
  background: ${({ selected }) =>
    selected ? "linear-gradient(135deg, #8b5cf6, #7c3aed)" : "#f3e8ff"};
  color: ${({ selected }) => (selected ? "#fff" : "#7c3aed")};
  border: none;
  border-radius: 10px;
  padding: 0.6rem 1rem;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    background: ${({ selected }) =>
      selected ? "#6d28d9" : "rgba(124,58,237,0.1)"};
  }
`;

const CustomInput = styled.input`
  width: 100%;
  padding: 0.6rem;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 1rem;
  margin-bottom: 0.6rem;
`;

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-top: 0.8rem;
`;

const ToggleLabel = styled.label`
  font-size: 0.9rem;
  font-weight: 600;
  color: #374151;
  cursor: pointer;
`;

const ToggleSwitch = styled.div`
  position: relative;
  width: 46px;
  height: 24px;
  background: ${({ active }) => (active ? "#7c3aed" : "#d1d5db")};
  border-radius: 9999px;
  cursor: pointer;
  transition: background 0.3s ease;
  &::after {
    content: "";
    position: absolute;
    top: 3px;
    left: ${({ active }) => (active ? "24px" : "3px")};
    width: 18px;
    height: 18px;
    background: white;
    border-radius: 50%;
    transition: left 0.3s ease;
  }
`;

const ToggleHelper = styled.div`
  font-size: 0.8rem;
  color: #6b7280;
  margin-left: 52px;
  margin-top: -4px;
`;


/* Payment Box */
const PaymentBox = styled.div`
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.2rem;
  text-align: center;
  margin-bottom: 1.5rem;
`;

/* Impact */
const ImpactSection = styled.div`
  background: #f0fdf4;
  border-radius: 12px;
  padding: 1.5rem;
  border: 2px solid #bbf7d0;
  margin-bottom: 1.5rem;
`;

const ImpactTitle = styled.h3`
  color: #166534;
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

/* FAQ */
const FAQSection = styled.div`
  background: #fef7ff;
  border-radius: 12px;
  padding: 1.5rem;
  border: 2px solid #e9d5ff;
`;

const FAQTitle = styled.h3`
  color: #7c3aed;
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const FAQItem = styled.div`
  margin-bottom: 0.8rem;
  border: 1px solid #e9d5ff;
  border-radius: 6px;
`;

const FAQQuestion = styled.div`
  background: #faf5ff;
  padding: 0.8rem;
  cursor: pointer;
  font-weight: 600;
  color: #7c3aed;
`;

const FAQAnswer = styled.div`
  padding: 0.8rem;
  background: #fff;
  color: #444;
`;

/* Contact */
const ContactCallout = styled.div`
  text-align: center;
  background: #fef3c7;
  border-radius: 12px;
  padding: 1.2rem;
  border: 2px solid #fbbf24;
  color: #92400e;
  margin-top: 1.5rem;
`;


const Donate = () => {
  const [selectedAmount, setSelectedAmount] = useState(25);
  const [customAmount, setCustomAmount] = useState("");
  const [isMonthly, setIsMonthly] = useState(false);
  const [activeTab, setActiveTab] = useState("");
  const [faqOpen, setFaqOpen] = useState(null);
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [paystackConfig, setPaystackConfig] = useState(null);
  const [donationStats, setDonationStats] = useState({
    totalRaised: 0,
    totalDonations: 0,
    recentDonors: []
  });

  const goal = 100000; // $100,000 goal
  const progress = (donationStats.totalRaised / goal) * 100;

  const fetchDonationStats = async () => {
    try {
      const response = await fetch('/api/donations/public/stats');
      const data = await response.json();
      if (data.success) {
        setDonationStats(data.data);
      }
    } catch (error) {
      console.error('Error fetching donation stats:', error);
    }
  };

  const fetchPaymentMethods = useCallback(async () => {
    try {
      const response = await fetch('/api/payments/methods');
      const data = await response.json();
      if (data.success) {
        setPaymentMethods(data.data);
        // Set the first available payment method as active
        if (data.data.length > 0 && !activeTab) {
          setActiveTab(data.data[0].id);
        }
      }
    } catch (error) {
      console.error('Error fetching payment methods:', error);
      // Fallback to default payment methods if API fails
      setPaymentMethods([
        { id: 'paystack', name: 'Paystack', description: 'Cards, Bank Transfer, USSD, Mobile Money', icon: '💳', color: '#00A86B', available: true },
        { id: 'mpesa', name: 'M-Pesa', description: 'Mobile Money', icon: '📱', color: '#00A86B', available: true }
      ]);
      if (!activeTab) {
        setActiveTab('paystack');
      }
    }
  }, [activeTab]);

  const fetchPaystackConfig = async () => {
    try {
      const response = await fetch('/api/paystack/config');
      const data = await response.json();
      if (data.success) {
        setPaystackConfig(data.data);
      }
    } catch (error) {
      console.error('Error fetching Paystack config:', error);
    }
  };

  // Fetch donation statistics and payment methods on component mount
  useEffect(() => {
    fetchDonationStats();
    fetchPaymentMethods();
    fetchPaystackConfig();
  }, [fetchPaymentMethods]);


  const getPaymentMethodsText = () => {
    if (paymentMethods.length === 0) return "We accept secure payment methods.";
    const methodNames = paymentMethods.map(method => method.name).join(", ");
    return `We accept ${methodNames}.`;
  };

  const getCurrencySymbol = (methodId) => {
    switch (methodId) {
      case 'paystack':
        return paystackConfig?.currency === 'USD' ? '$' : '₦';
      case 'paypal':
        return '$';
      case 'mpesa':
        return 'KSh';
      default:
        return '₦';
    }
  };

  const faqs = [
    { q: "Is my donation tax deductible?", a: "Yes, within Kenyan law." },
    { q: "What payment methods do you accept?", a: getPaymentMethodsText() },
    { q: "Can I donate with mobile money?", a: "Yes! Mobile money options are available for secure donations." },
    { q: "What impact will my donation have?", a: "Education, health, and empowerment programs." },
    { q: "Is my payment information secure?", a: "Yes! We use secure payment processing. Your payment details are never stored on our servers." },
    { q: "Do you accept international payments?", a: "Yes! We accept payments from around the world through our secure payment methods." },
  ];

  const handleUnifiedPayment = async (paymentMethod) => {
    // Validate required fields based on payment method
    const currentMethod = paymentMethods.find(method => method.id === paymentMethod);
    
    if (currentMethod?.requiresEmail && !email) {
      alert(`Please enter your email address for ${currentMethod.name} payment.`);
      return;
    }

    if (currentMethod?.requiresPhone && !phone) {
      alert(`Please enter your phone number for ${currentMethod.name} payment.`);
      return;
    }

    setLoading(true);
    try {
      const amount = customAmount || selectedAmount || 10;
      console.log('Initializing unified payment:', { amount, paymentMethod, email, firstName, lastName, phone });

      const response = await fetch('/api/payments/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: parseFloat(amount),
          paymentMethod: paymentMethod,
          email: email,
          firstName: firstName,
          lastName: lastName,
          phone: phone,
          currency: currentMethod?.currency || 'NGN'
        })
      });

      const data = await response.json();
      console.log('Unified payment initialization response:', data);

      if (data.success) {
        // Handle different payment method responses
        switch (paymentMethod) {
          case 'paystack':
            // Redirect to Paystack payment page
            window.location.href = data.data.authorizationUrl;
            break;
          
          case 'paypal':
            // Redirect to PayPal payment page
            window.location.href = data.data.approvalUrl;
            break;
          
          case 'mpesa':
            // Show M-Pesa success message
            alert(`M-Pesa payment initiated! ${data.data.customerMessage}\n\nReference: ${data.data.checkoutRequestId}`);
            // Refresh donation stats
            setTimeout(() => {
              fetchDonationStats();
            }, 2000);
            break;
          
          case 'bank':
            // Show bank transfer details
            showBankTransferDetails(data.data);
            break;
          
          default:
            alert('Payment initiated successfully!');
        }
      } else {
        if (data.setupRequired) {
          alert(`Setup Required: ${data.message}\n\nPlease configure the required API keys in the server environment variables.`);
        } else {
          alert(`Payment failed: ${data.message}`);
        }
      }
    } catch (error) {
      console.error('Unified payment error:', error);
      alert("Error connecting to payment service.");
    } finally {
      setLoading(false);
    }
  };

  const showBankTransferDetails = (bankData) => {
    const bankDetails = bankData.bankDetails;
    const instructions = bankData.instructions;
    
    const message = `
Bank Transfer Details:

Bank: ${bankDetails.bankName}
Account Name: ${bankDetails.accountName}
Account Number: ${bankDetails.accountNumber}
Branch Code: ${bankDetails.branchCode}
Swift Code: ${bankDetails.swiftCode}
Reference: ${bankDetails.reference}

Instructions:
${instructions.map((instruction, index) => `${index + 1}. ${instruction}`).join('\n')}

Please keep this reference number for your records.
    `;
    
    alert(message);
    
    // Refresh donation stats
    setTimeout(() => {
      fetchDonationStats();
    }, 2000);
  };



  return (
    <Page>



      <DonationCard>
        
{/* Logo + Intro */}
<div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
  <img 
    src="https://res.cloudinary.com/samokello/image/upload/v1758147536/rebirth-of-a-queen/images/logo_jwavy0.jpg" 
    alt="Rebirth of a Queen Foundation" 
    style={{ height: "70px", marginBottom: "0.5rem" }}
  />
  <h2 style={{ color: "#7c3aed", fontWeight: "800" }}>
    Rebirth of a Queen Foundation
  </h2>
  <p style={{ color: "#374151", maxWidth: "600px", margin: "0 auto" }}>
    Every donation you make helps us empower survivors, educate girls, 
    and create a safer community. Together, we can make a difference.
  </p>
</div>

        {/* Progress Bar */}
        <ProgressWrapper>
          <ProgressText>${donationStats.totalRaised.toLocaleString()} raised of ${goal.toLocaleString()} goal</ProgressText>
          <ProgressBar>
            <ProgressFill progress={progress} />
          </ProgressBar>
        </ProgressWrapper>

        {/* Recent Donors */}
        {donationStats.recentDonors.length > 0 && (
        <DonorCarouselWrapper>
            <h4 style={{ color: "#7c3aed", marginBottom: "1rem", textAlign: "center" }}>
              Recent Donors
            </h4>
          <Slider
            dots={false}
            arrows={false}
            infinite
            autoplay
              autoplaySpeed={3000}
            slidesToShow={3}
            slidesToScroll={1}
            responsive={[
              { breakpoint: 768, settings: { slidesToShow: 2 } },
              { breakpoint: 480, settings: { slidesToShow: 1 } },
            ]}
          >
              {donationStats.recentDonors.map((donor, i) => (
              <DonorCard key={i}>
                  <DonorAvatar>{donor.name.charAt(0).toUpperCase()}</DonorAvatar>
                  {donor.name}
                  <div style={{ fontSize: "0.7rem", color: "#6b7280", marginTop: "0.2rem" }}>
                    ${donor.amount}
                  </div>
              </DonorCard>
            ))}
          </Slider>
        </DonorCarouselWrapper>
        )}

        {/* Amount Section */}
        <AmountSection>
          <h3 style={{ color: "#7c3aed" }}>Choose your amount</h3>
          <AmountButtons>
            {[5, 10, 20, 50,100].map((amt) => (
              <AmountButton
                key={amt}
                selected={selectedAmount === amt && !customAmount}
                onClick={() => {
                  setSelectedAmount(amt);
                  setCustomAmount("");
                }}
              >
                ${amt}
              </AmountButton>
            ))}
          </AmountButtons>
          <CustomInput
            type="number"
            placeholder="Enter custom amount"
            value={customAmount}
            onChange={(e) => {
              setCustomAmount(e.target.value);
              setSelectedAmount(null);
            }}
          />

          {/* Monthly Toggle */}
          <ToggleWrapper onClick={() => setIsMonthly(!isMonthly)}>
            <ToggleSwitch active={isMonthly} />
            <ToggleLabel>Make this a monthly gift</ToggleLabel>
          </ToggleWrapper>
          {isMonthly && (
            <ToggleHelper>
              Your card will be billed monthly until you cancel.
            </ToggleHelper>
          )}
        </AmountSection>

        {/* Payment Methods */}
        <div style={{ margin: "1rem 0" }}>
          <h3 style={{ color: "#7c3aed", marginBottom: "0.6rem" }}>Choose Payment Method</h3>
          <div style={{ 
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "0.5rem",
            marginBottom: "0.8rem"
          }}>
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setActiveTab(method.id)}
                disabled={!method.available}
                style={{
                  background: activeTab === method.id ? method.color : "#f3f4f6",
                  color: activeTab === method.id ? "#fff" : "#374151",
                  border: "none",
                  borderRadius: "10px",
                  padding: "0.6rem 0.8rem",
                  cursor: method.available ? "pointer" : "not-allowed",
                  fontWeight: "600",
                  opacity: method.available ? 1 : 0.6,
                  fontSize: "0.9rem"
                }}
              >
                {method.icon} {method.name}
              </button>
            ))}
          </div>
        </div>



        {/* Dynamic Payment Method Sections */}
        {paymentMethods.map((method) => {
          if (activeTab !== method.id || !method.available) return null;
          
          return (
            <PaymentBox key={method.id}>
              <h4 style={{ color: method.color, marginBottom: "0.8rem" }}>
                {method.icon} Pay with {method.name}
              </h4>
              <p style={{ fontSize: "0.9rem", color: "#6b7280", marginBottom: "1rem" }}>
                {method.description}
              </p>
              
              {/* Donor information */}
              <div style={{ marginBottom: "0.8rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem" }}>
                <input
                  type="text"
                  placeholder="First Name (optional)"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.6rem",
                    borderRadius: "8px",
                    border: "1px solid #ddd"
                  }}
                />
                <input
                  type="text"
                  placeholder="Last Name (optional)"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.6rem",
                    borderRadius: "8px",
                    border: "1px solid #ddd"
                  }}
                />
                <input
                  type="email"
                  placeholder={`Email ${method.requiresEmail ? '(required)' : '(optional)'}`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    gridColumn: "1 / -1",
                    width: "100%",
                    padding: "0.6rem",
                    borderRadius: "8px",
                    border: "1px solid #ddd"
                  }}
                />
                {method.requiresPhone && (
                  <input
                    type="tel"
                    placeholder={`Phone Number (required for ${method.name})`}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{
                      gridColumn: "1 / -1",
                      width: "100%",
                      padding: "0.6rem",
                      borderRadius: "8px",
                      border: "1px solid #ddd"
                    }}
                  />
                )}
              </div>

              <button
                onClick={() => handleUnifiedPayment(method.id)}
                disabled={
                  loading || 
                  (method.requiresEmail && !email) ||
                  (method.requiresPhone && !phone) ||
                  (method.id === 'mpesa' && (!firstName || !lastName))
                }
                style={{
                  background: (
                    loading || 
                    (method.requiresEmail && !email) ||
                    (method.requiresPhone && !phone) ||
                    (method.id === 'mpesa' && (!firstName || !lastName))
                  ) ? "#9ca3af" : method.color,
                  color: "#fff",
                  padding: "0.8rem 1.5rem",
                  border: "none",
                  borderRadius: "8px",
                  cursor: (
                    loading || 
                    (method.requiresEmail && !email) ||
                    (method.requiresPhone && !phone) ||
                    (method.id === 'mpesa' && (!firstName || !lastName))
                  ) ? "not-allowed" : "pointer",
                  fontWeight: "600",
                  width: "100%",
                  fontSize: "1rem"
                }}
              >
                {loading ? "Processing..." : `Pay ${getCurrencySymbol(method.id)}${customAmount || selectedAmount || 10} with ${method.name}`}
              </button>
              
              {!method.configured && (
                <div style={{
                  backgroundColor: '#fef3c7',
                  border: '1px solid #f59e0b',
                  borderRadius: '6px',
                  padding: '0.5rem',
                  marginTop: '0.5rem',
                  fontSize: '0.8rem',
                  color: '#92400e'
                }}>
                  ⚠️ {method.name} requires configuration. Please add API keys to enable payments.
                </div>
              )}
              
              <p style={{ fontSize: "0.8rem", marginTop: "0.5rem", color: "#374151" }}>
                Secure payment processing. Your payment details are never stored on our servers.
              </p>
            </PaymentBox>
          );
        })}

        {/* Impact */}
        <ImpactSection>
          <ImpactTitle>Impact of Your Gift</ImpactTitle>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.6rem' }}>
            {[
              { amt: 25, text: 'School supplies for a girl' },
              { amt: 50, text: 'Feeds a family for a month' },
              { amt: 100, text: 'Installs a handwashing station' }
            ].map((i) => (
              <div key={i.amt} style={{ background: '#fff', border: '1px solid #bbf7d0', borderRadius: 10, padding: '0.8rem', textAlign: 'center' }}>
                <div style={{ fontWeight: 800, color: '#166534' }}>${i.amt}</div>
                <div style={{ fontSize: '0.9rem', color: '#166534' }}>{i.text}</div>
              </div>
            ))}
          </div>
        </ImpactSection>

        {/* FAQ */}
        <FAQSection>
          <FAQTitle>Frequently Asked Questions</FAQTitle>
          {faqs.map((faq, i) => (
            <FAQItem key={i}>
              <FAQQuestion onClick={() => setFaqOpen(faqOpen === i ? null : i)}>
                {faq.q}
              </FAQQuestion>
              {faqOpen === i && <FAQAnswer>{faq.a}</FAQAnswer>}
            </FAQItem>
          ))}
        </FAQSection>

        {/* Contact */}
        <ContactCallout>
          Questions? Email us at <strong>info@rebirthofaqueen.org</strong>
        </ContactCallout>
      </DonationCard>
    </Page>
  );
};

export default Donate;
