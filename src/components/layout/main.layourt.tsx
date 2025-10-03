import { Box, Stack } from '@chakra-ui/react';
import { Outlet } from 'react-router';
import { HeaderLayourt } from './header';
import { FooterLayourt } from './footer';

const MainLayout = () => {
  return (
    <Box minH="100vh">
      <div>
        <HeaderLayourt />
        <Stack bg={'bg.muted'} justifyContent={'center'} w={'100vw'}>
          <Box as="main" ml={{ base: 0 }} pt="48px">
            <Outlet />
          </Box>
        </Stack>
        <FooterLayourt />
      </div>
    </Box>
  );
};

export default MainLayout;
