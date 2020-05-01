console.log('[BielDesu] Flappy Bird');

const sprites = new Image();
sprites.src = 'assets/image/sprites.png';

const sfx_hit = new Audio();
sfx_hit.src = 'assets/sound/sfx_hit.wav';

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
}

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
}

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
}

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
        this.x = 10;
        this.y = 50;

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
        if(FlappyBird.checkCollision()) FlappyBird.die();

        FlappyBird.speed = FlappyBird.speed + FlappyBird.gravity;
        FlappyBird.y = FlappyBird.y + FlappyBird.speed;
    },
    animate() {
        FlappyBird.currentFrame = FlappyBird.currentFrame + 1;

        if(FlappyBird.currentFrame % FlappyBird.updateFrame === 0) {
            const spriteAmmount = FlappyBird.sprites.length;

            if(FlappyBird.currentSprite !== spriteAmmount - 1) {
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
        const baseY = FlappyBird.y + FlappyBird.height;
        const floorY = Floor.y;

        if(baseY >= floorY) return true;
        
        return false;
    },
    die() {
        sfx_hit.play();

        ScreenManager.setCurrentScreen(StartScreen);
    }
}

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
}

const Gameplay = {
    init() {
    },
    draw() {
        Background.draw();
        Floor.draw();
        FlappyBird.draw();
    },
    update() {
        Floor.update();
        FlappyBird.animate();
        FlappyBird.update();
    },
    click() {
        FlappyBird.jump();
    }
}

const ScreenManager = {
    setCurrentScreen(screen) {
        this.currentScreen = screen;

        screen.init();
    }
}

const Init = () => {
    Start();
    Update();
}

const Start = () => {
    window.addEventListener('click', event => {
        if(ScreenManager.currentScreen.click) ScreenManager.currentScreen.click();
    });

    Background.init();
    Floor.init();
    
    ScreenManager.setCurrentScreen(StartScreen);
}

const Update = () => {
    ScreenManager.currentScreen.draw();
    ScreenManager.currentScreen.update();

    requestAnimationFrame(Update);
}

Init();