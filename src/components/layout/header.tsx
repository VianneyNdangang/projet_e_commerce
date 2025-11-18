import useMenuRoutes from '@/routes/menu';
import {
  Box,
  Drawer,
  Flex,
  HStack,
  Icon,
  IconButton,
  Image,
  Portal,
  Separator,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { NavLink, useNavigate } from 'react-router';
import { FaBoxOpen } from 'react-icons/fa';
import { useLocation } from 'react-router';
import { HiMenu } from 'react-icons/hi';
import { FiSearch } from 'react-icons/fi';

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

  const mobile = (
    <Drawer.Root
      open={open}
      placement={'start'}
      onOpenChange={() => setOpen(false)}
    >
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content bg={'white'} color={'purple'}>
            <Drawer.Header>
              <Drawer.Title fontSize={'2xl'}>Menu</Drawer.Title>
            </Drawer.Header>
            <Separator />
            <Drawer.Body>
              <Stack gap={1}>
                {ROUTES.map((item, index) => (
                  <Box key={index} onClick={() => setOpen(false)}>
                    <NavLink to={item.path}>
                      <NavItem
                        icon={item.icon}
                        key={item.name}
                        active={isActivePath(item)}
                      >
                        {item.label}
                      </NavItem>
                    </NavLink>
                  </Box>
                ))}
                <Flex
                  my={4}
                  cursor="pointer"
                  color={'purple'}
                  rounded={'none'}
                  fontFamily={'inherit'}
                  fontWeight="semibold"
                  _hover={{
                    color: 'orange.600',
                  }}
                >
                  <Flex>
                    <Icon
                      mr="4"
                      fontSize="2xl"
                      _groupHover={{
                        color: 'white',
                      }}
                      as={FaBoxOpen}
                    />
                    Services
                  </Flex>
                </Flex>
              </Stack>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );

  const desktop = (
    <>
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
        boxShadow={'sm'}
        h={{ base: '14', md: '16' }}
      >
        <Flex h="100%" alignItems="center" justifyContent="space-between">
          <Stack onClick={() => navigate('/')} cursor={'pointer'}>
            <Image
              src={'Logo_industrial_workshop_2.png'}
              h={{ base: '20', md: '32' }}
            />
          </Stack>

          <HStack
            gap={{ base: 3, xl: 5 }}
            display={{ base: 'none', lg: 'flex' }}
          >
            {ROUTES.map((item, index) => (
              <Box key={index}>
                <NavLink to={item.path}>
                  <NavItem key={item.name} active={isActivePath(item)}>
                    {item.label}
                  </NavItem>
                </NavLink>
              </Box>
            ))}
            <Flex
              my={4}
              cursor="pointer"
              color={'purple'}
              rounded={'none'}
              fontFamily={'inherit'}
              fontWeight="semibold"
              _hover={{
                color: 'orange.600',
              }}
            >
              <Flex>Services</Flex>
            </Flex>
          </HStack>
          <IconButton
            aria-label="Open menu"
            display={{ base: 'flex', lg: 'none' }}
            onClick={onToggle}
            bg={'none'}
            variant="ghost"
            color="purpel"
            border={'none'}
            _focus={{ outline: 'none' }}
            size={'2xl'}
          >
            <HiMenu />
          </IconButton>
        </Flex>
      </Box>
    </>
  );
  return (
    <>
      {desktop}
      {mobile}
    </>
  );
};
const NavItem = ({ icon, active, children, ...rest }: any) => {
  return (
    <Box
      px={1}
      py={'0.5'}
      my={1}
      rounded={'md'}
      _hover={{
        color: 'orange.400',
      }}
    >
      <Flex
        my={4}
        onClick={rest.onClick}
        cursor="pointer"
        color={active ? 'orange.600' : 'purple'}
        borderBottom={active ? '2px solid' : 'none'}
        rounded={'none'}
        fontFamily={'inherit'}
        fontWeight="bold"
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="2xl"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        <Text fontSize={{ md: 'md', base: 'lg' }}>{children}</Text>
      </Flex>
    </Box>
  );
};
