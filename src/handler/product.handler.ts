import { instance } from "@/helpers/api";
import type {
  CartItem,
  ProductType,
  ProductVariant,
} from "@/types/product.types";

export const AddToCart = async (
  userid: string,
  product: ProductType,
  variant?: ProductVariant,
  quantity?: number
) => {
  let oldDatas: CartItem[] = [];
  const data: CartItem = {
    productId: product?.id,
    title: product?.title,
    price: variant?.price ? variant.price : product?.price,
    quantity: quantity ? quantity : 1,
    image: product?.images[0],
    variants: variant,
    stock: variant?.stock ? variant.stock : product?.stock,
  };
  const fetchData = async () => {
    const item = await instance.get(`users/${userid}`);
    return item?.data.carts;
  };
  oldDatas = await fetchData();
  const datas: CartItem[] = oldDatas;
  datas.push(data);

  const patchResponse = await instance.patch(`users/${userid}`, { carts: datas });
  console.log(" patchResponse.status patchResponse.status", patchResponse.status)
  return patchResponse.status
};


export const DeleteToCart = async (
  userId: string,
  productId: string,
  product?: CartItem
) => {
  // try {
    const response = await instance.get(`users/${userId}`);
    const oldCart: CartItem[] = response?.data?.carts || [];

    const updatedCart = oldCart.filter((item) => {
      // On supprime si le même productId ET la même variante (s’il y en a)
      const sameProduct = item.productId === productId;
      const sameVariant = item.variants?.id === product?.variants?.id;
      return !(sameProduct && sameVariant);
    });
    const patchResponse = await instance.patch(`users/${userId}`, { carts: updatedCart });
    return patchResponse.status
};
