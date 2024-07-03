
$(document).ready(function () {

    $('#togglePassword').click(function () {
        var passwordField = $('#password');
        var passwordFieldType = passwordField.attr('type');
        if (passwordFieldType === 'password') {
            passwordField.attr('type', 'text');
            $('#togglePassword i').removeClass('fas fa-eye').addClass('fas fa-eye-slash');
        } else {
            passwordField.attr('type', 'password');
            $('#togglePassword i').removeClass('fas fa-eye-slash').addClass('fas fa-eye');
        }
    });

    function validateField(field) {
        var isValid = true;
        var id = field.attr('id');

        // Validate First Name
        if (id === 'firstName') {
            var firstName = field.val().trim();
            if (firstName === '') {
                $('#firstNameError').text('First Name is required').css('color', 'red');
                isValid = false;
            } else {
                $('#firstNameError').text('');
            }
        }

        // Validate Last Name
        if (id === 'lastName') {
            var lastName = field.val().trim();
            if (lastName === '') {
                $('#lastNameError').text('Last Name is required').css('color', 'red');
                isValid = false;
            } else {
                $('#lastNameError').text('');
            }
        }

        // Validate Email
        if (id === 'email') {
            var email = field.val().trim();
            if (email === '') {
                $('#emailError').text('Email is required').css('color', 'red');
                isValid = false;
            } else {
                var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(email)) {
                    $('#emailError').text('Invalid email format').css('color', 'red');
                    isValid = false;
                } else {
                    $('#emailError').text('');
                }
            }
        }

        // Validate Phone Number
        if (id === 'phone') {
            var phone = field.val().trim();
            if (phone === '') {
                $('#phoneError').text('Phone number is required').css('color', 'red');
                isValid = false;
            } else {
                var phonePattern = /^\d{10}$/;
                if (!phonePattern.test(phone)) {
                    $('#phoneError').text('Invalid phone number format').css('color', 'red');
                    isValid = false;
                } else {
                    $('#phoneError').text('');
                }
            }
        }

        // Validate Password
        if (id === 'password') {
            var password = field.val().trim();
            if (password === '') {
                $('#passwordError').text('Password is required').css('color', 'red');
                isValid = false;
            } else {
                if (password.length < 6) {
                    $('#passwordError').text('Password must be at least 6 characters').css('color', 'red');
                    isValid = false;
                } else {
                    var containsUpperCase = /[A-Z]/.test(password);
                    var containsLowerCase = /[a-z]/.test(password);
                    var containsNumbers = /\d/.test(password);
                    var containsSpecialChars = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(password);

                    if (!containsUpperCase) {
                        $('#passwordError').text('Password must contain at least one uppercase letter').css('color', 'red');
                        field.css('border', '1px solid red');
                        isValid = false;
                    } else if (!containsLowerCase) {
                        $('#passwordError').text('Password must contain at least one lowercase letter').css('color', 'red');
                        isValid = false;
                    } else if (!containsNumbers) {
                        $('#passwordError').text('Password must contain at least one number').css('color', 'red');
                        isValid = false;
                    } else if (!containsSpecialChars) {
                        $('#passwordError').text('Password must contain at least one special character').css('color', 'red');
                        isValid = false;
                    } else {
                        $('#passwordError').text('');
                    }
                }
            }
        }


        // Validate Confirm Password
        if (id === 'confirmPassword') {
            var confirmPassword = field.val();
            var password = $('#password').val();
            if (confirmPassword === '') {
                $('#confirmPasswordError').text('Confirm Password is required').css('color', 'red');
                isValid = false;
            } else {
                if (confirmPassword !== password) {
                    $('#confirmPasswordError').text('Passwords do not match').css('color', 'red');
                    isValid = false;
                } else {
                    $('#confirmPasswordError').text('');
                }
            }
        }

        return isValid;
    }

    // Form submission event
    $('#registrationForm').submit(function (event) {
        var isValid = true;
        $('input').each(function () {
            if (!validateField($(this))) {
                isValid = false;
            }
        });

        if (!isValid) {
            event.preventDefault();
        } else {
            event.preventDefault();
            displayFormData();
            clearForm();
            scrollToFormData();
        }
    });

    $('input').blur(function () {
        validateField($(this));
    });

    $('input').keyup(function () {
        var id = $(this).attr('id');
        if ($(this).val().trim() !== '') {
            $('#' + id + 'Error').text('');
            if (id === 'password') {
                $('#confirmPasswordError').text('');
            }
        }
    });

    function clearForm() {
        $('#registrationForm')[0].reset(); 
    }

    function scrollToFormData() {
        $('html, body').animate({
            scrollTop: $('#formDataDisplay').offset().top
        }, 100);
    }

    function displayFormData() {
        $('#displayFirstName').text('First Name: ' + $('#firstName').val());
        $('#displayLastName').text('Last Name: ' + $('#lastName').val());
        $('#displayEmail').text('Email: ' + $('#email').val());
        $('#displayPhone').text('Phone: ' + $('#phone').val());

        $('#formDataDisplay').show();
    }
});