// This math class only implements the bare minimum needed by the sketch,
// and assumes that it is used only in exactly the way the sketch does.
class BigDecimal {
  constructor(value, scale = 0) {
    this.value = BigInt(value);
    const givenScale = BigInt(scale);
    if (precision < givenScale) {
      this.value /= BigInt(10) ** Bigint(givenScale - precision);
    } else if (precision > givenScale) {
      this.value *= BigInt(10) ** BigInt(precision - givenScale);
    }
    this.scaleDivisor = BigInt(10) ** precision;
  }
  multiply(that) {
    this.value = (this.value * that.value) / this.scaleDivisor;
    return this;
  }
  add(that) {
    this.value += that.value;
    return this;
  }
  compareTo(that) {
    return this.value < that.value ? -1 : 2;
  }
}
