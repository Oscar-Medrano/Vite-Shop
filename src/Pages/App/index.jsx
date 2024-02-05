import { useContext } from 'react'
import { useRoutes, BrowserRouter, Navigate } from 'react-router-dom'
import '../../App.css'
import {ShoppingCartProvider, initializeLocalStorage, ShoppingCartContext} from '../../Context/index'
import Home from '../Home'
import MyAcount from '../MyAcount'
import MyOrder from '../MyOrder'
import MyOrders from '../MyOrders'
import NotFound from '../NotFound'
import SignIn from '../SignIn'
import Navbar from '../../Components/Navbar'
import ChekoutSideMenu from '../../Components/ChekoutSideMenu'

const AppRoutes = () => {
  const context = useContext(ShoppingCartContext)
  // Account
  const account = localStorage.getItem('account')
  const parsedAccount = JSON.parse(account)
  // Sign Out
  const signOut = localStorage.getItem('sign-out')
  const parsedSignOut = JSON.parse(signOut)
  // Has an account
  const noAccountInLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true
  const noAccountInLocalState = Object.keys(context.account).length === 0
  const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState
  const isUserSignOut = context.signOut || parsedSignOut

  let routes = useRoutes([
    { path: '/', element: hasUserAnAccount && !isUserSignOut ? <Home /> : <Navigate replace to={'../SignIn'} /> },
    { path: '/mensclothing', element: hasUserAnAccount && !isUserSignOut ? <Home /> : <Navigate replace to={'../SignIn'} /> },
    { path: '/womensclothing', element: hasUserAnAccount && !isUserSignOut ? <Home /> : <Navigate replace to={'../SignIn'} /> },
    { path: '/electronics', element: hasUserAnAccount && !isUserSignOut ? <Home /> : <Navigate replace to={'../SignIn'} /> },
    { path: '/jewelry', element: hasUserAnAccount && !isUserSignOut ? <Home /> : <Navigate replace to={'../SignIn'} /> },

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
  initializeLocalStorage()

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