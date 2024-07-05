import FizzBuzz from "../../src/utils/fizzBuzz.unit";

describe("FizzBuzz test", () => {
  let fizzBuzz: FizzBuzz;
  beforeEach(() => {
    fizzBuzz = new FizzBuzz();
  });
  it("Fizz when number is divisible by 3", () => {
    expect(fizzBuzz.fizzBuzz(3)).toBe("Fizz");
    expect(fizzBuzz.fizzBuzz(6)).toBe("Fizz");
  });
  it("Buzz when number is divisible by 5", () => {
    // const fizzBuzz = new FizzBuzz();
    expect(fizzBuzz.fizzBuzz(5)).toBe("Buzz");
    expect(fizzBuzz.fizzBuzz(10)).toBe("Buzz");
  });
  it("FizzBuzz when number is divisible by 15", () => {
    // const fizzBuzz = new FizzBuzz();
    expect(fizzBuzz.fizzBuzz(15)).toBe("FizzBuzz");
  });
  it("using mock", () => {
    // const fizzBuzz = new FizzBuzz();
    let mockfn = jest.fn(fizzBuzz.divisibleByThree).mockReturnValue(true);
    fizzBuzz.divisibleByThree = mockfn;
    expect(fizzBuzz.fizzBuzz(4)).toBe(4);
    expect(mockfn).toHaveBeenCalledTimes(2);
  });

  it.only("using spy", () => {
    const spy = jest.spyOn(fizzBuzz, "divisibleByThree");
  });
});
