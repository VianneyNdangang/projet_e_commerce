import useMenuRoutes from "@/routes/menu";
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
  Strong,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { NavLink, useNavigate } from "react-router";
import { FaHeart, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { useLocation } from "react-router";
import { HiMenu } from "react-icons/hi";
import { CustomInput } from "../ui/form/input.component";
import { FiSearch } from "react-icons/fi";
import { Tooltips} from "../ui/tooltip";
import { useState } from "react";
import { UserForm } from "@/views/security/form.user";
import { useForm } from "react-hook-form";

export const HeaderLayourt = () => {
  const { ROUTES } = useMenuRoutes();
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const { open, onToggle, setOpen } = useDisclosure();
  const {control, handleSubmit}= useForm<any>()
  const isActivePath = (item: any) => {
    if (path.includes(item.name)) return true;
    if (path == item.path) return true;
    return false;
  };
  const Activeted = (url: string) => {
    if (path == url) return true;
    return false;
  };

  const handleAcount = () => {
    setIsLogin(true);
  };

  const mobile = (
    <Drawer.Root
      open={open}
      placement={"start"}
      onOpenChange={() => setOpen(false)}
    >
      <Portal>
        <Drawer.Backdrop/>
        <Drawer.Positioner>
          <Drawer.Content  bg={"black"} color={"gray.100"}>
            <Drawer.Header>
              <Drawer.Title fontSize={"2xl"}>Menu</Drawer.Title>
            </Drawer.Header>
            <Separator/>
            <Drawer.Body>
              <Stack gap={1}>
                  {ROUTES.map((item, index) => (
                    <Box key={index} onClick={() => setOpen(false)}>
                      <NavLink to={item.path}>
                        <NavItem icon={item.icon} key={item.name} active={isActivePath(item)}>
                          {item.label}
                        </NavItem>
                      </NavLink>
                    </Box>
                  ))}
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
        bg={"black"}
        py={"4"}
        px={"10"}
        zIndex="overlay"
        boxShadow={"sm"}
        color="white"
        h={{base:"14", md:"16"}}
      >
        <Flex h="100%" alignItems="center" justifyContent="space-between">
          <IconButton
            aria-label="Open menu"
            display={{ base: "flex", lg: "none" }}
            onClick={onToggle}
            bg={"none"}
            variant="ghost"
            color="white"
            _focus={{ outline: "none" }}
            size={"2xl"}
          >
            <HiMenu/>
          </IconButton>
          <HStack gap={"5"} p={"2"}>
            <HStack onClick={() => navigate("/")} cursor={"pointer"}>
              <Image
                src={"tchokos-sarl.jpg"}
                h={"10"}
                w={10}
                rounded={"full"}
              />
              <Strong fontSize={"xs"} display={{ base: "none", md: "flex" }}>
                Tchokos SARL
              </Strong>
              {/* <Strong>Logo</Strong> */}
            </HStack>
          </HStack>

          <HStack gap={{base:3, xl:5}} display={{ base: "none", lg: "flex" }}>
            {ROUTES.map((item, index) => (
              <Box key={index}>
                <NavLink to={item.path}>
                  <NavItem key={item.name} active={isActivePath(item)}>
                    {item.label}
                  </NavItem>
                </NavLink>
              </Box>
            ))}
          </HStack>

          <HStack gap={{base:2, md:4}}>
            <Stack display={{ base: "flex", xl: "none" }}>
              <FiSearch />
            </Stack>
            <HStack display={{ base: "none", xl: "flex" }}>
              <form onSubmit={handleSubmit()}>
              <CustomInput
                icon={<FiSearch />}
                placeholder={"Recheche"}
                size={"xs"}
                isDisabled={false}
                type="search"
                name={""}
                control={control}
              /></form>
            </HStack>

            <Tooltips showArrow content="compte">
              <Icon
                onClick={() => handleAcount()}
                _hover={{ cursor: "pointer" }}
                color={Activeted("/acount") ? "blue.500" : "yellow.500"}
                size={{ md: "lg", base: "sm" }}
              >
                <FaUserCircle />
              </Icon>
            </Tooltips>
            <Tooltips showArrow content="Favoris">
              <Icon
                onClick={() => navigate("/wishlist")}
                _hover={{ cursor: "pointer" }}
                color={Activeted("/wishlist") ? "blue.500" : "yellow.500"}
                size={{ md: "lg", base: "sm" }}
              >
                <FaHeart/>
              </Icon>
            </Tooltips>
            <Tooltips showArrow content="Chariot">
              <Icon
                onClick={() => navigate("/bascket")}
                _hover={{ cursor: "pointer" }}
                color={Activeted("/bascket") ? "blue.500" : "yellow.500"}
                size={{ md: "lg", base: "sm" }}
              >
                <FaShoppingCart/>
              </Icon>
            </Tooltips>
          </HStack>
        </Flex>
      </Box>
      <UserForm open={isLogin} close={() => setIsLogin(false)} />
    </>
  );
  return (
    <>
      {desktop}
      {mobile}
    </>
  );
};
const NavItem = ({icon, active, children, ...rest }: any) => {
  return (
    <>
      <Flex
        my={4}
        onClick={rest.onClick}
        cursor="pointer"
        color={active ? "blue.500" : "gray.300"}
        borderBottom={active ? "2px solid" : "none"}
        rounded={"none"}
        fontFamily={"inherit"}
        fontWeight="semibold"
        _hover={{
          color: active ? "blue.600" : "white",
        }}
        {...rest}
      >
         {icon && (
          <Icon
            mr='4'
            fontSize='2xl'
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        <Text fontSize={{ md: "md", base: "lg" }}>{children}</Text>
      </Flex>
    </>
  );
};
