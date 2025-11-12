import { ScrollAnimationBox } from "@/components/layout/ui/shared/animation";
import { HomeProductTable } from "@/components/layout/ui/shared/home.product.table.shared";
import { instance } from "@/helpers/api";
import {
  Box,
  Button,
  Center,
  Grid,
  Heading,
  Image,
  Spinner,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import CategoriesSection from "./grid";
import { motion } from "framer-motion";
import AutoChangingContent from "@/components/layout/ui/shared/AutoChangingComponent";

export const Home = () => {
  const MotionBox = motion(Box);
  const MotionText = motion(Text);
  const MotionImage = motion(Image);
  const fetchUsers = async () => {
    const data = await instance.get(`bestSellersByCategory`);
    return data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["home"], // identifiant du cache
    queryFn: fetchUsers, // la fonction qui appelle ton API
    staleTime: 1000 * 60 * 5, // 5 minutes sans refetch
  });

  // const links = [
  //   { name: "Open roles", href: "#" },
  //   { name: "Internship program", href: "#" },
  //   { name: "Our values", href: "#" },
  //   { name: "Meet our leadership", href: "#" },
  // ];
  // const stats = [
  //   { name: "Offices worldwide", value: "12" },
  //   { name: "Full-time colleagues", value: "300+" },
  //   { name: "Hours per week", value: "40" },
  //   { name: "Paid time off", value: "Unlimited" },
  // ];

  return (
    <>
      <Box
        position="relative"
        h={{ base: "80vh", md: "90vh" }}
        display="flex"
        alignItems="center"
        justifyContent="center"
        overflow="hidden"
      >
        <MotionImage
          src="https://i.postimg.cc/BnrLHt85/pexels-solliefoto-298863.jpg"
          alt="Hero"
          objectFit="cover"
          w="full"
          h="full"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 3, ease: "easeOut" }}
        />
        <MotionBox
          bg={"rgba(0, 0, 0, 0.6)"}
          h={"full"}
          w={"full"}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          position="absolute"
          inset={0}
          bgGradient="linear(to-b, blackAlpha.700, blackAlpha.500)"
        />
        <Box
          position="absolute"
          inset={0}
          bgGradient="linear(to-b, blackAlpha.600, blackAlpha.700)"
        />
        <VStack gap={4} position="absolute" textAlign="center" color="white">
          <MotionText
            fontSize={{ base: "3xl", md: "6xl" }}
            fontWeight="bold"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Découvrez Nos Boissons d'Exception
          </MotionText>
          <Text fontSize={{ base: "md", md: "xl" }} color="gray.200">
            Laissez-vous tenter par notre sélection raffinée.
          </Text>
          <Button
            // rightIcon={<ArrowForwardIcon />}
            colorScheme="yellow"
            size="lg"
            _hover={{ transform: "scale(1.05)" }}
          >
            Explorer la boutique
          </Button>
        </VStack>
      </Box>
      <Box py={10} px={2}>
        <AutoChangingContent/>
      </Box>
      <Box py={16} px={{ base: 4, md: 10 }}>
        <Heading mb={8} textAlign="center">
          Catégories Populaires
        </Heading>
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          }}
          gap={6}
        >
          {categories.map((cat) => (
            <MotionBox
              key={cat.id}
              position="relative"
              rounded="sm"
              overflow="hidden"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.4 }}
              cursor="pointer"
            >
              <Image
                src={cat.image}
                alt={cat.title}
                objectFit="cover"
                h="300px"
                w="full"
              />
              <Box
                position="absolute"
                inset={0}
                bgGradient="linear(to-b, blackAlpha.600, blackAlpha.300)"
              />
              <Text
                position="absolute"
                bottom={4}
                left={4}
                color="white"
                fontSize="2xl"
                fontWeight="semibold"
              >
                {cat.title}
              </Text>
            </MotionBox>
          ))}
        </Grid>
      </Box>

      <CategoriesSection />
      <ScrollAnimationBox
        children={
          <Stack px={{ md: 5, base: 2 }}>
            {isLoading ? (
              <Center py={12}>
                <VStack gap={4}>
                  <Spinner size="xl" color="blue.500" />
                  <Text color="gray.600" fontSize="lg" fontWeight="medium">
                    Chargement des produits...
                  </Text>
                </VStack>
              </Center>
            ) : (
              <HomeProductTable
                items={data?.data}
                title={"Produits a la mode"}
              />
            )}
            
          </Stack>
        }
      />

      <Box py={16} px={{ base: 4, md: 10 }} bg="white">
        <Heading mb={8} textAlign="center">
          Produits Vedettes
        </Heading>
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          }}
          gap={8}
        >
          {products.map((p) => (
            <MotionBox
              key={p.id}
              bg="gray.100"
              rounded="sm"
              overflow="hidden"
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Image
                src={p.image}
                alt={p.name}
                h="250px"
                w="full"
                objectFit="cover"
              />
              <Box p={4}>
                <Text fontWeight="semibold" fontSize="lg">
                  {p.name}
                </Text>
                <Text color="yellow.600" fontWeight="bold" mt={2}>
                  ${p.price.toFixed(2)}
                </Text>
                <Button
                  mt={3}
                  colorScheme="yellow"
                  size="sm"
                  w="full"
                  _hover={{ bg: "yellow.500" }}
                >
                  Ajouter au panier
                </Button>
              </Box>
            </MotionBox>
          ))}
        </Grid>
      </Box>

      {/* CALL TO ACTION */}
      <Box
        py={20}
        // bgGradient="linear(to-r, yellow.400, yellow.500)"
        textAlign="center"
        color="white"
        px={2}
        bgGradient="to-r"
        gradientFrom="orange.500"
        gradientTo="black"
      >
        <Heading fontSize={{ base: "2xl", md: "4xl" }} mb={4}>
          Rejoignez Notre Communauté de Passionnés
        </Heading>
        <Text fontSize="lg" mb={6}>
          Inscrivez-vous à notre newsletter et recevez des offres exclusives.
        </Text>
        <Button bg="blackAlpha.500" variant="solid" size="lg">
          S’inscrire maintenant
        </Button>
      </Box>
    </>
  );
};

