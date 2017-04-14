(function () {
    angular
        .module('WebAppMaker')
        .directive('myOnKeyDownCall', myOnKeyDownCall);

      function myOnKeyDownCall(scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            scope.$apply(function (){
            return    scope.$eval(attrs.ngEnter);
            });
            event.preventDefault();
        });
    };
})();
