import useMenuRoutes from '@/routes/menu';
import {
  Box,
  Flex,
  Grid,
  HStack,
  Image,
  Separator,
  Strong,
  Text,
  VStack,
} from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { NavLink } from 'react-router';

const marquee = keyframes`
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
`;

export const FooterLayourt = () => {
  const { ROUTES } = useMenuRoutes();
  const description: string =
    'est une boutique de vêtements moderne qui propose des collections tendance pour hommes femmes et enfants. Nous allions style qualité et accessibilité pour répondre à tous les goûts';
  const partner = [
    {
      name: "MTN cameroun",
    },
    {
      name: "Orange cameroun",
    },
    {
      name: "CCA Banck",
    }
  ]
  
  return (
    <>
    <Box gap={"2"}>
      <Box w={'100vw'} overflow="hidden" >
        <Box fontFamily={'cursive'} fontSize={'xl'} fontWeight={'black'} p={2}>Nos partennaires</Box>
        <HStack
          justifyContent={'center'}
          py={{ sm: '2' }}
          w={'full'}
          gap={'48'}
          animation={`${marquee} 20s linear infinite`}
          position={'relative'}
        >
          {partner.map((p, index) =>
          <Box key={index}>
            {/* <Image src={p.img}/> */}
            <Strong>{p.name}</Strong>
          </Box>)}
        </HStack>
      </Box>
      <Box
        color={'white'}
        bg={'blackAlpha.900'}
        p={'10'}
        justifyContent={'center'}
      >
        <Flex gap={{ base: '10', sm: '24' }} justifyContent={'center'}>
          <Grid
            gap={'8'}
            templateColumns={{
              '2xl': `repeat(6, 1fr)`,
              xl: `repeat(3, 1fr)`,
              base: `repeat(1, 1fr)`,
              sm: `repeat(2, 1fr)`,
            }}
          >
            <VStack>
              <Strong fontFamily={'cursive'} fontSize={{ md: 'xl', sm: 'md' }}>
                À propos de nous
              </Strong>
              <Separator borderColor={'orange.solid'} size={'lg'} w={'full'}/>
              <Text maxW={'xs'}>{description}</Text>
            </VStack>
            <VStack>
              <Strong fontFamily={'cursive'} fontSize={{ md: 'xl', sm: 'md' }}>
                Service client
              </Strong>
              <Separator borderColor={'orange.solid'} size={'lg'} w={'full'} />
              <ul>
                <li>nvnvnvn</li>
                <li>nvnvnvn</li>
                <li>nvnvnvn</li>
                <li>nvnvnvn</li>
              </ul>
            </VStack>
            <VStack>
              <Strong fontFamily={'cursive'} fontSize={{ md: 'xl', sm: 'md' }}>
                Liens rapides
              </Strong>
              <Separator borderColor={'orange.solid'} size={'lg'} w={'full'} />
              {ROUTES.map((item, index) => (
                <Box key={index} _focus={{ outline: 'none' }}>
                  <NavLink to={item.path}>
                    <Text fontSize={'xs'}>{item.name}</Text>
                  </NavLink>
                </Box>
              ))}
            </VStack>

            <VStack>
              <Strong fontFamily={'cursive'} fontSize={{ md: 'xl', sm: 'md' }}>
                Contact
              </Strong>
              <Separator borderColor={'orange.solid'} size={'lg'} w={'full'} />
              <ul>
                <li>nvnvnvn</li>
                <li>nvnvnvn</li>
                <li>nvnvnvn</li>
                <li>nvnvnvn</li>
              </ul>
            </VStack>
            <VStack>
              <Strong fontFamily={'cursive'} fontSize={{ md: 'xl', sm: 'md' }}>
                Réseaux sociaux
              </Strong>
              <Separator borderColor={'orange.solid'} size={'lg'} w={'full'} />
              <ul>
                <li>nvnvnvn</li>
                <li>nvnvnvn</li>
                <li>nvnvnvn</li>
                <li>nvnvnvn</li>
              </ul>
            </VStack>
            <VStack>
              <Strong fontFamily={'cursive'} fontSize={{ md: 'xl', sm: 'md' }}>
                Newsletter
              </Strong>
              <Separator borderColor={'orange.solid'} size={'lg'} w={'full'} />
              <ul>
                <li>nvnvnvn</li>
                <li>nvnvnvn</li>
                <li>nvnvnvn</li>
                <li>nvnvnvn</li>
              </ul>
            </VStack>
          </Grid>
        </Flex>
        <Flex
          justifyContent={'center'}
          pt={'10'}
          gap={{ base: '1', sm: '5' }}
          direction={{ base: 'column', sm: 'row' }}
        >
          <Text fontSize={'xx-small'}>
            © 2025 Tchokos SARL. Tous droits réservés.
          </Text>
          <Text fontSize={'xx-small'}>
            Site développé par Nom du développeur ou agence
          </Text>
        </Flex>
      </Box>
      </Box>
    </>
  );
};
