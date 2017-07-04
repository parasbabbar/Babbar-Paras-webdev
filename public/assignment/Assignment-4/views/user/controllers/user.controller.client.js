
(function () {
    angular
        .module('WebAppMaker')
        .controller('loginController', loginController)
        .controller('registerController', registerController)
        .controller('profileController', profileController);

    function loginController($location, UserService) {
        var model = this;
        model.login = login;   //event handlers

        function login(username, password) {
            // var user = UserService.findUserByCredentials(username, password);
            UserService
                .findUserByCredentials(username, password)
                .then(function (user) {
                    if (user === '0') {
                        model.message = "Sorry, " + username + " not found. Please try again!!";
                    }
                    else {
                        $location.url("/user/" + user._id);
                    }
                });

        }
    }

    function registerController($location, UserService) {

        var model = this;

        model.register = register;

        function register(username, password, password2) {

            if (username === null || username === '' || typeof username === 'undefined') {
                model.message = 'username is required';
                return;
            }

            if (password !== password2 || password === null || typeof password === 'undefined') {
                model.message = "passwords must match";
                return;
            }

            UserService
                .findUserByUsername(username)
                .then(function (username) {
                    if (username === '0') {
                        model.message = "sorry, that username is taken";
                    }
                    else {
                        var user = {
                            username: username,
                            password: password
                        };
                        UserService
                            .createUser(user)
                            .then(function (user) {
                                $location.url('/user/' + user._id);

                            });
                    }
                });

        }
            }




    function profileController(UserService, $routeParams,$location) {

        var model = this;
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;

        var userId = $routeParams.uid;
        // var user = UserService.findUserById(userId);
        //
        // if (user != null) {
        //     model.user = user;
        // }

        UserService
            .findUserById(userId)
            .then(renderUser, Usermessage);

            function renderUser (User) {
            model.user = User;
        }
        function Usermessage (message){
                model.message = "User Not Found";

        }

        function updateUser(newUser) {
            UserService
                .updateUser(newUser._id, newUser)
                .then(function(newUser){
                if (newUser) {
                model.message = "User Updated Successfully!!"
                }
                else {
                model.message = "Oops! User already exists!!"
                }

            });
    }
        function deleteUser(dUser) {
            UserService
                .deleteUser(userId)
                .then(function(){
                    $location.url('/');
                });

        }


    }
})();


