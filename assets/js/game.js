console.log('[BielTheDev] Flappy Bird');

const sprites = new Image();
sprites.src = 'assets/image/sprites.png';

const sfx_hit = new Audio();
sfx_hit.src = 'assets/sound/sfx_hit.wav';

const sfx_point = new Audio();
sfx_hit.src = 'assets/sound/sfx_point.wav';

const font = 'flappy-font';

const canvas = document.getElementById('game-canvas');
const context = canvas.getContext('2d');

const Background = {
    init() {
        this.sprite = sprites;
        this.sourceX = 390;
        this.sourceY = 0;
        this.spriteW = 276;
        this.spriteH = 204;
        this.x = 0;
        this.y = canvas.height - 204;
        this.width = 276;
        this.height = 204;
    },
    draw() {
        context.fillStyle = "#70C5CE";
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.drawImage(
            Background.sprite,
            Background.sourceX, Background.sourceY,
            Background.spriteW, Background.spriteH,
            Background.x, Background.y,
            Background.width, Background.height
        );

        context.drawImage(
            Background.sprite,
            Background.sourceX, Background.sourceY,
            Background.spriteW, Background.spriteH,
            (Background.x + Background.width), Background.y,
            Background.width, Background.height
        );
    }
};

const Floor = {
    init() {
        this.sprite = sprites;
        this.sourceX = 0;
        this.sourceY = 610;
        this.spriteW = 224;
        this.spriteH = 112;
        this.x = 0;
        this.y = canvas.height - 112;
        this.width = 224;
        this.height = 112;
        this.speed = 1;
    },
    draw() {
        context.drawImage(
            Floor.sprite,
            Floor.sourceX, Floor.sourceY,
            Floor.spriteW, Floor.spriteH,
            Floor.x, Floor.y,
            Floor.width, Floor.height
        );

        context.drawImage(
            Floor.sprite,
            Floor.sourceX, Floor.sourceY,
            Floor.spriteW, Floor.spriteH,
            (Floor.x + Floor.width), Floor.y,
            Floor.width, Floor.height
        );
    },
    update() {
        const moveTo = Floor.x - Floor.speed;
        const spriteHalf = Floor.width / 2;

        Floor.x = (moveTo % spriteHalf);
    }
};

const Pipes = {
    init() {
        this.first= {
            top: {
                sprite: sprites,
                sourceX: 52,
                sourceY: 169,
                spriteW: 52,
                spriteH: 400,
                x: canvas.width + 52,
                y: -250,
                width: 52,
                height: 400
            },
            bottom: {
                sprite: sprites,
                sourceX: 0,
                sourceY: 169,
                spriteW: 52,
                spriteH: 400,
                x: canvas.width + 52,
                y: 250,
                width: 52,
                height: 400
            }
        }

        this.second = {
            top: {
                sprite: sprites,
                sourceX: 52,
                sourceY: 169,
                spriteW: 52,
                spriteH: 400,
                x: canvas.width + 264,
                y: -250,
                width: 52,
                height: 400
            },
            bottom: {
                sprite: sprites,
                sourceX: 0,
                sourceY: 169,
                spriteW: 52,
                spriteH: 400,
                x: canvas.width + 264,
                y: 250,
                width: 52,
                height: 400
            }
        }

        this.randomizeGap(this.first);
        this.randomizeGap(this.second);
    },
    draw() {
        context.drawImage(
            Pipes.first.top.sprite,
            Pipes.first.top.sourceX, Pipes.first.top.sourceY,
            Pipes.first.top.spriteW, Pipes.first.top.spriteH,
            Pipes.first.top.x, Pipes.first.top.y,
            Pipes.first.top.width, Pipes.first.top.height
        );

        context.drawImage(
            Pipes.first.bottom.sprite,
            Pipes.first.bottom.sourceX, Pipes.first.bottom.sourceY,
            Pipes.first.bottom.spriteW, Pipes.first.bottom.spriteH,
            Pipes.first.bottom.x, Pipes.first.bottom.y,
            Pipes.first.bottom.width, Pipes.first.bottom.height
        );

        context.drawImage(
            Pipes.second.top.sprite,
            Pipes.second.top.sourceX, Pipes.second.top.sourceY,
            Pipes.second.top.spriteW, Pipes.second.top.spriteH,
            Pipes.second.top.x, Pipes.second.top.y,
            Pipes.second.top.width, Pipes.second.top.height
        );

        context.drawImage(
            Pipes.second.bottom.sprite,
            Pipes.second.bottom.sourceX, Pipes.second.bottom.sourceY,
            Pipes.second.bottom.spriteW, Pipes.second.bottom.spriteH,
            Pipes.second.bottom.x, Pipes.second.bottom.y,
            Pipes.second.bottom.width, Pipes.second.bottom.height
        );
    },
    update() {
        Pipes.first.bottom.x -= 2;
        Pipes.first.top.x -= 2;
        Pipes.second.bottom.x -= 2;
        Pipes.second.top.x -= 2;

        if (Pipes.first.top.x <= 0 - Pipes.first.top.width) {
            Pipes.randomizeGap(Pipes.first);
            Pipes.first.top.x = canvas.width + Pipes.first.top.width;
            Pipes.first.bottom.x = canvas.width + Pipes.first.bottom.width;
        }
        if (Pipes.second.top.x <= 0 - Pipes.second.top.width) {
            Pipes.randomizeGap(Pipes.second);
            Pipes.second.top.x = canvas.width + Pipes.second.top.width;
            Pipes.second.bottom.x = canvas.width + Pipes.second.bottom.width;
        }
    },
    randomizeGap(pair) {
        const origin = Math.round(-165 * (Math.random() + 1));

        pair.top.y = origin;
        pair.bottom.y = origin + 500;
    }
};

