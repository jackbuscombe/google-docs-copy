import Image from 'next/image'
import Button from '@material-tailwind/react/Button'
import { useSession, signIn, signOut } from 'next-auth/react'

function Login() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Image
        src="https://www.gstatic.com/images/branding/product/2x/docs_2020q4_48dp.png"
        height={180}
        width={120}
        objectFit="contain"
      />
      <Button
        color="blue"
        buttonType="filled"
        ripple="light"
        className="mt-10 w-44"
        onClick={signIn}
      >
        Login
      </Button>
    </div>
  )
}
export default Login
