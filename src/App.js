
import React, {useState, useEffect} from 'react';
import { Login, Register, Products, Header, Footer, Logout, Checkout } from './components/index'
import { Routes, Route, Link } from 'react-router-dom';
import HomeBody from './components/HomeBody';
import { fetchProducts } from './fetch';
import SingleProduct from './components/SingleProduct';
import { getUser } from './fetch';
import Cart from './components/Cart';



const App = () => {
  let [user, setUser] = useState({});

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({})


  const ueFetchProducts = async () => {
    setProducts(await fetchProducts())
  }


  const checkToken = async () => {
    const token = window.localStorage.getItem('token');
    if (token) {

       const user = await getUser(token);
      setUser(user);
      fetch(`/api/carts/${user.id}`)
        .then((response) => response.json())
        .then((cart) => setCart(cart)) 

    }
  };




  console.log("PRODUCTS: ", products)
  console.log("CART: ", cart)

  useEffect(()=>{
    checkToken();
    ueFetchProducts()
  }, [])

  console.log(products)
  return (
    <div>
      <>
        
        <Logout />
        <Header cart={cart}/>

        <Routes>
          <Route path='/checkout' element= {Checkout}/>
          <Route path='/products/:id' element = {<SingleProduct products={products}/>} />
          <Route path='' element={<HomeBody />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register setUser ={setUser}/>} />
          <Route path='/products' element={<Products products={products}/>} />
          <Route path='/cart' element={<Cart cart={cart}/>}/>

        </Routes>
        <Footer />
      </>
    </div>
  );
}

export default App;
