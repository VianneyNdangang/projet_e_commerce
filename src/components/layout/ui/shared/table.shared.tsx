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
  VStack,
  Heading,
  IconButton,
  Separator,
  Stack,
} from "@chakra-ui/react";
import { HiStar } from "react-icons/hi";
import { FaShoppingCart, FaHeart, FaEye } from "react-icons/fa";
import { DrawerComponent } from "./drawer.shared";
import { FiGrid } from "react-icons/fi";
import { AddToCart } from "@/handler/product.handler";
import { notify } from "./toaster.shared";
import { ProductDetail } from "@/views/products/product.detail";
import { useState } from "react";
import type { ProductType } from "@/types/product.types";
import { CustomButton } from "@/components/ui/form/button.component";
// import { BiCart } from "react-icons/bi";

type Props = {
  items: ProductType[];
  title: string;
};

export const Table = ({ items, title }: Props) => {
  const [isDetail, setIsDetail] = useState<boolean>(false);
  const [productId, setProductId] = useState<string>([]);
  const [loading, setLoading] = useState<boolean>(false)

  const handleAddToCart = (data: ProductType) => {
    try {
      setLoading(true);
      AddToCart(data, "1");
      notify("success", "Le produit a ete ajoute au panier");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleAddToWishlist = (productTitle: string) => {
    alert(`${productTitle} ajouté aux favoris !`);
  };

  const datasCategories: {
    id: string;
    name: string;
    product: ProductType[];
  }[] = [];
  items?.forEach((elements: any) => {
    const existing = datasCategories.find(
      (item) => item.id == elements?.categoryId
    );
    if (existing) {
      existing?.product.push(elements);
    } else {
      datasCategories.push({
        id: elements.categoryId,
        name: elements.category.name,
        product: [elements],
      });
    }
  });
  // const defaut = `${datasCategories[0]?.id}` + ``;
  return (
    <>
      <Box my={6} shadow={"md"} rounded={"md"}>
        <Box bg="white" p={6} w={"full"} roundedTop={"md"}>
          <Heading
            size="xl"
            color="gray.800"
            fontWeight="bold"
            textAlign="center"
          >
            {title}
          </Heading>
        </Box>
        <Box bg="white" p={4} roundedBottom={"md"}>
          <Tabs.Root variant="plain" defaultValue={"1"}>
            <Tabs.List bg="gray.50" rounded="lg" p={2} gap={2}>
              <DrawerComponent
                placement={"top"}
                children={
                  <HStack
                    cursor={"pointer"}
                    _hover={{
                      bg: "blue.50",
                      color: "blue.600",
                    }}
                  >
                    <FiGrid />
                    categories
                  </HStack>
                }
                items={datasCategories?.map((item, index) => (
                  <Tabs.Trigger
                    key={index}
                    value={item?.id}
                    rounded="md"
                    w="full"
                    color="gray.700"
                    _selected={{
                      bg: "blue.500",
                      color: "white",
                      shadow: "md",
                    }}
                    _hover={{
                      bg: "blue.50",
                      color: "blue.600",
                    }}
                    transition="all 0.2s ease"
                    _focus={{ outline: "none" }}
                    border={"none"}
                  >
                    {item?.name}
                  </Tabs.Trigger>
                ))}
                title={"Categories"}
              />
            </Tabs.List>
            <Separator />
            {datasCategories?.map((item, index) => (
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
                {/* <Tabs.Content value={item?.id} key={index} p={4}> */}
                <VStack textAlign={"center"} pb={"5"} fontSize={"xl"}>
                  {item.name}
                  <Text fontSize={"xs"}>
                    {item?.product?.length} produits disponibles
                  </Text>
                </VStack>
                <Separator pb={4} />

                {/* <Box key={index}> */}
                {item?.product ? (
                  <Grid
                    templateColumns={{
                      md: `repeat(4, 1fr)`,
                      base: `repeat(2, 1fr)`,
                      sm: `repeat(2, 1fr)`,
                      lg: `repeat(5, 1fr)`,
                    }}
                    gap={6}
                  >
                    {item?.product?.map(
                      (product: any, productIndex: number) => (
                        <Box
                          key={productIndex}
                          bg="white"
                          rounded="md"
                          border={"1px solid"}
                          borderColor="gray.100"
                          overflow="hidden"
                          _hover={{
                            shadow: "lg",
                            transform: "translateY(-4px)",
                            borderColor: "blue.300",
                          }}
                          transition="all 0.3s ease"
                          cursor="pointer"
                        >
                          {/* Image Container */}
                          <Box position="relative" overflow="hidden">
                            <Image
                              src={product?.images}
                              alt={product?.title}
                              w="full"
                              h="200px"
                              objectFit="cover"
                              _hover={{
                                transform: "scale(1.05)",
                              }}
                              transition="transform 0.3s ease"
                              onClick={() => {
                                setIsDetail(true);
                                setProductId(product.id);
                              }}
                            />

                            {/* Stock Badge */}

                            <Badge
                              position="absolute"
                              top={2}
                              right={2}
                              bg={product.stock > 0 ? "green" : "red"}
                              variant="solid"
                              rounded="full"
                              px={2}
                              py={1}
                            >
                              {product.stock > 0
                                ? `${product.stock} en stock`
                                : "Rupture"}
                            </Badge>

                            {/* Rating Badge */}
                            {product.rating && (
                              <Badge
                                position="absolute"
                                top={2}
                                left={2}
                                bg="white"
                                color="orange.500"
                                variant="solid"
                                rounded="full"
                                px={2}
                                py={1}
                              >
                                <HStack gap={1}>
                                  <Icon color="orange.400" size="sm">
                                    <HiStar />
                                  </Icon>
                                  <Text fontSize="xs">{product.rating}</Text>
                                </HStack>
                              </Badge>
                            )}
                          </Box>

                          {/* Product Info */}
                          <Box p={4}>
                            <VStack align="start" gap={3}>
                              {/* Title */}
                              <Text
                                fontWeight="bold"
                                color="gray.800"
                                fontSize="lg"
                                lineHeight="short"
                                overflow="hidden"
                                textOverflow="ellipsis"
                                display="-webkit-box"
                                style={{
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: "vertical",
                                }}
                              >
                                {product.title}
                              </Text>

                              {/* Price */}
                              <HStack justify="space-between" w="full">
                                <Text
                                  fontSize="xl"
                                  fontWeight="bold"
                                  color="blue.600"
                                >
                                  <FormatNumber
                                    value={product.price}
                                    style="currency"
                                    currency="XAF"
                                  />
                                </Text>
                                {product.compareAtPrice &&
                                  product.compareAtPrice > product.price && (
                                    <Text
                                      fontSize="sm"
                                      color="gray.500"
                                      textDecoration="line-through"
                                    >
                                      <FormatNumber
                                        value={product.compareAtPrice}
                                        style="currency"
                                        currency="EUR"
                                      />
                                    </Text>
                                  )}
                              </HStack>

                              {/* Action Buttons */}
                              <HStack gap={2} w="full" justifyContent={"center"}>
                                <IconButton
                                  aria-label="Open menu"
                                  display={{ base: "flex", lg: "none" }}
                                  onClick={() => handleAddToCart(product)}
                                  variant="ghost"
                                  loading={loading}
                                  _focus={{ outline: "none", border: "none" }}
                                  bg="black"
                                  color="white"
                                >
                                  <FaShoppingCart />
                                </IconButton>
                                <Stack w={"full"} display={{ base: "none", lg: "flex" }}>
                                  <CustomButton
                                    onClick={() => handleAddToCart(product)}
                                    size="2xs"
                                    label="Panier"
                                    icon={
                                      <FaShoppingCart
                                        style={{ marginRight: "8px" }}
                                      />
                                    }
                                    color={"white"}
                                    bg={"black"}
                                    w={"full"}
                                    type={"button"}
                                    bg_H="blue.600"
                                  />
                                </Stack>
                                <CustomButton
                                    onClick={() => {
                                      handleAddToWishlist(product.title);}}
                                    size={"2xs"}
                                    icon={
                                      <FaHeart />
                                    }
                                    color={"red.500"}
                                    bg={"white"}
                                    type={"button"}
                                    bg_H="gray.200"
                                  />
                                   <CustomButton
                                    onClick={() => {
                                      setIsDetail(true);
                                      setProductId(product.id);}}
                                    size={"2xs"}
                                    icon={
                                      <FaEye />
                                    }
                                    color={"black"}
                                    bg={"white"}
                                    type={"button"}
                                    bg_H="gray.200"
                                  />
                              </HStack>
                            </VStack>
                          </Box>
                        </Box>
                      )
                    )}
                  </Grid>
                ) : (
                  <Center py={12}>
                    <VStack gap={4}>
                      <Spinner size="xl" color="blue.500" />
                      <Text color="gray.600" fontSize="lg" fontWeight="medium">
                        Chargement des produits...
                      </Text>
                    </VStack>
                  </Center>
                )}
                {/* </Box> */}
              </Tabs.Content>
            ))}
          </Tabs.Root>
        </Box>
      </Box>

      <ProductDetail
        id={productId}
        open={isDetail}
        close={() => setIsDetail(false)}
      />
    </>
  );
};
