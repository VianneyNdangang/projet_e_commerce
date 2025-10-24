import { instance } from "@/helpers/api";

type props = {
    id: string,
    title: string,
    price: string,
    images: string,
    stock: string,
}
export const AddToCart = (data: props, quantity: number) => {
  instance.post(`carts`, {
    productId: data?.id,
    title: data?.title,
    price: data?.price,
    quantity: quantity,
    image: data?.images[0],
    stock: data?.stock,
  });
  //    if  (request.status == 201) {alert("ppppppp")}
};
