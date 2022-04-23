/*  Students: Please use this week's project for Week 4: Assignment 5: First Phaser Game. 
     You will need to replace the contents of this JavaScript file with your own work, 
     and create any other files, if any, required for the assignment.
     When you are done, be certain to submit the assignment in Canvas to be graded. */

// credits to
// 1. jupiter tunes - https://opengameart.org/content/8-bit-jupiter-the-bringer-of-jollity-456
// 2. mini explosion - https://github.com/ansimuz/getting-started-with-phaser/blob/master/spritesheets.zip
// 3. astroid - https://opengameart.org/content/space-shooter-assets
// 4. blue diamond - https://opengameart.org/content/diamond
// 5. dark ground - https://opengameart.org/content/dark-ground
// 6. margery - https://opengameart.org/content/margery-limited
// 7. nasa pic - https://unsplash.com/photos/yZygONrUBe8
let scene1 = {
  key: 'scene1',
  active: true,
  preload: scene1Preload,
  create: scene1Create,
  update: scene1Update
};

// define scene 2 (actual game) configuration in its own variable
let scene2 = {
  key: 'scene2',
  active: false,
  preload: scene2Preload,
  create: scene2Create,
  update: scene2Update
};

let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: [scene1, scene2] // square brackets let us create a list/array of scenes for our game (1 only for now)
};

// create game instance
let game = new Phaser.Game(config);




let scene1image;
let sound1;


function scene1Preload() {
  // preload our image and audio file
  this.load.image('title', 'assets/PreGameImg.png');
  console.log('PreGame');
  // load audio asset files use this.load.audio()
  this.load.audio('music', 'assets/cute.mp3');
}

function scene1Create() {
  // make a image game object to show our bkgnd image
  scene1image =   this.add.image(0, 0, "title").setOrigin(0, 0);
  // make a sound audio object (not shown but heard when played)
  sound1 = this.sound.add('music');
  sound1.play(
    {
      volume: 0.2, // set to 50% of volume level
      loop: false // make audio play repeat over and over
    }
  );


  // credits to: https://codepen.io/samme/pen/XWbReRd
  this.input.keyboard.on(
      'keydown_C',
      function() {
        this.scene.switch('scene2');
    
      },
      this
    );


  
}


function scene1Update() {}

function scene1Transition() {

    this.scene.start('scene2');
}

var margarita;
let fluflujump;

var carrots;
var diamond2;
var bigdiamond;
var platforms;
var astroids;
var extraText;
var score = 0;
var scoreText;
let effect2;
var byeBye = false;

function scene2Preload() {
  this.load.audio("meadowThoughts", "assets/thatsItForToday.mp3");
  this.load.image("meadow", "meadow.jpg");
  this.load.image("carrot", "assets/carrot1.png");
  this.load.image("ground", "assets/platform.png");
  this.load.image("platform2", "assets/platform2.png");
  this.load.image("astroid", "assets/astroid.png");
  this.load.image("astroidBig", "assets/astroidBig.png");

  this.load.spritesheet("margarita", "assets/margarita.png", {
    frameWidth: 18,
    frameHeight: 26,
  });

  

  
}

