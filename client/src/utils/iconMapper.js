import { 
  FaTachometerAlt, FaUsers, FaDonate, FaFileAlt, FaChartBar, 
  FaCog, FaUser, FaBell, FaBars, FaTimes,
  FaGraduationCap, FaHandsHelping, FaHeart, FaNewspaper,
  FaShoppingCart, FaBox, FaStore, FaEdit, FaShieldAlt,
  FaHome, FaCrown, FaStar, FaRocket, FaGem, FaMagic,
  FaLightbulb, FaBrain, FaEye, FaPalette, FaCode,
  FaDatabase, FaServer, FaNetworkWired, FaCloud,
  FaMobile, FaTablet, FaDesktop, FaGlobe, FaMapMarkerAlt,
  FaCalendar, FaClock, FaHistory, FaBookmark, FaThumbsUp,
  FaThumbsDown, FaEnvelope, FaPhone, FaSms, FaVideo,
  FaImage, FaMusic, FaGamepad, FaTrophy, FaMedal,
  FaFire, FaWater, FaLeaf, FaSun, FaMoon, FaStarHalf,
  FaCreditCard, FaArrowUp, FaArrowDown
} from 'react-icons/fa';

// Icon mapping object
const iconMap = {
  FaTachometerAlt,
  FaUsers,
  FaDonate,
  FaFileAlt,
  FaChartBar,
  FaCog,
  FaUser,
  FaBell,
  FaBars,
  FaTimes,
  FaGraduationCap,
  FaHandsHelping,
  FaHeart,
  FaNewspaper,
  FaShoppingCart,
  FaBox,
  FaStore,
  FaEdit,
  FaShieldAlt,
  FaHome,
  FaCrown,
  FaStar,
  FaRocket,
  FaGem,
  FaMagic,
  FaLightbulb,
  FaBrain,
  FaEye,
  FaPalette,
  FaCode,
  FaDatabase,
  FaServer,
  FaNetworkWired,
  FaCloud,
  FaMobile,
  FaTablet,
  FaDesktop,
  FaGlobe,
  FaMapMarkerAlt,
  FaCalendar,
  FaClock,
  FaHistory,
  FaBookmark,
  FaThumbsUp,
  FaThumbsDown,
  FaEnvelope,
  FaPhone,
  FaSms,
  FaVideo,
  FaImage,
  FaMusic,
  FaGamepad,
  FaTrophy,
  FaMedal,
  FaFire,
  FaWater,
  FaLeaf,
  FaSun,
  FaMoon,
  FaStarHalf,
  FaCreditCard,
  FaArrowUp,
  FaArrowDown
};

// Function to get icon component by name
export const getIconComponent = (iconName) => {
  return iconMap[iconName] || FaCog; // Default to FaCog if icon not found
};

// Function to render icon component
export const renderIcon = (iconName, props = {}) => {
  const IconComponent = getIconComponent(iconName);
  return <IconComponent {...props} />;
}; 