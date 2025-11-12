import {
  Badge,
  Box,
  Center,
  FormatNumber,
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
  SimpleGrid,
  Pagination,
  usePaginationContext,
  ButtonGroup,
  type IconButtonProps,
  Flex,
  Spacer,
  useBreakpointValue,
} from "@chakra-ui/react";
import { HiChevronLeft, HiChevronRight, HiStar } from "react-icons/hi";
import { FaShoppingCart, FaHeart, FaEye } from "react-icons/fa";
import { DrawerComponent } from "./drawer.shared";
import { FiGrid } from "react-icons/fi";
import { AddToCart } from "@/handler/product.handler";
import { notify } from "./toaster.shared";
import { ProductDetail } from "@/views/products/product.detail";
import { useState } from "react";
import type { ProductType, ProductVariant } from "@/types/product.types";
import { CustomButton } from "@/components/ui/form/button.component";
import { connectedUserId } from "@/boots/hooks/connected";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

// 🔹 Lien personnalisé pour la pagination
// const PaginationLink = (
//   props: IconButtonProps & { page?: "prev" | "next" | number },
// ) => {
//   const { page, ...rest } = props
//   const pagination = usePaginationContext()
//   const handleClick = () => {
//     if (page === "prev") pagination.previousPage()
//     else if (page === "next") pagination.nextPage()
//     else pagination.setPage(Number(page))
//   }

//   return (
//     <IconButton onClick={handleClick} {...rest}>
//       {props.children}
//     </IconButton>
//   )
// }

type Props = {
  items: ProductType[];
  title: string;
};

