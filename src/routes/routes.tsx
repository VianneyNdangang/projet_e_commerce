import MainLayout from '@/components/layout/main.layourt';
import { Home } from '@/views/home/home';
import { ListProduct } from '@/views/products/products.list';
import { ProductDetail } from '@/views/products/product.detail';
import { Cart } from '@/views/cart/cart';
// import { Home } from '@/views/home/home';
import { createHashRouter } from 'react-router';

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
          path: '/product/:id',
          element: <ProductDetail/>,
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
          element: <div> Favorie</div>,
        },
        {
          path: '/about',
          element: <div> A propos de nous </div>,
        },
        {
          path: '/promotion',
          element: <div>Promotion</div>,
        },
        {
          path: '/news',
          element: <div>Nouveautes</div>,
        },
        {
      path: '/contact',
      element: <div>Contact</div>,
    }
      ],
    },
  ],
  {
    basename: '',
  }
);
