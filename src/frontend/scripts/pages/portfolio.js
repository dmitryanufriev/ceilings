var Vue = require("vue");
var axios = require("axios");

var portfolio = new Vue({
    el: "#portfolio",
    data: function() {
        return {
            current_image: -1,
            images: []
        };
    },
    created: function() {
        var self = this;
        axios.get("/portfolio").then(
            function(response) {
                self.images = response.data.images;
                self.current_image = self.images.length > 0 ? 0 : -1;
            },
            function(response) {
                // error callback
                // console.error(response.body);
            }
        );
    },
    computed: {
        prev: function() {
            return this.current_image > 0
                ? this.images[this.current_image - 1]
                : "";
        },

        current: function() {
            return this.current_image > -1
                ? this.images[this.current_image]
                : "";
        },

        next: function() {
            return this.current_image < this.images.length - 1
                ? this.images[this.current_image + 1]
                : "";
        }
    },
    methods: {
        next: function() {
            this.current_image++;
        },
        prev: function() {
            this.current_image--;
        }
    }
});
