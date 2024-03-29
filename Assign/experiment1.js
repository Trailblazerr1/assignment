/* Global Variables */
/* the developer should define variables and constants here */
/* We define a room with 3 walls, floor and ceiling */
/* We define a ball which bounces in the xy plane */
/* We define modifiable prameters : gravity, ball size, initial velocity */
/* We support draggable ball */
/* Scene Dimensions (in meters: at z = 0) */
var mySceneTLX;        /* Top Left corner X coordinate */
var mySceneTLY;        /* Top Left corner Y coordinate */
var mySceneBRX;        /* Bottom Right corner X coordinate */
var mySceneBRY;        /* Bottom Right corner Y coordinate */
var mySceneW;          /* Scene Width */
var mySceneH;          /* Scene Height */
var myCenterX;         /* Scene Center X coordinate */
var myCenterY;         /* Scene Center Y coordinate */

/* Room Variables */
var leftB;              /* Left Barrier */
var rightB;             /* Right Barrier */
var bottomB;            /* Bottom Barrier */
var topB;               /* Top Barrier */
var backB=-4.0;         /* Back Barrier */
var wallThickness;      /* Wall Thickness */

/* Room Objects */
var myJug;            /* Floor */
var myCeiling;          /* Ceiling */
var myBack;             /* Back */
var myFlow;            /* Right */
var myballoon;             /* Left */
var myFlowOther;
var myNewLevel;
var tap;
var tap1;
var tap2;
var tap3;
/* Ball variables */

var mylevel;             /* Ball Object */
var myBallRadius;       /* Radius */
var myBallX;            /* X Position */
var myBallY;            /* Y Position */
var myBallVX;           /* X Velocity */
var myBallVY;           /* Y Velocity */
var myBallAX;           /* X Acceleration */
var myBallAY;           /* Y Acceleration */
var myBallZ;            /* Z Position for placing ball */

/* Parameters, Variables */
var gravityX;           /* X component of Gravity in m/S2 */
var gravityY;           /* Y component of Gravity in m/S2 */

var meshh;

/******************* Interaction functions ***********************/

/**
 * This function implements custom dragging of the ball.
 * <p>
 * It ensures that the ball is not dragged beyond the permissible boundaries.
 * In other applications you can move more than one element as well.
 * <p>
 * @param element    Pointer to ball object
 * @param newpos     New 3D position (THREE.Vector3)
 */
function myBallDrag(element, newpos)
{
    myBallX = newpos.x;
    if (newpos.x < (leftB + myBallRadius)) { myBallX = (leftB + myBallRadius) }
    else if (newpos.x > (rightB - myBallRadius)) { myBallX = (rightB - myBallRadius) }
    myBallY = newpos.y;
    if (newpos.y < (bottomB + myBallRadius)) { myBallY = (bottomB + myBallRadius); }
    else if (newpos.y > (topB - myBallRadius)) { myBallY = (topB  - myBallRadius); }
    myBallZ = newpos.z;

    myBall.position.set(myBallX, myBallY, myBallZ);
}

/******************* End of Interaction functions ***********************/

/******************* GUI control objects code ***********************/
var PosX;           /* X Position Slider Label */
var PosY;           /* Y Position Slider Label */
var VelX;           /* X Velocity Slider Label */
var VelY;           /* Y Velocity Slider Label */
var AccY;           /* Y Acceleration Slider Label */
var Xdefault;       /* X Position Slider Default Value */
var Ydefault;       /* Y Position Slider Default Value */
var VXdefault;      /* X Velocity Slider Default Value */
var VYdefault;      /* Y Velocity Slider Default Value */
var AYdefault;      /* Y Acceleration Slider Default Value */
var Xmin;           /* X Position Slider Minimum Value */
var Xmax;           /* X Position Slider Maximum Value */
var Ymin;           /* Y Position Slider Minimum Value */
var Ymax;           /* Y Position Slider Maximum Value */
var VXmin;          /* X Velocity Slider Minimum Value */
var VXmax;          /* X Velocity Slider Maximum Value */
var VYmin;          /* Y Velocity Slider Minimum Value */
var VYmax;          /* Y Velocity Slider Maximum Value */
var AYmin;          /* Y Acceleration Slider Minimum Value */
var AYmax;          /* Y Acceleration Slider Maximum Value */
var Xstep;          /* X Position Slider Step */
var Ystep;          /* Y Position Slider Step */
var VXstep;         /* X Velocity Slider Step */
var VYstep;         /* Y Velocity Slider Step */
var AYstep;         /* Y Acceleration Slider Step */
var radius;
var rectWidth;
var count;
var scaleSphereX;
var scaleSphereY;
/*
 * This function handles the X position slider change
 * <p>
 * Updates the myBall position variable.
 * Effect is felt immediately.
 * <p>
 * @param newValue       New Value of the slider
 */
