import { instance } from "@/helpers/api";
import type {
  CartItem,
  ProductType,
  ProductVariant,
} from "@/types/product.types";
// import { useQuery } from "@tanstack/react-query";

// Recuperation de tous les produits
// export const Products = () =>{
//   const fetchUsers = async () => {
//     const data = await instance.get(`products`);
//     return data;
//   };

//   const { data } = useQuery({
//     queryKey: ["products"], // identifiant du cache
//     queryFn: fetchUsers, // la fonction qui appelle ton API
//     staleTime: 1000 * 60 * 5, // 5 minutes sans refetch
//   });

//   // if (isLoading) {
//   //   return (
//   //     isLoading
//   //   );
//   // }

//   return data?.data
// }

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

export const Products =  [
    {
      "id": "101",
      "title": "Casque Bluetooth X200",
      "slug": "casque-bluetooth-x200",
      "description": "Casque sans fil avec réduction active du bruit, autonomie 30h, micro intégré.",
      "categoryId": 1,
      "category": {
        "id": 1,
        "name": "Électronique",
        "slug": "electronique"
      },
      "price": 129.99,
      "compareAtPrice": 159.99,
      "currency": "EUR",
      "stock": 48,
      "sku": "HB-X200",
      "tags": [
        "audio",
        "wireless",
        "bestseller"
      ],
      "images": [
        "https://i.postimg.cc/rmcVkKhm/pexels-vitalyagorbachev-11137016.jpg",
        "https://placehold.co/600x400/png/ffffff/000000?text=Casque+X200+2"
      ],
      "variants": [
        {
          "id": "101-1",
          "name": "Noir",
          "price": 129.99,
          "stock": 30
        },
        {
          "id": "101-2",
          "name": "Blanc",
          "price": 129.99,
          "stock": 18
        }
      ],
      "rating": 4.6,
      "reviewsCount": 23,
      "createdAt": "2024-11-10T09:00:00Z"
    },
    {
      "id": "102",
      "title": "Machine à Espresso MiniBar",
      "compareAtPrice": 120,
      "slug": "espresso-minibar",
      "description": "Machine espresso compacte 15 bar, bac à eau 1.2L, mode économie d'énergie.",
      "categoryId": 2,
      "category": {
        "id": 2,
        "name": "Maison & Cuisine",
        "slug": "maison-cuisine"
      },
      "price": 89.5,
      "currency": "EUR",
      "stock": 12,
      "sku": "MB-ESP01",
      "tags": [
        "cuisine",
        "coffee"
      ],
      "images": [
        "https://placehold.co/600x400/png/ffffff/000000?text=Espresso+MiniBar"
      ],
      "variants": [],
      "rating": 4.1,
      "reviewsCount": 8,
      "createdAt": "2025-02-03T12:30:00Z"
    },
    {
      "id": "103",
      "title": "T-shirt Organic Cotton - Unisexe",
      "slug": "tshirt-organic-cotton",
      "description": "T-shirt 100% coton biologique, coupe standard. Disponible en plusieurs tailles.",
      "categoryId": 3,
      "category": {
        "id": 3,
        "name": "Mode",
        "slug": "mode"
      },
      "price": 19,
      "currency": "EUR",
      "stock": 210,
      "sku": "TS-ORGCOT",
      "tags": [
        "vêtement",
        "eco"
      ],
      "images": [
        "https://i.postimg.cc/zvGqy4Z9/pexels-sam2piccs-10187850.jpg"
      ],
      "variants": [
        {
          "id": "103-S",
          "name": "S",
          "price": 19,
          "stock": 40
        },
        {
          "id": "103-M",
          "name": "M",
          "price": 19,
          "stock": 80
        },
        {
          "id": "103-L",
          "name": "L",
          "price": 19,
          "stock": 60
        },
        {
          "id": "103-XL",
          "name": "XL",
          "price": 19,
          "stock": 30
        }
      ],
      "rating": 4.4,
      "reviewsCount": 52,
      "createdAt": "2024-08-21T08:00:00Z"
    },
    {
      "id": "104",
      "title": "Palette Maquillage 12 Couches",
      "slug": "palette-maquillage-12",
      "description": "Palette compacte 12 fards, fini mat et pailleté, livré avec miroir.",
      "categoryId": 4,
      "category": {
        "id": 4,
        "name": "Beauté",
        "slug": "beaute"
      },
      "price": 29.95,
      "currency": "EUR",
      "stock": 75,
      "sku": "BEA-PA12",
      "tags": [
        "makeup",
        "palette"
      ],
      "images": [
        "https://i.postimg.cc/tJ49s8Gj/pexels-bertellifotografia-12446291.jpg"
      ],
      "variants": [],
      "rating": 4.2,
      "reviewsCount": 18,
      "createdAt": "2025-01-15T10:00:00Z"
    },
    {
      "id": "105",
      "title": "Lampe LED de Lecture",
      "slug": "lampe-led-lecture",
      "description": "Lampe LED à intensité réglable, bras flexible, port USB intégré.",
      "categoryId": 2,
      "category": {
        "id": 2,
        "name": "Maison & Cuisine",
        "slug": "maison-cuisine"
      },
      "price": 24.99,
      "currency": "EUR",
      "stock": 130,
      "sku": "LM-LED01",
      "tags": [
        "éclairage",
        "bureau"
      ],
      "images": [
        "https://i.postimg.cc/hGQnRSD2/image-1.png"
      ],
      "variants": [],
      "rating": 4.5,
      "reviewsCount": 34,
      "createdAt": "2024-09-30T14:20:00Z"
    },
    {
      "id": "106",
      "title": "Chargeur Rapide USB-C 30W",
      "slug": "chargeur-usb-c-30w",
      "description": "Charge rapide 30W compatible laptops, smartphones et tablettes.",
      "categoryId": 1,
      "category": {
        "id": 1,
        "name": "Électronique",
        "slug": "electronique"
      },
      "price": 17.5,
      "currency": "EUR",
      "stock": 300,
      "sku": "CH-30C",
      "tags": [
        "chargeur",
        "usb-c"
      ],
      "images": [
        "https://i.postimg.cc/L8ZLq1Ng/pexels-melvin-buezo-1253763-2529147.jpg",
        "https://i.postimg.cc/sXhZxQzb/pexels-melvin-buezo-1253763-2529148.jpg"
      ],
      "variants": [],
      "rating": 4.7,
      "reviewsCount": 91,
      "createdAt": "2024-06-05T09:45:00Z"
    },
    {
      "id": "107",
      "title": "Sac à Dos Urbain 20L",
      "slug": "sac-a-dos-urbain-20l",
      "description": "Sac à dos résistant à l'eau, poche laptop 15\", sangle poitrine.",
      "categoryId": 3,
      "category": {
        "id": 3,
        "name": "Mode",
        "slug": "mode"
      },
      "price": 54,
      "currency": "EUR",
      "stock": 64,
      "sku": "SB-URB20",
      "tags": [
        "sac",
        "outdoor"
      ],
      "images": [
        "https://i.postimg.cc/sxg3Mbdb/pexels-storiesofdesign-14768506.jpg"
      ],
      "variants": [
        {
          "id": "107-noir",
          "name": "Noir",
          "price": 54,
          "stock": 30
        },
        {
          "id": "107-bleu",
          "name": "Bleu",
          "price": 54,
          "stock": 24
        },
        {
          "id": "107-gris",
          "name": "Gris",
          "price": 54,
          "stock": 10
        }
      ],
      "rating": 4.3,
      "reviewsCount": 27,
      "createdAt": "2024-12-01T07:10:00Z"
    },
    {
      "id": "108",
      "title": "Set de Couteaux de Cuisine (5 pcs)",
      "slug": "set-couteaux-5pcs",
      "description": "Lames en acier inoxydable, manche ergonomique, bloc en bois inclus.",
      "categoryId": 2,
      "category": {
        "id": 2,
        "name": "Maison & Cuisine",
        "slug": "maison-cuisine"
      },
      "price": 39.99,
      "currency": "EUR",
      "stock": 40,
      "sku": "CK-SET5",
      "tags": [
        "cuisine",
        "couteaux"
      ],
      "images": [
        "https://i.postimg.cc/L8ZLq1Ng/pexels-melvin-buezo-1253763-2529147.jpg"
      ],
      "variants": [],
      "rating": 4,
      "reviewsCount": 12,
      "createdAt": "2024-10-05T11:00:00Z"
    },
    {
      "id": "101",
      "title": "Casque Bluetooth X200",
      "slug": "casque-bluetooth-x200",
      "description": "Casque sans fil avec réduction active du bruit, autonomie 30h, micro intégré.",
      "categoryId": 1,
      "category": {
        "id": 1,
        "name": "Électronique",
        "slug": "electronique"
      },
      "price": 129.99,
      "compareAtPrice": 159.99,
      "currency": "EUR",
      "stock": 48,
      "sku": "HB-X200",
      "tags": [
        "audio",
        "wireless",
        "bestseller"
      ],
      "images": [
        "https://i.postimg.cc/rmcVkKhm/pexels-vitalyagorbachev-11137016.jpg",
        "https://placehold.co/600x400/png/ffffff/000000?text=Casque+X200+2"
      ],
      "variants": [
        {
          "id": "101-1",
          "name": "Noir",
          "price": 129.99,
          "stock": 30
        },
        {
          "id": "101-2",
          "name": "Blanc",
          "price": 129.99,
          "stock": 18
        }
      ],
      "rating": 4.6,
      "reviewsCount": 23,
      "createdAt": "2024-11-10T09:00:00Z"
    },
    {
      "id": "102",
      "title": "Machine à Espresso MiniBar",
      "slug": "espresso-minibar",
      "description": "Machine espresso compacte 15 bar, bac à eau 1.2L, mode économie d'énergie.",
      "categoryId": 2,
      "category": {
        "id": 2,
        "name": "Maison & Cuisine",
        "slug": "maison-cuisine"
      },
      "price": 89.5,
      "currency": "EUR",
      "stock": 12,
      "sku": "MB-ESP01",
      "tags": [
        "cuisine",
        "coffee"
      ],
      "images": [
        "https://placehold.co/600x400/png/ffffff/000000?text=Espresso+MiniBar"
      ],
      "variants": [],
      "rating": 4.1,
      "reviewsCount": 8,
      "createdAt": "2025-02-03T12:30:00Z"
    },
    {
      "id": "103",
      "title": "T-shirt Organic Cotton - Unisexe",
      "slug": "tshirt-organic-cotton",
      "description": "T-shirt 100% coton biologique, coupe standard. Disponible en plusieurs tailles.",
      "categoryId": 3,
      "category": {
        "id": 3,
        "name": "Mode",
        "slug": "mode"
      },
      "price": 19,
      "currency": "EUR",
      "stock": 210,
      "sku": "TS-ORGCOT",
      "tags": [
        "vêtement",
        "eco"
      ],
      "images": [
        "https://i.postimg.cc/zvGqy4Z9/pexels-sam2piccs-10187850.jpg"
      ],
      "variants": [
        {
          "id": "103-S",
          "name": "S",
          "price": 19,
          "stock": 40
        },
        {
          "id": "103-M",
          "name": "M",
          "price": 19,
          "stock": 80
        },
        {
          "id": "103-L",
          "name": "L",
          "price": 19,
          "stock": 60
        },
        {
          "id": "103-XL",
          "name": "XL",
          "price": 19,
          "stock": 30
        }
      ],
      "rating": 4.4,
      "reviewsCount": 52,
      "createdAt": "2024-08-21T08:00:00Z"
    },
    {
      "id": "104",
      "title": "Palette Maquillage 12 Couches",
      "slug": "palette-maquillage-12",
      "description": "Palette compacte 12 fards, fini mat et pailleté, livré avec miroir.",
      "categoryId": 4,
      "category": {
        "id": 4,
        "name": "Beauté",
        "slug": "beaute"
      },
      "price": 29.95,
      "currency": "EUR",
      "stock": 75,
      "sku": "BEA-PA12",
      "tags": [
        "makeup",
        "palette"
      ],
      "images": [
        "https://i.postimg.cc/tJ49s8Gj/pexels-bertellifotografia-12446291.jpg"
      ],
      "variants": [],
      "rating": 4.2,
      "reviewsCount": 18,
      "createdAt": "2025-01-15T10:00:00Z"
    },
    {
      "id": "105",
      "title": "Lampe LED de Lecture",
      "slug": "lampe-led-lecture",
      "description": "Lampe LED à intensité réglable, bras flexible, port USB intégré.",
      "categoryId": 2,
      "category": {
        "id": 2,
        "name": "Maison & Cuisine",
        "slug": "maison-cuisine"
      },
      "price": 24.99,
      "currency": "EUR",
      "stock": 130,
      "sku": "LM-LED01",
      "tags": [
        "éclairage",
        "bureau"
      ],
      "images": [
        "https://i.postimg.cc/hGQnRSD2/image-1.png"
      ],
      "variants": [],
      "rating": 4.5,
      "reviewsCount": 34,
      "createdAt": "2024-09-30T14:20:00Z"
    },
    {
      "id": "106",
      "title": "Chargeur Rapide USB-C 30W",
      "slug": "chargeur-usb-c-30w",
      "description": "Charge rapide 30W compatible laptops, smartphones et tablettes.",
      "categoryId": 1,
      "category": {
        "id": 1,
        "name": "Électronique",
        "slug": "electronique"
      },
      "price": 17.5,
      "currency": "EUR",
      "stock": 300,
      "sku": "CH-30C",
      "tags": [
        "chargeur",
        "usb-c"
      ],
      "images": [
        "https://i.postimg.cc/sXhZxQzb/pexels-melvin-buezo-1253763-2529148.jpg",
        "https://i.postimg.cc/sXhZxQzb/pexels-melvin-buezo-1253763-2529148.jpg"
      ],
      "variants": [],
      "rating": 4.7,
      "reviewsCount": 91,
      "createdAt": "2024-06-05T09:45:00Z"
    },
    {
      "id": "107",
      "title": "Sac à Dos Urbain 20L",
      "slug": "sac-a-dos-urbain-20l",
      "description": "Sac à dos résistant à l'eau, poche laptop 15\", sangle poitrine.",
      "categoryId": 3,
      "category": {
        "id": 3,
        "name": "Mode",
        "slug": "mode"
      },
      "price": 54,
      "currency": "EUR",
      "stock": 64,
      "sku": "SB-URB20",
      "tags": [
        "sac",
        "outdoor"
      ],
      "images": [
        "https://i.postimg.cc/sxg3Mbdb/pexels-storiesofdesign-14768506.jpg"
      ],
      "variants": [
        {
          "id": "107-noir",
          "name": "Noir",
          "price": 54,
          "stock": 30
        },
        {
          "id": "107-bleu",
          "name": "Bleu",
          "price": 54,
          "stock": 24
        },
        {
          "id": "107-gris",
          "name": "Gris",
          "price": 54,
          "stock": 10
        }
      ],
      "rating": 4.3,
      "reviewsCount": 27,
      "createdAt": "2024-12-01T07:10:00Z"
    },
    {
      "id": "108",
      "title": "Set de Couteaux de Cuisine (5 pcs)",
      "slug": "set-couteaux-5pcs",
      "description": "Lames en acier inoxydable, manche ergonomique, bloc en bois inclus.",
      "categoryId": 2,
      "category": {
        "id": 2,
        "name": "Maison & Cuisine",
        "slug": "maison-cuisine"
      },
      "price": 39.99,
      "currency": "EUR",
      "stock": 40,
      "sku": "CK-SET5",
      "tags": [
        "cuisine",
        "couteaux"
      ],
      "images": [
        "https://i.postimg.cc/L8ZLq1Ng/pexels-melvin-buezo-1253763-2529147.jpg"
      ],
      "variants": [],
      "rating": 4,
      "reviewsCount": 12,
      "createdAt": "2024-10-05T11:00:00Z"
    },
    {
      "id": "101",
      "title": "Casque Bluetooth X200",
      "slug": "casque-bluetooth-x200",
      "description": "Casque sans fil avec réduction active du bruit, autonomie 30h, micro intégré.",
      "categoryId": 1,
      "category": {
        "id": 1,
        "name": "Électronique",
        "slug": "electronique"
      },
      "price": 129.99,
      "compareAtPrice": 159.99,
      "currency": "EUR",
      "stock": 48,
      "sku": "HB-X200",
      "tags": [
        "audio",
        "wireless",
        "bestseller"
      ],
      "images": [
        "https://i.postimg.cc/rmcVkKhm/pexels-vitalyagorbachev-11137016.jpg",
        "https://placehold.co/600x400/png/ffffff/000000?text=Casque+X200+2"
      ],
      "variants": [
        {
          "id": "101-1",
          "name": "Noir",
          "price": 129.99,
          "stock": 30
        },
        {
          "id": "101-2",
          "name": "Blanc",
          "price": 129.99,
          "stock": 18
        }
      ],
      "rating": 4.6,
      "reviewsCount": 23,
      "createdAt": "2024-11-10T09:00:00Z"
    },
    {
      "id": "102",
      "title": "Machine à Espresso MiniBar",
      "slug": "espresso-minibar",
      "description": "Machine espresso compacte 15 bar, bac à eau 1.2L, mode économie d'énergie.",
      "categoryId": 2,
      "category": {
        "id": 2,
        "name": "Maison & Cuisine",
        "slug": "maison-cuisine"
      },
      "price": 89.5,
      "currency": "EUR",
      "stock": 12,
      "sku": "MB-ESP01",
      "tags": [
        "cuisine",
        "coffee"
      ],
      "images": [
        "https://placehold.co/600x400/png/ffffff/000000?text=Espresso+MiniBar"
      ],
      "variants": [],
      "rating": 4.1,
      "reviewsCount": 8,
      "createdAt": "2025-02-03T12:30:00Z"
    },
    {
      "id": "103",
      "title": "T-shirt Organic Cotton - Unisexe",
      "slug": "tshirt-organic-cotton",
      "description": "T-shirt 100% coton biologique, coupe standard. Disponible en plusieurs tailles.",
      "categoryId": 3,
      "category": {
        "id": 3,
        "name": "Mode",
        "slug": "mode"
      },
      "price": 19,
      "currency": "EUR",
      "stock": 210,
      "sku": "TS-ORGCOT",
      "tags": [
        "vêtement",
        "eco"
      ],
      "images": [
        "https://i.postimg.cc/zvGqy4Z9/pexels-sam2piccs-10187850.jpg"
      ],
      "variants": [
        {
          "id": "103-S",
          "name": "S",
          "price": 19,
          "stock": 40
        },
        {
          "id": "103-M",
          "name": "M",
          "price": 19,
          "stock": 80
        },
        {
          "id": "103-L",
          "name": "L",
          "price": 19,
          "stock": 60
        },
        {
          "id": "103-XL",
          "name": "XL",
          "price": 19,
          "stock": 30
        }
      ],
      "rating": 4.4,
      "reviewsCount": 52,
      "createdAt": "2024-08-21T08:00:00Z"
    },
    {
      "id": "104",
      "title": "Palette Maquillage 12 Couches",
      "slug": "palette-maquillage-12",
      "description": "Palette compacte 12 fards, fini mat et pailleté, livré avec miroir.",
      "categoryId": 4,
      "category": {
        "id": 4,
        "name": "Beauté",
        "slug": "beaute"
      },
      "price": 29.95,
      "currency": "EUR",
      "stock": 75,
      "sku": "BEA-PA12",
      "tags": [
        "makeup",
        "palette"
      ],
      "images": [
        "https://i.postimg.cc/tJ49s8Gj/pexels-bertellifotografia-12446291.jpg"
      ],
      "variants": [],
      "rating": 4.2,
      "reviewsCount": 18,
      "createdAt": "2025-01-15T10:00:00Z"
    },
    {
      "id": "105",
      "title": "Lampe LED de Lecture",
      "slug": "lampe-led-lecture",
      "description": "Lampe LED à intensité réglable, bras flexible, port USB intégré.",
      "categoryId": 2,
      "category": {
        "id": 2,
        "name": "Maison & Cuisine",
        "slug": "maison-cuisine"
      },
      "price": 24.99,
      "currency": "EUR",
      "stock": 130,
      "sku": "LM-LED01",
      "tags": [
        "éclairage",
        "bureau"
      ],
      "images": [
        "https://i.postimg.cc/hGQnRSD2/image-1.png"
      ],
      "variants": [],
      "rating": 4.5,
      "reviewsCount": 34,
      "createdAt": "2024-09-30T14:20:00Z"
    },
    {
      "id": "106",
      "title": "Chargeur Rapide USB-C 30W",
      "slug": "chargeur-usb-c-30w",
      "description": "Charge rapide 30W compatible laptops, smartphones et tablettes.",
      "categoryId": 1,
      "category": {
        "id": 1,
        "name": "Électronique",
        "slug": "electronique"
      },
      "price": 17.5,
      "currency": "EUR",
      "stock": 300,
      "sku": "CH-30C",
      "tags": [
        "chargeur",
        "usb-c"
      ],
      "images": [
        "https://static.nike.com/a/images/t_prod_ss/w_640,c_limit,f_auto/66f0f8b2-8d4a-4201-b334-c1fdf9ca3e5e/air-max-270-chaussure-PgbqWd.png"
      ],
      "variants": [],
      "rating": 4.7,
      "reviewsCount": 91,
      "createdAt": "2024-06-05T09:45:00Z"
    },
    {
      "id": "107",
      "title": "Sac à Dos Urbain 20L",
      "slug": "sac-a-dos-urbain-20l",
      "description": "Sac à dos résistant à l'eau, poche laptop 15\", sangle poitrine.",
      "categoryId": 3,
      "category": {
        "id": 3,
        "name": "Mode",
        "slug": "mode"
      },
      "price": 54,
      "currency": "EUR",
      "stock": 64,
      "sku": "SB-URB20",
      "tags": [
        "sac",
        "outdoor"
      ],
      "images": [
        "https://i.postimg.cc/sxg3Mbdb/pexels-storiesofdesign-14768506.jpg"
      ],
      "variants": [
        {
          "id": "107-noir",
          "name": "Noir",
          "price": 54,
          "stock": 30
        },
        {
          "id": "107-bleu",
          "name": "Bleu",
          "price": 54,
          "stock": 24
        },
        {
          "id": "107-gris",
          "name": "Gris",
          "price": 54,
          "stock": 10
        }
      ],
      "rating": 4.3,
      "reviewsCount": 27,
      "createdAt": "2024-12-01T07:10:00Z"
    },
    {
      "id": "108",
      "title": "Set de Couteaux de Cuisine (5 pcs)",
      "slug": "set-couteaux-5pcs",
      "description": "Lames en acier inoxydable, manche ergonomique, bloc en bois inclus.",
      "categoryId": 2,
      "category": {
        "id": 2,
        "name": "Maison & Cuisine",
        "slug": "maison-cuisine"
      },
      "price": 39.99,
      "currency": "EUR",
      "stock": 40,
      "sku": "CK-SET5",
      "tags": [
        "cuisine",
        "couteaux"
      ],
      "images": [
        "https://i.postimg.cc/L8ZLq1Ng/pexels-melvin-buezo-1253763-2529147.jpg"
      ],
      "variants": [],
      "rating": 4,
      "reviewsCount": 12,
      "createdAt": "2024-10-05T11:00:00Z"
    },
    {
      "id": "101",
      "title": "Casque Bluetooth X200",
      "slug": "casque-bluetooth-x200",
      "description": "Casque sans fil avec réduction active du bruit, autonomie 30h, micro intégré.",
      "categoryId": 1,
      "category": {
        "id": 1,
        "name": "Électronique",
        "slug": "electronique"
      },
      "price": 129.99,
      "compareAtPrice": 159.99,
      "currency": "EUR",
      "stock": 48,
      "sku": "HB-X200",
      "tags": [
        "audio",
        "wireless",
        "bestseller"
      ],
      "images": [
        "https://i.postimg.cc/rmcVkKhm/pexels-vitalyagorbachev-11137016.jpg",
        "https://placehold.co/600x400/png/ffffff/000000?text=Casque+X200+2"
      ],
      "variants": [
        {
          "id": "101-1",
          "name": "Noir",
          "price": 129.99,
          "stock": 30
        },
        {
          "id": "101-2",
          "name": "Blanc",
          "price": 129.99,
          "stock": 18
        }
      ],
      "rating": 4.6,
      "reviewsCount": 23,
      "createdAt": "2024-11-10T09:00:00Z"
    },
    {
      "id": "102",
      "title": "Machine à Espresso MiniBar",
      "slug": "espresso-minibar",
      "description": "Machine espresso compacte 15 bar, bac à eau 1.2L, mode économie d'énergie.",
      "categoryId": 2,
      "category": {
        "id": 2,
        "name": "Maison & Cuisine",
        "slug": "maison-cuisine"
      },
      "price": 89.5,
      "currency": "EUR",
      "stock": 12,
      "sku": "MB-ESP01",
      "tags": [
        "cuisine",
        "coffee"
      ],
      "images": [
        "https://placehold.co/600x400/png/ffffff/000000?text=Espresso+MiniBar"
      ],
      "variants": [],
      "rating": 4.1,
      "reviewsCount": 8,
      "createdAt": "2025-02-03T12:30:00Z"
    },
    {
      "id": "103",
      "title": "T-shirt Organic Cotton - Unisexe",
      "slug": "tshirt-organic-cotton",
      "description": "T-shirt 100% coton biologique, coupe standard. Disponible en plusieurs tailles.",
      "categoryId": 3,
      "category": {
        "id": 3,
        "name": "Mode",
        "slug": "mode"
      },
      "price": 19,
      "currency": "EUR",
      "stock": 210,
      "sku": "TS-ORGCOT",
      "tags": [
        "vêtement",
        "eco"
      ],
      "images": [
        "https://i.postimg.cc/zvGqy4Z9/pexels-sam2piccs-10187850.jpg"
      ],
      "variants": [
        {
          "id": "103-S",
          "name": "S",
          "price": 19,
          "stock": 40
        },
        {
          "id": "103-M",
          "name": "M",
          "price": 19,
          "stock": 80
        },
        {
          "id": "103-L",
          "name": "L",
          "price": 19,
          "stock": 60
        },
        {
          "id": "103-XL",
          "name": "XL",
          "price": 19,
          "stock": 30
        }
      ],
      "rating": 4.4,
      "reviewsCount": 52,
      "createdAt": "2024-08-21T08:00:00Z"
    },
    {
      "id": "104",
      "title": "Palette Maquillage 12 Couches",
      "slug": "palette-maquillage-12",
      "description": "Palette compacte 12 fards, fini mat et pailleté, livré avec miroir.",
      "categoryId": 4,
      "category": {
        "id": 4,
        "name": "Beauté",
        "slug": "beaute"
      },
      "price": 29.95,
      "currency": "EUR",
      "stock": 75,
      "sku": "BEA-PA12",
      "tags": [
        "makeup",
        "palette"
      ],
      "images": [
        "https://i.postimg.cc/tJ49s8Gj/pexels-bertellifotografia-12446291.jpg"
      ],
      "variants": [],
      "rating": 4.2,
      "reviewsCount": 18,
      "createdAt": "2025-01-15T10:00:00Z"
    },
    {
      "id": "105",
      "title": "Lampe LED de Lecture",
      "slug": "lampe-led-lecture",
      "description": "Lampe LED à intensité réglable, bras flexible, port USB intégré.",
      "categoryId": 2,
      "category": {
        "id": 2,
        "name": "Maison & Cuisine",
        "slug": "maison-cuisine"
      },
      "price": 24.99,
      "currency": "EUR",
      "stock": 130,
      "sku": "LM-LED01",
      "tags": [
        "éclairage",
        "bureau"
      ],
      "images": [
        "https://i.postimg.cc/hGQnRSD2/image-1.png"
      ],
      "variants": [],
      "rating": 4.5,
      "reviewsCount": 34,
      "createdAt": "2024-09-30T14:20:00Z"
    },
    {
      "id": "106",
      "title": "Chargeur Rapide USB-C 30W",
      "slug": "chargeur-usb-c-30w",
      "description": "Charge rapide 30W compatible laptops, smartphones et tablettes.",
      "categoryId": 1,
      "category": {
        "id": 1,
        "name": "Électronique",
        "slug": "electronique"
      },
      "price": 17.5,
      "currency": "EUR",
      "stock": 300,
      "sku": "CH-30C",
      "tags": [
        "chargeur",
        "usb-c"
      ],
      "images": [
        "https://static.nike.com/a/images/t_prod_ss/w_640,c_limit,f_auto/66f0f8b2-8d4a-4201-b334-c1fdf9ca3e5e/air-max-270-chaussure-PgbqWd.png"
      ],
      "variants": [],
      "rating": 4.7,
      "reviewsCount": 91,
      "createdAt": "2024-06-05T09:45:00Z"
    },
    {
      "id": "107",
      "title": "Sac à Dos Urbain 20L",
      "slug": "sac-a-dos-urbain-20l",
      "description": "Sac à dos résistant à l'eau, poche laptop 15\", sangle poitrine.",
      "categoryId": 3,
      "category": {
        "id": 3,
        "name": "Mode",
        "slug": "mode"
      },
      "price": 54,
      "currency": "EUR",
      "stock": 64,
      "sku": "SB-URB20",
      "tags": [
        "sac",
        "outdoor"
      ],
      "images": [
        "https://i.postimg.cc/sxg3Mbdb/pexels-storiesofdesign-14768506.jpg"
      ],
      "variants": [
        {
          "id": "107-noir",
          "name": "Noir",
          "price": 54,
          "stock": 30
        },
        {
          "id": "107-bleu",
          "name": "Bleu",
          "price": 54,
          "stock": 24
        },
        {
          "id": "107-gris",
          "name": "Gris",
          "price": 54,
          "stock": 10
        }
      ],
      "rating": 4.3,
      "reviewsCount": 27,
      "createdAt": "2024-12-01T07:10:00Z"
    },
    {
      "id": "108",
      "title": "Set de Couteaux de Cuisine (5 pcs)",
      "slug": "set-couteaux-5pcs",
      "description": "Lames en acier inoxydable, manche ergonomique, bloc en bois inclus.",
      "categoryId": 2,
      "category": {
        "id": 2,
        "name": "Maison & Cuisine",
        "slug": "maison-cuisine"
      },
      "price": 39.99,
      "currency": "EUR",
      "stock": 40,
      "sku": "CK-SET5",
      "tags": [
        "cuisine",
        "couteaux"
      ],
      "images": [
        "https://i.postimg.cc/L8ZLq1Ng/pexels-melvin-buezo-1253763-2529147.jpg"
      ],
      "variants": [],
      "rating": 4,
      "reviewsCount": 12,
      "createdAt": "2024-10-05T11:00:00Z"
    },
    {
      "id": "101",
      "title": "Casque Bluetooth X200",
      "slug": "casque-bluetooth-x200",
      "description": "Casque sans fil avec réduction active du bruit, autonomie 30h, micro intégré.",
      "categoryId": 1,
      "category": {
        "id": 1,
        "name": "Électronique",
        "slug": "electronique"
      },
      "price": 129.99,
      "compareAtPrice": 159.99,
      "currency": "EUR",
      "stock": 48,
      "sku": "HB-X200",
      "tags": [
        "audio",
        "wireless",
        "bestseller"
      ],
      "images": [
        "https://i.postimg.cc/rmcVkKhm/pexels-vitalyagorbachev-11137016.jpg",
        "https://placehold.co/600x400/png/ffffff/000000?text=Casque+X200+2"
      ],
      "variants": [
        {
          "id": "101-1",
          "name": "Noir",
          "price": 129.99,
          "stock": 30
        },
        {
          "id": "101-2",
          "name": "Blanc",
          "price": 129.99,
          "stock": 18
        }
      ],
      "rating": 4.6,
      "reviewsCount": 23,
      "createdAt": "2024-11-10T09:00:00Z"
    },
    {
      "id": "102",
      "title": "Machine à Espresso MiniBar",
      "slug": "espresso-minibar",
      "description": "Machine espresso compacte 15 bar, bac à eau 1.2L, mode économie d'énergie.",
      "categoryId": 2,
      "category": {
        "id": 2,
        "name": "Maison & Cuisine",
        "slug": "maison-cuisine"
      },
      "price": 89.5,
      "currency": "EUR",
      "stock": 12,
      "sku": "MB-ESP01",
      "tags": [
        "cuisine",
        "coffee"
      ],
      "images": [
        "https://placehold.co/600x400/png/ffffff/000000?text=Espresso+MiniBar"
      ],
      "variants": [],
      "rating": 4.1,
      "reviewsCount": 8,
      "createdAt": "2025-02-03T12:30:00Z"
    },
    {
      "id": "103",
      "title": "T-shirt Organic Cotton - Unisexe",
      "slug": "tshirt-organic-cotton",
      "description": "T-shirt 100% coton biologique, coupe standard. Disponible en plusieurs tailles.",
      "categoryId": 3,
      "category": {
        "id": 3,
        "name": "Mode",
        "slug": "mode"
      },
      "price": 19,
      "currency": "EUR",
      "stock": 210,
      "sku": "TS-ORGCOT",
      "tags": [
        "vêtement",
        "eco"
      ],
      "images": [
        "https://i.postimg.cc/zvGqy4Z9/pexels-sam2piccs-10187850.jpg"
      ],
      "variants": [
        {
          "id": "103-S",
          "name": "S",
          "price": 19,
          "stock": 40
        },
        {
          "id": "103-M",
          "name": "M",
          "price": 19,
          "stock": 80
        },
        {
          "id": "103-L",
          "name": "L",
          "price": 19,
          "stock": 60
        },
        {
          "id": "103-XL",
          "name": "XL",
          "price": 19,
          "stock": 30
        }
      ],
      "rating": 4.4,
      "reviewsCount": 52,
      "createdAt": "2024-08-21T08:00:00Z"
    },
    {
      "id": "104",
      "title": "Palette Maquillage 12 Couches",
      "slug": "palette-maquillage-12",
      "description": "Palette compacte 12 fards, fini mat et pailleté, livré avec miroir.",
      "categoryId": 4,
      "category": {
        "id": 4,
        "name": "Beauté",
        "slug": "beaute"
      },
      "price": 29.95,
      "currency": "EUR",
      "stock": 75,
      "sku": "BEA-PA12",
      "tags": [
        "makeup",
        "palette"
      ],
      "images": [
        "https://i.postimg.cc/tJ49s8Gj/pexels-bertellifotografia-12446291.jpg"
      ],
      "variants": [],
      "rating": 4.2,
      "reviewsCount": 18,
      "createdAt": "2025-01-15T10:00:00Z"
    },
    {
      "id": "105",
      "title": "Lampe LED de Lecture",
      "slug": "lampe-led-lecture",
      "description": "Lampe LED à intensité réglable, bras flexible, port USB intégré.",
      "categoryId": 2,
      "category": {
        "id": 2,
        "name": "Maison & Cuisine",
        "slug": "maison-cuisine"
      },
      "price": 24.99,
      "currency": "EUR",
      "stock": 130,
      "sku": "LM-LED01",
      "tags": [
        "éclairage",
        "bureau"
      ],
      "images": [
        "https://i.postimg.cc/hGQnRSD2/image-1.png"
      ],
      "variants": [],
      "rating": 4.5,
      "reviewsCount": 34,
      "createdAt": "2024-09-30T14:20:00Z"
    },
    {
      "id": "101",
      "title": "Casque Bluetooth X200",
      "slug": "casque-bluetooth-x200",
      "description": "Casque sans fil avec réduction active du bruit, autonomie 30h, micro intégré.",
      "categoryId": 1,
      "category": {
        "id": 1,
        "name": "Électronique",
        "slug": "electronique"
      },
      "price": 129.99,
      "compareAtPrice": 159.99,
      "currency": "EUR",
      "stock": 48,
      "sku": "HB-X200",
      "tags": [
        "audio",
        "wireless",
        "bestseller"
      ],
      "images": [
        "https://i.postimg.cc/rmcVkKhm/pexels-vitalyagorbachev-11137016.jpg",
        "https://placehold.co/600x400/png/ffffff/000000?text=Casque+X200+2"
      ],
      "variants": [
        {
          "id": "101-1",
          "name": "Noir",
          "price": 129.99,
          "stock": 30
        },
        {
          "id": "101-2",
          "name": "Blanc",
          "price": 129.99,
          "stock": 18
        }
      ],
      "rating": 4.6,
      "reviewsCount": 23,
      "createdAt": "2024-11-10T09:00:00Z"
    },
    {
      "id": "102",
      "title": "Machine à Espresso MiniBar",
      "slug": "espresso-minibar",
      "description": "Machine espresso compacte 15 bar, bac à eau 1.2L, mode économie d'énergie.",
      "categoryId": 2,
      "category": {
        "id": 2,
        "name": "Maison & Cuisine",
        "slug": "maison-cuisine"
      },
      "price": 89.5,
      "currency": "EUR",
      "stock": 12,
      "sku": "MB-ESP01",
      "tags": [
        "cuisine",
        "coffee"
      ],
      "images": [
        "https://placehold.co/600x400/png/ffffff/000000?text=Espresso+MiniBar"
      ],
      "variants": [],
      "rating": 4.1,
      "reviewsCount": 8,
      "createdAt": "2025-02-03T12:30:00Z"
    },
    {
      "id": "103",
      "title": "T-shirt Organic Cotton - Unisexe",
      "slug": "tshirt-organic-cotton",
      "description": "T-shirt 100% coton biologique, coupe standard. Disponible en plusieurs tailles.",
      "categoryId": 3,
      "category": {
        "id": 3,
        "name": "Mode",
        "slug": "mode"
      },
      "price": 19,
      "currency": "EUR",
      "stock": 210,
      "sku": "TS-ORGCOT",
      "tags": [
        "vêtement",
        "eco"
      ],
      "images": [
        "https://i.postimg.cc/zvGqy4Z9/pexels-sam2piccs-10187850.jpg"
      ],
      "variants": [
        {
          "id": "103-S",
          "name": "S",
          "price": 19,
          "stock": 40
        },
        {
          "id": "103-M",
          "name": "M",
          "price": 19,
          "stock": 80
        },
        {
          "id": "103-L",
          "name": "L",
          "price": 19,
          "stock": 60
        },
        {
          "id": "103-XL",
          "name": "XL",
          "price": 19,
          "stock": 30
        }
      ],
      "rating": 4.4,
      "reviewsCount": 52,
      "createdAt": "2024-08-21T08:00:00Z"
    },
    {
      "id": "104",
      "title": "Palette Maquillage 12 Couches",
      "slug": "palette-maquillage-12",
      "description": "Palette compacte 12 fards, fini mat et pailleté, livré avec miroir.",
      "categoryId": 4,
      "category": {
        "id": 4,
        "name": "Beauté",
        "slug": "beaute"
      },
      "price": 29.95,
      "currency": "EUR",
      "stock": 75,
      "sku": "BEA-PA12",
      "tags": [
        "makeup",
        "palette"
      ],
      "images": [
        "https://i.postimg.cc/tJ49s8Gj/pexels-bertellifotografia-12446291.jpg"
      ],
      "variants": [],
      "rating": 4.2,
      "reviewsCount": 18,
      "createdAt": "2025-01-15T10:00:00Z"
    },
    {
      "id": "105",
      "title": "Lampe LED de Lecture",
      "slug": "lampe-led-lecture",
      "description": "Lampe LED à intensité réglable, bras flexible, port USB intégré.",
      "categoryId": 2,
      "category": {
        "id": 2,
        "name": "Maison & Cuisine",
        "slug": "maison-cuisine"
      },
      "price": 24.99,
      "currency": "EUR",
      "stock": 130,
      "sku": "LM-LED01",
      "tags": [
        "éclairage",
        "bureau"
      ],
      "images": [
        "https://i.postimg.cc/hGQnRSD2/image-1.png"
      ],
      "variants": [],
      "rating": 4.5,
      "reviewsCount": 34,
      "createdAt": "2024-09-30T14:20:00Z"
    },
    {
      "id": "106",
      "title": "Chargeur Rapide USB-C 30W",
      "slug": "chargeur-usb-c-30w",
      "description": "Charge rapide 30W compatible laptops, smartphones et tablettes.",
      "categoryId": 1,
      "category": {
        "id": 1,
        "name": "Électronique",
        "slug": "electronique"
      },
      "price": 17.5,
      "currency": "EUR",
      "stock": 300,
      "sku": "CH-30C",
      "tags": [
        "chargeur",
        "usb-c"
      ],
      "images": [
        "https://static.nike.com/a/images/t_prod_ss/w_640,c_limit,f_auto/66f0f8b2-8d4a-4201-b334-c1fdf9ca3e5e/air-max-270-chaussure-PgbqWd.png"
      ],
      "variants": [],
      "rating": 4.7,
      "reviewsCount": 91,
      "createdAt": "2024-06-05T09:45:00Z"
    },
    {
      "id": "107",
      "title": "Sac à Dos Urbain 20L",
      "slug": "sac-a-dos-urbain-20l",
      "description": "Sac à dos résistant à l'eau, poche laptop 15\", sangle poitrine.",
      "categoryId": 3,
      "category": {
        "id": 3,
        "name": "Mode",
        "slug": "mode"
      },
      "price": 54,
      "currency": "EUR",
      "stock": 64,
      "sku": "SB-URB20",
      "tags": [
        "sac",
        "outdoor"
      ],
      "images": [
        "https://i.postimg.cc/sxg3Mbdb/pexels-storiesofdesign-14768506.jpg"
      ],
      "variants": [
        {
          "id": "107-noir",
          "name": "Noir",
          "price": 54,
          "stock": 30
        },
        {
          "id": "107-bleu",
          "name": "Bleu",
          "price": 54,
          "stock": 24
        },
        {
          "id": "107-gris",
          "name": "Gris",
          "price": 54,
          "stock": 10
        }
      ],
      "rating": 4.3,
      "reviewsCount": 27,
      "createdAt": "2024-12-01T07:10:00Z"
    },
    {
      "id": "108",
      "title": "Set de Couteaux de Cuisine (5 pcs)",
      "slug": "set-couteaux-5pcs",
      "description": "Lames en acier inoxydable, manche ergonomique, bloc en bois inclus.",
      "categoryId": 2,
      "category": {
        "id": 2,
        "name": "Maison & Cuisine",
        "slug": "maison-cuisine"
      },
      "price": 39.99,
      "currency": "EUR",
      "stock": 40,
      "sku": "CK-SET5",
      "tags": [
        "cuisine",
        "couteaux"
      ],
      "images": [
        "https://i.postimg.cc/L8ZLq1Ng/pexels-melvin-buezo-1253763-2529147.jpg"
      ],
      "variants": [],
      "rating": 4,
      "reviewsCount": 12,
      "createdAt": "2024-10-05T11:00:00Z"
    },
    {
      "id": "101",
      "title": "Casque Bluetooth X200",
      "slug": "casque-bluetooth-x200",
      "description": "Casque sans fil avec réduction active du bruit, autonomie 30h, micro intégré.",
      "categoryId": 1,
      "category": {
        "id": 1,
        "name": "Électronique",
        "slug": "electronique"
      },
      "price": 129.99,
      "compareAtPrice": 159.99,
      "currency": "EUR",
      "stock": 48,
      "sku": "HB-X200",
      "tags": [
        "audio",
        "wireless",
        "bestseller"
      ],
      "images": [
        "https://i.postimg.cc/rmcVkKhm/pexels-vitalyagorbachev-11137016.jpg",
        "https://placehold.co/600x400/png/ffffff/000000?text=Casque+X200+2"
      ],
      "variants": [
        {
          "id": "101-1",
          "name": "Noir",
          "price": 129.99,
          "stock": 30
        },
        {
          "id": "101-2",
          "name": "Blanc",
          "price": 129.99,
          "stock": 18
        }
      ],
      "rating": 4.6,
      "reviewsCount": 23,
      "createdAt": "2024-11-10T09:00:00Z"
    },
    {
      "id": "102",
      "title": "Machine à Espresso MiniBar",
      "slug": "espresso-minibar",
      "description": "Machine espresso compacte 15 bar, bac à eau 1.2L, mode économie d'énergie.",
      "categoryId": 2,
      "category": {
        "id": 2,
        "name": "Maison & Cuisine",
        "slug": "maison-cuisine"
      },
      "price": 89.5,
      "currency": "EUR",
      "stock": 12,
      "sku": "MB-ESP01",
      "tags": [
        "cuisine",
        "coffee"
      ],
      "images": [
        "https://placehold.co/600x400/png/ffffff/000000?text=Espresso+MiniBar"
      ],
      "variants": [],
      "rating": 4.1,
      "reviewsCount": 8,
      "createdAt": "2025-02-03T12:30:00Z"
    },
    {
      "id": "103",
      "title": "T-shirt Organic Cotton - Unisexe",
      "slug": "tshirt-organic-cotton",
      "description": "T-shirt 100% coton biologique, coupe standard. Disponible en plusieurs tailles.",
      "categoryId": 3,
      "category": {
        "id": 3,
        "name": "Mode",
        "slug": "mode"
      },
      "price": 19,
      "currency": "EUR",
      "stock": 210,
      "sku": "TS-ORGCOT",
      "tags": [
        "vêtement",
        "eco"
      ],
      "images": [
        "https://i.postimg.cc/zvGqy4Z9/pexels-sam2piccs-10187850.jpg"
      ],
      "variants": [
        {
          "id": "103-S",
          "name": "S",
          "price": 19,
          "stock": 40
        },
        {
          "id": "103-M",
          "name": "M",
          "price": 19,
          "stock": 80
        },
        {
          "id": "103-L",
          "name": "L",
          "price": 19,
          "stock": 60
        },
        {
          "id": "103-XL",
          "name": "XL",
          "price": 19,
          "stock": 30
        }
      ],
      "rating": 4.4,
      "reviewsCount": 52,
      "createdAt": "2024-08-21T08:00:00Z"
    },
    {
      "id": "104",
      "title": "Palette Maquillage 12 Couches",
      "slug": "palette-maquillage-12",
      "description": "Palette compacte 12 fards, fini mat et pailleté, livré avec miroir.",
      "categoryId": 4,
      "category": {
        "id": 4,
        "name": "Beauté",
        "slug": "beaute"
      },
      "price": 29.95,
      "currency": "EUR",
      "stock": 75,
      "sku": "BEA-PA12",
      "tags": [
        "makeup",
        "palette"
      ],
      "images": [
        "https://i.postimg.cc/tJ49s8Gj/pexels-bertellifotografia-12446291.jpg"
      ],
      "variants": [],
      "rating": 4.2,
      "reviewsCount": 18,
      "createdAt": "2025-01-15T10:00:00Z"
    },
    {
      "id": "105",
      "title": "Lampe LED de Lecture",
      "slug": "lampe-led-lecture",
      "description": "Lampe LED à intensité réglable, bras flexible, port USB intégré.",
      "categoryId": 2,
      "category": {
        "id": 2,
        "name": "Maison & Cuisine",
        "slug": "maison-cuisine"
      },
      "price": 24.99,
      "currency": "EUR",
      "stock": 130,
      "sku": "LM-LED01",
      "tags": [
        "éclairage",
        "bureau"
      ],
      "images": [
        "https://i.postimg.cc/hGQnRSD2/image-1.png"
      ],
      "variants": [],
      "rating": 4.5,
      "reviewsCount": 34,
      "createdAt": "2024-09-30T14:20:00Z"
    },
    {
      "id": "106",
      "title": "Chargeur Rapide USB-C 30W",
      "slug": "chargeur-usb-c-30w",
      "description": "Charge rapide 30W compatible laptops, smartphones et tablettes.",
      "categoryId": 1,
      "category": {
        "id": 1,
        "name": "Électronique",
        "slug": "electronique"
      },
      "price": 17.5,
      "currency": "EUR",
      "stock": 300,
      "sku": "CH-30C",
      "tags": [
        "chargeur",
        "usb-c"
      ],
      "images": [
        "https://static.nike.com/a/images/t_prod_ss/w_640,c_limit,f_auto/66f0f8b2-8d4a-4201-b334-c1fdf9ca3e5e/air-max-270-chaussure-PgbqWd.png"
      ],
      "variants": [],
      "rating": 4.7,
      "reviewsCount": 91,
      "createdAt": "2024-06-05T09:45:00Z"
    },
    {
      "id": "107",
      "title": "Sac à Dos Urbain 20L",
      "slug": "sac-a-dos-urbain-20l",
      "description": "Sac à dos résistant à l'eau, poche laptop 15\", sangle poitrine.",
      "categoryId": 3,
      "category": {
        "id": 3,
        "name": "Mode",
        "slug": "mode"
      },
      "price": 54,
      "currency": "EUR",
      "stock": 64,
      "sku": "SB-URB20",
      "tags": [
        "sac",
        "outdoor"
      ],
      "images": [
        "https://i.postimg.cc/sxg3Mbdb/pexels-storiesofdesign-14768506.jpg"
      ],
      "variants": [
        {
          "id": "107-noir",
          "name": "Noir",
          "price": 54,
          "stock": 30
        },
        {
          "id": "107-bleu",
          "name": "Bleu",
          "price": 54,
          "stock": 24
        },
        {
          "id": "107-gris",
          "name": "Gris",
          "price": 54,
          "stock": 10
        }
      ],
      "rating": 4.3,
      "reviewsCount": 27,
      "createdAt": "2024-12-01T07:10:00Z"
    },
    {
      "id": "108",
      "title": "Set de Couteaux de Cuisine (5 pcs)",
      "slug": "set-couteaux-5pcs",
      "description": "Lames en acier inoxydable, manche ergonomique, bloc en bois inclus.",
      "categoryId": 2,
      "category": {
        "id": 2,
        "name": "Maison & Cuisine",
        "slug": "maison-cuisine"
      },
      "price": 39.99,
      "currency": "EUR",
      "stock": 40,
      "sku": "CK-SET5",
      "tags": [
        "cuisine",
        "couteaux"
      ],
      "images": [
        "https://i.postimg.cc/L8ZLq1Ng/pexels-melvin-buezo-1253763-2529147.jpg"
      ],
      "variants": [],
      "rating": 4,
      "reviewsCount": 12,
      "createdAt": "2024-10-05T11:00:00Z"
    },
    {
      "id": "101",
      "title": "Casque Bluetooth X200",
      "slug": "casque-bluetooth-x200",
      "description": "Casque sans fil avec réduction active du bruit, autonomie 30h, micro intégré.",
      "categoryId": 1,
      "category": {
        "id": 1,
        "name": "Électronique",
        "slug": "electronique"
      },
      "price": 129.99,
      "compareAtPrice": 159.99,
      "currency": "EUR",
      "stock": 48,
      "sku": "HB-X200",
      "tags": [
        "audio",
        "wireless",
        "bestseller"
      ],
      "images": [
        "https://i.postimg.cc/rmcVkKhm/pexels-vitalyagorbachev-11137016.jpg",
        "https://placehold.co/600x400/png/ffffff/000000?text=Casque+X200+2"
      ],
      "variants": [
        {
          "id": "101-1",
          "name": "Noir",
          "price": 129.99,
          "stock": 30
        },
        {
          "id": "101-2",
          "name": "Blanc",
          "price": 129.99,
          "stock": 18
        }
      ],
      "rating": 4.6,
      "reviewsCount": 23,
      "createdAt": "2024-11-10T09:00:00Z"
    },
    {
      "id": "102",
      "title": "Machine à Espresso MiniBar",
      "slug": "espresso-minibar",
      "description": "Machine espresso compacte 15 bar, bac à eau 1.2L, mode économie d'énergie.",
      "categoryId": 2,
      "category": {
        "id": 2,
        "name": "Maison & Cuisine",
        "slug": "maison-cuisine"
      },
      "price": 89.5,
      "currency": "EUR",
      "stock": 12,
      "sku": "MB-ESP01",
      "tags": [
        "cuisine",
        "coffee"
      ],
      "images": [
        "https://placehold.co/600x400/png/ffffff/000000?text=Espresso+MiniBar"
      ],
      "variants": [],
      "rating": 4.1,
      "reviewsCount": 8,
      "createdAt": "2025-02-03T12:30:00Z"
    },
    {
      "id": "103",
      "title": "T-shirt Organic Cotton - Unisexe",
      "slug": "tshirt-organic-cotton",
      "description": "T-shirt 100% coton biologique, coupe standard. Disponible en plusieurs tailles.",
      "categoryId": 3,
      "category": {
        "id": 3,
        "name": "Mode",
        "slug": "mode"
      },
      "price": 19,
      "currency": "EUR",
      "stock": 210,
      "sku": "TS-ORGCOT",
      "tags": [
        "vêtement",
        "eco"
      ],
      "images": [
        "https://i.postimg.cc/zvGqy4Z9/pexels-sam2piccs-10187850.jpg"
      ],
      "variants": [
        {
          "id": "103-S",
          "name": "S",
          "price": 19,
          "stock": 40
        },
        {
          "id": "103-M",
          "name": "M",
          "price": 19,
          "stock": 80
        },
        {
          "id": "103-L",
          "name": "L",
          "price": 19,
          "stock": 60
        },
        {
          "id": "103-XL",
          "name": "XL",
          "price": 19,
          "stock": 30
        }
      ],
      "rating": 4.4,
      "reviewsCount": 52,
      "createdAt": "2024-08-21T08:00:00Z"
    },
    {
      "id": "104",
      "title": "Palette Maquillage 12 Couches",
      "slug": "palette-maquillage-12",
      "description": "Palette compacte 12 fards, fini mat et pailleté, livré avec miroir.",
      "categoryId": 4,
      "category": {
        "id": 4,
        "name": "Beauté",
        "slug": "beaute"
      },
      "price": 29.95,
      "currency": "EUR",
      "stock": 75,
      "sku": "BEA-PA12",
      "tags": [
        "makeup",
        "palette"
      ],
      "images": [
        "https://i.postimg.cc/tJ49s8Gj/pexels-bertellifotografia-12446291.jpg"
      ],
      "variants": [],
      "rating": 4.2,
      "reviewsCount": 18,
      "createdAt": "2025-01-15T10:00:00Z"
    },
    {
      "id": "105",
      "title": "Lampe LED de Lecture",
      "slug": "lampe-led-lecture",
      "description": "Lampe LED à intensité réglable, bras flexible, port USB intégré.",
      "categoryId": 2,
      "category": {
        "id": 2,
        "name": "Maison & Cuisine",
        "slug": "maison-cuisine"
      },
      "price": 24.99,
      "currency": "EUR",
      "stock": 130,
      "sku": "LM-LED01",
      "tags": [
        "éclairage",
        "bureau"
      ],
      "images": [
        "https://i.postimg.cc/hGQnRSD2/image-1.png"
      ],
      "variants": [],
      "rating": 4.5,
      "reviewsCount": 34,
      "createdAt": "2024-09-30T14:20:00Z"
    },
    {
      "id": "106",
      "title": "Chargeur Rapide USB-C 30W",
      "slug": "chargeur-usb-c-30w",
      "description": "Charge rapide 30W compatible laptops, smartphones et tablettes.",
      "categoryId": 1,
      "category": {
        "id": 1,
        "name": "Électronique",
        "slug": "electronique"
      },
      "price": 17.5,
      "currency": "EUR",
      "stock": 300,
      "sku": "CH-30C",
      "tags": [
        "chargeur",
        "usb-c"
      ],
      "images": [
        "https://static.nike.com/a/images/t_prod_ss/w_640,c_limit,f_auto/66f0f8b2-8d4a-4201-b334-c1fdf9ca3e5e/air-max-270-chaussure-PgbqWd.png"
      ],
      "variants": [],
      "rating": 4.7,
      "reviewsCount": 91,
      "createdAt": "2024-06-05T09:45:00Z"
    },
    {
      "id": "107",
      "title": "Sac à Dos Urbain 20L",
      "slug": "sac-a-dos-urbain-20l",
      "description": "Sac à dos résistant à l'eau, poche laptop 15\", sangle poitrine.",
      "categoryId": 3,
      "category": {
        "id": 3,
        "name": "Mode",
        "slug": "mode"
      },
      "price": 54,
      "currency": "EUR",
      "stock": 64,
      "sku": "SB-URB20",
      "tags": [
        "sac",
        "outdoor"
      ],
      "images": [
        "https://i.postimg.cc/sxg3Mbdb/pexels-storiesofdesign-14768506.jpg"
      ],
      "variants": [
        {
          "id": "107-noir",
          "name": "Noir",
          "price": 54,
          "stock": 30
        },
        {
          "id": "107-bleu",
          "name": "Bleu",
          "price": 54,
          "stock": 24
        },
        {
          "id": "107-gris",
          "name": "Gris",
          "price": 54,
          "stock": 10
        }
      ],
      "rating": 4.3,
      "reviewsCount": 27,
      "createdAt": "2024-12-01T07:10:00Z"
    },
    {
      "id": "108",
      "title": "Set de Couteaux de Cuisine (5 pcs)",
      "slug": "set-couteaux-5pcs",
      "description": "Lames en acier inoxydable, manche ergonomique, bloc en bois inclus.",
      "categoryId": 2,
      "category": {
        "id": 2,
        "name": "Maison & Cuisine",
        "slug": "maison-cuisine"
      },
      "price": 39.99,
      "currency": "EUR",
      "stock": 40,
      "sku": "CK-SET5",
      "tags": [
        "cuisine",
        "couteaux"
      ],
      "images": [
        "https://i.postimg.cc/L8ZLq1Ng/pexels-melvin-buezo-1253763-2529147.jpg"
      ],
      "variants": [],
      "rating": 4,
      "reviewsCount": 12,
      "createdAt": "2024-10-05T11:00:00Z"
    },
    {
      "id": "101",
      "title": "Casque Bluetooth X200",
      "slug": "casque-bluetooth-x200",
      "description": "Casque sans fil avec réduction active du bruit, autonomie 30h, micro intégré.",
      "categoryId": 1,
      "category": {
        "id": 1,
        "name": "Électronique",
        "slug": "electronique"
      },
      "price": 129.99,
      "compareAtPrice": 159.99,
      "currency": "EUR",
      "stock": 48,
      "sku": "HB-X200",
      "tags": [
        "audio",
        "wireless",
        "bestseller"
      ],
      "images": [
        "https://i.postimg.cc/rmcVkKhm/pexels-vitalyagorbachev-11137016.jpg",
        "https://placehold.co/600x400/png/ffffff/000000?text=Casque+X200+2"
      ],
      "variants": [
        {
          "id": "101-1",
          "name": "Noir",
          "price": 129.99,
          "stock": 30
        },
        {
          "id": "101-2",
          "name": "Blanc",
          "price": 129.99,
          "stock": 18
        }
      ],
      "rating": 4.6,
      "reviewsCount": 23,
      "createdAt": "2024-11-10T09:00:00Z"
    },
    {
      "id": "102",
      "title": "Machine à Espresso MiniBar",
      "slug": "espresso-minibar",
      "description": "Machine espresso compacte 15 bar, bac à eau 1.2L, mode économie d'énergie.",
      "categoryId": 2,
      "category": {
        "id": 2,
        "name": "Maison & Cuisine",
        "slug": "maison-cuisine"
      },
      "price": 89.5,
      "currency": "EUR",
      "stock": 12,
      "sku": "MB-ESP01",
      "tags": [
        "cuisine",
        "coffee"
      ],
      "images": [
        "https://placehold.co/600x400/png/ffffff/000000?text=Espresso+MiniBar"
      ],
      "variants": [],
      "rating": 4.1,
      "reviewsCount": 8,
      "createdAt": "2025-02-03T12:30:00Z"
    },
    {
      "id": "103",
      "title": "T-shirt Organic Cotton - Unisexe",
      "slug": "tshirt-organic-cotton",
      "description": "T-shirt 100% coton biologique, coupe standard. Disponible en plusieurs tailles.",
      "categoryId": 3,
      "category": {
        "id": 3,
        "name": "Mode",
        "slug": "mode"
      },
      "price": 19,
      "currency": "EUR",
      "stock": 210,
      "sku": "TS-ORGCOT",
      "tags": [
        "vêtement",
        "eco"
      ],
      "images": [
        "https://i.postimg.cc/zvGqy4Z9/pexels-sam2piccs-10187850.jpg"
      ],
      "variants": [
        {
          "id": "103-S",
          "name": "S",
          "price": 19,
          "stock": 40
        },
        {
          "id": "103-M",
          "name": "M",
          "price": 19,
          "stock": 80
        },
        {
          "id": "103-L",
          "name": "L",
          "price": 19,
          "stock": 60
        },
        {
          "id": "103-XL",
          "name": "XL",
          "price": 19,
          "stock": 30
        }
      ],
      "rating": 4.4,
      "reviewsCount": 52,
      "createdAt": "2024-08-21T08:00:00Z"
    },
    {
      "id": "104",
      "title": "Palette Maquillage 12 Couches",
      "slug": "palette-maquillage-12",
      "description": "Palette compacte 12 fards, fini mat et pailleté, livré avec miroir.",
      "categoryId": 4,
      "category": {
        "id": 4,
        "name": "Beauté",
        "slug": "beaute"
      },
      "price": 29.95,
      "currency": "EUR",
      "stock": 75,
      "sku": "BEA-PA12",
      "tags": [
        "makeup",
        "palette"
      ],
      "images": [
        "https://i.postimg.cc/tJ49s8Gj/pexels-bertellifotografia-12446291.jpg"
      ],
      "variants": [],
      "rating": 4.2,
      "reviewsCount": 18,
      "createdAt": "2025-01-15T10:00:00Z"
    },
    {
      "id": "105",
      "title": "Lampe LED de Lecture",
      "slug": "lampe-led-lecture",
      "description": "Lampe LED à intensité réglable, bras flexible, port USB intégré.",
      "categoryId": 2,
      "category": {
        "id": 2,
        "name": "Maison & Cuisine",
        "slug": "maison-cuisine"
      },
      "price": 24.99,
      "currency": "EUR",
      "stock": 130,
      "sku": "LM-LED01",
      "tags": [
        "éclairage",
        "bureau"
      ],
      "images": [
        "https://i.postimg.cc/hGQnRSD2/image-1.png"
      ],
      "variants": [],
      "rating": 4.5,
      "reviewsCount": 34,
      "createdAt": "2024-09-30T14:20:00Z"
    },
    {
      "id": "106",
      "title": "Chargeur Rapide USB-C 30W",
      "slug": "chargeur-usb-c-30w",
      "description": "Charge rapide 30W compatible laptops, smartphones et tablettes.",
      "categoryId": 1,
      "category": {
        "id": 1,
        "name": "Électronique",
        "slug": "electronique"
      },
      "price": 17.5,
      "currency": "EUR",
      "stock": 300,
      "sku": "CH-30C",
      "tags": [
        "chargeur",
        "usb-c"
      ],
      "images": [
        "https://static.nike.com/a/images/t_prod_ss/w_640,c_limit,f_auto/66f0f8b2-8d4a-4201-b334-c1fdf9ca3e5e/air-max-270-chaussure-PgbqWd.png"
      ],
      "variants": [],
      "rating": 4.7,
      "reviewsCount": 91,
      "createdAt": "2024-06-05T09:45:00Z"
    },
    {
      "id": "107",
      "title": "Sac à Dos Urbain 20L",
      "slug": "sac-a-dos-urbain-20l",
      "description": "Sac à dos résistant à l'eau, poche laptop 15\", sangle poitrine.",
      "categoryId": 3,
      "category": {
        "id": 3,
        "name": "Mode",
        "slug": "mode"
      },
      "price": 54,
      "currency": "EUR",
      "stock": 64,
      "sku": "SB-URB20",
      "tags": [
        "sac",
        "outdoor"
      ],
      "images": [
        "https://i.postimg.cc/sxg3Mbdb/pexels-storiesofdesign-14768506.jpg"
      ],
      "variants": [
        {
          "id": "107-noir",
          "name": "Noir",
          "price": 54,
          "stock": 30
        },
        {
          "id": "107-bleu",
          "name": "Bleu",
          "price": 54,
          "stock": 24
        },
        {
          "id": "107-gris",
          "name": "Gris",
          "price": 54,
          "stock": 10
        }
      ],
      "rating": 4.3,
      "reviewsCount": 27,
      "createdAt": "2024-12-01T07:10:00Z"
    },
    {
      "id": "108",
      "title": "Set de Couteaux de Cuisine (5 pcs)",
      "slug": "set-couteaux-5pcs",
      "description": "Lames en acier inoxydable, manche ergonomique, bloc en bois inclus.",
      "categoryId": 2,
      "category": {
        "id": 2,
        "name": "Maison & Cuisine",
        "slug": "maison-cuisine"
      },
      "price": 39.99,
      "currency": "EUR",
      "stock": 40,
      "sku": "CK-SET5",
      "tags": [
        "cuisine",
        "couteaux"
      ],
      "images": [
        "https://i.postimg.cc/L8ZLq1Ng/pexels-melvin-buezo-1253763-2529147.jpg"
      ],
      "variants": [],
      "rating": 4,
      "reviewsCount": 12,
      "createdAt": "2024-10-05T11:00:00Z"
    },
    {
      "id": "101",
      "title": "Casque Bluetooth X200",
      "slug": "casque-bluetooth-x200",
      "description": "Casque sans fil avec réduction active du bruit, autonomie 30h, micro intégré.",
      "categoryId": 1,
      "category": {
        "id": 1,
        "name": "Électronique",
        "slug": "electronique"
      },
      "price": 129.99,
      "compareAtPrice": 159.99,
      "currency": "EUR",
      "stock": 48,
      "sku": "HB-X200",
      "tags": [
        "audio",
        "wireless",
        "bestseller"
      ],
      "images": [
        "https://i.postimg.cc/rmcVkKhm/pexels-vitalyagorbachev-11137016.jpg",
        "https://placehold.co/600x400/png/ffffff/000000?text=Casque+X200+2"
      ],
      "variants": [
        {
          "id": "101-1",
          "name": "Noir",
          "price": 129.99,
          "stock": 30
        },
        {
          "id": "101-2",
          "name": "Blanc",
          "price": 129.99,
          "stock": 18
        }
      ],
      "rating": 4.6,
      "reviewsCount": 23,
      "createdAt": "2024-11-10T09:00:00Z"
    },
    {
      "id": "102",
      "title": "Machine à Espresso MiniBar",
      "slug": "espresso-minibar",
      "description": "Machine espresso compacte 15 bar, bac à eau 1.2L, mode économie d'énergie.",
      "categoryId": 2,
      "category": {
        "id": 2,
        "name": "Maison & Cuisine",
        "slug": "maison-cuisine"
      },
      "price": 89.5,
      "currency": "EUR",
      "stock": 12,
      "sku": "MB-ESP01",
      "tags": [
        "cuisine",
        "coffee"
      ],
      "images": [
        "https://placehold.co/600x400/png/ffffff/000000?text=Espresso+MiniBar"
      ],
      "variants": [],
      "rating": 4.1,
      "reviewsCount": 8,
      "createdAt": "2025-02-03T12:30:00Z"
    },
    {
      "id": "103",
      "title": "T-shirt Organic Cotton - Unisexe",
      "slug": "tshirt-organic-cotton",
      "description": "T-shirt 100% coton biologique, coupe standard. Disponible en plusieurs tailles.",
      "categoryId": 3,
      "category": {
        "id": 3,
        "name": "Mode",
        "slug": "mode"
      },
      "price": 19,
      "currency": "EUR",
      "stock": 210,
      "sku": "TS-ORGCOT",
      "tags": [
        "vêtement",
        "eco"
      ],
      "images": [
        "https://i.postimg.cc/zvGqy4Z9/pexels-sam2piccs-10187850.jpg"
      ],
      "variants": [
        {
          "id": "103-S",
          "name": "S",
          "price": 19,
          "stock": 40
        },
        {
          "id": "103-M",
          "name": "M",
          "price": 19,
          "stock": 80
        },
        {
          "id": "103-L",
          "name": "L",
          "price": 19,
          "stock": 60
        },
        {
          "id": "103-XL",
          "name": "XL",
          "price": 19,
          "stock": 30
        }
      ],
      "rating": 4.4,
      "reviewsCount": 52,
      "createdAt": "2024-08-21T08:00:00Z"
    },
    {
      "id": "104",
      "title": "Palette Maquillage 12 Couches",
      "slug": "palette-maquillage-12",
      "description": "Palette compacte 12 fards, fini mat et pailleté, livré avec miroir.",
      "categoryId": 4,
      "category": {
        "id": 4,
        "name": "Beauté",
        "slug": "beaute"
      },
      "price": 29.95,
      "currency": "EUR",
      "stock": 75,
      "sku": "BEA-PA12",
      "tags": [
        "makeup",
        "palette"
      ],
      "images": [
        "https://i.postimg.cc/tJ49s8Gj/pexels-bertellifotografia-12446291.jpg"
      ],
      "variants": [],
      "rating": 4.2,
      "reviewsCount": 18,
      "createdAt": "2025-01-15T10:00:00Z"
    },
    {
      "id": "105",
      "title": "Lampe LED de Lecture",
      "slug": "lampe-led-lecture",
      "description": "Lampe LED à intensité réglable, bras flexible, port USB intégré.",
      "categoryId": 2,
      "category": {
        "id": 2,
        "name": "Maison & Cuisine",
        "slug": "maison-cuisine"
      },
      "price": 24.99,
      "currency": "EUR",
      "stock": 130,
      "sku": "LM-LED01",
      "tags": [
        "éclairage",
        "bureau"
      ],
      "images": [
        "https://i.postimg.cc/hGQnRSD2/image-1.png"
      ],
      "variants": [],
      "rating": 4.5,
      "reviewsCount": 34,
      "createdAt": "2024-09-30T14:20:00Z"
    },
    {
      "id": "106",
      "title": "Chargeur Rapide USB-C 30W",
      "slug": "chargeur-usb-c-30w",
      "description": "Charge rapide 30W compatible laptops, smartphones et tablettes.",
      "categoryId": 1,
      "category": {
        "id": 1,
        "name": "Électronique",
        "slug": "electronique"
      },
      "price": 17.5,
      "currency": "EUR",
      "stock": 300,
      "sku": "CH-30C",
      "tags": [
        "chargeur",
        "usb-c"
      ],
      "images": [
        "https://static.nike.com/a/images/t_prod_ss/w_640,c_limit,f_auto/66f0f8b2-8d4a-4201-b334-c1fdf9ca3e5e/air-max-270-chaussure-PgbqWd.png"
      ],
      "variants": [],
      "rating": 4.7,
      "reviewsCount": 91,
      "createdAt": "2024-06-05T09:45:00Z"
    },
    {
      "id": "107",
      "title": "Sac à Dos Urbain 20L",
      "slug": "sac-a-dos-urbain-20l",
      "description": "Sac à dos résistant à l'eau, poche laptop 15\", sangle poitrine.",
      "categoryId": 3,
      "category": {
        "id": 3,
        "name": "Mode",
        "slug": "mode"
      },
      "price": 54,
      "currency": "EUR",
      "stock": 64,
      "sku": "SB-URB20",
      "tags": [
        "sac",
        "outdoor"
      ],
      "images": [
        "https://i.postimg.cc/sxg3Mbdb/pexels-storiesofdesign-14768506.jpg"
      ],
      "variants": [
        {
          "id": "107-noir",
          "name": "Noir",
          "price": 54,
          "stock": 30
        },
        {
          "id": "107-bleu",
          "name": "Bleu",
          "price": 54,
          "stock": 24
        },
        {
          "id": "107-gris",
          "name": "Gris",
          "price": 54,
          "stock": 10
        }
      ],
      "rating": 4.3,
      "reviewsCount": 27,
      "createdAt": "2024-12-01T07:10:00Z"
    },
    {
      "id": "108",
      "title": "Set de Couteaux de Cuisine (5 pcs)",
      "slug": "set-couteaux-5pcs",
      "description": "Lames en acier inoxydable, manche ergonomique, bloc en bois inclus.",
      "categoryId": 2,
      "category": {
        "id": 2,
        "name": "Maison & Cuisine",
        "slug": "maison-cuisine"
      },
      "price": 39.99,
      "currency": "EUR",
      "stock": 40,
      "sku": "CK-SET5",
      "tags": [
        "cuisine",
        "couteaux"
      ],
      "images": [
        "https://i.postimg.cc/L8ZLq1Ng/pexels-melvin-buezo-1253763-2529147.jpg"
      ],
      "variants": [],
      "rating": 4,
      "reviewsCount": 12,
      "createdAt": "2024-10-05T11:00:00Z"
    },
    {
      "id": "101",
      "title": "Casque Bluetooth X200",
      "slug": "casque-bluetooth-x200",
      "description": "Casque sans fil avec réduction active du bruit, autonomie 30h, micro intégré.",
      "categoryId": 1,
      "category": {
        "id": 1,
        "name": "Électronique",
        "slug": "electronique"
      },
      "price": 129.99,
      "compareAtPrice": 159.99,
      "currency": "EUR",
      "stock": 48,
      "sku": "HB-X200",
      "tags": [
        "audio",
        "wireless",
        "bestseller"
      ],
      "images": [
        "https://i.postimg.cc/rmcVkKhm/pexels-vitalyagorbachev-11137016.jpg",
        "https://placehold.co/600x400/png/ffffff/000000?text=Casque+X200+2"
      ],
      "variants": [
        {
          "id": "101-1",
          "name": "Noir",
          "price": 129.99,
          "stock": 30
        },
        {
          "id": "101-2",
          "name": "Blanc",
          "price": 129.99,
          "stock": 18
        }
      ],
      "rating": 4.6,
      "reviewsCount": 23,
      "createdAt": "2024-11-10T09:00:00Z"
    },
    {
      "id": "102",
      "title": "Machine à Espresso MiniBar",
      "slug": "espresso-minibar",
      "description": "Machine espresso compacte 15 bar, bac à eau 1.2L, mode économie d'énergie.",
      "categoryId": 2,
      "category": {
        "id": 2,
        "name": "Maison & Cuisine",
        "slug": "maison-cuisine"
      },
      "price": 89.5,
      "currency": "EUR",
      "stock": 12,
      "sku": "MB-ESP01",
      "tags": [
        "cuisine",
        "coffee"
      ],
      "images": [
        "https://placehold.co/600x400/png/ffffff/000000?text=Espresso+MiniBar"
      ],
      "variants": [],
      "rating": 4.1,
      "reviewsCount": 8,
      "createdAt": "2025-02-03T12:30:00Z"
    },
    {
      "id": "103",
      "title": "T-shirt Organic Cotton - Unisexe",
      "slug": "tshirt-organic-cotton",
      "description": "T-shirt 100% coton biologique, coupe standard. Disponible en plusieurs tailles.",
      "categoryId": 3,
      "category": {
        "id": 3,
        "name": "Mode",
        "slug": "mode"
      },
      "price": 19,
      "currency": "EUR",
      "stock": 210,
      "sku": "TS-ORGCOT",
      "tags": [
        "vêtement",
        "eco"
      ],
      "images": [
        "https://i.postimg.cc/zvGqy4Z9/pexels-sam2piccs-10187850.jpg"
      ],
      "variants": [
        {
          "id": "103-S",
          "name": "S",
          "price": 19,
          "stock": 40
        },
        {
          "id": "103-M",
          "name": "M",
          "price": 19,
          "stock": 80
        },
        {
          "id": "103-L",
          "name": "L",
          "price": 19,
          "stock": 60
        },
        {
          "id": "103-XL",
          "name": "XL",
          "price": 19,
          "stock": 30
        }
      ],
      "rating": 4.4,
      "reviewsCount": 52,
      "createdAt": "2024-08-21T08:00:00Z"
    },
    {
      "id": "104",
      "title": "Palette Maquillage 12 Couches",
      "slug": "palette-maquillage-12",
      "description": "Palette compacte 12 fards, fini mat et pailleté, livré avec miroir.",
      "categoryId": 4,
      "category": {
        "id": 4,
        "name": "Beauté",
        "slug": "beaute"
      },
      "price": 29.95,
      "currency": "EUR",
      "stock": 75,
      "sku": "BEA-PA12",
      "tags": [
        "makeup",
        "palette"
      ],
      "images": [
        "https://i.postimg.cc/tJ49s8Gj/pexels-bertellifotografia-12446291.jpg"
      ],
      "variants": [],
      "rating": 4.2,
      "reviewsCount": 18,
      "createdAt": "2025-01-15T10:00:00Z"
    },
    {
      "id": "105",
      "title": "Lampe LED de Lecture",
      "slug": "lampe-led-lecture",
      "description": "Lampe LED à intensité réglable, bras flexible, port USB intégré.",
      "categoryId": 2,
      "category": {
        "id": 2,
        "name": "Maison & Cuisine",
        "slug": "maison-cuisine"
      },
      "price": 24.99,
      "currency": "EUR",
      "stock": 130,
      "sku": "LM-LED01",
      "tags": [
        "éclairage",
        "bureau"
      ],
      "images": [
        "https://i.postimg.cc/hGQnRSD2/image-1.png"
      ],
      "variants": [],
      "rating": 4.5,
      "reviewsCount": 34,
      "createdAt": "2024-09-30T14:20:00Z"
    },
    {
      "id": "106",
      "title": "Chargeur Rapide USB-C 30W",
      "slug": "chargeur-usb-c-30w",
      "description": "Charge rapide 30W compatible laptops, smartphones et tablettes.",
      "categoryId": 1,
      "category": {
        "id": 1,
        "name": "Électronique",
        "slug": "electronique"
      },
      "price": 17.5,
      "currency": "EUR",
      "stock": 300,
      "sku": "CH-30C",
      "tags": [
        "chargeur",
        "usb-c"
      ],
      "images": [
        "https://static.nike.com/a/images/t_prod_ss/w_640,c_limit,f_auto/66f0f8b2-8d4a-4201-b334-c1fdf9ca3e5e/air-max-270-chaussure-PgbqWd.png"
      ],
      "variants": [],
      "rating": 4.7,
      "reviewsCount": 91,
      "createdAt": "2024-06-05T09:45:00Z"
    },
    {
      "id": "107",
      "title": "Sac à Dos Urbain 20L",
      "slug": "sac-a-dos-urbain-20l",
      "description": "Sac à dos résistant à l'eau, poche laptop 15\", sangle poitrine.",
      "categoryId": 3,
      "category": {
        "id": 3,
        "name": "Mode",
        "slug": "mode"
      },
      "price": 54,
      "currency": "EUR",
      "stock": 64,
      "sku": "SB-URB20",
      "tags": [
        "sac",
        "outdoor"
      ],
      "images": [
        "https://i.postimg.cc/sxg3Mbdb/pexels-storiesofdesign-14768506.jpg"
      ],
      "variants": [
        {
          "id": "107-noir",
          "name": "Noir",
          "price": 54,
          "stock": 30
        },
        {
          "id": "107-bleu",
          "name": "Bleu",
          "price": 54,
          "stock": 24
        },
        {
          "id": "107-gris",
          "name": "Gris",
          "price": 54,
          "stock": 10
        }
      ],
      "rating": 4.3,
      "reviewsCount": 27,
      "createdAt": "2024-12-01T07:10:00Z"
    },
    {
      "id": "108",
      "title": "Set de Couteaux de Cuisine (5 pcs)",
      "slug": "set-couteaux-5pcs",
      "description": "Lames en acier inoxydable, manche ergonomique, bloc en bois inclus.",
      "categoryId": 2,
      "category": {
        "id": 2,
        "name": "Maison & Cuisine",
        "slug": "maison-cuisine"
      },
      "price": 39.99,
      "currency": "EUR",
      "stock": 40,
      "sku": "CK-SET5",
      "tags": [
        "cuisine",
        "couteaux"
      ],
      "images": [
        "https://i.postimg.cc/L8ZLq1Ng/pexels-melvin-buezo-1253763-2529147.jpg"
      ],
      "variants": [],
      "rating": 4,
      "reviewsCount": 12,
      "createdAt": "2024-10-05T11:00:00Z"
    },
    {
      "id": "101",
      "title": "Casque Bluetooth X200",
      "slug": "casque-bluetooth-x200",
      "description": "Casque sans fil avec réduction active du bruit, autonomie 30h, micro intégré.",
      "categoryId": 1,
      "category": {
        "id": 1,
        "name": "Électronique",
        "slug": "electronique"
      },
      "price": 129.99,
      "compareAtPrice": 159.99,
      "currency": "EUR",
      "stock": 48,
      "sku": "HB-X200",
      "tags": [
        "audio",
        "wireless",
        "bestseller"
      ],
      "images": [
        "https://i.postimg.cc/rmcVkKhm/pexels-vitalyagorbachev-11137016.jpg",
        "https://placehold.co/600x400/png/ffffff/000000?text=Casque+X200+2"
      ],
      "variants": [
        {
          "id": "101-1",
          "name": "Noir",
          "price": 129.99,
          "stock": 30
        },
        {
          "id": "101-2",
          "name": "Blanc",
          "price": 129.99,
          "stock": 18
        }
      ],
      "rating": 4.6,
      "reviewsCount": 23,
      "createdAt": "2024-11-10T09:00:00Z"
    },
    {
      "id": "102",
      "title": "Machine à Espresso MiniBar",
      "slug": "espresso-minibar",
      "description": "Machine espresso compacte 15 bar, bac à eau 1.2L, mode économie d'énergie.",
      "categoryId": 2,
      "category": {
        "id": 2,
        "name": "Maison & Cuisine",
        "slug": "maison-cuisine"
      },
      "price": 89.5,
      "currency": "EUR",
      "stock": 12,
      "sku": "MB-ESP01",
      "tags": [
        "cuisine",
        "coffee"
      ],
      "images": [
        "https://placehold.co/600x400/png/ffffff/000000?text=Espresso+MiniBar"
      ],
      "variants": [],
      "rating": 4.1,
      "reviewsCount": 8,
      "createdAt": "2025-02-03T12:30:00Z"
    },
    {
      "id": "103",
      "title": "T-shirt Organic Cotton - Unisexe",
      "slug": "tshirt-organic-cotton",
      "description": "T-shirt 100% coton biologique, coupe standard. Disponible en plusieurs tailles.",
      "categoryId": 3,
      "category": {
        "id": 3,
        "name": "Mode",
        "slug": "mode"
      },
      "price": 19,
      "currency": "EUR",
      "stock": 210,
      "sku": "TS-ORGCOT",
      "tags": [
        "vêtement",
        "eco"
      ],
      "images": [
        "https://i.postimg.cc/zvGqy4Z9/pexels-sam2piccs-10187850.jpg"
      ],
      "variants": [
        {
          "id": "103-S",
          "name": "S",
          "price": 19,
          "stock": 40
        },
        {
          "id": "103-M",
          "name": "M",
          "price": 19,
          "stock": 80
        },
        {
          "id": "103-L",
          "name": "L",
          "price": 19,
          "stock": 60
        },
        {
          "id": "103-XL",
          "name": "XL",
          "price": 19,
          "stock": 30
        }
      ],
      "rating": 4.4,
      "reviewsCount": 52,
      "createdAt": "2024-08-21T08:00:00Z"
    },
    {
      "id": "104",
      "title": "Palette Maquillage 12 Couches",
      "slug": "palette-maquillage-12",
      "description": "Palette compacte 12 fards, fini mat et pailleté, livré avec miroir.",
      "categoryId": 4,
      "category": {
        "id": 4,
        "name": "Beauté",
        "slug": "beaute"
      },
      "price": 29.95,
      "currency": "EUR",
      "stock": 75,
      "sku": "BEA-PA12",
      "tags": [
        "makeup",
        "palette"
      ],
      "images": [
        "https://i.postimg.cc/tJ49s8Gj/pexels-bertellifotografia-12446291.jpg"
      ],
      "variants": [],
      "rating": 4.2,
      "reviewsCount": 18,
      "createdAt": "2025-01-15T10:00:00Z"
    },
    {
      "id": "105",
      "title": "Lampe LED de Lecture",
      "slug": "lampe-led-lecture",
      "description": "Lampe LED à intensité réglable, bras flexible, port USB intégré.",
      "categoryId": 2,
      "category": {
        "id": 2,
        "name": "Maison & Cuisine",
        "slug": "maison-cuisine"
      },
      "price": 24.99,
      "currency": "EUR",
      "stock": 130,
      "sku": "LM-LED01",
      "tags": [
        "éclairage",
        "bureau"
      ],
      "images": [
        "https://i.postimg.cc/hGQnRSD2/image-1.png"
      ],
      "variants": [],
      "rating": 4.5,
      "reviewsCount": 34,
      "createdAt": "2024-09-30T14:20:00Z"
    },
    {
      "id": "106",
      "title": "Chargeur Rapide USB-C 30W",
      "slug": "chargeur-usb-c-30w",
      "description": "Charge rapide 30W compatible laptops, smartphones et tablettes.",
      "categoryId": 1,
      "category": {
        "id": 1,
        "name": "Électronique",
        "slug": "electronique"
      },
      "price": 17.5,
      "currency": "EUR",
      "stock": 300,
      "sku": "CH-30C",
      "tags": [
        "chargeur",
        "usb-c"
      ],
      "images": [
        "https://static.nike.com/a/images/t_prod_ss/w_640,c_limit,f_auto/66f0f8b2-8d4a-4201-b334-c1fdf9ca3e5e/air-max-270-chaussure-PgbqWd.png"
      ],
      "variants": [],
      "rating": 4.7,
      "reviewsCount": 91,
      "createdAt": "2024-06-05T09:45:00Z"
    },
    {
      "id": "107",
      "title": "Sac à Dos Urbain 20L",
      "slug": "sac-a-dos-urbain-20l",
      "description": "Sac à dos résistant à l'eau, poche laptop 15\", sangle poitrine.",
      "categoryId": 3,
      "category": {
        "id": 3,
        "name": "Mode",
        "slug": "mode"
      },
      "price": 54,
      "currency": "EUR",
      "stock": 64,
      "sku": "SB-URB20",
      "tags": [
        "sac",
        "outdoor"
      ],
      "images": [
        "https://i.postimg.cc/sxg3Mbdb/pexels-storiesofdesign-14768506.jpg"
      ],
      "variants": [
        {
          "id": "107-noir",
          "name": "Noir",
          "price": 54,
          "stock": 30
        },
        {
          "id": "107-bleu",
          "name": "Bleu",
          "price": 54,
          "stock": 24
        },
        {
          "id": "107-gris",
          "name": "Gris",
          "price": 54,
          "stock": 10
        }
      ],
      "rating": 4.3,
      "reviewsCount": 27,
      "createdAt": "2024-12-01T07:10:00Z"
    },
    {
      "id": "108",
      "title": "Set de Couteaux de Cuisine (5 pcs)",
      "slug": "set-couteaux-5pcs",
      "description": "Lames en acier inoxydable, manche ergonomique, bloc en bois inclus.",
      "categoryId": 2,
      "category": {
        "id": 2,
        "name": "Maison & Cuisine",
        "slug": "maison-cuisine"
      },
      "price": 39.99,
      "currency": "EUR",
      "stock": 40,
      "sku": "CK-SET5",
      "tags": [
        "cuisine",
        "couteaux"
      ],
      "images": [
        "https://i.postimg.cc/L8ZLq1Ng/pexels-melvin-buezo-1253763-2529147.jpg"
      ],
      "variants": [],
      "rating": 4,
      "reviewsCount": 12,
      "createdAt": "2024-10-05T11:00:00Z"
    },
    {
      "id": "101",
      "title": "Casque Bluetooth X200",
      "slug": "casque-bluetooth-x200",
      "description": "Casque sans fil avec réduction active du bruit, autonomie 30h, micro intégré.",
      "categoryId": 1,
      "category": {
        "id": 1,
        "name": "Électronique",
        "slug": "electronique"
      },
      "price": 129.99,
      "compareAtPrice": 159.99,
      "currency": "EUR",
      "stock": 48,
      "sku": "HB-X200",
      "tags": [
        "audio",
        "wireless",
        "bestseller"
      ],
      "images": [
        "https://i.postimg.cc/rmcVkKhm/pexels-vitalyagorbachev-11137016.jpg",
        "https://placehold.co/600x400/png/ffffff/000000?text=Casque+X200+2"
      ],
      "variants": [
        {
          "id": "101-1",
          "name": "Noir",
          "price": 129.99,
          "stock": 30
        },
        {
          "id": "101-2",
          "name": "Blanc",
          "price": 129.99,
          "stock": 18
        }
      ],
      "rating": 4.6,
      "reviewsCount": 23,
      "createdAt": "2024-11-10T09:00:00Z"
    },
    {
      "id": "102",
      "title": "Machine à Espresso MiniBar",
      "slug": "espresso-minibar",
      "description": "Machine espresso compacte 15 bar, bac à eau 1.2L, mode économie d'énergie.",
      "categoryId": 2,
      "category": {
        "id": 2,
        "name": "Maison & Cuisine",
        "slug": "maison-cuisine"
      },
      "price": 89.5,
      "currency": "EUR",
      "stock": 12,
      "sku": "MB-ESP01",
      "tags": [
        "cuisine",
        "coffee"
      ],
      "images": [
        "https://placehold.co/600x400/png/ffffff/000000?text=Espresso+MiniBar"
      ],
      "variants": [],
      "rating": 4.1,
      "reviewsCount": 8,
      "createdAt": "2025-02-03T12:30:00Z"
    },
    {
      "id": "103",
      "title": "T-shirt Organic Cotton - Unisexe",
      "slug": "tshirt-organic-cotton",
      "description": "T-shirt 100% coton biologique, coupe standard. Disponible en plusieurs tailles.",
      "categoryId": 3,
      "category": {
        "id": 3,
        "name": "Mode",
        "slug": "mode"
      },
      "price": 19,
      "currency": "EUR",
      "stock": 210,
      "sku": "TS-ORGCOT",
      "tags": [
        "vêtement",
        "eco"
      ],
      "images": [
        "https://i.postimg.cc/zvGqy4Z9/pexels-sam2piccs-10187850.jpg"
      ],
      "variants": [
        {
          "id": "103-S",
          "name": "S",
          "price": 19,
          "stock": 40
        },
        {
          "id": "103-M",
          "name": "M",
          "price": 19,
          "stock": 80
        },
        {
          "id": "103-L",
          "name": "L",
          "price": 19,
          "stock": 60
        },
        {
          "id": "103-XL",
          "name": "XL",
          "price": 19,
          "stock": 30
        }
      ],
      "rating": 4.4,
      "reviewsCount": 52,
      "createdAt": "2024-08-21T08:00:00Z"
    },
    {
      "id": "104",
      "title": "Palette Maquillage 12 Couches",
      "slug": "palette-maquillage-12",
      "description": "Palette compacte 12 fards, fini mat et pailleté, livré avec miroir.",
      "categoryId": 4,
      "category": {
        "id": 4,
        "name": "Beauté",
        "slug": "beaute"
      },
      "price": 29.95,
      "currency": "EUR",
      "stock": 75,
      "sku": "BEA-PA12",
      "tags": [
        "makeup",
        "palette"
      ],
      "images": [
        "https://i.postimg.cc/tJ49s8Gj/pexels-bertellifotografia-12446291.jpg"
      ],
      "variants": [],
      "rating": 4.2,
      "reviewsCount": 18,
      "createdAt": "2025-01-15T10:00:00Z"
    },
    {
      "id": "105",
      "title": "Lampe LED de Lecture",
      "slug": "lampe-led-lecture",
      "description": "Lampe LED à intensité réglable, bras flexible, port USB intégré.",
      "categoryId": 2,
      "category": {
        "id": 2,
        "name": "Maison & Cuisine",
        "slug": "maison-cuisine"
      },
      "price": 24.99,
      "currency": "EUR",
      "stock": 130,
      "sku": "LM-LED01",
      "tags": [
        "éclairage",
        "bureau"
      ],
      "images": [
        "https://i.postimg.cc/hGQnRSD2/image-1.png"
      ],
      "variants": [],
      "rating": 4.5,
      "reviewsCount": 34,
      "createdAt": "2024-09-30T14:20:00Z"
    },
    {
      "id": "106",
      "title": "Chargeur Rapide USB-C 30W",
      "slug": "chargeur-usb-c-30w",
      "description": "Charge rapide 30W compatible laptops, smartphones et tablettes.",
      "categoryId": 1,
      "category": {
        "id": 1,
        "name": "Électronique",
        "slug": "electronique"
      },
      "price": 17.5,
      "currency": "EUR",
      "stock": 300,
      "sku": "CH-30C",
      "tags": [
        "chargeur",
        "usb-c"
      ],
      "images": [
        "https://static.nike.com/a/images/t_prod_ss/w_640,c_limit,f_auto/66f0f8b2-8d4a-4201-b334-c1fdf9ca3e5e/air-max-270-chaussure-PgbqWd.png"
      ],
      "variants": [],
      "rating": 4.7,
      "reviewsCount": 91,
      "createdAt": "2024-06-05T09:45:00Z"
    },
    {
      "id": "107",
      "title": "Sac à Dos Urbain 20L",
      "slug": "sac-a-dos-urbain-20l",
      "description": "Sac à dos résistant à l'eau, poche laptop 15\", sangle poitrine.",
      "categoryId": 3,
      "category": {
        "id": 3,
        "name": "Mode",
        "slug": "mode"
      },
      "price": 54,
      "currency": "EUR",
      "stock": 64,
      "sku": "SB-URB20",
      "tags": [
        "sac",
        "outdoor"
      ],
      "images": [
        "https://i.postimg.cc/sxg3Mbdb/pexels-storiesofdesign-14768506.jpg"
      ],
      "variants": [
        {
          "id": "107-noir",
          "name": "Noir",
          "price": 54,
          "stock": 30
        },
        {
          "id": "107-bleu",
          "name": "Bleu",
          "price": 54,
          "stock": 24
        },
        {
          "id": "107-gris",
          "name": "Gris",
          "price": 54,
          "stock": 10
        }
      ],
      "rating": 4.3,
      "reviewsCount": 27,
      "createdAt": "2024-12-01T07:10:00Z"
    },
    {
      "id": "108",
      "title": "Set de Couteaux de Cuisine (5 pcs)",
      "slug": "set-couteaux-5pcs",
      "description": "Lames en acier inoxydable, manche ergonomique, bloc en bois inclus.",
      "categoryId": 2,
      "category": {
        "id": 2,
        "name": "Maison & Cuisine",
        "slug": "maison-cuisine"
      },
      "price": 39.99,
      "currency": "EUR",
      "stock": 40,
      "sku": "CK-SET5",
      "tags": [
        "cuisine",
        "couteaux"
      ],
      "images": [
        "https://i.postimg.cc/L8ZLq1Ng/pexels-melvin-buezo-1253763-2529147.jpg"
      ],
      "variants": [],
      "rating": 4,
      "reviewsCount": 12,
      "createdAt": "2024-10-05T11:00:00Z"
    },
    {
      "id": "101",
      "title": "Casque Bluetooth X200",
      "slug": "casque-bluetooth-x200",
      "description": "Casque sans fil avec réduction active du bruit, autonomie 30h, micro intégré.",
      "categoryId": 1,
      "category": {
        "id": 1,
        "name": "Électronique",
        "slug": "electronique"
      },
      "price": 129.99,
      "compareAtPrice": 159.99,
      "currency": "EUR",
      "stock": 48,
      "sku": "HB-X200",
      "tags": [
        "audio",
        "wireless",
        "bestseller"
      ],
      "images": [
        "https://i.postimg.cc/rmcVkKhm/pexels-vitalyagorbachev-11137016.jpg",
        "https://placehold.co/600x400/png/ffffff/000000?text=Casque+X200+2"
      ],
      "variants": [
        {
          "id": "101-1",
          "name": "Noir",
          "price": 129.99,
          "stock": 30
        },
        {
          "id": "101-2",
          "name": "Blanc",
          "price": 129.99,
          "stock": 18
        }
      ],
      "rating": 4.6,
      "reviewsCount": 23,
      "createdAt": "2024-11-10T09:00:00Z"
    },
    {
      "id": "102",
      "title": "Machine à Espresso MiniBar",
      "slug": "espresso-minibar",
      "description": "Machine espresso compacte 15 bar, bac à eau 1.2L, mode économie d'énergie.",
      "categoryId": 2,
      "category": {
        "id": 2,
        "name": "Maison & Cuisine",
        "slug": "maison-cuisine"
      },
      "price": 89.5,
      "currency": "EUR",
      "stock": 12,
      "sku": "MB-ESP01",
      "tags": [
        "cuisine",
        "coffee"
      ],
      "images": [
        "https://placehold.co/600x400/png/ffffff/000000?text=Espresso+MiniBar"
      ],
      "variants": [],
      "rating": 4.1,
      "reviewsCount": 8,
      "createdAt": "2025-02-03T12:30:00Z"
    },
    {
      "id": "103",
      "title": "T-shirt Organic Cotton - Unisexe",
      "slug": "tshirt-organic-cotton",
      "description": "T-shirt 100% coton biologique, coupe standard. Disponible en plusieurs tailles.",
      "categoryId": 3,
      "category": {
        "id": 3,
        "name": "Mode",
        "slug": "mode"
      },
      "price": 19,
      "currency": "EUR",
      "stock": 210,
      "sku": "TS-ORGCOT",
      "tags": [
        "vêtement",
        "eco"
      ],
      "images": [
        "https://i.postimg.cc/zvGqy4Z9/pexels-sam2piccs-10187850.jpg"
      ],
      "variants": [
        {
          "id": "103-S",
          "name": "S",
          "price": 19,
          "stock": 40
        },
        {
          "id": "103-M",
          "name": "M",
          "price": 19,
          "stock": 80
        },
        {
          "id": "103-L",
          "name": "L",
          "price": 19,
          "stock": 60
        },
        {
          "id": "103-XL",
          "name": "XL",
          "price": 19,
          "stock": 30
        }
      ],
      "rating": 4.4,
      "reviewsCount": 52,
      "createdAt": "2024-08-21T08:00:00Z"
    },
    {
      "id": "104",
      "title": "Palette Maquillage 12 Couches",
      "slug": "palette-maquillage-12",
      "description": "Palette compacte 12 fards, fini mat et pailleté, livré avec miroir.",
      "categoryId": 4,
      "category": {
        "id": 4,
        "name": "Beauté",
        "slug": "beaute"
      },
      "price": 29.95,
      "currency": "EUR",
      "stock": 75,
      "sku": "BEA-PA12",
      "tags": [
        "makeup",
        "palette"
      ],
      "images": [
        "https://i.postimg.cc/tJ49s8Gj/pexels-bertellifotografia-12446291.jpg"
      ],
      "variants": [],
      "rating": 4.2,
      "reviewsCount": 18,
      "createdAt": "2025-01-15T10:00:00Z"
    },
    {
      "id": "105",
      "title": "Lampe LED de Lecture",
      "slug": "lampe-led-lecture",
      "description": "Lampe LED à intensité réglable, bras flexible, port USB intégré.",
      "categoryId": 2,
      "category": {
        "id": 2,
        "name": "Maison & Cuisine",
        "slug": "maison-cuisine"
      },
      "price": 24.99,
      "currency": "EUR",
      "stock": 130,
      "sku": "LM-LED01",
      "tags": [
        "éclairage",
        "bureau"
      ],
      "images": [
        "https://i.postimg.cc/hGQnRSD2/image-1.png"
      ],
      "variants": [],
      "rating": 4.5,
      "reviewsCount": 34,
      "createdAt": "2024-09-30T14:20:00Z"
    },
    {
      "id": "106",
      "title": "Chargeur Rapide USB-C 30W",
      "slug": "chargeur-usb-c-30w",
      "description": "Charge rapide 30W compatible laptops, smartphones et tablettes.",
      "categoryId": 1,
      "category": {
        "id": 1,
        "name": "Électronique",
        "slug": "electronique"
      },
      "price": 17.5,
      "currency": "EUR",
      "stock": 300,
      "sku": "CH-30C",
      "tags": [
        "chargeur",
        "usb-c"
      ],
      "images": [
        "https://static.nike.com/a/images/t_prod_ss/w_640,c_limit,f_auto/66f0f8b2-8d4a-4201-b334-c1fdf9ca3e5e/air-max-270-chaussure-PgbqWd.png"
      ],
      "variants": [],
      "rating": 4.7,
      "reviewsCount": 91,
      "createdAt": "2024-06-05T09:45:00Z"
    },
    {
      "id": "107",
      "title": "Sac à Dos Urbain 20L",
      "slug": "sac-a-dos-urbain-20l",
      "description": "Sac à dos résistant à l'eau, poche laptop 15\", sangle poitrine.",
      "categoryId": 3,
      "category": {
        "id": 3,
        "name": "Mode",
        "slug": "mode"
      },
      "price": 54,
      "currency": "EUR",
      "stock": 64,
      "sku": "SB-URB20",
      "tags": [
        "sac",
        "outdoor"
      ],
      "images": [
        "https://i.postimg.cc/sxg3Mbdb/pexels-storiesofdesign-14768506.jpg"
      ],
      "variants": [
        {
          "id": "107-noir",
          "name": "Noir",
          "price": 54,
          "stock": 30
        },
        {
          "id": "107-bleu",
          "name": "Bleu",
          "price": 54,
          "stock": 24
        },
        {
          "id": "107-gris",
          "name": "Gris",
          "price": 54,
          "stock": 10
        }
      ],
      "rating": 4.3,
      "reviewsCount": 27,
      "createdAt": "2024-12-01T07:10:00Z"
    },
    {
      "id": "108",
      "title": "Set de Couteaux de Cuisine (5 pcs)",
      "slug": "set-couteaux-5pcs",
      "description": "Lames en acier inoxydable, manche ergonomique, bloc en bois inclus.",
      "categoryId": 2,
      "category": {
        "id": 2,
        "name": "Maison & Cuisine",
        "slug": "maison-cuisine"
      },
      "price": 39.99,
      "currency": "EUR",
      "stock": 40,
      "sku": "CK-SET5",
      "tags": [
        "cuisine",
        "couteaux"
      ],
      "images": [
        "https://i.postimg.cc/L8ZLq1Ng/pexels-melvin-buezo-1253763-2529147.jpg"
      ],
      "variants": [],
      "rating": 4,
      "reviewsCount": 12,
      "createdAt": "2024-10-05T11:00:00Z"
    },
    {
      "id": "101",
      "title": "Casque Bluetooth X200",
      "slug": "casque-bluetooth-x200",
      "description": "Casque sans fil avec réduction active du bruit, autonomie 30h, micro intégré.",
      "categoryId": 1,
      "category": {
        "id": 1,
        "name": "Électronique",
        "slug": "electronique"
      },
      "price": 129.99,
      "compareAtPrice": 159.99,
      "currency": "EUR",
      "stock": 48,
      "sku": "HB-X200",
      "tags": [
        "audio",
        "wireless",
        "bestseller"
      ],
      "images": [
        "https://i.postimg.cc/rmcVkKhm/pexels-vitalyagorbachev-11137016.jpg",
        "https://placehold.co/600x400/png/ffffff/000000?text=Casque+X200+2"
      ],
      "variants": [
        {
          "id": "101-1",
          "name": "Noir",
          "price": 129.99,
          "stock": 30
        },
        {
          "id": "101-2",
          "name": "Blanc",
          "price": 129.99,
          "stock": 18
        }
      ],
      "rating": 4.6,
      "reviewsCount": 23,
      "createdAt": "2024-11-10T09:00:00Z"
    },
    {
      "id": "102",
      "title": "Machine à Espresso MiniBar",
      "slug": "espresso-minibar",
      "description": "Machine espresso compacte 15 bar, bac à eau 1.2L, mode économie d'énergie.",
      "categoryId": 2,
      "category": {
        "id": 2,
        "name": "Maison & Cuisine",
        "slug": "maison-cuisine"
      },
      "price": 89.5,
      "currency": "EUR",
      "stock": 12,
      "sku": "MB-ESP01",
      "tags": [
        "cuisine",
        "coffee"
      ],
      "images": [
        "https://placehold.co/600x400/png/ffffff/000000?text=Espresso+MiniBar"
      ],
      "variants": [],
      "rating": 4.1,
      "reviewsCount": 8,
      "createdAt": "2025-02-03T12:30:00Z"
    },
    {
      "id": "103",
      "title": "T-shirt Organic Cotton - Unisexe",
      "slug": "tshirt-organic-cotton",
      "description": "T-shirt 100% coton biologique, coupe standard. Disponible en plusieurs tailles.",
      "categoryId": 3,
      "category": {
        "id": 3,
        "name": "Mode",
        "slug": "mode"
      },
      "price": 19,
      "currency": "EUR",
      "stock": 210,
      "sku": "TS-ORGCOT",
      "tags": [
        "vêtement",
        "eco"
      ],
      "images": [
        "https://i.postimg.cc/zvGqy4Z9/pexels-sam2piccs-10187850.jpg"
      ],
      "variants": [
        {
          "id": "103-S",
          "name": "S",
          "price": 19,
          "stock": 40
        },
        {
          "id": "103-M",
          "name": "M",
          "price": 19,
          "stock": 80
        },
        {
          "id": "103-L",
          "name": "L",
          "price": 19,
          "stock": 60
        },
        {
          "id": "103-XL",
          "name": "XL",
          "price": 19,
          "stock": 30
        }
      ],
      "rating": 4.4,
      "reviewsCount": 52,
      "createdAt": "2024-08-21T08:00:00Z"
    },
    {
      "id": "104",
      "title": "Palette Maquillage 12 Couches",
      "slug": "palette-maquillage-12",
      "description": "Palette compacte 12 fards, fini mat et pailleté, livré avec miroir.",
      "categoryId": 4,
      "category": {
        "id": 4,
        "name": "Beauté",
        "slug": "beaute"
      },
      "price": 29.95,
      "currency": "EUR",
      "stock": 75,
      "sku": "BEA-PA12",
      "tags": [
        "makeup",
        "palette"
      ],
      "images": [
        "https://i.postimg.cc/tJ49s8Gj/pexels-bertellifotografia-12446291.jpg"
      ],
      "variants": [],
      "rating": 4.2,
      "reviewsCount": 18,
      "createdAt": "2025-01-15T10:00:00Z"
    },
    {
      "id": "105",
      "title": "Lampe LED de Lecture",
      "slug": "lampe-led-lecture",
      "description": "Lampe LED à intensité réglable, bras flexible, port USB intégré.",
      "categoryId": 2,
      "category": {
        "id": 2,
        "name": "Maison & Cuisine",
        "slug": "maison-cuisine"
      },
      "price": 24.99,
      "currency": "EUR",
      "stock": 130,
      "sku": "LM-LED01",
      "tags": [
        "éclairage",
        "bureau"
      ],
      "images": [
        "https://i.postimg.cc/hGQnRSD2/image-1.png"
      ],
      "variants": [],
      "rating": 4.5,
      "reviewsCount": 34,
      "createdAt": "2024-09-30T14:20:00Z"
    },
    {
      "id": "101",
      "title": "Casque Bluetooth X200",
      "slug": "casque-bluetooth-x200",
      "description": "Casque sans fil avec réduction active du bruit, autonomie 30h, micro intégré.",
      "categoryId": 1,
      "category": {
        "id": 1,
        "name": "Électronique",
        "slug": "electronique"
      },
      "price": 129.99,
      "compareAtPrice": 159.99,
      "currency": "EUR",
      "stock": 48,
      "sku": "HB-X200",
      "tags": [
        "audio",
        "wireless",
        "bestseller"
      ],
      "images": [
        "https://i.postimg.cc/rmcVkKhm/pexels-vitalyagorbachev-11137016.jpg",
        "https://placehold.co/600x400/png/ffffff/000000?text=Casque+X200+2"
      ],
      "variants": [
        {
          "id": "101-1",
          "name": "Noir",
          "price": 129.99,
          "stock": 30
        },
        {
          "id": "101-2",
          "name": "Blanc",
          "price": 129.99,
          "stock": 18
        }
      ],
      "rating": 4.6,
      "reviewsCount": 23,
      "createdAt": "2024-11-10T09:00:00Z"
    },
    {
      "id": "102",
      "title": "Machine à Espresso MiniBar",
      "slug": "espresso-minibar",
      "description": "Machine espresso compacte 15 bar, bac à eau 1.2L, mode économie d'énergie.",
      "categoryId": 2,
      "category": {
        "id": 2,
        "name": "Maison & Cuisine",
        "slug": "maison-cuisine"
      },
      "price": 89.5,
      "currency": "EUR",
      "stock": 12,
      "sku": "MB-ESP01",
      "tags": [
        "cuisine",
        "coffee"
      ],
      "images": [
        "https://placehold.co/600x400/png/ffffff/000000?text=Espresso+MiniBar"
      ],
      "variants": [],
      "rating": 4.1,
      "reviewsCount": 8,
      "createdAt": "2025-02-03T12:30:00Z"
    },
    {
      "id": "103",
      "title": "T-shirt Organic Cotton - Unisexe",
      "slug": "tshirt-organic-cotton",
      "description": "T-shirt 100% coton biologique, coupe standard. Disponible en plusieurs tailles.",
      "categoryId": 3,
      "category": {
        "id": 3,
        "name": "Mode",
        "slug": "mode"
      },
      "price": 19,
      "currency": "EUR",
      "stock": 210,
      "sku": "TS-ORGCOT",
      "tags": [
        "vêtement",
        "eco"
      ],
      "images": [
        "https://i.postimg.cc/zvGqy4Z9/pexels-sam2piccs-10187850.jpg"
      ],
      "variants": [
        {
          "id": "103-S",
          "name": "S",
          "price": 19,
          "stock": 40
        },
        {
          "id": "103-M",
          "name": "M",
          "price": 19,
          "stock": 80
        },
        {
          "id": "103-L",
          "name": "L",
          "price": 19,
          "stock": 60
        },
        {
          "id": "103-XL",
          "name": "XL",
          "price": 19,
          "stock": 30
        }
      ],
      "rating": 4.4,
      "reviewsCount": 52,
      "createdAt": "2024-08-21T08:00:00Z"
    },
    {
      "id": "104",
      "title": "Palette Maquillage 12 Couches",
      "slug": "palette-maquillage-12",
      "description": "Palette compacte 12 fards, fini mat et pailleté, livré avec miroir.",
      "categoryId": 4,
      "category": {
        "id": 4,
        "name": "Beauté",
        "slug": "beaute"
      },
      "price": 29.95,
      "currency": "EUR",
      "stock": 75,
      "sku": "BEA-PA12",
      "tags": [
        "makeup",
        "palette"
      ],
      "images": [
        "https://i.postimg.cc/tJ49s8Gj/pexels-bertellifotografia-12446291.jpg"
      ],
      "variants": [],
      "rating": 4.2,
      "reviewsCount": 18,
      "createdAt": "2025-01-15T10:00:00Z"
    },
    {
      "id": "105",
      "title": "Lampe LED de Lecture",
      "slug": "lampe-led-lecture",
      "description": "Lampe LED à intensité réglable, bras flexible, port USB intégré.",
      "categoryId": 2,
      "category": {
        "id": 2,
        "name": "Maison & Cuisine",
        "slug": "maison-cuisine"
      },
      "price": 24.99,
      "currency": "EUR",
      "stock": 130,
      "sku": "LM-LED01",
      "tags": [
        "éclairage",
        "bureau"
      ],
      "images": [
        "https://i.postimg.cc/hGQnRSD2/image-1.png"
      ],
      "variants": [],
      "rating": 4.5,
      "reviewsCount": 34,
      "createdAt": "2024-09-30T14:20:00Z"
    },
    {
      "id": "106",
      "title": "Chargeur Rapide USB-C 30W",
      "slug": "chargeur-usb-c-30w",
      "description": "Charge rapide 30W compatible laptops, smartphones et tablettes.",
      "categoryId": 1,
      "category": {
        "id": 1,
        "name": "Électronique",
        "slug": "electronique"
      },
      "price": 17.5,
      "currency": "EUR",
      "stock": 300,
      "sku": "CH-30C",
      "tags": [
        "chargeur",
        "usb-c"
      ],
      "images": [
        "https://static.nike.com/a/images/t_prod_ss/w_640,c_limit,f_auto/66f0f8b2-8d4a-4201-b334-c1fdf9ca3e5e/air-max-270-chaussure-PgbqWd.png"
      ],
      "variants": [],
      "rating": 4.7,
      "reviewsCount": 91,
      "createdAt": "2024-06-05T09:45:00Z"
    },
    {
      "id": "107",
      "title": "Sac à Dos Urbain 20L",
      "slug": "sac-a-dos-urbain-20l",
      "description": "Sac à dos résistant à l'eau, poche laptop 15\", sangle poitrine.",
      "categoryId": 3,
      "category": {
        "id": 3,
        "name": "Mode",
        "slug": "mode"
      },
      "price": 54,
      "currency": "EUR",
      "stock": 64,
      "sku": "SB-URB20",
      "tags": [
        "sac",
        "outdoor"
      ],
      "images": [
        "https://i.postimg.cc/sxg3Mbdb/pexels-storiesofdesign-14768506.jpg"
      ],
      "variants": [
        {
          "id": "107-noir",
          "name": "Noir",
          "price": 54,
          "stock": 30
        },
        {
          "id": "107-bleu",
          "name": "Bleu",
          "price": 54,
          "stock": 24
        },
        {
          "id": "107-gris",
          "name": "Gris",
          "price": 54,
          "stock": 10
        }
      ],
      "rating": 4.3,
      "reviewsCount": 27,
      "createdAt": "2024-12-01T07:10:00Z"
    },
    {
      "id": "108",
      "title": "Set de Couteaux de Cuisine (5 pcs)",
      "slug": "set-couteaux-5pcs",
      "description": "Lames en acier inoxydable, manche ergonomique, bloc en bois inclus.",
      "categoryId": 2,
      "category": {
        "id": 2,
        "name": "Maison & Cuisine",
        "slug": "maison-cuisine"
      },
      "price": 39.99,
      "currency": "EUR",
      "stock": 40,
      "sku": "CK-SET5",
      "tags": [
        "cuisine",
        "couteaux"
      ],
      "images": [
        "https://i.postimg.cc/L8ZLq1Ng/pexels-melvin-buezo-1253763-2529147.jpg"
      ],
      "variants": [],
      "rating": 4,
      "reviewsCount": 12,
      "createdAt": "2024-10-05T11:00:00Z"
    },
    {
      "id": "101",
      "title": "Casque Bluetooth X200",
      "slug": "casque-bluetooth-x200",
      "description": "Casque sans fil avec réduction active du bruit, autonomie 30h, micro intégré.",
      "categoryId": 1,
      "category": {
        "id": 1,
        "name": "Électronique",
        "slug": "electronique"
      },
      "price": 129.99,
      "compareAtPrice": 159.99,
      "currency": "EUR",
      "stock": 48,
      "sku": "HB-X200",
      "tags": [
        "audio",
        "wireless",
        "bestseller"
      ],
      "images": [
        "https://i.postimg.cc/rmcVkKhm/pexels-vitalyagorbachev-11137016.jpg",
        "https://placehold.co/600x400/png/ffffff/000000?text=Casque+X200+2"
      ],
      "variants": [
        {
          "id": "101-1",
          "name": "Noir",
          "price": 129.99,
          "stock": 30
        },
        {
          "id": "101-2",
          "name": "Blanc",
          "price": 129.99,
          "stock": 18
        }
      ],
      "rating": 4.6,
      "reviewsCount": 23,
      "createdAt": "2024-11-10T09:00:00Z"
    },
    {
      "id": "102",
      "title": "Machine à Espresso MiniBar",
      "slug": "espresso-minibar",
      "description": "Machine espresso compacte 15 bar, bac à eau 1.2L, mode économie d'énergie.",
      "categoryId": 2,
      "category": {
        "id": 2,
        "name": "Maison & Cuisine",
        "slug": "maison-cuisine"
      },
      "price": 89.5,
      "currency": "EUR",
      "stock": 12,
      "sku": "MB-ESP01",
      "tags": [
        "cuisine",
        "coffee"
      ],
      "images": [
        "https://placehold.co/600x400/png/ffffff/000000?text=Espresso+MiniBar"
      ],
      "variants": [],
      "rating": 4.1,
      "reviewsCount": 8,
      "createdAt": "2025-02-03T12:30:00Z"
    },
    {
      "id": "103",
      "title": "T-shirt Organic Cotton - Unisexe",
      "slug": "tshirt-organic-cotton",
      "description": "T-shirt 100% coton biologique, coupe standard. Disponible en plusieurs tailles.",
      "categoryId": 3,
      "category": {
        "id": 3,
        "name": "Mode",
        "slug": "mode"
      },
      "price": 19,
      "currency": "EUR",
      "stock": 210,
      "sku": "TS-ORGCOT",
      "tags": [
        "vêtement",
        "eco"
      ],
      "images": [
        "https://i.postimg.cc/zvGqy4Z9/pexels-sam2piccs-10187850.jpg"
      ],
      "variants": [
        {
          "id": "103-S",
          "name": "S",
          "price": 19,
          "stock": 40
        },
        {
          "id": "103-M",
          "name": "M",
          "price": 19,
          "stock": 80
        },
        {
          "id": "103-L",
          "name": "L",
          "price": 19,
          "stock": 60
        },
        {
          "id": "103-XL",
          "name": "XL",
          "price": 19,
          "stock": 30
        }
      ],
      "rating": 4.4,
      "reviewsCount": 52,
      "createdAt": "2024-08-21T08:00:00Z"
    },
    {
      "id": "104",
      "title": "Palette Maquillage 12 Couches",
      "slug": "palette-maquillage-12",
      "description": "Palette compacte 12 fards, fini mat et pailleté, livré avec miroir.",
      "categoryId": 4,
      "category": {
        "id": 4,
        "name": "Beauté",
        "slug": "beaute"
      },
      "price": 29.95,
      "currency": "EUR",
      "stock": 75,
      "sku": "BEA-PA12",
      "tags": [
        "makeup",
        "palette"
      ],
      "images": [
        "https://i.postimg.cc/tJ49s8Gj/pexels-bertellifotografia-12446291.jpg"
      ],
      "variants": [],
      "rating": 4.2,
      "reviewsCount": 18,
      "createdAt": "2025-01-15T10:00:00Z"
    },
    {
      "id": "105",
      "title": "Lampe LED de Lecture",
      "slug": "lampe-led-lecture",
      "description": "Lampe LED à intensité réglable, bras flexible, port USB intégré.",
      "categoryId": 2,
      "category": {
        "id": 2,
        "name": "Maison & Cuisine",
        "slug": "maison-cuisine"
      },
      "price": 24.99,
      "currency": "EUR",
      "stock": 130,
      "sku": "LM-LED01",
      "tags": [
        "éclairage",
        "bureau"
      ],
      "images": [
        "https://i.postimg.cc/hGQnRSD2/image-1.png"
      ],
      "variants": [],
      "rating": 4.5,
      "reviewsCount": 34,
      "createdAt": "2024-09-30T14:20:00Z"
    },
    {
      "id": "106",
      "title": "Chargeur Rapide USB-C 30W",
      "slug": "chargeur-usb-c-30w",
      "description": "Charge rapide 30W compatible laptops, smartphones et tablettes.",
      "categoryId": 1,
      "category": {
        "id": 1,
        "name": "Électronique",
        "slug": "electronique"
      },
      "price": 17.5,
      "currency": "EUR",
      "stock": 300,
      "sku": "CH-30C",
      "tags": [
        "chargeur",
        "usb-c"
      ],
      "images": [
        "https://static.nike.com/a/images/t_prod_ss/w_640,c_limit,f_auto/66f0f8b2-8d4a-4201-b334-c1fdf9ca3e5e/air-max-270-chaussure-PgbqWd.png"
      ],
      "variants": [],
      "rating": 4.7,
      "reviewsCount": 91,
      "createdAt": "2024-06-05T09:45:00Z"
    },
    {
      "id": "107",
      "title": "Sac à Dos Urbain 20L",
      "slug": "sac-a-dos-urbain-20l",
      "description": "Sac à dos résistant à l'eau, poche laptop 15\", sangle poitrine.",
      "categoryId": 3,
      "category": {
        "id": 3,
        "name": "Mode",
        "slug": "mode"
      },
      "price": 54,
      "currency": "EUR",
      "stock": 64,
      "sku": "SB-URB20",
      "tags": [
        "sac",
        "outdoor"
      ],
      "images": [
        "https://i.postimg.cc/sxg3Mbdb/pexels-storiesofdesign-14768506.jpg"
      ],
      "variants": [
        {
          "id": "107-noir",
          "name": "Noir",
          "price": 54,
          "stock": 30
        },
        {
          "id": "107-bleu",
          "name": "Bleu",
          "price": 54,
          "stock": 24
        },
        {
          "id": "107-gris",
          "name": "Gris",
          "price": 54,
          "stock": 10
        }
      ],
      "rating": 4.3,
      "reviewsCount": 27,
      "createdAt": "2024-12-01T07:10:00Z"
    },
    {
      "id": "108",
      "title": "Set de Couteaux de Cuisine (5 pcs)",
      "slug": "set-couteaux-5pcs",
      "description": "Lames en acier inoxydable, manche ergonomique, bloc en bois inclus.",
      "categoryId": 2,
      "category": {
        "id": 2,
        "name": "Maison & Cuisine",
        "slug": "maison-cuisine"
      },
      "price": 39.99,
      "currency": "EUR",
      "stock": 40,
      "sku": "CK-SET5",
      "tags": [
        "cuisine",
        "couteaux"
      ],
      "images": [
        "https://i.postimg.cc/L8ZLq1Ng/pexels-melvin-buezo-1253763-2529147.jpg"
      ],
      "variants": [],
      "rating": 4,
      "reviewsCount": 12,
      "createdAt": "2024-10-05T11:00:00Z"
    },
    {
      "id": "101",
      "title": "Casque Bluetooth X200",
      "slug": "casque-bluetooth-x200",
      "description": "Casque sans fil avec réduction active du bruit, autonomie 30h, micro intégré.",
      "categoryId": 1,
      "category": {
        "id": 1,
        "name": "Électronique",
        "slug": "electronique"
      },
      "price": 129.99,
      "compareAtPrice": 159.99,
      "currency": "EUR",
      "stock": 48,
      "sku": "HB-X200",
      "tags": [
        "audio",
        "wireless",
        "bestseller"
      ],
      "images": [
        "https://i.postimg.cc/rmcVkKhm/pexels-vitalyagorbachev-11137016.jpg",
        "https://placehold.co/600x400/png/ffffff/000000?text=Casque+X200+2"
      ],
      "variants": [
        {
          "id": "101-1",
          "name": "Noir",
          "price": 129.99,
          "stock": 30
        },
        {
          "id": "101-2",
          "name": "Blanc",
          "price": 129.99,
          "stock": 18
        }
      ],
      "rating": 4.6,
      "reviewsCount": 23,
      "createdAt": "2024-11-10T09:00:00Z"
    },
    {
      "id": "102",
      "title": "Machine à Espresso MiniBar",
      "slug": "espresso-minibar",
      "description": "Machine espresso compacte 15 bar, bac à eau 1.2L, mode économie d'énergie.",
      "categoryId": 2,
      "category": {
        "id": 2,
        "name": "Maison & Cuisine",
        "slug": "maison-cuisine"
      },
      "price": 89.5,
      "currency": "EUR",
      "stock": 12,
      "sku": "MB-ESP01",
      "tags": [
        "cuisine",
        "coffee"
      ],
      "images": [
        "https://placehold.co/600x400/png/ffffff/000000?text=Espresso+MiniBar"
      ],
      "variants": [],
      "rating": 4.1,
      "reviewsCount": 8,
      "createdAt": "2025-02-03T12:30:00Z"
    },
    {
      "id": "103",
      "title": "T-shirt Organic Cotton - Unisexe",
      "slug": "tshirt-organic-cotton",
      "description": "T-shirt 100% coton biologique, coupe standard. Disponible en plusieurs tailles.",
      "categoryId": 3,
      "category": {
        "id": 3,
        "name": "Mode",
        "slug": "mode"
      },
      "price": 19,
      "currency": "EUR",
      "stock": 210,
      "sku": "TS-ORGCOT",
      "tags": [
        "vêtement",
        "eco"
      ],
      "images": [
        "https://i.postimg.cc/zvGqy4Z9/pexels-sam2piccs-10187850.jpg"
      ],
      "variants": [
        {
          "id": "103-S",
          "name": "S",
          "price": 19,
          "stock": 40
        },
        {
          "id": "103-M",
          "name": "M",
          "price": 19,
          "stock": 80
        },
        {
          "id": "103-L",
          "name": "L",
          "price": 19,
          "stock": 60
        },
        {
          "id": "103-XL",
          "name": "XL",
          "price": 19,
          "stock": 30
        }
      ],
      "rating": 4.4,
      "reviewsCount": 52,
      "createdAt": "2024-08-21T08:00:00Z"
    },
    {
      "id": "104",
      "title": "Palette Maquillage 12 Couches",
      "slug": "palette-maquillage-12",
      "description": "Palette compacte 12 fards, fini mat et pailleté, livré avec miroir.",
      "categoryId": 4,
      "category": {
        "id": 4,
        "name": "Beauté",
        "slug": "beaute"
      },
      "price": 29.95,
      "currency": "EUR",
      "stock": 75,
      "sku": "BEA-PA12",
      "tags": [
        "makeup",
        "palette"
      ],
      "images": [
        "https://i.postimg.cc/tJ49s8Gj/pexels-bertellifotografia-12446291.jpg"
      ],
      "variants": [],
      "rating": 4.2,
      "reviewsCount": 18,
      "createdAt": "2025-01-15T10:00:00Z"
    },
    {
      "id": "105",
      "title": "Lampe LED de Lecture",
      "slug": "lampe-led-lecture",
      "description": "Lampe LED à intensité réglable, bras flexible, port USB intégré.",
      "categoryId": 2,
      "category": {
        "id": 2,
        "name": "Maison & Cuisine",
        "slug": "maison-cuisine"
      },
      "price": 24.99,
      "currency": "EUR",
      "stock": 130,
      "sku": "LM-LED01",
      "tags": [
        "éclairage",
        "bureau"
      ],
      "images": [
        "https://i.postimg.cc/hGQnRSD2/image-1.png"
      ],
      "variants": [],
      "rating": 4.5,
      "reviewsCount": 34,
      "createdAt": "2024-09-30T14:20:00Z"
    },
    {
      "id": "106",
      "title": "Chargeur Rapide USB-C 30W",
      "slug": "chargeur-usb-c-30w",
      "description": "Charge rapide 30W compatible laptops, smartphones et tablettes.",
      "categoryId": 1,
      "category": {
        "id": 1,
        "name": "Électronique",
        "slug": "electronique"
      },
      "price": 17.5,
      "currency": "EUR",
      "stock": 300,
      "sku": "CH-30C",
      "tags": [
        "chargeur",
        "usb-c"
      ],
      "images": [
        "https://static.nike.com/a/images/t_prod_ss/w_640,c_limit,f_auto/66f0f8b2-8d4a-4201-b334-c1fdf9ca3e5e/air-max-270-chaussure-PgbqWd.png"
      ],
      "variants": [],
      "rating": 4.7,
      "reviewsCount": 91,
      "createdAt": "2024-06-05T09:45:00Z"
    },
    {
      "id": "107",
      "title": "Sac à Dos Urbain 20L",
      "slug": "sac-a-dos-urbain-20l",
      "description": "Sac à dos résistant à l'eau, poche laptop 15\", sangle poitrine.",
      "categoryId": 3,
      "category": {
        "id": 3,
        "name": "Mode",
        "slug": "mode"
      },
      "price": 54,
      "currency": "EUR",
      "stock": 64,
      "sku": "SB-URB20",
      "tags": [
        "sac",
        "outdoor"
      ],
      "images": [
        "https://i.postimg.cc/sxg3Mbdb/pexels-storiesofdesign-14768506.jpg"
      ],
      "variants": [
        {
          "id": "107-noir",
          "name": "Noir",
          "price": 54,
          "stock": 30
        },
        {
          "id": "107-bleu",
          "name": "Bleu",
          "price": 54,
          "stock": 24
        },
        {
          "id": "107-gris",
          "name": "Gris",
          "price": 54,
          "stock": 10
        }
      ],
      "rating": 4.3,
      "reviewsCount": 27,
      "createdAt": "2024-12-01T07:10:00Z"
    },
    {
      "id": "108",
      "title": "Set de Couteaux de Cuisine (5 pcs)",
      "slug": "set-couteaux-5pcs",
      "description": "Lames en acier inoxydable, manche ergonomique, bloc en bois inclus.",
      "categoryId": 2,
      "category": {
        "id": 2,
        "name": "Maison & Cuisine",
        "slug": "maison-cuisine"
      },
      "price": 39.99,
      "currency": "EUR",
      "stock": 40,
      "sku": "CK-SET5",
      "tags": [
        "cuisine",
        "couteaux"
      ],
      "images": [
        "https://i.postimg.cc/L8ZLq1Ng/pexels-melvin-buezo-1253763-2529147.jpg"
      ],
      "variants": [],
      "rating": 4,
      "reviewsCount": 12,
      "createdAt": "2024-10-05T11:00:00Z"
    },
    {
      "id": "101",
      "title": "Casque Bluetooth X200",
      "slug": "casque-bluetooth-x200",
      "description": "Casque sans fil avec réduction active du bruit, autonomie 30h, micro intégré.",
      "categoryId": 1,
      "category": {
        "id": 1,
        "name": "Électronique",
        "slug": "electronique"
      },
      "price": 129.99,
      "compareAtPrice": 159.99,
      "currency": "EUR",
      "stock": 48,
      "sku": "HB-X200",
      "tags": [
        "audio",
        "wireless",
        "bestseller"
      ],
      "images": [
        "https://i.postimg.cc/rmcVkKhm/pexels-vitalyagorbachev-11137016.jpg",
        "https://placehold.co/600x400/png/ffffff/000000?text=Casque+X200+2"
      ],
      "variants": [
        {
          "id": "101-1",
          "name": "Noir",
          "price": 129.99,
          "stock": 30
        },
        {
          "id": "101-2",
          "name": "Blanc",
          "price": 129.99,
          "stock": 18
        }
      ],
      "rating": 4.6,
      "reviewsCount": 23,
      "createdAt": "2024-11-10T09:00:00Z"
    },
    {
      "id": "102",
      "title": "Machine à Espresso MiniBar",
      "slug": "espresso-minibar",
      "description": "Machine espresso compacte 15 bar, bac à eau 1.2L, mode économie d'énergie.",
      "categoryId": 2,
      "category": {
        "id": 2,
        "name": "Maison & Cuisine",
        "slug": "maison-cuisine"
      },
      "price": 89.5,
      "currency": "EUR",
      "stock": 12,
      "sku": "MB-ESP01",
      "tags": [
        "cuisine",
        "coffee"
      ],
      "images": [
        "https://placehold.co/600x400/png/ffffff/000000?text=Espresso+MiniBar"
      ],
      "variants": [],
      "rating": 4.1,
      "reviewsCount": 8,
      "createdAt": "2025-02-03T12:30:00Z"
    },
    {
      "id": "103",
      "title": "T-shirt Organic Cotton - Unisexe",
      "slug": "tshirt-organic-cotton",
      "description": "T-shirt 100% coton biologique, coupe standard. Disponible en plusieurs tailles.",
      "categoryId": 3,
      "category": {
        "id": 3,
        "name": "Mode",
        "slug": "mode"
      },
      "price": 19,
      "currency": "EUR",
      "stock": 210,
      "sku": "TS-ORGCOT",
      "tags": [
        "vêtement",
        "eco"
      ],
      "images": [
        "https://i.postimg.cc/zvGqy4Z9/pexels-sam2piccs-10187850.jpg"
      ],
      "variants": [
        {
          "id": "103-S",
          "name": "S",
          "price": 19,
          "stock": 40
        },
        {
          "id": "103-M",
          "name": "M",
          "price": 19,
          "stock": 80
        },
        {
          "id": "103-L",
          "name": "L",
          "price": 19,
          "stock": 60
        },
        {
          "id": "103-XL",
          "name": "XL",
          "price": 19,
          "stock": 30
        }
      ],
      "rating": 4.4,
      "reviewsCount": 52,
      "createdAt": "2024-08-21T08:00:00Z"
    },
    {
      "id": "104",
      "title": "Palette Maquillage 12 Couches",
      "slug": "palette-maquillage-12",
      "description": "Palette compacte 12 fards, fini mat et pailleté, livré avec miroir.",
      "categoryId": 4,
      "category": {
        "id": 4,
        "name": "Beauté",
        "slug": "beaute"
      },
      "price": 29.95,
      "currency": "EUR",
      "stock": 75,
      "sku": "BEA-PA12",
      "tags": [
        "makeup",
        "palette"
      ],
      "images": [
        "https://i.postimg.cc/tJ49s8Gj/pexels-bertellifotografia-12446291.jpg"
      ],
      "variants": [],
      "rating": 4.2,
      "reviewsCount": 18,
      "createdAt": "2025-01-15T10:00:00Z"
    },
    {
      "id": "105",
      "title": "Lampe LED de Lecture",
      "slug": "lampe-led-lecture",
      "description": "Lampe LED à intensité réglable, bras flexible, port USB intégré.",
      "categoryId": 2,
      "category": {
        "id": 2,
        "name": "Maison & Cuisine",
        "slug": "maison-cuisine"
      },
      "price": 24.99,
      "currency": "EUR",
      "stock": 130,
      "sku": "LM-LED01",
      "tags": [
        "éclairage",
        "bureau"
      ],
      "images": [
        "https://i.postimg.cc/hGQnRSD2/image-1.png"
      ],
      "variants": [],
      "rating": 4.5,
      "reviewsCount": 34,
      "createdAt": "2024-09-30T14:20:00Z"
    },
    {
      "id": "106",
      "title": "Chargeur Rapide USB-C 30W",
      "slug": "chargeur-usb-c-30w",
      "description": "Charge rapide 30W compatible laptops, smartphones et tablettes.",
      "categoryId": 1,
      "category": {
        "id": 1,
        "name": "Électronique",
        "slug": "electronique"
      },
      "price": 17.5,
      "currency": "EUR",
      "stock": 300,
      "sku": "CH-30C",
      "tags": [
        "chargeur",
        "usb-c"
      ],
      "images": [
        "https://static.nike.com/a/images/t_prod_ss/w_640,c_limit,f_auto/66f0f8b2-8d4a-4201-b334-c1fdf9ca3e5e/air-max-270-chaussure-PgbqWd.png"
      ],
      "variants": [],
      "rating": 4.7,
      "reviewsCount": 91,
      "createdAt": "2024-06-05T09:45:00Z"
    },
    {
      "id": "107",
      "title": "Sac à Dos Urbain 20L",
      "slug": "sac-a-dos-urbain-20l",
      "description": "Sac à dos résistant à l'eau, poche laptop 15\", sangle poitrine.",
      "categoryId": 3,
      "category": {
        "id": 3,
        "name": "Mode",
        "slug": "mode"
      },
      "price": 54,
      "currency": "EUR",
      "stock": 64,
      "sku": "SB-URB20",
      "tags": [
        "sac",
        "outdoor"
      ],
      "images": [
        "https://i.postimg.cc/sxg3Mbdb/pexels-storiesofdesign-14768506.jpg"
      ],
      "variants": [
        {
          "id": "107-noir",
          "name": "Noir",
          "price": 54,
          "stock": 30
        },
        {
          "id": "107-bleu",
          "name": "Bleu",
          "price": 54,
          "stock": 24
        },
        {
          "id": "107-gris",
          "name": "Gris",
          "price": 54,
          "stock": 10
        }
      ],
      "rating": 4.3,
      "reviewsCount": 27,
      "createdAt": "2024-12-01T07:10:00Z"
    },
    {
      "id": "108",
      "title": "Set de Couteaux de Cuisine (5 pcs)",
      "slug": "set-couteaux-5pcs",
      "description": "Lames en acier inoxydable, manche ergonomique, bloc en bois inclus.",
      "categoryId": 2,
      "category": {
        "id": 2,
        "name": "Maison & Cuisine",
        "slug": "maison-cuisine"
      },
      "price": 39.99,
      "currency": "EUR",
      "stock": 40,
      "sku": "CK-SET5",
      "tags": [
        "cuisine",
        "couteaux"
      ],
      "images": [
        "https://i.postimg.cc/L8ZLq1Ng/pexels-melvin-buezo-1253763-2529147.jpg"
      ],
      "variants": [],
      "rating": 4,
      "reviewsCount": 12,
      "createdAt": "2024-10-05T11:00:00Z"
    },
    {
      "id": "101",
      "title": "Casque Bluetooth X200",
      "slug": "casque-bluetooth-x200",
      "description": "Casque sans fil avec réduction active du bruit, autonomie 30h, micro intégré.",
      "categoryId": 1,
      "category": {
        "id": 1,
        "name": "Électronique",
        "slug": "electronique"
      },
      "price": 129.99,
      "compareAtPrice": 159.99,
      "currency": "EUR",
      "stock": 48,
      "sku": "HB-X200",
      "tags": [
        "audio",
        "wireless",
        "bestseller"
      ],
      "images": [
        "https://i.postimg.cc/rmcVkKhm/pexels-vitalyagorbachev-11137016.jpg",
        "https://placehold.co/600x400/png/ffffff/000000?text=Casque+X200+2"
      ],
      "variants": [
        {
          "id": "101-1",
          "name": "Noir",
          "price": 129.99,
          "stock": 30
        },
        {
          "id": "101-2",
          "name": "Blanc",
          "price": 129.99,
          "stock": 18
        }
      ],
      "rating": 4.6,
      "reviewsCount": 23,
      "createdAt": "2024-11-10T09:00:00Z"
    },
    {
      "id": "102",
      "title": "Machine à Espresso MiniBar",
      "slug": "espresso-minibar",
      "description": "Machine espresso compacte 15 bar, bac à eau 1.2L, mode économie d'énergie.",
      "categoryId": 2,
      "category": {
        "id": 2,
        "name": "Maison & Cuisine",
        "slug": "maison-cuisine"
      },
      "price": 89.5,
      "currency": "EUR",
      "stock": 12,
      "sku": "MB-ESP01",
      "tags": [
        "cuisine",
        "coffee"
      ],
      "images": [
        "https://placehold.co/600x400/png/ffffff/000000?text=Espresso+MiniBar"
      ],
      "variants": [],
      "rating": 4.1,
      "reviewsCount": 8,
      "createdAt": "2025-02-03T12:30:00Z"
    },
    {
      "id": "103",
      "title": "T-shirt Organic Cotton - Unisexe",
      "slug": "tshirt-organic-cotton",
      "description": "T-shirt 100% coton biologique, coupe standard. Disponible en plusieurs tailles.",
      "categoryId": 3,
      "category": {
        "id": 3,
        "name": "Mode",
        "slug": "mode"
      },
      "price": 19,
      "currency": "EUR",
      "stock": 210,
      "sku": "TS-ORGCOT",
      "tags": [
        "vêtement",
        "eco"
      ],
      "images": [
        "https://i.postimg.cc/zvGqy4Z9/pexels-sam2piccs-10187850.jpg"
      ],
      "variants": [
        {
          "id": "103-S",
          "name": "S",
          "price": 19,
          "stock": 40
        },
        {
          "id": "103-M",
          "name": "M",
          "price": 19,
          "stock": 80
        },
        {
          "id": "103-L",
          "name": "L",
          "price": 19,
          "stock": 60
        },
        {
          "id": "103-XL",
          "name": "XL",
          "price": 19,
          "stock": 30
        }
      ],
      "rating": 4.4,
      "reviewsCount": 52,
      "createdAt": "2024-08-21T08:00:00Z"
    },
    {
      "id": "104",
      "title": "Palette Maquillage 12 Couches",
      "slug": "palette-maquillage-12",
      "description": "Palette compacte 12 fards, fini mat et pailleté, livré avec miroir.",
      "categoryId": 4,
      "category": {
        "id": 4,
        "name": "Beauté",
        "slug": "beaute"
      },
      "price": 29.95,
      "currency": "EUR",
      "stock": 75,
      "sku": "BEA-PA12",
      "tags": [
        "makeup",
        "palette"
      ],
      "images": [
        "https://i.postimg.cc/tJ49s8Gj/pexels-bertellifotografia-12446291.jpg"
      ],
      "variants": [],
      "rating": 4.2,
      "reviewsCount": 18,
      "createdAt": "2025-01-15T10:00:00Z"
    },
    {
      "id": "105",
      "title": "Lampe LED de Lecture",
      "slug": "lampe-led-lecture",
      "description": "Lampe LED à intensité réglable, bras flexible, port USB intégré.",
      "categoryId": 2,
      "category": {
        "id": 2,
        "name": "Maison & Cuisine",
        "slug": "maison-cuisine"
      },
      "price": 24.99,
      "currency": "EUR",
      "stock": 130,
      "sku": "LM-LED01",
      "tags": [
        "éclairage",
        "bureau"
      ],
      "images": [
        "https://i.postimg.cc/hGQnRSD2/image-1.png"
      ],
      "variants": [],
      "rating": 4.5,
      "reviewsCount": 34,
      "createdAt": "2024-09-30T14:20:00Z"
    },
    {
      "id": "106",
      "title": "Chargeur Rapide USB-C 30W",
      "slug": "chargeur-usb-c-30w",
      "description": "Charge rapide 30W compatible laptops, smartphones et tablettes.",
      "categoryId": 1,
      "category": {
        "id": 1,
        "name": "Électronique",
        "slug": "electronique"
      },
      "price": 17.5,
      "currency": "EUR",
      "stock": 300,
      "sku": "CH-30C",
      "tags": [
        "chargeur",
        "usb-c"
      ],
      "images": [
        "https://static.nike.com/a/images/t_prod_ss/w_640,c_limit,f_auto/66f0f8b2-8d4a-4201-b334-c1fdf9ca3e5e/air-max-270-chaussure-PgbqWd.png"
      ],
      "variants": [],
      "rating": 4.7,
      "reviewsCount": 91,
      "createdAt": "2024-06-05T09:45:00Z"
    },
    {
      "id": "107",
      "title": "Sac à Dos Urbain 20L",
      "slug": "sac-a-dos-urbain-20l",
      "description": "Sac à dos résistant à l'eau, poche laptop 15\", sangle poitrine.",
      "categoryId": 3,
      "category": {
        "id": 3,
        "name": "Mode",
        "slug": "mode"
      },
      "price": 54,
      "currency": "EUR",
      "stock": 64,
      "sku": "SB-URB20",
      "tags": [
        "sac",
        "outdoor"
      ],
      "images": [
        "https://i.postimg.cc/sxg3Mbdb/pexels-storiesofdesign-14768506.jpg"
      ],
      "variants": [
        {
          "id": "107-noir",
          "name": "Noir",
          "price": 54,
          "stock": 30
        },
        {
          "id": "107-bleu",
          "name": "Bleu",
          "price": 54,
          "stock": 24
        },
        {
          "id": "107-gris",
          "name": "Gris",
          "price": 54,
          "stock": 10
        }
      ],
      "rating": 4.3,
      "reviewsCount": 27,
      "createdAt": "2024-12-01T07:10:00Z"
    },
    {
      "id": "108",
      "title": "Set de Couteaux de Cuisine (5 pcs)",
      "slug": "set-couteaux-5pcs",
      "description": "Lames en acier inoxydable, manche ergonomique, bloc en bois inclus.",
      "categoryId": 2,
      "category": {
        "id": 2,
        "name": "Maison & Cuisine",
        "slug": "maison-cuisine"
      },
      "price": 39.99,
      "currency": "EUR",
      "stock": 40,
      "sku": "CK-SET5",
      "tags": [
        "cuisine",
        "couteaux"
      ],
      "images": [
        "https://i.postimg.cc/L8ZLq1Ng/pexels-melvin-buezo-1253763-2529147.jpg"
      ],
      "variants": [],
      "rating": 4,
      "reviewsCount": 12,
      "createdAt": "2024-10-05T11:00:00Z"
    }
  ]