// // --- Données dynamiques ---
const categories = [
  {
    id: 1,
    title: "Wines",
    image:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2940&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Whiskey",
    image:
      "https://images.unsplash.com/photo-1571104508999-893933ded431?q=80&w=2940&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Vodka",
    image:
      "https://images.unsplash.com/photo-1626897505254-e0f811aa9bf7?q=80&w=2940&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Brandy",
    image:
      "https://images.unsplash.com/photo-1693680501357-a342180f1946?q=80&w=2940&auto=format&fit=crop",
  },
  {
    id: 1,
    title: "Wines",
    image:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2940&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Whiskey",
    image:
      "https://images.unsplash.com/photo-1571104508999-893933ded431?q=80&w=2940&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Vodka",
    image:
      "https://images.unsplash.com/photo-1626897505254-e0f811aa9bf7?q=80&w=2940&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Brandy",
    image:
      "https://images.unsplash.com/photo-1693680501357-a342180f1946?q=80&w=2940&auto=format&fit=crop",
  },
  {
    id: 1,
    title: "Wines",
    image:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2940&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Whiskey",
    image:
      "https://images.unsplash.com/photo-1571104508999-893933ded431?q=80&w=2940&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Vodka",
    image:
      "https://images.unsplash.com/photo-1626897505254-e0f811aa9bf7?q=80&w=2940&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Brandy",
    image:
      "https://images.unsplash.com/photo-1693680501357-a342180f1946?q=80&w=2940&auto=format&fit=crop",
  }
];

const products = [
  {
    id: 1,
    name: "Premium Red Wine",
    image:
      "https://images.unsplash.com/photo-1601924638867-3ec3b1d8d8b7?q=80&w=2940&auto=format&fit=crop",
    price: 29.99,
  },
  {
    id: 2,
    name: "Classic Whiskey",
    image:
      "https://images.unsplash.com/photo-1563194800-33f5b8d89e5a?q=80&w=2940&auto=format&fit=crop",
    price: 49.99,
  },
  {
    id: 3,
    name: "Gin Tonic Bottle",
    image:
      "https://images.unsplash.com/photo-1504675099198-7023dd85f5a3?q=80&w=2940&auto=format&fit=crop",
    price: 24.99,
  },
];

