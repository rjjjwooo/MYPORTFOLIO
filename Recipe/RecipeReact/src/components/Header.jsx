import React from 'react';
function Header(props){
    return (
        <header>
            <a href='/'>
                <img src='img/ico_logo_white@96.png' alt='로고 이미지'></img>
                <h1>{props.title}</h1>
            </a>
        </header>
    )
}
export default Header;