var assert = require("assert");
var Vue = require("vue");
var Demo = require("../../demo/demo.vue");
var DatetimePicker = require("../../src/vue-datetime-picker.js");
var VueI18n = require("../../lib/vue-i18n-plugin/src/vue-i18n.js");

function getDemoVM (rootId, initResult1, initResult2,
                    initResult3, initResult4,
                    initStartDatetime, initEndDatetime) {
  return Vue.extend({
    template: "<div><demo v-ref='demo'></demo></div>",
    el: function() {
      var el = document.createElement("div");
      el.id = rootId;
      document.body.appendChild(el);
      return el;
    },
    components: {
      "demo": Demo
    },
    data: function() {
      return {
        result1: initResult1,
        result2: initResult2,
        result3: initResult3,
        result4: initResult4,
        startDatetime: initStartDatetime,
        endDatetime: initEndDatetime
      };
    }
  });
}

function getI18nVM(rootId, language) {
  return Vue.extend({
    template: "<div>" +
              "  <vue-datetime-picker v-ref='picker' model='{{@ result}}'>" +
              "  </vue-datetime-picker>" +
              "</div>",
    components: {
      "vue-datetime-picker": DatetimePicker
    },
    el: function() {
      var el = document.createElement("div");
      el.id = rootId;
      document.body.appendChild(el);
      return el;
    },
    data: function() {
      return {
        result: null
      };
    },
    created: function() {
      this.$setLanguage(language);
    }
  });
}

