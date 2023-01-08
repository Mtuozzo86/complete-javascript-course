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

console.log(bmw);
const mercedes = new Car('Mercedes', 95);

/////////////////////// ES6 Classes //

//class expresion!!
// const PersonCl = class{}

//class declaration
// class PersonCl {
//   constructor(fullName, birthYear, firstName) {
//     this.fullName = fullName; // checks that both first and last name are included

//     // this.firstName = firstName // will only need 1 name

//     this.birthYear = birthYear;
//   }

//   //methods are added to the prototype property
//   calcAge() {
//     console.log(2023 - this.birthYear);
//   }

//   get age() {
//     return 2023 - this.birthYear;
//   }
//   //be sure to use the same property name when using a setter
//   set fullName(name) {
//     if (name.includes(' '))
//       this._fullName = name; // USE AN UNDERSCORE FOR SETTING
//     else alert(`${name} is not a full name`);
//   }

//   get fullName() {
//     return this._fullName; // USE AN UNDERSCORE FOR THE GET AS WELL
//   }

//   static hey() {
//     console.log('hi there 👋');
//   }
// }
// const homer = new PersonCl('Homer Simpson', 1975);
// console.log(homer.fullName);
// const joe = new PersonCl('Joe Tuozzo', 1989);
// PersonCl.hey();

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

/////////////////////// Static Methods //

class StaticMethods {
  constructor(something) {
    this.something = something;
  }

  static hi() {
    console.log('I am a static method');
  }
}

StaticMethods.hi();

/////////////////////// Object.create //

const PersonProto = {
  calcAge() {
    return 2023 - this.birthYear;
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const dude = Object.create(PersonProto);
console.log(dude);
// dude.name = 'TheDude'
dude.birthYear = 1967;
console.log(dude.calcAge());

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1999);
console.log(sarah.calcAge());

/////////////////////// Challenge //

class Car2 {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(imperialSpeed) {
    console.log(imperialSpeed);
    return (this.speed = imperialSpeed * 1.6);
  }
}

const aCar = new Car2('olds', 100);
console.log(aCar.speed);
console.log(aCar.speedUS);

console.log(aCar.speed);
aCar.speedUS = 50;
console.log(aCar.speedUS);
console.log(aCar);

/////////////////////// Inheritance Between "Classes": Constructor Functions //

const Person2 = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

const mike2 = new Person2('Mike', 1986);
const jack2 = new Person2('Jack', 1990);
console.log(jack2);

console.log(Person2.prototype);

Person2.prototype.calcAge = function () {
  console.log(2023 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  this.course = course;
  // below would be repeating the same code from Person2, the parent
  // this.firstName = firstName
  // this.birthYear = birthYear
  //Since Student is also a person(Person2), you can call Person2.  Use the .call on the class you want to inherent from, and include 'this' in the params
  Person2.call(this, firstName, birthYear);
};

Student.prototype = Object.create(Person2.prototype);

Student.prototype.introduce = function () {
  console.log(
    `Hello, my name is ${this.firstName}, I was born in ${this.birthYear}, and I am studying ${this.course}.`
  );
};

const newStudent = new Student('Bob', 1988, 'CS');
console.log(newStudent.introduce());
console.log(Student.prototype);
console.log(newStudent.__proto__);

///////////////////////////////////////////

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

// link the child to the parents prototypes
EV.prototype = Object.create(Car.prototype);

//new instance can be created off of Car constructor and use its methods
const tesla = new EV('Tesla', 66, 23);
EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge -= 1;
};

tesla.chargeBattery(90);
console.log(tesla);

/////////////////////// Inheritance Between "Classes": ES6 Classes //

class PersonCl {
  constructor(fullName, birthYear, firstName) {
    this.fullName = fullName; // checks that both first and last name are included
    // this.firstName = firstName // will only need 1 name
    this.birthYear = birthYear;
  }

  //methods are added to the prototype property
  calcAge() {
    return 2023 - this.birthYear;
  }

  get age() {
    return 2023 - this.birthYear;
  }
  //be sure to use the same property name when using a setter
  set fullName(name) {
    if (name.includes(' ')) {
      this._fullName = name; // USE AN UNDERSCORE FOR SETTING
    } else { 
      console.log(`${name} is not a full name`) 
    } 
  }
  get fullName() {
    return this._fullName; // USE AN UNDERSCORE FOR THE GET AS WELL
  }

  static hey() {
    console.log('hi there 👋');
  }
}
const testPerson = new PersonCl('mike js', 1989)
console.log(testPerson)

class Student2 extends PersonCl {
  constructor(fullName, birthYear, course) {
    super(fullName, birthYear); // this grabs the constructor propertys from parent
    this.course = course;
  }

  introduce() {
    console.log(`I am ${this.fullName}, and i am studying ${this.course}.`);
  }
}

const martha = new Student2('Martha Wayne', 1986, 'Science');
console.log(martha.calcAge());
console.log(martha.age)
      
    

/////////////////////// Another Class Example //


class Account{
  constructor(owner, currency, pin) {
    this.owner = owner
    this.currency = currency
    this.pin = pin
    this.movements = []
    this.locale = navigator.language
  }
}

const acc1 = new Account('Mike', 'USD', 1025)
console.log(acc1)