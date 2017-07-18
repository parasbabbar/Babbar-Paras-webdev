(function() {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService($http) {
        var api = {
            "findUserByCredentials" : findUserByCredentials,
            "createUser" : createUser,
            "findUserByUsername" : findUserByUsername,
            "findUserById" : findUserById,
            "updateUser" : updateUser,
            "deleteUser" : deleteUser
        };
        return api;

        function findUserByCredentials (username, password) {
            var url = "/api/user?username="+username+"&password="+password;
            return $http.get(url)
                .then(function(response) {
                    console.log(response);
                    return response.data;
                });


        }

        function createUser(newUser) {
            var url = "/api/user";
            return $http.post(url, newUser)
                .then(function(response) {
                    return response.data;

                });

            // if(findUserByUsername(newUser.username)) {
            //     return null;
            // }
            // // else {
            // //         var nUser = {
            // //             _id :(new Date()).getTime()+"" ,
            // //             username: newUser.username,
            // //             password: newUser.password
            // //         };
            // //         users.push(nUser);
            // //         return nUser;
            //     }
        }

        function findUserByUsername(username) {
            var url = "/api/user?username="+username;
            return $http.get(url)
                .then(function(response) {
                    return response.data;

                });

        }

        function findUserById(userId) {

            var url = "/api/user/" +userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });



            // for(var u in users) {
            //     user = users[u];
            //     if(user._id === userId) {
            //         return user;
            //     }
            // }
            // return null;
        }

        function updateUser(userId, user) {
            var url = "/api/user/" +userId;
            return $http.put(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        // for(var u in users){
        //     user = users[u];
        //     if(user._id === userId){
        //         user.username = newUser.username;
        //         user.firstName = newUser.firstName;
        //         user.lastName = newUser.lastName;
        //         return true;
        //     }
        // }
        // return false;

        function deleteUser(userId) {
            var url = "/api/user/" +userId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });

        }
        //     for(var u in users){
        //         user = users[u];
        //         if(user._id === userId){
        //             user.splice();
        //             return true;
        //         }
        //     }
        //     return false;
        // }





    }
})();