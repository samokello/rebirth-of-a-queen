import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaHandHoldingHeart, FaPaypal, FaCopy, FaCheckCircle, FaBook, FaUserGraduate, FaHeartbeat, FaQuestionCircle, FaChevronDown, FaChevronUp, FaEnvelope, FaUniversity } from 'react-icons/fa';

// PayPal Client ID
const PAYPAL_CLIENT_ID = 'AVQ_dNt1xq5FpYS4BSlof50o62ww9QcJhUD35g_70nfDfLsap379y6Sr2Uy4xZOwvrHhIfH2CQVYdSYP';

const Page = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 1.5rem 1rem 2rem 1rem;
  background: #fff;
`;

const Hero = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
`;

const Headline = styled.h1`
  font-size: 2rem;
  font-weight: 900;
  color: #7C3AED;
  margin-bottom: 0.5rem;
`;

const Subheading = styled.p`
  font-size: 1.1rem;
  color: #444;
  margin-bottom: 1rem;
`;

const PayPalFund = styled.a`
  display: inline-block;
  background: #fff;
  color: #0070ba;
  border: 2px solid #0070ba;
  border-radius: 8px;
  padding: 0.5rem 1.2rem;
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-decoration: none;
  transition: background 0.18s, color 0.18s;
  &:hover {
    background: #0070ba;
    color: #fff;
  }
`;

const Form = styled.form`
  background: #f8f5ff;
  border-radius: 12px;
  box-shadow: 0 2px 8px #7C3AED11;
  padding: 1.5rem 1rem 1rem 1rem;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const AmountPresetWrap = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.3rem;
`;

const AmountPreset = styled.button`
  background: ${({ selected }) => selected ? 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)' : '#e0c3fc'};
  color: ${({ selected }) => selected ? '#fff' : '#7C3AED'};
  border: none;
  border-radius: 16px;
  padding: 0.4rem 1rem;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.18s, color 0.18s;
  &:hover {
    background: #7C3AED;
    color: #fff;
  }
`;

const InputRow = styled.div`
  display: flex;
  gap: 0.8rem;
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 0.4rem;
  }
`;

const Input = styled.input`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 0.6rem 0.8rem;
  font-size: 1rem;
  flex: 1;
  background: #fff;
`;

const Select = styled.select`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 0.6rem 0.8rem;
  font-size: 1rem;
  background: #fff;
`;

const CheckboxRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 0.3rem 0;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.95rem;
  color: #444;
  cursor: pointer;
  input[type="checkbox"] {
    width: 1.1rem;
    height: 1.1rem;
  }
`;

const ErrorMsg = styled.div`
  color: #dc2626;
  font-size: 0.85rem;
  margin-top: -0.3rem;
