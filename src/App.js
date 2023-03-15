
import React, {useState, useEffect} from 'react';
import { Login, Register, Products, Header, Footer, Logout, Checkout } from './components/index'
import { Routes, Route, Link } from 'react-router-dom';
import HomeBody from './components/HomeBody';
import { fetchProducts } from './fetch';
import SingleProduct from './components/SingleProduct';
import { getUser } from './fetch';



const App = () => {
  const [products, setProducts] = useState([]);
  let [user, setUser] = useState({});

  const ueFetchProducts = async () => {
    setProducts(await fetchProducts())
  }


  const checkToken = async () => {
    const token = window.localStorage.getItem('token');
    if (token) {
       const newUser = await getUser(token);
      setUser(newUser);
    }
  };




  useEffect(()=>{
    ueFetchProducts()
    checkToken();
  }, [])

  console.log(products)
  return (
    <div>
      <>
        
        <Logout />
        <Header />
        <Routes>
          <Route path='/checkout' element= {Checkout}/>
          <Route path='/products/:id' element = {<SingleProduct products={products}/>} />
          <Route path='' element={<HomeBody />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Register' element={<Register setUser ={setUser}/>} />
          <Route path='/Products' element={<Products products={products}/>} />

        </Routes>
        <Footer />
      </>
    </div>
  );
}

export default App;
