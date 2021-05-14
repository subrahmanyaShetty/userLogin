# userLogin
a simple user registration app with node js
We can register user with following details first_name, last_name, email, mobileNo, address.(All fields are mandatory) "api/user/" POST request
User can login by providing email and password and JWT(json web token) will be returned which can be used for further operations. "api/auth/" POST request
Once user logged in he can see his details."api/user/me" GET by providing the JWT.
User can update his details. "api/user/me" PUT request
We can see user details. "api/user/" GET request.
