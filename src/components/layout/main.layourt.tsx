import { Box, Stack } from "@chakra-ui/react";
import { Outlet, useLocation } from "react-router";
import { HeaderLayourt } from "./header";
import { FooterLayourt } from "./footer";

const MainLayout = () => {
  const location = useLocation();
  console.log("locationlocation", location.pathname);

  const SpecificPages: string[] = ["/bascket", "/acount", "/checkout"];
  return (
    <Box minH="100vh">
      <div>
        <HeaderLayourt />
        <Stack bg={"bg.muted"} justifyContent={"center"} w={"100vw"}>
          <Box as="main" ml={{ base: 0 }} pt="65px">
            <Outlet />
          </Box>
        </Stack>
        {SpecificPages.find((element) => element == location.pathname) ?? <FooterLayourt />}
      </div>
    </Box>
  );
};

export default MainLayout;
