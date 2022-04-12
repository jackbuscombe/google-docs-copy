import Button from '@material-tailwind/react/Button'
import Icon from '@material-tailwind/react/Icon'
import { getSession, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Login from '../../components/Login'
import { collection, doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../../firebase'
import TextEditor from '../../components/TextEditor'
// import { useDocumentOnce } from 'react-firebase-hooks/firestore'

const Doc = () => {
  const router = useRouter()
  const { id } = router.query
  const { data: session, status } = useSession()
  const [document, setDocument] = useState()

  useEffect(() => {
    if (!session || !db || !id) return

    const getDocument = async () => {
      const docRef = doc(db, 'userDocs', session?.user?.email, 'docs', id)
      const docSnap = await getDoc(docRef)
      setDocument(docSnap.data())
    }
    getDocument()
  }, [session, db, id])

  if (!session) return <Login />

  return (
    <div>
      <header className="flex items-center justify-between p-3 pb-1">
        <span onClick={() => router.push('/')} className="cursor-pointer">
          <Icon name="description" size="5xl" color="blue" />
        </span>

        <div className="flex-grow px-2">
          <h2 className="">{document?.fileName}</h2>
          <div className="-ml-1 flex h-8 items-center space-x-1 text-sm text-gray-600">
            <p className="option">File</p>
            <p className="option">Edit</p>
            <p className="option">View</p>
            <p className="option">Insert</p>
            <p className="option">Format</p>
            <p className="option">Tools</p>
          </div>
        </div>
        <Button
          color="lightBlue"
          buttonType="filled"
          size="regular"
          className="hidden h-10 md:!inline-flex"
          rounded={false}
          block={false}
          iconOnly={false}
          ripple="light"
        >
          <Icon name="people" size="md" /> SHARE
        </Button>

        <img
          className="ml-2 h-10 w-10 cursor-pointer rounded-full"
          src={session.user.image}
          alt=""
        />
      </header>

      <TextEditor />
    </div>
  )
}
export default Doc

export async function getServerSideProps(context) {
  const session = await getSession(context)

  return {
    props: {
      session,
    },
  }
}
