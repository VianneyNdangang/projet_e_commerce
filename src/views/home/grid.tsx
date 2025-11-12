import { ScrollAnimationBox } from "@/components/layout/ui/shared/animation";
import { instance } from "@/helpers/api";
import { Box, Grid, Image, Text, Flex } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

type Category = {
  id: number;
  title: string;
  image: string;
  colSpan: { base: number; sm?: number; md?: number };
  subcategories?: Category[];
};

// const categories: Category[] = [
//   {
//     id: 1,
//     title: "Wines",
//     image:
//       "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2940&auto=format&fit=crop",
//     colSpan: { base: 1, sm: 1, md: 2 },
//   },
//   {
//     id: 2,
//     title: "Gin",
//     image:
//       "https://images.unsplash.com/photo-1504675099198-7023dd85f5a3?q=80&w=2940&auto=format&fit=crop",
//     colSpan: { base: 1, sm: 1, md: 2 },
//     subcategories: [
//       {
//         id: 3,
//         title: "Whiskey",
//         image:
//           "https://images.unsplash.com/photo-1571104508999-893933ded431?q=80&w=2940&auto=format&fit=crop",
//         colSpan: { base: 1 },
//       },
//       {
//         id: 4,
//         title: "Vodka",
//         image:
//           "https://images.unsplash.com/photo-1626897505254-e0f811aa9bf7?q=80&w=2940&auto=format&fit=crop",
//         colSpan: { base: 1 },
//       },
//     ],
//   },
//   {
//     id: 5,
//     title: "Brandy",
//     image:
//       "https://images.unsplash.com/photo-1693680501357-a342180f1946?q=80&w=2940&auto=format&fit=crop",
//     colSpan: { base: 1, sm: 1, md: 1 },
//   },
// ];

const CategoryCard = ({ title, image }: { title: string; image: string }) => (
  
      <Box
        position="relative"
        rounded="sm" 
        overflow="hidden"
        role="group"
        cursor="pointer"
        h="full"
        minH="250px"
        _hover={{
            transform: "translateY(-4px)",
          }}
      >
        <Image
          src={image}
          alt={title}
          objectFit="cover"
          w="100%"
          h="100%"
        />
        <Box
          position="absolute"
          inset={0}
          bgGradient="linear(to-b, blackAlpha.600, blackAlpha.200)"
        />
        <Text
          position="absolute"
          top="0"
          left="0"
          p={4}
          fontSize={{ base: "xl", md: "2xl" }}
          fontWeight="semibold"
          color="white"
          zIndex={2}
        >
          {title}
        </Text>
      </Box>
);

export default function CategoriesSection() {
      

    const fetchUsers = async () => {
        const data = await instance.get(`bestcategories`);
        return data;
      };
    
      const { data, isLoading } = useQuery({
        queryKey: ["bestcategories"], // identifiant du cache
        queryFn: fetchUsers, // la fonction qui appelle ton API
        staleTime: 1000 * 60 * 5, // 5 minutes sans refetch
      });

    const categories = data?.data

  return (
    <Box bg="white" py={8} px={{ base: 2, md:4 }} w={"full"} justifyContent={"space-around"}>
        <ScrollAnimationBox
    children={
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
        }}
        gap={{base:2, md:5}}
        w={"full"}
      >
        {categories?.map((cat:any) => (
          <Grid
            key={cat.id}
            // colSpan={cat.colSpan.md}
            templateColumns={
              cat.subcategories
                ? "repeat(1, 1fr)" 
                : undefined
            }
            // gap={4}
          >
            <Flex direction="column" h="full" gap={2}>
              <CategoryCard title={cat.title} image={cat.image} />
              {cat.products && (
                <Grid templateColumns="repeat(2, 1fr)" gap={2}>
                  {cat.products.map((sub) => (
                    <CategoryCard
                      key={sub.id}
                      title={sub.title}
                      image={sub.image}
                    />
                  ))}
                </Grid>
              )}
            </Flex>
          </Grid>
        ))}
      </Grid>
    }/>
    </Box>
  );
}
