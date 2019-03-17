
/*****************************
* Task 1
*****************************/

var name = "Hansal Bachkaniwala";
var courses = 5;
var program = "Computer Programming";
var job = 1;
if(job == 1)
  var choice = "have";
else
  var choice = "don't have";
console.log("My name is " + name + " and I'm in " + program + ". I'm taking " + courses + " course in this semester and I " + choice + " a part-time job now.");

/*****************************
* Task 2
*****************************/
var current_year = 2018;
var age = prompt("Please enter your age:",19);
console.log("You were born in the year of " + (current_year - eval(age)) + ".");
var college_years = prompt("Enter the number of years you expect to study in college:", 3);
console.log("You will graduate from Seneca college in the year of " + (current_year +  eval(college_years)) + ".");

/*****************************
* Task 3
*****************************/
var celsius = 10;
console.log(celsius + "°C is " + (celsius*9/5 + 32) + "°F.");
var fahrenheit = 98;
console.log(fahrenheit + "°F is " + (fahrenheit - 32 * 5/9) + "°C.");

/*****************************
* Task 4
*****************************/

for(var i = 0; i < 10; i++)
{
	if (i%2 == 0) 
	console.log(i + " is even."); 
	else 
	console.log(i + " is odd."); 
}

/*****************************
* Task 5
*****************************/
function largerNum(num1, num2)
{
	if(num1 > num2)
		return num1;
	else
		return num2;
}

var greaterNum = function(num1, num2)
{
	if(num1 > num2)
		return num1;
	else
		return num2;
};
console.log( "The larger number of 5 and 12 is " + largerNum(5, 12)+ ".");
console.log( "The greater number of 100 and 57 is " + greaterNum(100, 57)+ ".");

/*****************************
* Task 6
*****************************/
function Evaluator()
{
	var sum = 0;
	for(var i = 0; i < arguments.length; i++)
	{
		sum += arguments[i];
	} 
	if(sum / arguments.length >= 50)
		return true;
	else
		return false;
}

console.log("Average of 20, 10 and 50 is greater than or equal to 50: " + Evaluator(20, 10, 50));
console.log("Average of 100 and 500 is greater than or equal to 50: " + Evaluator(100, 500));
console.log("Average of 35, 100, 50 and 21 is greater than or equal to 50: " + Evaluator(35, 100, 50, 21));

/*****************************
* Task 7
*****************************/

var Grader = function(num_score)
{
	if(num_score > 79)
		return 'A';
	else
		if(num_score > 69)
			return 'B';
		else 
			if(num_score > 59)
				return 'C';
			else
				if(num_score > 49)
					return 'D';
					else
						return 'F';
};

console.log("You have scored 36%, Your grade is: " + Grader(36));
console.log("You have scored 90%, Your grade is: " + Grader(90));
console.log("You have scored 65%, Your grade is: " + Grader(65));

/*****************************
* Task 8
*****************************/

function showMultiples(num, numMultiples)
{
	for(var i = 1; i <= numMultiples; i++)
	{
		console.log(num + " X " + i + " = " + (i*num));
	}
}
console.log("First 4 Multiples of 5 are: \n");
showMultiples(5, 4);
console.log("First 7 Multiples of 10 are: \n");
showMultiples(10, 7);
console.log(" First 10 Multiples of 3 are: \n");
showMultiples(3, 10);

/*********************************************************************************
* WEB222 – Assignment 01
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part of
* this assignment has been copied manually or electronically from any other source (including web sites)
* or distributed to other students.
*
* Name: Hansal Bachkaniwala Student ID: 117990176 Date: 3rd Februaury 2018
*
********************************************************************************/