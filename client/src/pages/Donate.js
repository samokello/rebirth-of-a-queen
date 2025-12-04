import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { buildApiUrl } from '../utils/apiConfig';
import {PaystackButton} from 'react-paystack'


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
  cursor: pointer;
`;

const ToggleLabel = styled.label`
  font-size: 0.9rem;
  font-weight: 600;
  color: #374151;
`;

const ToggleSwitch = styled.div`
  position: relative;
  width: 46px;
  height: 24px;
  background: ${({ active }) => (active ? "#7c3aed" : "#d1d5db")};
  border-radius: 9999px;
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

const PaymentBox = styled.div`
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.2rem;
  text-align: center;
  margin-bottom: 1.5rem;
`;

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

  const publicKey="pk_test_6bb283f4994e23d878343914d91e870008feb07f";
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  const [isMonthly, setIsMonthly] = useState(false);
  const [faqOpen, setFaqOpen] = useState(null);
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
    const [amount, setAmount] = useState("");

  const [donationStats, setDonationStats] = useState({
    totalRaised: 0,
    totalDonations: 0,
    recentDonors: []
  });
  const [donationSettings, setDonationSettings] = useState({
    goal: 100000,
    presetAmounts: [5, 10, 20, 50, 100],
    defaultAmount: 25,
    impactExamples: [
      { amount: 25, text: 'School supplies for a girl' },
      { amount: 50, text: 'Feeds a family for a month' },
      { amount: 100, text: 'Installs a handwashing station' }
    ]
  });
    const computedAmount = parseFloat(customAmount || selectedAmount || donationSettings.defaultAmount || 10);


  const goal = donationSettings.goal;
  const progress = goal > 0 ? (donationStats.totalRaised / goal) * 100 : 0;

  useEffect(() => {
    const fetchDonationStats = async () => {
      try {
        const res = await fetch(buildApiUrl('donations/public/stats'));
        const data = await res.json();
        if (data.success) setDonationStats(data.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchDonationSettings = async () => {
      try {
        const res = await fetch(buildApiUrl('settings/donations'));
        const data = await res.json();
        if (data.success) setDonationSettings(data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDonationStats();
    fetchDonationSettings();
  }, []);


const componentProps = {
  email,
  amount: computedAmount * 100, // convert to kobo
  metadata: {
    firstName: firstName || "",
    lastName: lastName || "",
    phone: phone || "",
  },
  publicKey: publicKey,
  text: "Donate Now",
  onSuccess: () => alert("🎉 Thank you for your donation!"),
  onClose: () => alert("You closed the payment window."),
};



  const getCurrencySymbol = () => "KES";

  const handlePaystackPayment = async () => {
    if (!email) return alert("Email is required.");
    setLoading(true);
    try {
      const amount = parseFloat(customAmount || selectedAmount || donationSettings.defaultAmount || 10);
      const res = await fetch(buildApiUrl('payments/initialize'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          email,
          firstName,
          lastName,
          currency: 'KES'
        })
      });
      const data = await res.json();
      if (data.success) {
        window.location.href = data.data.authorizationUrl;
      } else {
        alert(`Payment initialization failed: ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to Paystack.");
    } finally {
      setLoading(false);
    }
  };

  const faqs = [
    { q: "Is my donation tax deductible?", a: "Yes, within Kenyan law." },
    { q: "What payment methods do you accept?", a: "We accept secure card payments and mobile money via Paystack." },
    { q: "Can I donate with mobile money?", a: "Yes! Paystack supports mobile money." },
    { q: "What impact will my donation have?", a: "Education, health, and empowerment programs." },
    { q: "Is my payment information secure?", a: "Yes! We use secure Paystack payment processing. Your payment details are never stored on our servers." },
    { q: "Do you accept international payments?", a: "Yes! Paystack accepts international cards." },
  ];

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
          <ProgressText>{getCurrencySymbol()}{donationStats.totalRaised.toLocaleString()} raised of {getCurrencySymbol()}{goal.toLocaleString()} goal</ProgressText>
          <ProgressBar>
            <ProgressFill progress={progress} />
          </ProgressBar>
        </ProgressWrapper>

        {/* Recent Donors */}
        {donationStats.recentDonors.length > 0 && (
        <DonorCarouselWrapper>
          <h4 style={{ color: "#7c3aed", marginBottom: "1rem", textAlign: "center" }}>Recent Donors</h4>
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
                  {getCurrencySymbol()}{donor.amount}
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
            {donationSettings.presetAmounts.map((amt) => (
              <AmountButton
                key={amt}
                selected={selectedAmount === amt && !customAmount}
                onClick={() => { setSelectedAmount(amt); setCustomAmount(""); }}
              >
                {getCurrencySymbol()}{amt}
              </AmountButton>
            ))}
          </AmountButtons>
          <CustomInput
            type="number"
            placeholder="Enter custom amount"
            value={customAmount}
            onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
          />

          {/* Monthly Toggle */}
          <ToggleWrapper onClick={() => setIsMonthly(!isMonthly)}>
            <ToggleSwitch active={isMonthly} />
            <ToggleLabel>Make this a monthly gift</ToggleLabel>
          </ToggleWrapper>
          {isMonthly && <ToggleHelper>Your card will be billed monthly until you cancel.</ToggleHelper>}
        </AmountSection>

        {/* Payment Section */}
        <PaymentBox>
          <h4 style={{ color: '#00A86B', marginBottom: '0.8rem' }}>💳 Pay with Paystack</h4>
          <p style={{ fontSize: "0.9rem", color: "#6b7280", marginBottom: "1rem" }}>
            Secure card payments or mobile money via Paystack.
          </p>

          {/* Donor Info */}
          <div style={{ marginBottom: "0.8rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem" }}>
            <input type="text" placeholder="First Name (optional)" value={firstName} onChange={e => setFirstName(e.target.value)} style={{ width: "100%", padding: "0.6rem", borderRadius: "8px", border: "1px solid #ddd" }} />
            <input type="text" placeholder="Last Name (optional)" value={lastName} onChange={e => setLastName(e.target.value)} style={{ width: "100%", padding: "0.6rem", borderRadius: "8px", border: "1px solid #ddd" }} />
            <input type="email" placeholder="Email (required)" value={email} onChange={e => setEmail(e.target.value)} style={{ gridColumn: "1 / -1", width: "100%", padding: "0.6rem", borderRadius: "8px", border: "1px solid #ddd" }} />
          </div>

          { <PaystackButton
            onClick={handlePaystackPayment}
            disabled={!email || loading}
            style={{
              background: !email || loading ? "#9ca3af" : "#00A86B",
              color: "#fff",
              padding: "0.8rem 1.5rem",
              border: "none",
              borderRadius: "8px",
              cursor: !email || loading ? "not-allowed" : "pointer",
              fontWeight: "600",
              width: "100%",
              fontSize: "1rem"
            }}
          >
            {loading ? "Processing..." : `Pay ${getCurrencySymbol()}${customAmount || selectedAmount || donationSettings.defaultAmount || 10}`}

          </PaystackButton> }

            



          <p style={{ fontSize: "0.8rem", marginTop: "0.5rem", color: "#374151" }}>
            Secure payment via Paystack. Your payment details are never stored on our servers.
          </p>
        </PaymentBox>

        {/* Impact */}
        <ImpactSection>
          <ImpactTitle>Impact of Your Gift</ImpactTitle>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.6rem' }}>
            {donationSettings.impactExamples.map((i) => (
              <div key={i.amount} style={{ background: '#fff', border: '1px solid #bbf7d0', borderRadius: 10, padding: '0.8rem', textAlign: 'center' }}>
                <div style={{ fontWeight: 800, color: '#166534' }}>{getCurrencySymbol()}{i.amount}</div>
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
              <FAQQuestion onClick={() => setFaqOpen(faqOpen === i ? null : i)}>{faq.q}</FAQQuestion>
              {faqOpen === i && <FAQAnswer>{faq.a}</FAQAnswer>}
            </FAQItem>
          ))}
        </FAQSection>

        {/* Contact */}
        <ContactCallout>
          Questions? Contact us at <strong>info@rebirthofaqueen.org</strong>
        </ContactCallout>
      </DonationCard>
    </Page>
  );
};

export default Donate;
