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

/**
 * Shows the leaderboard.
 * Uses native popup if supported, otherwise fetches entries.
 * @param {string} leaderboardName - The name of the leaderboard to show.
 */
function showLeaderboard(leaderboardName) {
  console.log(`Showing leaderboard ${leaderboardName}`);
  if (typeof bridge === 'undefined' || !bridge.leaderboard) {
    console.error("Bridge or bridge.leaderboard is not available. Cannot show leaderboard.");
    return;
  }

  if (isNativePopupSupported()) {
    console.log("Native popup is supported. Preparing to show native leaderboard popup.");
    let options = {
      leaderboardName: leaderboardName
    };
    // Platform-specific options for showNativePopup
    switch (bridge.platform.id) {
      case 'GAMEPIX':
        // options.interval = 'daily'; // Example
        break;
      // Add other platforms as needed
      default:
        console.warn(`Platform ${bridge.platform.id} might have specific options for showNativePopup.`);
    }
    console.log("Options for bridge.leaderboard.showNativePopup:", options);
    // Actual call would be: bridge.leaderboard.showNativePopup(options);
  } else {
    console.log("Native popup not supported. Preparing to get leaderboard entries.");
    let options = {
      leaderboardName: leaderboardName
      // Potentially add other options like limit, offset, etc.
    };
    // Platform-specific options for getEntries
    switch (bridge.platform.id) {
      case 'GAMEDISTRIBUTION':
        // options.limit = 10; // Example
        break;
      // Add other platforms as needed
      default:
        console.warn(`Platform ${bridge.platform.id} might have specific options for getEntries.`);
    }
    console.log("Options for bridge.leaderboard.getEntries:", options);
    // Actual call would be: bridge.leaderboard.getEntries(options);
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