const GetReadyMessage = {
    init() {
        this.sprite = sprites;
        this.sourceX = 134;
        this.sourceY = 0;
        this.spriteW = 174;
        this.spriteH = 152;
        this.x = (canvas.width / 2) - (174 / 2);
        this.y = 50;
        this.width = 174;
        this.height = 152;
    },
    draw() {
        context.drawImage(
            GetReadyMessage.sprite,
            GetReadyMessage.sourceX, GetReadyMessage.sourceY,
            GetReadyMessage.spriteW, GetReadyMessage.spriteH,
            GetReadyMessage.x, GetReadyMessage.y,
            GetReadyMessage.width, GetReadyMessage.height
        );
    }
};

const GameoverMessage = {
    init() { 
        this.sprite = sprites;
        this.sourceX =  134;
        this.sourceY =  153;
        this.spriteW =  226;
        this.spriteH =  200;
        this.x = (canvas.width / 2) - (226 / 2);
        this.y = 50;
        this.width = 226;
        this.height = 200;
    },
    draw() {
        context.drawImage(
            GameoverMessage.sprite,
            GameoverMessage.sourceX, GameoverMessage.sourceY,
            GameoverMessage.spriteW, GameoverMessage.spriteH,
            GameoverMessage.x, GameoverMessage.y,
            GameoverMessage.width, GameoverMessage.height
        );
    }
};

const Score = {
    init() {
        this.points = 0;
    },
    draw() {
        context.font = `35px ${font}`;
        context.textAlign = 'right';
        context.fillStyle = 'white';
        context.fillText(Score.points, canvas.width - 10, 40);
    },
    update() {
        if (FlappyBird.x === (Pipes.first.top.x + 1) || FlappyBird.x === (Pipes.second.top.x + 1)) {
            Score.points += 1;
            sfx_point.play();
        }
    }
};

