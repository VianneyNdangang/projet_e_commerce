import { FaEnvelope, FaHome, FaInfoCircle, FaStar, FaTags } from "react-icons/fa";

const useMenuRoutes = () => {
  const ROUTES = [
    {
      path: '/',
      name: 'home',
      icon: FaHome,
       label: 'Accueil'
    },
    {
      path: '/services',
      name: 'services',
      icon: FaTags,
      label: 'Nos services'
    },
    {
      path: '/news',
      name: 'news',
      icon: FaStar,
      label: 'Nouveautes'
    },
    {
      path: '/about',
      name: 'about',
      icon: FaInfoCircle,
      label: 'A propos'
    },
    {
      path: '/contact',
      name: 'contact',
      icon: FaEnvelope,
      label: 'Contact'
    }
  ];

  return { ROUTES };
};

export default useMenuRoutes;
