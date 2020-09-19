export function mapGetters(getters) {
  const res = {};
  Object.values(getters).forEach((getter) => {
    res[getter] = function mappedGetter() {
      return this.$store.getters[getter];
    };
  });
  return res;
}
