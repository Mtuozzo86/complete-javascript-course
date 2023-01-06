'use strict';
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

const mike = new Person('Mike', 1986);
const jack = new Person('Jack', 1990);
console.log(jack);
console.log(mike);

/////////////////////// Prototypes //
console.log(Person.prototype);

Person.prototype.calcAge = function () {
  console.log(2023 - this.birthYear);
};

console.log(mike.__proto__); //{calcAge: ƒ, constructor: ƒ}
//even though mike didnt set the function of calcAge, it uses it because of inheritence

//confusion
console.log(mike.__proto__ === Person.prototype); //true
console.log(Person.prototype.isPrototypeOf(Person)); //false
console.log(Person.prototype.isPrototypeOf(mike)); //true
console.log(Person.prototype.isPrototypeOf(jack)); //true

Person.prototype.species = 'Homo Sapiens';

//mike will only show birthyear and firstname, but not species, unless you ask for mike.species
//the object has access once it is created because it is created in Person

/////////////////////// Prototypal Inheritance on Built-In Objects //

console.log(mike.__proto__.__proto__); // goes up to the Object.prototype

const arr = [2, 3, 56, 2, 56];
console.log(arr.__proto__); // you'll find all the methods you can do on arrays like forEach, map, filter, etc. Thanks to inheritence.  In other words
console.log(arr.__proto__ === Array.prototype); // the same

Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique());

/////////////////////// Challenge //

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  // console.log(this.speed += 10)
  //or
  this.speed += 10;
  console.log(`${this.make}'s speed is ${this.speed} km/h`);
};

Car.prototype.brake = function () {
  console.log((this.speed -= 5));
};

const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);

/////////////////////// ES6 Classes //

//class expresion!!
// const PersonCl = class{}

//class declaration
class PersonCl {
  constructor(fullName, birthYear, firstName) {
    this.fullName = fullName; // checks that both first and last name are included

    // this.firstName = firstName // will only need 1 name

    this.birthYear = birthYear;
  }

  //methods are added to the prototype property
  calcAge() {
    console.log(2023 - this.birthYear);
  }

  get age() {
    return 2023 - this.birthYear;
  }
  //be sure to use the same property name when using a setter
  set fullName(name) {
    if (name.includes(' ')) this._fullName = name; // USE AN UNDERSCORE FOR SETTING
    else alert(`${name} is not a full name`);
  }

  get fullName(){
    return this._fullName // USE AN UNDERSCORE FOR THE GET AS WELL
  }
}
const homer = new PersonCl('Homer Simpson', 1975);
console.log(homer.fullName);

const joe = new PersonCl('Joe', 1989);
joe.calcAge();
console.log(joe.age);

/////////////////////// Setters and Getters //

const account = {
  owner: 'Mike',
  movements: [2, 5, 1, 662, 32, 10],
  //when calling this get method, you dont need to use the () sign
  get latest() {
    return this.movements.slice(-1).pop();
  },
  set latest(movement) {
    this.movements.push(movement);
  },
};
account.latest = 100;
console.log(account.latest);
