var Vue = require("vue");
var axios = require("axios");
var socialLikes = require("social-likes-next").default;

var portfolio = new Vue({
    el: "#portfolio",
    data: function() {
        return {
            images: []
        };
    },
    created: function() {
        var self = this;
        axios.get("/portfolio").then(
            function(response) {
                for (var i = 0; i < response.data.images.length; i++) {
                    self.images.push(response.data.images[i]);
                }
            },
            function(response) {
                // error callback
                // console.error(response.body);
            }
        );
    }
});