function handleX(newValue)
{
    myBallX = newValue;
    myBall.position.set(myBallX, myBallY, myBallZ);
    PIErender();
}

/*
 * This function handles the Y position slider change
 * <p>
 * Updates the myBall position variable.
 * Effect is felt immediately.
 * <p>
 * @param newValue       New Value of the slider
 */
function handleY(newValue)
{
    myBallY = newValue;
    myBall.position.set(myBallX, myBallY, myBallZ);
    PIErender();
}

/*
 * This function handles the X Velocity slider change
 * <p>
 * Updates the myBall velocity variable.
 * Effect is felt from the next animation frame.
 * <p>
 * @param newValue       New Value of the slider
 */
function handleVX(newValue)
{
    myBallVX = newValue;
}

/*
 * This function handles the Y Velocity slider change
 * <p>
 * Updates the myBall velocity variable.
 * Effect is felt from the next animation frame.
 * <p>
 * @param newValue       New Value of the slider
 */
function handleVY(newValue)
{
    myBallVY = newValue;
}

/*
 * This function handles the Y acceleration (gravity) slider change
 * <p>
 * Updates the myBall acceleration variable.
 * Effect is felt from the next animation frame.
 * <p>
 * @param newValue       New Value of the slider
 */
function handleAY(newValue)
{
    myBallAY = newValue;
}

function initialiseControlVariables()
{
    /* Labels */
    PosX="X";                  /* X Position Slider Label */
    PosY="Y";                  /* Y Position Slider Label */
    VelX="VX";                 /* X Velocity Slider Label */
    VelY="VY";                 /* Y Velocity Slider Label */
    AccY="AY";                 /* Y Acceleration Slider Label */

    /* Default (initial) Values */
    Xdefault=myCenterX;        /* X Position Slider Default Value */
    Ydefault=myCenterY;        /* Y Position Slider Default Value */
    VXdefault=0.1;             /* X Velocity Slider Default Value */
    VYdefault=0.1;             /* Y Velocity Slider Default Value */
    AYdefault=-2;            /* Y Acceleration Slider Default Value */

    /* Slider Limits */
    Xmin=leftB+myBallRadius;   /* X Position Slider Minimum Value */
    Xmax=rightB-myBallRadius;  /* X Position Slider Maximum Value */
    Ymin=2.7; /* Y Position Slider Minimum Value */
    Ymax=2.2;    /* Y Position Slider Maximum Value */
    VXmin=-1.0;                /* X Velocity Slider Minimum Value */
    VXmax= 1.0;                /* X Velocity Slider Maximum Value */
    VYmin=-1.0;                /* Y Velocity Slider Minimum Value */
    VYmax= 1.0;                /* Y Velocity Slider Maximum Value */
    AYmin=-15.0;               /* Y Acceleration Slider Maximum Value */
    AYmax= 0.0;                /* Y Acceleration Slider Minimum Value */

    /* Slider Steps */
    Xstep=0.1;                 /* X Position Slider Step */
    Ystep=0.1;                  /* Y Position Slider Step */
    VXstep=0.1;                 /* X Velocity Slider Step */
    VYstep=0.1;                 /* Y Velocity Slider Step */
    AYstep=-0.1;               /* Y Acceleration Slider Step */
    radius=0.09;
    rectWidth = 0.046;
    count=3;
    scaleSphereX=0.3;
    scaleSphereY=0.3;
}


