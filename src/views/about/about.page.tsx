import { instance } from "@/helpers/api";
import {
  Box,
  Text,
  Image,
  VStack,
  HStack,
  Heading,
  Grid,
  // Flex,
  Avatar,
  Button,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";

const MotionBox = motion(Box);
const MotionText = motion(Text);
const MotionImage = motion(Image);


export default function AboutPage() {
  const navigate = useNavigate()
  const fetchUsers = async () => {
    const data = await instance.get(`executives`);
    return data;
  };
  
  const { data } = useQuery({
    queryKey: ["executives"], // identifiant du cache
    queryFn: fetchUsers, // la fonction qui appelle ton API
    refetchOnWindowFocus: false,   // ❌ Ne pas relancer quand la fenêtre revient en focus
    refetchOnMount: false,         // ❌ Ne pas relancer au remontage
    refetchOnReconnect: false,     // ❌ Ne pas relancer à la reconnexion réseau
    staleTime: Infinity           // Garde les donnees toujours freches
  });

  const teamMembers = data?.data
  // console.log("datadata",data?.data)

  return (
    <Box bg="gray.100" minH="100vh">
      {/* HERO SECTION */}
      <Box position="relative" h={{ base: "70vh", md: "80vh" }}>
        <MotionImage
          src="https://i.postimg.cc/fyVH4Qq2/pexels-jopwell-2422294.jpg"
          alt="About us"
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
            À propos de{" "}
            <Text as="span" color="yellow.400">
              Van’s
            </Text>
          </MotionText>
          <Text maxW="2xl" fontSize={{ base: "md", md: "lg" }}>
            Nous sommes passionnés par la qualité, l’authenticité et la
            satisfaction de nos clients. Chez Van’s, chaque produit est une
            expérience.
          </Text>
        </VStack>
      </Box>

      {/* NOTRE HISTOIRE */}
      <Box py={20} px={{ base: 4, md: 10 }}>
        <Grid
          templateColumns={{ base: "1fr", md: "1fr 1fr" }}
          gap={10}
          alignItems="center"
        >
          <MotionBox
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <Heading mb={4}>Notre Histoire</Heading>
            <Text color="gray.600" fontSize="lg">
              Fondée en 2018, Van’s est née d’une idée simple : proposer des
              produits d’exception accessibles à tous. De la sélection
              rigoureuse de nos fournisseurs à la livraison, chaque étape
              reflète notre exigence et notre passion.
            </Text>
            <Text mt={4} color="gray.600" fontSize="lg">
              Aujourd’hui, nous sommes fiers d’avoir bâti une communauté de
              milliers de clients satisfaits, tout en restant fidèles à nos
              valeurs : qualité, innovation et confiance.
            </Text>
          </MotionBox>

          <MotionBox
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <Image
              src="https://i.postimg.cc/qRyR1Np0/istockphoto-1346125184-1024x1024.jpg"
              alt="Our story"
              rounded={"sm"}
              shadow="lg"
            />
          </MotionBox>
        </Grid>
      </Box>

      {/* NOS VALEURS */}
      <Box py={20} bg="white" px={{ base: 4, md: 10 }}>
        <Heading textAlign="center" mb={10}>
          Nos Valeurs
        </Heading>
        <Grid
          templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
          gap={8}
          textAlign="center"
        >
          {[
            {
              title: "Qualité",
              text: "Des produits soigneusement sélectionnés pour leur excellence.",
            },
            {
              title: "Authenticité",
              text: "Une expérience sincère et transparente à chaque achat.",
            },
            {
              title: "Innovation",
              text: "Nous anticipons les besoins pour créer de la valeur durable.",
            },
          ].map((v, i) => (
            <MotionBox
              key={i}
              p={6}
              bg="gray.100"
              rounded="sm"
              shadow="md"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Heading fontSize="2xl" mb={3} color="yellow.500">
                {v.title}
              </Heading>
              <Text color="gray.600">{v.text}</Text>
            </MotionBox>
          ))}
        </Grid>
      </Box>

      {/* NOTRE ÉQUIPE */}
      <Box py={20} px={{ base: 4, md: 10 }} bg="gray.50">
        <Heading textAlign="center" mb={10}>
          Notre Équipe
        </Heading>
        <Grid
          // templateColumns={{
          //   base: "1fr",
          //   sm: "repeat(2, 1fr)",
          //   md: "repeat(3, 1fr)",
          // }}
          gap={10}
        >
          {teamMembers?.map((member:any) => (
            <MotionBox
              key={member.id}
              bg="white"
              p={6}
              rounded="sm"
              shadow="lg"
              textAlign="center"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Heading> Departement:{" "+ member.department}</Heading>
              <Avatar.Root
                size="xl"
                mb={4}
                border="3px solid"
                borderColor="yellow.400"
              >
                <Avatar.Fallback name={member.name} />
                <Avatar.Image src={member.image} />
              </Avatar.Root>
              <Text fontWeight="bold" fontSize="lg">
                {member.name}
              </Text>
              <Text color="gray.500">{member.position}</Text>
              <Text color="gray.500">Experience: {" "+ member.experience}</Text>
              <Text color="gray.500">{member.bio}</Text>
            </MotionBox>
          ))}
        </Grid>
      </Box>

      {/* CHIFFRES CLÉS */}
      <Box py={20} bg="blackAlpha.700" color="white" textAlign="center">
        <Heading mb={8}>Nos Chiffres Clés</Heading>
        <HStack justify="center" gap={{ base: 6, md: 16 }} flexWrap="wrap">
          {[
            { number: "50K+", label: "Clients satisfaits" },
            { number: "500+", label: "Produits disponibles" },
            { number: "6", label: "Années d’expertise" },
          ].map((stat, i) => (
            <VStack key={i}>
              <Text fontSize="5xl" fontWeight="bold">
                {stat.number}
              </Text>
              <Text fontSize="lg">{stat.label}</Text>
            </VStack>
          ))}
        </HStack>
      </Box>

      {/* CALL TO ACTION */}
      <Box py={20} textAlign="center" bg="white">
        <Heading mb={4}>Envie d’en savoir plus ?</Heading>
        <Text mb={6} color="gray.600">
          Découvrez nos nouveautés et nos offres exclusives.
        </Text>
        <Button bg={"blackAlpha.500"} variant={"solid"} size="lg" onClick={() => navigate('/articles')}>
          Explorer la boutique
        </Button>
      </Box>
    </Box>
  );
}
