import { HomeProductTable } from "@/components/layout/ui/shared/home.product.table.shared";
import { instance } from "@/helpers/api";
import { Center, Spinner, Stack, Text, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

export const Home = () => {

  const fetchUsers = async () => {
    const data = await instance.get(`bestSellersByCategory`);
    return data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["home"], // identifiant du cache
    queryFn: fetchUsers, // la fonction qui appelle ton API
    staleTime: 1000 * 60 * 5, // 5 minutes sans refetch
  });

  return (
    <Stack px={{ md: 5, base: 2 }}>
      {isLoading ? (
        <Center py={12}>
          <VStack gap={4}>
            <Spinner size="xl" color="blue.500" />
            <Text color="gray.600" fontSize="lg" fontWeight="medium">
              Chargement des produits...
            </Text>
          </VStack>
        </Center>
      ) : (
        <HomeProductTable items={data?.data} title={"Produits a la mode"} />
      )}
    </Stack>
  );
};
