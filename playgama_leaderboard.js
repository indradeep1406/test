// Playgama Leaderboard API functions

const DEFAULT_LEADERBOARD_NAME = "global_high_scores";

/**
 * Checks if the leaderboard functionality is supported by the bridge.
 * @returns {boolean} True if supported, false otherwise.
 */
function isLeaderboardSupported() {
  console.log("Checking for leaderboard support...");
  if (typeof bridge !== 'undefined' && bridge.leaderboard) {
    return bridge.leaderboard.isSupported;
  } else {
    console.error("Bridge or bridge.leaderboard is not available.");
    return false;
  }
}

/**
 * Checks if native popups for leaderboards are supported.
 * @returns {boolean} True if native popups are supported, false otherwise.
 */
function isNativePopupSupported() {
  console.log("Checking for native popup support...");
  if (typeof bridge !== 'undefined' && bridge.leaderboard) {
    return bridge.leaderboard.isNativePopupSupported;
  } else {
    console.error("Bridge or bridge.leaderboard is not available.");
    return false;
  }
}

/**
 * Sets the player's score on a specific leaderboard.
 * @param {number} score - The score to set.
 * @param {string} leaderboardName - The name of the leaderboard.
 */
function setPlayerScore(score, leaderboardName) {
  console.log(`Setting score ${score} for leaderboard ${leaderboardName}`);
  if (typeof bridge === 'undefined' || !bridge.leaderboard) {
    console.error("Bridge or bridge.leaderboard is not available. Cannot set score.");
    return;
  }

  let options = {
    score: score,
    leaderboardName: leaderboardName
  };

  // Platform-specific options based on Playgama documentation
  switch (bridge.platform.id) {
    case 'GAMEDISTRIBUTION':
      // No specific options mentioned for Gamedistribution in this context
      break;
    case 'GAMEPIX':
      // No specific options mentioned for GamePix
      break;
    // Add other platforms as needed
    default:
      console.warn(`Platform ${bridge.platform.id} might have specific options for setPlayerScore.`);
  }

  console.log("Options for bridge.leaderboard.setScore:", options);
  // Actual call would be: bridge.leaderboard.setScore(options);
}

/**
 * Gets the player's score from a specific leaderboard.
 * @param {string} leaderboardName - The name of the leaderboard.
 */
function getPlayerScore(leaderboardName) {
  console.log(`Getting player score for leaderboard ${leaderboardName}`);
  if (typeof bridge === 'undefined' || !bridge.leaderboard) {
    console.error("Bridge or bridge.leaderboard is not available. Cannot get score.");
    return;
  }

  let options = {
    leaderboardName: leaderboardName
  };

  // Platform-specific options based on Playgama documentation
  switch (bridge.platform.id) {
    case 'GAMEDISTRIBUTION':
      // Example: Gamedistribution might require a specific format or additional parameters
      // options.gdSpecificParam = 'value';
      break;
    case 'GAMEPIX':
      // options.interval = 'daily'; // Example if GamePix needs an interval
      break;
    // Add other platforms as needed
    default:
      console.warn(`Platform ${bridge.platform.id} might have specific options for getPlayerScore.`);
  }

  console.log("Options for bridge.leaderboard.getScore:", options);
  // Actual call would be: bridge.leaderboard.getScore(options);
}

// Styles for the dummy leaderboard popup
const popupStyles = {
  container: "position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: white; border: 2px solid #4A90E2; padding: 25px; z-index: 1001; min-width: 320px; max-width: 90%; box-shadow: 0 5px 15px rgba(0,0,0,0.3); border-radius: 10px; font-family: Arial, sans-serif;",
  title: "font-size: 1.8em; margin-bottom: 15px; text-align: center; color: #333;",
  closeButton: "position: absolute; top: 10px; right: 15px; cursor: pointer; font-size: 1.5em; color: #aaa; line-height: 1;",
  list: "list-style: none; padding: 0; margin-top: 10px;",
  listItem: "display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee;",
  listItemLast: "display: flex; justify-content: space-between; padding: 8px 0; border-bottom: none;",
  rank: "font-weight: bold; min-width: 30px; color: #4A90E2;",
  name: "flex-grow: 1; margin-left: 10px; margin-right: 10px; color: #555;",
  score: "font-weight: bold; color: #E87A00;"
};

const DUMMY_LEADERBOARD_POPUP_ID = 'dummyLeaderboardPopup';

/**
 * Displays a dummy leaderboard popup on the screen.
 * @param {string} leaderboardName - The name of the leaderboard to display.
 */