function initialiseControls()
{
    initialiseControlVariables();
    /* Create Input Panel */
    PIEaddInputSlider(PosX, Xdefault, handleX, Xmin, Xmax, Xstep);
    PIEaddInputSlider(PosY, Ydefault, handleY, Ymin, Ymax, Ystep);
    PIEaddInputSlider(VelX, VXdefault, handleVX, VXmin, VXmax, VXstep);
    PIEaddInputSlider(VelY, VYdefault, handleVY, VYmin, VYmax, VYstep);
    PIEaddInputSlider(AccY, AYdefault, handleAY, AYmin, AYmax, AYstep);
    /* Create Display Panel */
    PIEaddDisplayText(PosX, Xdefault);
    PIEaddDisplayText(PosY, Ydefault);
    PIEaddDisplayText(VelX, VXdefault);
    PIEaddDisplayText(VelY, VYdefault);
    PIEaddDisplayText(AccY, AYdefault);
}


/******************* End of GUI control objects code ***********************/

/******************* Load Experiment objects code ***********************/

var helpContent;
function initialiseHelp()
{
    helpContent="";
    helpContent = helpContent + "<h2>Bouncing Ball experiment help</h2>";
    helpContent = helpContent + "<h3>About the experiment</h3>";
    helpContent = helpContent + "<p>The experiment shws a bouncing ball constrained by left, right, top and bottom walls.</p>";
    helpContent = helpContent + "<h3>Animation control</h3>";
    helpContent = helpContent + "<p>The top line has animation controls. There are two states of the experiment.</p>";
    helpContent = helpContent + "<h3>The setup stage</h3>";
    helpContent = helpContent + "<p>The initial state is setup stage. In this stage, you can see a control window at the right. You have access to five sliders.</p>";
    helpContent = helpContent + "<p>You can control the following:</p>";
    helpContent = helpContent + "<ul>";
    helpContent = helpContent + "<li>X&nbsp;&nbsp;:&nbsp;Controls the X position of the ball.</li>";
    helpContent = helpContent + "<li>Y&nbsp;&nbsp;:&nbsp;Controls the Y position of the ball.</li>";
    helpContent = helpContent + "<li>VX&nbsp;:&nbsp;Controls the X velocity of the ball.</li>";
    helpContent = helpContent + "<li>VY&nbsp;:&nbsp;Controls the Y velocity of the ball.</li>";
    helpContent = helpContent + "<li>AY&nbsp;:&nbsp;Controls the Y acceleration of the ball.</li>";
    helpContent = helpContent + "</ul>";
    helpContent = helpContent + "<p>You also have an additional text input to control the coefficient of restitution of the bottom floor.</p>";
    helpContent = helpContent + "<p>Once you setup the experiment, you can enter the animation stage by clicking the start button</p>";
    helpContent = helpContent + "<h3>The animation stage</h3>";
    helpContent = helpContent + "<p>In the animation stage, the ball will bounce around obeyng the laws of physics.</p>";
    helpContent = helpContent + "<p>The right hand panel now shows the values of the four experiment variables during animation.</p>";
    helpContent = helpContent + "<ul>";
    helpContent = helpContent + "<li>X&nbsp;&nbsp;:&nbsp;Shows the X position of the ball.</li>";
    helpContent = helpContent + "<li>Y&nbsp;&nbsp;:&nbsp;Shows the Y position of the ball.</li>";
    helpContent = helpContent + "<li>VX&nbsp;:&nbsp;Shows the X velocity of the ball.</li>";
    helpContent = helpContent + "<li>VY&nbsp;:&nbsp;Shows the Y velocity of the ball.</li>";
    helpContent = helpContent + "</ul>";
    helpContent = helpContent + "<p>In addition you will also see two sliders showing potential and kinetic energy.</p>";
    helpContent = helpContent + "<p>You can pause and resume the animation by using the pause/play nutton on the top line</p>";
    helpContent = helpContent + "<p>You can slow down and speed up the animaion by uing the speed control buttons</p>";
    helpContent = helpContent + "<h3>The drag and drop</h3>";
    helpContent = helpContent + "<p>You can also position the ball by dragging and dropping it. You can only do this in the setup stage. This has been prevented in the animation stage.</p>";
    helpContent = helpContent + "<h2>Happy Experimenting</h2>";
    PIEupdateHelp(helpContent);
}

