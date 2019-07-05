import React, { Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-rater/lib/react-rater.css'
import './Css/global.css';
import './Css/resturants.css';
import Header from './header.js';
import Footer from './footer.js';
import topImage from './Css/assets/topImage.jpg';
import axios from 'axios';
import Rater from 'react-rater';
import { Link } from "react-router-dom";

class resturants extends React.Component {
    constructor(props) {
        super(props);
        const { area } = props.location.state;
        this.state = {
            allResturant: [],
            selectedResturant: [],
            areaZone: area,
            restCount: 0,
            filterListSelected: [],
            filterItems: [],
            resturantsItems: [],
            resturantsItemsClose: [],
            filterresturantsItemsClose: [],
            filterresturantsItems: [],
            filterItemFiltered: [],
            filterItemCheckedState: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeCBox = this.handleChangeCBox.bind(this);
        this.handleChangeresturant = this.handleChangeresturant.bind(this);
        this.handleGoResturantPage = this.handleGoResturantPage.bind(this);
    }

    handleGoResturantPage(event) {
        var name = event.target.id;
        console.log(name);
        var selectedRestDetails;
        for (var c = 0; c < this.state.allResturant.length ; c++) {
            if (this.state.allResturant[c].name == name) {
                selectedRestDetails = (this.state.allResturant[c]);
                break;
            }
        }
        this.setState({
            selectedResturant: selectedRestDetails
        });
    }

    handleChangeresturant(event) {
        var filter = event.target.value;
        var fItemFil = new Array();
        var fItemFilClose = new Array();
        var restNames = new Array();
        var restNamesClose = new Array();
        for (var i = 0; i < this.state.resturantsItems.length; i++)
            restNames.push(this.state.resturantsItems[i].restName);

        for (var i = 0; i < this.state.resturantsItemsClose.length; i++)
            restNamesClose.push(this.state.resturantsItemsClose[i].restName);

        for (var i = 0; i < this.state.resturantsItems.length; i++) {
            if (restNames[i].includes(filter)) {
                fItemFil.push(this.state.resturantsItems[i]);
            }
        }

        for (var i = 0; i < this.state.resturantsItemsClose.length; i++) {
            if (restNamesClose[i].includes(filter)) {
                fItemFilClose.push(this.state.resturantsItemsClose[i]);
            }
        }

        this.setState({
            filterresturantsItems: fItemFil,
            filterresturantsItemsClose: fItemFilClose
        });
    }

    handleChangeCBox(event) {
        // console.log(event);
        // var nameC = event.target.id;
        // var check = event.target.checked;
        // var fItemFil = new Array();
        // var fcheckState = this.state.filterItemCheckedState;
        // var fItemOrginal = this.state.filterItems;
        // for (var i = 0; i < fItemOrginal.length; i++) {
        //     if (!fcheckState[fItemOrginal.indexOf(this.state.filterItemFiltered[i])]) {
        //         if (check) {
        //             fItemFil.push(fItemOrginal[fItemOrginal.indexOf(nameC)]);
        //             fcheckState[fItemOrginal.indexOf(this.state.filterItemFiltered[i])] = check;
        //             check = false;
        //             break;
        //         }
        //         fcheckState[fItemOrginal.indexOf(this.state.filterItemFiltered[i])] = check;
        //     } else {
        //         if (check || this.state.filterItemFiltered[i] != nameC) {
        //             fItemFil.push(this.state.filterItemFiltered[i]);
        //         }
        //     }
        // }

        // for (var i = 0; i < fItemOrginal.length; i++) {
        //     if (!fItemFil.includes(fItemOrginal[i])) {
        //         fItemFil.push(fItemOrginal[i]);
        //     }
        // }

        // this.setState({
        //     filterItemFiltered: fItemFil,
        //     filterItemCheckedState: fcheckState
        // });
        var filter = event.target.id;
        var check = event.target.checked;
        var filterListSelected = this.state.filterListSelected;
        if (check) {
            var f = filter.split(' ');
            var fi = "";
            if (f.length > 2) {
                fi = f[0] + " " + f[1]
            } else {
                fi = f[0];
            }
            filterListSelected.push(fi);
        } else {
            var index = filterListSelected.indexOf(filter);
            filterListSelected.splice(index, 1);
        }

        var fItemFil = new Array();
        var fItemFilClose = new Array();

        for (var i = 0; i < this.state.resturantsItems.length; i++) {
            var isOk = true;
            for (var j = 0; j < filterListSelected.length; j++) {
                if (!this.state.resturantsItems[i].categories.includes(filterListSelected[j])) {
                    isOk = false;
                }
            }
            if (isOk) {
                fItemFil.push(this.state.resturantsItems[i]);
            }
        }

        for (var i = 0; i < this.state.resturantsItemsClose.length; i++) {
            var isOk = true;
            for (var j = 0; j < filterListSelected.length; j++) {
                if (!this.state.resturantsItemsClose[i].categories.includes(filterListSelected[j])) {
                    isOk = false;
                }
            }
            if (isOk) {
                fItemFilClose.push(this.state.resturantsItemsClose[i]);
            }
        }

        this.setState({
            filterresturantsItems: fItemFil,
            filterresturantsItemsClose: fItemFilClose,
            filterListSelected: filterListSelected
        });

    }

    handleChange(event) {
        var filter = event.target.value;
        var fItemFil = new Array();
        for (var i = 0; i < this.state.filterItems.length; i++) {
            if (this.state.filterItems[i].includes(filter)) {
                fItemFil.push(this.state.filterItems[i]);
            }
        }
        this.setState({
            filterItemFiltered: fItemFil
        });
    }

    componentDidMount() {
        var urlDb = "http://localhost:8084/api/restaurants?area=" + this.state.areaZone;
        console.log(urlDb);
        axios(urlDb)
            .then(
                (result) => {
                    var hours = new Date().getHours();
                    var countResturants = result.data.length;
                    var fItems = this.state.filterItems;
                    var fItemsCheckS = this.state.filterItemCheckedState;
                    var restDetails = new Array();
                    var restDetailsClose = new Array();
                    var filterCount = new Array();

                    for (var i = 0; i < countResturants; i++) {

                        const restObject = {}; // For Resive Resturant Details
                        Object.defineProperty(restObject, 'restName', {
                            writable: true
                        });
                        Object.defineProperty(restObject, 'restAddress', {
                            writable: true
                        });
                        Object.defineProperty(restObject, 'imgurl', {
                            writable: true
                        });
                        Object.defineProperty(restObject, 'category', {
                            writable: true
                        });
                        Object.defineProperty(restObject, 'categories', {
                            writable: true
                        });
                        Object.defineProperty(restObject, 'rate', {
                            writable: true
                        });

                        var catItems = new Array();
                        var restcategories = result.data[i].categories;
                        var catlenth = restcategories.length;

                        for (var j = 0; j < catlenth; j++) {
                            catItems.push(restcategories[j].name);
                            if (!fItems.includes(restcategories[j].name)) {
                                fItems.push(restcategories[j].name);
                                fItemsCheckS.push(false);
                                filterCount.push(restcategories[j].name);
                                filterCount.push(1);
                            }
                            else {
                                var index = filterCount.indexOf(restcategories[j].name);
                                filterCount[index + 1] = filterCount[index + 1] + 1;
                            }
                        }

                        restObject.categories = catItems;
                        catItems = catItems.join(' . ');
                        result.data[i].catItems = catItems;
                        restObject.restName = result.data[i].name;
                        restObject.restAddress = result.data[i].address.addressLine;
                        restObject.imgurl = result.data[i].logo;
                        restObject.category = catItems;
                        restObject.rate = Math.round(result.data[i].averageRate);
                        console.log(hours);
                        if (hours >= result.data[i].openingTime && hours < result.data[i].closingTime) {
                            restDetails.push(restObject);
                        } else {
                            restDetailsClose.push(restObject);
                        }
                    }
                    for (var e = 0; e < fItems.length; e++) {
                        var index = filterCount.indexOf(fItems[e]);
                        var count = filterCount[index + 1];
                        fItems[e] = fItems[e] + " (" + count + ")";
                    }
                    this.setState({
                        allResturant: result.data,
                        restCount: countResturants,
                        filterItems: fItems,
                        resturantsItems: restDetails,
                        resturantsItemsClose: restDetailsClose,
                        filterresturantsItemsClose: restDetailsClose,
                        filterresturantsItems: restDetails,
                        filterItemFiltered: fItems,
                        filterItemCheckedState: fItemsCheckS
                    });
                },
                (error) => {
                    console.log(error);
                }
            )
    }

    render() {
        const { filterItems } = this.state;
        return (
            <Fragment>
                <Header></Header>
                <div className="searchPart">
                    <img src={topImage} alt="Image" className="topImage" />
                    <p className="restNum"><span>{this.state.restCount}</span> رستوران امکان سرویس دهی به <a href="/" className="area deleteUnderLink">{this.state.areaZone}<i className="downarrow"></i></a> را دارند</p>
                    <hr className="style1"></hr>
                    <input className="form-control resizeSerachButtom" type="text" onChange={this.handleChangeresturant} placeholder="&#xf002; جست و جوی رستوران در این محدوده" aria-label="Search"></input>
                    <div className="container-fluid searchPanel">
                        <div className="row">
                            <div className="col-md-2 topMargin">
                                <ul className="list-group">
                                    <li className="list-group-item disabled">
                                        <p className="filterText">فیلتر بر اساس نوع غذا</p>
                                    </li>
                                    <li className="list-group-item searchFilter">
                                        <div className="foodSearch">
                                            <input className="form-control resizeSerachFood" type="text" onChange={this.handleChange} placeholder="جست‌وجوی دسته‌بندی غذاها" aria-label="Search"></input>
                                        </div>
                                    </li>
                                    {this.state.filterItemFiltered.map(item => (
                                        <li className="list-group-item changeDisplay"><input className="cBox" id={item} type="checkbox" onChange={this.handleChangeCBox} /><label className="cBoxText" for={item}>{item}</label></li>
                                    ))}
                                    <li className="list-group-item lastButton">
                                        <button type="button" className="btn btn-outline-danger resizebutton">بیشتر</button>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-9 topMargin">
                                <div className="row">
                                    {this.state.filterresturantsItems.map(item => (
                                        <div className="col-md-4">
                                            <div className="card text-center addShadow" >
                                                <div className="card-body">
                                                    <div class="container-fluid">
                                                        <div class="row textAligen">
                                                            <div class="col-md-3 restImgresize">
                                                                <img src={item.imgurl} class="rounded mx-auto d-block restImgsize" alt="logo" />
                                                            </div>
                                                            <div class="col-md-9">
                                                                <h5 className="card-title">{item.restName}</h5>
                                                                <Rater class="fixDispley" rating={item.rate} total={5} interactive={false} />
                                                                <span class="rateSize">{item.rate}</span>
                                                                <p className="card-text catFont">{item.category}</p>
                                                                <p className="card-text addFont">{item.restAddress}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <button id={item.restName} onMouseEnter={this.handleGoResturantPage} className="btn btn-outline-danger sefareshRounded addMargin">
                                                        <Link id={item.restName} class="sefareshRounded" to={{ pathname: '/order', state: { resturantDetails: this.state.selectedResturant } }} >
                                                            شروع سفارش
                                                        </Link>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div class="CloseResturant">
                                    رستوران های بسته
                                </div>
                                <div className="row addRowMargin">
                                    {this.state.filterresturantsItemsClose.map(item => (
                                        <div className="col-md-4">
                                            <div className="card text-center addShadowClose" >
                                                <div className="card-body">
                                                    <div class="container-fluid">
                                                        <div class="row textAligen">
                                                            <div class="col-md-3 restImgresize">
                                                                <img src={item.imgurl} class="rounded mx-auto d-block restImgsize" alt="logo" />
                                                            </div>
                                                            <div class="col-md-9">
                                                                <h5 className="card-title">{item.restName}</h5>
                                                                <Rater class="fixDispley" rating={item.rate} total={5} interactive={false} />
                                                                <span class="rateSize">{item.rate}</span>
                                                                <p className="card-text catFont">{item.category}</p>
                                                                <p className="card-text addFont">{item.restAddress}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <button id={item.restName} onClick={this.handleGoResturantPage} className="btn btn-outline-danger sefareshRounded addMargin">
                                                        <Link class="sefareshRounded" to={{ pathname: '/order', state: { area: this.state.selectedResturant } }} >
                                                            شروع سفارش
                                                        </Link>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </Fragment>
        );
    }

}

export default resturants;

