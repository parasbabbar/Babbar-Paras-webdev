/**
 * Created by paras on 7/4/17.
 */
(function(){
    angular
        .module("wbdvDirectives", [])
        .directive("wbdvSortable",function(){

            function linker(scope, element, attributes){
                var start = -1;
                var end = -1;

                element.sortable({
                    start: function(event, ui){
                        start = $(ui.item).index();
                    },
                    stop: function(event, ui){
                        end = $(ui.item).index();
                        scope.sortableController.sort(start, end);
                    }
                });
            }

            return {
                scope:{},
                link: linker,
                controller: sortableController,
                controllerAs: 'sortableController'
            }

            function sortableController($routeParams,WidgetService){
                var model = this;
                model.sort = sort;
                model.pageId = $routeParams["pid"];
                function sort(start,end){
                    WidgetService.sort(model.pageId,start,end);
                }
            }
        });


})();