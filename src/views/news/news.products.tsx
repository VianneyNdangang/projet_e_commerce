import { CustomButton } from "@/components/ui/form/button.component";
import {
  Box,
  Text,
  Image,
  VStack,
  HStack,
  Heading,
  Button,
  Tag,
  SimpleGrid,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";

const MotionBox = motion(Box);
const MotionImage = motion(Image);
const MotionText = motion(Text);

type Product = {
  id: number;
  name: string;
  image: string;
  price: number;
  category: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Whiskey Gold Edition",
    image:
      "https://images.unsplash.com/photo-1611078489935-0cb964de46d1?q=80&w=2940&auto=format&fit=crop",
    price: 54.99,
    category: "Whiskey",
  },
  {
    id: 2,
    name: "Red Wine Premium",
    image:
      "https://images.unsplash.com/photo-1601924638867-3ec3b1d8d8b7?q=80&w=2940&auto=format&fit=crop",
    price: 34.99,
    category: "Wine",
  },
  {
    id: 3,
    name: "Vodka Crystal",
    image:
      "https://images.unsplash.com/photo-1626897505254-e0f811aa9bf7?q=80&w=2940&auto=format&fit=crop",
    price: 26.99,
    category: "Vodka",
  },
  {
    id: 4,
    name: "Gin Tropical",
    image:
      "https://images.unsplash.com/photo-1504675099198-7023dd85f5a3?q=80&w=2940&auto=format&fit=crop",
    price: 29.99,
    category: "Gin",
  },
  {
    id: 5,
    name: "Brandy Luxe",
    image:
      "https://images.unsplash.com/photo-1693680501357-a342180f1946?q=80&w=2940&auto=format&fit=crop",
    price: 44.99,
    category: "Brandy",
  },
  {
    id: 6,
    name: "White Wine Collection",
    image:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2940&auto=format&fit=crop",
    price: 32.99,
    category: "Wine",
  },
];

const categories = ["Tous", "Wine", "Whiskey", "Vodka", "Gin", "Brandy"];

export const NewArrivalsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("Tous");

  const filteredProducts =
    selectedCategory === "Tous"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <Box bg="gray.100" minH="100vh">
      {/* HERO SECTION */}
      <Box position="relative" h={{ base: "70vh", md: "80vh" }}>
        <MotionImage
          src="https://images.unsplash.com/photo-1541544741938-0af808871cc0?q=80&w=2940&auto=format&fit=crop"
          alt="New arrivals"
          objectFit="cover"
          w="full"
          h="full"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
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
          px={6}
          gap={4}
        >
          <MotionText
            fontSize={{ base: "3xl", md: "5xl" }}
            fontWeight="bold"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Découvrez Nos Dernières Nouveautés
          </MotionText>
          <Text maxW="2xl" fontSize={{ base: "md", md: "lg" }}>
            Des produits fraîchement arrivés, soigneusement sélectionnés pour
            vous offrir la meilleure expérience.
          </Text>
        </VStack>
      </Box>

      {/* FILTRES */}
      <Box py={10} textAlign="center">
        <HStack justify="center" gap={4} flexWrap="wrap">
          {categories.map((cat) => (
            <Tag.Root
              key={cat}
              size="lg"
              variant={selectedCategory === cat ? "solid" : "subtle"}
              colorScheme={selectedCategory === cat ? "yellow" : "gray"}
              cursor="pointer"
              onClick={() => setSelectedCategory(cat)}
            >
              <Tag.Label>{cat}</Tag.Label>
            </Tag.Root>
          ))}
        </HStack>
      </Box>

      {/* PRODUITS */}
      <Box px={{ base: 4, md: 10 }} pb={20}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4, xl:5 }} gap={2}>
          {filteredProducts.map((product) => (
            <MotionBox
              key={product.id}
              bg="white"
              rounded="sm"
              overflow="hidden"
              shadow="md"
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Box position="relative">
                <Image
                  src={product.image}
                  alt={product.name}
                  objectFit="cover"
                  h="250px"
                  w="full"
                />
                <Box
                  position="absolute"
                  top={2}
                  left={2}
                  bg="yellow.400"
                  color="white"
                  px={3}
                  py={1}
                  rounded="sm"
                  fontSize="sm"
                  fontWeight="bold"
                >
                  Nouveau
                </Box>
              </Box>
              <Box p={4}>
                <Text fontWeight="bold" fontSize="lg">
                  {product.name}
                </Text>
                <Text color="yellow.600" fontWeight="semibold" mt={2}>
                  ${product.price.toFixed(2)}
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
              </Box>
            </MotionBox>
          ))}
        </SimpleGrid>
      </Box>

      {/* CALL TO ACTION */}
      <Box
        py={20}
        bgGradient="linear(to-r, yellow.400, yellow.500)"
        textAlign="center"
        color="white"
      >
        <Heading fontSize={{ base: "2xl", md: "4xl" }} mb={4}>
          Ne Ratez Aucune Nouveauté
        </Heading>
        <Text fontSize="lg" mb={6}>
          Inscrivez-vous à notre newsletter pour recevoir nos dernières offres.
        </Text>
        <Button colorScheme="blackAlpha" size="lg">
          S’inscrire maintenant
        </Button>
      </Box>
    </Box>
  );
}
