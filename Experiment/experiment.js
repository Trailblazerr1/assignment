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
/* Room Variables 
 */
var leftB;              /* Left Barrier */
var rightB;             /* Right Barrier */
var bottomB;            /* Bottom Barrier */
var topB;               /* Top Barrier */
var backB=-4.0;         /* Back Barrier */
var wallThickness;      /* Wall Thickness */

/* Room Objects */
var myCeiling;
var myFloor;
var myLeft;
var myRight;
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
var tap4;
var myGround;
var myGroundBorder;
var newTap;
var levelAdj;
var factor;
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
var levelAdjFlag;
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
/******************* End of Interaction functions ***********************/

/******************* GUI control objects code ***********************/
var PosX;           /* X Position Slider Label */
var PosY;           /* Y Position Slider Label */
var VelX;           /* X Velocity Slider Label */
var Xdefault;       /* X Position Slider Default Value */
var Ydefault;       /* Y Position Slider Default Value */
var VXdefault;      /* X Velocity Slider Default Value */
var Xmin;           /* X Position Slider Minimum Value */
var Xmax;           /* X Position Slider Maximum Value */
var Ymin;           /* Y Position Slider Minimum Value */
var Ymax;           /* Y Position Slider Maximum Value */
var VXmin;          /* X Velocity Slider Minimum Value */
var VXmax;          /* X Velocity Slider Maximum Value */
var Xstep;          /* X Position Slider Step */
var Ystep;          /* Y Position Slider Step */
var VXstep;         /* X Velocity Slider Step */
var radius;
var rectWidth;
var count;
var scaleSphereX;
var scaleSphereY;
var levelAdjust;
/*
 * This function handles the X position slider change
 * <p>
 * Updates the myBall position variable.
 * Effect is felt immediately.
 * <p>
 * @param newValue       New Value of the slider
 */
   function dothings() {
        //tap2.rotation.set(-Math.PI/2,0,0);
        //PIErender(); 
    }
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


function initialiseControlVariables()
{
	/* Labels */
	VelX="Velocity";                 /* X Velocity Slider Label */

	/* Default (initial) Values */
	VXdefault=2.0;             /* X Velocity Slider Default Value */

	/* Slider Limits */
	VXmin= 1.0;                /* X Velocity Slider Minimum Value */
	VXmax= 5.0;                /* X Velocity Slider Maximum Value */

	/* Slider Steps */
	VXstep=1.0;                 /* X Velocity Slider Step */
	radius=0.09;
	rectWidth = 0.046;
	count=1;
	scaleSphereX=0.3;
	scaleSphereY=0.3;
	flowTest=0;
    levelAdjFlag=0;
}


function initialiseControls()
{
	initialiseControlVariables();
	/* Create Input Panel */
	PIEaddInputSlider(VelX, VXdefault, handleVX, VXmin, VXmax, VXstep);
	/* Create Display Panel */
	PIEaddDisplayText(VelX, VXdefault);

}


/******************* End of GUI control objects code ***********************/

/******************* Load Experiment objects code ***********************/

