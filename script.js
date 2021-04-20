"use strict"

//forEach 1

let animals = ["cat", "dog", "parrot", "fish"];

animals.forEach((animal, index, array) => {
	console.log(`${animal} has position ${index} in ${array}`);
});

//filter 1

let names = ["Анастасія", "Ангеліна", "Аліна", "Єлизавета", "Дар'я", "Маргарита"];

function getNamesStartsWithLetter(names, letter) {
	return names.filter(name => (name[0].toLowerCase() === letter.toLowerCase()));
}

console.log(getNamesStartsWithLetter(names, "а"));

//filter 2

let clothes = [
{name: "skirt", color: "blue"},
{name: "dress", color: "yellow"},
{name: "skirt", color: "pink"},
{name: "dress", color: "blue"},
{name: "t-shirt", color: "blue"}
];

let blueClothes = clothes.filter(clothing => clothing.color === "blue");

//forEach 2

blueClothes.forEach(clothing => console.log(`${clothing.name}, color: ${clothing.color}`));

//map 1

let users = [
	{name: "James", surname: "Baker", email: "jbaker@gmail.com"},
	{name: "Ivan", surname: "Petrenko", email: "i_petrenko@gmail.com"},
	{name: "Paul", surname: "Porier", email: "paul_porier@gmail.com"},
	{name: "Alice", surname: "Cooper", email: "cooper555@gmail.com"},
	{name: "David", surname: "Peterson", email: "petersonn@gmail.com"}
];

let emails = users.map(user => user.email);
console.log(emails);

//map 2

let celsius = [-8, 0, 4, 12, 18, 28, 35];
let fahrenheit = celsius.map(temperature => temperature * 1.8 + 32);

console.log(fahrenheit);

//reduce 1

let sentences = ["I love coffee", "Today the weather is good", "Coffee is the best drink"];

function getWordCount(sentences, word){
	return sentences.reduce((sum, sentence) => sum + sentence.toLowerCase().split(word.toLowerCase()).length - 1, 0);
}

console.log(getWordCount(sentences, "coffee"));

//reduce 2

let employees = [
	{name: "James", surname: "Baker", country: "USA"},
	{name: "Ivan", surname: "Petrenko", country: "Ukraine"},
	{name: "Paul", surname: "Porier", country: "France"},
	{name: "Alice", surname: "Cooper", country: "USA"},
	{name: "David", surname: "Peterson", country: "USA"}
];

let uniqueCountries = employees.reduce((countriesArray, employee) =>
	{
		let country = employee.country;
		if(countriesArray.includes(country)===false)
			countriesArray.push(country);
		return countriesArray;
	}, []);

console.log(uniqueCountries);

//every 1

console.log(sentences.every(sentence => sentence.toLowerCase().includes("coffee".toLowerCase())));

//some 1

console.log(sentences.some(sentence => sentence.toLowerCase().includes("weather".toLowerCase())));

//ES5

function AnimalES5(name, age){
	this.name = name;
	this.age = age;
}

AnimalES5.prototype.sayHello = function(){
	console.log(`Hello, my name is ${this.name}, I'm an animal!`);
}

let animal1 = new AnimalES5("Betty", 5);

animal1.sayHello();

function CatES5(name, age, breed, bold){
	AnimalES5.call(this, name, age);
	this.breed = breed;
	this.bold = bold;
}

CatES5.prototype = Object.create(AnimalES5.prototype);
CatES5.prototype.constructor = CatES5;
CatES5.prototype.sayHello = function(){
	console.log(`Meewww, my name is ${this.name}, I'm a cat!`);
}

let cat1 = new CatES5("Tofu", 6, "elf", true);
cat1.sayHello();
console.log(`cat1 instanceof CatES5: ${cat1 instanceof CatES5}`);
console.log(`cat1 instanceof AnimalES5: ${cat1 instanceof AnimalES5}`);

//приватні поля та методи

function DogES5(name, birthDate, breed){
	this.name = name;
	this.birthDate = birthDate;
	this.breed = breed;

	let isAwake = true;
	let age = calculateAge();
	let self = this;

	this.sleep = function(){
		isAwake = false;
		printSleepingState();
	}

	this.wakeUp = function(){
		isAwake = true;
		printAwakeState();
	}

	this.getAge = function(){
		return age;
	}
	
	function printSleepingState(){
		console.log(`Now ${self.name} is sleeping`);
	}

	function printAwakeState(){
		console.log(`Now ${self.name} is awake`);
	}

	function calculateAge(){
		let now = new Date();
		let d1 = Date.parse(birthDate);

		return Math.floor((now-d1)/(1000 * 60 * 60 * 24 * 31 * 12));
	}
}

let dog1 = new DogES5("Arma", "2015.05.07", "shepherd");

console.log(dog1.getAge());
dog1.sleep();
dog1.wakeUp();

//ES6

class AnimalES6{
	constructor(name, age){
		this.name = name;
		this.age = age;
	}

	sayHello(){
		console.log(`Hello, my name is ${this.name}, I'm an animal!`);
	}

}

let animal2 = new AnimalES6("Kapone", 9);
animal2.sayHello();

class CatES6 extends AnimalES6{
	constructor(name, age, breed, bold){
		super(name, age);
		this.breed = breed;
		this.bold = bold;
	}

	sayHello(){
		console.log(`Meewww, my name is ${this.name}, I'm a cat!`);
	}
}

let cat2 = new CatES6("Vanya", 1, "british", false);

cat2.sayHello();

//приватні поля та методи

class DogES6{
	#birthDate;
	#age;

	constructor(name, birthDate, breed){
		this.name = name;
		this.#birthDate = birthDate;
		this.breed = breed;
		this.#age = this.#calculateAge();
	}

	getAge(){
		return this.#age;
	}

	#calculateAge(){
		let now = new Date();
		let d1 = Date.parse(this.#birthDate);

		return Math.floor((now-d1)/(1000 * 60 * 60 * 24 * 31 * 12));
	}

	set birthDate(birthDate){
		let now = new Date();
		if((Date.parse(birthDate) - now) > 0)
			console.log("Impossible date!");
		else
			this.#birthDate = birthDate;
	}

	get birthDate(){
		return this.#birthDate;
	}
}

let dog2 = new DogES6("Jack", "2019.01.11", "toy-terier");

console.log(dog2.getAge());