import { instance } from '@/helpers/api'
import {z} from 'zod'
export const schemaLogin = z.object({
    lastName: z.string().min(1,{message: "Le nom est requis"}),
    password: z.string().min(1,{message: "Veillez entrer le mot de passe"})
})

export const schemaSignIn = z.object({
    lastName: z.string() .min(1,{message: 'Le nom est requis'}),
    firstName: z.string().min(1,{message: 'Le prenom est requis'}),
    email: z.email() .min(1,{message: 'L\'email est requis'}),
    phone: z.string() .min(1,{message: 'Le numéro de telephone est requis'}),
    password: z.string() .min(1,{message: 'Le mot de est requis'}),
    confirmPassword: z.string()
})

export const userSignIn =( data:any) =>{
   const newdata ={ ...data, isAdmin: false, carts: []}
   console.log("newdata",newdata)
   instance.post(`users`,(newdata))
}