var helpContent;
function initialiseHelp()
{
	helpContent="";
	helpContent = helpContent + "<h2> Liquid exerts pressure at side help</h2>";
	helpContent = helpContent + "<h3>About the experiment</h3>";
	helpContent = helpContent + "<p>The experiment shows a container placed under a water tap.</p>";
	helpContent = helpContent + "<h3>Animation control</h3>";
	helpContent = helpContent + "<p>The top line has animation controls. There are two states of the experiment.</p>";
	helpContent = helpContent + "<h3>The setup stage</h3>";
	helpContent = helpContent + "<p>The initial state is setup stage. In this stage, you can see a control window at the right. You have access to three sliders.</p>";
	helpContent = helpContent + "<p>You can control the following:</p>";
	helpContent = helpContent + "<ul>";
	helpContent = helpContent + "<li>VX&nbsp;:&nbsp;Controls the  velocity of the level.(Range 1-5)</li>";
	helpContent = helpContent + "</ul>";
	helpContent = helpContent + "<p>Once you setup the experiment, you can enter the animation stage by clicking the start button</p>";
	helpContent = helpContent + "<h3>The animation stage</h3>";
	helpContent = helpContent + "<p>In the animation stage, the container will be filled and the balloon will inflate or deflate accordingly obeying the laws of physics.</p>";
	helpContent = helpContent + "<p>The right hand panel now shows the values of the three experiment variables during animation.</p>";
	helpContent = helpContent + "<ul>";
    helpContent = helpContent + "<li>VX&nbsp;:&nbsp;Controls the  velocity of the level.(Range 1-5)</li>";
	helpContent = helpContent + "</ul>";
	helpContent = helpContent + "<p>You can pause and resume the animation by using the pause/play nutton on the top line</p>";
	helpContent = helpContent + "<h2>Happy Experimenting</h2>";
	PIEupdateHelp(helpContent);
}

