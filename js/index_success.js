(function ($) {
    "use strict";

    var user = getCookie("username");

    if (user != "") {
        $('#user_name').text(user);
    }

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

    $("#logout-btn").click(function(){
        document.cookie = "username=" + "" + ";" ;
        var curUser;
        curUser = getCookie("username")
        if (curUser == ""){
            alert("Log out successfully!");
        }
        else{
            alert("Log out failed, please try again.");
            console.log(getCookie("username"));
        }
    });


})(jQuery);







