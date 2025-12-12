import React, { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaChevronDown, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaDonate, FaShoppingCart, FaHeart, FaBars, FaTimes } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';
import UserProfile from './UserProfile';

// CFK Africa style navigation structure
const navLinks = [
  { label: 'Home', to: '/' },
  {
    label: 'Our Programs',
    dropdown: [
      { 
        label: 'The Rebirth Susan Village', 
        to: '/programs/susan-village',
        blurb: '24/7 rescue, shelter, and reintegration services for survivors.',
        cta: 'Explore Susan Village',
        image: 'https://res.cloudinary.com/samokello/image/upload/v1720000000/rebirth/programs/susan_village.jpg'
      },
      { 
        label: 'The Rebirth Elimisha Program', 
        to: '/programs/elimisha',
        blurb: 'Scholarships, mentorship, and apprenticeships for education access.',
        cta: 'Explore Elimisha',
        image: 'https://res.cloudinary.com/samokello/image/upload/v1720000000/rebirth/programs/elimisha.jpg'
      },
      { 
        label: 'Raising Authentic Voices', 
        to: '/programs/authentic-voices',
        blurb: 'Advocacy on menstrual health, GBV prevention, and anti-trafficking.',
        cta: 'Explore Authentic Voices',
        image: 'https://res.cloudinary.com/samokello/image/upload/v1720000000/rebirth/programs/authentic_voices.jpg'
      },
      { 
        label: 'Vocational Training Program', 
        to: '/programs/vocational-training',
        blurb: 'Technical skills, employability, and on-the-job training.',
        cta: 'Explore Training',
        image: 'https://res.cloudinary.com/samokello/image/upload/v1720000000/rebirth/programs/vocational.jpg'
      },
      { 
        label: 'Volunteer Program', 
        to: '/programs/volunteer',
        blurb: 'Join our global village to support survivors and communities.',
        cta: 'Explore Volunteering',
        image: 'https://res.cloudinary.com/samokello/image/upload/v1720000000/rebirth/programs/volunteer.jpg'
      },
    ],
  },
  { label: 'Shop', to: '/shop', icon: <FaShoppingCart /> },
  { label: 'Gallery', to: '/gallery' },
  {
    label: 'Our Impact',
    dropdown: [
      { label: 'Where We Work', to: '/where-we-work' },
      { label: 'Clinical & Community Health', to: '/clinical-community-health' },
      { label: 'Youth Leadership & Education', to: '/youth-leadership-education' },
      { label: 'Girls Empowerment', to: '/girls-empowerment' },
      { label: 'Sports for Development', to: '/sports-development' },
      { label: 'Equitable Research', to: '/equitable-research' },
    ],
  },
  {
    label: 'About Us',
    dropdown: [
      { label: 'Our Team', to: '/our-team' },
      { label: 'How We Work', to: '/how-we-work' },
      { label: 'History', to: '/history' },
      { label: 'Our Partners', to: '/our-partners' },
    ],
  },
  { label: 'Contact', to: '/contact' },
];

const info = {
  location: 'Nairobi, Kenya',
  phone: '+254 720339204',
  email: 'info@rebirthofaqueen.org',
  socials: [
    { icon: <FaFacebookF />, url: 'https://facebook.com/rebirthofaqueen' },
    { icon: <FaTwitter />, url: 'https://x.com/PaulineJuma11' },
    { icon: <FaInstagram />, url: 'https://www.instagram.com/rebirthofa.queen/' },
    { icon: <FaLinkedin />, url: 'https://www.linkedin.com/in/rebirth-of-a-queen-organization-856b04220/' },
    { icon: <FaYoutube />, url: 'https://www.youtube.com/@rebirthofaqueenstories' },
  ],
};

// Mobile Menu Components
const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: #2c3e50;
  font-size: 20px;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background: #f8f9fa;
  }

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const MobileMenuOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenuSidebar = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 100vh;
  background: white;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1001;
  display: flex;
  flex-direction: column;
  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
