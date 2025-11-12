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
import { LuLock, LuMail, LuPhone, LuShieldCheck, LuUser } from "react-icons/lu";
import { ScrollAnimationBox } from "@/components/layout/ui/shared/animation";
type props = {
  open: boolean;
  close: () => void;
};

export const UserForm = ({ open, close }: props) => {
  const {
    control: LoginControl,
    handleSubmit: handleLogin,
    reset: LoginReset,
  } = useForm<any>({
    resolver: zodResolver(schemaLogin),
    mode: "onChange",
  });
  const {
    control: SignInControl,
    handleSubmit: handleSignIn,
    reset: SignInReset,
  } = useForm<any>({
    resolver: zodResolver(schemaSignIn),
    mode: "onChange",
  });
  const [isformOpen, setIsformOpen] = useState<boolean>(false);
  const [loginLoading, setLoginLoading] = useState<boolean>(false);
  const [signLoading, setSignLoading] = useState<boolean>(false);

  const Login = (data: any) => {
    console.log(data);
    LoginReset();
    setLoginLoading(true);
  };

  const SignIn = (data: any) => {
    try {
      setSignLoading(true);
      userSignIn(data);
      notify("success", "Votre compte a ete créé");
      SignInReset();
      close();
    } catch (error) {
      notify("error", "Votre compte n'a pas ete créé");
      console.log(error);
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
                    icon={<LuUser />}
                  />
                  <CustomInput
                    placeholder="Entrez votre mot de passe"
                    type={"password"}
                    name="password"
                    label="Mot de passe"
                    control={LoginControl}
                    icon={<LuLock />}
                  />
                </VStack>
                <CustomButton
                  label="Connexion"
                  color={"white"}
                  size="md"
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
          <Box rounded={"sm"}>
            <Stack direction={{ base: "column", md: "row" }}>
              <Box
                w="full"
                roundedRight={{ md: "4xl", base: "none" }}
                rounded={"sm"}
                shadow={"lg"}
                bgImage={"url('form-image.jpg')"}
                bgSize={"auto"}
                backgroundPosition={"center"}
              >
                <Box
                  p={2}
                  roundedRight={{ md: "4xl", base: "none" }}
                  rounded={"sm"}
                  bg={"rgba(0, 0, 0, 0.6)"}
                  h={"full"}
                >
                  <VStack
                    pb={6}
                    color={"white"}
                    h={"full"}
                    justifyContent={"center"}
                  >
                    <ScrollAnimationBox
                      children={
                        <><Heading fontSize={"2xl"}>
                          Creation d'un compte
                        </Heading>
                           {/* <ScrollAnimationBox duration={1}
                            children={ */}
                          <Text textAlign={"center"}>
                            <b>Remplicez tous les champs pour creer votre compte</b>{" "}
                            <br /> Apres avoir créé votre compte, vous aurez access a
                            toutes les fonctionnalités du site
                          </Text></> }
                    />
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
                      icon={<LuUser />}
                    />
                    <CustomInput
                      placeholder={"Entrez votre prénom"}
                      name="firstName"
                      control={SignInControl}
                      label="Prénom"
                      icon={<LuUser />}
                    />
                    <CustomInput
                      placeholder={"Entrez votre e-mail"}
                      type={"email"}
                      name="email"
                      control={SignInControl}
                      label="E-mail"
                      icon={<LuMail />}
                    />
                    <CustomInput
                      placeholder={"Entrez votre numero de téléphone"}
                      name="phone"
                      control={SignInControl}
                      label="Numéro de téléphone"
                      icon={<LuPhone />}
                    />
                    <Stack direction={{ base: "column", md: "row" }} w={"full"}>
                      <CustomInput
                        placeholder={"Entrez votre mot de passe"}
                        type={"password"}
                        name="password"
                        control={SignInControl}
                        label="Mot de passe"
                        icon={<LuLock />}
                      />
                      <CustomInput
                        placeholder={"Confirmez votre mot de passe"}
                        type={"password"}
                        name="confirmPassword"
                        control={SignInControl}
                        label="Confirmation"
                        icon={<LuShieldCheck />}
                      />
                    </Stack>
                  </VStack>
                  <CustomButton
                    label="Connexion"
                    color={"white"}
                    size="md"
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
      <Toasters />
    </>
  );
};
