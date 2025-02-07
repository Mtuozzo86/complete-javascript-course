
====================
4 fundamental principles
ABSTRACTION
    Ignore or hide details that don't matter.  Gives an overview
ENCAPSULATION
    Keep methods private inside the class.  Some methods can be exposed as a public interface (API)
INHERITANCE
    Makes properties and methods available to a child class.  Reuse common logic.
POLYMORPHISM 
    A child class can overwrite a method inherited from a parent class.

==============OOP IN JAVASCRIPT===============

All objects in JavaScript are linked to a prototype object.  Objects inherent methods from the prototype.


==============CONSTRUCTOR FUNCTIONS AND THE 'NEW' OPERATOR===============

const Person = function(firstName, birthYear) {
    this.firstName = firstName
    this.birthYear = birthYear
}

const mike = new Person('Mike', 1986)
console.log(mike) = Person {firstName: 'Mike', birthYear: 1986}
---const mike is an instance


==============PROTOTYPES===============

console.log(Person.prototype)  -> Person {}

Add a function to Person without setting it on line 20
    Person.prototype.calcAge = function () {
        console.log(2023 - this.birthYear)
    }
This allows an instance of a person to use a function
 ex: mike.calcAge() will return the calculated age.


==============Prototypal Inheritance and The Prototype Chain===============
    
The constructor function [Person()]
    const Person = function(firstName, birthYear) {
        this.firstName = firstName
        this.birthYear = birthYear
    }
Prototype [Person.prototype]
    calcAge: function(){}
    

==============Prototypal Inheritance on Built-In Objects===============

console.log(mike.__proto__.__proto__) // goes up to the Object.prototype

const arr = [2,3,56,2,56]
console.log(arr.__proto__) // you'll find all the methods you can do on arrays like forEach, map, filter, etc. Thanks to inheritence.  In other words
console.log(arr.__proto__ === Array.prototype) // the same


==============ES6 Classes===============

Classes are NOT hoisted
Class are first class citizens, they can be passed into functions and return from functions
Classes are executed in strict mode

class PersonCl {
    constructor(firstName, birthYear){
        this.firstName = firstName
        this.birthYear = birthYear
    }
}

You can still set a PersonCl.prototype method using ES6

==============Setters and Getters===============

const account = {
    owner: 'Mike',
    movements: [2,5,1,662,32,10],
    //when calling this get method, you dont need to use the () sign
    get latest(){
        return this.movements.slice(-1).pop()
    },
    set latest(movement){
        this.movements.push(movement)
    }
}

// if you want to set the latest movement, you wouldn't use account.latest() and pass an argument.  You simply assign a value to the property
account.latest = 100 -> this is like account.latest(100)


console.log(account.latest)
---
setters and getter allow for some validation.  An underscore is convention for setters and getters
class Person {
    constructor(fullName, birthYear){
        this.fullName = fullName
        this.birthYear = birthYear
    }

    set fullName(name){
        if(name.includes(' ')) this._fullName = name
        else console.log(`${name} is not a full name`)
    }
}
const someGuy = new Person('Mike Tuozzo', 1986) -> this will set the fullName because there is a space 
---


==============Static Methods===============

The static keyword defines a static method or property for a class. Neither static methods nor static properties can be called on instances of the class. Instead, they're called on the class itself.

Static methods are often utility functions, such as functions to create or clone objects, whereas static properties are useful for caches, fixed-configuration, or any other data you don't need to be replicated across instances.


==============Object.create===============

There are no constructor function and no 'new' operator
Manually set prototype of an object

const PersonProto = {
  calcAge() {
    console.log(2023 - this.yearIWasBorn)
  }
}

any object now made will have the prototypes in PersonProto
const dude = Object.create(PersonProto) // {}
dude will be an empty object at first, but the calAge function has a this property, make the same property on dude and the function will work when you use dude.calcAge()
dude.yearIwasBorn = 1975 // use the same property name in the PersonProto
dude.calcAge() //result of the function


==============Inheritance Between "Classes": Constructor Functions===============

