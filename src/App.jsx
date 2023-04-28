import toast, { Toaster } from "react-hot-toast";
import './App.css';

function App() {


  return (
    <>
      <h1 onClick={() => toast.success("welcome here!")}>Inventory management system (MERN)</h1>
      <Toaster position="top-right"
        reverseOrder={false} />

    </>
  )
}

export default App
