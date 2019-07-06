import React, { Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'antd/dist/antd.css';
import 'react-rater/lib/react-rater.css'
import './Css/global.css';
import './Css/resturants.css';
import Header from './header.js';
import Footer from './footer.js';
import topImage from './Css/assets/bakGround1.jpeg';
import './Css/order.css';
import Rater from 'react-rater';
import { Menu, Affix } from 'antd';
import { Link as ScrollLink } from 'react-scroll';
import axios from 'axios';
import { Progress } from 'reactstrap';

class order extends React.Component {
    constructor(props) {
        super(props);
        const { restName } = props.location.state;
        this.state = {
            Rates: [],
            comments: [],
            allcats: "",
            fullAddress: "",
            commentsCount: 0,
            restName: restName,
            restDetails: [],
            restCat: [],
            restFoods: []
        };
    }

    componentDidMount() {
        var urlDb = "http://localhost:8084/api/restaurants/" + this.state.restName;
        console.log(urlDb);
        axios(urlDb)
            .then(
                (result) => {
                    var cat = [];
                    var resturantDetails = result.data[0];
                    for (var i = 0; i < resturantDetails.categories.length; i++) {
                        cat.push(resturantDetails.categories[i].name);
                    }
                    console.log(cat);
                    var Food_FoodSets = [];

                    for (var i = 0; i < cat.length; i++) {
                        const foodObject = {}; // For Resive Resturant Details
                        Object.defineProperty(foodObject, 'foodSet', {
                            writable: true
                        });
                        Object.defineProperty(foodObject, 'foods', {
                            writable: true
                        });
                        Object.defineProperty(foodObject, 'index', {
                            writable: true
                        });

                        foodObject.foodSet = cat[i];
                        foodObject.foods = new Array();
                        foodObject.index = i;
                        for (var j = 0; j < resturantDetails.foods.length; j++) {
                            if (cat[i] == resturantDetails.foods[j].foodSet) {
                                foodObject.foods.push(resturantDetails.foods[j]);
                            }
                        }
                        Food_FoodSets.push(foodObject);
                    }
                    this.setState({
                        allcats: cat.join(' . '),
                        fullAddress: resturantDetails.address.addressLine,
                        commentsCount: resturantDetails.comments.length,
                        restDetails: resturantDetails,
                        restCat: cat,
                        restFoods: Food_FoodSets
                    });

                    console.log(Food_FoodSets);
                    console.log(resturantDetails);
                },
                (error) => {
                    console.log(error);
                }
            )


        var urlDbComments = urlDb + "/comments";
        console.log(urlDbComments);
        axios(urlDbComments)
            .then(
                (result) => {
                    var RateDetails = [];
                    var comments = result.data[0].comments;
                    const avgPoin1 = {};
                    Object.defineProperty(avgPoin1, 'persianName', {
                        writable: true
                    });
                    Object.defineProperty(avgPoin1, 'avgPersent', {
                        writable: true
                    });
                    Object.defineProperty(avgPoin1, 'avg', {
                        writable: true
                    });

                    const avgPoin2 = {};
                    Object.defineProperty(avgPoin2, 'persianName', {
                        writable: true
                    });
                    Object.defineProperty(avgPoin2, 'avgPersent', {
                        writable: true
                    });
                    Object.defineProperty(avgPoin2, 'avg', {
                        writable: true
                    });

                    const avgPoin3 = {};
                    Object.defineProperty(avgPoin3, 'persianName', {
                        writable: true
                    });
                    Object.defineProperty(avgPoin3, 'avgPersent', {
                        writable: true
                    });
                    Object.defineProperty(avgPoin3, 'avg', {
                        writable: true
                    });

                    var avgDel = 0;
                    var avgQua = 0;
                    var avgPac = 0;

                    for (var t = 0; t < comments.length; t++) {
                        avgDel += comments[t].deliveryTime;
                        avgQua += comments[t].quality;
                        avgPac += comments[t].packaging;
                        comments[t].Month = 4 - parseInt(comments[t].created_at.split('-')[1]);
                    }

                    avgPoin1.persianName = "کیفیت غذا";
                    avgPoin1.avg = (avgQua / comments.length).toFixed(1);
                    avgPoin1.avgPersent = parseInt((avgQua / comments.length) * 20);
                    RateDetails.push(avgPoin1);

                    avgPoin2.persianName = "کیفیت بسته‌بندی";
                    avgPoin2.avg = (avgPac / comments.length).toFixed(1);
                    avgPoin2.avgPersent = parseInt((avgPac / comments.length) * 20);
                    RateDetails.push(avgPoin2);

                    avgPoin3.persianName = "سرعت ارسال پیک";
                    avgPoin3.avg = (avgDel / comments.length).toFixed(1);
                    avgPoin3.avgPersent = parseInt((avgDel / comments.length) * 20);
                    RateDetails.push(avgPoin3);

                    this.setState({
                        Rates: RateDetails,
                        comments: comments
                    });
                },
                (error) => {
                    console.log(error);
                }
            )

    }

    render() {
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
                                    <span class="colorComments"> ({this.state.commentsCount})</span>
                                    <Rater class="fixDispleyOrder" rating={this.state.restDetails.averageRate} total={5} interactive={false} />
                                    <span class="rateSizeOrder">{this.state.restDetails.averageRate}</span>
                                    <p className="card-text catFont">{this.state.restDetails.category}</p>
                                    <p className="card-text catFontBold">{this.state.allcats}</p>
                                    <p className="card-text addAddressOrder">{this.state.fullAddress}</p>
                                    <Affix offset={10}>
                                        <hr />
                                        <div class="container addWiteBorder">
                                            <div class="row">
                                                <div class="col-md-4 restDet">
                                                    <ScrollLink activeClass="active" to="Menu" smooth={true} offset={-100}>
                                                        منوی رستوران
                                                    </ScrollLink>
                                                </div>
                                                <div class="col-md-4 restDet-g">
                                                    <ScrollLink activeClass="active" to="Info" smooth={true} offset={-100}>
                                                        اطلاعات رستوران
                                                </ScrollLink>
                                                </div>
                                                <div class="col-md-4 restDet-g">
                                                    <ScrollLink activeClass="active" to="Comments" smooth={true} offset={-100}>
                                                        نظرات کاربران
                                              </ScrollLink>
                                                </div>
                                                <hr class="hr3order"></hr>
                                            </div>
                                        </div>
                                    </Affix>
                                </div>
                            </div>
                            <input id="Menu" className="form-control resizeSerachBox" type="text" onChange={this.handleChangeresturant} placeholder="&#xf002; جستجو در منوی این رستوران" aria-label="Search"></input>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div class="col-md-3 addMarginTop">
                            <Affix offset={100}>
                                <Menu style={{ width: 256, marginRight: "20%" }}
                                    defaultSelectedKeys={['1']}
                                    className="bg-transparent list-food-type">
                                    {this.state.restCat.map(item => (
                                        <Menu.Item>
                                            <ScrollLink to={item} smooth={true} offset={-100}>
                                                {item}
                                            </ScrollLink>
                                        </Menu.Item>
                                    ))}
                                </Menu>
                            </Affix>
                        </div>
                        <div className="col-md-8 mb-3">
                            {this.state.restFoods.map(foodSets => (
                                <Fragment>
                                    <h3 id={foodSets.foodSet} className="addMarginTop">{foodSets.foodSet}</h3>
                                    <div className="row">
                                        {this.state.restFoods[foodSets.index].foods.map(fooditems => (
                                            <div className="col-md-5">
                                                <div className="card addShadow">
                                                    <div className="card-body">
                                                        <h5 className="card-title"><sapn className="float-left"> {fooditems.price} تومان</sapn>{fooditems.name}</h5>
                                                        <p className="card-text">{fooditems.description}</p>
                                                        <button className="btn btn-outline-danger refont sefareshRounded addMargin">&#xf067; افزودن به سبد خرید</button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </Fragment>
                            ))}
                            <h5 id="Info" className="addMarginTop">اطلاعات رستوران</h5>
                            <hr className="hrrewidth" ></hr>
                            <h6 className="catFontBold">{this.state.restDetails.name}</h6>
                            <p className="addressBold">&#xF041; {this.state.fullAddress}</p>
                            <p className="SaatSefaresh">&#xf017; ساعت سفارش گیری</p>
                            <p className="resizeTime"><span className="float-left">از {this.state.restDetails.openingTime} ظهر تا {this.state.restDetails.closingTime} شب</span>همه روزه</p>
                            <hr className="hrrewidth2"></hr>
                            <h5 id="Comments" className="addMarginTop">نظرات کاربران در مورد {this.state.restDetails.name}</h5>
                            <hr className="hrrewidth" ></hr>
                            <p className="addressBold">شما هم میتوانید بعد از سفارش از این رستوران،نظر خود را درباره‌ی این رستوران ثبت کنید.</p>
                            <div className="starDiv">
                                <span className="colorComments"> ({this.state.commentsCount})</span>
                                <Rater className="fixDispleyOrder" rating={this.state.restDetails.averageRate} total={5} interactive={false} />
                                <p className="rateSizeOrder">{this.state.restDetails.averageRate}</p>
                            </div>
                            {this.state.Rates.map(Ritem => (
                                <Fragment>
                                    <hr className="commenthr"></hr>
                                    <div className="row commenthr">
                                        <div className="col-8">
                                            <div className="row">
                                                <div className="col-10 removepad">
                                                    <Progress className="barStatus" color="warning" value={Ritem.avgPersent} />
                                                </div>
                                                <div className="col-2 rateStatus">
                                                    {Ritem.avg}
                                                </div>
                                            </div>
                                        </div>
                                        <div classNmae="col-4" style={{ width: "33.33%", textAlign: "left" }}>
                                            {Ritem.persianName}
                                        </div>
                                    </div>
                                </Fragment>
                            ))}
                            <hr className="hrrewidth addMarginTop" ></hr>
                            {this.state.comments.map(cItem => (
                                <div>
                                    <div className="row hrrewidth delMarginR">
                                        <div className="col-6 removepad catFontBold">
                                            {cItem.author}
                                        </div>
                                        <div className="col-6 removepad">
                                            <div className="col-auto mr-auto removepad float-left">
                                                <div className="row">
                                                    <div className="clo-3 rateStatus">
                                                        {cItem.quality}
                                                    </div>
                                                    <div className="col-9 rateStarDirection">
                                                        <Rater className="rateSize2" rating={cItem.quality} total={5} interactive={false} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="commentContent">
                                            <i class="fas fa-quote-right quote"></i>
                                            {cItem.text}
                                        </div>
                                    </div>
                                    <div className="row hrrewidth delMarginR timeCustom">
                                        <div className="col-6 removepad">
                                            {cItem.Month} ماه قبل
                                    </div>
                                        <div className="col-6 removepad">
                                            <div className="col-auto mr-auto removepad float-left">
                                                گزارش
                                        </div>
                                        </div>
                                    </div>
                                    <hr className="hrrewidth" ></hr>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </Fragment>
        );
    }
}

export default order;