var infoContent;
function initialiseInfo()
{
	infoContent =  "";
	infoContent = infoContent + "<h2>Liquid exerts pressure at side concepts</h2>";
	infoContent = infoContent + "<h3>About the experiment</h3>";
	infoContent = infoContent + "<p>The experiment shows a container placed under water tap.</p>";
	infoContent = infoContent + "<h3>Pressure</h3>";
	infoContent = infoContent + "<p>As the water fills the container, it starts exerting pressure to its sides.</p>";
	infoContent = infoContent + "<p>As more and more water fills the container, the pressure at side increases.</p>";
	infoContent = infoContent + "<p>This leads to gradual blowing up of balloon.</p>";
	infoContent = infoContent + "<p>When the velocity of water is slow, balloon blows up slowly.</p>";
	infoContent = infoContent + "<p>As the speed of pouring water increases, the balloon blows faster.</p>";
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
	rectWidth  = 0.001;
	count      = 3;
	scaleSphereX=0.3;
	scaleSphereY=0.3;
	maxHeight=623.3;
	levelThreshold=125.2;
	levelAdjust=137.2;
	myBallVX = 2.0;

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
	//a.receiveShadow=true;a.castShadow=true
	PIEsetExperimentTitle("Pressure in liquids");
	PIEsetDeveloperName("Anurag");
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
			new THREE.Vector3( 4, 4.8, -8.2),
			new THREE.Vector3( 4, 1.8, -8.2),
			new THREE.Vector3( 8, 1.8, -8.2 ),
			new THREE.Vector3( 8, 2.4, -8.2),
			new THREE.Vector3( 8.3, 2.4, -8.2),
			new THREE.Vector3( 8.3, 2.6, -8.2),
			new THREE.Vector3( 8, 2.6, -8.2),
			new THREE.Vector3( 8, 4.8, -8.2 )
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
	mylevel.position.set(1.4, 1.5 , 0.0 );
	mylevel.scale.set( 0.05, 0.05, 0.05 );
	mylevel.receiveShadow = false;
	mylevel.castShadow=false;
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
	myballoon.position.set( 2.21, 0.82, 0.2);
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
	curve.v0 = new THREE.Vector3(0.55, -0.09, 0);
	curve.v1 = new THREE.Vector3(0.55, 0.844, 0);
	curve.v2 = new THREE.Vector3(0.55, 0.844, 0);
	for (j = 0; j < SUBDIVISIONS; j++) {
		geometry.vertices.push( curve.getPoint(j / SUBDIVISIONS) )
	}

	material = new THREE.LineBasicMaterial( { color:0x03A9F4, linewidth: 405 } );
	myFlow = new THREE.Line(geometry, material);
	myFlow.position.set( 1.29, 0.93, 0.0);
	myFlow.scale.set( 0, 0, 0 );
	myFlow.receiveShadow = false;
	myFlow.castShadow = false;
	PIEaddElement(myFlow);


	// new level
// my back
    //var textureFront = new THREE.ImageUtils.loadTexture('des.png' );      

    // material = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0x111111, map: texture } );
	var rectLength = 0.277;
	var rectShape = new THREE.Shape();
	rectShape.moveTo( 0,0 );
	rectShape.lineTo( 0, rectWidth );
	rectShape.lineTo( rectLength, rectWidth );
	rectShape.lineTo( rectLength, 0 );
	rectShape.lineTo( 0, 0 );
	geometry = new THREE.ShapeGeometry( rectShape );
	geometry.dynamic = true;
	geometry.__dirtyPosition = true;
	material = new THREE.MeshBasicMaterial( { color: 0x03A9F4 } );
	myFlowOther = new THREE.Mesh( geometry, material );
	myFlowOther.position.set( 1.45, 0.835 , 0.0 );
	myFlowOther.scale.set( 2.975, count, 3 );
	PIEaddElement(myFlowOther);


	//my tap
	var cylindergeometry = new THREE.CylinderGeometry(0.1, 0.1, 5);
	var cylindermaterial = new THREE.MeshLambertMaterial({wireframe: false, color: 0xc0c0c0});
	tap = new THREE.Mesh(cylindergeometry, cylindermaterial);
	PIEaddElement(tap);
	tap.position.set( 0.39, 2.1 , backB );
    tap.scale.set( 0.55, 0.55, 0.55 );
	//tap.rotation.set(-Math.PI/2, Math.PI/2000, Math.PI); 
	tap.rotation.z = Math.PI / 2;

	var cylindergeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.4);
	var cylindermaterial = new THREE.MeshLambertMaterial({wireframe: false, color: 0xc0c0c0});
	tap1 = new THREE.Mesh(cylindergeometry, cylindermaterial);
	PIEaddElement(tap1);
	tap1.position.set( 1.6, 2.19 , backB );
    tap1.scale.set( 0.55, 0.55, 0.55 );

	var cylindergeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.5);
	var cylindermaterial = new THREE.MeshLambertMaterial({wireframe: false, color: 0xc0c0c0});
	tap2 = new THREE.Mesh(cylindergeometry, cylindermaterial);
	PIEaddElement(tap2);
	tap2.position.set( 1.6, 2.27 ,  backB );
	tap2.scale.set( 0.55, 0.55, 0.55
     );
	tap2.rotation.z = Math.PI / 2;

	var cylindergeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.3);
	var cylindermaterial = new THREE.MeshLambertMaterial({wireframe: false, color: 0xBDC3C7});
	tap3 = new THREE.Mesh(cylindergeometry, cylindermaterial);
	PIEaddElement(tap3);
	tap3.position.set( 1.72, 2.05 ,  backB );
    tap3.scale.set( 0.55, 0.55, 0.55 );

    // var cylindergeometry = new THREE.CylinderGeometry(0.1, 0.1, 4.5);
    // var cylindermaterial = new THREE.MeshLambertMaterial({wireframe: false, color: 0xffffff});
    // tap4 = new THREE.Mesh(cylindergeometry, cylindermaterial);
    // PIEaddElement(tap4);
    // tap4.position.set( 1.1, 1.45 , 0.0 );
    // tap4.scale.set( 0.3, 0.3, 0.3 );

	//ground
	// geometry = new THREE.BoxGeometry( mySceneW * 2, mySceneH * 2, wallThickness );
	// material = new THREE.MeshLambertMaterial( {color:0x5C6BC0} );
	// myGround = new THREE.Mesh( geometry, material );
	// myGround.position.set(myCenterX, bottomB - (wallThickness+1 ), -4.0);
	// myGround.receiveShadow = false;
	// myGround.scale.set( 1.4, 0.3, 0.2 );
	// PIEaddElement(myGround);

	//ground border
	geometry = new THREE.BoxGeometry( mySceneW * 2, mySceneH * 2, wallThickness );
	material = new THREE.MeshLambertMaterial( {color:0x3949AB} );
	myGroundBorder = new THREE.Mesh( geometry, material );
	myGroundBorder.position.set(myCenterX, bottomB - (wallThickness+0.1 ), -4.0);
	myGroundBorder.receiveShadow = false;
	myGroundBorder.scale.set( 1.4, 0.15, 0.2 );
	PIEaddElement(myGroundBorder);


