import { Table } from "@/components/layout/ui/shared/table.shared";
import { instance } from "@/helpers/api";
import {
  Center,
  Heading,
  Spinner,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

export const ListPromotionProduct = () => {
  const fetchUsers = async () => {
    const data = await instance.get(`products`);
    return data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["products"], // identifiant du cache
    queryFn: fetchUsers, // la fonction qui appelle ton API
    staleTime: 1000 * 60 * 5, // 5 minutes sans refetch
  });

  const promotionProduct = data?.data.filter((element: any) => element.compareAtPrice)

  if (isLoading) {
    return (
      <Center py={12}>
        <VStack gap={4}>
          <Spinner size="xl" color="blue.500" />
          <Text color="gray.600" fontSize="lg" fontWeight="medium">
            Chargement des produits...
          </Text>
        </VStack>
      </Center>
    );
  }
  return (
    <>
      <Heading
        fontFamily={"cursive"}
        fontSize={"2xl"}
        fontWeight={"black"}
        p={2}
      >
        Promotion
      </Heading>
      {promotionProduct.length !== 0 ? 
      <Stack px={{ md: 5, base: 2 }}>
        <Table title="Promotion" items={promotionProduct} />
      </Stack> :
      <Center py={12}>
      <VStack gap={4} h={"1/2"}>
        <Text color="gray.600" fontSize="lg" fontWeight="medium">
         Désolé! Aucun produits n'est en promotion
        </Text>
      </VStack>
    </Center> 
      }
    </>
  );
};
