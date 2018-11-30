(function ($) {
    "use strict";
    var ZIPCODE = new RegExp('^[0-9]{5}(?:-[0-9]{4})?$');
    var check = true;

    $('#filter').on('submit',function(e){
        var zipcode = $('#zipcode').val();
        var city = $('#city').val();
        var state = $('#state').val();
        var minPice = $('#minPice').val();
        var maxPrice = $('#maxPrice').val();
        var minSquare = $('#minSquare').val();
        var maxSquare = $('#maxSquare').val();
        var beds_option = $('#beds').val();
        var baths_option = $('#baths').val();

        if (maxPrice == '' || maxSquare == '') {
            maxPrice = '999999';
            maxSquare = '999999';
        }

        if (minPice == '' || minSquare == '') {
            minPice = '-1';
            minSquare = '-1';
        }

        if (!ZIPCODE.test(zipcode)) {
            check = false;
            alert("The format of your zipcode is wrong!");
        }

        if (check == true) {
            $.ajax({
                type: "POST",
                url: "" , //url
                data: {"houseService" : "getHouseInfo", "filtered": true,
                "filterVariables": {"city": city, "state": state, "zipCode": zipcode,
                'livingSpace': {"min":parseInt(minSquare), "max": parseInt(maxSquare)}, price: {"min": parseInt(minPice), "max": parseInt(maxPrice)},
                "bed": parseInt(beds_option), "bath": parseInt(baths_option)},
                "pageNum": INT, "itemPerPage": INT},
                success: function (result) {
                    
                },
                error : function(error) {
                    alert("Filter function failed!");
                }
            });
        }


        e.preventDefault();
    });

    
})(jQuery);

