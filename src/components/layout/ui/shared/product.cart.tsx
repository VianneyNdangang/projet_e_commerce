// import { CustomButton } from "@/components/ui/form/button.component"
// import type { ProductType } from "@/types/product.types"
// import { Box, FormatNumber, IconButton, Image, Stack, Text } from "@chakra-ui/react"
// import { motion } from "framer-motion"
// import { FaHeartBroken } from "react-icons/fa"

// export const productCart = (item: ProductType)=>{
//       const MotionBox= motion(Box)
//    return(<><MotionBox
//     key={item.id}
//     bg="white"
//     rounded="sm"
//     shadow="md"
//     overflow="hidden"
//     whileHover={{ y: -5, scale: 1.02 }}
//     transition={{ type: "spring", stiffness: 200 }}
//   >
//     <Box position="relative">
//       <Image
//         src={item.images[0]}
//         alt={item.title}
//         objectFit="cover"
//         w="full"
//         h="240px"
//       />
//       <IconButton
//         position="absolute"
//         top={2}
//         right={2}
//         size="sm"
//         onClick={() => removeFavorite(item.id)}
//         color={"red.500"}
//       >
//         <FaHeartBroken />
//       </IconButton>
//     </Box>
//     <Box p={4}>
//       <Text fontWeight="bold" fontSize="lg">
//         {item.title}
//       </Text>
//       <Stack justify="space-between" mt={2}>
//         <FormatNumber value={item.price} style="currency" currency="XAF"/>
//         <Text color="yellow.600" fontWeight="semibold">
//           <FormatNumber value={item.price} currency="XAF"/>
//         </Text>
//         <CustomButton
//           label={"Ajouter au panier"}
//           color={"white"}
//           bg={"black"}
//           type={"button"}
//           onClick={() => alert("Ajouté au panier")}
//           size="sm"
//           w="full"
//         />
//       </Stack>
//     </Box>
//   </MotionBox></>)
// }