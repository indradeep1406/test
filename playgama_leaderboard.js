// Playgama Leaderboard API functions

const DEFAULT_LEADERBOARD_NAME = "GLOBAL LEADERBOARD";

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
  score: "font-weight: bold; color: #E87A00; padding: 10px"
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
  title.textContent = `${leaderboardName}`;
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

  const heading = document.createElement('li');
  heading.style.cssText = popupStyles.listItem;
  const headingRank = document.createElement('span');
  headingRank.textContent = 'Rank';
  headingRank.style.cssText = popupStyles.rank;
  const headingName = document.createElement('span');
  headingName.textContent = 'Name';
  headingName.style.cssText = popupStyles.name;
  const headingMatch = document.createElement('span');
  headingMatch.textContent = 'Matches';
  headingMatch.style.cssText = popupStyles.score;
  const headingWon = document.createElement('span');
  headingWon.textContent = 'Won';
  headingWon.style.cssText = popupStyles.score;
  const headingLost = document.createElement('span');
  headingLost.textContent = 'Lost';
  headingLost.style.cssText = popupStyles.score;
  const headingTie = document.createElement('span');
  headingTie.textContent = 'Tie';
  headingTie.style.cssText = popupStyles.score;
  const headingRuns = document.createElement('span');
  headingRuns.textContent = 'Runs';
  headingRuns.style.cssText = popupStyles.score;
  const heading4s = document.createElement('span');
  heading4s.textContent = '4s';
  heading4s.style.cssText = popupStyles.score;
  const heading6s = document.createElement('span');
  heading6s.textContent = '6s';
  heading6s.style.cssText = popupStyles.score;
  const headingbp = document.createElement('span');
  headingbp.textContent = 'Balls Played';
  headingbp.style.cssText = popupStyles.score;

  heading.appendChild(headingRank);
  heading.appendChild(headingName);
  heading.appendChild(headingMatch);
  heading.appendChild(headingWon);
  heading.appendChild(headingLost);
  heading.appendChild(headingTie);
  heading.appendChild(headingRuns);
  heading.appendChild(heading4s);
  heading.appendChild(heading6s);
  heading.appendChild(headingbp);
  list.appendChild(heading);
  // Dummy data
  fetch('http://127.0.0.1:8000/leaderboard')
    .then(response => response.json())
    .then(data => {
      dummyPlayers = data;
      dummyPlayers.sort((a, b) => b.score - a.score);


      dummyPlayers.forEach((player, index) => {
    const listItem = document.createElement('li');
    listItem.style.cssText = (index === dummyPlayers.length - 1) ? popupStyles.listItemLast : popupStyles.listItem;

    const rankSpan = document.createElement('span');
    rankSpan.textContent = player["Rank"];
    rankSpan.style.cssText = popupStyles.rank;

    const nameSpan = document.createElement('span');
    nameSpan.textContent = player["Name"];
    nameSpan.style.cssText = popupStyles.name;

    const matchSpan = document.createElement('span');
    matchSpan.textContent = player["Matches"];
    matchSpan.style.cssText = popupStyles.score;

    const wonSpan = document.createElement('span');
    wonSpan.textContent = player["Won"];
    wonSpan.style.cssText = popupStyles.score;

    const lostSpan = document.createElement('span');
    lostSpan.textContent = player["Lost"];
    lostSpan.style.cssText = popupStyles.score;

    const tieSpan = document.createElement('span');
    tieSpan.textContent = player["Tie"];
    tieSpan.style.cssText = popupStyles.score;

    const runSpan = document.createElement('span');
    runSpan.textContent = player["Runs"];
    runSpan.style.cssText = popupStyles.score;

    const fourSpan = document.createElement('span');
    fourSpan.textContent = player["4s"];
    fourSpan.style.cssText = popupStyles.score;

    const sixSpan = document.createElement('span');
    sixSpan.textContent = player["6s"];
    sixSpan.style.cssText = popupStyles.score;

    const bpSpan = document.createElement('span');
    bpSpan.textContent = player["Balls Played"];
    bpSpan.style.cssText = popupStyles.score;

    listItem.appendChild(rankSpan);
    listItem.appendChild(nameSpan);
    listItem.appendChild(matchSpan);
    listItem.appendChild(wonSpan);
    listItem.appendChild(lostSpan);
    listItem.appendChild(tieSpan);
    listItem.appendChild(runSpan);
    listItem.appendChild(fourSpan);
    listItem.appendChild(sixSpan);
    listItem.appendChild(bpSpan);
    list.appendChild(listItem);

    popup.appendChild(list);
    // Removed debug alert
    document.body.appendChild(popup);
  });
})

  

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