`;

const MobileMenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e1e8ed;
  background: #f8f9fa;

  h3 {
    margin: 0;
    color: #2c3e50;
    font-size: 18px;
    font-weight: 600;
  }

  button {
    background: none;
    border: none;
    color: #666;
    font-size: 18px;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    transition: all 0.2s ease;

    &:hover {
      background: #e1e8ed;
    }
  }
`;

const MobileMenuContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px 0;
`;

const MobileMenuLink = styled(Link)`
  display: block;
  padding: 12px 20px;
  color: #2c3e50;
  text-decoration: none;
  font-size: 16px;
  transition: all 0.2s ease;
  border-left: 3px solid transparent;

  &:hover {
    background: #f8f9fa;
    border-left-color: #3498db;
    color: #3498db;
  }
`;

const MobileMenuSectionTitle = styled.div`
  padding: 12px 20px 8px 20px;
  font-size: 14px;
  font-weight: 600;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: #f8f9fa;
  margin-top: 10px;
`;

const MobileMenuDivider = styled.div`
  height: 1px;
  background: #e1e8ed;
  margin: 20px 0;
`;

// Top Info Stripe - CFK Africa Style
const InfoStripe = styled.div`
  background: #1a1a1a;
  color: white;
  padding: 6px 0;
  font-size: 13px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding-left: 20px;
  padding-right: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 6px;
    padding: 10px 16px;
    font-size: 12px;
  }
`;

const InfoGroup = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;

  @media (max-width: 768px) {
    gap: 12px;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const InfoItem = styled.span`
  display: flex;
  align-items: center;
  gap: 5px;
  opacity: 0.9;
  transition: opacity 0.2s;
  font-size: 12px;

  &:hover {
    opacity: 1;
  }

  svg {
    font-size: 11px;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;

  a {
    color: white;
    opacity: 0.8;
    transition: opacity 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;

    &:hover {
      opacity: 1;
    }

    svg {
      font-size: 12px;
    }
  }
`;

// Main Navbar - CFK Africa Style
const NavbarContainer = styled.nav`
  background: white;
  border-bottom: 1px solid #e5e5e5;
  position: sticky;
  top: 0;
  z-index: 99999;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  isolation: isolate;
`;

const NavbarContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 70px;
  position: relative;
  width: 100%;
  overflow: visible;

  @media (max-width: 768px) {
    padding: 0 16px;
    height: 60px;
    flex-wrap: wrap;
    gap: 10px;
  }
`;

const LogoImg = styled.img`
  height: 45px;
  width: auto;
  margin-right: 10px;
  object-fit: contain;

  @media (max-width: 768px) {
    height: 35px; // smaller on mobile
  }
`;


const Logo = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  font-size: 22px;
  font-weight: 700;
  color: #333;
  transition: color 0.2s;

  &:hover {
    color: #000;
  }

  img {
    height: 45px;
    width: auto;
    margin-right: 10px;
  }

  @media (max-width: 768px) {
    font-size: 18px;
    
    img {
      height: 35px;
    }
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0 auto;
  flex-wrap: nowrap;
  justify-content: center;
  white-space: nowrap;
  flex: 1;
  max-width: 600px;
  justify-content: center;
  overflow: visible;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLinkItem = styled.div`
  position: relative;
  z-index: 99997;
  overflow: visible;
`;

const NavLinkStyled = styled(Link)`
  text-decoration: none;
  color: #333;
  font-weight: 500;
  font-size: 13px;
  padding: 5px 6px;
  position: relative;
  transition: color 0.2s;
  white-space: nowrap;
  border-radius: 4px;
  flex-shrink: 0;

  &:hover {
    color: #e74c3c;
    background: #f8f9fa;
  }

  ${props => props.$active && css`
    color: #e74c3c;
    font-weight: 600;
    background: #f8f9fa;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      right: 0;
      height: 2px;
      background: #e74c3c;
    }
  `}

  @media (max-width: 768px) {
    font-size: 11px;
    padding: 3px 5px;
  }
`;

const DropdownToggle = styled.button`
  background: none;
  border: none;
  color: #333;
  font-weight: 500;
  font-size: 13px;
  padding: 5px 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: color 0.2s;
  position: relative;
  white-space: nowrap;
  border-radius: 4px;
  flex-shrink: 0;
  z-index: 99998;

  &:hover {
    color: #e74c3c;
    background: #f8f9fa;
      z-index: 99998;

  }

  ${props => props.$active && css`
    color: #e74c3c;
    font-weight: 600;
    background: #f8f9fa;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      right: 0;
      height: 2px;
      background: #e74c3c;
        z-index: 99998;

    }
  `}

  @media (max-width: 768px) {
    font-size: 11px;
    padding: 3px 5px;
  }
`;