var infoContent;
function initialiseInfo()
{
    infoContent =  "";
    infoContent = infoContent + "<h2>Bouncing Ball experiment concepts</h2>";
    infoContent = infoContent + "<h3>About the experiment</h3>";
    infoContent = infoContent + "<p>The experiment shws a bouncing ball constrained by left, right, top and bottom walls.</p>";
    infoContent = infoContent + "<h3>Collision</h3>";
    infoContent = infoContent + "<p>When an object collides with a surface, the direction of velocity normal to the surface is reversed.</p>";
    infoContent = infoContent + "<p>At the time of impact, the ball is deformed because of the force of the wall. This deformation can be easily observed with a sponge ball. If you drop a ball of dough on the floor, it does not bounce, it is only deformed.</p>";
    infoContent = infoContent + "<p>The harder balls are also deformed. But because of the hard nature of the meterial, the hard ball tries to regain it's shape. This attempt to reain the shape reverses the velocity by pushing aainst the wall.</p>";
    infoContent = infoContent + "<p>When the ball collides with the left or the right wall, the velocity in the X direction reverses while the velocity in the Y direction reamains the same.</p>";
    infoContent = infoContent + "<p>When the ball collides with the top or the bottom wall, the velocity in the Y direction reverses while the velocity in the Y direction reamains the same.</p>";
    infoContent = infoContent + "<h3>The coefficient of restitution</h3>";
    infoContent = infoContent + "<p>When the velocity reverses direction, it is not necessary that it's magnitude remains the same.</p>";
    infoContent = infoContent + "<p>The ball may not retain it's original shape and texture. The cricket ball loses it's shine.</p>";
    infoContent = infoContent + "<p>Some of the energy is lost because of the deformation of the ball. The energy loss means that the kinetic energy of the ball will be reduced after impact.</p>";
    infoContent = infoContent + "<p>The coefficient of restitution specifies how much of the velocity will be retained after impact.</p>";
    infoContent = infoContent + "<p>The coefficient of restitution does not affect te velocity in the direction parallel to the impact.</p>";
    infoContent = infoContent + "<p>When the ball collides with the left or the right wall, the magnitude of the velocity in the X direction will reduce as per the coefficient of restitution. The magnitude and sign in Y direction remains the same.</p>";
    infoContent = infoContent + "<p>When the ball collides with the top or the bottom wall, the magnitude of the velocity in the Y direction will reduce as per the coefficient of restitution. The magnitude and sign in X direction remains the same.</p>";
    infoContent = infoContent + "<h2>Happy Experimenting</h2>";
    PIEupdateInfo(infoContent);
}

function initialiseScene()
{
    /* Initialise Scene Variables */
    mySceneTLX = 0.0;
    mySceneTLY = 3.0;
    mySceneBRX = 4.0;
    mySceneBRY = 0.0;
    mySceneW   = (mySceneBRX - mySceneTLX);
    mySceneH   = (mySceneTLY - mySceneBRY);
    myCenterX  = (mySceneTLX + mySceneBRX) / 2.0;
    myCenterY  = (mySceneTLY + mySceneBRY) / 2.0;
    myBallZ    = -2.0;
    radius     = 0.09;
    rectWidth  = 0.046;
    count      = 3;
    scaleSphereX=0.3;
    scaleSphereY=0.3;
}

function initialiseOtherVariables()
{
    /* Initialise variables */
    myBallRadius = mySceneW/30.0;
    wallThickness = 0.20;

    /* Gravity */
    gravityX = 0.0;
    gravityY = -0.02;

    /* Barriers */
    leftB=mySceneTLX;
    rightB=mySceneBRX;
    bottomB=0.53;
    topB=mySceneTLY;
    topBb=1.0;
}

/**
 * This function creates the scene of the experiment.
 * It is called by the library during document load. 
 * It is recommended that you do not initialise any variables globally.
 * It is recommended that this function create all the elements first.
 * It should then call a reset function to initialise values.
 * This will allow a reset exepriment functionality to be implemented.
 * <p>
 * It is recommended that the developer first draw a sketch of the experiment on a piece of paper.
 * The sketch should specify the size and initial position of all the elements that comprise the experiment.
 * <p>
 * Once the sketch is ready, the developer should instantiate the elements at the intial location.
 * <p>
 * The (x,y) position of the camera would be set to the center of area of interest.
 * The z position of the camera would be such that the field of vision would cover the height.
 * The aspect ratio of the camera whould cover the width.
 * <p>
 * Two lights would be suitably positioned to light the area of interest.
 * <p>
 * The developer can position the camera and lights if he so chooses.
 * <p>
 * The camera would adjust and cover a wider and taller area depending on the dimensions of the display.
 * hence the background (if any) shoudl extend beyond the area of interest.
 * <p>
 * Finally the developer should call the function PIEsetAreaOfInterest(tlx, tly, brx, bry).
 * The parameters are the top left corner and bottom right corner coordinates.
 * The X axis goes from lef to right of te display and the y axis goes from bottom to up.
 * The area of interst should be wide and tall enough to cover all potential movements.
 * <p>
 * The developer should have a fairly good idea of the controls forthe experiment.
 * Once the scene is setup and is visible, the developer can include the controls and
 * the callback functions needed to update the experiment parameters.
 * The PIE library provides a set of functions to implement common controls.
 * <p>
 * The developer should code and assign proper event handlers to the elements (to control animation).
 */
