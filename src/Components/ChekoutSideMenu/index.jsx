import "./styles.css"
import { useContext } from 'react';
import { Link } from "react-router-dom";
import { ShoppingCartContext } from '../../Context';
import { XMarkIcon } from '@heroicons/react/24/solid'
import OrderCard from "../../Components/OrderCard"
import {totalPrice} from '../../utils'

const ChekoutSideMenu = () => {
  const context = useContext(ShoppingCartContext)


    const handleCheckout = () => {
        const orderToAdd = {
            products: context.productsCart,
            totalProducts: context.productsCart.length, //--------My Orders Props
            totalPrice: totalPrice(context.productsCart), //--------My Order Props
            orderDate: new Date().toLocaleDateString(), // Agrega la fecha actual
        }
        context.setProductsCart([])
        context.setOrder([...context.order, orderToAdd])
        context.setCount(0); // ----------------------------------------Restablece el contador a 0
        context.setSearchByTitle(null)//--restablece el valor de el buscador a null cuando se recarga--
    };

    return(
        <aside className={`${context.isSideMenuOpen ? 'flex' : 'hidden'} checkout-side-menu 
        bg-white border border-blue-500
        flex-col overflow-y-auto fixed right-0 rounded-lg text-black`}>
            <div className="flex justify-between items-center p-7 cursor-pointer">
                <h2 className='font-medium text-xl'>My Order</h2>
                <button onClick = {() => context.closeProductDetail()}>
                <XMarkIcon
                    className='h-6 w-6 text-black cursor-pointer'
                    onClick={() => context.closeSideMenu()}></XMarkIcon>
                </button>
            </div>
            <div className='px-6 overflow-y-scroll flex-1'>
            {
                context.productsCart && context.productsCart.map(product => (
                    <OrderCard
                        key={product.id}
                        id={product.id}
                        title={product.title}
                        imageUrl={product.image}
                        price={product.price}
                        handleDelet={context.handleDelet}
                    />
                ))
            }
            </div>
            <div className="px-6 mb-2">
                <p className="flex justify-between items-center">
                    <span className='font-ligth font-bold'>Total: </span>
                    <span className='font-medium text-2xl'>$ {totalPrice(context.productsCart)}</span>
                </p>
            </div>
            <Link to = '/MyOrders'>
                <button 
            className = 
            'w-full bg-gradient-to-r from-cyan-500/75 via-blue-700/75 to-cyan-500/75 text-white rounded-lg mb-7'
            onClick={()=> handleCheckout()}>
                Pick Up
                </button>
            </Link>
        </aside>
    )

} 
export default ChekoutSideMenu