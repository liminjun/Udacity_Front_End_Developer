// Enemies our player must avoid
var Enemy = function (x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    //every grid width is 100px,so set the moveSpeed range is 10-210. Not so fast or so slow.
    this.moveSpeed = Math.floor(Math.random() * 200 + 10);
    //console.log(this.moveSpeed);
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.moveSpeed * dt;
    //loop the enemy, so the game more fun.
    if (this.x > 600) {
        this.x = -Math.floor(Math.random() * 200 + 100)
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// canvas.width = 505;
//canvas.height = 606;
// the sprite width is 101,height:171

var Player = function () {
    this.x = 202;//the center of x axial.
    this.y = 405;
    this.score = 0;
    this.sprite = "images/char-boy.png";
}
Player.prototype.update = function () {
    this.x = this.x;
    this.y = this.y;
    this.checkCollision();

    //Check the palyer has reached the shoreside.
    if (this.y < 10) {
        this.reset();
        this.score += 100;//every time success, add 100.
    }
}
Player.prototype.checkCollision = function () {
    for (var i = 0; i < allEnemies.length; i++) {
        if (Math.abs(player.x - allEnemies[i].x) < 40 && Math.abs(player.y - allEnemies[i].y) < 40) {
            this.reset();
        }
    }
};
//rest the Player once it successed or failed.
Player.prototype.reset = function () {
    this.x = 202;
    this.y = 405;
};

//Draw the play and the score text on the screen.
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    ctx.fillStyle = "white";
    ctx.font = '26px Arial';
    ctx.fillText("Your Score: " + this.score, 15, 90);
};
//Move the player and check the player stay inside the canvas.
Player.prototype.handleInput = function (keyInput) {
    switch (keyInput) {
        case 'up':
            if (this.y < 10) {
                return null;
            }
            else {
                this.y -= 83;
            }
            break;
        case 'down':
            if (this.y > 400) {
                return null;
            }
            else {
                this.y += 83;
            }
            break;
        case 'left':
            if (this.x < 100) {
                return null;
            }
            else {
                this.x -= 101;
            }
            break;
        case 'right':
            if (this.x > 400) {
                return null;
            }
            else {
                this.x += 101;
            }
            break;
    }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();

var enemy1 = new Enemy(-200, 60);
var enemy2 = new Enemy(-350, 145);
var enemy3 = new Enemy(-100, 230);
var allEnemies = [];

document.getElementById("btn-start").addEventListener('click', function (e) {
    allEnemies = [enemy1, enemy2, enemy3];
});


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    if (allEnemies.length > 0) {
        var allowedKeys = {
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down'
        };
        player.handleInput(allowedKeys[e.keyCode]);
    }

});
