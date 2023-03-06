
class User {
    constructor() {
        this.liked = [];
        this.blocked = [];
    }

    //ADD TO LIKED
    like(cookie) {
        let index = this.blocked.indexOf(cookie);
        if (index !== -1) {
            this.blocked.splice(index, 1);
        }
        if (this.liked.indexOf(cookie) === -1) { // ako go nqma, togava add
            this.liked.push(cookie);
        }
        this.updateLikedCount();
        this.updateBlockedCount();
    }

    //remove from liked
    dislike(cookie) {
        let index = this.liked.indexOf(cookie);
        if (index !== -1) {
            this.liked.splice(index, 1);
        }
        this.updateLikedCount();
        this.updateBlockedCount();
    }

    
    
    //remove from blocked
    unBlock(cookie) {
        let index = this.blocked.indexOf(cookie);
        if (index !== -1) {
            this.blocked.splice(index, 1);
        }
        this.updateLikedCount();
        this.updateBlockedCount();
    }
    
    isLiked(cookie) {
        return this.liked.indexOf(cookie) !== -1;
    }
    
    isBlocked(cookie) {
        return this.blocked.indexOf(cookie) !== -1;
    }
    
    //ADD TO BLOCKED
    block(cookie) {
        let index = this.liked.indexOf(cookie);
        if (index !== -1) {
            this.liked.splice(index, 1);
        }
        if (this.blocked.indexOf(cookie) === -1) {
            this.blocked.push(cookie);
        }
        this.updateLikedCount();
        this.updateBlockedCount();
    }


    //get the liked count and update it
    
    likedCount() {
        return this.liked.length;
    }
    
    updateLikedCount() {
        const likedCount = document.getElementById("liked-count");
        if (likedCount) {
            likedCount.innerText = this.liked.length;
        }
    }
    
    //get the blocked count and update it
    blockedCount() {
        return this.blocked.length;
    }
    
    updateBlockedCount() {
        const blockedCount = document.getElementById("blocked-count");
        if (blockedCount) {
            blockedCount.innerText = this.blocked.length;
        }  
    }
}


