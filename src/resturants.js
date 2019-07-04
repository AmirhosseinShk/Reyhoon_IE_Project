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

class resturants extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            restCount: 0,
            filterItems: [],
            resturantsItems: [],
            filterresturantsItems: [],
            filterItemFiltered: [],
            filterItemCheckedState: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeCBox = this.handleChangeCBox.bind(this);
        this.handleChangeresturant = this.handleChangeresturant.bind(this);
    }

    handleChangeresturant(event) {
        var filter = event.target.value;
        var fItemFil = new Array();
        var restNames = new Array();
        for (var i = 0; i < this.state.resturantsItems.length; i++)
            restNames.push(this.state.resturantsItems[i].restName);

        console.log(restNames);

        for (var i = 0; i < this.state.resturantsItems.length; i++) {
            if (restNames[i].includes(filter)) {
                fItemFil.push(this.state.resturantsItems[i]);
            }
        }
        this.setState({
            filterresturantsItems: fItemFil
        });
    }

    handleChangeCBox(event) {
        var nameC = event.target.id;
        var check = event.target.checked;
        var fItemFil = new Array();
        var fcheckState = this.state.filterItemCheckedState;
        var fItemOrginal = this.state.filterItems;
        for (var i = 0; i < fItemOrginal.length; i++) {
            if (!fcheckState[fItemOrginal.indexOf(this.state.filterItemFiltered[i])]) {
                if (check) {
                    fItemFil.push(fItemOrginal[fItemOrginal.indexOf(nameC)]);
                    fcheckState[fItemOrginal.indexOf(this.state.filterItemFiltered[i])] = check;
                    check = false;
                    break;
                }
                fcheckState[fItemOrginal.indexOf(this.state.filterItemFiltered[i])] = check;
            } else {
                if (check || this.state.filterItemFiltered[i] != nameC) {
                    fItemFil.push(this.state.filterItemFiltered[i]);
                }
            }
        }

        for (var i = 0; i < fItemOrginal.length; i++) {
            if (!fItemFil.includes(fItemOrginal[i])) {
                fItemFil.push(fItemOrginal[i]);
            }
        }

        this.setState({
            filterItemFiltered: fItemFil,
            filterItemCheckedState: fcheckState
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
        axios("http://localhost:8084/api/restaurants?area=بلوار کشاورز")
            .then(
                (result) => {
                    var countResturants = result.data.length;
                    var fItems = this.state.filterItems;
                    var fItemsCheckS = this.state.filterItemCheckedState;
                    var restDetails = new Array();
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
                        catItems = catItems.join(' . ');
                        restObject.restName = result.data[i].name;
                        restObject.restAddress = result.data[i].address.addressLine;
                        restObject.imgurl = result.data[i].logo;
                        restObject.category = catItems;
                        restObject.rate = Math.round(result.data[i].averageRate);
                        restDetails.push(restObject);
                    }
                    for (var e = 0; e < fItems.length; e++) {
                        var index = filterCount.indexOf(fItems[e]);
                        var count = filterCount[index + 1];
                        fItems[e] = fItems[e] + " (" + count + ")";
                    }
                    console.log(fItems);
                    this.setState({
                        restCount: countResturants,
                        filterItems: fItems,
                        resturantsItems: restDetails,
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
                    <p className="restNum"><span>{this.state.restCount}</span> رستوران امکان سرویس دهی به <a href="/" className="area deleteUnderLink">تهران ، ولیعصر <i className="downarrow"></i></a> را دارند</p>
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
                                                                <img src={topImage} class="rounded mx-auto d-block restImgsize" alt="logo" />
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
                                                    <a href="#" className="btn btn-outline-danger sefareshRounded addMargin">شروع سفارش</a>
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

