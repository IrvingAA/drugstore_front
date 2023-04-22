import moment from "moment";

export default {
  methods: {
    parseDate(date, format) {
      return moment(date).format(format);
    }
  }
}
