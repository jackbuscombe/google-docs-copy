import Image from 'next/image'
import Button from '@material-tailwind/react/Button'
import Icon from '@material-tailwind/react/Icon'
import { useSession, signOut } from 'next-auth/react'

function Header() {
  const { data: session } = useSession()

  return (
    <header className="sticky top-0 z-50 flex items-center bg-white px-4 py-2 shadow-md">
      {/* Header Left */}
      <div className="flex">
        {/* <MenuIcon /> */}
        <Button
          color="gray"
          buttonType="outline"
          rounded={true}
          iconOnly={true}
          ripple="dark"
          className="h-20 w-20 border-0 md:inline-flex"
        >
          <Icon name="menu" size="3xl" />
        </Button>
        <div className="group flex cursor-pointer items-center">
          {/* <Image
            src="https://www.gstatic.com/images/branding/product/2x/docs_2020q4_48dp.png"
            height={90}
            width={60}
          /> */}
          <Icon name="description" size="5xl" color="blue" />
          <h2 className="ml-2 cursor-pointer text-2xl text-gray-700 group-hover:underline md:inline-flex">
            Docs
          </h2>
        </div>
      </div>

      {/* Header Middle */}
      <div className="mx-5 flex flex-grow items-center rounded-lg bg-gray-100 px-5 py-2 text-gray-600 focus-within:text-gray-600 focus-within:shadow-md md:mx-20">
        <Icon name="search" size="3xl" color="darkgray" />
        <input
          className="flex-grow bg-transparent px-3 text-base outline-none"
          placeholder="Search"
        />
      </div>

      {/* Header Right */}
      <div className="flex items-center">
        <Button
          color="gray"
          buttonType="outline"
          rounded={true}
          iconOnly={true}
          ripple="dark"
          className="ml-5 h-20 w-20 border-0 md:ml-20"
        >
          <Icon name="apps" size="3xl" color="gray" />
        </Button>
        <img
          loading="lazy"
          onClick={signOut}
          src={session?.user?.image}
          alt=""
          className="ml-2 h-12 w-12 cursor-pointer rounded-full"
        />
      </div>
    </header>
  )
}
export default Header
