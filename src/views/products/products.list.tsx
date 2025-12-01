// import CustomLoader from "@/components/layout/ui/shared/loading";
import { Table } from "@/components/layout/ui/shared/table.shared";
import { Products } from "@/handler/product.handler";
import {
  Heading,
  Stack
} from "@chakra-ui/react";

export const ListProduct = () => {

  const ProductsList = Products;
  // if (isLoading) {
  //   return (
  //     <Center py={12}>
  //       <CustomLoader/>
  //     </Center>
  //   );
  // }
  return (
    <>
      <Heading
        fontFamily={"cursive"}
        fontSize={"2xl"}
        fontWeight={"black"}
        p={2}
      >
        Produits
      </Heading>
      <Stack px={{ md: 5, base: 2 }}>
        <Table title="Produits" items={ProductsList} />
      </Stack>
    </>
  );
};
