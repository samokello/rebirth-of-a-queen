import React, { useState } from 'react';
import styled from 'styled-components';
import { FaSave, FaWhatsapp, FaCreditCard, FaTruck, FaCog } from 'react-icons/fa';

const Container = styled.div`
  padding: 20px;
  background: #f8f9fa;
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  color: #333;
  margin: 0;
`;

const SettingsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const SettingsCard = styled.div`
  background: white;
  border-radius: 10px;
  padding: 25px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const CardTitle = styled.h3`
  color: #333;
  margin: 0 0 20px 0;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 2px solid #e1e5e9;
  border-radius: 6px;
  font-size: 16px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 2px solid #e1e5e9;
  border-radius: 6px;
  font-size: 16px;
  min-height: 100px;
  resize: vertical;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  border: 2px solid #e1e5e9;
  border-radius: 6px;
  font-size: 16px;
  background: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

const CheckboxLabel = styled.label`
  cursor: pointer;
  font-weight: 500;
`;

const SaveButton = styled.button`
  background: #667eea;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background: #5a6fd8;
  }
`;

const InfoText = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin-top: 5px;
`;

const AdminShopSettings = () => {
  const [settings, setSettings] = useState({
    // General Settings
    shopName: 'Rebirth of a Queen Shop',
    shopDescription: 'Handcrafted products made with love and skill',
    currency: 'KES',
    taxRate: 16,
    
    // Contact Information
    whatsappNumber: '+254 700 000 000',
    phoneNumber: '+254 700 000 000',
    email: 'shop@rebirthofaqueen.org',
    
    // Payment Settings
    enableMpesa: true,
    enablePaypal: true,
    enableBankTransfer: true,
    enableCashOnDelivery: true,
    
    // Shipping Settings
    enableShipping: true,
    shippingCost: 500,
    freeShippingThreshold: 5000,
    deliveryTime: '3-5 business days',
    
    // Order Settings
    autoConfirmOrders: false,
    requirePaymentConfirmation: true,
    orderNotificationEmail: 'orders@rebirthofaqueen.org',
    
    // Shop Policies
    returnPolicy: 'We accept returns within 14 days of delivery for unused items in original packaging.',
    privacyPolicy: 'Your privacy is important to us. We do not share your personal information with third parties.',
    termsOfService: 'By placing an order, you agree to our terms of service and delivery policies.'
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = () => {
    // Here you would typically save to backend
    alert('Settings saved successfully!');
  };

  return (
    <Container>
      <Header>
        <Title>Shop Settings</Title>
        <SaveButton onClick={handleSave}>
          <FaSave />
          Save Settings
        </SaveButton>
      </Header>

      <SettingsGrid>
        {/* General Settings */}
        <SettingsCard>
          <CardTitle>
            <FaCog />
            General Settings
          </CardTitle>
          
          <FormGroup>
            <Label>Shop Name</Label>
            <Input
              type="text"
              name="shopName"
              value={settings.shopName}
              onChange={handleInputChange}
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Shop Description</Label>
            <TextArea
              name="shopDescription"
              value={settings.shopDescription}
              onChange={handleInputChange}
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Currency</Label>
            <Select
              name="currency"
              value={settings.currency}
              onChange={handleInputChange}
            >
              <option value="KES">Kenyan Shilling (KES)</option>
              <option value="USD">US Dollar (USD)</option>
              <option value="EUR">Euro (EUR)</option>
            </Select>
          </FormGroup>
          
          <FormGroup>
            <Label>Tax Rate (%)</Label>
            <Input
              type="number"
              name="taxRate"
              value={settings.taxRate}
              onChange={handleInputChange}
              min="0"
              max="100"
            />
          </FormGroup>
        </SettingsCard>

        {/* Contact Information */}
        <SettingsCard>
          <CardTitle>
            <FaWhatsapp />
            Contact Information
          </CardTitle>
          
          <FormGroup>
            <Label>WhatsApp Number</Label>
            <Input
              type="text"
              name="whatsappNumber"
              value={settings.whatsappNumber}
              onChange={handleInputChange}
              placeholder="+254 700 000 000"
            />
            <InfoText>This number will be used for order notifications</InfoText>
          </FormGroup>
          
          <FormGroup>
            <Label>Phone Number</Label>
            <Input
              type="text"
              name="phoneNumber"
              value={settings.phoneNumber}
              onChange={handleInputChange}
              placeholder="+254 700 000 000"
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Email Address</Label>
            <Input
              type="email"
              name="email"
              value={settings.email}
              onChange={handleInputChange}
              placeholder="shop@rebirthofaqueen.org"
            />
          </FormGroup>
        </SettingsCard>

        {/* Payment Methods */}
        <SettingsCard>
          <CardTitle>
            <FaCreditCard />
            Payment Methods
          </CardTitle>
          
          <CheckboxGroup>
            <Checkbox
              type="checkbox"
              name="enableMpesa"
              checked={settings.enableMpesa}
              onChange={handleInputChange}
            />
            <CheckboxLabel>Enable M-Pesa Payments</CheckboxLabel>
          </CheckboxGroup>
          
          <CheckboxGroup>
            <Checkbox
              type="checkbox"
              name="enablePaypal"
              checked={settings.enablePaypal}
              onChange={handleInputChange}
            />
            <CheckboxLabel>Enable PayPal Payments</CheckboxLabel>
          </CheckboxGroup>
          
          <CheckboxGroup>
            <Checkbox
              type="checkbox"
              name="enableBankTransfer"
              checked={settings.enableBankTransfer}
              onChange={handleInputChange}
            />
            <CheckboxLabel>Enable Bank Transfer</CheckboxLabel>
          </CheckboxGroup>
          
          <CheckboxGroup>
            <Checkbox
              type="checkbox"
              name="enableCashOnDelivery"
              checked={settings.enableCashOnDelivery}
              onChange={handleInputChange}
            />
            <CheckboxLabel>Enable Cash on Delivery</CheckboxLabel>
          </CheckboxGroup>
        </SettingsCard>

        {/* Shipping Settings */}
        <SettingsCard>
          <CardTitle>
            <FaTruck />
            Shipping Settings
          </CardTitle>
          
          <CheckboxGroup>
            <Checkbox
              type="checkbox"
              name="enableShipping"
              checked={settings.enableShipping}
              onChange={handleInputChange}
            />
            <CheckboxLabel>Enable Shipping</CheckboxLabel>
          </CheckboxGroup>
          
          <FormGroup>
            <Label>Shipping Cost (KES)</Label>
            <Input
              type="number"
              name="shippingCost"
              value={settings.shippingCost}
              onChange={handleInputChange}
              min="0"
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Free Shipping Threshold (KES)</Label>
            <Input
              type="number"
              name="freeShippingThreshold"
              value={settings.freeShippingThreshold}
              onChange={handleInputChange}
              min="0"
            />
            <InfoText>Orders above this amount get free shipping</InfoText>
          </FormGroup>
          
          <FormGroup>
            <Label>Delivery Time</Label>
            <Input
              type="text"
              name="deliveryTime"
              value={settings.deliveryTime}
              onChange={handleInputChange}
              placeholder="3-5 business days"
            />
          </FormGroup>
        </SettingsCard>

        {/* Order Settings */}
        <SettingsCard>
          <CardTitle>
            <FaCog />
            Order Settings
          </CardTitle>
          
          <CheckboxGroup>
            <Checkbox
              type="checkbox"
              name="autoConfirmOrders"
              checked={settings.autoConfirmOrders}
              onChange={handleInputChange}
            />
            <CheckboxLabel>Auto-confirm orders</CheckboxLabel>
          </CheckboxGroup>
          
          <CheckboxGroup>
            <Checkbox
              type="checkbox"
              name="requirePaymentConfirmation"
              checked={settings.requirePaymentConfirmation}
              onChange={handleInputChange}
            />
            <CheckboxLabel>Require payment confirmation</CheckboxLabel>
          </CheckboxGroup>
          
          <FormGroup>
            <Label>Order Notification Email</Label>
            <Input
              type="email"
              name="orderNotificationEmail"
              value={settings.orderNotificationEmail}
              onChange={handleInputChange}
              placeholder="orders@rebirthofaqueen.org"
            />
          </FormGroup>
        </SettingsCard>

        {/* Shop Policies */}
        <SettingsCard>
          <CardTitle>
            <FaCog />
            Shop Policies
          </CardTitle>
          
          <FormGroup>
            <Label>Return Policy</Label>
            <TextArea
              name="returnPolicy"
              value={settings.returnPolicy}
              onChange={handleInputChange}
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Privacy Policy</Label>
            <TextArea
              name="privacyPolicy"
              value={settings.privacyPolicy}
              onChange={handleInputChange}
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Terms of Service</Label>
            <TextArea
              name="termsOfService"
              value={settings.termsOfService}
              onChange={handleInputChange}
            />
          </FormGroup>
        </SettingsCard>
      </SettingsGrid>
    </Container>
  );
};

export default AdminShopSettings; 