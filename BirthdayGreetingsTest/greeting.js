import { readFileSync } from "fs";

function sendGreetingEmail(firstName, email) {
  console.log(`Subject: Happy birthday! Happy birthday, dear ${firstName}!`);
}

const textByLine = readFileSync("birthdays.csv").toString().split("\n");

var datetime = new Date();
console.log(datetime.getDate());

for (let i = 1; i < textByLine.length; i++) {
  console.log(i);
  console.log("[" + textByLine[i] + "]");

  const textByComma = textByLine[i].split(",");
  console.log(textByComma);
  sendGreetingEmail(textByComma[0]);
}
