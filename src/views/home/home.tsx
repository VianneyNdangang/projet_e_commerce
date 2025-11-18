import {
  Box,
  Button,
  Flex,
  // Flex,
  Grid,
  Heading,
  Icon,
  Image,
  Separator,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import AutoChangingContent from '@/components/layout/ui/shared/AutoChangingComponent';
import { CustomButton } from '@/components/ui/form/button.component';
import { instance } from '@/helpers/api';
import { useQuery } from '@tanstack/react-query';
import { FaCogs, FaPersonBooth, FaShieldAlt, FaWrench } from 'react-icons/fa';

export const Home = () => {
  const MotionBox = motion(Box);
  const MotionText = motion(Text);
  const MotionImage = motion(Image);
  const MotionStack = motion(Stack);

  const fetchUsers = async () => {
      const data = await instance.get(`projects`);
      return data;
    };
  
    const { data } = useQuery({
      queryKey: ['projects'], // identifiant du cache
      queryFn: fetchUsers, // la fonction qui appelle ton API
      refetchOnWindowFocus: false, // ❌ Ne pas relancer quand la fenêtre revient en focus
      refetchOnMount: false, // ❌ Ne pas relancer au remontage
      refetchOnReconnect: false, // ❌ Ne pas relancer à la reconnexion réseau
      staleTime: Infinity, // Garde les donnees toujours freches
    });
    const project = data?.data;
    console.log('projectproject', project);

  return (
    <>
      <Box
        position="relative"
        h={{ base: '90vh', md: '90vh' }}
        display="flex"
        alignItems="center"
        justifyContent="center"
        overflow="hidden"
        // bg={'purple.950'}
        // bgimage="url(https://i.postimg.cc/sXs14s6K/istockphoto-1171642453-1024x1024.jpg)"
        // bgSize="cover"
        // bgPosition="center"
        // bgRepeat={'no-repeat'}
      >
        <MotionImage
          src="https://i.postimg.cc/sXs14s6K/istockphoto-1171642453-1024x1024.jpg"
          alt="About us"
          objectFit="cover"
          w="full"
          h="full"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.5, ease: 'easeOut' }}
        />
        <MotionStack
          bg={'rgba(0, 0, 0, 0.6)'}
          h={'full'}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.5, ease: 'easeOut' }}
          position="absolute"
          direction={{ base: 'column', md: 'row' }}
          inset={0}
        >
          <Box w={'full'} position="relative" alignContent={'end'}>
            <Stack
              gap={4}
              justify={'center'}
              color="white"
              h={'full'}
              w="full"
              textAlign={{ base: 'center', md: 'right' }}
              align={{ base: 'center', md: 'end' }}
              py={5}
              px={{ base: '1', md: '0' }}
            >
              <MotionText
                fontSize={{ base: 'xl', md: '3xl' }}
                fontWeight="bold"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                Bienvemue chez INDUSTRIAL WORKSHOP
              </MotionText>
              <Text fontSize={{ base: 'md', md: 'xl' }} color="gray.200">
                Bienvenue dans notre atelier industriel, un espace où
                l’innovation, la précision et l’expertise se rencontrent pour
                donner vie à des projets d’exception. Nous sommes fiers de
                mettre à votre disposition un environnement moderne, équipé de
                technologies avancées et conçu pour répondre aux exigences les
                plus élevées du secteur industriel.
              </Text>
              <CustomButton type={'button'} label="Découvrez nos services" />
            </Stack>
          </Box>
          <Separator
            orientation={{ base: 'horizontal', md: 'vertical' }}
            size={'md'}
          />
          <Box
            h={'full'}
            w={'full'}
            justifyContent={{ base: 'center', md: 'left' }}
            display={'flex'}
            alignItems={'center'}
          >
            <Image
              src="https://i.postimg.cc/nV430kd3/istockphoto-1660807390-1024x1024-removebg-preview.png"
              alt="Hero"
              boxSize={{ base: '200px', md: '400px' }}
              objectFit="contain"
              bg={'orange.300'}
              p={4}
              rounded={'full'}
            />
          </Box>
        </MotionStack>
      </Box>
      <Box py={10} px={2}>
        <Heading
          fontSize={{ base: '3xl', md: '6xl' }}
          color={'purple.900'}
          mb={8}
          textAlign="center"
        >
          Nos valeurs
        </Heading>
        <AutoChangingContent />
      </Box>
      <Box>
         <Heading
          fontSize={{ base: '3xl', md: '6xl' }}
          color={'purple.900'}
          mb={8}
          textAlign="center"
        >
          Nos Services
        </Heading>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        align="center"
        justify="center"
        gap={3}
        py={10}
        px={{base:4, md:20}}
      >
        {services &&
          services.map((service: any) => (
            <Box
              key={service.id}
              textAlign="center"
              w= 'full'
            >
             
              <Icon
                as={service.icon}
                boxSize={12}
                mb={4}
                color='orange'
              />

              <Text fontSize="xl" fontWeight="bold" mb={2}>
                {service.title}
              </Text>
              <Text fontSize="md" color="gray.600">
                {service.description}
              </Text>
            </Box>
          ))}
      </Flex>
      </Box>
      {/* <CategoriesSection /> */}
      <Box py={16} px={{ base: 4, md: 10 }} bg="white">
        <Heading
          fontSize={{ base: '3xl', md: '6xl' }}
          color={'purple.900'}
          mb={8}
          textAlign="center"
        >
          Quelque réalisations
        </Heading>
        <Grid
          templateColumns={{
            base: 'repeat(1, 1fr)',
            // sm: 'repeat(2, 1fr)',
            md: 'repeat(2, 1fr)',
          }}
          gap={8}
        >
          {project?.map((p) => (
            <MotionBox
              key={p.id}
              rounded="sm"
              overflow="hidden"
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <Flex direction={{base: 'column', md: 'row'}}>
              <Image
                src={p.image}
                h="250px"
                w="full"
                objectFit="cover"
              />
              <Box p={4}>
                <Heading fontSize="xl" mb={4} fontWeight={'bolder'} textAlign={'center'}>{p.title}</Heading>
                <Text fontWeight="semibold" fontSize="lg" textAlign={'center'}>
                  {p.description}
                </Text>
              </Box>
              </Flex>
            </MotionBox>
          ))}
        </Grid>
      </Box>

      {/* CALL TO ACTION */}
      <Box py={20} textAlign="center" color="purple.900" px={2} bg="orange.600">
        <Heading fontSize={{ base: '2xl', md: '4xl' }} mb={4}>
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
const services = [
    {
      "id": 1,
      "title": "Custom Machining",
      "description": "High-precision CNC machining for all types of components.",
      "icon": FaCogs
    },
    {
      "id": 2,
      "title": "Industrial Automation",
      "description": "Design and installation of automated production lines.",
      "icon": FaPersonBooth
    },
    {
      "id": 3,
      "title": "Maintenance & Repairs",
      "description": "Comprehensive maintenance and repair services for industrial equipment.",
      "icon": FaWrench
    },
    {
      "id": 4,
      "title": "Safety Consulting",
      "description": "Expert advice and installation of safety systems for factories.",
      "icon": FaShieldAlt
    },
    
  ]