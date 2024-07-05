class FizzBuzz {
  public fizzBuzz(num: number) {
    if (this.divisibleByThree(num) && num % 5 == 0) {
      return "FizzBuzz";
    } else if (this.divisibleByThree(num)) {
      return "Fizz";
    } else if (num % 5 == 0) {
      return "Buzz";
    }
    return num;
  }
  divisibleByThree = (num: number): boolean => num % 3 == 0;
}

const fizzBuzz = new FizzBuzz();
for (let i = 0; i < 20; i++) {
  console.log(fizzBuzz.fizzBuzz(i));
}

export default FizzBuzz;
