import React from 'react';
import './Css/global.css';
import './Css/main.css';
import pizza from './Css/assets/Pizza.jpg';
import { Link } from "react-router-dom";

class search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            areaQuery: ""
        };
        this.handleChangeInput = this.handleChangeInput.bind(this);
    }

    handleChangeInput(event){
        var area = event.target.value;
        this.setState({
            areaQuery : area
        });
    }

    render() {
        return (
            <div>
                <img src={pizza} className="mainImage" />
                <div className="TitleInCenter">
                    سفارش آنلاین غذا از بهترین رستوران ها و فست فودها
        </div>

                <div className="BelowInCenter">
                    برای دیدن لیست رستوران ها و فست فودهایی که به شما سرویس می دهند، منظقه خود را وارد کنید.
        </div>

                <div className="searchBorder">
                    <i className="down"></i>
                    <select id="" className="SelectButton" name="CityBox" >
                        <option Value="Tehran">تهران</option>
                        <option Value="Mashhad">مشهد</option>
                        <option Value="Esfehan">اصفهان</option>
                    </select>
                    <input type="text" id="zoneArea" className="SelectZone" onChange={this.handleChangeInput} placeholder="&#xF041; مثلا نیاوران"></input>
                    <button className="SearchButton" type="submit">
                        <Link to={ {pathname : '/SearchResult' , state : { area : this.state.areaQuery } } } >
                            <i id="SearchIcon" className="fa fa-search"></i>
                        </Link>
                    </button>
                    <span className="TextOnBorder">منطقه خود را وارد کنید</span>
                </div>

                <div className="HistoryDiv">
                    <a href="">
                        <i className="fa fa-history">
                        </i>
                        <span className="lastSerach">
                            آخرین جستجو: تهران ، شیخ هادی ، چهارراه ولیعصر
                </span>
                    </a>
                </div>
            </div >
        );
    }
}

export default search;