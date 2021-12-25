

APIURL = "https://api.github.com/users/";
main = document.getElementById("main");
form = document.getElementById("form");
search = document.getElementById("search");

getUser("readyresearcherone");

async function getUser(username) {
    resp = await fetch(APIURL + username);
    respData = await resp.json();

    createUserCard(respData);

    getRepos(username);
}

async function getRepos(username) {
    resp = await fetch(APIURL + username + "/repos");
    respData = await resp.json();

    addReposToCard(respData);
}

function createUserCard(user) {
    cardHTML = `
    
        <div class="card">

            

            <div class="user-info">
                <h2>${user.name}</h2>
                <p>${user.followers}<strong> Followers</strong>
                ${user.following}<strong> Following</strong>
                ${user.public_repos}<strong> Repos</strong></p>          
           <div>
                <div class="info">
                <p id="usb">${user.bio}</p>
                </div>

                <img class="avatar" src="${user.avatar_url}" alt="${user.name}" />             
                </div>
                <div id="repos"></div>
            </div>
        </div>
        
    `;

    main.innerHTML = cardHTML;
}

function addReposToCard(repos) {
    reposEl = document.getElementById("repos");

    repos
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 10)
        .forEach((repo) => {
            repoEl = document.createElement("a");
            repoEl.classList.add("repo");

            repoEl.href = repo.html_url;
            repoEl.target = "_blank";
            repoEl.innerText = repo.name;

            reposEl.appendChild(repoEl);
        });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    user = search.value;

    if (user) {
        getUser(user);

        search.value = "";
    }
})


