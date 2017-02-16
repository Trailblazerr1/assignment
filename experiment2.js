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
var maxHeight;
var levelThreshold;
var flowTest;
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
var myGround;
var myGroundBorder;
var shadow;
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
    count=1;
    scaleSphereX=0.3;
    scaleSphereY=0.3;
    flowTest=0;
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

    PIEupdateHelp(helpContent);
}

var infoContent;
function initialiseInfo()
{
    infoContent =  "";
    infoContent = infoContent + "<h2>Bouncing Ball experiment concepts</h2>";

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
    rectWidth  = 0.001;
    count      = 3;
    scaleSphereX=0.3;
    scaleSphereY=0.3;
    maxHeight=418.5;
    levelThreshold=117.2;

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

//Opening function

function loadExperimentElements()
{
var geometry;
var material;
var loader;
var texture;

    PIEsetExperimentTitle("Magical balloon");
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
        linewidth: 2,
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

//Add balloon

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
    myballoon.position.set( 2.20, 0.625, 0.2);
    // myballoon.position.needsUpdate = true;
    // myballoon.geometry.dynamic = true;
    myballoon.scale.set( scaleSphereX, scaleSphereY, scaleSphereX );
    PIEaddElement(myballoon);

    /* Allow Dragging of the ball */
        //    PIEdragElement(myBall);
        //    PIEsetDrag(myBall, myBallDrag);


//Water flow
    SUBDIVISIONS = 100;
    geometry = new THREE.Geometry();
    curve = new THREE.QuadraticBezierCurve3();
    curve.v0 = new THREE.Vector3(0.55, -0.13, 0);
    curve.v1 = new THREE.Vector3(0.55, 1.1, 0);
    curve.v2 = new THREE.Vector3(0.55, 1.3, 0);
    for (j = 0; j < SUBDIVISIONS; j++) {
       geometry.vertices.push( curve.getPoint(j / SUBDIVISIONS) )
    }

    material = new THREE.LineBasicMaterial( { color:0x03A9F4, linewidth: 405 } );
    myFlow = new THREE.Line(geometry, material);
    myFlow.position.set( 1.38, 0.80, 0.0);
    myFlow.scale.set( 0, 0, 0 );
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
    myFlowOther.position.set( 1.655, 0.669 , 0.0 );
    myFlowOther.scale.set( 2.975, count, 3 );
    PIEaddElement(myFlowOther);


//my tap
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
        

//ground
    geometry = new THREE.BoxGeometry( mySceneW * 2, mySceneH * 2, wallThickness );
    material = new THREE.MeshLambertMaterial( {color:0x5C6BC0} );
    myGround = new THREE.Mesh( geometry, material );
    myGround.position.set(myCenterX, bottomB - (wallThickness+1 ), -4.0);
    myGround.receiveShadow = true;
    myGround.scale.set( 1.4, 0.3, 0.2 );
    PIEaddElement(myGround);

//ground border
    geometry = new THREE.BoxGeometry( mySceneW * 2, mySceneH * 2, wallThickness );
    material = new THREE.MeshLambertMaterial( {color:0x3949AB} );
    myGroundBorder = new THREE.Mesh( geometry, material );
    myGroundBorder.position.set(myCenterX, bottomB - (wallThickness+0.1 ), -4.0);
    myGroundBorder.receiveShadow = true;
    myGroundBorder.scale.set( 1.4, 0.021, 0.2 );
    PIEaddElement(myGroundBorder);

//shadow



    var ctx = new THREE.Shape();
    x=0.7,y=0.6,width=0.5,height=0.3,radius=0.1;
    ctx.moveTo( 0.2, 0.4 );
    ctx.quadraticCurveTo( 0.4, 0.6, 0.6, 0.4 );
    ctx.bezierCurveTo( 0.7, 0.45, 0.7, 0.5, 0.6, 0.6 );
    ctx.quadraticCurveTo( 0.4, 0.8, 0.2, 0.6 );
    ctx.quadraticCurveTo( 0.05, 0.5, 0.2, 0.4 );
    geometry = new THREE.ShapeGeometry( ctx );
    material = new THREE.MeshBasicMaterial( { color: 0xffffff, overdraw: 0.5 } );
    shadow = new THREE.Mesh( geometry, material );
    shadow.position.set(0.6, 0.1, 0 );
    shadow.scale.set( 1, 1, 1 );
    shadow.rotation.z = Math.PI / 2;
    PIEaddElement( shadow );

// my back

    geometry = new THREE.BoxGeometry( mySceneW * 2, mySceneH * 2, wallThickness );
    material = new THREE.MeshLambertMaterial( {color:0xFFCA28} );
    myBack = new THREE.Mesh( geometry, material );
    myBack.position.set(myCenterX, myCenterY, backB - (wallThickness / 2));
    myBack.receiveShadow = true;
    myBack.scale.set( 1.3, 1, 1 );
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

    /* Recompute Position, Velocity, Acceleration using boundaryT */
    myBallX  = (myBallX + myBallVX * boundaryT + 0.5 * myBallAX * boundaryT * boundaryT);
    myBallY  = (myBallY + myBallVY * boundaryT + 0.5 * myBallAY * boundaryT * boundaryT);
    myBallVX = (myBallVX + myBallAX * boundaryT) * changeX;
    myBallVY = (myBallVY + myBallAY * boundaryT) * changeY;
    myBallAX = myBallAX;
    myBallAY = myBallAY;


//my flow
    if(count>maxHeight) {
        PIEscene.remove(myFlow);
                }
    else {
            myFlow.scale.set( 1, 1, 1 );
    }

    

//level
    
            // var rectLength = 0.207;
           // //  if(rectWidth < 0.144) {
            if(count<maxHeight) {
                  count +=0.7;
              }
           //  //     console.log('Yayy');
             myFlowOther.scale.x=2.975;
             myFlowOther.scale.y=count;
             myFlowOther.scale.z=3;


//balloon
    //console.log(levelThreshold);
    if(count<maxHeight && count>levelThreshold) {    
        scaleSphereX+=0.0005;
        scaleSphereY+=0.0004;
        myballoon.scale.x=scaleSphereX;
        myballoon.scale.y=scaleSphereY;
    }

    //    myballoon.scale.z=scaleSphereX;
     
     var balloonX = myballoon.position.x;
     var balloonY = myballoon.position.y;
        if(count<maxHeight && count>levelThreshold) {
            balloonX -=0.00013;
            balloonY -=0.00027;
            myballoon.position.set( balloonX, balloonY, 0.2);
        }

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
