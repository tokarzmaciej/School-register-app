import React from 'react';
import Actions from './Actions';
import Menu from './Menu';
import '../style/home.css';

function Home() {
    return (
        <div id="container-home">
            <Menu></Menu>
            <Actions></Actions>
        </div>
    );
};

export default Home;