// my back
	// loader = new THREE.TextureLoader();
	// texture = loader.load( '../PIE/images/hardwood2_diffuse.jpg' );
	// texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
	// texture.repeat.set( 25, 25 );
	// texture.anisotropy = 16;
	// material = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0x111111, map: texture } );
	geometry = new THREE.BoxGeometry( mySceneW * 2, mySceneH * 2, wallThickness );
	material = new THREE.MeshLambertMaterial( {color:0xF9BF3B} );
	myBack = new THREE.Mesh( geometry, material );
	myBack.position.set(myCenterX, myCenterY, backB - (wallThickness / 2));
	//  myBack.receiveShadow = true;
	myBack.scale.set( 1, 1, 1 );
	PIEaddElement(myBack);

//my floor
    geometry = new THREE.BoxGeometry( mySceneW * 2, wallThickness, 100);
    material = new THREE.MeshLambertMaterial( {color: 0xAEA8D3} );
    myFloor  = new THREE.Mesh( geometry, material );
    // myFloor.lookAt(new THREE.Vector3(0,1,0));
    myFloor.position.set(myCenterX, bottomB - (wallThickness / 2), 0.0);
    myFloor.receiveShadow = true;
    PIEaddElement(myFloor);

//my ceiling
    geometry = new THREE.BoxGeometry( mySceneW * 2, wallThickness, 100 );
    material = new THREE.MeshLambertMaterial( {color: 0xA2DED0} );
    myCeiling = new THREE.Mesh( geometry, material );
    myCeiling.position.set(myCenterX, topB+(wallThickness/2), 0.0);
    myFloor.receiveShadow = true;
    PIEaddElement(myCeiling);

    /* Left */
    geometry = new THREE.BoxGeometry( wallThickness, mySceneH * 2, 100 );
    material = new THREE.MeshLambertMaterial( {color: 0xCF000F} );
    myLeft = new THREE.Mesh( geometry, material );
    myLeft.position.set(leftB-(1), myCenterY, 0.0);
   // myLeft.receiveShadow = true;
    PIEaddElement(myLeft);


    /* Right */
    geometry = new THREE.BoxGeometry( wallThickness, mySceneH * 2, 100 );
    material = new THREE.MeshLambertMaterial( {color: 0xCF000F} );
    myRight = new THREE.Mesh( geometry, material );
    myRight.position.set(rightB+1, myCenterY, 0.0);
  //  console.log(leftB-1,rightB+(wallThickness/2));
    myRight.receiveShadow = true;
    PIEaddElement(myRight);

//mouse ctrls
    document.addEventListener( 'mousedown', onDocumentMouseDown, false );
    function onDocumentMouseDown( event ) 
    {
        if(event.screenX>613 && event.screenX<648  && event.screenY>349 && event.screenY<361  ) {
            console.log(event.screenX,event.screenY);
            dothings(event);
        }
    }


	/* Instantiate experiment controls */
	initialiseControls();

	/* Reset all positions */
	//resetExperiment();

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

	//myBallVX     = 2.0;
//console.log(myBallVX);
    count        = 3.0;
    scaleSphereX = 0.3;
    scaleSphereY = 0.3;
    balloonX     = 2.21;
    balloonY     = 0.82;// myballoon.position.set( 2.21, 0.82, 0.2);

