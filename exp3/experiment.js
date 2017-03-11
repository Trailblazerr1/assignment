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
var myFloor;            /* Floor */
var myVessel;          /* Ceiling */
var myLevel1;             /* Back */
var myLevel2;            /* Right */
var mybase1;
var mybase2;
var myWeight1;
var myWeight2;             /* Left */

/* Ball variables */
var myBall;             /* Ball Object */
var myBallRadius;       /* Radius */
var weight1;            /* X Position */
var weight2;            /* Y Position */
var myBallVX;           /* X Velocity */
var myBallVY;           /* Y Velocity */
var myBallAX;           /* X Acceleration */
var myBallAY;           /* Y Acceleration */
var myBallZ;  
var level1h;
var level2h;          /* Z Position for placing ball */

/* Parameters, Variables */
var gravityX;           /* X component of Gravity in m/S2 */
var gravityY;           /* Y component of Gravity in m/S2 */

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
    weight1 = newpos.x;
    if (newpos.x < (leftB + myBallRadius)) { weight1 = (leftB + myBallRadius) }
    else if (newpos.x > (rightB - myBallRadius)) { weight1 = (rightB - myBallRadius) }
    weight2 = newpos.y;
    if (newpos.y < (bottomB + myBallRadius)) { weight2 = (bottomB + myBallRadius); }
    else if (newpos.y > (topB - myBallRadius)) { weight2 = (topB  - myBallRadius); }
    myBallZ = newpos.z;

    myBall.position.set(weight1, weight2, myBallZ);
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
    weight1 = newValue;
    console.log(weight1);
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
    weight2 = newValue;
    console.log(weight2);
    PIErender();
}




function initialiseControlVariables()
{
    /* Labels */
    PosX="Weight 1";                  /* X Position Slider Label */
    PosY="Weight 2";                  /* Y Position Slider Label */

    /* Default (initial) Values */
    Xdefault=5;        /* X Position Slider Default Value */
    Ydefault=5;        /* Y Position Slider Default Value */


    /* Slider Limits */
    Xmin=1;   /* X Position Slider Minimum Value */
    Xmax=10;  /* X Position Slider Maximum Value */
    Ymin=1; /* Y Position Slider Minimum Value */
    Ymax=10;    /* Y Position Slider Maximum Value */


    /* Slider Steps */
    Xstep=1;                 /* X Position Slider Step */
    Ystep=1;                  /* Y Position Slider Step */
}


function initialiseControls()
{
    initialiseControlVariables();
    /* Create Input Panel */
    PIEaddInputSlider(PosX, Xdefault, handleX, Xmin, Xmax, Xstep);
    PIEaddInputSlider(PosY, Ydefault, handleY, Ymin, Ymax, Ystep);
    /* Create Display Panel */
    PIEaddDisplayText(PosX, Xdefault);
    PIEaddDisplayText(PosY, Ydefault);

}


/******************* End of GUI control objects code ***********************/

/******************* Load Experiment objects code ***********************/

var helpContent;
function initialiseHelp()
{
    helpContent="";
  
    helpContent = helpContent + "<h2>Happy Experimenting</h2>";
    PIEupdateHelp(helpContent);
}

var infoContent;
function initialiseInfo()
{
    infoContent =  "";
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
}

function initialiseOtherVariables()
{
    /* Initialise variables */
    myBallRadius = mySceneW/30.0;
    wallThickness = 0.20;

    /* Gravity */
    gravityX = 0.0;
    gravityY = -9.8;

    /* Barriers */
    leftB=mySceneTLX;
    rightB=mySceneBRX;
    bottomB=mySceneBRY;
    topB=mySceneTLY;
}


