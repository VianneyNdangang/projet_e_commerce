import useMenuRoutes from '@/routes/menu';
import {
  Box,
  Drawer,
  Flex,
  HStack,
  Icon,
  IconButton,
  Portal,
  Separator,
  Strong,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { NavLink, useNavigate } from 'react-router';
import { FaUserCircle } from 'react-icons/fa';
import { AiOutlineShoppingCart, AiOutlineHeart } from 'react-icons/ai';
import { useLocation } from 'react-router';
import { MdStackedBarChart } from 'react-icons/md';

export const HeaderLayourt = () => {
  const { ROUTES } = useMenuRoutes();
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();
  const { open, onToggle, setOpen } = useDisclosure();
  const isActivePath = (item: any) => {
    if (path.includes(item.name)) return true;
    if (path == item.path) return true;
    return false;
  };
  const Activeted = (url: string) => {
    if (path == url) return true;
    return false;
  };

  const mobile = (
    <Drawer.Root
      open={open}
      placement={'start'}
      onOpenChange={() => setOpen(false)}
    >
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title fontSize={'xl'}>Menu</Drawer.Title>
            </Drawer.Header>
            <Separator mx={"3"} bg={"black"} border={"sm"}/>
            <Drawer.Body>
              <VStack gap={'5'}>
                <Box textAlign={'left'}>
                  {ROUTES.map((item, index) => (
                    <Box key={index} onClick={() => setOpen(false)}>
                      <NavLink to={item.path}>
                        <NavItem key={item.name} active={isActivePath(item)}>
                          {item.name}
                        </NavItem>
                      </NavLink>
                    </Box>
                  ))}
                </Box>
              </VStack>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );

  const desktop = (
    <Box
      as="header"
      position="fixed"
      top="0"
      left="0"
      right="0"
      bg={'whiteAlpha.900'}
      py={'4'}
      px={'10'}
      zIndex="overlay"
      color="black"
      h="16"
    >
      <Flex h="100%" alignItems="center" justifyContent="space-between">
        <IconButton
          aria-label="Open menu"
          display={{ base: 'flex', md: 'none' }}
          onClick={onToggle}
          bg={'none'}
          variant="ghost"
          color="black"
          _focus={{ outline: 'none' }}
        >
          <MdStackedBarChart />
        </IconButton>
        <HStack gap={'5'}>
          <Box onClick={() => navigate('/')} cursor={'pointer'}>
            <Strong>Logo</Strong>
          </Box>
        </HStack>

        <HStack gap={'5'} display={{ base: 'none', md: 'flex' }}>
          {ROUTES.map((item, index) => (
            <Box key={index}>
              <NavLink to={item.path}>
                <NavItem key={item.name} active={isActivePath(item)}>
                  {item.name}
                </NavItem>
              </NavLink>
            </Box>
          ))}
        </HStack>
        <HStack gap={'5'}>
          <Icon
            onClick={() => {
              navigate('/acount');
            }}
            _hover={{ cursor: 'pointer' }}
            color={Activeted('/acount') ? 'blue' : 'black'}
          >
            <FaUserCircle />
          </Icon>
          <Icon
            onClick={() => navigate('/wishlist')}
            _hover={{ cursor: 'pointer' }}
            color={Activeted('/wishlist') ? 'blue' : 'black'}
          >
            <AiOutlineHeart />
          </Icon>
          <Icon
            onClick={() => navigate('/bascket')}
            _hover={{ cursor: 'pointer' }}
            color={Activeted('/bascket') ? 'blue' : 'black'}
          >
            <AiOutlineShoppingCart />
          </Icon>
        </HStack>
      </Flex>
    </Box>
  );
  return (
    <>
      {desktop}
      {mobile}
    </>
  );
};
const NavItem = ({ active, children, ...rest }: any) => {
  return (
    <Flex
      my={4}
      onClick={rest.onClick}
      cursor="pointer"
      color={active ? 'blue' : 'black'}
      borderBottom={{md:active ? '3px solid blue' : 'none', base:"none"}}
      rounded={'none'}
      fontFamily={'cursive'}
      fontWeight="semibold"
      _hover={{
        color: active ? 'blue.600' : 'blackAlpha.600',
      }}
      {...rest}
    >
      <Text fontSize={{ md: 'md', base: 'lg' }}>{children}</Text>
    </Flex>
  );
};
