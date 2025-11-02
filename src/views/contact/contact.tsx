import {
  Box,
  Flex,
  Image,
  Stack,
  Strong,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import MapComponent from "./Map.position";
import { CustomInput } from "@/components/ui/form/input.component";
import { CustomButton } from "@/components/ui/form/button.component";
import { FiMail, FiPhone, FiUser } from "react-icons/fi";
import { useForm } from "react-hook-form";

export const Contact = () => {
  const {control, handleSubmit} = useForm()
  const submitMessage =(data: any) =>{
  }
  return (
    <>
      <Box
        w={"full"}
        textAlign={"center"}
        justifyContent="center"
        h={"md"}
        alignItems="center"
        bgImage={"url('form-image.jpg')"}
        bgSize={"cover"}
        bgRepeat={"no-repeat"}

        backgroundPosition={"center"}
      >
          <VStack justifyContent={"Center"} h={"md"}>
            <Strong
              fontFamily={"cursive"}
              fontSize={"5xl"}
              color={"yellow.500"}
            >
              Contactez nous
            </Strong>
            <Text color={"white"}>
              {" "}
              Contactez nous
            </Text>
          </VStack>
      </Box>
      <Box
        alignItems="center"
        justifyContent="center"
        pb={4}
      >
        <VStack>
          <Box p={2} m={"2"} w={"full"}>
            <Flex
              direction={{ base: "column", md: "row" }}
              justifyContent={"center"}
              gap={2}
            >
              <Stack>
                <Image
                  src="tchokos-sarl.jpg"
                  w={{ base: "full", md: "lg" }}
                  h={{ base: "full", md: "lg" }}
                  rounded={"md"}
                  roundedRight={{base:"md", md:"none"}}
                />
              </Stack>
              <form onSubmit={handleSubmit(submitMessage)}>
                <VStack
                  gap={5}
                  w={{ base: "full", md: "lg" }}
                  h={{ base: "full", md: "lg" }}
                  justifyContent={"center"}
                >
                  <CustomInput
                    placeholder="Entrez votre nom"
                    size="lg"
                    isDisabled={false}
                    icon={<FiUser />}
                    name="name"
                    control={control}
                  />
                  <CustomInput
                    placeholder="Entrez votre numéro de telephone"
                    size="lg"
                    isDisabled={false}
                    icon={<FiPhone />}
                    name="phone"
                    control={control}
                  />
                  <CustomInput
                    placeholder="Entrez votre email"
                    type="email"
                    size="lg"
                    isDisabled={false}
                    icon={<FiMail />}
                    name="email"
                    control={control}
                  />
                  <Textarea
                    autoresize
                    placeholder="Laissez nous votre message"
                    size={"xl"}
                    bg={"gray.100"}
                    //   h={"2xl"}
                  />
                  <CustomButton
                    label={"Envoyer"}
                    w="full"
                    size={"lg"}
                    color={"white"}
                    bg={"black"}
                    type={"button"}
                    bg_H="blue.600"
                  />
                </VStack>
              </form>
            </Flex>
          </Box>
          <MapComponent
            latitude={4.04373}
            longitude={9.70239}
            name="Tchokos SARL"
          />
        </VStack>
      </Box>
    </>
  );
};
