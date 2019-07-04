import $ from 'jquery';

$( document ).ready(function(){
    $.get("http://localhost:8084/api/restaurants?area=بلوار کشاورز" , function(restObject){
        console.log(restObject);
        var resturantJson = restObject;
    });
});