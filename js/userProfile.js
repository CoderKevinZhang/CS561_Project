function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";

}

// User stored cookie to get user info
function getUserInfo(){
    var userName = getCookie("username");
    console.log(userName);
    $.ajax({
                type: "POST",
                url: "../php/userActionHandler.php" , //url
                data: {
                    'userService' : 'getUserInfo', 
                    'userName': userName,                    
                },
                success: function(result) {
                    result = JSON.parse(result);
                    console.log(result);
                    user = JSON.parse(result.msg);
                   
                    document.getElementById('userName').value = user.User_name;
                    document.getElementById('userEmail').value = user.Email;
                    document.getElementById('userPhone').value = user.Phone;
                    document.getElementById('userRole'). vale = user.User_role;
                },
                error : function(error) {
                    alert("bad request");  
                }
            });    
}


function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
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

function getUploadedHouses(){
    var userName = getCookie("username");
    console.log(userName);
    $.ajax({
                type: "POST",
                url: "../php/houseInfoHandler.php" , //url
                data: {
                    'houseService' : 'getUploadedHouses', 
                    'userName': userName,
                },
                success: function(result) {
                    result = JSON.parse(result);
                    console.log(result);
                    
                },
                error : function(error) {
                    alert("bad request");  
                }
            }); 
}

function getFavoriteHouses(){
    var userName = getCookie("username");
    console.log(userName);
    $.ajax({
                type: "POST",
                url: "../php/houseInfoHandler.php" , //url
                data: {
                    'houseService' : 'getFavoriteHouses', 
                    'userName': userName,                    
                },
                success: function(result) {
                },
                error : function(error) {
                    alert("bad request");  
                }
            });     
}


document.addEventListener('DOMContentLoaded', function(){
    getUserInfo();
}, false);