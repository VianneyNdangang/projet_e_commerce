import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  HStack,
  IconButton,
  Image,
  Separator,
  Text,
  VStack,
  Badge,
  Input,
  Spinner,
  EmptyState,
} from "@chakra-ui/react";
import {
  FaTrash,
  FaMinus,
  FaPlus,
  FaArrowLeft,
} from "react-icons/fa";
import { useNavigate } from "react-router";
import type { CartItem } from "@/types/product.types";
import { instance } from "@/helpers/api";
import { CustomButton } from "@/components/ui/form/button.component";
import { LuShoppingCart } from "react-icons/lu";
import { DeleteToCart } from "@/handler/product.handler";
import { notify, Toasters } from "@/components/layout/ui/shared/toaster.shared";

export const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    type: string;
    value: number;
  } | null>(null);

  const items = () => {
    return instance({
      url: `users/${1}`,
      method: "get",
    });
  };

  useEffect(() => {
    const load = async () => {
      const mockCartItems = await items()
      //  await instance.get(`users${1}`);
      setTimeout(() => {
        setCartItems(mockCartItems.data.carts);
        setLoading(false);
      }, 1000);
    };
    load();
  }, []);

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handelDelete(itemId);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === itemId
          ? { ...item, quantity: Math.min(newQuantity, item.stock) }
          : item
      )
    );
  };

  const handelDelete = (id: string) => {
    try {
      DeleteToCart(id, "1")
      setCartItems(cartItems.filter((element) => element.productId !== id));
      notify("success", 'Produit supprimé')
    } catch (error) {
      console.log(error) 
      notify('error', 'Produit non supprimé')
    }
  };

  const applyCoupon = async () => {
    if (!couponCode.trim()) return;
    const validCoupons: any[] = [];
    // Simulation de l'application d'un coupon
    const items = await instance.get(`coupons`);
    items?.data.forEach((element: any) => {
      validCoupons.push(element.code);
    });
    if (validCoupons.includes(couponCode.toUpperCase())) {
      const item = items?.data.find(
        (element: any) => (element.code = couponCode.toUpperCase())
      );
      setAppliedCoupon({
        code: item?.code,
        type: item?.type,
        value: item?.value,
      });
      alert(`Coupon ${couponCode.toUpperCase()} appliqué avec succès !`);
    } else {
      alert("Code coupon invalide");
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const calculateShipping = () => {
    const subtotal = calculateSubtotal();
    if (appliedCoupon?.code === "FREESHIP" || subtotal >= 50) {
      return 0;
    }
    return 6.9;
  };

  const calculateDiscount = () => {
    if (!appliedCoupon) return 0;
    const subtotal = calculateSubtotal();
    if (appliedCoupon.type === "percent") {
      return (subtotal * appliedCoupon.value) / 100;
    }
    return 0;
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const shipping = calculateShipping();
    const discount = calculateDiscount();
    return subtotal + shipping - discount;
  };

  const proceedToCheckout = () => {
    alert("Redirection vers la page de commande...");
    // navigate('/checkout');
  };

  if (loading) {
    return (
      <Container maxW="7xl" py={8}>
        <VStack gap={8}>
          <Spinner size={"xl"} color={"blue"} />
          <Heading size="xl" textAlign="center">
            Chargement du panier...
          </Heading>
        </VStack>
      </Container>
    );
  }

  if (cartItems.length === 0) {
    return (
      <EmptyState.Root size={"lg"}>
        <EmptyState.Content>
          <EmptyState.Indicator>
            <LuShoppingCart />
          </EmptyState.Indicator>
          <VStack textAlign="center" gap={6}>
            <EmptyState.Title> Votre panier est vide</EmptyState.Title>
            <EmptyState.Description>
            Découvrez nos produits et ajoutez-les à votre panier
            </EmptyState.Description>
            <CustomButton
              label={" Découvrir nos produits"}
              size={"sm"}
              onClick={() => navigate("/articles")}
              color={"black"}
              bg={"white"}
              type={"button"}
              bg_H="blue.600"
              shadow_h="lg"
              color_H="white"
            />
          </VStack>
        </EmptyState.Content>
      </EmptyState.Root>
    );
  }

  return (
    <><Container w={"full"} py={8}>
      <VStack gap={8} align="stretch">
        {/* Header */}
        <Flex justify="space-between" align="center" w={"full"}>
          <HStack gap={4}>
            <IconButton
              aria-label="Retour"
              variant="outline"
              onClick={() => navigate(-1)}
            >
              <FaArrowLeft />
            </IconButton>
            <Heading size="xl">Mon Panier</Heading>
            <Badge colorScheme="blue" fontSize="sm" px={3} py={1}>
              {cartItems.length} article{cartItems.length > 1 ? "s" : ""}
            </Badge>
          </HStack>
        </Flex>

        <Grid templateColumns={{ base: "1fr", md: "2fr 1fr" }} gap={8}>
          {/* Liste des articles */}
          <VStack gap={4} align="stretch">
            {cartItems.map((item) => (
              <Box
                key={item.productId}
                p={6}
                shadow="md"
                border="1px solid"
                borderColor="gray.200"
                borderRadius="md"
                bg="white"
              >
                <Grid
                  templateColumns={{ base: "1fr", md: "auto 1fr auto" }}
                  gap={4}
                  alignItems="center"
                >
                  {/* Image */}
                  <Image
                    src={item.image}
                    alt={item.title}
                    w="120px"
                    h="120px"
                    objectFit="cover"
                    borderRadius="md" />

                  {/* Informations produit */}
                  <VStack align="start" gap={2}>
                    <Text fontWeight="bold" fontSize="lg" color="gray.800">
                      {item.title}
                    </Text>
                    <Text color="blue.600" fontSize="xl" fontWeight="bold">
                      {item.price.toFixed(2)} €
                    </Text>
                    <Text color="gray.500" fontSize="sm">
                      Stock disponible: {item.stock}
                    </Text>
                  </VStack>

                  {/* Contrôles quantité et actions */}
                  <VStack gap={4} align="end">
                    {/* Contrôle quantité */}
                    <HStack>
                      <IconButton
                        aria-label="Diminuer quantité"
                        size="sm"
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        color={"gray.500"}
                        bg={"none"}
                      >
                        <FaMinus />
                      </IconButton>
                      <Input
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.productId, parseInt(e.target.value) || 0)}
                        w="60px"
                        textAlign="center"
                        size="sm"
                        min={1}
                        max={item.stock} />
                      <IconButton
                        aria-label="Augmenter quantité"
                        size="sm"
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        disabled={item.quantity >= item.stock}
                        color={"gray.500"}
                        bg={"none"}
                      >
                        <FaPlus />
                      </IconButton>
                    </HStack>

                    {/* Prix total pour cet article */}
                    <Text fontWeight="bold" fontSize="lg" color="gray.800">
                      {(item.price * item.quantity).toFixed(2)} €
                    </Text>

                    {/* Bouton supprimer */}
                    <IconButton
                      aria-label="Supprimer l'article"
                      bg={"none"}
                      size="sm"
                      color="red"
                      variant="outline"
                      onClick={() => handelDelete(item.productId)}
                    >
                      <FaTrash />
                    </IconButton>
                  </VStack>
                </Grid>
              </Box>
            ))}
          </VStack>

          {/* Résumé de commande */}
          <Box
            p={6}
            shadow="lg"
            border="1px solid"
            borderColor="gray.200"
            borderRadius="md"
            bg="white"
            h="fit-content"
          >
            <VStack gap={4} align="stretch">
              <Heading size="md" color="gray.800">
                Résumé de commande
              </Heading>

              <Separator />

              {/* Sous-total */}
              <Flex justify="space-between">
                <Text>Sous-total</Text>
                <Text fontWeight="bold">
                  {calculateSubtotal().toFixed(2)} €
                </Text>
              </Flex>

              {/* Livraison */}
              <Flex justify="space-between">
                <Text>Livraison</Text>
                <Text
                  fontWeight="bold"
                  color={calculateShipping() === 0 ? "green.500" : "gray.800"}
                >
                  {calculateShipping() === 0
                    ? "Gratuite"
                    : `${calculateShipping().toFixed(2)} €`}
                </Text>
              </Flex>

              {/* Remise */}
              {appliedCoupon && (
                <Flex justify="space-between" color="green.500">
                  <Text>Remise ({appliedCoupon.code})</Text>
                  <Text fontWeight="bold">
                    -{calculateDiscount().toFixed(2)} €
                  </Text>
                </Flex>
              )}

              <Separator />

              {/* Total */}
              <Flex
                justify="space-between"
                fontSize="xl"
                fontWeight="bold"
                color="blue.600"
              >
                <Text>Total</Text>
                <Text>{calculateTotal().toFixed(2)} €</Text>
              </Flex>

              {/* Code promo */}
              <VStack gap={2} align="stretch">
                <Text fontSize="sm" color="gray.600">
                  Code promo
                </Text>
                <HStack>
                  <Input
                    placeholder="Entrez votre code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    size="sm" />
                  <CustomButton
                    label={"Appliquer"}
                    size={"sm"}
                    onClick={applyCoupon}
                    disabled={!couponCode.trim()}
                    color={"white"}
                    bg={"black"}
                    type={"button"}
                    bg_H="blue.600"
                    shadow_h="lg" />
                </HStack>
                {appliedCoupon && (
                  <Text fontSize="sm" color="green.500">
                    ✓ Coupon {appliedCoupon.code} appliqué
                  </Text>
                )}
              </VStack>

              {/* Boutons d'action */}
              <VStack gap={3} w="full">
                <CustomButton
                  label={"Passer la commande"}
                  size={"lg"}
                  onClick={proceedToCheckout}
                  color={"white"}
                  bg={"black"}
                  type={"button"}
                  w="full"
                  bg_H="blue.600"
                  shadow_h="lg" />
                <CustomButton
                  label={"Continuer mes achats"}
                  size={"lg"}
                  onClick={() => navigate("/articles")}
                  color={"black"}
                  bg={"white"}
                  type={"button"}
                  w="full"
                  bg_H="gray.200"
                  shadow_h="lg" />
              </VStack>

              {/* Informations de sécurité */}
              <Box bg="gray.50" p={4} borderRadius="md">
                <VStack gap={2} align="start">
                  <Text fontSize="sm" fontWeight="medium" color="gray.700">
                    🔒 Paiement sécurisé
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    Vos informations sont protégées par un cryptage SSL
                  </Text>
                </VStack>
              </Box>
            </VStack>
          </Box>
        </Grid>
      </VStack>
    </Container>
    <Toasters />
    </>
  );
};