const DropdownArrow = styled.span`
  transition: transform 0.2s;
  transform: rotate(${props => props.$open ? '180deg' : '0deg'});
  
  svg {
    font-size: 10px;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 5px);
  left: 50%;
  transform: translateX(-50%);
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  padding: 16px;
  min-width: 280px;
  z-index: 99999;
  margin-top: 0;
  opacity: ${props => props.$open ? 1 : 0};
  visibility: ${props => props.$open ? 'visible' : 'hidden'};
  transition: all 0.2s ease;
  pointer-events: ${props => props.$open ? 'auto' : 'none'};

  @media (max-width: 768px) {
    left: 0;
    min-width: 260px;
  }
`;

// Mega menu components removed to keep dropdowns simple

const DropdownItem = styled(Link)`
  display: block;
  padding: 10px 18px;
  color: #333;
  text-decoration: none;
  font-size: 14px;
  border-radius: 8px;
  transition: background-color 0.2s, color 0.2s;
    z-index: 99999;


  &:hover {
    background: #f8f9fa;
    color: #e74c3c;
  }

  ${props => props.$active && css`
    background: #f8f9fa;
    color: #e74c3c;
    font-weight: 600;
  `}

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 8px 14px;
  }
`;

// Mega menu components removed
// Note: Mega* components kept for potential future mega menus; currently unused in simple list.

const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
  min-width: 0;

  @media (max-width: 768px) {
    gap: 4px;
  }
