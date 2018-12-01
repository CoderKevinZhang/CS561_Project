function addFavorite(id) {
    var userName = getCookie("username");
    console.log("here");
    $.ajax({
        type: "POST",
        data: {
            'houseService' : 'addFavoriteHouse',
            'item_id': id,
            'userName': userName,
        },
        success: function(result) {

        },
        error : function(error) {
            alert("bad request");
        }
    });
}
