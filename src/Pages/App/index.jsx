import { useRoutes, BrowserRouter } from 'react-router-dom'
import '../../App.css'
import {ShoppingCartProvider} from '../../Context/index'
import Home from '../Home'
import MyAcount from '../MyAcount'
import MyOrder from '../MyOrder'
import MyOrders from '../MyOrders'
import NotFound from '../NotFound'
import SignIn from '../SignIn'
import Navbar from '../../Components/Navbar'
import ChekoutSideMenu from '../../Components/ChekoutSideMenu'

const AppRoutes = () => {
  let routes = useRoutes([
    {path: '/', element: <Home />},
    {path: '/mensclothing', element: <Home />},
    {path: '/womensclothing', element: <Home />},
    {path: '/electronics', element: <Home />},
    {path: '/jewelry', element: <Home />},

    
    {path: '/MyAcount', element: <MyAcount />},
    {path: '/MyOrder', element: <MyOrder />},
    {path: '/MyOrders', element: <MyOrders />},
    {path: '/MyOrders/:id', element: <MyOrder />},
    {path: '/MyOrders/last', element: <MyOrder />},
    {path: '/*', element: <NotFound />}, /* * esto significa cualquier otra ruta */
    {path: '/SignIn', element: <SignIn />},
  ])
  return routes
}
const App = () => {
  return (
    <>
    <ShoppingCartProvider>
      <BrowserRouter>
        <AppRoutes />
        <Navbar />
        <ChekoutSideMenu />
      </BrowserRouter>
    </ShoppingCartProvider>
    </>
  )
}

export default App