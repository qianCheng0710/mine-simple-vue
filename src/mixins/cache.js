export default {
  created() {
    this.__cache = {};
  },
  methods: {
    setCache(key, val) {
      this.__cache[key] = val;
    },
    getCache(key, defaultVal = undefined) {
      if (this.__cache[key] !== undefined) {
        return this.__cache[key];
      } else {
        return defaultVal;
      }
    }
  }
};
