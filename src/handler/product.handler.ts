import { instance } from "@/helpers/api";
import type { ProductType } from "@/types/product.types";
// import { useState } from "react";

type props = {
  productId: string;
  title: string;
  price: number;
  quantity?: number;
  images: string;
  stock: number;
};


export const AddToCart = async (
  product: ProductType,
  userid: string,
  quantity?: number
) => {
  // const [oldDatas, setOldDatas] = useState<props[]>([]);
  let oldDatas: props[] = [];
  const data: props = {
    productId: product?.id,
    title: product?.title,
    price: product?.price,
    quantity: quantity ? quantity : 1,
    images: product?.images[0],
    stock: product?.stock,
  };
  const fetchData = async () => {
    const item = await instance.get(`users/${userid}`);
    return item?.data.carts;
  };
  oldDatas = await fetchData();
  const datas: props[] = oldDatas;
  datas.push(data);

  instance.patch(`users/${userid}`, { carts: datas });
};

export const DeleteToCart = async (id: string, userid: string) => {
  let oldDatas: props[] = [];
  const fetchData = async () => {
    const item = await instance.get(`users/${userid}`);
    return item?.data.carts;
  };
  oldDatas = await fetchData();
  let datas: props[] = oldDatas;
  datas = datas.filter((element: props) => element.productId !== id);

  instance.patch(`users/${userid}`, { carts: datas });
};
