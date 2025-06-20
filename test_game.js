const fs = require('fs');
const { JSDOM } = require('jsdom');

// Read index.html
const html = fs.readFileSync('index.html', 'utf-8');

// Create JSDOM instance
const dom = new JSDOM(html, {
  url: 'http://localhost', // Required for localStorage and other features
  runScripts: 'dangerously', // Enable script execution
  resources: 'usable', // Load external resources like bundle.js
  pretendToBeVisual: true, // Mimic a visual browser environment
});

// Get window and document objects
const { window } = dom;
const { document } = window;

// --- Load and Execute bundle.js manually ---
try {
  const bundleScriptContent = fs.readFileSync('bundle.js', 'utf-8');
  window.eval(bundleScriptContent);
  console.log('Manually evaluated bundle.js content.');
} catch (e) {
  console.log('CRITICAL ERROR: Could not read or evaluate bundle.js. Error: ' + e);
  process.exit(1);
}

// --- Initial Checks ---
if (!window.localStorage) {
  console.log('CRITICAL ERROR: window.localStorage is not available. Exiting.');
  process.exit(1);
}
if (typeof window.createComponent !== 'function') { // Check on window object
    console.log('CRITICAL ERROR: createComponent function is not defined on window object after manual eval. bundle.js might not be loaded/executed correctly or does not assign to window.');
    console.log('Attempting to load bundle.js content for debugging:');
    try {
        const bundleContent = fs.readFileSync('bundle.js', 'utf-8');
        console.log(bundleContent.slice(0, 500)); // Print first 500 chars
    } catch (e) {
        console.log('Could not read bundle.js for debugging.');
    }
    process.exit(1);
}

// Capture console messages
const consoleMessages = [];
window.console.log = (...args) => {
  consoleMessages.push(args.join(' '));
};
window.console.error = (...args) => {
  consoleMessages.push(`ERROR: ${args.join(' ')}`);
};

// Function to execute scripts and check for errors
function executeScript(script) {
  try {
    // Ensure functions from bundle.js are called via window context if they are global
    const result = window.eval(script);
    // console.log(`Executed: ${script}, Result: ${result}`);
    return true;
  } catch (error) {
    consoleMessages.push(`EXECUTION ERROR in "${script}": ${error}`);
    // console.error(`EXECUTION ERROR in "${script}":`, error);
    return false;
  }
}

// --- Test Steps ---
let success = true;

// 1. Load index.html (already done by JSDOM) and bundle.js (manually evaluated)
console.log('Step 1: index.html structure loaded, bundle.js manually evaluated.');

// 2. Navigate to Campaign Screen
console.log('Step 2: Navigating to Campaign Screen...');
if (!executeScript("window.createComponent('campaign')")) {
  success = false;
}

// Verify campaign element
const campaignElement = document.getElementById('campaign');
if (campaignElement && document.getElementById('canvas').contains(campaignElement)) {
  console.log('Campaign element created successfully.');
} else {
  console.log('ERROR: Campaign element not found or not in canvas.');
  success = false;
}

// 3. Navigate to Game Screen from Campaign
console.log('Step 3: Navigating to Game Screen...');
window.localStorage.setItem("blitz_game_type", "campaign");
window.localStorage.setItem("blitz_current_campaign_target_score", "10");
window.localStorage.setItem("blitz_current_campaign_attempting_level", "1");
console.log('LocalStorage items set.');

if (!executeScript("window.clearScreen()")) {
  success = false;
}
console.log('clearScreen() executed.');

if (!executeScript("window.createComponent('game')")) {
  success = false;
}
console.log('createComponent(\'game\') executed.');

// Verify game element
const gameElement = document.getElementById('game');
if (gameElement && document.getElementById('canvas').contains(gameElement)) {
  console.log('Game element created successfully.');
} else {
  console.log('ERROR: Game element not found or not in canvas.');
  success = false;
}

// Verify campaign element is removed
const campaignElementAfterGame = document.getElementById('campaign');
if (!campaignElementAfterGame) {
  console.log('Campaign element removed successfully after navigating to game screen.');
} else {
  console.log('ERROR: Campaign element still present after navigating to game screen.');
  success = false;
}

// --- Report Results ---
console.log('\n--- Test Summary ---');
console.log(`Overall test success: ${success}`);
console.log('\nConsole Messages:');
consoleMessages.forEach(msg => console.log(msg));

if (!success) {
  process.exit(1); // Exit with error code if test failed
}
