/*  Students: Please use this week's project for Week 13: Assignment 16: Prototype. 
     You will need to replace the contents of this JavaScript file with your own work, 
     and create any other files, if any, required for the assignment.
     When you are done, be certain to submit the assignment in Canvas to be graded. */
// credits to
let scene1 = {
  key: "scene1",
  active: true,
  preload: scene1Preload,
  create: scene1Create,
  update: scene1Update,
};

// define scene 2 (actual game) configuration in its own variable
let scene2 = {
  key: "scene2",
  active: false,
  preload: scene2Preload,
  create: scene2Create,
  update: scene2Update,
};

let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  dom: {
        createContainer: true
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: [scene1, scene2], // square brackets let us create a list/array of scenes for our game (1 only for now)
};

// create game instance
let game = new Phaser.Game(config);

let scene1image;
let sound1;

function scene1Preload() {
  // preload our image and audio file
  this.load.image("title", "assets/images/PreGameImg.png");
  console.log("PreGame");
  // load audio asset files use this.load.audio()
  this.load.audio("music", "assets/sounds/cute.mp3");
  this.load.setCORS('anonymous')
    this.load.spritesheet('button', 'https://examples.phaser.io/assets/buttons/button_sprite_sheet.png', { frameWidth: 193, frameHeight: 71 })
    this.load.atlas('buttonAtlas', 'https://examples.phaser.io/assets/buttons/button_texture_atlas.png', 'https://examples.phaser.io/assets/buttons/button_texture_atlas.json')
 
}

function scene1Create() {
  // make a image game object to show our bkgnd image
  scene1image = this.add.image(0, 0, "title").setOrigin(0, 0);
  // make a sound audio object (not shown but heard when played)
  sound1 = this.sound.add("music");
  sound1.play({
    volume: 0.2, // set to 50% of volume level
    loop: false, // make audio play repeat over and over
  });

  // credits to: https://codepen.io/samme/pen/XWbReRd
  // credits to: https://www.thepolyglotdeveloper.com/2020/09/switch-between-scenes-phaser-game/
  this.time.addEvent({
        delay: 100,
        loop: false,
        callback: () => {
            this.scene.start("scene2");
        }
    })
}

function scene1Update() {}

function scene1Transition() {
  this.scene.start("scene2");
}

var rabbitBig;

var carrots;
var platforms;
var extraText;
var score = 0;
var scoreText;
var byeBye = false;

function scene2Preload() {
  this.load.audio("meadowThoughts", "assets/sounds/thatsItForToday.mp3");
  this.load.image("meadow", "assets/images/meadow.jpg");
  this.load.image("carrot", "assets/sprites/carrot1.png");
  this.load.image("ground", "assets/platform.png");
  this.load.html('nameform', 'nameform.html');
  

  this.load.spritesheet("rabbitBig", "assets/sprites/rabbitBig.png", {
    frameWidth: 78,
    frameHeight: 52,
  });
}

