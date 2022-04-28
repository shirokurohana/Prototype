// 1) credits to Professor
// 2) credits for images/meadow.jpg: https://opengameart.org/content/meadow-background
// 3) credits for sounds/cute.mp3 to migfus20: https://opengameart.org/content/cute-intro-music 
// 4) credits for sounds/thatsItFortoday.mp3 - unable to find for now
// 5) credits for sprites/rabbitBig.png: https://opengameart.org/content/mascot-bunny-character
// 6) credits for sprites/carrot1.png: https://opengameart.org/content/mascot-bunny-character
// 7) credits for sprites/platform.png: https://opengameart.org/content/dark-ground

// define scene 1
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
// set up configuration for the game
var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
   pixelArt: true,
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
    scene: [scene1, scene2],
};

// variables for scene 1
let scene1image;
let sound1;

// scene 1 preload
function scene1Preload() {
  // preload our image and audio file
  this.load.image("title", "assets/images/PreGameImg.png");
  console.log("PreGame");
  // load audio asset files use this.load.audio()
  this.load.audio("music", "assets/sounds/cute.mp3");

}

// scene 1 create
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
        delay: 1000,
        loop: false,
        callback: () => {
            this.scene.start("scene2");
        }
    })
}

// scene 1 update
function scene1Update() {}

// scene 1 transition
function scene1Transition() {
  this.scene.start("scene2");
}
// start new game
var game = new Phaser.Game(config);
// variables for scene 2
var score = 0;
var platforms;
// scene 2 preload
function scene2Preload() {

    this.load.html('nameform', 'assets/html/nameform.html');
  this.load.spritesheet("rabbitBig", "assets/sprites/rabbitBig.png", {
    frameWidth: 78,
    frameHeight: 52,
  });
  this.load.audio("meadowThoughts", "assets/sounds/thatsItForToday.mp3");
  this.load.image("meadow", "assets/images/meadow.jpg");
  this.load.image("ground", "assets/platform.png");
  this.load.image("carrot", "assets/sprites/carrot1.png");

  
}
// scene 2 create
function scene2Create() 
{
sound1.stop();

  // credits to jjcapellan: https://phaser.discourse.group/t/countdown-timer/2471/4
   console.log('create timer');
    // 2:30 in seconds
    this.initialTime = 60;

    // Each 1000 ms call onEvent
    timedEvent = this.time.addEvent({ delay: 1000, callback: onEvent, callbackScope: this, loop: true });
  platforms = this.physics.add.staticGroup();

  platforms.create(640, 570, "ground").setScale(3).refreshBody();
  
  meadowThoughts = this.sound.add("meadowThoughts", { loop: true });
  this.add.image(0, 0, "meadow").setOrigin(0, 0);
  scoreText = this.add.text(415, 15, "score: 0", {
    fontFamily: "Balsamiq Sans",

    color: "#a579d4",
    fontSize: "32px",
  });
  welcomeText = this.add.text(15, 15, "Type Away", {
    fontFamily: "Balsamiq Sans",

    color: "#a579d4",
    fontSize: "32px",
  });

    timeText = this.add.text(615, 15, "timer: " + formatTime(this.initialTime), {
    fontFamily: "Balsamiq Sans",

    color: "#a579d4",
    fontSize: "32px",
  });

   timedEvent = this.time.addEvent({ delay: 1000, callback: onEvent, callbackScope: this, loop: true });

   
rabbitBig = this.physics.add.sprite(50, 250, "rabbitBig");
  

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
  carrots = this.physics.add.sprite(150, 350, "carrot");
   
   carrots.setCollideWorldBounds(true);
    this.physics.add.collider(rabbitBig, platforms);

  this.physics.add.collider(carrots, platforms);
    // credits to Phaser: https://labs.phaser.io/edit.html?src=src%5Cgame%20objects%5Cdom%20element%5Cinput%20test.js
    var text = this.add.text(300, 500, 'Please type: rabbit', { color: 'white', fontSize: '20px ', fontFamily: "Balsamiq Sans"});
  
    var element = this.add.dom(400, 577).createFromCache('nameform');

    element.addListener('click');

    element.on('click', function (event) {

        if (event.target.name === 'playButton')
        {
            var inputText = this.getChildByName('nameField');

            //  Have they entered anything?
            if (inputText.value === "rabbit")
            {
                //  Turn off the click events
                this.removeListener('click');

                this.value = "";
              
                //  Hide the login element
                this.setVisible(true);

                //  Populate the text with whatever they typed in
                //text.setText('Welcome ' + inputText.value);
              //Move rabbit
              rabbitBig.body.x += 77;
        rabbitBig.x += 77;
        rabbitBig.body.setVelocity(0, 48);
            }
            else 
            {
              if (initialTime === 0) {
              welcomeText.setText("GAME OVER!");
              }
              
                        }
        }

    });
  meadowThoughts.play();
  //  Checks to see if the rabbitBig overlaps with any of the carrots, if she does call the collectcarrot function
  this.physics.add.overlap(rabbitBig, carrots, collectcarrot, null, this);

}

function scene2Update() {

}

function collectcarrot(rabbitBig, carrots) {
  carrots.disableBody(true, true);

  //  Add and update the score
  score += 100;
  scoreText.setText("score: " + score);

  if (score === 0) {
    welcomeText.setText("");
  }
  if (score === 100) {
    welcomeText.setText("Level 1: passed");
  }
  if (score === 200) {
    welcomeText.setText("Level 2: passed");

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
// credits to: https://phaser.discourse.group/t/countdown-timer/2471/4

// credits to jjcapellan: https://phaser.discourse.group/t/countdown-timer/2471/4
// formatTime function to format the way the time looks
function formatTime(seconds){
    // Minutes
    var minutes = Math.floor(seconds/60);
    // Seconds
    var partInSeconds = seconds%60;
    // Adds left zeros to seconds
    partInSeconds = partInSeconds.toString().padStart(2,'0');
    // Returns formated time
    return `${minutes}:${partInSeconds}`;
}

// credits to jjcapellan: https://phaser.discourse.group/t/countdown-timer/2471/4
// onEvent function
function onEvent ()
{
    this.initialTime -= 1; // One second
    timeText.setText('timer: ' + formatTime(this.initialTime));
   if (this.initialTime < 0) {
     timeText.setText('GAME OVER');
   }
}