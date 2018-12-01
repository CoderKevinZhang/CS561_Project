var allItemElems = [];
function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

function changeCity(){
    var cities = [];
    cities['California'] = ["Mountain View","Los Angeles","Sunnyvale","Cupertino","Torrance","Northridge","San Diego","San Jose","Placerville","Redwood City"];
    cities['Oregon'] =  ["Sandy","Coquille","Hillsboro","Portland","Lebanon","Salem","Stayton","Beaverton","Lake Oswego","Hermiston"];
    cities['Florida'] = ["Fort Lauderdale","Miami","Apollo Beach","Tallahassee","Winter Garden","Tampa","Anthony","Fort Myers","Hollywood" ,"Jacksonville"];
    cities['Washington'] = ["Seattle","Bellevue","Bothell","Kennewick","Redmond","Renton","Kent","Kirkland","Shelton","Bonney Lake"];
    cities['Michigan'] =["Grand Blanc","Southgate","Fennville","Williamston","Farmington","Rochester","Allegan","Grand Rapids","Brighton","Detroit"];
   
    
    var state = document.getElementById('state').value;
    var cityList = document.getElementById('city');
    var length = cityList.options.length = 0;
    var city = cities[state];
    
    //console.log(city);
    for (i = 0; i < 10; i++){
         var opt = document.createElement('option');
         opt.value = city[i];
         opt.innerHTML = city[i];
         cityList.appendChild(opt);
    }
}    
    
function logOut(){
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    curUser = getCookie("username")
    if (curUser == ""){
        alert("Log out successfully!");
        location.reload();
    }
    else{
        alert("Log out failed, please try again.");
    }
}    
// Wait until the DOM content is loaded to hook up UI interactions, etc.
window.addEventListener('DOMContentLoaded', function (event) {

  var userName = getCookie('username');
  if (userName !==""){
    document.getElementById('before_login_show_sign_up').style.display = "none";
    document.getElementById('before_login_show_sign_in').style.display = "none";
    var user = document.getElementById('after_login_show_user_name');
    user.style.display = "block";
    document.getElementById('user_name').innerHTML = userName;
    //changeModelForFavorite();
  }
  
  

});