function scene2Create() {
  sound1.stop();
  meadowThoughts = this.sound.add("meadowThoughts", { loop: false });
  this.add.image(0, 0, "meadow").setOrigin(0, 0);

  platforms = this.physics.add.staticGroup();

  platforms.create(640, 500, "ground").setScale(3).refreshBody();

  rabbitBig = this.physics.add.sprite(50, 350, "rabbitBig");
  

  rabbitBig.setBounce(0.2);
  rabbitBig.setCollideWorldBounds(true);

  

  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("rabbitBig", { start: 2, end: 4 }),
    frameRate: 7,
    repeat: -1,
  });

  this.anims.create({
    key: "turn",
    frames: [{ key: "rabbitBig", frame: 7 }],
    frameRate: 10,
  });

  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("rabbitBig", { start: 6, end: 8 }),
    frameRate: 7,
    repeat: -1,
  });
  cursors = this.input.keyboard.createCursorKeys();

  carrots = this.physics.add.sprite(200, 350, "carrot");
  
  scoreText = this.add.text(15, 15, "current score: 0", {
    fontFamily: "Balsamiq Sans",

    color: "#a579d4",
    fontSize: "32px",
  });
  extraText = this.add.text(15, 45, "Welcome to Type Away", {
    fontFamily: "Balsamiq Sans",

    color: "#a579d4",
    fontSize: "32px",
  });

  this.physics.add.collider(rabbitBig, platforms);

  this.physics.add.collider(carrots, platforms);

  var text = this.add.text(300, 10, 'Please enter your name', { color: 'white', fontFamily: "Balsamiq Sans", fontSize: '20px '});

    var element = this.add.dom(300, 50).createFromCache('nameform');

    element.addListener('click');

    element.on('click', function (event) {

        if (event.target.name === 'playButton')
        {
            var inputText = this.getChildByName('nameField');

            //  Have they entered anything?
            if (inputText.value !== '')
            {
                //  Turn off the click events
                this.removeListener('click');

                //  Hide the login element
                this.setVisible(false);

                //  Populate the text with whatever they typed in
                text.setText('Welcome ' + inputText.value);
            }
             else
            {
                //  Flash the prompt
                this.scene.tweens.add({
                    targets: text,
                    alpha: 0.2,
                    duration: 250,
                    ease: 'Power3',
                    yoyo: true
                });
                        }
        }

    });
 
    this.tweens.add({
        targets: element,
        y: 300,
        duration: 3000,
        ease: 'Power3'
    });


	
	
  this.physics.add.overlap(rabbitBig, carrots, collectcarrot, null, this);

  //  Checks to see if the rabbitBig overlaps with any of the carrots, if she does call the collectcarrot function
  this.physics.add.overlap(rabbitBig, carrots, collectcarrot, null, this);



  meadowThoughts.play();
}

function scene2Update() {
  cursors = this.input.keyboard.createCursorKeys();
  if (byeBye) {
    return;
  }
  if (cursors.left.isDown) {
    rabbitBig.setVelocityX(-200);

    rabbitBig.anims.play("left", true);
  } else if (cursors.right.isDown) {
    rabbitBig.setVelocityX(200);

    rabbitBig.anims.play("right", true);
  } else {
    rabbitBig.setVelocityX(0);

    rabbitBig.anims.play("turn");
  }

  if (cursors.up.isDown && rabbitBig.body.touching.down) {
    rabbitBig.setVelocityY(-400);
  }
}

function collectcarrot(rabbitBig, carrots) {
  carrots.disableBody(true, true);

  //  Add and update the score
  score += 100;
  scoreText.setText("current score: " + score);

  if (score === 0) {
    extraText.setText("");
  }
  if (score === 1000) {
    extraText.setText("Level 1: passed");
  }
  if (score === 2000) {
    extraText.setText("Level 2: passed");

    var x =
      rabbitBig.x < 400
        ? Phaser.Math.Between(400, 800)
        : Phaser.Math.Between(0, 400);
  }
  if (score === 3000) {
    extraText.setText("Level 7: passed...You won!");

    this.physics.pause();

    byeBye = true;
    meadowThoughts.stop();
  }

  var x =
    rabbitBig.x < 400
      ? Phaser.Math.Between(400, 800)
      : Phaser.Math.Between(0, 400);
}

/*const wordInput = document.querySelector('#word-input').value;

function addScore (score) {
  if (wordInput === "hello") {
    score += 100;
  }
}

const levels = {
  level1: 1,
  level2: 2,
  level3: 3,
  level4: 4,
  level5: 5,
  level6: 6,
  level7: 7
};

const currentLevel = levels.level1;

let time = currentLevel;

const words = [
    'Of', 
    'Oh', 
    'At', 
    'Ok',
  'All', 
  'Has', 
  'Pop', 
  'Bee', 
  'Jam',
  'Bake', 
  'Word',	
  'List',
  'Four',
  'EAGLE', 
  'EVENS', 
  'EXTRA', 
  'ENURE', 
  'ENEMY',
  'babies',
  'fabric', 
  'habits',
  'nachos',
  'abandon', 
  'earache', 
  'pacific',
  'rabbits',
  'aardvark',
  'eardrops',
  'habitant',
  'quackery'
];
*/