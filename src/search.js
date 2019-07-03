import React from 'react';
import './Css/global.css';
import './Css/main.css';
import pizza from './Css/assets/Pizza.jpg';
import { BrowserRouter as Link } from "react-router-dom";

function search() {
    return (
        <div>
        <img src= {pizza} class="mainImage" />
        <div class="TitleInCenter">
            سفارش آنلاین غذا از بهترین رستوران ها و فست فودها
        </div>

        <div class="BelowInCenter">
            برای دیدن لیست رستوران ها و فست فودهایی که به شما سرویس می دهند، منظقه خود را وارد کنید.
        </div>

        <div class="searchBorder">
            <i class="down"></i>
            <select id="" class="SelectButton" name="CityBox" >
                <option Value="Tehran">تهران</option>
                <option Value="Mashhad">مشهد</option>
                <option Value="Esfehan">اصفهان</option>
            </select>
            <input type="text" id="zoneArea" class="SelectZone" placeholder="&#xF041; مثلا نیاوران"></input>
            <button class="SearchButton" type="submit">
                <Link to="/SearchResult">
                    <i id="SearchIcon" class="fa fa-search"></i>
                </Link>
            </button>
            <span class="TextOnBorder">منطقه خود را وارد کنید</span>
        </div>

        <div class="HistoryDiv">
            <a href="">
                <i class="fa fa-history">
                </i>
                <span class="lastSerach">
                    آخرین جستجو: تهران ، شیخ هادی ، چهارراه ولیعصر
                </span>
            </a>
        </div>
    </div >
    );
}

export default search;