const FlappyBird = {
    init() {
        // Sprites
        this.sprites = [
            {
                spriteSheet: sprites,
                sourceX: 0,
                sourceY: 0,
                spriteW: 34,
                spriteH: 24,
            },
            {
                spriteSheet: sprites,
                sourceX: 0,
                sourceY: 26,
                spriteW: 34,
                spriteH: 24,
            },
            {
                spriteSheet: sprites,
                sourceX: 0,
                sourceY: 52,
                spriteW: 34,
                spriteH: 24,
            },
            {
                spriteSheet: sprites,
                sourceX: 0,
                sourceY: 26,
                spriteW: 34,
                spriteH: 24,
            }
        ];

        // Inital Sprite
        this.changeSprite(this.sprites[0]);
        this.x = 25;
        this.y = 172;

        // Movement
        this.gravity = 0.25;
        this.speed = 0;
        this.jumpStrength = 4.6;

        // Animation
        this.currentSprite = 0;
        this.currentFrame = 0;
        this.updateFrame = 10;
    },
    draw() {
        context.drawImage(
            FlappyBird.sprite,
            FlappyBird.sourceX, FlappyBird.sourceY,
            FlappyBird.spriteW, FlappyBird.spriteH,
            FlappyBird.x, FlappyBird.y,
            FlappyBird.width, FlappyBird.height
        );
    },
    update() {
        if (FlappyBird.checkCollision()) FlappyBird.die();

        FlappyBird.speed = FlappyBird.speed + FlappyBird.gravity;
        FlappyBird.y = FlappyBird.y + FlappyBird.speed;
    },
    animate() {
        FlappyBird.currentFrame = FlappyBird.currentFrame + 1;

        if (FlappyBird.currentFrame % FlappyBird.updateFrame === 0) {
            const spriteAmmount = FlappyBird.sprites.length;

            if (FlappyBird.currentSprite !== spriteAmmount - 1) {
                FlappyBird.currentSprite = FlappyBird.currentSprite + 1;
            } else {
                FlappyBird.currentSprite = 0;
            }

            FlappyBird.changeSprite(FlappyBird.sprites[FlappyBird.currentSprite]);
        }
    },
    changeSprite(sprite) {
        FlappyBird.sprite = sprite.spriteSheet;
        FlappyBird.sourceX = sprite.sourceX;
        FlappyBird.sourceY = sprite.sourceY;
        FlappyBird.spriteW = sprite.spriteW;
        FlappyBird.spriteH = sprite.spriteH;
        FlappyBird.width = sprite.spriteW;
        FlappyBird.height = sprite.spriteH;
    },
    jump() {
        FlappyBird.speed = -FlappyBird.jumpStrength;
    },
    checkCollision() {
        // FlappyBird Hitbox
        const hitbox = {
            top: FlappyBird.y,
            right: FlappyBird.x + FlappyBird.width,
            bottom: FlappyBird.y + FlappyBird.height,
            left: FlappyBird.x
        };

        // Floor Collision
        if (hitbox.bottom >= Floor.y) return true;

        // Pipes Collision
        const pipes = [
            Pipes.first.bottom,
            Pipes.first.top,
            Pipes.second.bottom,
            Pipes.second.top
        ];

        for (let pipe in pipes) {
            // Between Pipes X Range
            if (hitbox.right >= pipes[pipe].x && hitbox.right <= (pipes[pipe].x + pipes[pipe].width)) {
                // Between Top Pipe Y Range
                if (hitbox.top <= (pipes[pipe].y + pipes[pipe].height) && hitbox.top >= pipes[pipe].y) {
                    return true;
                }
                // Between Bottom Pipe Y Range
                if (hitbox.bottom >= pipes[pipe].y && hitbox.bottom <= (pipes[pipe].y + pipes[pipe].height)) {
                    return true;
                }
            }
        }
        
        // None Collision
        return false;
    },
    die() {
        sfx_hit.play();

        ScreenManager.setCurrentScreen(Gameover);
    }
};

const StartScreen = {
    init() {
        FlappyBird.init();
        GetReadyMessage.init();
    },
    draw() {
        Background.draw();
        Floor.draw();
        FlappyBird.draw();
        GetReadyMessage.draw();
    },
    update() {
        Floor.update();
        FlappyBird.animate();
    },
    click() {
        ScreenManager.setCurrentScreen(Gameplay);
    }
};

const Gameplay = {
    init() {
        Pipes.init();
        Score.init();
    },
    draw() {
        Background.draw();
        Pipes.draw();
        Floor.draw();
        FlappyBird.draw();
        Score.draw();
    },
    update() {
        Pipes.update();
        Floor.update();
        FlappyBird.animate();
        FlappyBird.update();
        Score.update();
    },
    click() {
        FlappyBird.jump();
    }
};

const Gameover = {
    init() {
        GameoverMessage.init();
    },
    draw() {
        GameoverMessage.draw();
    },
    update() {
    },
    click() {
        ScreenManager.setCurrentScreen(StartScreen);
    }
};

const ScreenManager = {
    setCurrentScreen(screen) {
        this.currentScreen = screen;

        screen.init();
    }
};

function Start() {
    window.addEventListener('click', event => {
        if (ScreenManager.currentScreen.click) ScreenManager.currentScreen.click();
    });

    Background.init();
    Floor.init();
    
    ScreenManager.setCurrentScreen(StartScreen);
}

function Update() {
    ScreenManager.currentScreen.draw();
    ScreenManager.currentScreen.update();

    requestAnimationFrame(Update);
}

function Init() {
    Start();
    Update();
}

Init();
