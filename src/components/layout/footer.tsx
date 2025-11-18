import useMenuRoutes from '@/routes/menu';
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
} from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { NavLink } from 'react-router';
import { CustomInput } from '../ui/form/input.component';
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaArrowUp,
  FaTiktok,
} from 'react-icons/fa';
import { CustomButton } from '../ui/form/button.component';
import { instance } from '@/helpers/api';
// import { useState } from 'react';
import { useForm } from 'react-hook-form';
// import { notify } from './ui/shared/toaster.shared';
import { LuMail } from 'react-icons/lu';
import { ScrollAnimationBox } from './ui/shared/animation';
import { useQuery } from '@tanstack/react-query';

const marquee = keyframes`
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
`;

export const FooterLayourt = () => {
  const { ROUTES } = useMenuRoutes();
  // const [loading, setLoading] = useState<boolean>(false);
  const { control } = useForm();
  const description: string =
    'Boutique de vêtements moderne qui propose des collections tendance pour hommes, femmes et enfants. Nous allions style, qualité et accessibilité pour répondre à tous les goûts.';
  const socialLinks = [
    { icon: FaFacebook, href: '#', label: 'Facebook' },
    { icon: FaTwitter, href: '#', label: 'Twitter' },
    { icon: FaInstagram, href: '#', label: 'Instagram' },
    { icon: FaLinkedin, href: '#', label: 'LinkedIn' },
    { icon: FaYoutube, href: '#', label: 'YouTube' },
    { icon: FaTiktok, href: '#', label: 'Tiktok' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box w={'100%'} mt={10}>
      {/* Footer Principal */}
      <Box
        borderTopLeftRadius={{ base: 'none', md: '80% 10%' }}
        borderTopRightRadius={{ base: 'none', md: '80% 10%' }}
        backgroundPosition={'center'}
        bg={'purple.950'}
        w={'full'}
        boxShadow={"0px -8px 20px rgba(0, 0, 0, 0.3)"}
      >
        <Container w={'full'} py={16}>
          <Grid
            templateColumns={{
              base: '1fr',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(4, 1fr)',
            }}
            gap={'5'}
          >
            {/* À propos */}
            <VStack align="start" gap={4}>
              <ScrollAnimationBox
                children={
                  <Heading size="md" color={"orange.500"} mb={2}>
                    À propos de nous
                  </Heading>
                }
              />
              <Separator w={"full"}/>
              <ScrollAnimationBox
                duration={1}
                children={
                  <Stack w={'full'} pr={'2.5'}>
                    <Box textAlign="left" maxW={'95vw'} color={'white'}>
                      {description}
                    </Box>
                  </Stack>
                }
              />
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
                      bg: 'blue.400',
                      color: 'white',
                      transform: 'translateY(-2px)',
                    }}
                    transition="all 0.2s ease"
                  >
                    <social.icon />
                  </IconButton>
                ))}
              </HStack>
            </VStack>

            {/* Service Client */}
            <ScrollAnimationBox
              children={
                <VStack align="start" gap={4}>
                  <Heading size="md" color={"orange.600"} mb={2}>
                    Service Client
                  </Heading>
                  <Separator w={"full"}/>
                  <VStack align="start" gap={2}>
                    <Link color="" _hover={{ color: 'blue.400' }}>
                      Centre d'aide
                    </Link>
                    <Link color="" _hover={{ color: 'blue.400' }}>
                      Livraison & Retours
                    </Link>
                    <Link color="" _hover={{ color: 'blue.400' }}>
                      Guide des tailles
                    </Link>
                    <Link color="" _hover={{ color: 'blue.400' }}>
                      FAQ
                    </Link>
                    <Link color="" _hover={{ color: 'blue.400' }}>
                      Contactez-nous
                    </Link>
                  </VStack>
                </VStack>
              }
            />

            {/* Liens rapides */}
            <VStack align="start" gap={4}>
              <Heading size="md" color={"orange.600"} mb={2}>
                Liens Rapides
              </Heading>
              <Separator w={"full"}/>
              <VStack align="start" gap={2}>
                {ROUTES.map((item, index) => (
                  <NavLink
                    key={index}
                    to={item.path}
                    style={{ color: '#D1D5DB' }}
                  >
                    <Text
                      color=""
                      _hover={{ color: 'blue.400' }}
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
              <Heading size="md" color={"orange.600"} mb={2}>
                Contact & Newsletter
              </Heading>
              <Separator w={"full"}/>

              {/* Contact Info */}
              <VStack align="start" gap={3} mb={4}>
                <HStack gap={3}>
                  <FaPhone color="#60A5FA" />
                  <Text color="">+237 6XX XXX XXX</Text>
                </HStack>
                <HStack gap={3}>
                  <FaEnvelope color="#60A5FA" />
                  <Text color="">contact@tchokos.com</Text>
                </HStack>
                <HStack gap={3}>
                  <FaMapMarkerAlt color="#60A5FA" />
                  <Text color="">Douala, Cameroun</Text>
                </HStack>
              </VStack>

              {/* Newsletter */}
              <VStack align="start" gap={3} w="full">
                <Text color="" fontSize="sm">
                  Abonnez-vous à notre newsletter
                </Text>

                {/* <form onSubmit={handleSubmit(emailSubmit)}> */}
                  <VStack gap={2}>
                    <ScrollAnimationBox
                      children={
                        <CustomInput
                          placeholder={'Entrez votre adress e-mail'}
                          type={'email'}
                          name="email"
                          control={control}
                          label="E-mail"
                          icon={<LuMail />}
                        />
                      }
                    />
                    <ScrollAnimationBox
                      w="full"
                      duration={1}
                      children={
                        <CustomButton
                          label={"S'abonner"}
                          type={'submit'}
                        />
                      }
                    />
                  </VStack>
                {/* </form> */}
              </VStack>
            </VStack>
          </Grid>
        </Container>
      </Box>
      {/* Footer Bottom */}
      <Box bg="gray.800" p={6}>
        <Flex
          justify="space-between"
          align="center"
          direction={{ base: 'column', md: 'row' }}
          gap={4}
          color={'yellow.500'}
          w={'full'}
        >
          <Stack
            gap={6}
            direction={{ base: 'column', md: 'row' }}
            textAlign={'center'}
            alignItems="center"
          >
            <Text fontSize="sm">
              © 2025 Tchokos SARL. Tous droits réservés.
            </Text>
            <HStack gap={4}>
              <Link
                color="yellow.600"
                fontSize="sm"
                _hover={{ color: 'blue.400' }}
              >
                Politique de confidentialité
              </Link>
              <Link
                color="yellow.600"
                fontSize="sm"
                _hover={{ color: 'blue.400' }}
              >
                Conditions d'utilisation
              </Link>
            </HStack>
          </Stack>

          <Stack
            gap={4}
            w={'full'}
            direction={{ base: 'column', md: 'row' }}
            textAlign={'center'}
          >
            <Text color="gray.400" fontSize="sm">
              Fait au Cameroun
            </Text>
            <IconButton
              aria-label="Retour en haut"
              size="sm"
              border={'none'}
              color="blue.400"
              onClick={scrollToTop}
              _focus={{
                border: 'none',
              }}
              _hover={{
                bg: 'blue.400',
                color: 'white',
                transform: 'translateY(-2px)',
              }}
              transition="all 0.2s ease"
            >
              <FaArrowUp />
            </IconButton>
          </Stack>
        </Flex>
      </Box>
    </Box>
  );
};
