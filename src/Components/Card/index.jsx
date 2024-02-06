import PropTypes from 'prop-types'
import { useContext } from 'react';
import { ShoppingCartContext } from '../../Context';
import { PlusIcon, CheckIcon } from '@heroicons/react/24/solid'

const Card = ({data}) => {
    const context = useContext(ShoppingCartContext)
    const  {category, image, title, price}  = data;
    const showProduct = (productDetail) => {
        context.openProductDetail();
        context.setShowProductDetail(productDetail);
    }
    const addProducstToCard = (productData) => {
        context.setProductsCart([...context.productsCart, productData]),
        context.setCount(context.count + 1);
    }
    const renderIcons = (id) => {
        const isInBag = context.productsCart.filter(product =>product.id === id).length > 0;

        if (isInBag){
            return(
                <button className="absolute top-0 right-0 flex justify-center items-center 
                    bg-green-500
                     w-6 h-6 rounded-full m-2 p-1 text-black text-xs leading-none">
                    <CheckIcon></CheckIcon>
                </button>)
        }
        else {
            return(
                <button className="absolute top-0 right-0 flex justify-center items-center 
                bg-gradient-to-r from-cyan-500/75 via-blue-700/75 to-cyan-500/75
                w-6 h-6 rounded-full m-2 p-1 text-white text-xs leading-none"
                onClick = {(e) => {
                    context.openSideMenu()
                    addProducstToCard(data)
                    e.stopPropagation();}}>
                    <PlusIcon></PlusIcon>
                </button>
            )
        }
    
    }

    return(
        <div className="rounded-md cursor-pointer bg-white/55 m-2" 
        onClick = {() => showProduct(data)}>
            <figure className="relative mb-2 w-full h-4/5" >
                <span className="absolute bottom-0 left-0 m-2 bg-gradient-to-r from-cyan-500/75 via-blue-700/75 to-cyan-500/75
                rounded-lg text-white text-sm px-3 py-1.5" >
                    {category}
                </span>
                <img className="w-full h-full object-cover rounded-md" 
                    src={image} 
                    alt={title}
                    style={{ objectFit: 'contain' }} />

                {renderIcons(data.id)}
            </figure>
            <p className="flex justify-between p-4 overflow-auto" >
                <span className=" text-md font-light truncate">{title}</span>
                <span className=" text-lg font-medium">${price}</span>
            </p>
        </div>
    )
}

Card.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.number,
        category: PropTypes.string,
        description: PropTypes.string,
        image: PropTypes.string,
        title: PropTypes.string,
        price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }).isRequired,
};

export default Card;