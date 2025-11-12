import { Box, Text, VStack, Image } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const MotionBox = motion(Box);

type Slide = {
  id: number;
  title: string;
  description: string;
  image: string;
};

const slides: Slide[] = [
  {
    id: 1,
    title: "Nouvelles Collections 🌟",
    description:
      "Découvrez nos derniers arrivages de produits exclusifs sélectionnés avec soin.",
    image:
      "https://i.postimg.cc/R0jpNxsP/pexels-markus-winkler-1430818-3812433.jpg",
  },
  {
    id: 2,
    title: "Livraison Rapide 🚚",
    description:
      "Profitez d’une expérience d’achat fluide avec une expédition express en 24h.",
    image:
      "https://i.postimg.cc/rmm3t9MS/pexels-ketut-subiyanto-4247766.jpg",
  },
  {
    id: 3,
    title: "Offres Exclusives 💸",
    description:
      "Ne manquez pas nos réductions hebdomadaires sur vos produits préférés.",
    image:
      "https://i.postimg.cc/bv3NhLmY/pexels-joslyn-pickens-2185980-3833052-1.jpg",
  },
];

export default function AutoChangingContent() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const current = slides[index];

  return (
    <Box
      position="relative"
      overflow="hidden"
      bg="gray.50"
      w="full"
      h={{ base: "200px", md: "300px" }}
    >
      <AnimatePresence mode="wait">
        <MotionBox
          key={current.id}
          position="absolute"
          top={0}
          left={0}
          w="full"
          h="full"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          <Image
            src={current.image}
            alt={current.title}
            w="full"
            h="full"
            objectFit="cover"
            filter="brightness(60%)"
          />
          <VStack
            position="absolute"
            top="0"
            left="0"
            w="full"
            h="full"
            justify="center"
            align="center"
            px={6}
            textAlign="center"
            color="white"
          >
            <Text
              fontSize={{ base: "2xl", md: "4xl" }}
              fontWeight="bold"
              mb={4}
              textShadow="0 4px 12px rgba(0,0,0,0.5)"
            >
              {current.title}
            </Text>
            <Text
              fontSize={{ base: "md", md: "lg" }}
              maxW="2xl"
              textShadow="0 2px 8px rgba(0,0,0,0.5)"
            >
              {current.description}
            </Text>
          </VStack>
        </MotionBox>
      </AnimatePresence>
    </Box>
  );
}
