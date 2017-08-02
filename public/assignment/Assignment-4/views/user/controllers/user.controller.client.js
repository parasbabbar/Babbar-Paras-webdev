
(function () {
    angular
        .module('WebAppMaker')
        .controller('loginController', loginController)
        .controller('registerController', registerController)
        .controller('profileController', profileController);


    function loginController($location, UserService) {

        var model = this;
        model.login = login;

        function login(username, password) {
            // console.log("in controller login"+username);
            if (username && password){
                // console.log(password);
                UserService
                    .login(username, password)
                    .then(function (response) {
                            var user = response.username;
                            console.log(user);
                            // console.log("near redirect"+user);
                            // console.log(user);
                            if (user)
                            //$location.url("/user/" + user._id);
                                $location.url("/profile");
                            else
                                model.message = "User not found";
                        },
                        function (err) {
                            model.message = "User not found";
                        });
            }
            else{
                model.message="Oops !! Please enter username and password!!";
            }

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
                            .register(user)
                            // .createUser(user)
                            .then(function (user) {
                                $location.url('/profile');

                            });
                    }
                });

        }
    }





    function profileController(UserService, $routeParams,$location,currentUser) {

        var model = this;
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.logout = logout;
        var Id = currentUser._id;
        console.log(Id);

        // var userId = $routeParams.uid;
        // var user = UserService.findUserById(userId);
        //
        // if (user != null) {
        //     model.user = user;
        // }

        function init() {

            UserService
                .findUserById(Id)
                .then(renderUser, Usermessage);
        }
        init();

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
                .deleteUser(Id)
                .then(function(){
                    $location.url('/');
                });

        }

        function logout(){
            UserService
                .logout()
                .then(
                    function(response){
                        $location.url("/login");
                    },
                    function(){
                        $location.url("/login");
                    }
                )
        }

    }
})();
