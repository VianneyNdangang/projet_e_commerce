import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
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
  Container,
  Separator,
  Input,
} from "@chakra-ui/react";
import { instance } from "@/helpers/api";
import {
  FaHeart,
  FaShoppingCart,
  FaShare,
  FaMinus,
  FaPlus,
} from "react-icons/fa";
import { BiCart } from "react-icons/bi";
import type { Product, ProductVariant, Review } from "@/types/product.types";
import { AddToCart } from "@/handler/product.handler";
import { notify, Toasters } from "@/components/layout/ui/shared/toaster.shared";

export const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    null
  );
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const [productResponse, reviewsResponse] = await Promise.all([
          instance.get(`/products/${id}`),
          instance.get(`/reviews?productId=${id}`),
        ]);

        setProduct(productResponse.data);
        setReviews(reviewsResponse.data);

        // Sélectionner la première variante par défaut
        if (
          productResponse.data.variants &&
          productResponse.data.variants.length > 0
        ) {
          setSelectedVariant(productResponse.data.variants[0]);
        }
      } catch (error) {
        console.error("Erreur lors du chargement du produit:", error);
        alert("Impossible de charger les détails du produit");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  
  // const Add = async (data: any) => {
  //   const request = await instance.post(`carts`, {
  //     userId: 1,
  //     productId: data?.id,
  //     title: data?.title,
  //     price: data?.price,
  //     quantity: quantity,
  //     image: data?.images[0],
  //     stock: data?.stock,
  //   });
  //   if (request.status == 200) {
  //     alert(`${product?.title} a été ajouté au panier`);
  //   }
  // };

  const handleAddToCart = () => {
    try {
      // setLoading(true);
      AddToCart(product, quantity);
      notify( 'success', "Le produit a ete ajoute au panier")
    } catch (error) {
      console.log(error);
    }
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
      alert("Le lien du produit a été copié dans le presse-papiers");
    }
  };

  if (loading) {
    return (
      <Center minH="50vh">
        <VStack>
          <Spinner size="xl" color="blue.500" />
          <Text>Chargement du produit...</Text>
        </VStack>
      </Center>
    );
  }
  if (!product) {
    return (
      <Center minH="50vh">
        <Text>Produit non trouvé</Text>
      </Center>
    );
  }

  const currentPrice = selectedVariant ? selectedVariant.price : product.price;
  const currentStock = selectedVariant ? selectedVariant.stock : product.stock;
  const hasDiscount =
    product.compareAtPrice && product.compareAtPrice > currentPrice;
  const discountPercentage = hasDiscount
    ? Math.round(
        ((product.compareAtPrice! - currentPrice) / product.compareAtPrice!) *
          100
      )
    : 0;

  return (
    <>
    <Toasters />
    <Container w={"full"} py={8}>
      <Grid
        templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
        gap={8}
        bg="white"
        rounded="md"
        p={4}
        shadow="md"
      >
        {/* Images du produit */}
        <Box bg="white" rounded="md" p={4}>
          <VStack gap={4} bg="white" rounded="md" p={4}>
            {/* Image principale */}
            <Box
              position="relative"
              borderRadius="lg"
              overflow="hidden"
              bg="white"
              rounded="md"
              p={4}
            >
              <Image
                src={product.images[selectedImageIndex]}
                alt={product.title}
                w="full"
                h="500px"
                objectFit="cover"
              />
              {hasDiscount && (
                <Badge
                  position="absolute"
                  top={4}
                  left={4}
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
            {product.images.length > 1 && (
              <HStack gap={2} overflowX="auto" pb={2}>
                {product.images.map((image, index) => (
                  <Image
                    key={index}
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    w="80px"
                    h="80px"
                    objectFit="cover"
                    borderRadius="md"
                    cursor="pointer"
                    border={
                      selectedImageIndex === index ? "2px solid" : "1px solid"
                    }
                    borderColor={
                      selectedImageIndex === index ? "blue.500" : "gray.200"
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
        <Box bg="white" rounded="md" p={4}>
          <VStack gap={6} align="stretch">
            {/* Titre et catégorie */}
            <Box bg="white" rounded="md" p={4}>
              <Text color="blue.500" fontSize="sm" fontWeight="medium">
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
                <Text fontSize="3xl" fontWeight="bold" color="blue.600">
                  {currentPrice.toFixed(2)} {product.currency}
                </Text>
                {hasDiscount && (
                  <Text
                    fontSize="xl"
                    color="gray.500"
                    textDecoration="line-through"
                  >
                    {product.compareAtPrice?.toFixed(2)} {product.currency}
                  </Text>
                )}
              </HStack>
              {hasDiscount && (
                <Text color="green.600" fontSize="sm" mt={1}>
                  Vous économisez{" "}
                  {(product.compareAtPrice! - currentPrice).toFixed(2)}{" "}
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
                <HStack gap={2} flexWrap="wrap">
                  {product.variants.map((variant) => (
                    <Button
                      key={variant.id}
                      variant={
                        selectedVariant?.id === variant.id ? "solid" : "outline"
                      }
                      colorScheme={
                        selectedVariant?.id === variant.id ? "blue" : "gray"
                      }
                      size="sm"
                      onClick={() => setSelectedVariant(variant)}
                      shadow="md"
                      _hover={{
                        bg: "blue.600",
                        color: "white",
                      }}
                    >
                      {variant.name}
                    </Button>
                  ))}
                </HStack>
              </Box>
            )}

            {/* Quantité et stock */}
            <Box>
              <Text fontWeight="medium" mb={3}>
                Quantité :
              </Text>
              <HStack gap={4}>
                <HStack gap={2}>
                  <IconButton
                    aria-label="Diminuer quantité"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    color="black"
                    _focus={{ outline: "none" }}
                  >
                    <FaMinus />
                  </IconButton>
                  <Text minW="40px" textAlign="center" fontWeight="medium">
                    <Input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
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
                      setQuantity(Math.min(currentStock, quantity + 1))
                    }
                    disabled={quantity >= currentStock}
                    color="black"
                  >
                    <FaPlus />
                  </IconButton>
                </HStack>
                <Text
                  color={currentStock > 0 ? "green.600" : "red.600"}
                  fontSize="sm"
                >
                  {currentStock > 0
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
                    <Badge key={index} colorScheme="blue" variant="subtle">
                      {tag}
                    </Badge>
                  ))}
                </HStack>
              </Box>
            )}

            {/* Actions */}
            <VStack gap={4}>
              <HStack gap={4}>
                <IconButton
                  aria-label="Open menu"
                  display={{ base: "flex", md: "none" }}
                  onClick={handleAddToCart}
                  bg={"none"}
                  variant="ghost"
                  color="black"
                  _focus={{ outline: "none" }}
                >
                  <BiCart size={24} />
                </IconButton>
                <Button
                  colorScheme="blue"
                  display={{ base: "none", md: "flex" }}
                  size="lg"
                  flex="1"
                  onClick={handleAddToCart}
                  loading={loading}
                  disabled={currentStock === 0}
                  bg="blue.500"
                  shadow="md"
                  _focus={{ outline: "none" }}
                  _hover={{
                    bg: "blue.600",
                  }}
                >
                  <FaShoppingCart style={{ marginRight: "8px" }} />
                  Ajouter au panier
                </Button>
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
                  <FaShare />
                </IconButton>
              </HStack>
            </VStack>

            {/* Informations supplémentaires */}
            <Box rounded="md" p={4}>
              <Text fontSize="sm" color="gray.600">
                SKU: {product.sku}
              </Text>
              <Text fontSize="sm" color="gray.600">
                Ajouté le:
                {new Date(product.createdAt).toLocaleDateString("fr-FR")}
              </Text>
            </Box>
          </VStack>
        </Box>
      </Grid>

      {/* Avis des clients */}
      {reviews.length > 0 && (
        <Box mt={12} bg="white" rounded="md" p={4} shadow="md">
          <Separator mb={8} />
          <Heading size="lg" mb={6}>
            Avis des clients ({reviews.length})
          </Heading>
          <VStack gap={6}>
            {reviews.map((review) => (
              <Box
                key={review.id}
                p={6}
                border="1px solid"
                borderColor="gray.200"
                borderRadius="md"
              >
                <VStack align="start" gap={3}>
                  <HStack justify="space-between" w="full">
                    <Text fontWeight="medium">{review.title}</Text>
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
                    {new Date(review.createdAt).toLocaleDateString("fr-FR")}
                  </Text>
                </VStack>
              </Box>
            ))}
          </VStack>
        </Box>
      )}
    </Container></>
  );
};
