import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartContext } from '../../Context';
import { ChevronRightIcon, CalendarDaysIcon, CurrencyDollarIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import Layout from '../../Components/Layout'


function MyOrders() {
  const context = useContext(ShoppingCartContext)

  return (
    <Layout>
      <div className='flex w-11/12 items-center justify-center relative mb-5 mx-auto'>
        <h1 className="font-bold text-2xl">My Orders</h1>
      </div>
      {
        context.order.map((order, index) => (
          <Link key = {index} to={`/MyOrders/${index}`}>
            <div className="flex justify-between items-center mb-3 border border-black rounded-lg p-3 bg-cyan-200">
              <div className="flex items-center justify-between grow gap-2 p-4">
                <div className="flex gap-1 items-center justify-center p-1">
                  <ShoppingBagIcon className="h-6 w-6" />
                  <p className="font-light text-sm">{`${order.totalProducts} ${order.totalProducts === 1 ? "  Product" : "  Products"}`}</p>
                </div>
                <div className="flex gap-1 items-center justify-center p-1">
                  <CalendarDaysIcon className="h-6 w-6" />
                  <p className="font-light text-sm">{order.orderDate}</p>
                </div>
                <div className="flex gap-1 items-center justify-center p-y">
                  <CurrencyDollarIcon className="h-6 w-6" />
                  <p className="font-bold text-md">{order.totalPrice}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ChevronRightIcon className="h-6 w-6" />
              </div>
            </div>
          </Link>
        ))
      }
    </Layout>
  )
}
  export default MyOrders