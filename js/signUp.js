
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

    $('.validate-form').on('submit',function(e){
        var check = true;
        var user_name;
        var password;
        var repassword;
        var email;
        var phone;

        for(var i=0; i<input.length; i++) {

            if ($(input[i]).attr('type') == 'text' && $(input[i]).attr('name') == 'username') {
                user_name = $(input[i]).val();
                if(validate(input[i]) == false){
                    showValidate(input[i]);
                    check = false;
                }
            }

            if ($(input[i]).attr('type') == 'password' && $(input[i]).attr('name') == 'psw') {
                password = $(input[i]).val();
                if(validate(input[i]) == false){
                    showValidate(input[i]);
                    check = false;
                }
            }

            if ($(input[i]).attr('type') == 'password' && $(input[i]).attr('name') == 'psw-repeat') {
                repassword = $(input[i]).val();
                if(validate(input[i]) == false){
                    showValidate(input[i]);
                    check = false;
                }
            }

            if ($(input[i]).attr('type') == 'email' && $(input[i]).attr('name') == 'email') {
                email = $(input[i]).val();
            }

            if ($(input[i]).attr('type') == 'tel' && $(input[i]).attr('name') == 'phone') {
                phone = $(input[i]).val();
            }
        }

        if (email != '') {
            email.trim().match(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/);
        }

        if (phone != '') {
            phone.trim().match(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/);
        }

        if (user_name != '' && email != '' && phone != '' && password != '' && repassword != '') {
            if (password != repassword) {
                check = false;
                alert("Your repeat password doesn't match your password!");
            }
        }

        if (select_option.val() == 0) {
            showValidate(select_option);
            check = false;
        }
        else{
            hideValidate(select_option);
        }

        if (check == true) {
            $.ajax({
                type: "POST",
                url: "../php/userActionHandler.php" , //url
                data: {'userService': 'signUp'},
                success: function (result) {
                    console.log(result);
                },
                error : function(error) {
                    
                }
            });
        }

      e.preventDefault();  
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).val().trim() == ''){
            return false;
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