//flow n square bar
 //   PIEscene.remove(myFlow);
    PIEscene.remove(levelAdj);
    myFlow.scale.set( 0, 0, 0 );
    count=3;
    levelAdjFlag =0;
	/* balloon */
    myballoon.position.set( balloonX, balloonY, 0.2);
    myballoon.scale.set( scaleSphereX, scaleSphereY, scaleSphereX );

 //flow
    myFlowOther.position.set( 1.45, 0.835 , 0.0 );
    myFlowOther.scale.set( 2.975, count, 3 );

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
   // console.log(t,dt);
	var newX;           /* new X position of ball */
	var newY;           /* new Y position of ball */
	var newVX;          /* new X velocity of ball */
	var newVY;          /* new Y velocity of ball */
	var changeX;        /* X boundary hit */
	var changeY;        /* Y boundary hit */
	var boundaryT;      /* Boundary Event Time */
	var tempT;          /* Temporary time */
//	console.error(myBallVX);
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
	//    console.log(newX);

	myBallX  = myCenterX; 
	myBallY  = count/100;
	myBallVX = myBallVX;


	//changing velocity
	if(myBallVX==2) {
		factor=1;
	}
	else if(myBallVX==1) {
		factor=0.50;
	}
	else if(myBallVX==3) {
		factor=1.50;
	}
	else if(myBallVX==4) {
		factor=2;
	}
	else {
		factor =2.50;
	}

	//my flow
	if(count>maxHeight) {
		myFlow.scale.set( 0, 0, 0 );
	}
	else {
		myFlow.scale.set( 1, 1, 1 );
	}


	//level

	if(count<maxHeight) {
		count +=(0.7)*factor;
	}
	//  //     console.log('Yayy');
	myFlowOther.scale.x=2.975;
	myFlowOther.scale.y=count;
	myFlowOther.scale.z=3;


	//balloon
	// console.log(count);
	if(count<maxHeight && count>levelThreshold) {    
		scaleSphereX+=(0.0005)*factor;
		scaleSphereY+=(0.00044)*factor;
		myballoon.scale.x=scaleSphereX;
		myballoon.scale.y=scaleSphereY;
	}

	//    myballoon.scale.z=scaleSphereX;

	var balloonX = myballoon.position.x;
	var balloonY = myballoon.position.y;
	if(count<maxHeight && count>levelThreshold) {
		balloonX -=(0.00013)*factor;
		balloonY -=(0.00027)*factor;
		myballoon.position.set( balloonX, balloonY, 0.2);
	}

	//level adjust
	if(count> levelAdjust && levelAdjFlag==0) {
        levelAdjFlag=1;
    //    console.log(levelAdjFlag);
		var rectLen = 0.027;
		var rectWid = 0.04;
		var rectShape = new THREE.Shape();
		rectShape.moveTo( 0,0 );
		rectShape.lineTo( 0, rectWid);
		rectShape.lineTo( rectLen, rectWid );
		rectShape.lineTo( rectLen, 0 );
		rectShape.lineTo( 0, 0 );
		geometry = new THREE.ShapeGeometry( rectShape );
		material = new THREE.MeshBasicMaterial( { color: 0x03A9F4, overdraw: 0.5 } );
		levelAdj = new THREE.Mesh( geometry, material );
		levelAdj.position.set( 2.274, 0.96 , 0.0 );
//		levelAdj.scale.set( 1, 1, 1 );
		PIEaddElement(levelAdj);
	}
	//  console.log(factor);
	/* Adjust Simulation time in case boundary event has occured */
	boundaryT *= 1000;
	if (boundaryT < dt) { PIEadjustAnimationTime(dt - boundaryT); }

	/* Finally Update the Display Panel with new values */
	//PIEchangeDisplayText(PosX, myBallX);
	//PIEchangeDisplayText(PosY, myBallY);
	PIEchangeDisplayText(VelX, myBallVX);
}

/******************* Update (animation changes) code ***********************/
