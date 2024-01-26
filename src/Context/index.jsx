import { createContext, useState,  useEffect } from "react";
import PropTypes from 'prop-types';


export const ShoppingCartContext = createContext()

export const ShoppingCartProvider = ({children}) => {
    //--------------------------------------------------------------Handle Delete---------------------------------------------------------
    const handleDelet = (id) => {
        const filteredProducts = productsCart.filter(product => product.id !== id);
        setProductsCart(filteredProducts);
        setCount(filteredProducts.length); //-------------------setting the count of products-----------------
      };

    //---------------------------------------------------------Product detail open/close--------------------------------------------------
    const [isProductDetailOpen, setIsProductDetailOpen] = useState(false)
    const openProductDetail = () => setIsProductDetailOpen(true)
    const closeProductDetail = () => setIsProductDetailOpen(false)      
    //----------------------------------------------------------Side product Menu open/close---------------------------------------------
    const [isSideMenuOpen, setIsSideMenuOpen] = useState(false)
    const openSideMenu = () => setIsSideMenuOpen(true)
    const closeSideMenu = () => setIsSideMenuOpen(false)
    //------------------------------------------------Increment quantity of products in shopping cart.---------------------------------
    const [count,setCount] = useState(0)
    const increment = () => {setCount(count + 1)}
    //--------------------------------------------------------------Show Product Detail.---------------------------------------------
    const [showProductDetail, setShowProductDetail] = useState({})
    //---------------------------------------------------------------Product Cart-----------------------------------------------------
    const [productsCart, setProductsCart] = useState([])
    //-----------------------------------------------Product order card order and setOrder----------------------------------------
    const [order, setOrder] = useState([])
    //------------------------------------------------------------Get Products------------------------------------------
    const [items, setItems] = useState(null)
    //----------------------------------------------------------------Get Products Titles for the searching bar-----------------------------
    const [searchByTitle, setSearchByTitle] = useState(null)
    //----------------------------------------------------------------Get Products categories for the searching bar-----------------------------
    const [searchByCategory, setSearchByCategory] = useState(null)
    //----------------------------------------------------------------Filter Products Titles and categories for the searching bar-----------------------------
    const [titleFilter, setTitleFilter] = useState(null)

    const filteredProducts = (items, searchByTitle) => {
        return items?.filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
    }
    
    const filteredProductsCategory = (items, searchByCategory) => {
        return items?.filter(item => item.category.toLowerCase().includes(searchByCategory.toLowerCase()))
    }

    useEffect(() => {
    if(searchByTitle) setTitleFilter(filteredProducts(items, searchByTitle))
    if(searchByCategory) setTitleFilter(filteredProductsCategory(items, searchByCategory))
    }, [items, searchByTitle, searchByCategory])
    
    
    useEffect(() => {
    fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => setItems(data))}, [])
    
    return(
        <ShoppingCartContext.Provider value={
            {items, 
            setItems,
            count, 
            setCount, 
            increment,
            openProductDetail,
            closeProductDetail,
            isProductDetailOpen,
            showProductDetail,
            setShowProductDetail,
            productsCart, 
            setProductsCart,
            isSideMenuOpen, 
            openSideMenu,
            closeSideMenu,
            handleDelet,
            order, 
            setOrder,
            searchByTitle, 
            setSearchByTitle,
            titleFilter, 
            setTitleFilter,
            searchByCategory, 
            setSearchByCategory,
            }}>
            {children}
        </ShoppingCartContext.Provider>
    )
}

ShoppingCartProvider.propTypes = {
    children: PropTypes.node
}