`;

const DesktopOnlyActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const DonateButton = styled(Link)`
  background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
  color: white;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 25px;
  font-weight: 600;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(231, 76, 60, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }

  &:hover {
    background: linear-gradient(135deg, #c0392b 0%, #a93226 100%);
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(231, 76, 60, 0.4);
    
    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(231, 76, 60, 0.3);
  }

  svg {
    font-size: 11px;
  }

  @media (max-width: 768px) {
    display: true;
  }
`;


const LoginButton = styled(Link)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 25px;
  font-weight: 600;
  font-size: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }

  &:hover {
    background: linear-gradient(135deg, #5a6fd8 0%, #6a4c93 100%);
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(102, 126, 234, 0.4);
    
    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
  }

  @media (max-width: 768px) {
    display: true;
  }
`;

const CartIconButton = styled(Link)`
  position: relative;
  display: flex;
  align-items: center;
  margin-left: 8px;
  color: #f68b1e;
  font-size: 18px;
  background: rgba(246, 139, 30, 0.1);
  border: 1px solid rgba(246, 139, 30, 0.2);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  justify-content: center;
  
  &:hover {
    color: #e67e22;
    background: rgba(246, 139, 30, 0.15);
    border-color: rgba(246, 139, 30, 0.3);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(246, 139, 30, 0.2);
  }
`;

const FavoritesIconButton = styled(Link)`
  position: relative;
  display: flex;
  align-items: center;
  margin-left: 6px;
  color: #e74c3c;
  font-size: 18px;
  background: rgba(231, 76, 60, 0.1);
  border: 1px solid rgba(231, 76, 60, 0.2);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  justify-content: center;
  
  &:hover {
    color: #c0392b;
    background: rgba(231, 76, 60, 0.15);
    border-color: rgba(231, 76, 60, 0.3);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(231, 76, 60, 0.2);
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const CartBadge = styled.span`
  position: absolute;
  top: -4px;
  right: -4px;
  background: linear-gradient(135deg, #f68b1e 0%, #e67e22 100%);
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: bold;
  box-shadow: 0 2px 6px rgba(246, 139, 30, 0.4);
  border: 2px solid white;
  animation: pulse 2s infinite;
  
  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
`;

function useOutsideClick(ref, handler) {
  useEffect(() => {
    function handleClick(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        handler();
      }
    }

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [ref, handler]);
}

const Navbar = () => {
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navbarRef = useRef(null);
  const { getCartItemCount } = useCart();
  const { items: favoriteItems } = useFavorites();
  const { user, logout } = useAuth();

  useEffect(() => {
    setDropdownOpen({});
    setMobileMenuOpen(false);
  }, [location]);

  const handleDropdown = (label, open) => {
    setDropdownOpen((prev) => ({ ...prev, [label]: open }));
  };

  const handleDropdownLeave = (label) => {
    setTimeout(() => {
      setDropdownOpen((prev) => ({ ...prev, [label]: false }));
    }, 150);
  };

  const handleDropdownEnter = (label) => {
    setDropdownOpen((prev) => ({ ...prev, [label]: true }));
  };

  useOutsideClick(navbarRef, () => {
    setDropdownOpen({});
    setMobileMenuOpen(false);
  });

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setDropdownOpen({});
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <NavbarContainer ref={navbarRef}>
      <InfoStripe>
        <InfoGroup>
          <InfoItem><FaMapMarkerAlt />{info.location}</InfoItem>
          <InfoItem><FaPhoneAlt />{info.phone}</InfoItem>
          <InfoItem><FaEnvelope />{info.email}</InfoItem>
        </InfoGroup>
        <SocialIcons>
          {info.socials.map((s, i) => (
            <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={`Social link ${i+1}`}>{s.icon}</a>
          ))}
        </SocialIcons>
      </InfoStripe>
      
      <NavbarContent>

<Logo to="/">
  <LogoImg 
    src="https://res.cloudinary.com/samokello/image/upload/v1758147536/rebirth-of-a-queen/images/logo_jwavy0.jpg" 
    alt="Rebirth of a Queen Logo" 
  />
</Logo>


        <NavLinks>
          {navLinks.map((link) => {
            const isActive = link.to ? location.pathname === link.to : link.dropdown?.some((d) => d.to === location.pathname);
            return (
              <NavLinkItem key={link.label}
                onMouseEnter={() => link.dropdown && handleDropdownEnter(link.label)}
                onMouseLeave={() => link.dropdown && handleDropdownLeave(link.label)}
              >
                {link.dropdown ? (
                  <>
                    <DropdownToggle
                      $active={link.dropdown.some((d) => d.to === location.pathname)}
                      aria-haspopup="true"
                      aria-expanded={!!dropdownOpen[link.label]}
                      onClick={() => handleDropdown(link.label, !dropdownOpen[link.label])}
                    >
                      {link.label}
                      <DropdownArrow $open={!!dropdownOpen[link.label]}>
                        <FaChevronDown />
                      </DropdownArrow>
                    </DropdownToggle>
                    <DropdownMenu $open={!!dropdownOpen[link.label]}>
                      {link.dropdown.map((item) => (
                        <DropdownItem
                          key={item.to}
                          to={item.to}
                          $active={item.to === location.pathname}
                          onClick={() => setDropdownOpen({})}
                        >
                          {item.label}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </>
                ) : (
                  <NavLinkStyled
                    to={link.to}
                    $active={isActive}
                  >
                    {link.label}
                  </NavLinkStyled>
                )}
              </NavLinkItem>
            );
          })}
        </NavLinks>
        
        <NavActions>
          <DesktopOnlyActions>
            {user ? (
              <UserProfile user={user} onLogout={logout} />
            ) : (
              <LoginButton to="/login">Login</LoginButton>
            )}
            <DonateButton to="/donate">
              <FaDonate />
              Donate
            </DonateButton>
          </DesktopOnlyActions>
          
          <FavoritesIconButton to={user ? "/favorites" : "/login"} aria-label="Favorites">
            <FaHeart />
            {user && favoriteItems && favoriteItems.length > 0 && (
              <CartBadge>{favoriteItems.length}</CartBadge>
            )}
          </FavoritesIconButton>
          <CartIconButton to={user ? "/cart" : "/login"} aria-label="Cart">
            <FaShoppingCart />
            {user && getCartItemCount && getCartItemCount() > 0 && (
              <CartBadge>{getCartItemCount()}</CartBadge>
            )}
          </CartIconButton>
          
          {/* Mobile Menu Button */}
          <MobileMenuButton onClick={toggleMobileMenu} aria-label="Toggle mobile menu">
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </MobileMenuButton>
        </NavActions>
      </NavbarContent>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <MobileMenuOverlay onClick={() => setMobileMenuOpen(false)}>
          <MobileMenuSidebar onClick={(e) => e.stopPropagation()}>
            <MobileMenuHeader>
              <h3>Menu</h3>
              <button onClick={() => setMobileMenuOpen(false)}>
                <FaTimes />
              </button>
            </MobileMenuHeader>
            
            <MobileMenuContent>
              {navLinks.map((link) => (
                <div key={link.label}>
                  {link.to ? (
                    <MobileMenuLink to={link.to} onClick={() => setMobileMenuOpen(false)}>
                      {link.icon && <span style={{ marginRight: '10px' }}>{link.icon}</span>}
                      {link.label}
                    </MobileMenuLink>
                  ) : (
                    <div>
                      <MobileMenuSectionTitle>{link.label}</MobileMenuSectionTitle>
                      {link.dropdown?.map((dropdownLink) => (
                        <MobileMenuLink 
                          key={dropdownLink.label} 
                          to={dropdownLink.to} 
                          onClick={() => setMobileMenuOpen(false)}
                          style={{ paddingLeft: '20px', fontSize: '14px' }}
                        >
                          {dropdownLink.label}
                        </MobileMenuLink>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              <MobileMenuDivider />
              
              {/* User Actions */}
              <div>
                <MobileMenuSectionTitle>Account</MobileMenuSectionTitle>
                {user ? (
                  <div>
                    <MobileMenuLink to="/profile" onClick={() => setMobileMenuOpen(false)}>
                      My Profile
                    </MobileMenuLink>
                    <MobileMenuLink to="/orders" onClick={() => setMobileMenuOpen(false)}>
                      My Orders
                    </MobileMenuLink>
                    <MobileMenuLink to="/favorites" onClick={() => setMobileMenuOpen(false)}>
                      <FaHeart style={{ marginRight: '10px' }} />
                      Favorites ({favoriteItems?.length || 0})
                    </MobileMenuLink>
                    <MobileMenuLink to="/cart" onClick={() => setMobileMenuOpen(false)}>
                      <FaShoppingCart style={{ marginRight: '10px' }} />
                      Cart ({getCartItemCount?.() || 0})
                    </MobileMenuLink>
                    <MobileMenuButton onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}>
                      Logout
                    </MobileMenuButton>
                  </div>
                ) : (
                  <div>
                    <MobileMenuLink to="/login" onClick={() => setMobileMenuOpen(false)}>
                      Login
                    </MobileMenuLink>
                    <MobileMenuLink to="/signup" onClick={() => setMobileMenuOpen(false)}>
                      Sign Up
                    </MobileMenuLink>
                  </div>
                )}
              </div>
            </MobileMenuContent>
          </MobileMenuSidebar>
        </MobileMenuOverlay>
      )}
    </NavbarContainer>
  );
};

export default Navbar; 