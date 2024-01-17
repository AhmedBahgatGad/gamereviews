document.addEventListener("DOMContentLoaded", function () {
    let games = []
    let gameData = document.getElementById("gameData")
    let category = "mmorpg"
    let id
    async function getGames() {
        document.querySelector(".loading").classList.remove("d-none")
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'babd1b50damsha398abf6d5a8389p160be1jsndb01cc221341',
                'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
            }
        }
        const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`, options);

        const response = await api.json();
        games = response
        display()
        document.querySelector(".loading").classList.add("d-none")
        let card = document.querySelectorAll(".card")
        for (i = 0; i < card.length; i++) {
            card[i].addEventListener('click', detail)
        }
    }
    getGames()
    $('#navbar .nav-link').on('click', function (event) {
        $(event.target).addClass("active");
        $("#navbar .nav-link").not(event.target).removeClass("active");
        category = event.target.getAttribute('value')
        getGames()
    })

    function display() {
        let temp = ""
        for (let i = 0; i < games.length; i++) {
            temp = temp + `<div class="col">
            <div data-id="${games[i].id}" class="card h-100 bg-transparent" role="button" "="">
            <div class=" card-body">
            <figure class="position-relative">
            <img class="card-img-top object-fit-cover h-100"
            src="${games[i].thumbnail
                }">
            </figure>
            <figcaption>
            <div class="hstack justify-content-between">
            <h3 class="h6 small">${games[i].title}</h3>
            <span class="badge text-bg-primary p-2">Free</span>
            </div>
            <p class="card-text small text-center opacity-50">
            ${games[i].short_description}
            </p>
            </figcaption>
            </div>
            <footer class="card-footer small hstack justify-content-between">
                <span class="badge badge-color">${games[i].genre}</span>
                <span class="badge badge-color">${games[i].platform}</span>
                </footer>
                </div>
                </div>`
        }
        gameData.innerHTML = temp
        $('.card').on('click', function (event) {
            id = event.currentTarget.getAttribute('data-id')
            getGameData()
        })
    }
    function detail() {
        document.querySelector(".details").classList.remove("d-none")
        document.querySelector(".mainsection").classList.add("d-none")
        function closetab () {
            document.querySelector(".details").classList.add("d-none")
            document.querySelector(".mainsection").classList.remove("d-none")
        }
        document.getElementById("btnClose").addEventListener('click', closetab)
        $(document).keydown(function(e) {
            if (e.keyCode == 27) {
                closetab()
            }
        });
    }
    let specGame = {}

    async function getGameData() {
        document.querySelector(".loading").classList.remove("d-none")
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'babd1b50damsha398abf6d5a8389p160be1jsndb01cc221341',
                'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
            }
        }
        const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`, options);

        const response = await api.json();
        specGame = response
        document.querySelector(".loading").classList.add("d-none")
        gameDetail()
    }

    function gameDetail() {
        document.getElementById("detailsContent").innerHTML = `<div class="col-md-4">
        <img src="${specGame.thumbnail}" class="w-100" alt="image details">
    </div>
    <div class="col-md-8">
        <h3>Title: ${specGame.title}</h3>
        <p>Category: <span class="badge text-bg-info"> ${specGame.genre}</span> </p>
        <p>Platform: <span class="badge text-bg-info"> ${specGame.platform}</span> </p>
        <p>Status: <span class="badge text-bg-info"> ${specGame.status}</span> </p>
        <p class="small">${specGame.description}
            </p>
            <a class="btn btn-outline-warning" target="_blank"
            href="${specGame.game_url}">Show Game</a>
    </div>`
    }
})
