import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { EditorState } from 'draft-js'
import { db } from '../firebase'
import { collection, doc, setDoc, getDoc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { convertFromRaw, convertToRaw } from 'draft-js'
import { useSession } from 'next-auth/react'

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((module) => module.Editor),
  {
    ssr: false,
  }
)

function TextEditor() {
  const { data: session } = useSession()
  const router = useRouter()
  const { id } = router.query
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  useEffect(() => {
    if (!session || !db || !id) return

    const getEditorState = async () => {
      const docRef = doc(db, 'userDocs', session?.user?.email, 'docs', id)
      const docSnap = await getDoc(docRef)
      if (docSnap.data().editorState) {
        const fetchedEditorState = EditorState.createWithContent(
          convertFromRaw(docSnap?.data()?.editorState)
        )
        setEditorState(fetchedEditorState)
      }
    }
    getEditorState()
  }, [session, db, id])

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState)

    const docRef = doc(db, 'userDocs', session.user.email, 'docs', id)
    setDoc(
      docRef,
      {
        editorState: convertToRaw(editorState.getCurrentContent()),
      },
      { merge: true }
    )
  }

  console.log(editorState)

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-16">
      <Editor
        toolbarClassName="flex sticky top-0 z-50 !justify-center mx-auto"
        editorClassName="mt-6 bg-white shadow-lg max-w-4xl mx-auto mb-12 border p-10"
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
      />
    </div>
  )
}
export default TextEditor
