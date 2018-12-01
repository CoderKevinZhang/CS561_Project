function addFavorite(id) {
    // var userName = getCookie("username");
    $.ajax({
        type: "POST",
        data: {
            'houseService' : 'addFavoriteHouse',
            'houseId': id,
            'userName': "buyer",
        },
        success: function(result) {
            // console.log(result);
            // alert("Add Favorite Success!");
        },
        error : function(error) {
            alert("bad request");
        }
    });
}
