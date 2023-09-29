import { IMenu } from "@/pages/menu";
import { removeData, storeData } from "..";

const menuDefaults:IMenu[] = [
    {
      id: 996756,
      name: 'Ayam Kecap Manis'
    },
    {
      id: 362342,
      name: 'Nasi Goreng Spesial'
    },
];
export const resetData = () => {
    removeData('order')
    removeData('menus')
    storeData('menus', menuDefaults)
}