`;

const DonateButton = styled.button`
  background: linear-gradient(135deg, #7C3AED 0%, #8B5CF6 100%);
  color: #fff;
  border: none;
  border-radius: 20px;
  padding: 0.8rem 1.8rem;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  margin-top: 0.8rem;
  transition: background 0.18s, transform 0.15s;
  &:hover {
    background: #6D28D9;
    transform: translateY(-2px) scale(1.02);
  }
`;

const PayPalSection = styled.div`
  background: #f8f5ff;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
  border: 2px solid #e0c3fc;
`;

const PayPalTitle = styled.h3`
  color: #7C3AED;
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.8rem;
`;

const PayPalDescription = styled.p`
  color: #666;
  margin-bottom: 1.2rem;
  font-size: 1rem;
`;

const MChangaSection = styled.div`
  background: #fff5f5;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 2px solid #fecaca;
`;

const MChangaTitle = styled.h3`
  color: #dc2626;
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.8rem;
  text-align: center;
`;

const MChangaDescription = styled.p`
  color: #666;
  margin-bottom: 1.2rem;
  text-align: center;
  font-size: 1rem;
`;

const MChangaButton = styled.a`
  display: inline-block;
  background: #dc2626;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  font-weight: 700;
  text-decoration: none;
  margin: 0 auto;
  transition: background 0.2s;
  &:hover {
    background: #b91c1c;
    color: #fff;
  }
`;

const MChangaInfo = styled.div`
  background: #fef2f2;
  border-radius: 6px;
  padding: 0.8rem;
  margin-top: 0.8rem;
  border-left: 4px solid #dc2626;
  font-size: 0.9rem;
  color: #991b1b;
`;

const MPesaSection = styled.div`
  background: #f0fdf4;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 2px solid #86efac;
`;

const MPesaTitle = styled.h3`
  color: #166534;
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.8rem;
  text-align: center;
`;

const MPesaDescription = styled.p`
  color: #666;
  margin-bottom: 1.2rem;
  text-align: center;
  font-size: 1rem;
`;

const MPesaDetails = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 1.2rem;
  margin-bottom: 1.2rem;
  border: 1px solid #dcfce7;
`;

const MPesaDetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.4rem 0;
  border-bottom: 1px solid #f1f5f9;
  &:last-child {
    border-bottom: none;
  }
`;

const MPesaLabel = styled.span`
  font-weight: 600;
  color: #374151;
`;

const MPesaValue = styled.span`
  color: #166534;
  font-family: monospace;
  font-size: 1rem;
  font-weight: 600;
`;



const BankSection = styled.div`
  background: #f0f9ff;
  border-radius: 12px;
  padding: 1.5rem;
  border: 2px solid #bae6fd;
`;

const BankTitle = styled.h3`
  color: #0369a1;
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.8rem;
  text-align: center;
`;

const BankDescription = styled.p`
  color: #666;
  margin-bottom: 1.2rem;
  text-align: center;
  font-size: 1rem;
`;

const BankDetails = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 1.2rem;
  margin-bottom: 1.2rem;
  border: 1px solid #e0e7ff;
`;

const BankDetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.4rem 0;
  border-bottom: 1px solid #f1f5f9;
  &:last-child {
    border-bottom: none;
  }
`;

const BankLabel = styled.span`
  font-weight: 600;
  color: #374151;
`;

const BankValue = styled.span`
  color: #1f2937;
  font-family: monospace;
  font-size: 1rem;
`;

const CopyButton = styled.button`
  background: #7C3AED;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0.25rem 0.6rem;
  font-size: 0.85rem;
  cursor: pointer;
  margin-left: 0.4rem;
  transition: background 0.2s;
  &:hover {
    background: #6D28D9;
  }
`;

const BankInstructions = styled.div`
  background: #fef3c7;
  border-radius: 6px;
  padding: 0.8rem;
  margin-top: 0.8rem;
  border-left: 4px solid #f59e0b;
`;

const InstructionsTitle = styled.h4`
  color: #92400e;
  font-weight: 600;
  margin-bottom: 0.4rem;
`;

const InstructionsList = styled.ul`
  color: #92400e;
  margin: 0;
  padding-left: 1rem;
`;

const InstructionsItem = styled.li`
  margin-bottom: 0.2rem;
`;

const ImpactSection = styled.div`
  background: #f0fdf4;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 2px solid #bbf7d0;
`;

const ImpactTitle = styled.h3`
  color: #166534;
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 1.2rem;
  text-align: center;
`;

const ImpactList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const ImpactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  color: #166534;
  font-size: 1rem;
  svg {
    color: #7C3AED;
    font-size: 1.1rem;
  }
`;

const FAQSection = styled.div`
  background: #fef7ff;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 2px solid #e9d5ff;
`;

const FAQTitle = styled.h3`
  color: #7C3AED;
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 1.2rem;
  text-align: center;
`;

const FAQItem = styled.div`
  margin-bottom: 0.8rem;
  border: 1px solid #e9d5ff;
  border-radius: 6px;
  overflow: hidden;
`;

const FAQQuestion = styled.div`
  background: #faf5ff;
  padding: 0.8rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  color: #7C3AED;
  transition: background 0.2s;
  &:hover {
    background: #f3e8ff;
  }
`;

const FAQAnswer = styled.div`
  padding: 0.8rem;
  background: #fff;
  color: #666;
  line-height: 1.5;
`;

const ContactCallout = styled.div`
  text-align: center;
  background: #fef3c7;
  border-radius: 12px;
  padding: 1.5rem;
  border: 2px solid #fbbf24;
  color: #92400e;
  font-size: 1rem;
`;

const EmailLink = styled.a`
  color: #7C3AED;
  font-weight: 700;
  text-decoration: none;
  margin-left: 0.3rem;
  &:hover {
    text-decoration: underline;
  }
`;

const countries = ['Kenya', 'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France', 'Other'];
const states = ['Nairobi', 'Mombasa', 'Kisumu', 'Other'];

// Predefined tribute names for donors to choose from
const tributeNames = [
  'Mama Sarah Obama',
  'Wangari Maathai',
  'Jomo Kenyatta',
  'Dedan Kimathi',
  'Tom Mboya',
  'Grace Onyango',
  'Charity Ngilu',
  'Martha Karua',
  'Raila Odinga',
  'Uhuru Kenyatta',
  'William Ruto',
  'My Mother',
  'My Father',
  'My Grandmother',
  'My Grandfather',
  'My Sister',
  'My Brother',
  'My Daughter',
  'My Son',
  'My Friend',
  'My Teacher',
  'My Mentor',
  'Custom Name'
];

const MPesaSTKSection = styled.div`
  background: linear-gradient(135deg, #00a651 0%, #008f45 100%);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
  border: 2px solid #00a651;
  box-shadow: 0 4px 12px rgba(0, 166, 81, 0.2);
`;

const MPesaSTKTitle = styled.h3`
  color: #fff;
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const MPesaSTKDescription = styled.p`
  color: #e8f5e8;
  margin-bottom: 1.2rem;
  font-size: 1rem;
`;

const MPesaSTKButton = styled.button`
  background: #fff;
  color: #00a651;
  border: none;
  border-radius: 25px;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  margin: 0 auto;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background: #f0f0f0;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const MPesaSTKInfo = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 0.8rem;
  margin-top: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 0.9rem;
  color: #e8f5e8;
`;

export default function Donate() {
  const [fields, setFields] = useState({
    amount: '',
    otherAmount: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    postal: '',
    country: '',
    newsletter: false,
    recurring: false,
    donorPays: false,
    tribute: '',
    tributeName: '',
    tributeType: '',
    customTributeName: '',
  });
  const [errors, setErrors] = useState({});
  const [faqOpen, setFaqOpen] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mpesaLoading, setMpesaLoading] = useState(false);

  const presetAmounts = [10, 25, 50, 100];

  const handlePreset = amt => {
    setFields(f => ({ ...f, amount: amt, otherAmount: '' }));
    setErrors(e => ({ ...e, amount: '' }));
  };

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFields(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleTributeChange = (e) => {
    const { name, value } = e.target;
    setFields(f => ({ ...f, [name]: value }));
    
    // If "Custom Name" is selected, clear the tributeName to allow custom input
    if (name === 'tributeName' && value === 'Custom Name') {
      setFields(f => ({ ...f, tributeName: '' }));
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errs = {};
    if (!fields.amount && !fields.otherAmount) errs.amount = 'Please select or enter an amount.';
    if (!fields.firstName) errs.firstName = 'First name required.';
    if (!fields.lastName) errs.lastName = 'Last name required.';
    if (!fields.email) errs.email = 'Email required.';
    setErrors(errs);
    if (Object.keys(errs).length === 0) setSubmitted(true);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleMPesaSTK = async () => {
    const amount = fields.amount || fields.otherAmount || '10';
    const phone = fields.phone;
    
    if (!phone) {
      alert('Please enter your phone number to use M-Pesa STK Push');
      return;
    }
    
    if (!amount) {
      alert('Please select or enter an amount to donate');
      return;
    }
    
    setMpesaLoading(true);
    
    try {
      // First create donation record
      const donationResponse = await fetch('/api/donations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...fields,
          amount: parseFloat(amount),
          paymentMethod: 'mpesa_stk'
        })
      });

      const donationData = await donationResponse.json();
      
      if (!donationData.success) {
        throw new Error(donationData.message || 'Failed to create donation');
      }

      // Initiate M-Pesa STK Push
      const mpesaResponse = await fetch('/api/mpesa/stk-push', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: phone,
          amount: parseFloat(amount),
          donationId: donationData.data.donationId
        })
      });

      const mpesaData = await mpesaResponse.json();
      
      if (!mpesaData.success) {
        throw new Error(mpesaData.message || 'Failed to initiate M-Pesa payment');
      }

      alert(`M-Pesa STK Push initiated! Check your phone ${phone} for the payment prompt.`);
      
      // Start polling for payment status
      pollPaymentStatus(mpesaData.data.checkoutRequestId);
      
    } catch (error) {
      console.error('M-Pesa STK Push error:', error);
      alert('Failed to initiate M-Pesa payment. Please try again or use the manual M-Pesa option below.');
    } finally {
      setMpesaLoading(false);
    }
  };

  const pollPaymentStatus = async (checkoutRequestId) => {
    const maxAttempts = 30; // 5 minutes with 10-second intervals
    let attempts = 0;

    const poll = async () => {
      try {
        const response = await fetch('/api/mpesa/check-status', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ checkoutRequestId })
        });

        const data = await response.json();
        
        if (data.success) {
          if (data.data.status === 'completed') {
            alert('Payment completed successfully! Thank you for your donation.');
            setSubmitted(true);
            return;
          } else if (data.data.status === 'failed' || data.data.status === 'cancelled') {
            alert('Payment was not completed. Please try again.');
            return;
          }
        }

        attempts++;
        if (attempts < maxAttempts) {
          setTimeout(poll, 10000); // Poll every 10 seconds
        } else {
          alert('Payment status check timed out. Please contact support if payment was made.');
        }
      } catch (error) {
        console.error('Payment status check error:', error);
        attempts++;
        if (attempts < maxAttempts) {
          setTimeout(poll, 10000);
        }
      }
    };

    setTimeout(poll, 10000); // Start polling after 10 seconds
  };

  useEffect(() => {
    // Only load PayPal script if we're not in a test environment
    if (process.env.NODE_ENV === 'test') return;

    // Check if PayPal script is already loaded
    if (window.paypal) {
      renderPayPalButton();
      return;
    }

    // Check if script is already being loaded
    if (document.querySelector('script[src*="paypal.com/sdk/js"]')) {
      return;
    }

    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=USD`;
    script.async = true;
    script.onload = () => {
      console.log('PayPal script loaded successfully');
      renderPayPalButton();
    };
    script.onerror = (error) => {
      console.error('Failed to load PayPal script:', error);
    };
    
    document.body.appendChild(script);

    return () => {
      // Clean up script if component unmounts
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [fields.amount, fields.otherAmount]);

  const renderPayPalButton = () => {
    try {
      if (!window.paypal) {
        console.log('PayPal not available yet');
        return;
      }
      
      const container = document.getElementById('paypal-button-container');
      if (!container) {
        console.log('PayPal container not found');
        return;
      }

      // Clear existing button
      container.innerHTML = '';

      // Create new button
      window.paypal.Buttons({
        createOrder: (data, actions) => {
          try {
            const amount = fields.amount || fields.otherAmount || '10';
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: amount,
                },
                description: 'Donation to Rebirth of a Queen',
              }],
            });
          } catch (error) {
            console.error('Error creating order:', error);
            throw error;
          }
        },
        onApprove: async (data, actions) => {
          try {
            const order = await actions.order.capture();
            console.log('Payment successful:', order);
            alert('Thank you for your donation!');
            setSubmitted(true);
          } catch (error) {
            console.error('Payment failed:', error);
            alert('Payment failed. Please try again.');
          }
        },
        onError: (err) => {
          console.error('PayPal error:', err);
          alert('Payment failed. Please try again.');
        },
      }).render('#paypal-button-container').catch(error => {
        console.error('Error rendering PayPal button:', error);
      });
    } catch (error) {
      console.error('Error in renderPayPalButton:', error);
    }
  };

  const impactExamples = [
    { icon: <FaBook />, text: '$25 provides a month of school supplies for a girl.' },
    { icon: <FaHandHoldingHeart />, text: '$50 can provide a family of 3 with food for a month.' },
    { icon: <FaUserGraduate />, text: '$100 can provide handwashing stations for households.' },
    { icon: <FaHeartbeat />, text: '$500 will allow us to expand medical services.' },
  ];

  const faqs = [
    { q: 'Is this donation tax deductible?', a: 'Rebirth of a Queen is a registered non-profit. Your donation is tax-deductible within the guidelines of Kenyan law. Please keep your email donation receipt as your official record.' },
    { q: 'Can I donate through M-Pesa?', a: 'Yes! We accept donations through M-Pesa. Go to MPESA/Lipa na MPESA, then hit "Buy goods and services." Enter the Till number: 5914787 and enter amount to donate. Enter your PIN number and send.' },
    { q: 'What impact will my donation have?', a: 'Every donation directly supports our programs in education, health, and economic empowerment for women and girls in Kenya. See our impact section for specific examples.' },
    { q: 'Who should I contact if I have additional questions?', a: 'If you have further questions about a donation or would like to give in a way not listed here, please reach out to us at info@rebirthofaqueen.org.' },
  ];

  return (
    <Page>
      <Hero>
        <Headline>Empowering youth<br/>in slums in Kenya.</Headline>
        <Subheading>If outside of the US, we recommend donating via our PayPal Giving Fund.</Subheading>
        <PayPalFund href="https://www.paypal.com/givingfund" target="_blank" rel="noopener noreferrer">
          <FaPaypal /> PayPal Giving Fund
        </PayPalFund>
      </Hero>

      {submitted ? (
        <div style={{ textAlign: 'center', color: '#16a34a', fontWeight: 700, fontSize: '1.2rem', margin: '2rem 0' }}>
          <FaCheckCircle style={{ fontSize: '2.2rem', marginBottom: '1rem' }} /><br/>
          Thank you for your generous donation!
        </div>
      ) : (
        <Form onSubmit={handleSubmit} noValidate>
          <label style={{ fontWeight: 700, color: '#7C3AED', marginBottom: 4 }}>Donation Amount</label>
          <AmountPresetWrap>
            {presetAmounts.map(amt => (
              <AmountPreset key={amt} type="button" selected={fields.amount == amt} onClick={() => handlePreset(amt)}>
                ${amt}
              </AmountPreset>
            ))}
          </AmountPresetWrap>
          <Input
            name="otherAmount"
            placeholder="Other Gift Amount"
            value={fields.otherAmount}
            onChange={handleChange}
            type="number"
            min="1"
          />
          {errors.amount && <ErrorMsg>{errors.amount}</ErrorMsg>}

          <InputRow>
            <Input name="firstName" placeholder="First Name" value={fields.firstName} onChange={handleChange} />
            <Input name="lastName" placeholder="Last Name" value={fields.lastName} onChange={handleChange} />
          </InputRow>
          {errors.firstName && <ErrorMsg>{errors.firstName}</ErrorMsg>}
          {errors.lastName && <ErrorMsg>{errors.lastName}</ErrorMsg>}

          <Input name="email" placeholder="Email Address" value={fields.email} onChange={handleChange} />
          {errors.email && <ErrorMsg>{errors.email}</ErrorMsg>}

          <CheckboxLabel>
            <input type="checkbox" name="newsletter" checked={fields.newsletter} onChange={handleChange} />
            I would like to receive the newsletter.
          </CheckboxLabel>

          <Input name="phone" placeholder="Phone Number" value={fields.phone} onChange={handleChange} />
          <Input name="address1" placeholder="Address Line 1" value={fields.address1} onChange={handleChange} />
          <Input name="address2" placeholder="Address Line 2" value={fields.address2} onChange={handleChange} />
          
          <InputRow>
            <Input name="city" placeholder="City" value={fields.city} onChange={handleChange} />
            <Input name="state" placeholder="State/Province" value={fields.state} onChange={handleChange} />
          </InputRow>
          
          <InputRow>
            <Input name="postal" placeholder="Postal" value={fields.postal} onChange={handleChange} />
            <Select name="country" value={fields.country} onChange={handleChange}>
              <option value="">Country</option>
              {countries.map(c => <option key={c} value={c}>{c}</option>)}
            </Select>
          </InputRow>

          <CheckboxRow>
            <CheckboxLabel>
              <input type="checkbox" name="recurring" checked={fields.recurring} onChange={handleChange} />
              Make Recurring Gift
            </CheckboxLabel>
            <CheckboxLabel>
              <input type="checkbox" name="donorPays" checked={fields.donorPays} onChange={handleChange} />
              Donor Pays Costs
            </CheckboxLabel>
          </CheckboxRow>

          <label style={{ fontWeight: 700, color: '#7C3AED', marginBottom: 4 }}>Is this donation In Honor Of or In Memory Of someone?</label>
          <Select name="tributeType" value={fields.tributeType} onChange={handleTributeChange}>
            <option value="">Select Tribute Type</option>
            <option value="honor">In Honor Of</option>
            <option value="memory">In Memory Of</option>
          </Select>
          
          {fields.tributeType && (
            <>
              <Select name="tributeName" value={fields.tributeName} onChange={handleTributeChange}>
                <option value="">Select a name to honor/memorialize</option>
                {tributeNames.map(name => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </Select>
              
              {fields.tributeName === 'Custom Name' && (
                <Input
                  name="customTributeName"
                  placeholder="Enter the name you want to honor/memorialize"
                  value={fields.customTributeName || ''}
                  onChange={handleChange}
                />
              )}
              
              {fields.tributeName && fields.tributeName !== 'Custom Name' && (
                <div style={{ 
                  background: '#f0f9ff', 
                  border: '1px solid #bae6fd', 
                  borderRadius: 8, 
                  padding: '0.8rem', 
                  marginTop: '0.5rem',
                  color: '#0369a1',
                  fontSize: '0.9rem'
                }}>
                  <strong>Selected:</strong> {fields.tributeType === 'honor' ? 'In Honor Of' : 'In Memory Of'} <strong>{fields.tributeName}</strong>
                </div>
              )}
              
              {fields.tributeName === 'Custom Name' && fields.customTributeName && (
                <div style={{ 
                  background: '#f0f9ff', 
                  border: '1px solid #bae6fd', 
                  borderRadius: 8, 
                  padding: '0.8rem', 
                  marginTop: '0.5rem',
                  color: '#0369a1',
                  fontSize: '0.9rem'
                }}>
                  <strong>Selected:</strong> {fields.tributeType === 'honor' ? 'In Honor Of' : 'In Memory Of'} <strong>{fields.customTributeName}</strong>
                </div>
              )}
            </>
          )}

          <DonateButton type="submit">
            Continue to Payment
          </DonateButton>
        </Form>
      )}

      <PayPalSection>
        <PayPalTitle><FaPaypal style={{ marginRight: 8 }} />Pay with PayPal or Card</PayPalTitle>
        <PayPalDescription>
          Make a secure donation using PayPal, credit card, or debit card. 
          Your payment will be processed securely through PayPal.
        </PayPalDescription>
        <div id="paypal-button-container">
          <div style={{ 
            width: '100%', 
            maxWidth: 350, 
            minHeight: 50, 
            background: '#fff', 
            borderRadius: 8, 
            boxShadow: '0 2px 8px #7C3AED11', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            color: '#7C3AED', 
            fontWeight: 700, 
            fontSize: '1.08rem', 
            margin: '0 auto',
            border: '2px dashed #e0c3fc'
          }}>
            Loading PayPal...
          </div>
        </div>
      </PayPalSection>

      <MPesaSTKSection>
        <MPesaSTKTitle>
          <span style={{ fontSize: '1.5rem' }}>📱</span>
          M-Pesa STK Push
        </MPesaSTKTitle>
        <MPesaSTKDescription>
          Pay instantly with M-Pesa STK Push. Enter your M-Pesa phone number below and click the button to receive a payment prompt on your phone.
        </MPesaSTKDescription>
        
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.1)', 
          borderRadius: 8, 
          padding: '1rem', 
          marginBottom: '1rem',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <label style={{ 
            display: 'block', 
            color: '#fff', 
            fontWeight: 600, 
            marginBottom: '0.5rem',
            fontSize: '0.9rem'
          }}>
            M-Pesa Phone Number:
          </label>
          <input
            type="tel"
            placeholder="e.g., 0712345678 or +254712345678"
            value={fields.phone || ''}
            onChange={(e) => handleChange({ target: { name: 'phone', value: e.target.value } })}
            style={{
              width: '100%',
              padding: '0.8rem',
              borderRadius: 6,
              border: '1px solid rgba(255, 255, 255, 0.3)',
              background: 'rgba(255, 255, 255, 0.9)',
              fontSize: '1rem',
              color: '#333'
            }}
          />
          <div style={{ 
            fontSize: '0.8rem', 
            color: '#e8f5e8', 
            marginTop: '0.5rem',
            fontStyle: 'italic'
          }}>
            Enter the phone number registered with your M-Pesa account
          </div>
        </div>
        
        <MPesaSTKButton 
          onClick={handleMPesaSTK}
          disabled={mpesaLoading}
          style={{ 
            opacity: mpesaLoading ? 0.7 : 1,
            cursor: mpesaLoading ? 'not-allowed' : 'pointer'
          }}
        >
          {mpesaLoading ? (
            <>
              <div style={{ 
                width: '16px', 
                height: '16px', 
                border: '2px solid #00a651', 
                borderTop: '2px solid transparent', 
                borderRadius: '50%', 
                animation: 'spin 1s linear infinite' 
              }} />
              Processing...
            </>
          ) : (
            <>
              <span style={{ fontSize: '1.2rem' }}>📱</span>
              Pay with M-Pesa STK Push
            </>
          )}
        </MPesaSTKButton>
        <MPesaSTKInfo>
          <strong>How it works:</strong> Click the button above and you'll receive an M-Pesa prompt on your phone. Enter your PIN to complete the payment securely.
        </MPesaSTKInfo>
      </MPesaSTKSection>

      <MChangaSection>
        <MChangaTitle>🏠 M-Changa Fundraiser</MChangaTitle>
        <MChangaDescription>
          Support our "Renovate Rebirth Women Shelter" campaign through M-Changa, Africa's largest online fundraising platform.
        </MChangaDescription>
        <MChangaButton href="https://www.mchanga.africa/fundraiser/115364" target="_blank" rel="noopener noreferrer">
          Visit M-Changa Fundraiser
        </MChangaButton>
        <MChangaInfo>
          <strong>M-Changa is Africa's largest Online Fundraising Platform.</strong> We provide the most Secure, Transparent & Convenient way to raise funds. Your donation will be processed securely and directly to our project.
        </MChangaInfo>
      </MChangaSection>

      <MPesaSection>
        <MPesaTitle>💰 M-Pesa Payment</MPesaTitle>
        <MPesaDescription>
          Send money directly via M-Pesa mobile money transfer. Quick and secure!
        </MPesaDescription>
        <MPesaDetails>
          <MPesaDetailRow>
            <MPesaLabel>Till Number:</MPesaLabel>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <MPesaValue>5914787</MPesaValue>
              <CopyButton onClick={() => copyToClipboard('5914787')}>
                <FaCopy /> {copied ? 'Copied!' : 'Copy'}
              </CopyButton>
            </div>
          </MPesaDetailRow>
          <MPesaDetailRow>
            <MPesaLabel>Business Name:</MPesaLabel>
            <MPesaValue>REBIRTH OF A QUEEN</MPesaValue>
          </MPesaDetailRow>
          <MPesaDetailRow>
            <MPesaLabel>Payment Type:</MPesaLabel>
            <MPesaValue>Buy Goods & Services</MPesaValue>
          </MPesaDetailRow>
        </MPesaDetails>
        <BankInstructions>
          <InstructionsTitle>How to Pay with M-Pesa:</InstructionsTitle>
          <InstructionsList>
            <InstructionsItem>Go to M-Pesa menu on your phone</InstructionsItem>
            <InstructionsItem>Select "Lipa na M-Pesa"</InstructionsItem>
            <InstructionsItem>Choose "Buy Goods and Services"</InstructionsItem>
            <InstructionsItem>Enter Till Number: 5914787</InstructionsItem>
            <InstructionsItem>Enter the amount you want to donate</InstructionsItem>
            <InstructionsItem>Enter your M-Pesa PIN and send</InstructionsItem>
            <InstructionsItem>You'll receive a confirmation SMS</InstructionsItem>
          </InstructionsList>
        </BankInstructions>
      </MPesaSection>

      <BankSection>
        <BankTitle><FaUniversity style={{ marginRight: 8 }} />Bank Transfer</BankTitle>
        <BankDescription>
          Prefer to transfer directly to our bank account? Use the details below.
        </BankDescription>
        <BankDetails>
          <BankDetailRow>
            <BankLabel>Bank Name:</BankLabel>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <BankValue>Equity Bank</BankValue>
            </div>
          </BankDetailRow>
          <BankDetailRow>
            <BankLabel>Account Name:</BankLabel>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <BankValue>Rebirth of a Queen</BankValue>
            </div>
          </BankDetailRow>
          <BankDetailRow>
            <BankLabel>Account Number:</BankLabel>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <BankValue>1234567890</BankValue>
              <CopyButton onClick={() => copyToClipboard('1234567890')}>
                <FaCopy /> {copied ? 'Copied!' : 'Copy'}
              </CopyButton>
            </div>
          </BankDetailRow>
          <BankDetailRow>
            <BankLabel>Branch:</BankLabel>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <BankValue>Nairobi</BankValue>
            </div>
          </BankDetailRow>
          <BankDetailRow>
            <BankLabel>SWIFT Code:</BankLabel>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <BankValue>EQBLKENA</BankValue>
              <CopyButton onClick={() => copyToClipboard('EQBLKENA')}>
                <FaCopy /> {copied ? 'Copied!' : 'Copy'}
              </CopyButton>
            </div>
          </BankDetailRow>
        </BankDetails>
        <BankInstructions>
          <InstructionsTitle>How to Transfer:</InstructionsTitle>
          <InstructionsList>
            <InstructionsItem>Use your name as the payment reference</InstructionsItem>
            <InstructionsItem>Email your transfer receipt to info@rebirthofaqueen.org</InstructionsItem>
            <InstructionsItem>We'll confirm your donation within 24 hours</InstructionsItem>
          </InstructionsList>
        </BankInstructions>
      </BankSection>

      <ImpactSection>
        <ImpactTitle>Impact of Your Gift</ImpactTitle>
        <ImpactList>
          {impactExamples.map((item, i) => (
            <ImpactItem key={i}>{item.icon} {item.text}</ImpactItem>
          ))}
        </ImpactList>
      </ImpactSection>

      <FAQSection>
        <FAQTitle><FaQuestionCircle style={{ marginRight: 8 }} />Frequently Asked Questions</FAQTitle>
        {faqs.map((faq, i) => (
          <FAQItem key={faq.q}>
            <FAQQuestion onClick={() => setFaqOpen(faqOpen === i ? null : i)}>
              {faq.q}
              {faqOpen === i ? <FaChevronUp /> : <FaChevronDown />}
            </FAQQuestion>
            {faqOpen === i && (
              <FAQAnswer>{faq.a}</FAQAnswer>
            )}
          </FAQItem>
        ))}
      </FAQSection>

      <ContactCallout>
        <FaEnvelope style={{ marginRight: 6, color: '#7C3AED' }} />
        Have questions about your gift? Email us at
        <EmailLink href="mailto:info@rebirthofaqueen.org">info@rebirthofaqueen.org</EmailLink>
      </ContactCallout>
    </Page>
  );
} 