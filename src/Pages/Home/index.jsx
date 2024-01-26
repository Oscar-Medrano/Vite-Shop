import { useContext } from 'react'
import Layout from '../../Components/Layout'
import Card from '../../Components/Card'
import ProductDetail from '../../Components/ProductDetail'
import { ShoppingCartContext } from '../../Context';
import { FaceFrownIcon } from '@heroicons/react/24/solid'
import { ArrowPathIcon } from '@heroicons/react/24/solid'

function Home() {
  const context = useContext(ShoppingCartContext)

  const renderView = ()=>{
    if (!context.items) {
        return (
            <div className="col-span-4 flex flex-col items-center justify-center">
                <ArrowPathIcon className="w-1/2 h-1/2 text-blue-500" />
                <p className="mt-4">Loading...</p>
            </div>
        )
    }

    let filteredItems = context.items;

    // Filtrar por título si searchByTitle tiene algún valor
    if (context.searchByTitle) {
        filteredItems = filteredItems.filter(item => item.title.toLowerCase().includes(context.searchByTitle.toLowerCase()));
    }

    // Filtrar por categoría si searchByCategory tiene algún valor
    if (context.searchByCategory) {
        filteredItems = filteredItems.filter(item => item.category === context.searchByCategory);
    }

    // Si no hay elementos después de filtrar, mostrar "No Matches"
    if (filteredItems.length === 0) {
        return (
            <div className="col-span-4 flex flex-col items-center justify-center">
                <FaceFrownIcon className="w-1/2 h-1/2 text-blue-500" />
                <p className="mt-4">No Matches</p>
            </div>
        )
    }

    // Renderizar los elementos filtrados
    return filteredItems.map((item) => <Card key= {item.id} data={item}/>);
}

  return (
    <Layout>
      <div className='flex w-11/12 items-center justify-center relative mb-5 mx-auto'>
        <h1 className="font-bold text-2xl">Exclusive Products for You</h1>
      </div>
    <input 
    type="text" 
    className="rounded-lg border border-cyan-500 flex w-10/12 p-4 mb-4 text-center font-semibold" 
    placeholder="Search the product"
    onChange= {(event) => context.setSearchByTitle(event.target.value)}></input>
      <div className="grid gap-4 grid-cols-4 w-full max-w-screen-lg">
      {
        renderView()
      }
      </div>
    <ProductDetail/>
    </Layout>
  )
}
  
export default Home