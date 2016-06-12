
/**
 * The array of names of the tooltip messages of the datetime picker.
 *
 * This is a constant and should not be modified.
 */
var DATETIME_PICKER_TOOLTIPS = [
  "today", "clear", "close",
  "selectMonth", "prevMonth", "nextMonth",
  "selectYear", "prevYear", "nextYear",
  "selectDecade", "prevDecade", "nextDecade",
  "prevCentury", "nextCentury",
  "pickHour", "incrementHour", "decrementHour",
  "pickMinute", "incrementMinute", "decrementMinute",
  "pickSecond", "incrementSecond", "decrementSecond",
  "togglePeriod", "selectTime"
];

/**
 * The default language used by this component.
 */
var DEFAULT_LANGUAGE = "en-US";

/**
 * A datetime picker control.
 *
 * @param model
 *    the model bind to the control, which must be a two way binding variable.
 * @param type
 *    the optional type of this datetime picker control. Available values are
 *    - "datetime": Indicating that this control is a datetime picker,
 *    - "date": Indicating that this control is a date picker,
 *    - "time": Indicating that this control is a time picker.
 *    Default value is "datetime".
 * @param language
 *    the optional language code used to localize the control, which must be
 *    a valid language code supported by the moment.js library. If it is not set,
 *    and the [vue-i18n](https://github.com/Haixing-Hu/vue-i18n) plugin is used,
 *    the component will use the language code `$language` provided by the
 *    [vue-i18n](https://github.com/Haixing-Hu/vue-i18n) plugin; otherwise, the
 *    component will use the default value "en-US".
 * @param datetimeFormat
 *    the optional format of the datetime this component should display, which
 *    must be a valid datetime format of the moment.js library. This property
 *    only works when the "type" property is "datetime". Default value is
 *    "YYYY-MM-DD HH:mm:ss".
 * @param dateFormat
 *    the optional format of the date this component should display, which
 *    must be a valid datetime format of the moment.js library. This property
 *    only works when the "type" property is "date". Default value is
 *    "YYYY-MM-DD".
 * @param timeFormat
 *    the optional format of the time this component should display, which
 *    must be a valid datetime format of the moment.js library. This property
 *    only works when the "type" property is "time". Default value is
 *    "HH:mm:ss".
 * @param name
 *    the optional name of the selection control.
 * @param onChange
 *    the optional event handler triggered when the value of the datetime picker
 *    was changed. If this parameter is presented and is not null, it must be a
 *    function which accept one argument: the new date time, which is a moment
 *    object.
 */
module.exports = {
  replace: true,
  inherit: false,
  template: "<div class='input-group date'>" +
              "<input class='form-control' :name='name' type='text' />" +
              "<span class='input-group-addon'>" +
                "<i class='fa fa-fw fa-calendar'></i>" +
              "</span>" +
            "</div>",
  props: {
    model: {
      required: true,
      twoWay: true
    },
    type: {
      type: String,
      required: false,
      default: "datetime"
    },
    language: {
      type: String,
      required: false,
      default: ""
    },
    datetimeFormat: {
      type: String,
      required: false,
      default: "YYYY-MM-DD HH:mm:ss"
    },
    dateFormat: {
      type: String,
      required: false,
      default: "YYYY-MM-DD"
    },
    timeFormat: {
      type: String,
      required: false,
      default: "HH:mm:ss"
    },
    name: {
      type: String,
      required: false,
      default: ""
    },
    onChange: {
      required: false,
      default: null
    }
  },
  beforeCompile: function() {
    this.isChanging = false;
    this.control = null;
  },
  ready: function() {
    // console.debug("datetime-picker.ready");
    var options = {
      useCurrent: false,
      showClear: true,
      showClose: false,
      icons: {
        time: 'fa fa-clock-o',
        date: 'fa fa-calendar',
        up: 'fa fa-chevron-up',
        down: 'fa fa-chevron-down',
        previous: 'fa fa-chevron-left',
        next: 'fa fa-chevron-right',
        today: 'fa fa-dot-circle-o',
        clear: 'fa fa-trash',
        close: 'fa fa-times'
      }
    };
    // set the locale
    var language = this.language;
    if (language === null || language === "") {
      if (this.$language) {
        language = this.$language;
      } else {
        langauge = DEFAULT_LANGUAGE;
      }
    }
    options.locale = this.getLanguageCode(language);
    // set the format
    switch (this.type) {
    case "date":
      options.format = this.dateFormat;
      break;
    case "time":
      options.format = this.timeFormat;
      break;
    case "datetime":
    default:
      options.format = this.datetimeFormat;
      break;
    }
    // use the vue-i18n plugin for localize the tooltips
    if (this.$i18n && this.$i18n.datetime_picker) {
      var messages = this.$i18n.datetime_picker;
      var tooltips = $.fn.datetimepicker.defaults.tooltips;
      for (var i = 0; i < DATETIME_PICKER_TOOLTIPS.length; ++i) {
        var name = DATETIME_PICKER_TOOLTIPS[i];
        if (messages[name]) {
          tooltips[name] = messages[name];    // localize
        }
      }
      options.tooltips = tooltips;
    }
    // create the control
    $(this.$el).datetimepicker(options);
    this.control = $(this.$el).data("DateTimePicker");
    // set the date to the current value of the model
    this.control.date(this.model);
    var me = this;
    $(this.$el).on("dp.change", function () {
      if (! me.isChanging) {
        me.isChanging = true;
        me.model = me.control.date();
        me.$nextTick(function () {
          me.isChanging = false;
          if (me.onChange) {
            me.onChange(me.model);
          }
        });
      }
    });
  },
  watch: {
    "model": function(val, oldVal) {
      if (! this.isChanging) {
        this.isChanging = true;
        this.control.date(val);
        this.isChanging = false;
        if (this.onChange) {
          this.onChange(val);
        }
      }
    }
  },
  methods: {
    /**
     * Gets the language code from the "language-country" locale code.
     *
     * The function will strip the language code before the first "-" of a
     * locale code. For example, pass "en-US" will returns "en". But for some
     * special locales, the function reserves the locale code. For example,
     * the "zh-CN" for the simplified Chinese and the "zh-TW" for the
     * traditional Chinese.
     *
     * @param locale
     *    A locale code.
     * @return
     *    the language code of the locale.
     */
    getLanguageCode: function(locale) {
      if (locale === null || locale.length === 0) {
        return "en";
      }
      if (locale.length <= 2) {
        return locale;
      } else {
        switch (locale) {
          case "zh-CN":
          case "zh-TW":
          case "ar-MA":
          case "ar-SA":
          case "ar-TN":
          case "de-AT":
          case "en-AU":
          case "en-CA":
          case "en-GB":
          case "fr-CA":
          case "hy-AM":
          case "ms-MY":
          case "pt-BR":
          case "sr-CYRL":
          case "tl-PH":
          case "tzm-LATN":
          case "tzm":
            return locale.toLowerCase();
          default:
            // reserve only the first two letters language code
            return locale.substr(0, 2);
        }
      }
    }
  }
};