import { useContext } from 'react';
import { ShoppingCartContext } from '../../Context';
import { Link } from 'react-router-dom';
import { ChevronDoubleLeftIcon } from '@heroicons/react/24/solid'
import Layout from '../../Components/Layout';
import OrderCard from "../../Components/OrderCard"

function MyOrder() {
  const context = useContext(ShoppingCartContext)
  const currentPath = window.location.pathname
  let index = currentPath.substring(currentPath.lastIndexOf('/') + 1)
  let lastOrder = context.order?.[index]
  if (index === 'last') {
    index = context.order?.length - 1
  }

    return (
      <Layout>
      <div className='flex w-11/12 items-center justify-center relative mb-5 ml-4 mr-4 mx-auto'> {/* Cambiado a w-full */}
        <Link to='/MyOrders' className='absolute left-0'>
          <ChevronDoubleLeftIcon className='h-6 w-6 text-white cursor-pointer bg-blue-500 rounded-lg' />
        </Link>
        <h1 className="font-bold text-2xl">My Order</h1>
      </div>
      <div className='flex flex-col w-11/12 mb-5 ml-4 mr-4 mx-auto'> {/* Cambiado a w-full */}
        {
          lastOrder?.products.map(product => (
            <OrderCard
              key={product.id}
              id={product.id}
              title={product.title}
              imageUrl={product.image}
              price={product.price}
            />
          ))
        }
      </div>
    </Layout>
    )
  }
  
  export default MyOrder