// // --- Composant principal ---
// export const Home= ()=> {
//   return (
//     <Box bg="gray.50" minH="100vh">
//       {/* HERO SECTION */}
//       <Box
//         position="relative"
//         h={{ base: "80vh", md: "90vh" }}
//         display="flex"
//         alignItems="center"
//         justifyContent="center"
//         overflow="hidden"
//       >
//         <MotionImage
//           src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2940&auto=format&fit=crop"
//           alt="Hero"
//           objectFit="cover"
//           w="full"
//           h="full"
//           initial={{ scale: 1.2 }}
//           animate={{ scale: 1 }}
//           transition={{ duration: 3, ease: "easeOut" }}
//         />
//         <Box
//           position="absolute"
//           inset={0}
//           bgGradient="linear(to-b, blackAlpha.600, blackAlpha.700)"
//         />
//         <VStack gap={4} position="absolute" textAlign="center" color="white">
//           <MotionText
//             fontSize={{ base: "3xl", md: "6xl" }}
//             fontWeight="bold"
//             initial={{ opacity: 0, y: 40 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1 }}
//           >
//             Découvrez Nos Boissons d'Exception
//           </MotionText>
//           <Text fontSize={{ base: "md", md: "xl" }} color="gray.200">
//             Laissez-vous tenter par notre sélection raffinée.
//           </Text>
//           <Button
//             // rightIcon={<ArrowForwardIcon />}
//             colorScheme="yellow"
//             size="lg"
//             _hover={{ transform: "scale(1.05)" }}
//           >
//             Explorer la boutique
//           </Button>
//         </VStack>
//       </Box>

//       {/* CATÉGORIES */}
//       <Box py={16} px={{ base: 4, md: 10 }}>
//         <Heading mb={8} textAlign="center">
//           Catégories Populaires
//         </Heading>
//         <Grid
//           templateColumns={{ base: "repeat(1, 1fr)", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }}
//           gap={6}
//         >
//           {categories.map((cat) => (
//             <MotionBox
//               key={cat.id}
//               position="relative"
//               borderRadius="xl"
//               overflow="hidden"
//               whileHover={{ scale: 1.03 }}
//               transition={{ duration: 0.4 }}
//               cursor="pointer"
//             >
//               <Image src={cat.image} alt={cat.title} objectFit="cover" h="300px" w="full" />
//               <Box
//                 position="absolute"
//                 inset={0}
//                 bgGradient="linear(to-b, blackAlpha.600, blackAlpha.300)"
//               />
//               <Text
//                 position="absolute"
//                 bottom={4}
//                 left={4}
//                 color="white"
//                 fontSize="2xl"
//                 fontWeight="semibold"
//               >
//                 {cat.title}
//               </Text>
//             </MotionBox>
//           ))}
//         </Grid>
//       </Box>

//       {/* PRODUITS VEDETTES */}
//       <Box py={16} px={{ base: 4, md: 10 }} bg="white">
//         <Heading mb={8} textAlign="center">
//           Produits Vedettes
//         </Heading>
//         <Grid
//           templateColumns={{ base: "repeat(1, 1fr)", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }}
//           gap={8}
//         >
//           {products.map((p) => (
//             <MotionBox
//               key={p.id}
//               bg="gray.100"
//               borderRadius="lg"
//               overflow="hidden"
//               whileHover={{ y: -8 }}
//               transition={{ type: "spring", stiffness: 200 }}
//             >
//               <Image src={p.image} alt={p.name} h="250px" w="full" objectFit="cover" />
//               <Box p={4}>
//                 <Text fontWeight="semibold" fontSize="lg">
//                   {p.name}
//                 </Text>
//                 <Text color="yellow.600" fontWeight="bold" mt={2}>
//                   ${p.price.toFixed(2)}
//                 </Text>
//                 <Button
//                   mt={3}
//                   colorScheme="yellow"
//                   size="sm"
//                   w="full"
//                   _hover={{ bg: "yellow.500" }}
//                 >
//                   Ajouter au panier
//                 </Button>
//               </Box>
//             </MotionBox>
//           ))}
//         </Grid>
//       </Box>

//       {/* CALL TO ACTION */}
//       <Box
//         py={20}
//         bgGradient="linear(to-r, yellow.400, yellow.500)"
//         textAlign="center"
//         color="white"
//       >
//         <Heading fontSize={{ base: "2xl", md: "4xl" }} mb={4}>
//           Rejoignez Notre Communauté de Passionnés
//         </Heading>
//         <Text fontSize="lg" mb={6}>
//           Inscrivez-vous à notre newsletter et recevez des offres exclusives.
//         </Text>
//         <Button colorScheme="blackAlpha" variant="solid" size="lg">
//           S’inscrire maintenant
//         </Button>
//       </Box>
//     </Box>
//   );
// }