function loadExperimentElements()
{
var geometry;
var material;
var loader;
var texture;
var rectShape;

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

//texts
    var para = document.createElement("H5");
    para.textContent = "Pressure";
    para.style.cssText = 'position:absolute;top:90px;left:80px;font-family: "Avant Garde", Avantgarde, "Century Gothic", CenturyGothic, "AppleGothic", sans-serif;font-size: 25px;padding: 10px -80px;text-align: center;text-transform: uppercase;text-rendering: optimizeLegibility;';
    document.body.appendChild(para);

//myWeight1
    var diff =0.1;
    rectShape = new THREE.Shape();
    rectShape.moveTo( 1-diff,1.6 );
    rectShape.lineTo( 1-diff,1.8+diff );
    rectShape.lineTo( 1.3+diff,1.8+diff );
    rectShape.lineTo( 1.3+diff,1.6 );
    rectShape.lineTo( 1-diff,1.6 );
    geometry = new THREE.ShapeGeometry( rectShape );
    material = new THREE.MeshBasicMaterial( { color: 0x9C27B0 } );
    myWeight1 = new THREE.Mesh( geometry, material );
    myWeight1.scale.set(1,1,1);
    PIEaddElement(myWeight1);


    level1h=1.5-diff;
    level2h=1.3;
//myVessel
    material = new THREE.LineBasicMaterial({    color: 0x000000,
        linewidth: 4,
        linecap: 'round', //ignored by WebGLRenderer
        linejoin:  'round' //ignored by WebGLRenderer
    });
    geometry = new THREE.Geometry();
    geometry.vertices.push(
            new THREE.Vector3( 1, level1h, 0),
            new THREE.Vector3( 1, 0.7, 0 ),
            new THREE.Vector3( 3, 0.7, 0 ),
            new THREE.Vector3( 3, level2h, 0 ),
            new THREE.Vector3( 2.6, level2h, 0),
            new THREE.Vector3( 2.6, 1.0, 0),
            new THREE.Vector3( 1.3, 1.0, 0 ),
            new THREE.Vector3( 1.3, level1h, 0 ),
            new THREE.Vector3( 1, level1h, 0 )
            );
    myVessel = new THREE.Line(geometry, material);
    myVessel.scale.set( 1, 1, 1 );
    PIEaddElement(myVessel);


//myLevel1
    rectShape = new THREE.Shape();
    rectShape.moveTo( 1,level1h );
    rectShape.lineTo( 1, 0.7 );
    rectShape.lineTo( 2, 0.7 );
    rectShape.lineTo( 2, 1.0 );
    rectShape.lineTo( 1.3, 1.0 );
    rectShape.lineTo( 1.3, level1h );
    rectShape.lineTo( 1, level1h );
    geometry = new THREE.ShapeGeometry( rectShape );
    material = new THREE.MeshBasicMaterial( { color: 0x03A9F4 } );
    myLevel1 = new THREE.Mesh( geometry, material );
    myLevel1.scale.set(1,1,1);
    PIEaddElement(myLevel1);

//myLevel2
    rectShape = new THREE.Shape();
    rectShape.moveTo( 3,level2h );
    rectShape.lineTo( 3, 0.7 );
    rectShape.lineTo( 2, 0.7 );
    rectShape.lineTo( 2, 1.0 );
    rectShape.lineTo( 2.6, 1.0 );
    rectShape.lineTo( 2.6, level2h );
    rectShape.lineTo( 3, level2h );
    geometry = new THREE.ShapeGeometry( rectShape );
    material = new THREE.MeshBasicMaterial( { color: 0x03A9F4 } );
    myLevel2 = new THREE.Mesh( geometry, material );
    myLevel2.scale.set(1,1,1);
    PIEaddElement(myLevel2);

//mybase1
    rectShape = new THREE.Shape();
    rectShape.moveTo( 1.3,1.8 );
    rectShape.lineTo( 1.3,1.7 );
    rectShape.lineTo( 1.2,1.7 );
    rectShape.lineTo( 1.2,1.6 );
    rectShape.lineTo( 1.3,1.6 );
    rectShape.lineTo( 1.3, 1.5 );
    rectShape.lineTo( 1, 1.5 );
    rectShape.lineTo( 1, 1.6 );
    rectShape.lineTo( 1.1, 1.6 );
    rectShape.lineTo( 1.1, 1.7 );
    rectShape.lineTo( 1, 1.7 );
    rectShape.lineTo( 1, 1.8 );
    rectShape.lineTo( 1.3,1.8 );
    geometry = new THREE.ShapeGeometry( rectShape );
    material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
    mybase1 = new THREE.Mesh( geometry, material );
    mybase1.scale.set(1,0.9 ,1);
    PIEaddElement(mybase1);

//mybase2
    rectShape = new THREE.Shape();
    rectShape.moveTo( 3,1.8 );
    rectShape.lineTo( 3,1.7 );
    rectShape.lineTo( 2.9,1.7 );
    rectShape.lineTo( 2.9,1.6 );
    rectShape.lineTo( 3,1.6 );
    rectShape.lineTo( 3, 1.5 );
    rectShape.lineTo( 2.6, 1.5 );
    rectShape.lineTo( 2.6, 1.6 );
    rectShape.lineTo( 2.7, 1.6 );
    rectShape.lineTo( 2.7, 1.7 );
    rectShape.lineTo( 2.6, 1.7 );
    rectShape.lineTo( 2.6, 1.8 );
    rectShape.lineTo( 3,1.8 );
    geometry = new THREE.ShapeGeometry( rectShape );
    material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
    mybase2 = new THREE.Mesh( geometry, material );
    mybase2.scale.set(1,1,1);
    PIEaddElement(mybase2);





    /* Back */
    // material = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0x111111, map: texture } );
    // geometry = new THREE.PlaneBufferGeometry( mySceneW * 2, mySceneH * 2 );
    geometry = new THREE.BoxGeometry( mySceneW * 2, mySceneH * 2, wallThickness );
    material = new THREE.MeshLambertMaterial( {color: 0xffffff} );
    myBack = new THREE.Mesh( geometry, material );
    myBack.position.set(myCenterX, myCenterY, backB - (wallThickness / 2));
    myBack.scale.set(1.3,1,1);
    myBack.receiveShadow = true;
    PIEaddElement(myBack);
    myBack.receiveShadow = false;
    myBack.castShadow = false;

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


}

/******************* End of Reset Experiment code ***********************/

/******************* Update (animation changes) code ***********************/

/*
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
  
}

/******************* Update (animation changes) code ***********************/
