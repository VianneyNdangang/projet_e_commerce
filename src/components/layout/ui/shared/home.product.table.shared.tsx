import {
  Box,
  Center,
  Flex,
  FormatNumber,
  Grid,
  Image,
  RatingGroup,
  Spinner,
  Stack,
  Strong,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import { MenuComponent } from "./table.menu.shared";
import { FiGrid } from "react-icons/fi";
import { ProductDetail } from "@/views/products/product.detail";
import { useState } from "react";

type Props = {
  items?: any[];
  title: string;
};

export const HomeProductTable = ({ items, title }: Props) => {
  const categories: any[] = [];
  const[isDetail, setIsDetail] =useState<boolean>(false)
  const[productId, setProductId] = useState<any>()
  items?.forEach((item) => {
    const exist = categories.find((element) => element.id == item.id);
    if (!exist) {
      categories.push({ label: item.name, value: item.id });
    }
  });

  const handleDetail = (id: string)=>{
  setIsDetail(true)
  setProductId(id)
 }
  return (
    <>
      <div>
        <Stack bg={"white"} p={2} my={"5"} w={"full"}>
          <Box
            fontFamily={"cursive"}
            fontSize={"2xl"}
            fontWeight={"black"}
            p={2}
          >
            {title}
          </Box>

          {items ? (
            <Flex minH={"dvh"}>
              <Tabs.Root
                defaultValue={categories[0].value}
                width={"full"}
                colorPalette={"blue"}
                size={"sm"}
                justifyContent={{ sm: "center" }}
                p={{ base: "1", md: "2" }}
                variant={"outline"}
              >
                <Tabs.List bg={"white"}>
                  <Box display={{ base: "flex", md: "none" }}>
                    <MenuComponent label={<FiGrid />} menuItems={categories} />
                  </Box>
                  {items.map((item, index) => (
                    <Tabs.Trigger
                      display={{ base: "none", md: "flex" }}
                      key={index}
                      value={item?.id}
                      bg={"white"}
                      m={"0.5"}
                      _focus={{ outline: "none" }}
                      border={"none"}
                    >
                      {item?.name}
                    </Tabs.Trigger>
                  ))}
                </Tabs.List>
                <Box>
                  <Box pos={"relative"} minH={"200px"} width={"full"}>
                    {items.map((item, index) => (
                      <Tabs.Content
                        key={index}
                        value={item?.id}
                        _open={{
                          animationName: "fade-in, scale-in",
                          animationDuration: "300ms",
                        }}
                        _closed={{
                          animationName: "fade-out, scale-out",
                          animationDuration: "120ms",
                        }}
                      >
                        {item.bestSellers ? (
                          <Grid
                            templateColumns={{
                              md: `repeat(5, 1fr)`,
                              base: `repeat(2, 1fr)`,
                              sm: `repeat(3, 1fr)`,
                            }}
                            gap={{ base: "1", md: "2" }}
                            px={{ md: 10 }}
                          >
                            {item.bestSellers.map((best: any, inde: any) => (
                              <Box
                                border={"1px solid"}
                                borderColor="gray.100"
                                _hover={{
                                  shadow: "lg",
                                  transform: "translateY(-4px)",
                                  borderColor: "blue.300",
                                }}
                                transition="all 0.3s ease"
                                cursor="pointer"
                                bg={"white"}
                                key={inde}
                                p={{ sm: 3, base: 1 }}
                                rounded={"md"}
                                onClick={() => handleDetail(best?.id)}
                              >
                                <Image
                                  src={best.image}
                                  alt={best?.title}
                                  h="200px"
                                  w="full"
                                  objectFit="cover"
                                  _hover={{
                                    transform: "scale(1.05)",
                                  }}
                                  transition="transform 0.3s ease"
                                />
                                <Box p={4}>
                                <Strong justifyContent={"center"}>
                                  {best.title}
                                </Strong></Box>
                                <Text>{best.description}</Text>
                                <RatingGroup.Root
                                  allowHalf
                                  count={5}
                                  defaultValue={best.rating}
                                  size="sm"
                                  colorPalette={"orange"}
                                >
                                  <RatingGroup.HiddenInput />
                                  <RatingGroup.Control />
                                </RatingGroup.Root>
                                <Text textStyle="lg">
                                  <FormatNumber
                                    value={best?.price}
                                    style="currency"
                                    currency="XAF"
                                  />
                                </Text>
                              </Box>
                            ))}
                          </Grid>
                        ) : (
                          <Box py={"5"} px={{ base: "10", md: "5" }}>
                            <Spinner size={"xl"} color={"blue"} />
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
                <Spinner size={"xl"} color={"blue"} />
                <Text>Chargement . . .</Text>
              </VStack>
            </Center>
          )}
        </Stack>
        <ProductDetail
        id={productId}
        open={isDetail}
        close={() => setIsDetail(false)}
      />
      </div>
    </>
  );
};
