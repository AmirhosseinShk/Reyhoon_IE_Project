import React, { Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Css/global.css';
import './Css/resturants.css';
import Header from './header.js';
import Footer from './footer.js';
import topImage from './Css/assets/topImage.jpg'


function resturants() {
    return (
        <Fragment>
            <Header></Header>
            <div class="searchPart">
                <img src={topImage} alt="Image" class="topImage" />
                <p class="restNum"><span>23 </span>رستوران امکان سرویس دهی به <a href="/" class="area deleteUnderLink">تهران ، ولیعصر <i class="downarrow"></i></a> را دارند</p>
                <hr class="style1"></hr>
                <input class="form-control resizeSerachButtom" type="text" placeholder="&#xf002; جست و جوی رستوران در این محدوده" aria-label="Search"></input>
                <div class="container underSerachBox">
                    <div class="row">
                        <div class="col-3 col-md-3 filtering border rounded">
                            <p class="filterText">فیلتر بر اساس نوع غذا</p>
                            <hr class="style2"></hr>
                            <input class="form-control resizeSerachFood" type="text" placeholder="جست‌وجوی دسته‌بندی غذاها" aria-label="Search"></input>
                            <div class="cButtonDiv">   
                            <input class="cBox" id="cBox1" type="checkbox"/><label class="cBoxText" for="cBox1">ساندویچ</label>
                            <hr class="style2"></hr>
                            </div>
                            <div class="cButtonDiv">   
                            <input class="cBox" id="cBox2" type="checkbox"/><label class="cBoxText" for="cBox2">سالاد</label>
                            <hr class="style2"></hr>
                            </div>
                            <div class="cButtonDiv">   
                            <input class="cBox" id="cBox3" type="checkbox"/><label class="cBoxText" for="cBox3">برگر</label>
                            <hr class="style2"></hr>
                            </div>
                            <div class="cButtonDiv">   
                            <input class="cBox" id="cBox4" type="checkbox"/><label class="cBoxText" for="cBox4">فست فود</label>
                            <hr class="style2"></hr>
                            </div>

                        </div>
                        <div class="col-12 col-md-8">رستوران</div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </Fragment>
    );
}


export default resturants;