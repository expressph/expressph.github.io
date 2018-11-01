$(document).ready(function () {   
});

//global variable for all page
var api = 'http://97.74.228.64:9000';
var routes = {
    lists :     '/api/lists',
    store :     '/api/store',
    find :      '/api/find'
};

//
// Requests GET | POST 
//
function post(url, request, callback) { 
    $.ajax({
        url: api+url,
        type: "POST",
        dataType: "json",
        data: request,
        // header : getHeader(),
        success: function (data) {
            callback(data);
        },
        error: function (data) {
            console.log(data);
            showError('Server error', 'Please ask the system administrator about this!', function(){
            
            });
        }
    });
}

function postWithHeader(url, request, callback) {
    var token = localStorage.getItem('token'); 
    $.ajax({
        url: api + url,
        type: "POST",
        dataType: "json",
        data: request,
        headers: {
            token: token
        },
        success: function (data) {
            callback(data);
        },
        error: function (data) {
            showError('Server error', 'Please ask the system administrator about this!', function(){

            });
        }
    }); 
}

function get(url, request, callback) {
     $.ajax({
         url: api + url,
         type: "GET",
         dataType: "json",
         data: request,
         // header : getHeader(),
         success: function (data) {
             callback(data);
         },
         error: function (data) {
             showError('Server error', 'Please ask the system administrator about this!', function(){

             });
         }
     }); 
}
  
function showInfo(title, message, callback){
    iziToast.info({
        title: title,
        message: message,
        position: 'topRight',
        // backgroundColor: 'rgba(129,212,250, 1)',
        onClosed: function () {
            callback();
        }
    });
}

function showSuccess(title,message, callback){
    iziToast.success({
        title:      title,
        message:    message,
        position: 'topRight',
        onClosed:   function () {
            callback();
        }
    }); 
}

function showWarning(title, message, callback) {
    iziToast.warning({
        title: title,
        message: message,
        position: 'topRight',
        onClosed: function () {
            callback();
        }
    });
}

function showError(title, message, callback) {
    iziToast.error({
        title: title,
        message: message,
        position: 'topRight',
        onClosed: function () {
            callback();
        }
    });
}
 