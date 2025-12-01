import { CustomButton } from "@/components/ui/form/button.component";
import {
  Box,
  Text,
  VStack,
  Image,
  // Heading,
  SimpleGrid,
  IconButton,
  Button,
  Stack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaHeartBroken } from "react-icons/fa";

const MotionBox = motion(Box);
// const MotionImage = motion(Image);
const MotionText = motion(Text);

type Favorite = {
  id: number;
  name: string;
  image: string;
  price: number;
};

const initialFavorites: Favorite[] = [
  {
    id: 1,
    name: "Whiskey Gold Edition",
    image:
      "https://images.unsplash.com/photo-1611078489935-0cb964de46d1?q=80&w=2940&auto=format&fit=crop",
    price: 54.99,
  },
  {
    id: 2,
    name: "Red Wine Premium",
    image:
      "https://images.unsplash.com/photo-1601924638867-3ec3b1d8d8b7?q=80&w=2940&auto=format&fit=crop",
    price: 34.99,
  },
  {
    id: 3,
    name: "Gin Tropical",
    image:
      "https://images.unsplash.com/photo-1504675099198-7023dd85f5a3?q=80&w=2940&auto=format&fit=crop",
    price: 29.99,
  },
];

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState(initialFavorites);

  const removeFavorite = (id: number) => {
    setFavorites((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <Box bg="gray.50" minH="100vh">
      {/* HERO SECTION */}
      <Box position="relative" h={{ base: "60vh", md: "70vh" }}>
        <MotionBox
          objectFit="cover"
          w="full"
          h="full"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          bgGradient="to-tl" gradientFrom="gray.500" gradientTo="gray.950"
        />
        <Box
          position="absolute"
          inset={0}
          bgGradient="linear(to-b, blackAlpha.700, blackAlpha.500)"
        />
        <VStack
          position="absolute"
          inset={0}
          justify="center"
          textAlign="center"
          color="white"
          gap={4}
        >
          <MotionText
            fontSize={{ base: "3xl", md: "5xl" }}
            fontWeight="bold"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Vos Produits Favoris ❤️
          </MotionText>
          <Text maxW="2xl" fontSize={{ base: "md", md: "lg" }}>
            Retrouvez ici tous les articles que vous aimez, prêts à être ajoutés
            à votre panier !
          </Text>
        </VStack>
      </Box>

      {/* FAVORITES LIST */}
      <Box px={{ base: 4, md: 10 }} py={14}>
        {favorites.length === 0 ? (
          <VStack gap={6} py={20} color="gray.500">
            <FaHeartBroken size="60" />
            <Text fontSize="xl" fontWeight="medium">
              Vous n’avez encore aucun produit favori.
            </Text>
            <Button
              colorScheme="yellow"
              size="lg"
              onClick={() => alert("Redirection vers le catalogue...")}
            >
              Explorer les produits
            </Button>
          </VStack>
        ) : (
          <SimpleGrid columns={{ base: 1, sm: 2, md: 4, lg: 5 }} gap={2}>
            {favorites.map((item) => (
              <MotionBox
                key={item.id}
                bg="white"
                rounded="sm"
                shadow="md"
                overflow="hidden"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Box position="relative">
                  <Image
                    src={item.image}
                    alt={item.name}
                    objectFit="cover"
                    w="full"
                    h="240px"
                  />
                  <IconButton
                    position="absolute"
                    top={2}
                    right={2}
                    size="sm"
                    onClick={() => removeFavorite(item.id)}
                    color={"red.500"}
                  >
                    <FaHeartBroken />
                  </IconButton>
                </Box>
                <Box p={4}>
                  <Text fontWeight="bold" fontSize="lg">
                    {item.name}
                  </Text>
                  <Stack justify="space-between" mt={2}>
                    <Text color="yellow.600" fontWeight="semibold">
                      ${item.price.toFixed(2)}
                    </Text>
                    <CustomButton
                      label={"Ajouter au panier"}
                      color={"white"}
                      bg={"black"}
                      type={"button"}
                      onClick={() => alert("Ajouté au panier")}
                      size="sm"
                      w="full"
                    />
                  </Stack>
                </Box>
              </MotionBox>
            ))}
          </SimpleGrid>
        )}
      </Box>
    </Box>
  );
}
