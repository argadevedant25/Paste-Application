import Navbar from './components/Navbar'
import Home from './components/Home'
import ViewPaste from './components/ViewPaste'
import './App.css'
import Paste from './components/Paste'
import { RouterProvider } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter(
  [
  {
    path:"/",
    element:
    <div>
      <Navbar />
      <Home />
    </div>
  },
  {
    path:"/pastes",
    element:
    <div>
      <Navbar/>
      <Paste />
    </div>
  },
  {
    path:"/pastes/:id",
    element:
    <div>
      <Navbar />
      <ViewPaste/>
    </div>
  },
]
)

function App() {
  return (
    <div>
      <RouterProvider router = {router}/>
    </div>
  )
}

export default App
