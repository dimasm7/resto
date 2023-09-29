import { MenuWeb } from "@/components";
import ButtonReset from "@/components/atoms/ButtonReset";

const menus = [
    {
      id: 1,
      name:'Menu',
      url: 'menu'
    }, 
    {
      id: 2,
      name:'Order',
      url: 'order'
    }, 
    {
      id: 3,
      name:'Dapur',
      url: 'dapur'
    }, 
    {
      id: 4,
      name:'Kasir',
      url: 'kasir'
    }
];

const Nav = ({reset}:any) => {

  return (
    <div className="flex justify-between">
      <div className="flex p-1 bg-white w-max">
        {menus.map(item => (
            <MenuWeb key={item.id} name={item.name} url={item.url} />
        ))}
      </div>
      <ButtonReset onclick={reset}/>
    </div>
  )
}

export default Nav;