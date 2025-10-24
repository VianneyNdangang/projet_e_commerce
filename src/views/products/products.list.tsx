import { Table } from '@/components/layout/ui/shared/table.shared';
import { instance } from '@/helpers/api';
import { Box, Stack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export const ListProduct = () => {
  const [data, setDatas] = useState<any[]>([]);
   const items = () => {
      return instance({
        url: 'products',
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
    <>
      <Box fontFamily={'cursive'} fontSize={'2xl'} fontWeight={'black'} p={2}>
        Produits
      </Box>
      <Stack px={{ md: 5, base: 2 }}>
        <Table title="Produits" items={data}/>
      </Stack>
    </>
  );
};
