  
function validation()
{  
    var pass1 = document.getElementById('pass1').value;
    var pass2 = document.getElementById('pass2').value;
    var panel = document.getElementById('panel');
    var ok = true;//stores whether or not password passed validation.
    var uppercase = false;//stores whether or not the password contains an uppercase letter.
    var digit = false;//stores whether or not the password contains a digit.
    var error = "";//temporary string to store errors, if any.
    panel.innerHTML = ""; //clearing any text inside the side panel;

    //validating length.
        if(pass1.length < 8)
        {
            error += "<p>Minimun Password length: 8</p>";
            ok = false;

        }
      //checking if strings match. 
        if(pass1 != pass2)
        {
            error += "<p>Passwords do not match</p>";
            ok = false;
        }
    //checking if password starts with a letter.
        if(!(pass1.charCodeAt(0) >= 65 && pass1.charCodeAt(0) <= 90) && !(pass1.charCodeAt(0) >= 97 && pass1.charCodeAt(0) <= 122) )
        {
            error += "<p>Password should start with a letter</p>";
            ok = false;
        }
        //checking whether the password contains a digit and an uppercase letter.
            for( var i = 0; i < pass1.length; i++)
            {
                if(pass1.charCodeAt(i) >= 48 && pass1.charCodeAt(i) <= 57)
                {
                    digit = true;
                }
                if(pass1.charCodeAt(i) >= 65 && pass1.charCodeAt(i) <= 90)
                {
                    uppercase = true;
                }
            }
            if(!digit)
            {
                error += "<p>Password must contain a digit</p>";
                ok = false;
            }
            if(!uppercase)
            {
                error += "<p>Password must contain an uppercase letter</p>";
                ok = false;
            }
            if(!ok)
            {
                panel.innerHTML = error;
                alert("Submission failed! Please implement the changes stated in the side panel into your password");
                return false;
        
            }
            else{
                alert("Hooray!!You have been registered successfully!");
                return true;
            }
}
