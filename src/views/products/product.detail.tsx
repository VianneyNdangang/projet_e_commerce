import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Heading,
  Image,
  RatingGroup,
  Text,
  Badge,
  VStack,
  HStack,
  IconButton,
  Spinner,
  Center,
  Separator,
  Input,
  Dialog,
  Portal,
  DialogHeader,
} from "@chakra-ui/react";
import { instance } from "@/helpers/api";
import { IoClose } from "react-icons/io5";
import {
  FaHeart,
  FaShoppingCart,
  FaMinus,
  FaPlus,
  FaShareAlt,
} from "react-icons/fa";
import { BiCart } from "react-icons/bi";
import type {
  ProductType,
  ProductVariant,
  Review,
} from "@/types/product.types";
import { notify, Toasters } from "@/components/layout/ui/shared/toaster.shared";
import { AddToCart } from "@/handler/product.handler";
import { CustomButton } from "@/components/ui/form/button.component";
import { connectedUserId } from "@/boots/hooks/connected";
type props = {
  id: string;
  open: boolean;
  close: () => void;
};
export const ProductDetail = ({ id, close, open }: props) => {
  const [product, setProduct] = useState<ProductType>();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>();
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        setLoading(true);
        const [productResponse, reviewsResponse] = await Promise.all([
          instance.get(`/products/${id}`),
          instance.get(`/reviews?productId=${id}`),
        ]);

        setProduct(productResponse.data);
        setReviews(reviewsResponse.data);
        setSelectedVariant(productResponse?.data?.variants[1]);
        setLoading(false);
      };
      fetchProduct();
    }
  }, [id]);

  const HandleAddToCart = async (data: ProductType) => {
    try {
      setIsLoading(true);
      const response = await AddToCart(
        connectedUserId,
        data,
        selectedVariant,
        quantity
      );
      if (response == 200) {
        notify("success", "Le produit a ete ajoute au panier");
      }
    } catch (error) {
      notify("error", "Le produit n'a pas ete ajoute au panier");
      console.log(error);
    }
    setIsLoading(false);
  };

  const handleAddToWishlist = () => {
    alert(`${product?.title} a été ajouté à votre liste de souhaits`);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.title,
        text: product?.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const currentPrice = selectedVariant
    ? selectedVariant?.price
    : product?.price ?? 0;
  const currentStock = selectedVariant
    ? selectedVariant?.stock
    : product?.stock ?? 0;
  const hasDiscount =
    product?.compareAtPrice && product.compareAtPrice > currentPrice;
  const discountPercentage = hasDiscount
    ? Math.round(
        ((product.compareAtPrice! - currentPrice) / product.compareAtPrice!) *
          100
      )
    : 0;
  return (
    <>
      <Dialog.Root
        size={{ mdDown: "sm", md: "xl" }}
        placement="center"
        motionPreset="slide-in-bottom"
        open={open}
        onOpenChange={() => close()}
      >
        <Dialog.Trigger asChild></Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <DialogHeader>
                <CustomButton
                  icon={<IoClose />}
                  size={"sm"}
                  color={"black"}
                  bg={"white"}
                  type={"button"}
                  onClick={() => close()}
                />
              </DialogHeader>
              {loading ? (
                <Center minH="50vh">
                  <VStack>
                    <Spinner size="xl" color="blue.500" />
                    <Text>Chargement du produit...</Text>
                  </VStack>
                </Center>
              ) : !product ? (
                <Center minH="50vh">
                  <Text>Produit non trouvé</Text>
                </Center>
              ) : (
                <>
                  <Dialog.Body>
                    <Grid
                      templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
                      gap={4}
                      p={2}
                    >
                      {/* Images du produit */}
                      <Box>
                        <VStack gap={2} bg="white" rounded="sm" p={2}>
                          {/* Image principale */}
                          <Box
                            position="relative"
                            rounded="sm"
                            overflow="hidden"
                            bg="white"
                            p={2}
                          >
                            <Image
                              src={product?.images[selectedImageIndex]}
                              alt={product.title}
                              w="full"
                              h="full"
                              objectFit="cover"
                              rounded={"sm"}
                            />
                            {hasDiscount && (
                              <Badge
                                position="absolute"
                                top={2}
                                left={2}
                                colorScheme="red"
                                fontSize="sm"
                                px={3}
                                py={1}
                                bg="green.500"
                                color="white"
                                animation={"pulse 2s infinite"}
                              >
                                -{discountPercentage}%
                              </Badge>
                            )}
                          </Box>

                          {/* Miniatures */}
                          {product?.images?.length > 1 && (
                            <HStack gap={2} overflowX="auto" pb={2}>
                              {product.images.map((image, index) => (
                                <Image
                                  key={index}
                                  src={image}
                                  alt={`${product.title} ${index + 1}`}
                                  w="80px"
                                  h="80px"
                                  objectFit="cover"
                                  rounded="sm"
                                  cursor="pointer"
                                  border={
                                    selectedImageIndex === index
                                      ? "2px solid"
                                      : "1px solid"
                                  }
                                  borderColor={
                                    selectedImageIndex === index
                                      ? "blue.500"
                                      : "gray.200"
                                  }
                                  onClick={() => setSelectedImageIndex(index)}
                                  _hover={{ opacity: 0.8, shadow: "md" }}
                                />
                              ))}
                            </HStack>
                          )}
                        </VStack>
                      </Box>

                      {/* Informations du produit */}
                      <Box py={4}>
                        <VStack gap={6} align="stretch">
                          {/* Titre et catégorie */}
                          <Box py={4}>
                            <Text
                              color="blue.500"
                              fontSize="sm"
                              fontWeight="medium"
                            >
                              {product.category.name}
                            </Text>
                            <Heading size="xl" mt={2}>
                              {product.title}
                            </Heading>
                            <HStack mt={2}>
                              <RatingGroup.Root
                                allowHalf
                                count={5}
                                defaultValue={product.rating}
                                size="sm"
                                colorPalette="orange"
                              >
                                <RatingGroup.HiddenInput />
                                <RatingGroup.Control />
                              </RatingGroup.Root>
                              <Text fontSize="sm" color="gray.600">
                                ({product.reviewsCount} avis)
                              </Text>
                            </HStack>
                          </Box>

                          {/* Prix */}
                          <Box>
                            <HStack gap={4}>
                              <Text
                                fontSize="xl"
                                fontWeight="bold"
                                color="blue.600"
                              >
                                {currentPrice?.toFixed(2)} {product.currency}
                              </Text>
                              {hasDiscount && (
                                <Text
                                  fontSize="xl"
                                  color="gray.500"
                                  textDecoration="line-through"
                                >
                                  {product.compareAtPrice?.toFixed(2)}
                                  {product.currency}
                                </Text>
                              )}
                            </HStack>
                            {hasDiscount && (
                              <Text color="green.600" fontSize="sm" mt={1}>
                                Vous économisez{" "}
                                {(
                                  product.compareAtPrice! - currentPrice
                                ).toFixed(2)}
                                {product.currency}
                              </Text>
                            )}
                          </Box>

                          {/* Description */}
                          <Box>
                            <Text color="gray.700" lineHeight="tall">
                              {product.description}
                            </Text>
                          </Box>

                          {/* Variantes */}
                          {product.variants && product.variants.length > 0 && (
                            <Box>
                              <Text fontWeight="medium" mb={3}>
                                Options disponibles :
                              </Text>
                              <HStack gap={1} flexWrap="wrap">
                                {product.variants.map((variant) => (
                                  <Button
                                    key={variant.id}
                                    variant={
                                      selectedVariant?.id === variant.id
                                        ? "solid"
                                        : "ghost"
                                    }
                                    colorScheme={
                                      selectedVariant?.id === variant.id
                                        ? "blue"
                                        : "gray"
                                    }
                                    bg={
                                      selectedVariant?.id === variant.id
                                        ? "blue.500"
                                        : ""
                                    }
                                    size="sm"
                                    onClick={() => setSelectedVariant(variant)}
                                    shadow="md"
                                    _hover={{
                                      bg: "blue.600",
                                      color: "white",
                                    }}
                                    _focus={{ outline: "none" }}
                                  >
                                    {variant.name}
                                  </Button>
                                ))}
                              </HStack>
                            </Box>
                          )}

                          {/* Quantité et stock */}
                          <Box>
                            <Text fontWeight="medium" mb={1}>
                              Quantité :
                            </Text>
                            <HStack gap={4}>
                              <HStack gap={2}>
                                <IconButton
                                  aria-label="Diminuer quantité"
                                  size="sm"
                                  onClick={() =>
                                    setQuantity(Math.max(1, quantity - 1))
                                  }
                                  disabled={quantity <= 1}
                                  color="black"
                                  _focus={{ outline: "none" }}
                                >
                                  <FaMinus />
                                </IconButton>
                                <Text
                                  minW="40px"
                                  textAlign="center"
                                  fontWeight="medium"
                                >
                                  <Input
                                    type="number"
                                    value={quantity}
                                    onChange={(e) =>
                                      setQuantity(Number(e.target.value))
                                    }
                                    border="none"
                                    shadow="md"
                                    minLength={1}
                                    maxLength={currentStock}
                                  />
                                </Text>
                                <IconButton
                                  aria-label="Augmenter quantité"
                                  size="sm"
                                  _focus={{ outline: "none" }}
                                  onClick={() =>
                                    setQuantity(
                                      Math.min(currentStock, quantity + 1)
                                    )
                                  }
                                  disabled={quantity >= currentStock}
                                  color="black"
                                >
                                  <FaPlus />
                                </IconButton>
                              </HStack>
                              <Text
                                color={
                                  currentStock > 0 ? "green.600" : "red.600"
                                }
                                fontSize="sm"
                              >
                                {currentStock ?? currentStock > 0
                                  ? `${currentStock} en stock`
                                  : "Rupture de stock"}
                              </Text>
                            </HStack>
                          </Box>
                          {/* Tags */}
                          {product.tags && product.tags.length > 0 && (
                            <Box>
                              <Text fontWeight="medium" mb={2}>
                                Tags :
                              </Text>
                              <HStack gap={2} flexWrap="wrap">
                                {product.tags.map((tag, index) => (
                                  <Badge
                                    key={index}
                                    colorScheme="blue"
                                    variant="subtle"
                                  >
                                    {tag}
                                  </Badge>
                                ))}
                              </HStack>
                            </Box>
                          )}
                          <Box rounded="sm" py={2}>
                            <Text fontSize="sm" color="gray.600">
                              SKU: {product.sku}
                            </Text>
                            <Text fontSize="sm" color="gray.600">
                              Ajouté le:
                              {new Date(product.createdAt).toLocaleDateString(
                                "fr-FR"
                              )}
                            </Text>
                          </Box>
                        </VStack>
                      </Box>
                    </Grid>
                  </Dialog.Body>
                  <Dialog.Footer
                    justifyContent={"center"}
                    bg={"white"}
                    rounded={"sm"}
                  >
                    <VStack gap={2} w={"full"}>
                      <HStack
                        gap={4}
                        bg={"white"}
                        w={"full"}
                        py={4}
                        justifyContent={"center"}
                      >
                        <IconButton
                          aria-label="Open menu"
                          display={{ base: "flex", md: "none" }}
                          onClick={() => HandleAddToCart(product)}
                          loading={isLoading}
                          bg={"blue.500"}
                          color={"white"}
                          variant="ghost"
                          _focus={{ outline: "none" }}
                        >
                          <BiCart size={24} />
                        </IconButton>
                        <Box display={{ base: "none", md: "flex" }} w={"full"}>
                          <CustomButton
                            icon={
                              <FaShoppingCart style={{ marginRight: "8px" }} />
                            }
                            label={"Ajouter au panier"}
                            isLoading={isLoading}
                            color={"white"}
                            bg={"blue.500"}
                            type={"button"}
                            w="full"
                            size="lg"
                            onClick={() => HandleAddToCart(product)}
                            shadow="md"
                            bg_H="blue.600"
                          />
                        </Box>
                        <IconButton
                          aria-label="Ajouter aux favoris"
                          size="lg"
                          variant="outline"
                          onClick={handleAddToWishlist}
                          border="none"
                          color="red.500"
                          shadow="md"
                          bg="none"
                          _focus={{ outline: "none" }}
                          _hover={{
                            bg: "gray.100",
                          }}
                        >
                          <FaHeart />
                        </IconButton>
                        <IconButton
                          aria-label="Partager"
                          size="lg"
                          variant="outline"
                          onClick={handleShare}
                          color="white"
                          bg="blue.500"
                          shadow="md"
                          border="none"
                          _focus={{ outline: "none" }}
                          _hover={{
                            bg: "blue.600",
                            color: "white",
                          }}
                        >
                          <FaShareAlt />
                        </IconButton>
                      </HStack>
                      {reviews.length > 0 && (
                        <Box mt={2} mb={4} w={"full"}>
                          <Separator />
                          <Heading size="lg" mb={2}>
                            Avis des clients ({reviews.length})
                          </Heading>
                          <VStack gap={6}>
                            {reviews.map((review) => (
                              <Box
                                key={review.id}
                                p={6}
                                border="1px solid"
                                borderColor="gray.200"
                                rounded="sm"
                                w={"full"}
                              >
                                <VStack align="start" gap={3}>
                                  <HStack justify="space-between" w="full">
                                    <Text fontWeight="medium">
                                      {review.title}
                                    </Text>
                                    <RatingGroup.Root
                                      allowHalf
                                      count={5}
                                      defaultValue={review.rating}
                                      size="sm"
                                      colorPalette="orange"
                                    >
                                      <RatingGroup.HiddenInput />
                                      <RatingGroup.Control />
                                    </RatingGroup.Root>
                                  </HStack>
                                  <Text color="gray.600" fontSize="sm">
                                    {review.body}
                                  </Text>
                                  <Text fontSize="xs" color="gray.500">
                                    {new Date(
                                      review.createdAt
                                    ).toLocaleDateString("fr-FR")}
                                  </Text>
                                </VStack>
                              </Box>
                            ))}
                          </VStack>
                        </Box>
                      )}
                    </VStack>
                  </Dialog.Footer>
                </>
              )}
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>

      <Toasters />
    </>
  );
};
