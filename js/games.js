document.addEventListener("DOMContentLoaded", () => {
    const addGameBtn = document.getElementById("add-game-btn");
    const gameForm = document.getElementById("game-form");
    const saveGameBtn = document.getElementById("save-game-btn");
    const cancelGameBtn = document.getElementById("cancel-game-btn");
    const gameList = document.getElementById("game-list");

    const gameNameInput = document.getElementById("game-name");
    const gamePlayersInput = document.getElementById("game-players");
    const gameRulesInput = document.getElementById("game-rules");

    let games = JSON.parse(localStorage.getItem("games")) || [];

    function displayGames() {
        gameList.innerHTML = "";
        games.forEach((game, index) => {
            const gameCard = document.createElement("div");
            gameCard.classList.add("game-card");
            gameCard.innerHTML = `
                <h3>🎲 ${game.name}</h3>
                <p><strong>👥 Người chơi:</strong> ${game.players}</p>
                <p><strong>📖 Luật chơi:</strong> ${game.rules}</p>
                <button onclick="deleteGame(${index})" class="btn btn-delete">
                    <i class="bi bi-trash"></i> Xóa
                </button>
            `;
            gameList.appendChild(gameCard);
        });
    }

    saveGameBtn.addEventListener("click", () => {
        const name = gameNameInput.value.trim();
        const players = gamePlayersInput.value.trim();
        const rules = gameRulesInput.value.trim();

        if (name && players && rules) {
            games.push({ name, players, rules });
            localStorage.setItem("games", JSON.stringify(games));
            displayGames();
            gameForm.classList.add("hidden");
            gameNameInput.value = "";
            gamePlayersInput.value = "";
            gameRulesInput.value = "";
        } else {
            alert("Vui lòng điền đầy đủ thông tin.");
        }
    });

    cancelGameBtn.addEventListener("click", () => {
        gameForm.classList.add("hidden");
    });

    addGameBtn.addEventListener("click", () => {
        gameForm.classList.remove("hidden");
    });

    window.deleteGame = function(index) {
        games.splice(index, 1);
        localStorage.setItem("games", JSON.stringify(games));
        displayGames();
    };

    displayGames();
});
