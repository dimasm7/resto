import { Nav } from "@/components";
import { getData, storeData } from "@/utils";
import { useEffect, useState } from "react";
import { IOrder } from "../order";
import { IMenu } from "../menu";
import { resetData } from "@/utils/reset";
import FlashMessage from "@/components/molecules/FlashMessage";

interface IList{
  qty: number,
  menu: string,
  price: string,
}
const Kasir = () => {
  const listTableId:number[] = []
  const [listOrder, setListOrder] = useState<IOrder[]>([])
  const [menus, setMenus] = useState<IMenu[]>([])
  const [noTable, setNoTable] = useState<number>(0)
  const [listStruk, setListStruk] = useState<IList[]>([])
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    const cekMenu = getData('menus')
    if(cekMenu == null) resetData()
    setMenus(cekMenu ?? [])
    setListOrder(getData('order') ?? [])
  },[])

  for(let i=0; i < listOrder.length; i++){
    const order:IOrder = listOrder[i]
    if (!listTableId.includes(order?.tableId)) {
      listTableId.push(order?.tableId)
    }
  }
  listTableId.sort((a:number, b:number) => a - b)
  
  const print = () =>{
    const list = []
    const listOrderByTable = listOrder.filter((item:IOrder) => item.tableId == noTable)
    for(let i=0; i < listOrderByTable.length; i++){
      const order:IOrder = listOrderByTable[i]
      let menuTitle = ''
      for(let k=0; k < menus.length; k++){
        if(order?.menuId == menus[k]?.id){
          menuTitle = menus[k]?.name
        }
      }
      const data = {
        qty: order?.qty,
        menu: menuTitle,
        price: 'Gratis'
      }
      list.push(data)
    }
    setListStruk(list)
  }
  
  const removeOrder = () => {
    const newListOrder = listOrder.filter((item:IOrder) => item.tableId != noTable)
    storeData('order', newListOrder)
    setListStruk([])
    setNoTable(0)
    setListOrder(getData('order'))
  }
  const handleButtonReset = () => {
    removeOrder()
    resetData()
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
        <div className="space-y-4 w-full">
          <h3 className="font-semibold text-xl leading-none">Meja </h3>
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              <select value={noTable} onChange={(e) => setNoTable(parseInt(e.target.value, 10))} name="menu" className="flex h-10 w-full items-center justify-between rounded-md border border-input px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-muted-foreground">
                <option value="">Nomor meja</option>
                {
                  listTableId.map((item:number) => (
                    <option key={item} value={item}>{item}</option>
                  ))
                }
              </select>
              <button onClick={print} disabled={noTable > 0 ? false : true} className="inline-flex min-w-fit items-center justify-center rounded-md text-sm font-medium bg-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-white hover:bg-primary/90 h-10 px-4 py-2">
                Print struk
              </button>
            </div>
            {
              noTable > 0 ?
              <button onClick={removeOrder} className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-red-500 text-white hover:bg-destructive/90 h-10 px-4 py-2">Kosongkan Meja</button>
              : null
            }
          </div>
        </div>
        {
          listStruk.length > 0 ?
            <div className="w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b">
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 text-right w-[100px]">Jumlah</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">Menu</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 w-[100px]">Harga</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    listStruk.map((item:any, idx:number) => (
                      <tr key={idx} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 font-medium text-right">{item.qty}</td>
                        <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">{item.menu}</td>
                        <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">{item.price}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          : null
        }
      </div>
    </main>
  )
}
export default Kasir;