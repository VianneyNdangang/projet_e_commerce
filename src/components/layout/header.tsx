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
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineShoppingCart, AiOutlineHeart } from "react-icons/ai";
import { useLocation } from "react-router";
import { HiMenu } from "react-icons/hi";
import { CustomInput } from "../ui/form/input.component";
import { FiSearch } from "react-icons/fi";
import { Tooltip } from "../ui/tooltip";
import { useState } from "react";
import { UserForm } from "@/views/security/form.user";
import { useForm } from "react-hook-form";

export const HeaderLayourt = () => {
  // const userId = 1;
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
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title fontSize={"xl"}>Menu</Drawer.Title>
            </Drawer.Header>
            <Separator mx={"3"} bg={"black"} border={"sm"} />
            <Drawer.Body>
              <VStack gap={"5"}>
                <Box textAlign={"left"}>
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

          <HStack gap={"5"} display={{ base: "none", lg: "flex" }}>
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

          <HStack gap={{base:2, md:4}}>
            <Stack display={{ base: "flex", lg: "none" }}>
              <FiSearch />
            </Stack>
            <HStack display={{ base: "none", lg: "flex" }}>
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

            <Tooltip showArrow content="compte">
              <Icon
                onClick={() => handleAcount()}
                _hover={{ cursor: "pointer" }}
                color={Activeted("/acount") ? "blue.500" : "yellow.500"}
                size={{ md: "lg", base: "sm" }}
              >
                <FaUserCircle />
              </Icon>
            </Tooltip>
            <Tooltip showArrow content="Favoris">
              <Icon
                onClick={() => navigate("/wishlist")}
                _hover={{ cursor: "pointer" }}
                color={Activeted("/wishlist") ? "blue.500" : "yellow.500"}
                size={{ md: "lg", base: "sm" }}
              >
                <AiOutlineHeart />
              </Icon>
            </Tooltip>
            <Tooltip showArrow content="Chariot">
              <Icon
                onClick={() => navigate("/bascket")}
                _hover={{ cursor: "pointer" }}
                color={Activeted("/bascket") ? "blue.500" : "yellow.500"}
                size={{ md: "lg", base: "sm" }}
              >
                <AiOutlineShoppingCart />
              </Icon>
            </Tooltip>
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
const NavItem = ({ active, children, ...rest }: any) => {
  return (
    <>
      <Flex
        my={4}
        onClick={rest.onClick}
        cursor="pointer"
        color={active ? "blue.500" : "gray.300"}
        borderBottom={{ md: active ? "3px solid blue" : "none", base: "none" }}
        rounded={"none"}
        fontFamily={"cursive"}
        fontWeight="semibold"
        _hover={{
          color: active ? "blue.600" : "white",
        }}
        {...rest}
      >
        <Text fontSize={{ md: "md", base: "lg" }}>{children}</Text>
      </Flex>
    </>
  );
};
