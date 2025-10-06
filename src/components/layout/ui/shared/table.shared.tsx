import {
  Badge,
  Box,
  Center,
  FormatNumber,
  Grid,
  HStack,
  Icon,
  Image,
  Spinner,
  Tabs,
  Text,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react';
import { HiStar } from 'react-icons/hi';

type Props = {
  items: any[];
  title: string;
};

export const Table = ({ items, title }: Props) => {
  const orientation = useBreakpointValue<'horizontal' | 'vertical'>({
    base: 'vertical',
    md: 'horizontal',
  });
  console.log('', items[0]?.products);

  return (
    <Box bg={'white'} roundedTop={'sm'}>
      <Box
        fontFamily={'cursive'}
        fontSize={'2xl'}
        fontWeight={'black'}
        p={2}
        position={'relative'}
        bg={'white'}
        w={'full'}
      >
        {title}
      </Box>

      <Box bg={'gray.100'} p={2}>
        <Tabs.Root
          variant="subtle"
          defaultValue="members"
          orientation={orientation}
        >
          <Tabs.List>
            {items?.map((item) => (
              <Box bg={'white'}>
                <Tabs.Trigger bg={'none'} value={item?.id}>
                  {item?.name}
                </Tabs.Trigger>
              </Box>
            ))}
          </Tabs.List>
          {items?.map((item, index) => (
            <Tabs.Content value={item?.id} key={index}>
              <Box>
                {item?.products ? (
                  <Grid
                    templateColumns={{
                      md: `repeat(5, 1fr)`,
                      base: `repeat(2, 1fr)`,
                      sm: `repeat(3, 1fr)`,
                    }}
                    gap={{ base: '1', md: '2' }}
                    px={{ md: 10 }}
                  >
                    {item?.products.map((itm, indx) => (
                      <Box maxW="sm" borderWidth="1px" key={indx} bg={"white"}>
                        <Image src={itm.image} />

                        <Box p="4" spaceY="2">
                          <HStack>
                            <Badge colorPalette="teal" variant="solid">
                              Superhost
                            </Badge>
                            <HStack gap="1" fontWeight="medium">
                              <Icon color="orange.400">
                                <HiStar />
                              </Icon>
                            </HStack>
                          </HStack>
                          <Text fontWeight="medium" color="fg">
                            {itm.title}
                          </Text>
                          <HStack>
                            <FormatNumber
                              value={itm.price}
                              style="currency"
                              currency="USD"
                            />
                            {" "} Stock: {itm.stock}
                          </HStack>
                        </Box>
                      </Box>
                    ))}
                  </Grid>
                ) : (
                  <Center>
                    <VStack p={2}>
                      <Spinner size={'xl'} color={'blue'} />
                      <Text>Chargement . . .</Text>
                    </VStack>
                  </Center>
                )}
              </Box>
            </Tabs.Content>
          ))}
        </Tabs.Root>
      </Box>
    </Box>
  );
};
