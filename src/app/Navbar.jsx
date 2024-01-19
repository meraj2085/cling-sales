import React from 'react';
const Navbar = () => {
    return (
        <nav style={{display: 'flex', justifyContent: 'space-between', backgroundColor: '#F0FFFF', boxShadow: '0px 3px 6px #00000029', padding:'1px 30px'}}>
            <div>
                <img src="" alt="Logo" style={{height: '50px'}}/> {/* Replace with your logo */}
            </div>
            <div>
                <button style={{margin: '5px', Color: '#0000FF', }}>Button 1</button>
                <button style={{margin: '5px', Color: '#0000FF', }}>Button 2</button>
                <button style={{margin: '5px', Color: '#0000FF', }}>Button 3</button>
            </div>
        </nav>
    );
};

export default Navbar;
