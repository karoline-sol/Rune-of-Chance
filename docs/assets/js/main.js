
   // === Capstone Challenge: Dragon Rune Adventure ===

// Class for Player
class Player {
    constructor(name, species) {
        // Set up player properties
        this.name = name;
        this.species = species;
        this.runes = [];
        this.xp = 0;
    }

    // Method to add a rune to the player's collection
    addRune(rune) {
        this.runes.push(rune);
    }

    // Method to lose XP (never goes below 0)
    loseXP(amount = 1) {
        this.xp = Math.max(0, this.xp - amount);
    }

    // Method to gain XP
    gainXP(amount = 1) {
        this.xp += amount;
    }

    // Check if player's guess is correct
    checkRuneGuess(userRune, computerRune) {
        let message;
        if (userRune === computerRune) {
            this.gainXP();
            this.addRune(userRune);
            message = `Correct! You gained 1XP`;
        } else {
            this.loseXP();
            message = `Incorrect! You lost 1XP`;
    
    // Check if they want to continue        
             const keepPlaying = confirm("You lost 1XP! Do you want to continue?");
             if (!keepPlaying) {
              alert("Game over! Thanks for playing.");
              return;
             }
            }

        console.log(message);
        alert(message);
    }

    // Method to get a summary of the player's stats
    getStats() {
        return `${this.name} (${this.species}) | XP: ${this.xp} | Runes: ${this.runes.join(", ") || "None"}`;
    }
}

// === Array of possible rune choices (each as an object) ===
const runeChoices = [
    { name: "Rune of Fire", power: "Flame" },
    { name: "Rune of Ice", power: "Freeze" },
    { name: "Rune of Wisdom", power: "Knowledge" },
    { name: "Rune of Shadows", power: "Stealth" }
];

// Utility function: returns a random integer
const randInt = (max) => Math.floor(Math.random() * max);

// Utility function: displays the player's stats in the HTML page
const showStats = (player) => {
    document.getElementById('stats').textContent = player.getStats();
};

// === Main function that runs the adventure game ===
const startAdventure = () => {
    // Ask for player info
    let name = prompt("Enter your name:");
    if (!name) {
        alert("Name is required to start your adventure!");
        return;
    }

    let species = prompt("Are you a dragon or a human?");
    if (!species) {
        alert("Enter 'dragon' or 'human' to continue");
        return;
    }

    species = species.trim().toLowerCase();
    if (species !== "dragon" && species !== "human") {
        alert("Please enter 'dragon' or 'human' for your species.");
        return;
    }

    // Create player instance
    const player = new Player(name, species);

    // Ask player to choose a rune
    let choice = prompt("Choose your rune: 1. Rune of Wisdom 2. Rune of Fire (Type 1 or 2)");
    let userRune;
    if (choice === "1") {
        userRune = "Rune of Wisdom";
    } else if (choice === "2") {
        userRune = "Rune of Fire";
    } else {
        alert("Invalid Choice!");
        return;
    }

    // Computer chooses a random rune
    const computerRune = runeChoices[randInt(runeChoices.length)].name;

    // Check guess
    player.checkRuneGuess(userRune, computerRune);

    // Show updated stats
    showStats(player);
};

// Add event listener to the start button to begin the adventure when clicked
document.getElementById('startBtn').addEventListener('click', startAdventure);
