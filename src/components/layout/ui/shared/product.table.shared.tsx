import {
  Box,
  Flex,
  FormatNumber,
  Grid,
  IconButton,
  Image,
  Presence,
  RatingGroup,
  Spinner,
  Stack,
  Strong,
  Tabs,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { MdStackedBarChart } from 'react-icons/md';

type itemsprops = {
  title: string;
  items:[{ title: string; content: [any] }];
};

export const ProductTable = ({ items, title }:itemsprops) => {
  const { open, onToggle } = useDisclosure();

  return (
    <>
      <div>
        <Stack bg={'white'} p={2} my={'5'} w={'full'}>
          <Box fontFamily={"cursive"} fontSize={"2xl"} fontWeight={"black"}>{title}</Box>
          <Flex minH={'dvh'}>
            <Tabs.Root
              defaultValue={items[0].title}
              width={'full'}
              colorPalette={'blue'}
              size={'sm'}
              justifyContent={{ sm: 'center' }}
              bg={'gray.100'}
              p={{ base: '1', md: '2' }}
            >
              <Tabs.List bg={'white'}>
                <IconButton
                  aria-label="Open title"
                  display={{ base: 'flex', md: 'none' }}
                  onClick={onToggle}
                  bg={'none'}
                  variant="ghost"
                  color="black"
                  _focus={{ outline: 'none' }}
                >
                  <MdStackedBarChart />
                </IconButton>
                <Stack gap="4">
                  <Presence
                    present={open}
                    animationStyle={{
                      _open: 'scale-fade-in',
                      _closed: 'scale-fade-out',
                    }}
                    animationDuration="moderate"
                  >
                    <Grid
                      templateColumns={{
                        base: `repeat(2, 1fr)`,
                        sm: `repeat(3, 1fr)`,
                      }}
                      gap={2}
                    >
                      {items.map((item, index) => (
                        <Tabs.Trigger
                          key={index}
                          value={item.title}
                          bg={'white'}
                          m={'0.5'}
                          _focus={{ outline: 'none' }}
                          border={'none'}
                        >
                          {item.title}
                        </Tabs.Trigger>
                      ))}
                    </Grid>
                  </Presence>
                </Stack>
                {items.map((item, index) => (
                  <Tabs.Trigger
                    display={{ base: 'none', md: 'flex' }}
                    key={index}
                    value={item.title}
                    bg={'white'}
                    m={'0.5'}
                    _focus={{ outline: 'none' }}
                    border={'none'}
                  >
                    {item.title}
                  </Tabs.Trigger>
                ))}
              </Tabs.List>
              <Box>
                <Box pos={'relative'} minH={'200px'} width={'full'}>
                  {items.map((item, index) => (
                    <Tabs.Content
                      key={index}
                      value={item.title}
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
                      {item?.content ? (
                        <Grid
                          templateColumns={{
                            md: `repeat(5, 1fr)`,
                            base: `repeat(2, 1fr)`,
                            sm: `repeat(3, 1fr)`,
                          }}
                          gap={{ base: '1', md: '2' }}
                          px={{ md: 10 }}
                        >
                          {item?.content.map((obj, idx) => (
                            <Box
                              bg={'white'}
                              key={idx}
                              p={{ sm: 3, base: 1 }}
                              rounded={'md'}
                            >
                              <Image src={obj.img} w={'full'} />
                              <Strong justifyContent={'center'}>
                                {obj.nom}
                              </Strong>
                              <Text>{obj.description}</Text>
                              <RatingGroup.Root
                                allowHalf
                                count={5}
                                defaultValue={obj.avis}
                                size="sm"
                                colorPalette={'orange'}
                              >
                                <RatingGroup.HiddenInput />
                                <RatingGroup.Control />
                              </RatingGroup.Root>
                              <Text textStyle="lg">
                                <FormatNumber
                                  value={obj.prise}
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
        </Stack>
      </div>
    </>
  );
};
