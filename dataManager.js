/**
 * dataManager.js
 * 
 * Manages data for the GreenPledge app using localStorage.
 * 
 * Security Warning: Storing sensitive data like passwords in localStorage is highly insecure.
 * In a production environment, use a secure backend server with proper encryption and authentication
 * (e.g., Node.js with Express, a database like MongoDB, and bcrypt for password hashing).
 * 
 * Note: This code includes basic sanitization to reduce XSS risks, but it is NOT a full security solution.
 * For production, move to a secure backend.
 */

// Check for localStorage availability
const isLocalStorageAvailable = () => {
  try {
    const testKey = '__test__';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    console.error('localStorage is not available:', e);
    return false;
  }
};

// Fallback storage (in-memory) if localStorage is unavailable
const fallbackStorage = {};
const storage = isLocalStorageAvailable() ? localStorage : {
  setItem: (key, value) => { fallbackStorage[key] = value; },
  getItem: (key) => fallbackStorage[key] || null,
  removeItem: (key) => { delete fallbackStorage[key]; }
};

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
  { challenge: "Wear something second-hand today.", fact: "Globally, it takes 2,700 liters of water to make one cotton T-shirt." },
  { challenge: "Watch a climate documentary and share a fact.", fact: "Climate change causes more extreme weather events." },
  { challenge: "Turn off all lights not in use today.", fact: "Turning off lights can reduce CO2 emissions by 10%." },
  { challenge: "Walk, cycle, or use public transport today.", fact: "Airplanes emit 900 million tons of CO2 each year." },
  { challenge: "Try a fully plant-based meal today.", fact: "Meat production contributes 14.5% of global emissions." },
  { challenge: "Share 3 ways to reduce paper use.", fact: "Deforestation is responsible for 14% of global emissions." },
  { challenge: "Fix a leak or turn off the tap when brushing.", fact: "A leaking faucet can waste 11,000 liters per year." },
  { challenge: "Wear second-hand or swap clothes today.", fact: "Most fast fashion ends up in landfills within a year." },
  { challenge: "Compost your food scraps today.", fact: "Composting food can reduce landfill waste by 30%." }
];

// Functions to manage user data
function saveUser(user) {
  if (!user || typeof user !== 'object') {
    console.error('Invalid user data');
    return;
  }
  // Sanitize user data to prevent XSS
  const sanitizedUser = {
    ...user,
    name: typeof user.name === 'string' ? DOMPurify.sanitize(user.name) : user.name,
    email: typeof user.email === 'string' ? DOMPurify.sanitize(user.email) : user.email
  };
  try {
    storage.setItem('greenPledgeUser', JSON.stringify(sanitizedUser));
  } catch (e) {
    console.error('Failed to save user:', e);
  }
}

function getUser() {
  try {
    const user = storage.getItem('greenPledgeUser');
    return user ? JSON.parse(user) : null;
  } catch (e) {
    console.error('Failed to parse user data:', e);
    return null;
  }
}

function updateUser(updatedUser) {
  saveUser(updatedUser);
}

function clearUser() {
  try {
    storage.removeItem('greenPledgeUser');
  } catch (e) {
    console.error('Failed to clear user:', e);
  }
}

// Functions to manage saved challenges
function saveSavedChallenges(challenges) {
  if (!Array.isArray(challenges)) {
    console.error('Challenges must be an array');
    return;
  }
  // Sanitize challenges
  const sanitizedChallenges = challenges.map(challenge =>
    typeof challenge === 'string' ? DOMPurify.sanitize(challenge) : challenge
  );
  try {
    storage.setItem('greenPledgeSavedChallenges', JSON.stringify(sanitizedChallenges));
  } catch (e) {
    console.error('Failed to save challenges:', e);
  }
}

function getSavedChallenges() {
  try {
    const challenges = storage.getItem('greenPledgeSavedChallenges');
    return challenges ? JSON.parse(challenges) : [];
  } catch (e) {
    console.error('Failed to parse saved challenges:', e);
    return [];
  }
}

