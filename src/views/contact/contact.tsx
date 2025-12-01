import {
  Box,
  Flex,
  HStack,
  Image,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import MapComponent from "./Map.position";
import { CustomInput } from "@/components/ui/form/input.component";
import { CustomButton } from "@/components/ui/form/button.component";
import { LuMail, LuPhone, LuUser } from "react-icons/lu";
import { useForm } from "react-hook-form";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { CustomTextarea } from "@/components/ui/form/textarea.component";
import { notify } from "@/components/layout/ui/shared/toaster.shared";
import { useState } from "react";
import { instance } from "@/helpers/api";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionImage = motion(Image);
const MotionText = motion(Text)

export const Contact = () => {
  interface ContactFormData {
    [key: string]: string;
  }

  const { control, handleSubmit } = useForm<ContactFormData>();
  const [loading, setLoading] = useState<boolean>(false);
  const submitMessage = (data: ContactFormData) => {
    try {
      setLoading(true);
      instance.post(`mails`, data);
      notify("success", "Message envoyé");
    } catch (error) {
      notify("error", "Une erreur est survenue lors de l'envoie du massage");
      console.log("error", error);
    }
    setLoading(false);
  };
  return (
    <>
    <Box position="relative" h={{ base: "70vh", md: "80vh" }}>
        <MotionImage
          src="https://i.postimg.cc/QMPTjg2m/pexels-pluyar-786003.jpg"
          alt="About us"
          objectFit="cover"
          w="full"
          h="full"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
        />
        <MotionBox
         bg={"rgba(0, 0, 0, 0.6)"} h={"full"} w={"full"}
         initial={{ scale: 1.2 }}
         animate={{ scale: 1 }}
         transition={{ duration: 2.5, ease: "easeOut" }}
          position="absolute"
          inset={0}
          bgGradient="linear(to-b, blackAlpha.700, blackAlpha.500)"
        />
        <VStack
          position="absolute"
          inset={0}
          justify="center"
          textAlign="center"
          color="white"
          px={6}
          gap={4}
        >
          <MotionText
            fontSize={{ base: "3xl", md: "5xl" }}
            fontWeight="bold"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Contactez nous{" "}
            <Text as="span" color="yellow.400">
              Van’s
            </Text>
          </MotionText>
          <Text maxW="2xl" fontSize={{ base: "md", md: "lg" }}>
            Nous sommes passionnés par la qualité, l’authenticité et la
            satisfaction de nos clients. Chez Van’s, chaque produit est une
            expérience.
          </Text>
        </VStack>
      </Box>
      <Box alignItems="center" justifyContent="center" pb={4}>
        <VStack px={{ md: 5, base: 2 }}>
          <Box position="relative" p={2} m={"4"} w={"full"} bg={"white"}>
            <Flex
              direction={{ base: "column", md: "row" }}
              justifyContent={"center"}
              gap={2}
              align={"center"}
            >
              <MotionBox
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
              >
                <MotionImage
                  src="tchokos-sarl.jpg"
                  w={"full"}
                  h={"full"}
                  rounded={"sm"}
                  roundedRight={{ base: "md", md: "none" }}
                  transition={{ duration: 2.5, ease: "easeOut" }}
                />
              </MotionBox>
              <MotionBox
                w={"full"}
                maxW={"sm"}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
              >
                <form onSubmit={handleSubmit(submitMessage)}>
                  <VStack
                    gap={2}
                    w={"full"}
                    h={"full"}
                    justifyContent={"center"}
                  >
                    <CustomInput
                      label="Nom"
                      placeholder="Entrez votre nom"
                      size="md"
                      isDisabled={false}
                      icon={<LuUser />}
                      name="name"
                      control={control}
                    />
                    <CustomInput
                      label="Téléphone"
                      placeholder="Entrez votre numéro de telephone"
                      size="md"
                      isDisabled={false}
                      icon={<LuPhone />}
                      name="phone"
                      control={control}
                    />
                    <CustomInput
                      label="E-mail"
                      placeholder="Entrez votre email"
                      type="email"
                      size="md"
                      isDisabled={false}
                      icon={<LuMail />}
                      name="email"
                      control={control}
                    />
                    <CustomTextarea
                      label={"Message"}
                      placeholder={"Laissez nous votre message"}
                      control={control}
                      name={"message"}
                    />
                    <CustomButton
                      label={"Envoyer"}
                      w="full"
                      size={"lg"}
                      color={"white"}
                      bg={"black"}
                      type={"submit"}
                      isLoading={loading}
                    />
                  </VStack>
                </form>
              </MotionBox>
            </Flex>
          </Box>
          <Box w={"full"}>
            <Stack
              align="start"
              gap={3}
              bg={"white"}
              p={4}
              w={"full"}
              direction={{ base: "column", md: "row" }}
              justifyContent={"center"}
            >
              <HStack gap={3} color="blue.500">
                <FaPhone />
                <Text color="black">+237 6XX XXX XXX</Text>
              </HStack>
              <HStack gap={3} color="blue.500">
                <FaEnvelope />
                <Text color="black">contact@tchokos.com</Text>
              </HStack>
              <HStack gap={3} color="blue.500">
                <FaMapMarkerAlt />
                <Text color="black">Douala, Cameroun</Text>
              </HStack>
            </Stack>
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
