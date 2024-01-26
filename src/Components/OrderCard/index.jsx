import { XMarkIcon } from '@heroicons/react/24/solid'
import PropTypes from 'prop-types';

const OrderCard = props => {
    const {id, imageUrl, title, price, handleDelet} = props
    let renderXMarkIcon
    if (handleDelet){// para que no aparezca la x si no esta la prop HandleDelete
        renderXMarkIcon = <XMarkIcon
        onClick={() => handleDelet(id)}
        className='h-6 w-6 text-black cursor-pointer'>
        </XMarkIcon>
    }

    return(
        <div className ='flex justify-between items-center mb-4' > {/* Agrega un margen inferior */}
            <div className ='flex justify-between gap-2' >
                <figure className ='w-20 h-20 mb-2' > {/* Agrega un margen inferior */}
                    <img className ='w-full h-full rounded-lg object-cover' 
                    src= {imageUrl} 
                    alt= {title} />
                </figure>
                <p className ='text-md font-light'>{title}</p>
            </div>
            <div className ='flex justify-between gap-2' >
                <p className ='text-lg font-medium'>{price}</p>
                {renderXMarkIcon}
            </div>
        </div>)
}
OrderCard.propTypes = {
    id: PropTypes.number,
    imageUrl: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    handleDelet: PropTypes.func
};


export default OrderCard 