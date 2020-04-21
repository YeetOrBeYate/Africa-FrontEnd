import React from 'react';


import "../CSS/Navbar.css"

const Home = ()=>{
    return(
        <div className = "Homepage">
            <div className='HomeImage'></div>
            <h1 id ='HomeTitle'>Manage your assets</h1>
            <div className="HomeIntro">
                <section>
                    <p>Sauti Africa gives small business owners, particularly women, the opportunity to improve their businesses by providing a market information platform.More information on what they do can be found <a href='https://sautiafrica.org/' target='_blank' rel="noopener noreferrer">here</a></p>
                </section>
                <section>
                    <p>This app acts as a simulation for what Sauto Africa has implemented. A user can see other shop owners locations and item prices, and add an item or location listing to their profile.</p>
                    <p>Africa icon made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></p>
                </section>
            </div>
        </div>
    );
}

export default Home