export const Table = ({ items, title }: Props) => {
  const [isDetail, setIsDetail] = useState<boolean>(false);
  const [productId, setProductId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>();
  const [page, setPage] = useState(1);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const pageSize = 32; // 🔸 produits par page

  const handleAddToCart = async (data: ProductType) => {
    try {
      setLoading(true);
      const response = await AddToCart(
        connectedUserId,
        data,
        selectedVariant,
        1
      );
      if (response == 200) {
        notify("success", `${data.title} a ete ajoute au panier`);
      }
    } catch (error) {
      notify("error", `${data.title} n'a pas ete ajoute au panier`);
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
  }[] = [
    {
      id: "tout",
      name: "Tout",
      product: items,
    },
  ];
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
  return (
    <>
      <Box my={6}>
        <Box bg="white" p={6} w={"full"}>
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
          <Tabs.Root variant="plain" defaultValue={"tout"}>
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
                    rounded="sm"
                    fontSize={"xs"}
                    bg={"none"}
                    _selected={{
                      bg: "black",
                      color: "white",
                      shadow: "md",
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
            {datasCategories.map((item, index) => (
              //   const total = item.product.length;
              //   const start = (page - 1) * pageSize;
              //   const end = start + pageSize;
              // return
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
                <VStack textAlign={"center"} pb={"5"} fontSize={"xl"}>
                  {item.name}
                  <Text fontSize={"xs"}>
                    {item?.product?.length} produits disponibles
                  </Text>
                </VStack>
                <Separator pb={4} />

                {item?.product.length > 0 ? (
                  <SimpleGrid
                    columns={{ base: 2, sm: 3, md: 4, lg: 5 }}
                    gap={2}
                  >
                    {item?.product?.map(
                      (product: ProductType, productIndex: number) => (
                        <Box
                          key={productIndex}
                          bg="white"
                          rounded="sm"
                          border={"1px solid"}
                          borderColor="gray.100"
                          overflow="hidden"
                          _hover={{
                            shadow: "lg",
                            transform: "translateY(-4px)",
                          }}
                          transition="all 0.3s ease"
                          cursor="pointer"
                        >
                          {/* Image Container */}
                          <Box position="relative" overflow="hidden">
                            <Image
                              src={product?.images[0]}
                              alt={product?.title}
                              w="full"
                              h={{ base: "3xs", md: "2xs" }}
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
                          <Box p={1} h={"full"}>
                            <VStack align="start" gap={1}>
                              {/* Title */}
                              <Text fontWeight="bold" fontSize="sm">
                                {product.title}
                              </Text>

                              {/* Price */}
                              <HStack justify="space-between" w="full">
                                <Text color="yellow.600" fontWeight="semibold">
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
                                        currency="XAF"
                                      />
                                    </Text>
                                  )}
                              </HStack>

                              {/* Action Buttons */}
                              <HStack
                                gap={2}
                                w="full"
                                justifyContent={"center"}
                              >
                                <IconButton
                                  display={{ base: "flex", xl: "none" }}
                                  onClick={() => {
                                    handleAddToCart(product);
                                    setSelectedVariant(product?.variants[0]);
                                  }}
                                  variant="ghost"
                                  loading={loading}
                                  _focus={{ outline: "none", border: "none" }}
                                  bg="black"
                                  color="white"
                                >
                                  <FaShoppingCart />
                                </IconButton>
                                <Stack
                                  w={"full"}
                                  display={{ base: "none", xl: "flex" }}
                                >
                                  <CustomButton
                                    onClick={() => {
                                      handleAddToCart(product);
                                      setSelectedVariant(product?.variants[0]);
                                    }}
                                    size="2xs"
                                    isLoading={loading}
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
                                  />
                                </Stack>
                                {/* <Tooltips showArrow content="Ajouter aux favoris"> */}
                                <CustomButton
                                  onClick={() => {
                                    handleAddToWishlist(product.title);
                                  }}
                                  size={"2xs"}
                                  icon={<FaHeart />}
                                  color={"red.500"}
                                  bg={"white"}
                                  type={"button"}
                                  bg_H="gray.200"
                                />
                                {/* </Tooltips> */}
                                <CustomButton
                                  onClick={() => {
                                    setIsDetail(true);
                                    setProductId(product.id);
                                  }}
                                  size={"2xs"}
                                  icon={<FaEye />}
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
                  </SimpleGrid>
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

                {/* 🔹 Pagination en bas */}
                {/* {total > pageSize && (
                  <Box mt={6} textAlign="center">
                    <Pagination.Root
                      count={total}
                      pageSize={pageSize}
                      page={page}
                      onPageChange={(e) => setPage(e.page)}
                    >
                      <ButtonGroup variant="ghost" size="sm">
                        <PaginationLink page="prev" aria-label="Précédent">
                          <HiChevronLeft />
                        </PaginationLink>

                        <Pagination.Items
                          render={(page) => (
                            <PaginationLink
                              key={page.value}
                              page={page.value}
                              variant={page.isActive ? "outline" : "ghost"}
                            >
                              {page.value}
                            </PaginationLink>
                          )}
                        />

                        <PaginationLink page="next" >
                          <HiChevronRight />
                        </PaginationLink>
                      </ButtonGroup>
                    </Pagination.Root>

                    <Text mt={2} fontSize="sm" color="gray.500">
                      Affichage {start + 1}–{Math.min(end, total)} sur {total}{" "}
                      produits
                    </Text>
                  </Box>
                )} */}

                {items.length > 0 ? (
                  <Pagination.Root
                    count={item?.product?.length}
                    pageSize={pageSize}
                    defaultPage={1}
                    backgroundColor="white"
                    mt={6}
                    onPageChange={(p: { page: number; pageSize: number }) =>
                      setPage(p.page)
                    }
                  >
                    <Flex
                      align="center"
                      py="1"
                      px="2.5"
                      direction={"column"}
                    >
                      <Text fontSize="sm">{`1 - ${item?.product?.length}`}</Text>
                      {/* <Spacer /> */}
                      <ButtonGroup variant="ghost" size="sm">
                        <Pagination.PrevTrigger asChild>
                          <IconButton size="xs" onClick={() => setPage(page)}>
                            <LuChevronLeft />
                          </IconButton>
                        </Pagination.PrevTrigger>

                        <Pagination.Items
                          render={(page) => (
                            <IconButton
                              variant={{ base: "plain", _selected: "subtle" }}
                              size="xs"
                              onClick={() => setPage(page.value)}
                              bg={"none"}
                              _focus={{bg:"gray.100",
                                outline: "none"
                              }}
                            >
                              {page.value}
                            </IconButton>
                          )}
                        />

                        <Pagination.NextTrigger asChild>
                          <IconButton>
                            <LuChevronRight />
                          </IconButton>
                        </Pagination.NextTrigger>
                      </ButtonGroup>
                    </Flex>
                  </Pagination.Root>
                ) : (
                  <Box as="div" bg="white" py="4">
                    <Stack gap={0} align={"center"}>
                      {/* {i18n.t('no_data')} */}
                    </Stack>
                  </Box>
                )}
              </Tabs.Content>
              // );
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
