import { ScrollAnimationBox } from "@/components/layout/ui/shared/animation";
import { HomeProductTable } from "@/components/layout/ui/shared/home.product.table.shared";
// import { instance } from "@/helpers/api";
import {
  Box,
  Button,
  Grid,
  Heading,
  Image,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
// import { useQuery } from "@tanstack/react-query";
import CategoriesSection from "./grid";
import { motion } from "framer-motion";
import AutoChangingContent from "@/components/layout/ui/shared/AutoChangingComponent";
// import CustomLoader from "@/components/layout/ui/shared/loading";

export const Home = () => {
  const MotionBox = motion(Box);
  const MotionText = motion(Text);
  const MotionImage = motion(Image);
  // const fetchUsers = async () => {
  //   const data = await instance.get(`bestSellersByCategory`);
  //   return data;
  // };

  // const { data, isLoading } = useQuery({
  //   queryKey: ["home"], // identifiant du cache
  //   queryFn: fetchUsers, // la fonction qui appelle ton API
  //   staleTime: 1000 * 60 * 5, // 5 minutes sans refetch
  // });
  // if (isLoading){
  //     return <CustomLoader />
  // }

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
        <AutoChangingContent />
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
           
              <HomeProductTable
                items={data?.data}
                title={"Produits a la mode"}
              />
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
  },
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

const data = {
  data: [
    {
      "id": "1",
      "name": "Électronique",
      "slug": "electronique",
      "bestSellers": [
        {
          "id": 106,
          "title": "Chargeur Rapide USB-C 30W",
          "image": "https://i.postimg.cc/sXhZxQzb/pexels-melvin-buezo-1253763-2529148.jpg",
          "price": 17.5,
          "rating": 4.7,
          "reviewsCount": 91
        },
        {
          "id": 101,
          "title": "Casque Bluetooth X200",
          "image": "https://i.postimg.cc/sXhZxQzb/pexels-melvin-buezo-1253763-2529148.jpg",
          "price": 129.99,
          "rating": 4.6,
          "reviewsCount": 23
        }
      ]
    },
    {
      "id": "2",
      "name": "Maison & Cuisine",
      "slug": "maison-cuisine",
      "bestSellers": [
        {
          "id": 105,
          "title": "Lampe LED de Lecture",
          "image": "https://static.nike.com/a/images/t_prod_ss/w_640,c_limit,f_auto/66f0f8b2-8d4a-4201-b334-c1fdf9ca3e5e/air-max-270-chaussure-PgbqWd.png",
          "price": 24.99,
          "rating": 4.5,
          "reviewsCount": 34
        },
        {
          "id": 102,
          "title": "Machine à Espresso MiniBar",
          "image": "https://static.nike.com/a/images/t_prod_ss/w_640,c_limit,f_auto/66f0f8b2-8d4a-4201-b334-c1fdf9ca3e5e/air-max-270-chaussure-PgbqWd.png",
          "price": 89.5,
          "rating": 4.1,
          "reviewsCount": 8
        }
      ]
    },
    {
      "id": "3",
      "name": "Mode",
      "slug": "mode",
      "bestSellers": [
        {
          "id": 103,
          "title": "T-shirt Organic Cotton - Unisexe",
          "image": "https://static.nike.com/a/images/t_prod_ss/w_640,c_limit,f_auto/66f0f8b2-8d4a-4201-b334-c1fdf9ca3e5e/air-max-270-chaussure-PgbqWd.png",
          "price": 19,
          "rating": 4.4,
          "reviewsCount": 52
        },
        {
          "id": 107,
          "title": "Sac à Dos Urbain 20L",
          "image": "https://static.nike.com/a/images/t_prod_ss/w_640,c_limit,f_auto/66f0f8b2-8d4a-4201-b334-c1fdf9ca3e5e/air-max-270-chaussure-PgbqWd.png",
          "price": 54,
          "rating": 4.3,
          "reviewsCount": 27
        }
      ]
    },
    {
      "id": "4",
      "name": "Beauté",
      "slug": "beaute",
      "bestSellers": [
        {
          "id": 104,
          "title": "Palette Maquillage 12 Couches",
          "image": "https://static.nike.com/a/images/t_prod_ss/w_640,c_limit,f_auto/66f0f8b2-8d4a-4201-b334-c1fdf9ca3e5e/air-max-270-chaussure-PgbqWd.png",
          "price": 29.95,
          "rating": 4.2,
          "reviewsCount": 18
        }
      ]
    },
    {
      "id": "1",
      "name": "Électronique",
      "slug": "electronique",
      "bestSellers": [
        {
          "id": 106,
          "title": "Chargeur Rapide USB-C 30W",
          "image": "https://i.postimg.cc/sXhZxQzb/pexels-melvin-buezo-1253763-2529148.jpg",
          "price": 17.5,
          "rating": 4.7,
          "reviewsCount": 91
        },
        {
          "id": 101,
          "title": "Casque Bluetooth X200",
          "image": "https://i.postimg.cc/sXhZxQzb/pexels-melvin-buezo-1253763-2529148.jpg",
          "price": 129.99,
          "rating": 4.6,
          "reviewsCount": 23
        }
      ]
    },
    {
      "id": "2",
      "name": "Maison & Cuisine",
      "slug": "maison-cuisine",
      "bestSellers": [
        {
          "id": 105,
          "title": "Lampe LED de Lecture",
          "image": "https://static.nike.com/a/images/t_prod_ss/w_640,c_limit,f_auto/66f0f8b2-8d4a-4201-b334-c1fdf9ca3e5e/air-max-270-chaussure-PgbqWd.png",
          "price": 24.99,
          "rating": 4.5,
          "reviewsCount": 34
        },
        {
          "id": 102,
          "title": "Machine à Espresso MiniBar",
          "image": "https://static.nike.com/a/images/t_prod_ss/w_640,c_limit,f_auto/66f0f8b2-8d4a-4201-b334-c1fdf9ca3e5e/air-max-270-chaussure-PgbqWd.png",
          "price": 89.5,
          "rating": 4.1,
          "reviewsCount": 8
        }
      ]
    },
    {
      "id": "3",
      "name": "Mode",
      "slug": "mode",
      "bestSellers": [
        {
          "id": 103,
          "title": "T-shirt Organic Cotton - Unisexe",
          "image": "https://static.nike.com/a/images/t_prod_ss/w_640,c_limit,f_auto/66f0f8b2-8d4a-4201-b334-c1fdf9ca3e5e/air-max-270-chaussure-PgbqWd.png",
          "price": 19,
          "rating": 4.4,
          "reviewsCount": 52
        },
        {
          "id": 107,
          "title": "Sac à Dos Urbain 20L",
          "image": "https://static.nike.com/a/images/t_prod_ss/w_640,c_limit,f_auto/66f0f8b2-8d4a-4201-b334-c1fdf9ca3e5e/air-max-270-chaussure-PgbqWd.png",
          "price": 54,
          "rating": 4.3,
          "reviewsCount": 27
        }
      ]
    },
    {
      "id": "4",
      "name": "Beauté",
      "slug": "beaute",
      "bestSellers": [
        {
          "id": 104,
          "title": "Palette Maquillage 12 Couches",
          "image": "https://static.nike.com/a/images/t_prod_ss/w_640,c_limit,f_auto/66f0f8b2-8d4a-4201-b334-c1fdf9ca3e5e/air-max-270-chaussure-PgbqWd.png",
          "price": 29.95,
          "rating": 4.2,
          "reviewsCount": 18
        }
      ]
    },
    {
      "id": "1",
      "name": "Électronique",
      "slug": "electronique",
      "bestSellers": [
        {
          "id": 106,
          "title": "Chargeur Rapide USB-C 30W",
          "image": "https://i.postimg.cc/sXhZxQzb/pexels-melvin-buezo-1253763-2529148.jpg",
          "price": 17.5,
          "rating": 4.7,
          "reviewsCount": 91
        },
        {
          "id": 101,
          "title": "Casque Bluetooth X200",
          "image": "https://i.postimg.cc/sXhZxQzb/pexels-melvin-buezo-1253763-2529148.jpg",
          "price": 129.99,
          "rating": 4.6,
          "reviewsCount": 23
        }
      ]
    },
    {
      "id": "2",
      "name": "Maison & Cuisine",
      "slug": "maison-cuisine",
      "bestSellers": [
        {
          "id": 105,
          "title": "Lampe LED de Lecture",
          "image": "https://static.nike.com/a/images/t_prod_ss/w_640,c_limit,f_auto/66f0f8b2-8d4a-4201-b334-c1fdf9ca3e5e/air-max-270-chaussure-PgbqWd.png",
          "price": 24.99,
          "rating": 4.5,
          "reviewsCount": 34
        },
        {
          "id": 102,
          "title": "Machine à Espresso MiniBar",
          "image": "https://static.nike.com/a/images/t_prod_ss/w_640,c_limit,f_auto/66f0f8b2-8d4a-4201-b334-c1fdf9ca3e5e/air-max-270-chaussure-PgbqWd.png",
          "price": 89.5,
          "rating": 4.1,
          "reviewsCount": 8
        }
      ]
    },
    {
      "id": "3",
      "name": "Mode",
      "slug": "mode",
      "bestSellers": [
        {
          "id": 103,
          "title": "T-shirt Organic Cotton - Unisexe",
          "image": "https://static.nike.com/a/images/t_prod_ss/w_640,c_limit,f_auto/66f0f8b2-8d4a-4201-b334-c1fdf9ca3e5e/air-max-270-chaussure-PgbqWd.png",
          "price": 19,
          "rating": 4.4,
          "reviewsCount": 52
        },
        {
          "id": 107,
          "title": "Sac à Dos Urbain 20L",
          "image": "https://static.nike.com/a/images/t_prod_ss/w_640,c_limit,f_auto/66f0f8b2-8d4a-4201-b334-c1fdf9ca3e5e/air-max-270-chaussure-PgbqWd.png",
          "price": 54,
          "rating": 4.3,
          "reviewsCount": 27
        }
      ]
    },
    {
      "id": "4",
      "name": "Beauté",
      "slug": "beaute",
      "bestSellers": [
        {
          "id": 104,
          "title": "Palette Maquillage 12 Couches",
          "image": "https://static.nike.com/a/images/t_prod_ss/w_640,c_limit,f_auto/66f0f8b2-8d4a-4201-b334-c1fdf9ca3e5e/air-max-270-chaussure-PgbqWd.png",
          "price": 29.95,
          "rating": 4.2,
          "reviewsCount": 18
        }
      ]
    },
    {
      "id": "1",
      "name": "Électronique",
      "slug": "electronique",
      "bestSellers": [
        {
          "id": 106,
          "title": "Chargeur Rapide USB-C 30W",
          "image": "https://i.postimg.cc/sXhZxQzb/pexels-melvin-buezo-1253763-2529148.jpg",
          "price": 17.5,
          "rating": 4.7,
          "reviewsCount": 91
        },
        {
          "id": 101,
          "title": "Casque Bluetooth X200",
          "image": "https://i.postimg.cc/sXhZxQzb/pexels-melvin-buezo-1253763-2529148.jpg",
          "price": 129.99,
          "rating": 4.6,
          "reviewsCount": 23
        }
      ]
    },
    {
      "id": "2",
      "name": "Maison & Cuisine",
      "slug": "maison-cuisine",
      "bestSellers": [
        {
          "id": 105,
          "title": "Lampe LED de Lecture",
          "image": "https://static.nike.com/a/images/t_prod_ss/w_640,c_limit,f_auto/66f0f8b2-8d4a-4201-b334-c1fdf9ca3e5e/air-max-270-chaussure-PgbqWd.png",
          "price": 24.99,
          "rating": 4.5,
          "reviewsCount": 34
        },
        {
          "id": 102,
          "title": "Machine à Espresso MiniBar",
          "image": "https://static.nike.com/a/images/t_prod_ss/w_640,c_limit,f_auto/66f0f8b2-8d4a-4201-b334-c1fdf9ca3e5e/air-max-270-chaussure-PgbqWd.png",
          "price": 89.5,
          "rating": 4.1,
          "reviewsCount": 8
        }
      ]
    },
    {
      "id": "3",
      "name": "Mode",
      "slug": "mode",
      "bestSellers": [
        {
          "id": 103,
          "title": "T-shirt Organic Cotton - Unisexe",
          "image": "https://static.nike.com/a/images/t_prod_ss/w_640,c_limit,f_auto/66f0f8b2-8d4a-4201-b334-c1fdf9ca3e5e/air-max-270-chaussure-PgbqWd.png",
          "price": 19,
          "rating": 4.4,
          "reviewsCount": 52
        },
        {
          "id": 107,
          "title": "Sac à Dos Urbain 20L",
          "image": "https://static.nike.com/a/images/t_prod_ss/w_640,c_limit,f_auto/66f0f8b2-8d4a-4201-b334-c1fdf9ca3e5e/air-max-270-chaussure-PgbqWd.png",
          "price": 54,
          "rating": 4.3,
          "reviewsCount": 27
        }
      ]
    },
    {
      "id": "4",
      "name": "Beauté",
      "slug": "beaute",
      "bestSellers": [
        {
          "id": 104,
          "title": "Palette Maquillage 12 Couches",
          "image": "https://static.nike.com/a/images/t_prod_ss/w_640,c_limit,f_auto/66f0f8b2-8d4a-4201-b334-c1fdf9ca3e5e/air-max-270-chaussure-PgbqWd.png",
          "price": 29.95,
          "rating": 4.2,
          "reviewsCount": 18
        }
      ]
    },
    {
      "id": "1",
      "name": "Électronique",
      "slug": "electronique",
      "bestSellers": [
        {
          "id": 106,
          "title": "Chargeur Rapide USB-C 30W",
          "image": "https://i.postimg.cc/sXhZxQzb/pexels-melvin-buezo-1253763-2529148.jpg",
          "price": 17.5,
          "rating": 4.7,
          "reviewsCount": 91
        },
        {
          "id": 101,
          "title": "Casque Bluetooth X200",
          "image": "https://i.postimg.cc/sXhZxQzb/pexels-melvin-buezo-1253763-2529148.jpg",
          "price": 129.99,
          "rating": 4.6,
          "reviewsCount": 23
        }
      ]
    },
    {
      "id": "2",
      "name": "Maison & Cuisine",
      "slug": "maison-cuisine",
      "bestSellers": [
        {
          "id": 105,
          "title": "Lampe LED de Lecture",
          "image": "https://static.nike.com/a/images/t_prod_ss/w_640,c_limit,f_auto/66f0f8b2-8d4a-4201-b334-c1fdf9ca3e5e/air-max-270-chaussure-PgbqWd.png",
          "price": 24.99,
          "rating": 4.5,
          "reviewsCount": 34
        },
        {
          "id": 102,
          "title": "Machine à Espresso MiniBar",
          "image": "https://static.nike.com/a/images/t_prod_ss/w_640,c_limit,f_auto/66f0f8b2-8d4a-4201-b334-c1fdf9ca3e5e/air-max-270-chaussure-PgbqWd.png",
          "price": 89.5,
          "rating": 4.1,
          "reviewsCount": 8
        }
      ]
    },
    {
      "id": "3",
      "name": "Mode",
      "slug": "mode",
      "bestSellers": [
        {
          "id": 103,
          "title": "T-shirt Organic Cotton - Unisexe",
          "image": "https://static.nike.com/a/images/t_prod_ss/w_640,c_limit,f_auto/66f0f8b2-8d4a-4201-b334-c1fdf9ca3e5e/air-max-270-chaussure-PgbqWd.png",
          "price": 19,
          "rating": 4.4,
          "reviewsCount": 52
        },
        {
          "id": 107,
          "title": "Sac à Dos Urbain 20L",
          "image": "https://static.nike.com/a/images/t_prod_ss/w_640,c_limit,f_auto/66f0f8b2-8d4a-4201-b334-c1fdf9ca3e5e/air-max-270-chaussure-PgbqWd.png",
          "price": 54,
          "rating": 4.3,
          "reviewsCount": 27
        }
      ]
    },
    {
      "id": "4",
      "name": "Beauté",
      "slug": "beaute",
      "bestSellers": [
        {
          "id": 104,
          "title": "Palette Maquillage 12 Couches",
          "image": "https://static.nike.com/a/images/t_prod_ss/w_640,c_limit,f_auto/66f0f8b2-8d4a-4201-b334-c1fdf9ca3e5e/air-max-270-chaussure-PgbqWd.png",
          "price": 29.95,
          "rating": 4.2,
          "reviewsCount": 18
        }
      ]
    },
    {
      "id": "1",
      "name": "Électronique",
      "slug": "electronique",
      "bestSellers": [
        {
          "id": 106,
          "title": "Chargeur Rapide USB-C 30W",
          "image": "https://i.postimg.cc/sXhZxQzb/pexels-melvin-buezo-1253763-2529148.jpg",
          "price": 17.5,
          "rating": 4.7,
          "reviewsCount": 91
        },
        {
          "id": 101,
          "title": "Casque Bluetooth X200",
          "image": "https://i.postimg.cc/sXhZxQzb/pexels-melvin-buezo-1253763-2529148.jpg",
          "price": 129.99,
          "rating": 4.6,
          "reviewsCount": 23
        }
      ]
    },
    {
      "id": "2",
      "name": "Maison & Cuisine",
      "slug": "maison-cuisine",
      "bestSellers": [
        {
          "id": 105,
          "title": "Lampe LED de Lecture",
          "image": "https://static.nike.com/a/images/t_prod_ss/w_640,c_limit,f_auto/66f0f8b2-8d4a-4201-b334-c1fdf9ca3e5e/air-max-270-chaussure-PgbqWd.png",
          "price": 24.99,
          "rating": 4.5,
          "reviewsCount": 34
        },
        {
          "id": 102,
          "title": "Machine à Espresso MiniBar",
          "image": "https://static.nike.com/a/images/t_prod_ss/w_640,c_limit,f_auto/66f0f8b2-8d4a-4201-b334-c1fdf9ca3e5e/air-max-270-chaussure-PgbqWd.png",
          "price": 89.5,
          "rating": 4.1,
          "reviewsCount": 8
        }
      ]
    },
    {
      "id": "3",
      "name": "Mode",
      "slug": "mode",
      "bestSellers": [
        {
          "id": 103,
          "title": "T-shirt Organic Cotton - Unisexe",
          "image": "https://static.nike.com/a/images/t_prod_ss/w_640,c_limit,f_auto/66f0f8b2-8d4a-4201-b334-c1fdf9ca3e5e/air-max-270-chaussure-PgbqWd.png",
          "price": 19,
          "rating": 4.4,
          "reviewsCount": 52
        },
        {
          "id": 107,
          "title": "Sac à Dos Urbain 20L",
          "image": "https://static.nike.com/a/images/t_prod_ss/w_640,c_limit,f_auto/66f0f8b2-8d4a-4201-b334-c1fdf9ca3e5e/air-max-270-chaussure-PgbqWd.png",
          "price": 54,
          "rating": 4.3,
          "reviewsCount": 27
        }
      ]
    },
    {
      "id": "4",
      "name": "Beauté",
      "slug": "beaute",
      "bestSellers": [
        {
          "id": 104,
          "title": "Palette Maquillage 12 Couches",
          "image": "https://static.nike.com/a/images/t_prod_ss/w_640,c_limit,f_auto/66f0f8b2-8d4a-4201-b334-c1fdf9ca3e5e/air-max-270-chaussure-PgbqWd.png",
          "price": 29.95,
          "rating": 4.2,
          "reviewsCount": 18
        }
      ]
    },
    {
      "id": "1",
      "name": "Électronique",
      "slug": "electronique",
      "bestSellers": [
        {
          "id": 106,
          "title": "Chargeur Rapide USB-C 30W",
          "image": "https://i.postimg.cc/sXhZxQzb/pexels-melvin-buezo-1253763-2529148.jpg",
          "price": 17.5,
          "rating": 4.7,
          "reviewsCount": 91
        },
        {
          "id": 101,
          "title": "Casque Bluetooth X200",
          "image": "https://i.postimg.cc/sXhZxQzb/pexels-melvin-buezo-1253763-2529148.jpg",
          "price": 129.99,
          "rating": 4.6,
          "reviewsCount": 23
        }
      ]
    },
    {
      "id": "2",
      "name": "Maison & Cuisine",
      "slug": "maison-cuisine",
      "bestSellers": [
        {
          "id": 105,
          "title": "Lampe LED de Lecture",
          "image": "https://static.nike.com/a/images/t_prod_ss/w_640,c_limit,f_auto/66f0f8b2-8d4a-4201-b334-c1fdf9ca3e5e/air-max-270-chaussure-PgbqWd.png",
          "price": 24.99,
          "rating": 4.5,
          "reviewsCount": 34
        },
        {
          "id": 102,
          "title": "Machine à Espresso MiniBar",
          "image": "https://static.nike.com/a/images/t_prod_ss/w_640,c_limit,f_auto/66f0f8b2-8d4a-4201-b334-c1fdf9ca3e5e/air-max-270-chaussure-PgbqWd.png",
          "price": 89.5,
          "rating": 4.1,
          "reviewsCount": 8
        }
      ]
    },
    {
      "id": "3",
      "name": "Mode",
      "slug": "mode",
      "bestSellers": [
        {
          "id": 103,
          "title": "T-shirt Organic Cotton - Unisexe",
          "image": "https://static.nike.com/a/images/t_prod_ss/w_640,c_limit,f_auto/66f0f8b2-8d4a-4201-b334-c1fdf9ca3e5e/air-max-270-chaussure-PgbqWd.png",
          "price": 19,
          "rating": 4.4,
          "reviewsCount": 52
        },
        {
          "id": 107,
          "title": "Sac à Dos Urbain 20L",
          "image": "https://static.nike.com/a/images/t_prod_ss/w_640,c_limit,f_auto/66f0f8b2-8d4a-4201-b334-c1fdf9ca3e5e/air-max-270-chaussure-PgbqWd.png",
          "price": 54,
          "rating": 4.3,
          "reviewsCount": 27
        }
      ]
    },
    {
      "id": "4",
      "name": "Beauté",
      "slug": "beaute",
      "bestSellers": [
        {
          "id": 104,
          "title": "Palette Maquillage 12 Couches",
          "image": "https://static.nike.com/a/images/t_prod_ss/w_640,c_limit,f_auto/66f0f8b2-8d4a-4201-b334-c1fdf9ca3e5e/air-max-270-chaussure-PgbqWd.png",
          "price": 29.95,
          "rating": 4.2,
          "reviewsCount": 18
        }
      ]
    }
  ]}
