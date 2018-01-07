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
            $("html, body").animate(
                {
                    scrollTop: page.offset().top
                },
                500,
                function () {
                    // Callback after animation
                    // Must change focus!
                    var $target = $(page);
                    $target.focus();
                    if ($target.is(":focus")) {
                        // Checking if the target was focused
                        return false;
                    } else {
                        $target.attr("tabindex", "-1"); // Adding tabindex for elements not focusable
                        $target.focus(); // Set focus again
                    }
                }
            );
        }
    }
};

var bus = new Vue();

var aboutPage = new Vue({
    el: "about",
    mixins: [scrollToPageMixin]
});

var homePage = new Vue({
    el: "#home",
    mixins: [scrollToPageMixin],
    methods: {
        backCall: function (modalId) {
            bus.$emit("back-call:show");
        }
    }
});

var portfolioPage = new Vue({
    el: "#portfolio",
    mixins: [scrollToPageMixin],
    computed: {
        host: function () {
            var parser = document.createElement('a');
            parser.href = window.location.href;
            return parser.protocol + "//" + parser.host;
        }
    },
    methods: {
        openSharePopup: function (name, url) {
            var width = 600;
            var height = 400;
            var windowLeft = window.screenLeft ? window.screenLeft : window.screenX;
            var windowTop = window.screenTop ? window.screenTop : window.screenY;
            var left = windowLeft + (window.innerWidth / 2) - (width / 2);
            var top = windowTop + (window.innerHeight / 2) - (height / 2);
            var shareWindow = window.open(
                url,
                name,
                "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=" + width + ', height=' + height + ', top=' + top + ', left=' + left
            );
            if (window.focus) {
                shareWindow.focus();
            }
        },
        shareUrl: function () {
            var activePortfolioSlides = document.getElementsByClassName("carousel-item active");
            if (activePortfolioSlides.length < 1)
                return;
            var portfolioImages = activePortfolioSlides[0].getElementsByTagName("img");
            if (portfolioImages.length < 1)
                return;
            var imageSrc = portfolioImages[0].getAttribute("src");
            if (!imageSrc)
                return;
            var regexp = /([^/]+)\.(\w+)$/g;
            var matches = regexp.exec(imageSrc);
            if (matches.length < 3)
                return;
            var imageName = matches[1];
            var imageExt = matches[2];
            return this.host + "/portfolio/" + imageExt + "/" + imageName;
        },
        shareOnFacebook: function () {
            this.openSharePopup(
                "Share on Facebook",
                "https://www.facebook.com/sharer/sharer.php?u=" + this.shareUrl()
            );
        },
        shareOnVk: function () {
            this.openSharePopup(
                "Share on VK",
                "https://vk.com/share.php?url=" + this.shareUrl()
            );
        }
    }
});

var contacts = new Vue({
    el: "#contacts",
    mixins: [scrollToPageMixin]
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
        Inputmask().mask(this.$el.getElementsByTagName("input"));
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
        };
    },
    computed: {
        phone: function () {
            return this.form.fields.phone
                ? this.form.fields.phone.match(/\d+/g).join("")
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
            if (this.hasErrors) return;
            this.toggle();
            axios
                .post("/", {
                    phone: this.phone,
                    name: this.name,
                    time: this.time
                })
                .then(function (response) {
                    bus.$emit("notify:success", {
                        title: "Спасибо!",
                        text:
                            "Заявка на обратный звонок отправлена. Наш администратор свяжется с Вами в указанное или ближайшее время."
                    });
                })
                .catch(function (error) {
                    bus.$emit("notify:error", {
                        title: "Ошибка отправки",
                        text:
                            "К сожалению, не удалось отправить заявку на обратный звонок. Попробуйте повторить позже."
                    });
                });
        }
    }
});

var notification = new Vue({
    el: "#notification",
    created: function () {
        var self = this;
        bus.$on("notify:success", function (notification) {
            self.success.call(self, notification);
        });
        bus.$on("notify:error", function (notification) {
            self.error.call(self, notification);
        });
    },
    data: function () {
        return {
            type: "success",
            timer: undefined,
            visible: false,
            title: "",
            text: ""
        };
    },
    methods: {
        open: function (type, notification) {
            var self = this;
            self.type = type;
            self.title = notification.title || "";
            self.text = notification.text || "";
            self.visible = true;
            self.timer = setTimeout(function () {
                self.close.call(self);
            }, 5000);
        },
        close: function () {
            clearTimeout(this.timer);
            this.visible = false;
        },
        success: function (notification) {
            this.open("success", notification);
        },
        error: function (notification) {
            this.open("error", notification);
        }
    }
});
