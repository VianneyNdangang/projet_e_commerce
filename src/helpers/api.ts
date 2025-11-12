import axios from "axios";
// import { useEffect, useState } from "react";

// export const fechdata= () =>{
// const [datas, setDatas] = useState <any[]>();
 export const instance = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});

// useEffect(() => {
//   const load = async () => {
//     const resp = await items();
//     const dd = resp.data;
//     setDatas(dd);
//   };
//   load();
// }, []);
//   return datas
// }