function loadExperimentElements()
{
var geometry;
var material;
var loader;
var texture;

    PIEsetExperimentTitle("Experiment Name");
    PIEsetDeveloperName("Wayne");
    PIEhideControlElement();

    /* initialise help and info content */
    initialiseHelp();
    initialiseInfo();

    /* initialise Scene */
    initialiseScene();

    /* initialise Other Variables */
    initialiseOtherVariables();

//Add jug

    material = new THREE.LineBasicMaterial({    color: 0x000000,
        linewidth: 1,
        linecap: 'round', //ignored by WebGLRenderer
        linejoin:  'round' //ignored by WebGLRenderer
    });
    geometry = new THREE.Geometry();
    geometry.vertices.push(
        new THREE.Vector3( 5, 3, -8.2),
        new THREE.Vector3( 5, 1, -8.2),
        new THREE.Vector3( 8, 1, -8.2 ),
        new THREE.Vector3( 8, 1.5, -8.2),
        new THREE.Vector3( 8.3, 1.5, -8.2),
        new THREE.Vector3( 8.3, 1.7, -8.2),
        new THREE.Vector3( 8, 1.7, -8.2),
        new THREE.Vector3( 8, 3, -8.2 )
    );
    myJug = new THREE.Line(geometry, material);
    myJug.scale.set( 0.3, 0.3, 0.3 );
    PIEaddElement(myJug);

//Add level


    x = y = 0.0;
    var fishShape = new THREE.Shape();
    fishShape.moveTo(x,y);
    fishShape.quadraticCurveTo(x + 5, y+1 , x + 11, y);
    geometry = new THREE.ShapeGeometry( fishShape );
    material = new THREE.MeshBasicMaterial( { color: 0xffffff, overdraw: 0.5 } );
    mylevel = new THREE.Mesh( geometry, material );
    mylevel.position.set(1.4, 1.0 , 0.0 );
    mylevel.scale.set( 0.05, 0.05, 0.05 );
    mylevel.receiveShadow = true;
//    PIEaddElement(mylevel);

//Add sphere
    
        // geometry = new THREE.SphereGeometry( radius, 32, 32 );
        // material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
        // myballoon = new THREE.Mesh( geometry, material );
        // myballoon.position.set( 2.39, 0.82, 0.2);
        // myballoon.position.needsUpdate = true;
        // myballoon.geometry.dynamic = true;
        // myballoon.scale.set( 0.8, 0.8, 0.8 );
        // PIEaddElement(myballoon);
    x = y = 0;
    var fishShape = new THREE.Shape();
    fishShape.moveTo(0.75,0.25);
    fishShape.quadraticCurveTo(x + 0.4, y+0.25 , x + 0.25, y+0.625);
    fishShape.quadraticCurveTo(x + 0.35, y+1 , x + 0.6, 1);
    fishShape.quadraticCurveTo(x + 0.6, y+1 ,x+0.65 , y+1 );
    fishShape.quadraticCurveTo(x + 1.25, y+1 ,x+1.25 , y+0.625 );
    fishShape.quadraticCurveTo(x + 1.25, y+0.25 , x+0.75 , y+0.25);
    geometry = new THREE.ShapeGeometry( fishShape );
    geometry.dynamic = true;
    geometry.__dirtyPosition = true;
    material = new THREE.MeshBasicMaterial( { color: 0xd7608d, overdraw: 0.5 } );
    myballoon = new THREE.Mesh( geometry, material );
    myballoon.position.set( 2.20, 0.615, 0.2);
    // myballoon.position.needsUpdate = true;
    // myballoon.geometry.dynamic = true;
    myballoon.scale.set( scaleSphereX, scaleSphereY, scaleSphereX );
    PIEaddElement(myballoon);

    /* Allow Dragging of the ball */
        //    PIEdragElement(myBall);
        //    PIEsetDrag(myBall, myBallDrag);


//Water flow1
    SUBDIVISIONS = 100;
    geometry = new THREE.Geometry();
    curve = new THREE.QuadraticBezierCurve3();
    curve.v0 = new THREE.Vector3(0.55, 0.0, 0);
    curve.v1 = new THREE.Vector3(0.55, 1.1, 0);
    curve.v2 = new THREE.Vector3(0.55, 1.3, 0);
    for (j = 0; j < SUBDIVISIONS; j++) {
       geometry.vertices.push( curve.getPoint(j / SUBDIVISIONS) )
    }

    material = new THREE.LineBasicMaterial( { color:0x03A9F4, linewidth: 405 } );
    myFlow = new THREE.Line(geometry, material);
    myFlow.position.set( 1.38, 0.80, 0.0);
    myFlow.scale.set( 1, 1, 1 );
    PIEaddElement(myFlow);


// new level
        var rectLength = 0.207;
        var rectShape = new THREE.Shape();
        rectShape.moveTo( 0,0 );
        rectShape.lineTo( 0, rectWidth );
        rectShape.lineTo( rectLength, rectWidth );
        rectShape.lineTo( rectLength, 0 );
        rectShape.lineTo( 0, 0 );
        geometry = new THREE.ShapeGeometry( rectShape );
        geometry.dynamic = true;
        geometry.__dirtyPosition = true;
        material = new THREE.MeshBasicMaterial( { color: 0x03A9F4, overdraw: 0.5 } );
        myFlowOther = new THREE.Mesh( geometry, material );
        myFlowOther.position.set( 1.655, 0.665 , 0.0 );
        myFlowOther.scale.set( 3, count, 3 );
        PIEaddElement(myFlowOther);
        console.log(myFlowOther.position.y);

//tap
var cylindergeometry = new THREE.CylinderGeometry(0.1, 0.1, 2);
var cylindermaterial = new THREE.MeshLambertMaterial({wireframe: false, color: 0xc0c0c0});
tap = new THREE.Mesh(cylindergeometry, cylindermaterial);
    PIEaddElement(tap);
    tap.position.set( 1.63, 2.1 , 0.0 );
    tap.scale.set( 0.3, 0.3, 0.3 );
    //tap.rotation.set(-Math.PI/2, Math.PI/2000, Math.PI); 
    tap.rotation.z = Math.PI / 2;

var cylindergeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.5);
var cylindermaterial = new THREE.MeshLambertMaterial({wireframe: false, color: 0xc0c0c0});
tap1 = new THREE.Mesh(cylindergeometry, cylindermaterial);
    PIEaddElement(tap1);
    tap1.position.set( 1.77, 2.19 , 0.0 );
    tap1.scale.set( 0.3, 0.3, 0.3 );

var cylindergeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.5);
var cylindermaterial = new THREE.MeshLambertMaterial({wireframe: false, color: 0xc0c0c0});
tap2 = new THREE.Mesh(cylindergeometry, cylindermaterial);
    PIEaddElement(tap2);
    tap2.position.set( 1.77, 2.27 , 0.0 );
    tap2.scale.set( 0.3, 0.3, 0.3 );
    tap2.rotation.z = Math.PI / 2;

var cylindergeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.3);
var cylindermaterial = new THREE.MeshLambertMaterial({wireframe: false, color: 0xc0c0c0});
tap3 = new THREE.Mesh(cylindergeometry, cylindermaterial);
    PIEaddElement(tap3);
    tap3.position.set( 1.92, 2.078 , 0.0 );
    tap3.scale.set( 0.3, 0.3, 0.3 );

//back
    //  loader = new THREE.TextureLoader();
    // texture = loader.load( 'images/brick_bump.jpg' );
    //  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    //  texture.repeat.set( 25, 25 );
    //  texture.anisotropy = 16;
    // material = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0x111111, map: texture } );
    // geometry = new THREE.PlaneBufferGeometry( mySceneW * 2, backB * 2 );

    geometry = new THREE.BoxGeometry( mySceneW * 2, mySceneH * 2, wallThickness );
    material = new THREE.MeshLambertMaterial( {color: 0xffee58} );
    myBack = new THREE.Mesh( geometry, material );
    myBack.position.set(myCenterX, myCenterY, backB - (wallThickness / 2));
    myBack.receiveShadow = true;
    PIEaddElement(myBack);

    /* Instantiate experiment controls */
    initialiseControls();

    /* Reset all positions */
    resetExperiment();

    PIEsetAreaOfInterest(mySceneTLX, mySceneTLY, mySceneBRX, mySceneBRY);
}

