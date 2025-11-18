import { notify, Toasters } from '@/components/layout/ui/shared/toaster.shared';
import { CustomButton } from '@/components/ui/form/button.component';
import { CustomInput } from '@/components/ui/form/input.component';
import { CustomTextarea } from '@/components/ui/form/textarea.component';
import { VStack } from '@chakra-ui/react';
// import { Box, TextField } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { LuUser, LuPhone, LuMail, LuMessageCircle } from 'react-icons/lu';

export default function ContactForm() {
  const { reset, control, handleSubmit } = useForm();
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (event: any) => {
    console.log('eventevent', event);
    try {
      setLoading(true);
      event.preventDefault();
      const formData = new FormData(event.target);
      formData.append('access_key', '751a58b3-6cfa-4b0b-9e9c-80ccb5cda4b0');
      axios.post('https://api.web3forms.com/submit', { body: formData });
      // const response =
      // await
      // fetch('https://api.web3forms.com/submit', {
      //   method: 'POST',
      //   body: formData,
      // });

      // const data = await response.json();
      // console.log('datadata', data);
      notify('success', 'Message envoyé');
      reset();
    } catch (error) {
      notify('error', 'Message non envoyé');
      console.log(error);
    }
    setLoading(false);
  };
  return (
    <>
      <Toasters />
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack gap={5} w={'full'} h={'full'} justifyContent={'center'}>
          <CustomInput
            name={'name'}
            label="Nom"
            control={control}
            placeholder="Entrez votre nom"
            icon={<LuUser />}
          />
          <CustomInput
            name={'email'}
            label="E-mail"
            control={control}
            placeholder="Entrez votre email"
            type="email"
            icon={<LuMail />}
          />
          <CustomInput
            name={'phone'}
            label="Téléphone"
            control={control}
            placeholder="Entrez votre numéro de telephone"
            icon={<LuPhone />}
          />
          <CustomTextarea
            name={'message'}
            label="Message"
            control={control}
            placeholder="Laissez nous votre message"
            icon={<LuMessageCircle />}
          />
          <CustomButton type={'submit'} label="Envoyer" isLoading={loading} />
        </VStack>
      </form>
    </>
  );
}
