// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
   1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
   2: ['D', 'G'],
   3: ['B', 'C', 'M', 'P'],
   4: ['F', 'H', 'V', 'W', 'Y'],
   5: ['K'],
   8: ['J', 'X'],
   10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
   word = word.toUpperCase();
   let letterPoints = "";
   for (let i = 0; i < word.length; i++) {
      for (const pointValue in oldPointStructure) {
         if (oldPointStructure[pointValue].includes(word[i])) {
            letterPoints += `Points for '${word[i]}': ${pointValue}\n`
         }
      }
   }
   return letterPoints;
}

function transform(oldPointStructure) {
   let newPointStructure = {};
   for (let keys in oldPointStructure) {
      let letters = oldPointStructure[keys];
      for (let i = 0; i < letters.length; i++) {
         let letter = letters[i];
         let lowercaseLetter = letter.toLowerCase();
         // Assign the point value to the lowercase letter in the new structure
         newPointStructure[lowercaseLetter] = Number(keys);
      }
   }
   return newPointStructure;
};

let newPointStructure = transform(oldPointStructure);

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   let word = input.question("Let's play some scrabble! \n\nEnter a word:");
   // console.log(oldScrabbleScorer(word));
   return word;
};

//Define a function that takes a word as a parameter and returns a numerical score. Each letter within the word is worth 1 point.
let simpleScorer = function (word) {
   word = word.toUpperCase().split(" ").join("");
   let numericalScore = word.length;
   return numericalScore;
}
//Define a function that takes a word as a parameter and returns a score. Each vowel within the word is worth 3 points, and each consonant is worth 1 point.
let vowelBonusScorer = function (word) {
   word = word.toUpperCase();
   let numericalScore = 0;
   for (let i = 0; i < word.length; i++) {
      const letter = word[i];
      if ('AEIOU'.includes(letter)) {
         numericalScore += 3;
      } else if ('BCDFGHJKLMNPQRSTVWXYZ'.includes(letter)) {
         numericalScore += 1;
      }
   }
   return numericalScore;
};

let scrabbleScorer = function (word) {
   word = word.toLowerCase();
   let numericalScore = 0;
   for (let i = 0; i < word.length; i++) {
      for (const item in newPointStructure) {
         if (item === word[i]) {
            numericalScore += Number(newPointStructure[item]);
         }
      }
   }
   return numericalScore;
};

// console.log(scrabbleScorer("foo"));

//scoring object

let simpleScore = {
   name: "Simple Score",
   description: "Each letter is worth 1 point.",
   scorerFunction: simpleScorer
};


let BonusVowels = {
   name: "Bonus Vowels",
   description: "Vowels are 3 pts, consonants are 1 pt.",
   scorerFunction: vowelBonusScorer
};

let scrabble = {
   name: "Scrabble",
   description: "The traditional scoring algorithm.",
   scorerFunction: scrabbleScorer
};

let scoringAlgorithms = [simpleScore, BonusVowels, scrabble];

function scorerPrompt() {
   let word = initialPrompt();
   let selectedIDs = input.question("Which scoring algorithm would you like to use?\n\n0 - Simple: One point per character\n1 - Vowel Bonus: Vowels are worth 3 points\n2 - Scrabble: Uses scrabble point system\nEnter 0, 1, or 2: ");
   if (Number(selectedIDs) === 0) {
      // Simple scoring1
      console.log(`score for '${word}':${scoringAlgorithms[0].scorerFunction(word)}`);
   } else if (Number(selectedIDs) === 1) {
      // owel bonus scoring 
      console.log(`score for '${word}':${scoringAlgorithms[1].scorerFunction(word)}`);
   } else if (Number(selectedIDs) === 2) {
      //  Scrabble scoring
      console.log(`score for '${word}':${scoringAlgorithms[2].scorerFunction(word)}`);
   } else {
      console.log("Invalid input. Please enter 0, 1, or 2.");
      selectedIDs = input.question("Which scoring algorithm would you like to use?\n\n0 - Simple: One point per character\n1 - Vowel Bonus: Vowels are worth 3 points\n2 - Scrabble: Uses scrabble point system\nEnter 0, 1, or 2: ");
   }
}

// console.log(newPointStructure);
// console.log("Scrabble scoring values for");
// console.log("letter a: ", newPointStructure.a);
// console.log("letter j: ", newPointStructure.j);
// console.log("letter z: ", newPointStructure["z"]);

function runProgram() {
   // initialPrompt();
   scorerPrompt();
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
   runProgram: runProgram,
   scorerPrompt: scorerPrompt
};
