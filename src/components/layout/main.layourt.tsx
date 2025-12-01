import { Box, Stack } from "@chakra-ui/react";
import { Outlet, useLocation } from "react-router";
import { HeaderLayourt } from "./header";
import { FooterLayourt } from "./footer";
// import { AnimatePresence, motion } from "framer-motion";

const MainLayout = () => {
  const location = useLocation();

  const SpecificPages: string[] = ["/bascket", "/acount", "/checkout"];
  const existing = SpecificPages.find(
    (element) => element == location.pathname
  );
  return (
    <Box
      overflow={"hidden"}
      w={{ xl: "99.02vw", base: "100vw" }}
      bg={"bg.muted"}
      minH="100vh"
    >
      <HeaderLayourt />
      <Stack justifyContent={"center"}>
        <Box pt={{ base: "14", md: "16" }}>
          <Outlet />
        </Box>
      </Stack>
      {!existing ? <FooterLayourt /> : ""}
    </Box>
  );
};

export default MainLayout;
