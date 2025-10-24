import {
  Badge,
  Box,
  Button,
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
} from "@chakra-ui/react";
import { HiStar } from "react-icons/hi";
import { FaShoppingCart, FaHeart, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router";
import { DrawerComponent } from "./drawer.shared";
import { FiGrid } from "react-icons/fi";
import { instance } from "@/helpers/api";
import { AddToCart } from "@/handler/product.handler";
// import { BiCart } from "react-icons/bi";

type Props = {
  items: any[];
  title: string;
};

export const Table = ({ items, title }: Props) => {
  const navigate = useNavigate();

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  const handleAddToCart = (data: any) => {
    try {
      AddToCart(data, 1)
    } catch (error) {
      console.log(error)
    }
    
  };

  const handleAddToWishlist = (productTitle: string) => {
    alert(`${productTitle} ajouté aux favoris !`);
  };

  const datasCategories: { id: string; name: string; product: any[] }[] = [];
  items.forEach((elements: any) => {
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
  const defaut = `${datasCategories[0]?.id}` + ``;
  return (
    <Box my={6} shadow={"md"}  rounded={"md"}>
      <Box
        bg="white"
        p={6}
        borderBottom="1px solid"
        borderColor="gray.200"
        w={"full"}
        roundedTop={"md"}
      >
        <Heading
          size="xl"
          color="gray.800"
          fontWeight="bold"
          textAlign="center"
        >
          {title}
        </Heading>
      </Box>
      <Box bg="white" p={4}  roundedBottom={"md"}>
        <Tabs.Root variant="enclosed" defaultValue={defaut} colorPalette="blue">
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
                  px={1}
                  py={2}
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
          {datasCategories?.map((item, index) => (
            <Tabs.Content value={item?.id} key={index} p={4}>
              <Box textAlign={"center"} pb={"10"} fontSize={"xl"}>
                {item.name}
              </Box>

              <Box key={index}>
                {item?.product ? (
                  <Grid
                    templateColumns={{
                      md: `repeat(4, 1fr)`,
                      base: `repeat(1, 1fr)`,
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
                          onClick={() => handleProductClick(product.id)}
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
                                    currency="EUR"
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
                              <HStack gap={2} w="full">
                                <IconButton
                                  aria-label="Open menu"
                                  display={{ base: "flex", md: "none" }}
                                  onClick={() => handleProductClick(product.id)
                                  }
                                  variant="ghost"
                                  _hover={{
                                    transform: "translateY(-1px)",
                                    shadow: "md",
                                    bg: "blue.600",
                                    color: "white",
                                  }}
                                  _focus={{ outline: "none", border: "none" }}
                                  bg="blue.500"
                                  color="white"
                                >
                                   <FaShoppingCart/>
                                </IconButton>
                                <Button
                                  size="sm"
                                  colorScheme="blue"
                                  display={{ base: "none", md: "flex" }}
                                  flex="1"
                                  onClick={() => handleAddToCart(product.id)
                                  }
                                  _hover={{
                                    transform: "translateY(-1px)",
                                    shadow: "md",
                                    bg: "blue.600",
                                    color: "white",
                                  }}
                                  _focus={{ outline: "none", border: "none" }}
                                  bg="blue.500"
                                  color="white"
                                >
                                  <FaShoppingCart
                                    style={{ marginRight: "8px" }}
                                  />
                                  Panier
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  colorScheme="red"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleAddToWishlist(product.title);
                                  }}
                                  _hover={{
                                    bg: "red.50",
                                    borderColor: "red.400",
                                  }}
                                >
                                  <FaHeart />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  colorScheme="gray"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleProductClick(product.id);
                                  }}
                                  _hover={{
                                    bg: "gray.50",
                                  }}
                                >
                                  <FaEye />
                                </Button>
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
              </Box>
            </Tabs.Content>
          ))}
        </Tabs.Root>
      </Box>
    </Box>
  );
};
