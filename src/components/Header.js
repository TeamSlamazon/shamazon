import React from 'react'

import { Link } from 'react-router-dom';


const Header = ({cart, searchTerm, setSearchTerm, fullSearch, setFullSearch}) => {


    return (

        <header>
            <nav>
                <div className='headerContainer'>
                    <div className='logo'>
                    <Link className='linklink' to=''><img src='/images/shamazontransparent.png' alt='logo' width='65px' /></Link>
                    </div>
                    <div className='search'>
                        <form>
                            <input type='text' placeholder='Search' value={searchTerm} onChange={ev => setSearchTerm(ev.target.value)}/>
                            <button type='submit' onClick={ ev =>  setFullSearch(searchTerm) }><img src='/images/search.png' alt='searchbtn' width='25px' /></button>
                        </form>
                    </div>
                    <div className='olContainer'>
                        <ol>
                            <div className='profile'>
                                <div className='profilebtn'>
                                    <img src='/images/profile.png' alt='profilebtn' width='30px' />

                                    <li><Link className='linkheader' to='/Login'>Profile</Link></li>

                                </div>
                            </div>
                            <div className='checkout'>
                                <Link className='linkheader' to='/cart'>
                                <div className='checkoutbtn'>
                                    <img src='/images/checkout.png' alt='checkoutbtn' width='30px' />
                                    { cart.products?.length ? <li>Cart ({cart.products?.length})</li> : <li>Cart (0)</li>}
                                </div>
                                </Link>
                            </div>
                        </ol>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header

