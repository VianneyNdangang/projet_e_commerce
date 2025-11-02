import { DialogBox } from "@/components/layout/ui/shared/dialogueBox.shared";
import { CustomButton } from "@/components/ui/form/button.component";
import { CustomInput } from "@/components/ui/form/input.component";
import { useForm } from "react-hook-form";
import {
  Box,
  Heading,
  // HStack,
  // Image,
  Separator,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { schemaLogin, schemaSignIn, userSignIn } from "@/handler/users.handler";
import { zodResolver } from "@hookform/resolvers/zod";
import { notify, Toasters } from "@/components/layout/ui/shared/toaster.shared";
type props = {
  open: boolean;
  close: () => void;
};

export const UserForm = ({ open, close }: props) => {
  const { control: LoginControl, handleSubmit: handleLogin, reset: LoginReset } = useForm<any>({
    resolver: zodResolver(schemaLogin),
    mode: "onChange",
  });
  const { control: SignInControl, handleSubmit: handleSignIn, reset: SignInReset } = useForm<any>({
    resolver: zodResolver(schemaSignIn),
    mode: "onChange",
  });
  const [isformOpen, setIsformOpen] = useState<boolean>(false);
  const [loginLoading, setLoginLoading] = useState<boolean>(false);
  const [signLoading, setSignLoading] = useState<boolean>(false);

  const Login = (data: any) => {
    setLoginLoading(true);
  };

  const SignIn = (data: any) => {
    try {
      setSignLoading(true)
      userSignIn(data)
      notify("success", "Votre compte a ete créé")
      SignInReset()
      close()
    } catch (error) {
      notify("error", "Votre compte n'a pas ete créé")
    }
    setSignLoading(false);
  };
  return (
    <>
      <DialogBox
        open={open}
        close={() => close()}
        body={
          <Box p={2}>
            <Box pb={6}>
              <Heading fontSize={"2xl"} pb={2}>
                Connexion
              </Heading>
              <Text pb={2}>Connectez vous a votre compte</Text>
              <Separator />
            </Box>
            <Box pb={6}>
              <form onSubmit={handleLogin(Login)}>
                <VStack justifyContent={"center"} gap={2} pb={5}>
                  <CustomInput
                    placeholder={"Entrez votre nom"}
                    name="lastName"
                    label="Nom de l'utilisateur"
                    control={LoginControl}
                    size={"sm"}
                  />
                  <CustomInput
                    placeholder={"Entrez votre mot de passe"}
                    type={"password"}
                    name="password"
                    label="Mot de passe"
                    control={LoginControl}
                  />
                </VStack>
                <CustomButton
                  label="Connexion"
                  color={"white"}
                  size="sm"
                  w="full"
                  type={"submit"}
                  bg={"black"}
                  isLoading={loginLoading}
                />
              </form>
            </Box>
            <Separator />
            <Text
              color={"blue.500"}
              textAlign={"right"}
              cursor={"pointer"}
              _hover={{ color: "blue.600" }}
              onClick={() => {
                close();
                setIsformOpen(true);
              }}
            >
              {" "}
              Creer un compte
            </Text>
          </Box>
        }
        size={{ md: "sm", base: "xs" }}
      />
      <DialogBox
        p={0}
        open={isformOpen}
        close={() => setIsformOpen(false)}
        body={
          <Box rounded={"md"}>
            <Stack direction={{ base: "column", md: "row" }}>
              <Box
                w="full"
                roundedRight={{ md: "4xl", base: "none" }}
                rounded={"md"}
                shadow={"lg"}
                bgImage={"url('form-image.jpg')"}
                bgSize={"auto"}
                backgroundPosition={"center"}
              >
                <Box
                  p={2}
                  roundedRight={{ md: "4xl", base: "none" }}
                  rounded={"md"}
                  bg={"rgba(0, 0, 0, 0.6)"}
                  h={"full"}
                >
                  <VStack
                    pb={6}
                    color={"white"}
                    h={"full"}
                    justifyContent={"center"}
                  >
                    <Heading fontSize={"2xl"} pb={2}>
                      Creation d'un compte
                    </Heading>
                    <Text pb={2} textAlign={"center"}>
                      <b>Remplicez tous les champs pour creer votre compte</b>{" "}
                      <br /> Apres avoir créé votre compte, vous aurez access a
                      toutes les fonctionnalités du site
                    </Text>
                  </VStack>
                </Box>
              </Box>
              <Box p={4} roundedRight={"md"} w={"full"}>
                <form onSubmit={handleSignIn(SignIn)}>
                  <VStack justifyContent={"center"} gap={2} pb={5}>
                    <CustomInput
                      placeholder={"Entrez votre nom"}
                      name="lastName"
                      control={SignInControl}
                      label="Nom"
                    />
                    <CustomInput
                      placeholder={"Entrez votre prénom"}
                      name="firstName"
                      control={SignInControl}
                      label="Prénom"
                    />
                    <CustomInput
                      placeholder={"Entrez votre e-mail"}
                      type={"email"}
                      name="email"
                      control={SignInControl}
                      label="E-mail"
                    />
                    <CustomInput
                      placeholder={"Entrez votre numero de téléphone"}
                      name="phone"
                      control={SignInControl}
                      label="Numéro de téléphone"
                    />
                    <Stack direction={{ base: "column", md: "row" }} w={"full"}>
                      <CustomInput
                        placeholder={"Entrez votre mot de passe"}
                        type={"password"}
                        name="password"
                        control={SignInControl}
                        label="Mot de passe"
                      />
                      <CustomInput
                        placeholder={"Confirmez votre mot de passe"}
                        type={"password"}
                        name="confirmPassword"
                        control={SignInControl}
                        label="Confirmation"
                      />
                    </Stack>
                  </VStack>
                  <CustomButton
                    label="Connexion"
                    color={"white"}
                    size="sm"
                    w="full"
                    type={"submit"}
                    bg={"black"}
                    isLoading={signLoading}
                  />
                </form>
              </Box>
            </Stack>
          </Box>
        }
        size={{ md: "xl", base: "xs" }}
      />
      <Toasters/>
    </>
  );
};
