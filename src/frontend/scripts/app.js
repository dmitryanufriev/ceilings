var Vue = require("vue");
var axios = require("axios");
var Inputmask = require("inputmask");

var scrollToPageMixin = {
    methods: {
        scrollToPage: function (event) {
            event.preventDefault();
            var el = event.target;
            var pageId = $(el).attr("href");
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

var bus = new Vue();

var homePage = new Vue({
    el: "#home",
    mixins: [scrollToPageMixin],
    methods: {
        backCall: function (modalId) {
            bus.$emit("back-call:show")
        }
    }
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

var backCallModal = new Vue({
    el: "#modalBackCall",
    created: function () {
        var self = this;
        bus.$on("back-call:show", function () {
            self.toggle.call(self);
        });
    },
    mounted: function () {
        Inputmask().mask(
            this.$el.getElementsByTagName("input")
        );
    },
    data: function () {
        return {
            shown: false,
            form: {
                fields: {
                    phone: "",
                    name: "",
                    time: ""
                },
                errors: {
                    phone: false
                }
            }
        }
    },
    computed: {
        phone: function () {
            return this.form.fields.phone
                ? this.form.fields.phone
                    .match(/\d+/g)
                    .join("")
                : "";
        },
        name: function () {
            return this.form.fields.name;
        },
        time: function () {
            return this.form.fields.time;
        },
        hasErrors: function () {
            return this.form.errors.phone;
        }
    },
    methods: {
        toggle: function () {
            this.form.errors.phone = false;
            $(this.$el).modal("toggle");
        },
        validate: function () {
            this.validatePhone();
        },
        validatePhone: function () {
            this.form.errors.phone = this.phone.length !== 10;
        },
        send: function (event) {
            event.preventDefault();
            event.stopPropagation();
            this.validate();
            if (this.hasErrors)
                return;
            this.toggle();
            console.log("Please, call me");
            console.log(this.form.fields.phone);
        }
    }
});
