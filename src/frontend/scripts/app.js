var Vue = require("vue");
var axios = require("axios");

var scrollToPageMixin = {
    methods: {
        scrollToPage: function (event) {
            event.preventDefault();
            var el = event.target;
            var pageId = $(el).attr("href");
            console.log(pageId);
            // Figure out element to scroll to
            var page = $(pageId);
            $("html, body").animate({
                scrollTop: page.offset().top
            }, 500, function () {
                // Callback after animation
                // Must change focus!
                var $target = $(page);
                $target.focus();
                if ($target.is(":focus")) { // Checking if the target was focused
                    return false;
                } else {
                    $target.attr("tabindex", "-1"); // Adding tabindex for elements not focusable
                    $target.focus(); // Set focus again
                }
            });
        }
    }
};

var homePage = new Vue({
    el: "#home",
    mixins: [scrollToPageMixin]
});

var portfolioPage = new Vue({
    el: "#portfolio",
    mixins: [scrollToPageMixin],
    data: function () {
        return {
            images: []
        };
    },
    created: function () {
        var self = this;
        axios.get("/portfolio").then(
            function (response) {
                for (var i = 0; i < response.data.images.length; i++) {
                    self.images.push(response.data.images[i]);
                }
            },
            function (response) {
                // error callback
                // console.error(response.body);
            }
        );
    }
});