function displayDummyLeaderboard(leaderboardName) {
  console.log(`Displaying dummy leaderboard for: ${leaderboardName}`);

  // Remove existing popup if any
  const existingPopup = document.getElementById(DUMMY_LEADERBOARD_POPUP_ID);
  if (existingPopup) {
    existingPopup.remove();
  }

  // Main container
  const popup = document.createElement('div');
  popup.id = DUMMY_LEADERBOARD_POPUP_ID;
  // Revert to original container style
  popup.style.cssText = popupStyles.container;

  // Title
  const title = document.createElement('h2');
  title.textContent = `Leaderboard: ${leaderboardName}`;
  title.style.cssText = popupStyles.title;
  popup.appendChild(title);

  // Close button
  const closeButton = document.createElement('span');
  closeButton.innerHTML = '&times;'; // 'X' character
  closeButton.style.cssText = popupStyles.closeButton;
  closeButton.onclick = () => popup.remove();
  popup.appendChild(closeButton);

  // Leaderboard list
  const list = document.createElement('ul');
  list.style.cssText = popupStyles.list;

  // Dummy data
  const dummyPlayers = [
    { rank: 1, name: "PlayerOne", score: 10000 },
    { rank: 2, name: "PlayerTwo", score: 9500 },
    { rank: 3, name: "PlayerThree", score: 8800 },
    { rank: 4, name: "PlayerFour", score: 7200 },
    { rank: 5, name: "PlayerFive", score: 6500 },
    { rank: 6, name: "PlayerSix", score: 5000 },
  ];

  dummyPlayers.forEach((player, index) => {
    const listItem = document.createElement('li');
    listItem.style.cssText = (index === dummyPlayers.length - 1) ? popupStyles.listItemLast : popupStyles.listItem;

    const rankSpan = document.createElement('span');
    rankSpan.textContent = player.rank;
    rankSpan.style.cssText = popupStyles.rank;

    const nameSpan = document.createElement('span');
    nameSpan.textContent = player.name;
    nameSpan.style.cssText = popupStyles.name;

    const scoreSpan = document.createElement('span');
    scoreSpan.textContent = player.score;
    scoreSpan.style.cssText = popupStyles.score;

    listItem.appendChild(rankSpan);
    listItem.appendChild(nameSpan);
    listItem.appendChild(scoreSpan);
    list.appendChild(listItem);
  });

  popup.appendChild(list);
  // Removed debug alert
  document.body.appendChild(popup);
}


/**
 * Shows the leaderboard.
 * Uses native popup if supported, otherwise displays a dummy leaderboard.
 * @param {string} leaderboardName - The name of the leaderboard to show.
 */
function showLeaderboard(leaderboardName) {
  console.log(`Showing leaderboard ${leaderboardName}`);
  if (typeof bridge === 'undefined' || !bridge.leaderboard) {
    console.error("Bridge or bridge.leaderboard is not available. Cannot show leaderboard.");
    // return; // Allow to proceed for dummy display
  }

  // Removed DEBUG logs
  if (isNativePopupSupported()) {
    // Even if native is supported, we call the dummy for testing in this environment.
    // In a real scenario, you might only call bridge.leaderboard.showNativePopup(options);
    console.log("Native popup is supported. Attempting to show native. Displaying dummy leaderboard for testing.");
    // Example of what might have been logged or called:
    // let options = { leaderboardName: leaderboardName };
    // console.log("Options for bridge.leaderboard.showNativePopup:", options);
    // bridge.leaderboard.showNativePopup(options);
    displayDummyLeaderboard(leaderboardName);
  } else {
    console.log("Native popup not supported. Displaying dummy leaderboard.");
    displayDummyLeaderboard(leaderboardName);
  }
}

/**
 * Placeholder function to handle end of game logic.
 * This function will call setPlayerScore with a default leaderboard name.
 * @param {number} score - The player's final score.
 */
function handleEndOfGame(score) {
  console.log(`Game ended with score: ${score}. Setting score on default leaderboard.`);
  setPlayerScore(score, DEFAULT_LEADERBOARD_NAME);
}

// Event listener for DOMContentLoaded to attach click handler for the leaderboard button
document.addEventListener('DOMContentLoaded', () => {
  const leaderboardButton = document.getElementById('showLeaderboardBtn');
  if (leaderboardButton) {
    leaderboardButton.addEventListener('click', () => {
      console.log('Show Leaderboard button clicked');
      showLeaderboard(DEFAULT_LEADERBOARD_NAME);
    });
  } else {
    console.error('Leaderboard button #showLeaderboardBtn not found.');
  }
});
