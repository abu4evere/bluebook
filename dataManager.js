// dataManager.js

// Security Warning: Storing sensitive data like passwords in localStorage is highly insecure.
// In a production environment, use a secure backend server with proper encryption and authentication
// (e.g., Node.js with Express, a database like MongoDB, and bcrypt for password hashing).

// Initialize default facts and challenges
const factsAndChallenges = [
    { challenge: "Avoid using plastic bottles for a day.", fact: "It takes 450 years for a plastic bottle to decompose." },
    { challenge: "Use a reusable water bottle today.", fact: "One million plastic bottles are bought every minute." },
    { challenge: "Separate and recycle all your waste today.", fact: "Only 9% of plastic ever produced has been recycled." },
    { challenge: "Refuse all plastic bags for 24 hours.", fact: "Plastic bags are used for an average of 12 minutes." },
    { challenge: "Pick up 5 pieces of plastic litter.", fact: "Every year, 8 million tons of plastic enter the oceans." },
    { challenge: "Avoid products containing microplastics.", fact: "Microplastics have been found in human blood." },
    { challenge: "Say no to plastic straws today.", fact: "A single plastic straw takes 200 years to decompose." },
    { challenge: "Educate a friend about ocean pollution.", fact: "The Great Pacific Garbage Patch is twice the size of Texas." },
    { challenge: "Plant a flower or herb to support pollinators.", fact: "Bees pollinate 70% of the crops we eat." },
    { challenge: "Plant or care for a tree today.", fact: "One tree absorbs 22 kg of CO2 per year." },
    { challenge: "Eat all your meals today without any food waste.", fact: "Food waste contributes to 10% of global emissions." },
    { challenge: "Wear something second-hand today.", fact: "Globally, 2,700 liters of water to make one cotton T-shirt." },
    { challenge: "Watch a climate documentary and share a fact.", fact: "Climate change causes more extreme weather events." },
    { challenge: "Turn off all lights not in use today.", fact: "Turning off lights can reduce CO2 by 10%." },
    { challenge: "Walk, cycle, or use public transport today.", fact: "Airplanes emit 900 million tons of CO2 each year." },
    { challenge: "Try a fully plant-based meal today.", fact: "Meat production contributes 14.5% of global emissions." },
    { challenge: "Share 3 ways to reduce paper use.", fact: "Deforestation is responsible for 14% of global emissions." },
    { challenge: "Fix a leak or turn off the tap when brushing.", fact: "A leaking faucet can waste 11,000 liters/year." },
    { challenge: "Wear second-hand or swap clothes today.", fact: "Most fast fashion ends up in landfills within a year." },
    { challenge: "Compost your food scraps today.", fact: "Composting food can reduce landfill waste by 30%." }
  ];
  
  // Functions to manage user data
  function saveUser(user) {
    localStorage.setItem('greenPledgeUser', JSON.stringify(user));
  }
  
  function getUser() {
    const user = localStorage.getItem('greenPledgeUser');
    return user ? JSON.parse(user) : null;
  }
  
  function updateUser(updatedUser) {
    saveUser(updatedUser);
  }
  
  function clearUser() {
    localStorage.removeItem('greenPledgeUser');
  }
  
  // Functions to manage saved challenges
  function saveSavedChallenges(challenges) {
    localStorage.setItem('greenPledgeSavedChallenges', JSON.stringify(challenges));
  }
  
  function getSavedChallenges() {
    const challenges = localStorage.getItem('greenPledgeSavedChallenges');
    return challenges ? JSON.parse(challenges) : [];
  }
  
  // Functions to manage comments
  function saveComments(comments) {
    localStorage.setItem('greenPledgeComments', JSON.stringify(comments));
  }
  
  function getComments() {
    const comments = localStorage.getItem('greenPledgeComments');
    return comments ? JSON.parse(comments) : [];
  }
  
  // Functions to manage completed challenges and XP
  function saveCompletedChallenges(count) {
    localStorage.setItem('greenPledgeCompletedChallenges', count);
  }
  
  function getCompletedChallenges() {
    const count = localStorage.getItem('greenPledgeCompletedChallenges');
    return count ? parseInt(count, 10) : 0;
  }
  
  function saveXP(xp) {
    localStorage.setItem('greenPledgeXP', xp);
  }
  
  function getXP() {
    const xp = localStorage.getItem('greenPledgeXP');
    return xp ? parseInt(xp, 10) : 0;
  }
  
  // Functions to manage photos
  function savePhotos(photos) {
    localStorage.setItem('greenPledgePhotos', JSON.stringify(photos));
  }
  
  function getPhotos() {
    const photos = localStorage.getItem('greenPledgePhotos');
    return photos ? JSON.parse(photos) : [];
  }
  
  // Function to get a random challenge-fact pair
  function getRandomChallenge() {
    const randomIndex = Math.floor(Math.random() * factsAndChallenges.length);
    return {
      index: randomIndex,
      challenge: factsAndChallenges[randomIndex].challenge,
      fact: factsAndChallenges[randomIndex].fact
    };
  }
  
  export {
    saveUser,
    getUser,
    updateUser,
    clearUser,
    saveSavedChallenges,
    getSavedChallenges,
    saveComments,
    getComments,
    saveCompletedChallenges,
    getCompletedChallenges,
    saveXP,
    getXP,
    savePhotos,
    getPhotos,
    getRandomChallenge
  };