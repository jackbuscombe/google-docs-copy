import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
import Button from '@material-tailwind/react/Button'
import Icon from '@material-tailwind/react/Icon'
import { useSession, signIn, signOut, getSession } from 'next-auth/react'
import Login from '../components/Login'
import Modal from '@material-tailwind/react/Modal'
import ModalBody from '@material-tailwind/react/ModalBody'
import ModalFooter from '@material-tailwind/react/ModalFooter'
import { useEffect, useState } from 'react'
import { db } from '../firebase'
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  getFirestore,
  orderBy,
  query,
  onSnapshot,
} from 'firebase/firestore'
import DocumentRow from '../components/DocumentRow'

const Home = () => {
  const [showModal, setShowModal] = useState(false)
  const [input, setInput] = useState('')
  const [documents, setDocuments] = useState([])
  const { data: session, status } = useSession()

  useEffect(() => {
    if (!session) return

    const q = query(
      collection(db, 'userDocs', session?.user?.email, 'docs'),
      orderBy('timestamp', 'desc')
    )
    onSnapshot(q, (snapshot) => {
      console.log('snapshot', snapshot.docs)
      setDocuments(snapshot.docs)
      console.log(snapshot.docs[0].id)
    })
  }, [session])

  const createDocument = () => {
    if (!input) return

    addDoc(collection(db, 'userDocs', session.user.email, 'docs'), {
      fileName: input,
      timestamp: serverTimestamp(),
    })

    setInput('')
    setShowModal(false)
  }

  const modal = (
    <Modal size="sm" active={showModal} toggler={() => setShowModal(false)}>
      <ModalBody>
        <h2 className="mb-6 text-lg">Create New Document</h2>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full outline-none"
          placeholder="Enter document title..."
          onKeyDown={(e) => e.key === 'Enter' && createDocument()}
        />
      </ModalBody>
      <ModalFooter>
        <Button
          color="blue"
          buttonType="link"
          ripple="dark"
          className="mt-10 w-44"
          onClick={(e) => setShowModal(false)}
        >
          Cancel
        </Button>

        <Button ripple="light" className="mt-10 w-44" onClick={createDocument}>
          Create
        </Button>
      </ModalFooter>
    </Modal>
  )

  if (!session) return <Login />

  return (
    <div className="">
      <Head>
        <title>Google Docs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      {modal}

      <section className="bg-[#F8F9FA] px-10 pb-10">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center justify-between py-6">
            <h2 className="text-lg text-gray-700">Start a new document</h2>
            <Button
              color="gray"
              buttonType="outline"
              rounded={true}
              iconOnly={true}
              ripple="dark"
              className="border-0"
            >
              <Icon name="more_vert" size="3xl" />
            </Button>
          </div>

          <div>
            <div
              onClick={() => setShowModal(true)}
              className="relative h-52 w-40 cursor-pointer border-2 hover:border-blue-700"
            >
              <Image
                src="https://ssl.gstatic.com/docs/templates/thumbnails/docs-blank-googlecolors.png"
                layout="fill"
              />
            </div>
            <p className="ml-2 mt-2 text-sm font-semibold text-gray-700">
              Blank
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white px-10 md:px-0">
        <div className="mx-auto max-w-3xl py-8 text-sm text-gray-700">
          <div className="flex items-center justify-between pb-5">
            <h2 className="flex-grow font-medium">Recent documents</h2>
            <p className="mr-12 cursor-pointer hover:underline">Date created</p>
            <Icon name="folder" size="3xl" color="gray" />
          </div>
          {documents?.map((doc) => (
            <DocumentRow
              key={doc.id}
              id={doc.id}
              fileName={doc.data().fileName}
              timestamp={doc.data().timestamp}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home

export async function getServerSideProps(context) {
  const session = await getSession(context)

  return {
    props: {
      session,
    },
  }
}
