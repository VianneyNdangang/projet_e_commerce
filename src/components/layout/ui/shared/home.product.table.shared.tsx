// import { instance } from '@/helpers/api';
import {
  Box,
  Center,
  Flex,
  FormatNumber,
  Grid,
  IconButton,
  Image,
  RatingGroup,
  Spinner,
  Stack,
  Strong,
  Tabs,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router';
import { MenuComponent } from './menu.shared';
import { FiGrid } from 'react-icons/fi';

type Props = {
  items?: any[];
  title: string;
};

export const HomeProductTable = ({ items, title }: Props) => {
  const categories: any[] = [];
  items?.forEach(item => {
  const exist = categories.find((element => element.id == item.id))
  if(!exist){
    categories.push({label: item.name, value: item.id})
  }
})
console.log("categoriescategories",categories)
  const { open, onToggle } = useDisclosure();
  const navigate = useNavigate();
  return (
    <>
      <div>
        <Stack bg={'white'} p={2} my={'5'} w={'full'}>
          <Box
            fontFamily={'cursive'}
            fontSize={'2xl'}
            fontWeight={'black'}
            p={2}
          >
            {title}
          </Box>

          {items ? (
            <Flex minH={'dvh'}>
              <Tabs.Root
                defaultValue={items[0]?.id}
                width={'full'}
                colorPalette={'blue'}
                size={'sm'}
                justifyContent={{ sm: 'center' }}
                bg={'gray.100'}
                p={{ base: '1', md: '2' }}
              >
                <Tabs.List bg={'white'}>
                  <Box display={{ base: 'flex', md: 'none' }} _focus={{ outline: 'none', border:"none"}}>
                   <MenuComponent label={<FiGrid/>} menuItems={categories}/></Box>
                  {items.map((item, index) => (
                    <Tabs.Trigger
                      display={{ base: 'none', md: 'flex' }}
                      key={index}
                      value={item?.id}
                      bg={'white'}
                      m={'0.5'}
                      _focus={{ outline: 'none' }}
                      border={'none'}
                    >
                      {item?.name}
                    </Tabs.Trigger>
                  ))}
                </Tabs.List>
                <Box>
                  <Box pos={'relative'} minH={'200px'} width={'full'}>
                    {items.map((item, index) => (
                      <Tabs.Content
                        key={index}
                        value={item?.id}
                        position={'absolute'}
                        inset={'0'}
                        _open={{
                          animationName: 'fade-in, scale-in',
                          animationDuration: '300ms',
                        }}
                        _closed={{
                          animationName: 'fade-out, scale-out',
                          animationDuration: '120ms',
                        }}
                      >
                        {item.bestSellers ? (
                        <Grid
                          templateColumns={{
                            md: `repeat(5, 1fr)`,
                            base: `repeat(2, 1fr)`,
                            sm: `repeat(3, 1fr)`,
                          }}
                          gap={{ base: '1', md: '2' }}
                          px={{ md: 10 }}
                        >
                          {item.bestSellers.map((best: any, inde: any) => (
                            <Box
                            bg={'white'}
                            key={inde}
                            p={{ sm: 3, base: 1 }}
                            rounded={'md'}
                            onClick={()=> navigate(`product/${best.id}`)}
                            _hover={{ boxShadow: "xl" }}
                                  transition="box-shadow 0.3s ease"
                            >
                              <Image src={best.image} w={'full'} />
                              <Strong justifyContent={'center'}>
                                {best.title}
                              </Strong>
                              <Text>{best.description}</Text>
                              <RatingGroup.Root
                                allowHalf
                                count={5}
                                defaultValue={best.rating}
                                size="sm"
                                colorPalette={'orange'}
                              >
                                <RatingGroup.HiddenInput />
                                <RatingGroup.Control />
                              </RatingGroup.Root>
                              <Text textStyle="lg">
                                <FormatNumber
                                  value={best?.price}
                                  style="currency"
                                  currency="USD"
                                />
                              </Text>
                            </Box>
                          ))}
                        </Grid>
                         ) : (
                           <Box py={'5'} px={{ base: '10', md: '5' }}>
                             <Spinner size={'xl'} color={'blue'} />
                           </Box>
                         )} 
                      </Tabs.Content>
                    ))}
                  </Box>
                </Box>
              </Tabs.Root>
            </Flex>
          ) : (
            <Center>
              <VStack p={2}>
                <Spinner size={'xl'} color={'blue'} />
                <Text>Chargement . . .</Text>
              </VStack>
            </Center>
          )}
        </Stack>
      </div>
    </>
  );
};
