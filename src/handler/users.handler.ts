import { instance } from "@/helpers/api";
import { z } from "zod";
export const schemaLogin = z.object({
  lastName: z.string().min(1, { message: "Le nom est requis" }),
  password: z.string().min(1, { message: "Veillez entrer le mot de passe" }),
});

export const schemaSignIn = z
  .object({
    lastName: z.string().min(1, { message: "Le nom est requis" }),
    firstName: z.string().min(1, { message: "Le prenom est requis" }),
    email: z.email().min(1, { message: "L'email est requis" }),
    phone: z.string().min(1, { message: "Le numéro de telephone est requis" }),
    password: z
      .string()
      .min(5, {
        message: "Le mot de passe doit contenir au moins 5 caracteres",
      })
      .max(8, {
        message: "Le mot de passe doit contenir au trop 8 caracteres",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

export const userSignIn = (data: any) => {
  const newdata = { ...data, isAdmin: false, carts: [] };
  delete newdata.confirmPassword
  console.log("newdata", newdata);
  instance.post(`users`, newdata);
};
