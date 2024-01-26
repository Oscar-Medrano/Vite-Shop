import "./styles.css"
import { useContext } from 'react';
import { ShoppingCartContext } from '../../Context';
import { XMarkIcon } from '@heroicons/react/24/solid'

const ProductDetail = () => {
    const context = useContext(ShoppingCartContext)
    console.log(context.showProductDetail)

    return(
        <aside className={`${context.isProductDetailOpen ? 'flex' : 'hidden'} product-detail 
        bg-gradient-to-r from-cyan-500/85 via-blue-700/85 to-cyan-500/85 
         flex-col overflow-y-auto fixed right-0 rounded-lg text-white`}>
            <div className="flex justify-between items-center p-7 cursor-pointer">
                <h2 className='font-medium text-xl'>{context.showProductDetail.title}</h2>
                <button onClick = {() => context.closeProductDetail()}>
                <XMarkIcon
                    className='h-6 w-6 text-white cursor-pointer'
                    onClick={() => context.closeProductDetail()}></XMarkIcon>
                </button>
            </div>
            <figure className="px-6">
                <img className = 'w-full h-full rounded-lg' 
                src={context.showProductDetail.image} 
                alt={context.showProductDetail.title} />
            </figure>
            <p className = 'flex flex-col p-6'>
                <span className = 'font-medium text-2xl mb-2'>$ {context.showProductDetail.price}</span>
                <span className = 'font-light text-md'>{context.showProductDetail.description}</span>
            </p>
        </aside>
    )
} 
export default ProductDetail