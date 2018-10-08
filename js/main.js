
(function ($) {
    "use strict";

    /*==================================================================
    [ Focus Contact2 ]*/
    $('.input100').each(function(){
        $(this).on('blur', function(){
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })    
    })

    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');
    var select_option = $('.select-options');
    var password = -1;
    var repassword = -1;

    $('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {

            if ($(input[i]).attr('type') == 'password' && $(input[i]).attr('name') == 'psw') {
                password = input[i];
            }

            if ($(input[i]).attr('type') == 'password' && $(input[i]).attr('name') == 'psw-repeat') {
                repassword = input[i];
            }

            if(validate(input[i]) == false){
                showValidate(input[i]);
                check = false;
            }
        }

        if (password != repassword) {
            check = false;
        }

        if (select_option.val() == 0) {
            showValidate(select_option);
            check = false;
        }
        else{
            hideValidate(select_option);
        }

        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    

})(jQuery);