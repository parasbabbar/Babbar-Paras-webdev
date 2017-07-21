/**
 * Created by paras on 7/21/17.
 */
(function () {
    angular
        .module('pocApp', [])
        .controller('pocController', pocController);

    function pocController($http) {
        var model = this;
        model.searchQuestion = searchQuestion;
        model.searchDetail = searchDetail;

        function searchQuestion(searchTerm){
            var url ="https://api.stackexchange.com/2.2/search/excerpts?order=desc&sort=activity&title=as&site=stackoverflow"

            url = url.replace("title=as","title="+searchTerm);

            $http.get(url)
                .then(function (response) {
                    console.log(response);
                    model.questions = response.data.items;
                });
        }
        function searchDetail(qid) {
            var url = "https://api.stackexchange.com/2.2/questions/{ids}/answers?order=desc&sort=activity&site=stackoverflow"
            url = url.replace("{ids}",qid);
            $http.get(url)
                .then(function (response){
                    if (response.data.items[0] === undefined) {
                        model.message = "User is Anonymous"
                    }
                    else {
                        model.users = response.data.items[0];
                        console.log(model.users);
                    }

                });
        }

    }


})();