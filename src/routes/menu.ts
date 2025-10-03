
const useMenuRoutes = () => {
  const ROUTES = [
    {
      path: '/',
      name: 'Accueil',
    },
    {
      path: '/articles',
      name: 'Produits',
    },
    {
      path: '/promotion',
      name: 'Promotion',
    },
    {
      path: '/news',
      name: 'Nouveautes',
    },
    {
      path: '/about',
      name: 'A propos',
    },
    {
      path: '/contact',
      name: 'Contact',
    }
  ];

  return { ROUTES };
};

export default useMenuRoutes;
