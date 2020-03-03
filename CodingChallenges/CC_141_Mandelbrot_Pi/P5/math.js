let BigDecimal = (() => {
  let precision = BigInt(10);

  return class BigDecimal {
    constructor(value, scale = 0) {
      this.value = BigInt(value);
      const givenScale = BigInt(scale);
      if (precision < givenScale) {
        this.value /= BigInt(10) ** Bigint(givenScale - precision);
      } else if (precision > givenScale) {
        this.value *= BigInt(10) ** BigInt(precision - givenScale);
      }
      this.scale = precision;
    }
    multiply(that) {
      const value = this.value * that.value;
      const scale = this.scale + that.scale;
      return new BigDecimal(value, scale);
    }
    add(that) {
      if (this.scale == that.scale) {
        return new BigDecimal(this.value + that.value, this.scale);
      }
      if (this.scale > that.scale) {
        const value =
          that.value * BigInt(10) ** BigInt(this.scale - that.scale);
        return new BigDecimal(this.value + value, this.scale);
      }
      const value = this.value * BigInt(10) ** BigInt(that.scale - this.scale);
      return new BigDecimal(value + that.value, that.scale);
    }
    compareTo(that) {
      if (this.scale == that.scale) {
        return this.value < that.value ? -1 : (this.value == that.value ? 0 : 1);
      }
    }
    static get precision() {
      return precision;
    }
    static set precision(value) {
      precision = BigInt(value);
    }
  };
})();
