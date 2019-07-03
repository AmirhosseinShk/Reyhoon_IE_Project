import React from 'react';
import './Css/global.css';
import './Css/main.css'
import logo from './logo.svg';


export default () => {
    return (
        <div class="header">
            <img src={logo} alt="logo" class="svgReyhoon"></img>
            <a class="deleteUnderLink" href="./login.html"> <span class="doubletab headerWord" >ورود</span> </a>
            <span>  |  </span>
            <a class="deleteUnderLink" href="./login.html"><span class="headerWord">عضویت</span> </a>
            <a class="deleteUnderLink" href="./main.html"><span class="tab headerWord">راهنما</span></a>
            <hr class="hr1"></hr>
        </div>
    );
}
