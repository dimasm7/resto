import { Nav } from "@/components";
import FlashMessage from "@/components/molecules/FlashMessage";
import { addRowData, getData, removeRowData } from "@/utils";
import { resetData } from "@/utils/reset";
import { useEffect, useState } from "react";

export interface IMenu{
  id:number,
  name:string
}

const Menu = () => {
  const [listMenu, setListMenu] = useState([])
  const [newItemMenu, setNewItemMenu] = useState('')
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    const cekMenu = getData('menus')
    if(cekMenu == null) resetData()
    setListMenu(getData('menus'))
  },[]);
  
  const addItemMenu = () => {
    const min = 1
    const max = 1000000
    
    const randomId = Math.floor(Math.random() * (max - min + 1)) + min
      
    if(newItemMenu) addRowData('menus', {id:randomId, name:newItemMenu})
    setNewItemMenu('')
    setListMenu(getData('menus'))
  }

  const removeItemMenu = (index:number) => {
    removeRowData('menus', index)
    setListMenu(getData('menus'))
  }

  const handleButtonReset = () => {
    resetData()
    setListMenu(getData('menus'))
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

      <div className="bg-white mt-3 p-4 min-h-[300px] w-[650px]">
        <span>Menu Makanan</span>
        <div className="flex mb-4">
          <input 
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500" 
            type="text" 
            placeholder="Tambahkan disini"
            value={newItemMenu}
            onChange={e => {setNewItemMenu(e.currentTarget.value)}}
          />
          <div className="ml-4">
            <button className="rounded-lg p-3 bg-cyan-500 disabled:bg-cyan-200 enabled:hover:bg-cyan-400 mt-1 text-white" onClick={addItemMenu} disabled={newItemMenu ? false : true}>Tambah</button>
          </div>
        </div>
        <table className="w-full caption-bottom text-sm">
          <thead className="[&_tr]:border-b">
            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 w-[100px]">ID</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">Name</th>
              <th className="h-12 px-4 align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 text-right">Hapus?</th>
            </tr>
          </thead>
          <tbody>
            {
              listMenu.map((menu:IMenu, index) => (
                <tr key={menu.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 font-medium">{menu.id}</td>
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">{menu.name}</td>
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 flex justify-end">
                    <button onClick={() => removeItemMenu(index)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-300 hover:text-red-500 cursor-pointer"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></svg>
                    </button>
                  </td>
                </tr>
                )
              )
            }
          </tbody>
        </table>
      </div>
    </main>
  )
}
export default Menu;