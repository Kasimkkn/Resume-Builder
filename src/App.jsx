import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import { Toaster } from 'react-hot-toast'
const App = () => {
  return (
    <>
    <Header/>
    <Outlet />
    <Toaster position="top-center"/>
  </>
  )
}

export default App