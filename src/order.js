import React, { Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-rater/lib/react-rater.css'
import './Css/global.css';
import './Css/resturants.css';
import Header from './header.js';
import Footer from './footer.js';
import topImage from './Css/assets/bakGround1.jpeg';
import './Css/order.css';
import Rater from 'react-rater';

class resturants extends React.Component {
    constructor(props) {
        super(props);
        const { resturantDetails } = props.location.state;
        this.state = {
            restDetails: resturantDetails
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeCBox = this.handleChangeCBox.bind(this);
        this.handleChangeresturant = this.handleChangeresturant.bind(this);
        this.handleGoResturantPage = this.handleGoResturantPage.bind(this);
        console.log(resturantDetails);
    }

    handleGoResturantPage(event) {
        var name = event.target.id;
        var selectedRestDetails;
        for (var c = 0; c < this.state.allResturant; c++) {
            if (this.state.allResturant[c].name == name) {
                selectedRestDetails = this.state.allResturant[c];
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

    }

    render() {
        const { filterItems } = this.state;
        return (
            <Fragment>
                <Header></Header>
                <img src={topImage} alt="Image" className="topImageOrder" />
                <img src={this.state.restDetails.logo} class="rounded d-block restImgsizeOrder" alt="logo" />
                <div className="container marginTop">
                    <div className="row">
                        <div className="col-md-8 offsetRight">
                            <div className="card text-center addShadowOrder" >
                                <div className="card-body addMarginTop">
                                    <h5 className="card-title boldTitle">{this.state.restDetails.name}</h5>
                                    <span class="colorComments"> ({this.state.restDetails.comments.length})</span>
                                    <Rater class="fixDispleyOrder" rating={this.state.restDetails.averageRate} total={5} interactive={false} />
                                    <span class="rateSizeOrder">{this.state.restDetails.averageRate}</span>
                                    <p className="card-text catFont">{this.state.restDetails.category}</p>
                                    <p className="card-text catFontBold">{this.state.restDetails.catItems}</p>
                                    <p className="card-text addAddressOrder">{this.state.restDetails.address.addressLine}</p>
                                    <hr />
                                    <div class="container">
                                        <div class="row">
                                            <div class="col-md-4 restDet">
                                                منوی رستوران
                                            </div>
                                            <div class="col-md-4 restDet-g">
                                                اطلاعات رستوران
                                            </div>
                                            <div class="col-md-4 restDet-g">
                                                نظرات کاربران
                                            </div>
                                            <hr class="hr3order"></hr>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <input className="form-control resizeSerachBox" type="text" onChange={this.handleChangeresturant} placeholder="&#xf002; جستجو در منوی این رستوران" aria-label="Search"></input>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div class="col-md-3">

                        </div>
                        <div>

                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </Fragment>
        );
    }

}

export default resturants;
