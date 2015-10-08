var Vue = require("vue");

var vm = new Vue({
  el: "#app",
  components: {
    "demo": require("./demo.vue")
  },
  data: function() {
    return {
      result1: null,
      result2: null,
      result3: null,
      result4: null,
      startDatetime: moment(),
      endDatetime: null
    };
  }
});