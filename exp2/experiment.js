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
var myBack;             /* Back */




// ********************************************************************************************************************

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
    myBallZ    = 0.1;
}

// ********************************************************************************************************************

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

// ********************************************************************************************************************

/**

 * Finally the developer should call the function PIEsetAreaOfInterest(tlx, tly, brx, bry).
 * The parameters are the top left corner and bottom right corner coordinates.
 * The X axis goes from lef to right of te display and the y axis goes from bottom to up.
 * The area of interst should be wide and tall enough to cover all potential movements.
 */
function loadExperimentElements()
{
var geometry;
var material;
var loader;
var texture;

    PIEsetExperimentTitle("Batmobile");
    PIEsetDeveloperName("Bruce");
    PIEhideControlElement();

    /* initialise help and info content */

    /* initialise Scene */
    initialiseScene();

    /* initialise Other Variables */
    initialiseOtherVariables();

//buttons
function myFunction() {
    console.log('I am clicked!');
     }

var button = document.createElement('button');
button.type = 'button';
button.innerHTML='button';
button.style.position = 'absolute';
button.style.left = '400px';
button.style.top = '400px';
button.style.width = '50px'; //size of button
button.style.height = '50px'; //size of button
//button.style.padding = '10px';
button.addEventListener("click", myFunction);
document.body.appendChild(button);

//actions from buttons


    /* Create Ball and add it to scene */
//            var circumradius=0.5, sides=n=8;
            function createShapeGeometry (n, sides,circumradius) {

                var shape = new THREE.Shape(),
                    vertices = [],
                    x;

                // Calculate the vertices of the n-gon.                 
                for (x = 1; x <= sides; x++) {
                    vertices.push([
                        circumradius * Math.sin((Math.PI / n) + (x * ((2 * Math.PI)/ n))),
                        circumradius * Math.cos((Math.PI / n) + (x * ((2 * Math.PI)/ n)))
                    ]);
                }

                // Start at the last vertex.                
                shape.moveTo.apply(shape, vertices[sides - 1]);

                // Connect each vertex to the next in sequential order.
                for (x = 0; x < n; x++) {
                    shape.lineTo.apply(shape, vertices[x]);
                }

                // It's shape and bake... and I helped!         
                return new THREE.ShapeGeometry(shape);
            }
            geometry = createShapeGeometry(6, 6,0.5);
            material = new THREE.MeshBasicMaterial( { color: 0x03A9F4 } );
            myBall = new THREE.Mesh( geometry, material );
            PIEaddElement(myBall);

//     function PolygonGeometry(sides) {
//     var geo = new THREE.Geometry();
    
//     // generate vertices
//     for ( var pt = 0 ; pt < sides; pt++ )
//     {
//         // Add 90 degrees so we start at +Y axis, rotate counterclockwise around
//         var angle = (Math.PI/2) + (pt / sides) * 2 * Math.PI;

//         var x = Math.cos( angle );
//         var y = Math.sin( angle );
        
//         // YOUR CODE HERE
//         //Save the vertex location - fill in the code
//         geo.vertices.push( new THREE.Vector3(x,y,0));

//     }
    
//     for ( var i = 0; i< sides-2; i++) {
//         geo.faces.push( new THREE.Face3(0,i+1,i+2));
        
//     }
//     return geo;
// }
//     geometry = PolygonGeometry(8);
//     material = new THREE.MeshBasicMaterial( { color: 0x03A9F4, side: THREE.FrontSide } );
//     myBall = new THREE.Mesh( geometry, material );
//     PIEaddElement(myBall);


//my back
    geometry = new THREE.BoxGeometry( mySceneW * 2, mySceneH * 2, wallThickness );
    material = new THREE.MeshLambertMaterial( {color:0xF9BF3B} );
    myBack = new THREE.Mesh( geometry, material );
    myBack.position.set(myCenterX, myCenterY, -1);
    //  myBack.receiveShadow = true;
    myBack.scale.set( 1.3, 1, 1 );
    PIEaddElement(myBack);

    /* Reset all positions */
    resetExperiment();
    console.warn(myCenterX, myCenterY, backB - (wallThickness / 2));
    PIEsetAreaOfInterest(mySceneTLX, mySceneTLY, mySceneBRX, mySceneBRY);
}

// ********************************************************************************************************************


function resetExperiment()
{
    /* initialise Other Variables */
    initialiseOtherVariables();

    /* Initialise Ball variables */
    myBallX      = myCenterX;
    myBallY      = myCenterY;
    myBallAX     = gravityX;
    myBallAY     = gravityY;

    /* Reset Ball position */
    myBall.position.set(myBallX, myBallY, myBallZ);
    myBack.position.set(myCenterX, myCenterY, -0.1);

    /* Reset Wall position */
    /* Floor */

}


// ********************************************************************************************************************

/**

 * @param  t       The time in milliseconds elapsed since the beginning of animation cycle
 * @param  dt      The time in milliseconds elapsed since the last acll to this function
 */
function updateExperimentElements(t, dt)
{

var boundaryT;      /* Boundary Event Time */
var tempT;          /* Temporary time */


    /* Intialise for boundary detection */
    changeX   = 1;
    changeY   = 1;
    boundaryT = dt / 1000.0;    /* convert to seconds */



}