function scene2Create() {
  sound1.stop();
  meadowThoughts = this.sound.add("meadowThoughts", { loop: false });
  this.add.image(0, 0, "meadow").setOrigin(0, 0);

  // var diamond2 = this.add.image(300, 100, 'diamond2');

  platforms = this.physics.add.staticGroup();

  platforms.create(640, 425, "ground").setScale(3).refreshBody();

  platforms.create(700, 100, "ground");
  platforms.create(50, 300, "ground");
  platforms.create(750, 220, "ground");

  astroids = this.physics.add.group();

  astroidBig = this.physics.add.group();
  bigdiamond = this.physics.add.group();

  margarita = this.physics.add.sprite(50, 350, "margarita");

  margarita.setBounce(0.2);
  margarita.setCollideWorldBounds(true);
  

  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("margarita", { start: 2, end: 4 }),
    frameRate: 7,
    repeat: -1,
  });

  this.anims.create({
    key: "turn",
    frames: [{ key: "margarita", frame: 7 }],
    frameRate: 10,
  });

  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("margarita", { start: 6, end: 8 }),
    frameRate: 7,
    repeat: -1,
  });
  cursors = this.input.keyboard.createCursorKeys();

  carrots = this.physics.add.group({
    key: "carrot",
    repeat: 7,
    setXY: { x: 12, y: 0, stepX: 80 },
  });

  

  carrots.children.iterate(function (child) {
    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
  });
  this.tweens.add({
    targets: carrots.getChildren(), // get an array containing each brick sprite inside of the bricks group
    duration: 100, // duration and most time values in phaser are in milliseconds (1000ths of a second)
    repeat: 2, // repeat of -1 means forever
    ease: "Stepped",
    easeParams: [10],
    delay: 1000,
  });
  var platform2 = this.physics.add.image(300, 100, "platform2");

  platform2.body.allowGravity = false;
  platform2.body.immovable = true;
  platform2.body.moves = false;
  platform2.setVelocityY(50);
  this.tweens.add({
    targets: platform2,
    y: 200,
    duration: 2000,
    ease: "Sine.easeInOut",
    repeat: -1,
    yoyo: true,
  });
  this.physics.add.collider(margarita, platform2);
  this.physics.add.collider(astroids, platform2);

 
  this.physics.add.collider(astroidBig, platform2);
  this.physics.add.collider(carrots, platform2);
  scoreText = this.add.text(15, 15, "current score: 0", {
    fontFamily: 'Balsamiq Sans',

      color: '#a579d4',
    fontSize: "32px",
   
  });
  extraText = this.add.text(15, 45, "Welcome to Type Away", {
    fontFamily: 'Balsamiq Sans',

      color: '#a579d4',
    fontSize: "32px",
  });
  
  this.physics.add.collider(margarita, platforms);

  this.physics.add.collider(carrots, platforms);

  this.physics.add.collider(astroidBig, platforms);

  this.physics.add.collider(margarita, astroidBig, hitastroidBig, null, this);

  this.physics.add.overlap(margarita, carrots, collectcarrot, null, this);
  this.physics.add.collider(astroids, platforms);

  //  Checks to see if the margarita overlaps with any of the carrots, if she does call the collectcarrot function
  this.physics.add.overlap(margarita, carrots, collectcarrot, null, this);
  this.physics.add.overlap(margarita, bigdiamond, collectcarrot, null, this);

  this.physics.add.collider(margarita, astroids, hitastroid, null, this);



  



  this.anims.create({
    key: "explode",
    frames: this.anims.generateFrameNumbers("explosion"),
    frameRate: 20,
    repeat: 0,
    hideOnComplete: true,
  });

  /*// 3. use the collection of frames to define an animation sequence
        this.anims.create(
          {
            key: 'jumpinganimation', 
            // name for this animation sequence (use this to play it later on)
            frames: myframes,
            // points to the collection of frames we made in step 2
            frameRate: 5, // speed of playback
            repeat: -1, // repeat set to -1 means repeat forever
            yoyo: false // yoyo set to true causes the loop to go fwd>backward>fwd>backward
          }
        );
        
        // 4. ask phaser's AnimationManager to play the animation sequence for our game object
        //fluflujump.anims.play('jumpinganimation'); // use key name from step 3
      */

  // 3. use the collection of frames to define an animation sequence
 
  // 4. ask phaser's AnimationManager to play the animation sequence for our game object
 // use key name from step 3
  meadowThoughts.play();

 // this.time.addEvent({
   //     delay: 3000000,
   //     loop: false,
  //      callback: () => {
  //          this.scene.start("scene2");
  //      }
  //  })
}

function scene2Update() {
  cursors = this.input.keyboard.createCursorKeys();
  if (byeBye) {
    return;
  }
  if (cursors.left.isDown) {
    margarita.setVelocityX(-200);

    margarita.anims.play("left", true);
  } else if (cursors.right.isDown) {
    margarita.setVelocityX(200);

    margarita.anims.play("right", true);
  } else {
    margarita.setVelocityX(0);

    margarita.anims.play("turn");
  }

  if (cursors.up.isDown && margarita.body.touching.down) {
    margarita.setVelocityY(-400);
  }
}

function collectBigDiamond(margarita, bigdiamond) {
  bigdiamond.disableBody(true, true);
}
function collectcarrot(margarita, carrots) {
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
      margarita.x < 400
        ? Phaser.Math.Between(400, 800)
        : Phaser.Math.Between(0, 400);

 
  }
  if (score === 3000) {
    extraText.setText("Level 7: passed...You won!");

    this.physics.pause();

    byeBye = true;
    meadowThoughts.stop();
  };



    var x =
      margarita.x < 400
        ? Phaser.Math.Between(400, 800)
        : Phaser.Math.Between(0, 400);

    var astroid = astroids.create(x, 14, "astroid");
    astroid.setBounce(1);
    astroid.setCollideWorldBounds(true);
    astroid.setVelocity(Phaser.Math.Between(-200, 200), 20);
    astroid.allowGravity = false;
  
}

function hitastroid(margarita, astroid) {
  this.physics.pause();

  margarita.setTint(0xff0000);

  margarita.anims.play("turn");
  extraText.setText("You lost...sorry :(");

  byeBye = true;
  meadowThoughts.stop();
}

function hitastroidBig(margarita, astroidBig) {
  this.physics.pause();
  margarita.setTint(0xff0000);
  margarita.anims.play("dead");
  extraText.setText("You lost...sorry :(");
  byeBye = true;
  meadowThoughts.stop();
}

/*
function scene2Transition() {
  effect2.play(
    {
      volume:0.8,
      loop: false
    }
  );
  this.scene.start('scene1');
}*/

