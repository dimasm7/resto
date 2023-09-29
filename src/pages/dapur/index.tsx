import { Nav } from "@/components";
import { getData } from "@/utils";
import { useEffect, useState } from "react";
import { IOrder } from "../order";
import { IMenu } from "../menu";
import { resetData } from "@/utils/reset";
import FlashMessage from "@/components/molecules/FlashMessage";

const Dapur = () => {
  const [listOrder, setListOrder] = useState([])
  const [menus, setMenus] = useState([])
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    const cekMenu = getData('menus')
    if(cekMenu == null) resetData();
    setListOrder(getData('order') ?? [])
    setMenus(cekMenu ?? [])
  },[])

  const handleButtonReset = () => {
    resetData();
    setListOrder(getData('order') ?? [])
    setShowMessage(true)
    setTimeout(() => {
      setShowMessage(false)
    }, 2000)
  }

  return (
    <main className={`flex min-h-screen flex-col p-24 w-max`}>
      <h1 className="text-2xl font-bold mb-4">Order Ambisius Resto</h1>
      {
        showMessage ?
          <FlashMessage/>
        : null
      }
      <Nav reset={handleButtonReset} />
      <div className="bg-white mt-3 p-4 space-y-3 min-h-[300px] w-[650px]">
        <div className="flex">
          <div className="w-1/3 space-y-4">
            <h3 className="font-semibold text-xl leading-none">Meja 1</h3>
            <div className="space-y-1">
              {
                listOrder.map((item:IOrder) => (
                  item.tableId == 1 ?(
                    menus.map((menu:IMenu) => (
                      item.menuId == menu.id ? <div key={item.id} className="flex"><span className="w-[30px]">{item.qty}x</span> <p>{menu.name}</p></div> : null
                    ))
                  ):(
                    null
                  )
                ))
              }
            </div>
          </div>
          <div className="w-1/3 space-y-4">
            <h3 className="font-semibold text-xl leading-none">Meja 2</h3>
            <div className="space-y-1">
              {
                listOrder.map((item:IOrder) => (
                  item.tableId == 2 ?(
                    menus.map((menu:IMenu) => (
                      item.menuId == menu.id ? <div key={item.id} className="flex"><span className="w-[30px]">{item.qty}x</span> <p>{menu.name}</p></div> : null
                    ))
                  ):(
                    null
                  )
                ))
              }
            </div>
          </div>
          <div className="w-1/3 space-y-4">
            <h3 className="font-semibold text-xl leading-none">Meja 3</h3>
            <div className="space-y-1">
              {
                listOrder.map((item:IOrder) => (
                  item.tableId == 3 ?(
                    menus.map((menu:IMenu) => (
                      item.menuId == menu.id ? <div key={item.id} className="flex"><span className="w-[30px]">{item.qty}x</span> <p>{menu.name}</p></div> : null
                    ))
                  ):(
                    null
                  )
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
export default Dapur;