// Functions to manage comments
function saveComments(comments) {
  if (!Array.isArray(comments)) {
    console.error('Comments must be an array');
    return;
  }
  // Sanitize comments
  const sanitizedComments = comments.map(comment =>
    typeof comment === 'string' ? DOMPurify.sanitize(comment) : comment
  );
  try {
    storage.setItem('greenPledgeComments', JSON.stringify(sanitizedComments));
  } catch (e) {
    console.error('Failed to save comments:', e);
  }
}

function getComments() {
  try {
    const comments = storage.getItem('greenPledgeComments');
    return comments ? JSON.parse(comments) : [];
  } catch (e) {
    console.error('Failed to parse comments:', e);
    return [];
  }
}

// Functions to manage completed challenges and XP
function saveCompletedChallenges(count) {
  if (typeof count !== 'number' || count < 0) {
    console.error('Completed challenges count must be a non-negative number');
    return;
  }
  try {
    storage.setItem('greenPledgeCompletedChallenges', count.toString());
  } catch (e) {
    console.error('Failed to save completed challenges:', e);
  }
}

function getCompletedChallenges() {
  try {
    const count = storage.getItem('greenPledgeCompletedChallenges');
    return count ? parseInt(count, 10) : 0;
  } catch (e) {
    console.error('Failed to parse completed challenges:', e);
    return 0;
  }
}

function saveXP(xp) {
  if (typeof xp !== 'number' || xp < 0) {
    console.error('XP must be a non-negative number');
    return;
  }
  try {
    storage.setItem('greenPledgeXP', xp.toString());
  } catch (e) {
    console.error('Failed to save XP:', e);
  }
}

function getXP() {
  try {
    const xp = storage.getItem('greenPledgeXP');
    return xp ? parseInt(xp, 10) : 0;
  } catch (e) {
    console.error('Failed to parse XP:', e);
    return 0;
  }
}

// Functions to manage photos
function savePhotos(photos) {
  if (!Array.isArray(photos)) {
    console.error('Photos must be an array');
    return;
  }
  // Sanitize photo data (assuming photos are base64 strings or objects with strings)
  const sanitizedPhotos = photos.map(photo => {
    if (typeof photo === 'string') {
      return DOMPurify.sanitize(photo);
    } else if (typeof photo === 'object' && photo !== null) {
      return {
        ...photo,
        challenge: typeof photo.challenge === 'string' ? DOMPurify.sanitize(photo.challenge) : photo.challenge,
        photo: typeof photo.photo === 'string' ? DOMPurify.sanitize(photo.photo) : photo.photo,
        date: typeof photo.date === 'string' ? DOMPurify.sanitize(photo.date) : photo.date
      };
    }
    return photo;
  });
  try {
    const photoData = JSON.stringify(sanitizedPhotos);
    // Check approximate size (rough estimate, JSON string length is not exact byte size)
    if (photoData.length > 2 * 1024 * 1024) { // 2MB limit to be safe
      console.warn('Photo data is large and may exceed localStorage limits. Consider using a backend for storage.');
    }
    storage.setItem('greenPledgePhotos', photoData);
  } catch (e) {
    console.error('Failed to save photos:', e);
  }
}

function getPhotos() {
  try {
    const photos = storage.getItem('greenPledgePhotos');
    return photos ? JSON.parse(photos) : [];
  } catch (e) {
    console.error('Failed to parse photos:', e);
    return [];
  }
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

// Function to clear all app data
function clearAllData() {
  try {
    storage.removeItem('greenPledgeUser');
    storage.removeItem('greenPledgeSavedChallenges');
    storage.removeItem('greenPledgeComments');
    storage.removeItem('greenPledgeCompletedChallenges');
    storage.removeItem('greenPledgeXP');
    storage.removeItem('greenPledgePhotos');
    console.log('All app data cleared');
  } catch (e) {
    console.error('Failed to clear all data:', e);
  }
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
  getRandomChallenge,
  clearAllData
};
