import AuthPage from "./componants/AuthPage"
import ListKanban from "./componants/ListKanban"


function App() {

  return (
    <>
    <ListKanban/>
    <h1 className="text-3xl font-bold underline text-red-700 flex justify-center">
      MEME
    </h1>
    <AuthPage/>
    </>
  )
}

export default App
