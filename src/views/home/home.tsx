import { HomeProductTable } from '@/components/layout/ui/shared/home.product.table.shared';
import { instance } from '@/helpers/api';
import { Stack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export const Home = () => {
  const [data, setDatas] = useState<any[]>([]);

  const items = () => {
    return instance({
      url: 'bestSellersByCategory',
      method: 'get',
    });
  };

  useEffect(() => {
    const load = async () => {
      const resp = await items();
      const dd = resp.data;
      setDatas(dd);
    };
    load();
  }, []);
  return (
    <Stack px={{md:5, base:2}}>
    <HomeProductTable items={data} title={"Produits a la mode"}/>
    </Stack>
  );
};
