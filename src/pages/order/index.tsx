import { Nav } from "@/components";
import { addRowData, getData, storeData } from "@/utils";
import { useEffect, useState } from "react";
import { IMenu } from "../menu";
import { resetData } from "@/utils/reset";
import FlashMessage from "@/components/molecules/FlashMessage";

export interface IOrder{
  id:number,
  menuId:number,
  qty:number,
  tableId:number
}

const Order = () => {
  const [table, setTable] = useState(0)
  const [showMessage, setShowMessage] = useState(false)
  const pickTable = (nomor:number) => {
    if(table == nomor) setTable(0)
    else setTable(nomor)
  }

  const [listMenus, setListMenus] = useState([])
  const [qty, setQty] = useState(0)
  const [menu, setMenu] = useState(0)
  useEffect(() => {
    const cekMenu = getData('menus')
    if(cekMenu == null) resetData()
    setListMenus(cekMenu ?? [])
  },[])

  const addOrder = () => {
    const min = 1
    const max = 1000000
    const randomId = Math.floor(Math.random() * (max - min + 1)) + min
    const dataOrder:IOrder = {
      id: randomId,
      tableId:table,
      menuId:menu,
      qty:qty
    }
    if(getData('order')) addRowData('order', dataOrder)
    else storeData('order', [dataOrder])

    resetAction()
  }

  const resetAction = () => {
    setTable(0)
    setMenu(0)
    setQty(0)
  }

  const handleButtonReset = () => {
    resetData()
    resetAction()
    setListMenus(getData('menus') ?? [])
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
        <div className="flex border rounded-md">
          <div 
            className={`flex-1 p-2 text-center cursor-pointer transition-colors text-foreground text-sm h-[60px] flex items-center justify-center rounded-l-md ` + (table == 1 ? "bg-black hover:bg-black text-white" : "bg-white")}
            onClick={() => pickTable(1)}
          >
            Meja 1
          </div>
          <div 
            className={"flex-1 p-2 text-center cursor-pointer transition-colors text-foreground text-sm h-[60px] flex items-center justify-center border-x " + (table == 2 ? "bg-black hover:bg-black text-white" : "bg-white")}
            onClick={() => pickTable(2)} 
          >
            Meja 2
          </div>
          <div 
            className={`flex-1 p-2 text-center cursor-pointer transition-colors text-foreground text-sm h-[60px] flex items-center justify-center rounded-r-md ` + (table == 3 ? "bg-black hover:bg-black text-white" : "bg-white")}
            onClick={() => pickTable(3)} 
          >
            Meja 3
          </div>
        </div>
        <div className="flex space-x-2">
          <div className="space-y-1 w-full">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Menu</label>
            <select value={menu} onChange={(e) => setMenu(parseInt(e.target.value, 10))} name="menu" className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-muted-foreground">
              <option value="">Pilih menu</option>
              {
                listMenus.map((item:IMenu) => (
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))
              }
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Jumlah</label>
            <select value={qty} onChange={(e) => setQty(parseInt(e.target.value, 10))} name="qty" className="flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-[140px] text-muted-foreground">
              <option value="">Kuantitas</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
        </div>
        <div className="text-right">
          <button onClick={addOrder} className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-black text-white hover:bg-gray-800 h-10 px-4 py-2 w-[100px]" disabled={qty && menu && table ? false : true}>Tambah</button>
        </div>
      </div>
    </main>
  )
}
export default Order;