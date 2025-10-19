import { useState, useEffect } from 'react';
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
} from '@chakra-ui/react';
import { FaTrash, FaMinus, FaPlus, FaShoppingBag, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router';

interface CartItem {
  id: string;
  productId: number;
  variantId?: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
  stock: number;
}

export const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    type: string;
    value: number;
  } | null>(null);

  useEffect(() => {
    // Données de démonstration pour le panier
    const mockCartItems: CartItem[] = [
      {
        id: '1',
        productId: 101,
        variantId: '101-1',
        title: 'Casque Bluetooth X200 (Noir)',
        price: 129.99,
        quantity: 1,
        image: 'https://placehold.co/300x200/png/ffffff/000000?text=Casque+X200',
        stock: 30
      },
      {
        id: '2',
        productId: 106,
        title: 'Chargeur Rapide USB-C 30W',
        price: 17.5,
        quantity: 2,
        image: 'https://placehold.co/300x200/png/ffffff/000000?text=Chargeur+30W',
        stock: 300
      },
      {
        id: '3',
        productId: 103,
        variantId: '103-M',
        title: 'T-shirt Organic Cotton (M)',
        price: 19.0,
        quantity: 3,
        image: 'https://placehold.co/300x200/png/ffffff/000000?text=T-shirt+Organic',
        stock: 80
      }
    ];

    // Simulation du chargement des données
    setTimeout(() => {
      setCartItems(mockCartItems);
      setLoading(false);
    }, 1000);
  }, []);

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(itemId);
      return;
    }
    
    setCartItems(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { ...item, quantity: Math.min(newQuantity, item.stock) }
          : item
      )
    );
  };

  const removeItem = (itemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
    alert('Article supprimé du panier');
  };

  const applyCoupon = () => {
    if (!couponCode.trim()) return;
    
    // Simulation de l'application d'un coupon
    const validCoupons = ['WELCOME10', 'FREESHIP'];
    if (validCoupons.includes(couponCode.toUpperCase())) {
      setAppliedCoupon({
        code: couponCode.toUpperCase(),
        type: couponCode.toUpperCase() === 'WELCOME10' ? 'percent' : 'free_shipping',
        value: couponCode.toUpperCase() === 'WELCOME10' ? 10 : 0
      });
      alert(`Coupon ${couponCode.toUpperCase()} appliqué avec succès !`);
    } else {
      alert('Code coupon invalide');
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateShipping = () => {
    const subtotal = calculateSubtotal();
    if (appliedCoupon?.code === 'FREESHIP' || subtotal >= 50) {
      return 0;
    }
    return 6.9;
  };

  const calculateDiscount = () => {
    if (!appliedCoupon) return 0;
    const subtotal = calculateSubtotal();
    if (appliedCoupon.type === 'percent') {
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
    alert('Redirection vers la page de commande...');
    // navigate('/checkout');
  };

  if (loading) {
    return (
      <Container maxW="7xl" py={8}>
        <VStack gap={8}>
          <Heading size="xl" textAlign="center">Chargement du panier...</Heading>
        </VStack>
      </Container>
    );
  }

  if (cartItems.length === 0) {
    return (
      <Container maxW="7xl" py={8}>
        <VStack gap={8} textAlign="center">
          <Box>
            <FaShoppingBag size={64} color="#CBD5E0" />
          </Box>
          <Heading size="xl" color="gray.500">Votre panier est vide</Heading>
          <Text color="gray.400" fontSize="lg">
            Découvrez nos produits et ajoutez-les à votre panier
          </Text>
          <Button
            colorScheme="blue"
            size="lg"
            onClick={() => navigate('/articles')}
            _hover={{
              transform: "translateY(-2px)",
              shadow: "lg"
            }}
          >
            Découvrir nos produits
          </Button>
        </VStack>
      </Container>
    );
  }

  return (
    <Container maxW="7xl" py={8}>
      <VStack gap={8} align="stretch">
        {/* Header */}
        <Flex justify="space-between" align="center">
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
              {cartItems.length} article{cartItems.length > 1 ? 's' : ''}
            </Badge>
          </HStack>
        </Flex>

        <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={8}>
          {/* Liste des articles */}
          <VStack gap={4} align="stretch">
            {cartItems.map((item) => (
              <Box key={item.id} p={6} shadow="md" border="1px solid" borderColor="gray.200" borderRadius="md" bg="white">
                <Grid templateColumns={{ base: '1fr', md: 'auto 1fr auto' }} gap={4} alignItems="center">
                  {/* Image */}
                  <Image
                    src={item.image}
                    alt={item.title}
                    w="120px"
                    h="120px"
                    objectFit="cover"
                    borderRadius="md"
                  />

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
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <FaMinus />
                      </IconButton>
                      <Input
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 0)}
                        w="60px"
                        textAlign="center"
                        size="sm"
                        min={1}
                        max={item.stock}
                      />
                      <IconButton
                        aria-label="Augmenter quantité"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={item.quantity >= item.stock}
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
                      size="sm"
                      colorScheme="red"
                      variant="outline"
                      onClick={() => removeItem(item.id)}
                    >
                      <FaTrash />
                    </IconButton>
                  </VStack>
                </Grid>
              </Box>
            ))}
          </VStack>

          {/* Résumé de commande */}
          <Box p={6} shadow="lg" border="1px solid" borderColor="gray.200" borderRadius="md" bg="white" h="fit-content">
            <VStack gap={4} align="stretch">
              <Heading size="md" color="gray.800">Résumé de commande</Heading>
              
              <Separator />

              {/* Sous-total */}
              <Flex justify="space-between">
                <Text>Sous-total</Text>
                <Text fontWeight="bold">{calculateSubtotal().toFixed(2)} €</Text>
              </Flex>

              {/* Livraison */}
              <Flex justify="space-between">
                <Text>Livraison</Text>
                <Text fontWeight="bold" color={calculateShipping() === 0 ? "green.500" : "gray.800"}>
                  {calculateShipping() === 0 ? "Gratuite" : `${calculateShipping().toFixed(2)} €`}
                </Text>
              </Flex>

              {/* Remise */}
              {appliedCoupon && (
                <Flex justify="space-between" color="green.500">
                  <Text>Remise ({appliedCoupon.code})</Text>
                  <Text fontWeight="bold">-{calculateDiscount().toFixed(2)} €</Text>
                </Flex>
              )}

              <Separator />

              {/* Total */}
              <Flex justify="space-between" fontSize="xl" fontWeight="bold" color="blue.600">
                <Text>Total</Text>
                <Text>{calculateTotal().toFixed(2)} €</Text>
              </Flex>

              {/* Code promo */}
              <VStack gap={2} align="stretch">
                <Text fontSize="sm" color="gray.600">Code promo</Text>
                <HStack>
                  <Input
                    placeholder="Entrez votre code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    size="sm"
                  />
                  <Button
                    colorScheme="blue"
                    size="sm"
                    onClick={applyCoupon}
                    disabled={!couponCode.trim()}
                  >
                    Appliquer
                  </Button>
                </HStack>
                {appliedCoupon && (
                  <Text fontSize="sm" color="green.500">
                    ✓ Coupon {appliedCoupon.code} appliqué
                  </Text>
                )}
              </VStack>

              {/* Boutons d'action */}
              <VStack gap={3} w="full">
                <Button
                  colorScheme="blue"
                  size="lg"
                  w="full"
                  onClick={proceedToCheckout}
                  _hover={{
                    transform: "translateY(-2px)",
                    shadow: "lg"
                  }}
                >
                  Passer la commande
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  w="full"
                  onClick={() => navigate('/articles')}
                >
                  Continuer mes achats
                </Button>
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
  );
};
