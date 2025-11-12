import {
  Box,
  // Button,
  Center,
  FormatNumber,
  // Flex,
  HStack,
  Image,
  // RatingGroup,
  SimpleGrid,
  Spinner,
  Stack,
  // Tabs,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ProductDetail } from "@/views/products/product.detail";
import { useState } from "react";
import { motion } from "framer-motion";
import { CustomButton } from "@/components/ui/form/button.component";

type Category = {
  id: string;
  name: string;
  slug: string;
  bestSellers: {
    id: number;
    title: string;
    image: string;
    price: number;
    rating: number;
    reviewsCount: number;
  }[];
};

type Props = {
  items: Category[];
  title: string;
};

export const HomeProductTable = ({ items, title }: Props) => {
  const MotionBox = motion(Box);
  const categories: any[] = [];
  const [isDetail, setIsDetail] = useState<boolean>(false);
  const [productId, setProductId] = useState<any>();
  const [selectedCategory, setSelectedCategory]= useState(items[0]?.id)
  const [loading, setLoading] = useState<boolean>(false)
  items?.forEach((item) => {
    const exist = categories.find((element) => element.value == item.id);
    if (!exist) {
      categories.push({ label: item.name, value: item.id });
    }  
  });

  const filteredProducts:any[] =[]
      const prod = items?.filter((p) => p.id === selectedCategory)
      prod?.forEach((elm) =>{
      elm.bestSellers.forEach((element) =>{
        filteredProducts.push(element)
      })  
    })

  const handleDetail = (id: string) => {
    try{
      setLoading(true)
    setIsDetail(true);
    setProductId(id);
  }finally{setLoading(false)}
  };
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
             <>
             {/* <Box display={{ base: "flex", md: "none" }}>
                    <MenuComponent label={<FiGrid />} menuItems={categories} />
                  </Box> */}
             <Box py={10} textAlign="center">
              <HStack justify="center" gap={4} flexWrap="wrap">
                {categories.map((cat, Index) => (
                  <Tag.Root
                    key={Index}
                    size="lg"
                    variant={selectedCategory === cat.value ? "solid" : "subtle"}
                    colorScheme={selectedCategory === cat.value ? "yellow" : "gray"}
                    cursor="pointer"
                    onClick={() => setSelectedCategory(cat.value)}
                  >
                    <Tag.Label>{cat.label}</Tag.Label>
                  </Tag.Root>
                ))}
              </HStack>
            </Box><Box px={{ base: 4, md: 10 }} pb={20}>
                <SimpleGrid columns={{ base: 2, sm: 3, md: 4, lg: 5 }} gap={2}>
                  {filteredProducts?.map((product, Index) => (
                    <MotionBox
                      key={Index}
                      bg="white"
                      rounded="sm"
                      overflow="hidden"
                      shadow="md"
                      whileHover={{ y: -6 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <Box position="relative">
                        <Image
                          src={product?.image}
                          alt={product?.title}
                          objectFit="cover"
                          h="250px"
                          w="full" 
                        />
                      </Box>
                      <Box p={1}>

                        <Text fontWeight="bold" fontSize="sm">
                          {product.title}
                        </Text>
                        <Text color="yellow.600" fontWeight="semibold">
                          <FormatNumber value={product.price} style="currency" currency="XAF"/>
                        </Text>
                        <CustomButton
                          label={"Voir les details"}
                          isLoading={loading}
                          color={"white"}
                          bg={"black"}
                          type={"button"}
                          onClick={()=>handleDetail(product.id)}
                          size="sm"
                          w="full" />
                      </Box>
                    </MotionBox>
                  ))}
                </SimpleGrid>
              </Box></>
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
