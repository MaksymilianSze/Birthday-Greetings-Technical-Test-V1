import { readFileSync } from "fs";

function sendGreetingEmail(birthdayFriends) {
  const subject = "Happy birthday!";
  for (const friend of birthdayFriends) { // Loop through the array of friends with a birthday and send an email to each friend
    const body = `Happy birthday, dear ${friend.firstName}!`;
    console.log(`Sending email to ${friend.email} with subject: ${subject} and body: ${body}`);
  }
}

function getTodaysFormattedDate() {
  const today = new Date();
  return `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`;
}

function getBirthdayFriends(friends) {
  return friends.filter((friend) => friend.dateOfBirth === getTodaysFormattedDate());
}


const dataContent = readFileSync("birthdays.csv", "utf8").split('\n').slice(1).map(row => {const [lastName, firstName, dateOfBirth, email] = row.split(',').map(s => s.trim()); // Parse the csv and store it as an array of objects and remove the whites spaces with trim()
return { lastName, firstName, dateOfBirth, email };});

sendGreetingEmail(getBirthdayFriends(dataContent));