/******************* End of Load Experiment objects code ***********************/

/******************* Reset Experiment code ***********************/

/**
 * This function resets the position of all experiment elements to their default values.
 * <p>
 * This is called during initial document load.
 * This is also be called by the system provided reset button.
 * <p>
 * Apart from the position, this should also reset all variables which can be controlled by the user.
 * This function will also clear any output variables/graphs
 */
function resetExperiment()
{
    /* initialise Other Variables */
    initialiseOtherVariables();

    /* Initialise Ball variables */
    myBallX      = myCenterX;
    myBallY      = myCenterY;
    myBallVX     = 0.0;
    myBallVY     = 0.0;
    myBallAX     = gravityX;
    myBallAY     = gravityY;

    /* Reset Ball position */
//meshh.position.set(6,1,-8.2);
    /* Reset Wall position */
    /* Floor */

    mylevel.position.set(1.7, 1.1 , 0.0);
//    console.log(myCenterX, bottomB - (wallThickness / 2), 0.0);
    /* Ceiling */
    //sph.position.set(1.7, 1.1,0.0);

//    myCeiling.position.set(myCenterX, topB+(wallThickness/2), 0.0);
    /* Left */
 //   myballoon.position.set(1.5, 1.1, 0.0 );
    /* Right */
 //   myFlow.position.set(rightB+(wallThickness/2), myCenterY, 0.0);
    /* Back */
    myBack.position.set(myCenterX, myCenterY, backB - (wallThickness / 2));
}

/******************* End of Reset Experiment code ***********************/

/******************* Update (animation changes) code ***********************/

/**
 * This function updates the location of all experiment elements during each animation frame.
 * <p>
 * The function receives both animation time as well as the dt (time difference) from last call.
 * This function is expected to implement the laws of physics to update the position.
 * This function will also update any output variables/graphs
 * <p>
 * Important Note : Boundary Events
 * <p>
 * During any physics simulation you will reach a boundary event.
 * In our case, the boundary even is the ball hitting any of the walls.
 * The boundary event typically changes the sign of velocity/acceleration.
 * The boundary event is most likely to happen in the middle of the two calls.
 * The library allows the experiment to change the simulation time by processing partial time.
 * This function can call a library function with the time remaining to be processed before exiting.
 * <p>
 * @param  t       The time in milliseconds elapsed since the beginning of animation cycle
 * @param  dt      The time in milliseconds elapsed since the last acll to this function
 */