describe("vue-datetime-picker", function() {
  describe("static render", function() {
    var initResult1 = null;
    var initResult2 = moment("2015-01-22 13:24:55", "YYYY-MM-DD HH:mm:ss");
    var initResult3 = moment("2015-10-25", "YYYY-MM-DD");
    var initResult4 = moment("6:21:12", "HH:mm:ss");
    var initStartDatetime = moment("2015-01-22 13:24:55", "YYYY-MM-DD HH:mm:ss");
    var initEndDatetime = null;
    var VM = getDemoVM("static-render", initResult1, initResult2, initResult3,
      initResult4, initStartDatetime, initEndDatetime);
    var vm = new VM();
    it("picker1", function(done) {
      vm.$nextTick(function() {
        var demo = vm.$.demo;
        var picker1 = demo.$.picker1.control;
        assert.equal(picker1.date(), null);
        assert.equal(picker1.locale(), "en");
        done();
      });
    });
    it("picker2", function(done) {
      vm.$nextTick(function() {
        var demo = vm.$.demo;
        var picker2 = demo.$.picker2.control;
        assert.equal(picker2.date().format("YYYY-MM-DD HH:mm:ss"),
                     initResult2.format("YYYY-MM-DD HH:mm:ss"));
        assert.equal(picker2.locale(), "en");
        done();
      });
    });
    it("picker3", function(done) {
      vm.$nextTick(function() {
        var demo = vm.$.demo;
        var picker3 = demo.$.picker3.control;
        assert.equal(picker3.date().format("YYYY-MM-DD"),
                     initResult3.format("YYYY-MM-DD"));
        assert.equal(picker3.locale(), "en");
        done();
      });
    });
    it("picker4", function(done) {
      vm.$nextTick(function() {
        var demo = vm.$.demo;
        var picker4 = demo.$.picker4.control;
        assert.equal(picker4.date().format("HH:mm:ss"),
                     initResult4.format("HH:mm:ss"));
        assert.equal(picker4.locale(), "zh-cn");
        done();
      });
    });
    it("start-picker", function(done) {
      vm.$nextTick(function() {
        var demo = vm.$.demo;
        var startPicker = demo.$.startPicker.control;
        assert.equal(startPicker.date().format("YYYY-MM-DD HH:mm:ss"),
                     initStartDatetime.format("YYYY-MM-DD HH:mm:ss"));
        assert.equal(startPicker.locale(), "en");
        done();
      });
    });
    it("end-picker", function(done) {
      vm.$nextTick(function() {
        var demo = vm.$.demo;
        var endPicker = demo.$.endPicker.control;
        assert.equal(endPicker.date(), null);
        assert.equal(endPicker.locale(), "en");
        done();
      });
    });
  });

  describe("change the model", function() {
    var initResult1 = null;
    var initResult2 = moment("2015-01-22 13:24:55", "YYYY-MM-DD HH:mm:ss");
    var initResult3 = moment("2015-10-25", "YYYY-MM-DD");
    var initResult4 = moment("6:21:12", "HH:mm:ss");
    var initStartDatetime = moment("2015-01-22 13:24:55", "YYYY-MM-DD HH:mm:ss");
    var initEndDatetime = null;
    var VM = getDemoVM("change-model", initResult1, initResult2, initResult3,
      initResult4, initStartDatetime, initEndDatetime);
    var vm = new VM();
    it("picker1", function(done) {
      vm.$nextTick(function() {
        var demo = vm.$.demo;
        var picker1 = demo.$.picker1.control;
        vm.result1 = moment("2015-01-22 13:24:55", "YYYY-MM-DD HH:mm:ss");
        vm.$nextTick(function() {
          assert.equal(picker1.date().format("YYYY-MM-DD HH:mm:ss"), "2015-01-22 13:24:55");
          done();
        });
      });
    });
    it("picker2, set to null", function(done) {
      vm.$nextTick(function() {
        var demo = vm.$.demo;
        var picker2 = demo.$.picker2.control;
        vm.result2 = null;
        vm.$nextTick(function() {
          assert.equal(picker2.date(), null);
          done();
        });
      });
    });
    it("picker3", function(done) {
      vm.$nextTick(function() {
        var demo = vm.$.demo;
        var picker3 = demo.$.picker3.control;
        vm.result3 = moment("2010-01-01", "YYYY-MM-DD");
        vm.$nextTick(function() {
          assert.equal(picker3.date().format("YYYY-MM-DD"), "2010-01-01");
          done();
        });
      });
    });
    it("picker4", function(done) {
      vm.$nextTick(function() {
        var demo = vm.$.demo;
        var picker4 = demo.$.picker4.control;
        vm.result4 = moment("12:33:12", "HH:mm:ss");
        vm.$nextTick(function() {
          assert.equal(picker4.date().format("HH:mm:ss"), "12:33:12");
          done();
        });
      });
    });
    it("start-picker", function(done) {
      vm.$nextTick(function() {
        var demo = vm.$.demo;
        var startPicker = demo.$.startPicker.control;
        vm.startDatetime = moment("2015-01-22 13:24:55", "YYYY-MM-DD HH:mm:ss");
        vm.$nextTick(function() {
          assert.equal(startPicker.date().format("YYYY-MM-DD HH:mm:ss"), "2015-01-22 13:24:55");
          done();
        });
      });
    });
    it("end-picker", function(done) {
      vm.$nextTick(function() {
        var demo = vm.$.demo;
        var endPicker = demo.$.endPicker.control;
        vm.endDatetime = moment("2015-01-23 13:24:55", "YYYY-MM-DD HH:mm:ss");
        vm.$nextTick(function() {
          assert.equal(endPicker.date().format("YYYY-MM-DD HH:mm:ss"), "2015-01-23 13:24:55");
          done();
        });
      });
    });
  });

  describe("change the selection", function() {
    var initResult1 = null;
    var initResult2 = moment("2015-01-22 13:24:55", "YYYY-MM-DD HH:mm:ss");
    var initResult3 = moment("2015-10-25", "YYYY-MM-DD");
    var initResult4 = moment("6:21:12", "HH:mm:ss");
    var initStartDatetime = moment("2015-01-22 13:24:55", "YYYY-MM-DD HH:mm:ss");
    var initEndDatetime = null;
    var VM = getDemoVM("change-selection", initResult1, initResult2, initResult3,
      initResult4, initStartDatetime, initEndDatetime);
    var vm = new VM();
    it("picker1", function(done) {
      vm.$nextTick(function() {
        var demo = vm.$.demo;
        var picker1 = demo.$.picker1.control;
        picker1.date(moment("2015-01-22 13:24:55", "YYYY-MM-DD HH:mm:ss"));
        vm.$nextTick(function() {
          assert.equal(vm.result1.format("YYYY-MM-DD HH:mm:ss"), "2015-01-22 13:24:55");
          done();
        });
      });
    });
    it("picker2, set to null", function(done) {
      vm.$nextTick(function() {
        var demo = vm.$.demo;
        var picker2 = demo.$.picker2.control;
        picker2.date(null);
        vm.$nextTick(function() {
          assert.equal(vm.result2, null);
          done();
        });
      });
    });
    it("picker3", function(done) {
      vm.$nextTick(function() {
        var demo = vm.$.demo;
        var picker3 = demo.$.picker3.control;
        picker3.date(moment("2010-01-01", "YYYY-MM-DD"));
        vm.$nextTick(function() {
          assert.equal(vm.result3.format("YYYY-MM-DD"), "2010-01-01");
          done();
        });
      });
    });
    it("picker4", function(done) {
      vm.$nextTick(function() {
        var demo = vm.$.demo;
        var picker4 = demo.$.picker4.control;
        picker4.date(moment("12:33:12", "HH:mm:ss"));
        vm.$nextTick(function() {
          assert.equal(vm.result4.format("HH:mm:ss"), "12:33:12");
          done();
        });
      });
    });
    it("start-picker", function(done) {
      vm.$nextTick(function() {
        var demo = vm.$.demo;
        var startPicker = demo.$.startPicker.control;
        startPicker.date(moment("2015-01-22 13:24:55", "YYYY-MM-DD HH:mm:ss"));
        vm.$nextTick(function() {
          assert.equal(vm.startDatetime.format("YYYY-MM-DD HH:mm:ss"), "2015-01-22 13:24:55");
          done();
        });
      });
    });
    it("end-picker", function(done) {
      vm.$nextTick(function() {
        var demo = vm.$.demo;
        var endPicker = demo.$.endPicker.control;
        endPicker.date(moment("2015-01-23 13:24:55", "YYYY-MM-DD HH:mm:ss"));
        vm.$nextTick(function() {
          assert.equal(vm.endDatetime.format("YYYY-MM-DD HH:mm:ss"), "2015-01-23 13:24:55");
          done();
        });
      });
    });
  });

  describe("Customized onChange function", function() {
    var initResult1 = null;
    var initResult2 = moment("2015-01-22 13:24:55", "YYYY-MM-DD HH:mm:ss");
    var initResult3 = moment("2015-10-25", "YYYY-MM-DD");
    var initResult4 = moment("6:21:12", "HH:mm:ss");
    var initStartDatetime = moment("2015-01-22 13:24:55", "YYYY-MM-DD HH:mm:ss");
    var initEndDatetime = null;
    var VM = getDemoVM("customized-onchange", initResult1, initResult2, initResult3,
      initResult4, initStartDatetime, initEndDatetime);
    var vm = new VM();
    it("start-picker: change model", function(done) {
      vm.$nextTick(function() {
        var demo = vm.$.demo;
        var startPicker = demo.$.startPicker.control;
        var endPicker = demo.$.endPicker.control;
        vm.startDatetime = moment("2015-01-22 13:24:55", "YYYY-MM-DD HH:mm:ss");
        vm.$nextTick(function() {
          assert.equal(startPicker.date().format("YYYY-MM-DD HH:mm:ss"), "2015-01-22 13:24:55");
          assert.equal(endPicker.minDate().format("YYYY-MM-DD HH:mm:ss"), "2015-01-22 13:24:55");
          done();
        });
      });
    });
    it("start-picker: change selection", function(done) {
      vm.$nextTick(function() {
        var demo = vm.$.demo;
        var startPicker = demo.$.startPicker.control;
        var endPicker = demo.$.endPicker.control;
        startPicker.date(moment("2015-01-22 13:24:55", "YYYY-MM-DD HH:mm:ss"));
        vm.$nextTick(function() {
          assert.equal(vm.startDatetime.format("YYYY-MM-DD HH:mm:ss"), "2015-01-22 13:24:55");
          assert.equal(endPicker.minDate().format("YYYY-MM-DD HH:mm:ss"), "2015-01-22 13:24:55");
          done();
        });
      });
    });
    it("end-picker: change the model", function(done) {
      vm.$nextTick(function() {
        var demo = vm.$.demo;
        var startPicker = demo.$.startPicker.control;
        var endPicker = demo.$.endPicker.control;
        vm.endDatetime = moment("2015-01-23 13:24:55", "YYYY-MM-DD HH:mm:ss");
        vm.$nextTick(function() {
          assert.equal(endPicker.date().format("YYYY-MM-DD HH:mm:ss"), "2015-01-23 13:24:55");
          assert.equal(startPicker.maxDate().format("YYYY-MM-DD HH:mm:ss"), "2015-01-23 13:24:55");
          done();
        });
      });
    });
    it("end-picker: change the selection", function(done) {
      vm.$nextTick(function() {
        var demo = vm.$.demo;
        var startPicker = demo.$.startPicker.control;
        var endPicker = demo.$.endPicker.control;
        endPicker.date(moment("2015-01-23 13:24:55", "YYYY-MM-DD HH:mm:ss"));
        vm.$nextTick(function() {
          assert.equal(vm.endDatetime.format("YYYY-MM-DD HH:mm:ss"), "2015-01-23 13:24:55");
          assert.equal(startPicker.maxDate().format("YYYY-MM-DD HH:mm:ss"), "2015-01-23 13:24:55");
          done();
        });
      });
    });
  });

  describe("test the i18n plugin", function() {
    before(function() {
      Vue.use(VueI18n, {
        baseUrl: "/base/test/specs/i18n"
      });
    });
    it("test language", function(done) {
      var VM = getI18nVM("test-i18n", "zh-CN");
      var vm = new VM();
      vm.$nextTick(function() {
        var picker = vm.$.picker.control;
        assert.equal(picker.locale(), "zh-cn");
        done();
      });
    });
    it("test tooltips", function(done) {
      var VM = getI18nVM("test-i18n", "zh-CN");
      var vm = new VM();
      vm.$nextTick(function() {
        var picker = vm.$.picker.control;
        var tooltips = picker.tooltips();
        assert.equal(tooltips.today, "跳转至今日");
        assert.equal(tooltips.clear, "清除选择");
        assert.equal(tooltips.close, "关闭选择器");
        assert.equal(tooltips.selectTime, "Select Time");
        done();
      });
    });
  });
});