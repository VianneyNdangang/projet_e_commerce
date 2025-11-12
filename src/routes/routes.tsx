import MainLayout from '@/components/layout/main.layourt';
import { Home } from '@/views/home/home';
import { ListProduct } from '@/views/products/products.list';
import { Cart } from '@/views/cart/cart';
// import { Home } from '@/views/home/home';
import { createHashRouter } from 'react-router';
import { Contact } from '@/views/contact/contact';
import { ListPromotionProduct } from '@/views/promotion/promotion.list';
import AboutPage from '@/views/about/about.page';
import { NewArrivalsPage } from '@/views/news/news.products';
import FavoritesPage from '@/views/favor/favor.product';

export const routers = createHashRouter(
  [
    {
      path: '/login',
      element: <div>Login</div>,
    },
    {
      path: '/403',
      element: <div>Page non autorisee</div>,
    },
    {
      path: '*',
      element: <div>page inexistante</div>,
    },
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          path: '/',
          element:<Home/>,
        },
        {
          path: '/articles',
          element: <ListProduct/>,
        },
        {
          path: '/acount',
          element: <div> Compte</div>,
        },
        {
          path: '/bascket',
          element: <Cart/>,
        },
        {
          path: '/wishlist',
          element: <FavoritesPage/>,
        },
        {
          path: '/about',
          element: <AboutPage/>,
        },
        {
          path: '/promotion',
          element: <ListPromotionProduct/>,
        },
        {
          path: '/news',
          element: <NewArrivalsPage/>,
        },
        {
      path: '/contact',
      element: <Contact/>,
    }
      ],
    },
  ],
  {
    basename: '',
  }
);
