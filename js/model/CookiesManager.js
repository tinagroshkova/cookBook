class Cookie {
    constructor(title, href, ingredients, thumbnail) {
        this.title = title;
        this.href = href;
        this.ingredients = ingredients;
        this.thumbnail = thumbnail;
    }
}


class CookieManager {
    constructor() {
        this.cookies = DATA.map(cookie => new Cookie(
            cookie.title,
            cookie.href,
            cookie.ingredients,
            cookie.thumbnail)
        );

    }

    filter(text) {
        return this.cookies.filter(cookie => {
            return cookie.title.toLowerCase().includes(text.trim().toLowerCase());
        });
    }
}
    // filter(text) {
    //     let filterd = [];
    //     for (let i = 0; i < this.cookies.length; i++) {
    //         let cookie = this.cookies[i];
    //         if (cookie.title.toLowerCase().includes(text.trim().toLowerCase())) {
    //             filterd.push(cookie);
    //         }
    //     }
    //     return filterd;
    // }


