import { Box } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import React from "react";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.3); opacity: 0.6; }
`;

const CustomLoader: React.FC = () => {
  return (
    <Box
    //   as="div"
      w="full"
      h="full"
      bg="#263038"
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="fixed"
      top="0"
      left="0"
      zIndex={9999}
      flexDirection="column"
      color="#fff"
      fontFamily="Arial, Helvetica, sans-serif"
    >
      {/* Cercle animé */}
      <Box
        position="relative"
        w="80px"
        h="80px"
        border="4px solid #fff"
        borderTop="4px solid #ff3d00"
        borderRadius="50%"
        animation={`${spin} 1s linear infinite`}
      />

      {/* Cercle intérieur pulsant */}
      <Box
        position="absolute"
        w="20px"
        h="20px"
        borderRadius="50%"
        bg="#ff3d00"
        animation={`${pulse} 1.5s ease-in-out infinite`}
        mt="120px"
      />

      {/* Texte animé */}
      <Box
        mt="8"
        fontSize="18px"
        letterSpacing="2px"
        animation={`${pulse} 1.8s ease-in-out infinite`}
      >
        Chargement...
      </Box>
    </Box>
  );
};

export default CustomLoader;
