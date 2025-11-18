import MainLayout from '@/components/layout/main.layourt';
import { Home } from '@/views/home/home';
import { createHashRouter } from 'react-router';
import { Contact } from '@/views/contact/contact';
import { ServicesList } from '@/views/promotion/services';
import AboutPage from '@/views/about/about.page';
import { NewArrivalsPage } from '@/views/news/news.products';

export const routers = createHashRouter(
  [
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
          element: <Home />,
        },
        {
          path: '/about',
          element: <AboutPage />,
        },
        {
          path: '/services',
          element: <ServicesList />,
        },
        {
          path: '/news',
          element: <NewArrivalsPage />,
        },
        {
          path: '/contact',
          element: <Contact />,
        },
      ],
    },
  ],
  {
    basename: '',
  }
);
