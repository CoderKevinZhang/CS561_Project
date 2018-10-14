
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
    var check = true;

    // catch the input from userName and check if it's existing 
    $('#username').focusout(function(){
        var name = $('#username').val();
        if (name != null && name != '') {
            check = checkName(name);
        }
    });

    // check whether the validation of the sign in form
    $('.validate-form').on('submit',function(e){
        var user_name;
        var password;

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

        }

       // if (user_name != '' && password != '') {
       //      if (password != repassword) {
       //          check = false;
       //          alert("Your repeat password doesn't match your password!");
       //      }
       //  }

        // if user meet all requirement of sign in , then post to server 
        if (check == true) {
            $.ajax({
                type: "POST",
                url: "../php/userActionHandler.php" , //url
                data: {'userService' : 'signUp','userName':user_name, 'userPassword':password, 'userRole':user_role, 'userPhone': phone, 'userEmail': email},
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

    // check wheher the user name is existing or not 
    function checkName(name){
        var check = true;
        $.ajax({
            async: false,
            type: "POST",
            url: "../php/userActionHandler.php" , //url
            data: {'userService' : 'isDuplicate', 'userName': name},
            success: function (result) {
                if (JSON.parse(result).msg == true) {
                    check = false;
                    alert("Username has beed used!");
                }
            },
            error : function(error) {
                
            }
        })
        return check;
    }

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