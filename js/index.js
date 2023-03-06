
function renderPage() {

    // let homePage = document.getElementById("home");
    let cookiesPage = document.getElementById("cookies");
    let blockedCookiesPage = document.getElementById("blackCookies");
    let homeResults = document.getElementById("results");// print results after search

    //create user 
    let user = new User();

    //create manager
    let manager = new CookieManager();
    console.log(manager);

    let handleHashChange = function () {
        let ids = ["home", "cookies", "blackCookies", "date"];
        let hash = location.hash.slice(1) || "home";

        ids.forEach(id => {
            let page = document.getElementById(id);

            if (id === hash) {
                page.style.display = "flex";
            } else {
                page.style.display = "none";
            }
        });

        switch (hash) {
            case "home":
                printElements(manager.cookies, homeResults);
                break;
            case "cookies":
                printElements(user.liked, cookiesPage);
                break;
            case "blackCookies":
                printElements(user.blocked, blockedCookiesPage);
                break;
            case "date":
                renderLiked(user.liked);
                break;
        }
    }

    window.addEventListener("load", handleHashChange);
    window.addEventListener("hashchange", handleHashChange);

    //PRINT ALL ELEMENTS AT SPECIFIC PAGE
    function printElements(cookies, container) {

        container.innerHTML = "";
        cookies.forEach(cookie => {
            let div = document.createElement("div");
            div.classList.add("card");

            let h3 = document.createElement("h3");
            h3.innerText = cookie.title;

            let img = document.createElement("img");
            img.src = cookie.thumbnail;

            let h4 = document.createElement("h4");
            h4.innerText = cookie.ingredients;

            let h6 = document.createElement("h6");
            h6.innerText = cookie.href;

            //HOLY BUTTONS!!!

            //LIKE
            let likeBtn = document.createElement("button");
            likeBtn.classList.add("likeBtn");

            if (user.isLiked(cookie)) {
                div.classList.add("liked");
                likeBtn.innerText = "DISLIKE";
                likeBtn.addEventListener("click", function () {
                    user.dislike(cookie);
                    handleHashChange();
                });
            } else {
                likeBtn.innerText = "LIKE";
                likeBtn.addEventListener("click", function () {
                    user.like(cookie);
                    handleHashChange();
                });
            }

            //BLOCK
            let blockBtn = document.createElement("button");
            blockBtn.classList.add("blockBtn");

            if (user.isBlocked(cookie)) {
                div.classList.add("blocked");
                blockBtn.innerText = "UNBLOCK";
                blockBtn.addEventListener("click", function () {
                    user.unBlock(cookie);
                    handleHashChange();
                    showCount();
                });
            } else {
                blockBtn.innerText = "BLOCK";
                blockBtn.addEventListener("click", function () {
                    user.block(cookie);
                    handleHashChange();
                });
            }
            if (!user.isLiked(cookie) && !user.isBlocked(cookie)) {
                div.classList.add("neutral");
            }

            div.append(h3, img, h4, h6, likeBtn, blockBtn);
            container.appendChild(div);
        });
    }


    // SEARCH 
    let search = document.getElementById("search");

    search.addEventListener("input", function (event) {
        let text = event.target.value;
        let filtered = manager.filter(text);
        printElements(filtered, homeResults);
    });

    //PRINT LIST OF LIKED AT SPECIFIC PLACE

    function renderLiked() {
        let container = document.getElementById("date");
        container.innerHTML = "";

        let likedList = document.createElement("div");
        let h1 = document.createElement("h1");
        h1.innerText = "Choose one:";

        let ol = document.createElement("ol");

        //CREATE RESPONSIVE BUTTONS FOR EVERY LIKED 

        user.liked.forEach(cookie => {
            let li = document.createElement("li");
            li.innerText = cookie.title;
            let removeBtn = document.createElement("button");
            removeBtn.innerText = "X";
            removeBtn.classList.add("removeBtn");
            removeBtn.addEventListener("click", function() {
                user.dislike(cookie);
                ol.removeChild(li);
            });

            li.appendChild(removeBtn);
            ol.append(li);
        });

        likedList.appendChild(ol);
        container.append(h1,likedList);
    };
}
renderPage();







