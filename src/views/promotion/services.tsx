// import { instance } from '@/helpers/api';
import {
  Box,
  Grid,
  Heading,
  Image,
  Text,
} from '@chakra-ui/react';
// import { useQuery } from '@tanstack/react-query';
// import CustomLoader from '@/components/layout/ui/shared/loading';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
// const MotionText = motion(Text);
// const MotionImage = motion(Image);

export const ServicesList = () => {
  // const fetchUsers = async () => {
  //   const data = await instance.get(`products`);
  //   return data;
  // };

  // const { data, isLoading } = useQuery({
  //   queryKey: ['products'], // identifiant du cache
  //   queryFn: fetchUsers, // la fonction qui appelle ton API
  //   staleTime: 1000 * 60 * 5, // 5 minutes sans refetch
  // });

  // if (isLoading) {
  //   return (
  //     <Center py={12}>
  //       <CustomLoader />
  //     </Center>
  //   );
  // }
  return (
    <>
      <Heading
        fontFamily={'cursive'}
        fontSize={'2xl'}
        fontWeight={'black'}
        p={2}
      >
        Decouvrez nous services
      </Heading>
      <Grid
        templateColumns={{ base: '1fr', md: '1fr 1fr' }}
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
            produits d’exception accessibles à tous. De la sélection rigoureuse
            de nos fournisseurs à la livraison, chaque étape reflète notre
            exigence et notre passion.
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
            rounded={'sm'}
            shadow="lg"
          />
        </MotionBox>
      </Grid>
    </>
  );
};