function updateExperimentElements(t, dt)
{
var newX;           /* new X position of ball */
var newY;           /* new Y position of ball */
var newVX;          /* new X velocity of ball */
var newVY;          /* new Y velocity of ball */
var changeX;        /* X boundary hit */
var changeY;        /* Y boundary hit */
var boundaryT;      /* Boundary Event Time */
var tempT;          /* Temporary time */

    /* Load Ball coordinates */
    myBallX = mylevel.position.x;
    myBallY = mylevel.scale.y;
    myBallZ = mylevel.position.z;
//    console.log(myBallX,myBallY,myBallZ);
    /* Intialise for boundary detection */
    changeX   = 1;
    changeY   = 1;
    boundaryT = dt / 1000.0;    /* convert to seconds */
//    console.log(boundaryT,dt);
    /* Compute new myBall position and check for boundary event */
    newX = myBallX + myBallVX * boundaryT ; //s=s0+ut
//    console.log(newX);
    if ((newX >= (rightB - myBallRadius)) || (newX <= (leftB + myBallRadius)))
    {   /* X boundary violated */
        if (newX >= (rightB - myBallRadius))
            {   /* Ball hits right */
                if (myBallAX == 0) {
                    tempT = ((rightB - myBallRadius) - myBallX) / myBallVX;
                }
                else {
                    tempT = (Math.sqrt(myBallVX * myBallVX + 2 * myBallAX * ((rightB - myBallRadius) - myBallX)) - myBallVX) / myBallAX;
                }
            }
        if (newX <= (leftB + myBallRadius))
            {   /* Ball hits left */
                if (myBallAX == 0) { tempT = ((leftB + myBallRadius) - myBallX) / myBallVX; }
                else { tempT = ((-myBallVX) - Math.sqrt(myBallVX * myBallVX + 2 * myBallAX * ((leftB + myBallRadius) - myBallX))) / myBallAX; }
            }
        if (tempT == boundaryT) { changeX = -1; }
        if (tempT < boundaryT)  { changeX = -1; changeY = 1; boundaryT = tempT }
    }


    newY = myBallY + myBallVY * boundaryT ;
//    console.log(newY);
    if ((newY >= myCenterY) || (newY <= (myCenterY / 2)))
    {   /* Y boundary violated */
        if (newY >= (myCenterY))
            {   /* Ball hits top */
                if (myBallAY == 0) {
                 tempT = ((topBb - myBallRadius) - myBallY) / myBallVY;
            }
                else {
                    tempT = (Math.sqrt(myBallVY * myBallVY + 2 * myBallAY * ((topBb - myBallRadius) - myBallY)) - myBallVY) / myBallAY; }
            }
        if (newY <= (myCenterY / 2))
            {   /* Ball hits bottom */
                if (myBallAY == 0) {
                    tempT = ((bottomB + myBallRadius) - myBallY) / myBallVY;
                }
                else {
                    tempT = ((-myBallVY) - Math.sqrt(myBallVY * myBallVY + 2 * myBallAY * ((bottomB + myBallRadius) - myBallY))) / myBallAY;
                }
            }
        if (tempT == boundaryT) {
   //         console.log('Bingo');
            changeY = -1;}
        if (tempT < boundaryT)  {
   //         console.log(tempT,boundaryT);
         changeY = -1; changeX = 1; boundaryT = tempT }
    }
    /* Finally Change in direction boundary Event for velocity */
    if ((changeX == 1) && (changeY == 1))
    {   /* Check only if no barrier is crossed */
        newVX = (myBallVX + myBallAX * boundaryT);
        if ((newVX * myBallVX) < 0)
        {   /* X velocity changed direction */
        tempT = (-myBallVX) / myBallAX;
        if (tempT < boundaryT)  { boundaryT = tempT }
        }
        newVY = (myBallVY + myBallAY * boundaryT);
        if ((newVY * myBallVY) < 0)
        {   /* Y velocity changed direction */
        tempT = (-myBallVY) / myBallAY;
        if (tempT < boundaryT)  { boundaryT = tempT }
        }
    }

    /* Recompute Position, Velocity, Acceleration using boundaryT */
    myBallX  = (myBallX + myBallVX * boundaryT + 0.5 * myBallAX * boundaryT * boundaryT);
    myBallY  = (myBallY + myBallVY * boundaryT + 0.5 * myBallAY * boundaryT * boundaryT);
    myBallVX = (myBallVX + myBallAX * boundaryT) * changeX;
    myBallVY = (myBallVY + myBallAY * boundaryT) * changeY;
    myBallAX = myBallAX;
    myBallAY = myBallAY;

// 
    

//level
    
            // var rectLength = 0.207;
           // //  if(rectWidth < 0.144) {
                  count +=0.04;
           //  //     console.log('Yayy');
             myFlowOther.scale.x=3;
             myFlowOther.scale.y=count;
             myFlowOther.scale.z=3;


//balloon
        scaleSphereX+=0.001;
        scaleSphereY+=0.002;
        myballoon.scale.x=scaleSphereX;
        myballoon.scale.x=scaleSphereY;
        myballoon.scale.x=scaleSphereX;

    /* Adjust Simulation time in case boundary event has occured */
    boundaryT *= 1000;
    if (boundaryT < dt) { PIEadjustAnimationTime(dt - boundaryT); }

    /* Finally Update the Display Panel with new values */
    PIEchangeDisplayText(PosX, myBallX);
    PIEchangeDisplayText(PosY, myBallY);
    PIEchangeDisplayText(VelX, myBallVX);
    PIEchangeDisplayText(VelY, myBallVY);
    PIEchangeDisplayText(AccY, myBallAY);
}

/******************* Update (animation changes) code ***********************/
