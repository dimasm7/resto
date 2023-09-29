import Link from "next/link"
import { useRouter } from "next/router"

interface IMenu {
  name: string,
  url: string
}

const MenuWeb = ({name, url}:IMenu) => {
  const router = useRouter()
  return (
    <Link href={url} className={'p-1 px-6' + (router.pathname == '/'+url ? ' bg-slate-300' : '')}>
      <span>{name}</span>
    </Link>
  )
}

export default MenuWeb