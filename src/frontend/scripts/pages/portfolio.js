var Vue = require("vue");

var portfolio = new Vue({
    el: "#portfolio",
    data: {
        images: {
            prev: "",
            current: "",
            next: ""
        }
    },
    methods: {
        sayHello: function() {
            console.log("Hello world");
        }
    }
});
