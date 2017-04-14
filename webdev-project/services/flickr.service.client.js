(function () {
    angular
        .module("WebAppMaker")
        .factory("FlickrService",FlickrService);

    function FlickrService($http) {
        var key = "48087779b84953f491efd79f60404126";
        var secret = "b8b627826bafa36c";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        var api = {
            "searchPhotos":searchPhotos
        };
        return api;

        function searchPhotos(searchTerm) {
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);
        }
    }
})();