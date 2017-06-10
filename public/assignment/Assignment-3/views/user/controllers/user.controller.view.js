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
            var user = UserService.findUserByCredentials(username, password);
            if (user === null) {
                model.message = "Sorry, " + username + " not found. Please try again!!";
            }
            else
                $location.url("/user/" + user._id);
        }

    }

    function registerController($location, UserService) {
        var model = this;
        model.register = register;   //event handlers

        function register(newUser) {
            if (newUser.password === newUser.Vpassword) {

                var nUser = UserService.createUser(newUser);
                if (nUser === null) {
                    model.message = "Username already exist";
                }
                else
                    $location.url("/user/" + nUser._id);
            }
            else {
                model.message = "Password is not matched"
            }
        }
    }

    function profileController(UserService, $routeParams) {

        var model = this;
        model.updateUser = updateUser;

        var userId = $routeParams.uid;
        var user = UserService.findUserById(userId);

        if (user != null) {
            model.user = user;
        }

        function updateUser(newUser) {
            var nUser = UserService.updateUser(userId, newUser);
            if (nUser) {
                model.success = "User Updated Successfully!!"
            }
            else {
                model.error = "Oops! User already exists!!"
            }

        }
    }
})();


