import useMenuRoutes from "@/routes/menu";
import {
  Box,
  Flex,
  Grid,
  HStack,
  Text,
  VStack,
  IconButton,
  Link,
  Container,
  Heading,
  Separator,
  Stack,
} from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { NavLink } from "react-router";
import { CustomInput } from "../ui/form/input.component";
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedin, 
  FaYoutube,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaArrowUp
} from "react-icons/fa";
import { CustomButton } from "../ui/form/button.component";

const marquee = keyframes`
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
`;

export const FooterLayourt = () => {
  const { ROUTES } = useMenuRoutes();
  const description: string =
    "Boutique de vêtements moderne qui propose des collections tendance pour hommes, femmes et enfants. Nous allions style, qualité et accessibilité pour répondre à tous les goûts.";
  
  const partner = [
    { name: "MTN Cameroun", logo: "📱" },
    { name: "Orange Cameroun", logo: "🍊" },
    { name: "CCA Bank", logo: "🏦" },
    { name: "Express Union", logo: "💳" },
    { name: "UBA Bank", logo: "🏛️" },
  ];

  const socialLinks = [
    { icon: FaFacebook, href: "#", label: "Facebook" },
    { icon: FaTwitter, href: "#", label: "Twitter" },
    { icon: FaInstagram, href: "#", label: "Instagram" },
    { icon: FaLinkedin, href: "#", label: "LinkedIn" },
    { icon: FaYoutube, href: "#", label: "YouTube" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Section Partenaires */}
      <Box bg="gray.50" py={8} borderTop="1px solid" borderColor="gray.200">
        <Container maxW="7xl">
          <VStack gap={6}>
            <Heading size="lg" color="gray.700" textAlign="center">
              Nos Partenaires
            </Heading>
            <Box w="full" overflow="hidden" position="relative">
              <HStack
                gap={12}
                animation={`${marquee} 30s linear infinite`}
                whiteSpace="nowrap"
                py={4}
              >
                {[...partner, ...partner].map((p, index) => (
                  <Box key={index} minW="200px" textAlign="center">
                    <HStack gap={3} justify="center">
                      <Text fontSize="2xl">{p.logo}</Text>
                      <Text fontWeight="bold" color="gray.700" fontSize="lg">
                        {p.name}
                      </Text>
                    </HStack>
                  </Box>
                ))}
              </HStack>
            </Box>
          </VStack>
        </Container>
      </Box>

      {/* Footer Principal */}
      <Box bg="gray.900" color="white">
        <Container maxW="7xl" py={16}>
          <Grid
            templateColumns={{
              base: "1fr",
              md: "repeat(2, 1fr)",
              lg: "repeat(4, 1fr)",
            }}
            gap={{base: "5", md: "6"}}
          >
            {/* À propos */}
            <VStack align="start" gap={4}>
              <Heading size="md" color="blue.400" mb={2}>
                À propos de nous
              </Heading>
              <Separator borderColor="blue.400" size="lg" />
              <Stack w={"full"} pr={"2.5"}>
              <Text color="gray.300" lineHeight="tall">
                {description}
              </Text>
              </Stack>
              <HStack gap={2} mt={4}>
                {socialLinks.map((social, index) => (
                  <IconButton
                    key={index}
                    aria-label={social.label}
                    size="sm"
                    variant="outline"
                    color="blue.400"
                    borderColor="blue.400"
                    _hover={{
                      bg: "blue.400",
                      color: "white",
                      transform: "translateY(-2px)"
                    }}
                    transition="all 0.2s ease"
                  >
                    <social.icon />
                  </IconButton>
                ))}
              </HStack>
            </VStack>

            {/* Service Client */}
            <VStack align="start" gap={4}>
              <Heading size="md" color="blue.400" mb={2}>
                Service Client
              </Heading>
              <Separator borderColor="blue.400" size="lg" />
              <VStack align="start" gap={2}>
                <Link color="gray.300" _hover={{ color: "blue.400" }}>
                  Centre d'aide
                </Link>
                <Link color="gray.300" _hover={{ color: "blue.400" }}>
                  Livraison & Retours
                </Link>
                <Link color="gray.300" _hover={{ color: "blue.400" }}>
                  Guide des tailles
                </Link>
                <Link color="gray.300" _hover={{ color: "blue.400" }}>
                  FAQ
                </Link>
                <Link color="gray.300" _hover={{ color: "blue.400" }}>
                  Contactez-nous
                </Link>
              </VStack>
            </VStack>

            {/* Liens rapides */}
            <VStack align="start" gap={4}>
              <Heading size="md" color="blue.400" mb={2}>
                Liens Rapides
              </Heading>
              <Separator borderColor="blue.400" size="lg" />
              <VStack align="start" gap={2}>
                {ROUTES.map((item, index) => (
                  <NavLink
                    key={index}
                    to={item.path}
                    style={{ color: "#D1D5DB" }}
                  >
                    <Text
                      color="gray.300"
                      _hover={{ color: "blue.400" }}
                      transition="color 0.2s ease"
                    >
                      {item.name}
                    </Text>
                  </NavLink>
                ))}
              </VStack>
            </VStack>

            {/* Contact & Newsletter */}
            <VStack align="start" gap={4}>
              <Heading size="md" color="blue.400" mb={2}>
                Contact & Newsletter
              </Heading>
              <Separator borderColor="blue.400" size="lg" />
              
              {/* Contact Info */}
              <VStack align="start" gap={3} mb={4}>
                <HStack gap={3}>
                  <FaPhone color="#60A5FA" />
                  <Text color="gray.300">+237 6XX XXX XXX</Text>
                </HStack>
                <HStack gap={3}>
                  <FaEnvelope color="#60A5FA" />
                  <Text color="gray.300">contact@tchokos.com</Text>
                </HStack>
                <HStack gap={3}>
                  <FaMapMarkerAlt color="#60A5FA" />
                  <Text color="gray.300">Douala, Cameroun</Text>
                </HStack>
              </VStack>

              {/* Newsletter */}
              <VStack align="start" gap={3} w="full">
                <Text color="gray.300" fontSize="sm">
                  Abonnez-vous à notre newsletter
                </Text>
                <form>
                <CustomInput
                  placeholder="Votre email"
                  type="email"
                  size="sm"
                  isDisabled={false}
                  label=""
                />
                <CustomButton label={"S'abonner"} size={"sm"} color={"white"} bg={"blue.500"} type={"button"}/>
                </form>
              </VStack>
            </VStack>
          </Grid>
        </Container>

        {/* Footer Bottom */}
        <Box bg="gray.800" borderTop="1px solid" borderColor="gray.700" w={"full"}>
          <Container py={6} w={"full"}>
            <Flex
              justify="space-between"
              align="center"
              direction={{ base: "row", md: "column" }}
              gap={4}
            >
              <HStack gap={6} direction={{ base: "column", sm: "row" }}>
                <Text color="gray.400" fontSize="sm">
                  © 2025 Tchokos SARL. Tous droits réservés.
                </Text>
                <HStack gap={4}>
                  <Link color="gray.400" fontSize="sm" _hover={{ color: "blue.400" }}>
                    Politique de confidentialité
                  </Link>
                  <Link color="gray.400" fontSize="sm" _hover={{ color: "blue.400" }}>
                    Conditions d'utilisation
                  </Link>
                  <Link color="gray.400" fontSize="sm" _hover={{ color: "blue.400" }}>
                    Cookies
                  </Link>
                </HStack>
              </HStack>

              <HStack gap={4} w={"full"} width={"full"}>
                <Text color="gray.400" fontSize="sm">
                  Fait au Cameroun
                </Text>
                <IconButton
                  aria-label="Retour en haut"
                  size="sm"
                  border={"none"}
                  color="blue.400"
                  onClick={scrollToTop}
                  _focus={{
                    border: "none"
                  }}
                  _hover={{
                    bg: "blue.400",
                    color: "white",
                    transform: "translateY(-2px)"
                  }}
                  transition="all 0.2s ease"
                >
                  <FaArrowUp />
                </IconButton>
              </HStack>
            </Flex>
          </Container>
        </Box>
      </Box>
    </>
  );
};
