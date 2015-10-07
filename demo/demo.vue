<template>
  <div class="form-horizontal">
    <div class="form-group">
      <label for="picker1" class="col-sm-3 control-label">
        A default datetime picker:
      </label>
      <div class="col-sm-5">
        <vue-datetime-picker class="vue-picker1" name="picker1"
                             model="{{@ result1}}">
        </vue-datetime-picker>
      </div>
      <div class="col-sm-4">
        <p class="form-control-static">
          Selected Datetime: <span class="vue-result1">{{formatDatetime(result1)}}</span>
        </p>
      </div>
    </div>
    <div class="form-group">
      <label for="picker2" class="col-sm-3 control-label">
        A datetime picker with customized datetime format:
      </label>
      <div class="col-sm-5">
        <vue-datetime-picker class="vue-picker2" name="picker2"
                             model="{{@ result2}}"
                             type="datetime"
                             language="en"
                             datetime-format="LLL">
        </vue-datetime-picker>
      </div>
      <div class="col-sm-4">
        <p class="form-control-static">
          Selected Datetime: <span class="vue-result2">{{formatDatetime(result2)}}</span>
        </p>
      </div>
    </div>
    <div class="form-group">
      <label for="picker3" class="col-sm-3 control-label">
        A date picker with customized date format:
      </label>
      <div class="col-sm-5">
        <vue-datetime-picker class="vue-picker3" name="picker3"
                             model="{{@ result3}}"
                             type="date"
                             language="en-US"
                             date-format="L">
        </vue-datetime-picker>
      </div>
      <div class="col-sm-4">
        <p class="form-control-static">
          Selected Date: <span class="vue-result3">{{formatDate(result3)}}</span>
        </p>
      </div>
    </div>
    <div class="form-group">
      <label for="picker4" class="col-sm-3 control-label">
        A time picker with customized time format:
      </label>
      <div class="col-sm-5">
        <vue-datetime-picker class="vue-picker4" name="picker4"
                             model="{{@ result4}}"
                             type="time"
                             language="zh-CN"
                             time-format="LT">
        </vue-datetime-picker>
      </div>
      <div class="col-sm-4">
        <p class="form-control-static">
          Selected Time: <span class="vue-result4">{{formatTime(result4)}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
module.exports = {
  inherit: true,
  components: {
    "vue-datetime-picker": require("../src/vue-datetime-picker.js")
  },
  methods: {
    formatDatetime: function(datetime) {
      if (datetime === null) {
        return "[null]";
      } else {
        return datetime.format("YYYY-MM-DD HH:mm:ss");
      }
    },
    formatDate: function(date) {
      if (date === null) {
        return "[null]";
      } else {
        return date.format("YYYY-MM-DD");
      }
    },
    formatTime: function(time) {
      if (time === null) {
        return "[null]";
      } else {
        return time.format("HH:mm:ss");
      }
    },
  }
};
</script>