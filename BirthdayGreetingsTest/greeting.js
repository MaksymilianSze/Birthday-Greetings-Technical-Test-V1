import { readFileSync } from "fs";

function useEmailService(email, subject, body) {
  // TODO: Send email using email service
}

function useSMSService(phoneNumber, body) {
  // TODO: Send sms using sms service
}

function sendGreeting(birthdayFriends, service) {
  const subject = "Happy birthday!";
  for (const friend of birthdayFriends) { // Loop through the array of friends with a birthday and send an email to each friend
    const body = `Happy birthday, dear ${friend.firstName}!`;
    if (service === "email") {
      useEmailService(friend.email, subject, body);
      console.log(`Sending email to ${friend.email} with subject: ${subject} and body: ${body}`);
    } else if (service === "sms") {
      useSMSService(friend.phoneNumber, body);
      console.log(`Sending sms to ${friend.email} with body: ${body}`);
    }
  }
}

function getTodaysFormattedDate() {
  const today = new Date();
  return `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`; // Format the date so that it matches the format used in the csv and return it
}

function getBirthdayFriends(friends) {
  const today = getTodaysFormattedDate();
  if (today.split('/').slice(1).join('/') === "02/28") { // Check if today is Feb 28th and if it is, check if any of the friends have a birthday on Feb 29th
    return friends.filter((friend) => {
      if (friend.dateOfBirth.split('/').slice(1).join('/') === '02/29') {
        return friend;
      }
      return friend.dateOfBirth === today;
    });
  }
  else if (today.split('/').slice(1).join('/') === "02/29") { // If today is Feb 29th we don't want to send any greetings because then we would be sending a birthday greeting twice
    return [];
  }
  return friends.filter((friend) => friend.dateOfBirth === today); // Filter the array of friends and return only the friends with a birthday today
}


const dataContent = readFileSync("birthdays.csv", "utf8").split('\n').slice(1).map(row => {const [lastName, firstName, dateOfBirth, email] = row.split(',').map(s => s.trim()); // Parse the csv and store it as an array of objects and remove the whites spaces with trim()
return { lastName, firstName, dateOfBirth, email };});

sendGreeting(getBirthdayFriends(dataContent), "sms");
