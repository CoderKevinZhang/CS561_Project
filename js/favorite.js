function addFavorite(id) {
    var userName = getCookie("username");
    $.ajax({
        type: "POST",
        url: "../php/houseInfoHandler.php" ,
        data: {
            'houseService' : 'addFavoriteHouse',
            'houseId': id,
            'userName': userName,
        },
        success: function(result) {
            // console.log(result);
            alert("Add Favorite Success!");
        },
        error : function(error) {
            alert("bad request");
        }
    });
}

function changeModelForFavorite(){
    var userName = getCookie("username");
    $.ajax({
        type: "POST",
        url: "../php/userActionHandler.php" , //url
        data: {
            'userService' : 'getUserInfo', 
            'userName': userName,                    
        },
        success: function(result) {
            result = JSON.parse(result);
            user = result.msg;

            if (user.User_role == 1 || userName == ""){ //seller
                console.log("userRole:", user.User_role);
                var items = document.querySelectorAll(".item");

                for(i = 0; i< items.length; i++){
                   console.log("item[i]",items[i].childNodes[2])
                   items[i].childNodes[2].style.display = "none";
                }
            }
            else if (user.User_role == 2){ // buyer
                console.log('buyer have Favorite');
                //getFavoriteHouses(userName);
            }
        },
        error : function(error) {
            alert("bad request");  
        }
    });    
}

