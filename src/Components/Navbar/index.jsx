import { useContext } from 'react'
import {NavLink} from 'react-router-dom'
import { ShoppingCartContext } from '../../Context';
import { ShoppingBagIcon } from '@heroicons/react/24/solid'


const Navbar = () => {
    const context = useContext(ShoppingCartContext)
    const { setSearchByCategory } = context
    const activeStyle = 'underline underline-offset-4'
    const OpenShoppingBag = () => { 
        context.openSideMenu()
    }
//-----------Sign Out
    const signOut = localStorage.getItem('sign-out')
    const parsedSignOut = JSON.parse(signOut)
    const isUserSignOut = context.signOut || parsedSignOut

    const handleSignOut = () => {
        const stringifiedSignOut = JSON.stringify(true)
        localStorage.setItem('sign-out', stringifiedSignOut)
        context.setSignOut(true)
    }

        const renderView = () => {
            if(isUserSignOut){
                return(
                    <NavLink 
                    to="/SignIn"
                    className = {({ isActive }) => isActive ? activeStyle : undefined }
                    onClick={() => handleSignOut()}><a className='text-white'>Sign In</a></NavLink>
                )
            }
            else{
                return(
                    <>
                        <li className='text-white'><NavLink to="/MyOrders">My Orders</NavLink></li>
                        <li className='text-white'><NavLink to="/MyAcount">My Acount</NavLink></li>
                        <li className='text-white'>
                            <NavLink 
                            to="/SignIn"
                            className = {({ isActive }) => isActive ? activeStyle : undefined }
                            onClick={() => handleSignOut()}><a className='text-white'>Sign Out</a></NavLink>
                        </li>
                    </>
                )
            }
        }

    return(
        <nav className="bg-gradient-to-r from-blue-700 via-cyan-500 to-blue-600 flex justify-between items-center fixed z-10 w-full top-0 py-5 px-8 font-light text-sm">
            <ul className="flex items-center gap-3">
                <li className="font-semibold text-lg text-white"><NavLink to="/">Vite-Shop</NavLink></li>

                <li className='text-white'><NavLink 
                to='/'
                onClick={()=> setSearchByCategory()}
                className = {({ isActive }) => isActive ? activeStyle : undefined }>
                    All
                </NavLink></li>

                <li className='text-white'><NavLink 
                to="/mensclothing"
                onClick={()=> setSearchByCategory("men's clothing")}
                className = {({ isActive }) => isActive ? activeStyle : undefined }>
                    Men´s Clothing
                </NavLink></li>

                <li className='text-white'><NavLink 
                to="/womensclothing"
                onClick={()=> setSearchByCategory("women's clothing")}
                className = {({ isActive }) => isActive ? activeStyle : undefined }>
                    Women´s Clothing
                </NavLink></li>

                <li className='text-white'><NavLink 
                to="/electronics"
                onClick={()=> setSearchByCategory("electronics")}
                className = {({ isActive }) => isActive ? activeStyle : undefined }>
                    Electronics
                </NavLink></li>

                <li className='text-white'><NavLink 
                to="/jewelry"
                onClick={()=> setSearchByCategory("jewelery")}
                className = {({ isActive }) => isActive ? activeStyle : undefined }>
                    Jewelry
                </NavLink></li>
            </ul>

            <ul className="flex items-center gap-3">
                {renderView()}
                <li className='text-white p-1 flex items-center'>
                    <ShoppingBagIcon 
                    onClick = {() => OpenShoppingBag()}
                    className='h-6 w-6'></ShoppingBagIcon>

                    <div>
                        {context.productsCart.length}
                    </div>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
/*Line 5 styles: using flexbox justify-between and items center to separete the right navbar 
of the left navbar widht full (para que sea lo suficientemente grande para aceptar el justify between)
px and py padding of the ul tags,*/

/*line 6 and 16 styles: space between items */
/*Lines 12, 16, 20, 24, 28, 32. className = {({ isActive }) => isActive ? activeStyle : undefined }
When building a navigation menu, such as a breadcrumb or a set of tabs where you'd like to show which 
of them is currently selected*/