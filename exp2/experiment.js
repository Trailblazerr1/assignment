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

//shape variables
var countOnMe;
var vertices = [];
var globalScope ={};
var arrayofShapes = {
3:"triangle",
4:"quadrilateral",
5:"pentagon",
6:"hexagon",
7:"heptagon",
8:"octagon",
9:"enneagon",
10:"decagon",
11:"hendecagon",
12:"dodecagon"
}

//figure vars
var buttonRight;
var buttonLeft;
var buttonDiagonal;
var toggle = true;
var buttonExterior;

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

    //shape vars
    countOnMe = 4;

    //figure vars
    toggle = true;
}

// *******************************************************************************************************************

function createShapeGeometry (n, sides,circumradius) {

    var shape = new THREE.Shape(),x;
    vertices = [];

    // Calculate the vertices of the n-gon.                 
    for (x = 1; x <= sides; x++) {
      //  console.log(Math.cos((Math.PI / n) + (x * ((2 * Math.PI)/ n))) );
        vertices.push([
             Math.round(circumradius * Math.sin((Math.PI / n) + (x * ((2 * Math.PI)/ n)))*10000)/10000,
             Math.round(circumradius * Math.cos((Math.PI / n) + (x * ((2 * Math.PI)/ n)))*10000)/10000
        ]);
    }
    // Start at the last vertex.                
    shape.moveTo.apply(shape, vertices[sides - 1]);

    // Connect each vertex to the next in sequential order.
    for (x = 0; x < n; x++) {
        shape.lineTo.apply(shape, vertices[x]);
    }

    geometry= new THREE.ShapeGeometry(shape);
    material = new THREE.MeshBasicMaterial( { color: 0x03A9F4 } );
    return new THREE.Mesh( geometry, material );
}

//do things ******************************************************************************************************************
function showMeMagicText(tag,index,to,lft) {
    var x = document.getElementsByTagName(tag);
    var parentDiv = x[0].parentNode;
    var para2 = document.createElement(tag);
    para2.textContent = index;
    parentDiv.replaceChild(para2,x[0]);
    return para2;
}

function hola() {
    var x = document.getElementsByTagName("P");
    var parentDiv = x[0].parentNode;
    var sp1 = document.createElement("P");
    sp1.id = "newSpan";
    var sp1_content = document.createTextNode("new replacement span element.");
    sp1.appendChild(sp1_content);
    sp1.style.cssText = 'position:absolute;top:470px;left:600px;font-weight: bold;font-size:large;';
    sp1.addEventListener("mouseover",hola);
    parentDiv.replaceChild(sp1,x[0]);
}

function removeEntity(object) {
    var selectedObject = PIEscene.getObjectByName(object.name);
    PIEscene.remove( selectedObject );
}

function showMeMagicRight() {
    if(toggle==false) {
        toggle = true;
        var thres = countOnMe*(countOnMe-3);
        for(var i=0;i<thres;i++) {
            removeEntity(globalScope["line"+i])
        }
    }

//change text
        var para2 =showMeMagicText("H2",arrayofShapes[countOnMe],"470px","600px");
        para2.style.cssText = 'position:absolute;top:470px;left:600px;font-weight: bold;font-size:large;';
        PIErender();
        countOnMe+=1;
        PIEscene.remove(myBall);
        myBall = createShapeGeometry(countOnMe, countOnMe,0.5);
        myBall.position.set(myBallX, myBallY, myBallZ);
        PIEaddElement(myBall);
        PIErender();
}

function showMeMagicLeft() {
        countOnMe-=1;
      //  console.log(countOnMe);
        PIEscene.remove(myBall);
        myBall = createShapeGeometry(countOnMe, countOnMe,0.5);
        myBall.position.set(myBallX, myBallY, myBallZ);
        PIEaddElement(myBall);
        PIErender();
}

function showMeMagicDiagonal() {
    if(toggle) {
        toggle= false;
        vertices = vertices.concat(vertices);
       // console.table(vertices);
        var i,j,k;
        globalScope ={};
        var watch=0;
    //drawing diagonals     
        for(i=0;i<countOnMe;i++) {
            k = i+2;
            for(j=k;j<(k+(countOnMe-3));j++) {
                var geometry = new THREE.Geometry();
                geometry.vertices.push(
                    new THREE.Vector3( vertices[i][0], vertices[i][1], 0 ),
                    new THREE.Vector3( vertices[j][0], vertices[j][1], 0 ),
                    new THREE.Vector3( vertices[j][0], vertices[j][1], 0 )
                );
                var material = new THREE.LineBasicMaterial({color: 0x0000ff});
                globalScope["line"+watch] = new THREE.Line( geometry, material );
                globalScope["line"+watch].position.set(myBallX, myBallY, 0.1);
                globalScope["line"+watch].name = "line"+watch;
                PIEaddElement(globalScope["line"+watch]);
                watch+=1;
            }
        }
    //    console.log(watch);
        PIErender();
    }
    else {
        toggle = true;
        var thres = countOnMe*(countOnMe-3);
        for(var i=0;i<thres;i++) {
            removeEntity(globalScope["line"+i]);
        }
        PIErender();
    }
}


function showMeMagicExterior() {
    var angle = (countOnMe-2) * (180 / countOnMe);
    var para = showMeMagicText("H1",angle,"270px","250px");   
    para.style.cssText = 'position:absolute;top:270px;left:250px;font-weight: bold;font-size:large;';
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

// buttons --------------------------------------------------------------------
    
    function createButton(lft,top,w,h,name) {
        var button = document.createElement('button');
        button.type = 'button';
        button.innerHTML=name;
        button.style.position = 'absolute';
        button.style.left = lft;
        button.style.top = top;
        button.style.width = w; //size of button    
        button.style.height = h; //size of buttonRight.    
        //button.style.padding = '10px';
        return button;
    }

    //right button
    buttonRight = createButton('850px','450px','50px','40px','Go on');
    buttonRight.addEventListener("click", showMeMagicRight);
    document.body.appendChild(buttonRight);
    //left button
    buttonLeft = createButton('450px','450px','50px','40px','Fall back');
    buttonLeft.addEventListener("click", showMeMagicLeft);
    document.body.appendChild(buttonLeft);
    //diagonal button
    buttonDiagonal = createButton('850px','250px','70px','40px','Diagonal');
    buttonDiagonal.addEventListener("click", showMeMagicDiagonal);
    document.body.appendChild(buttonDiagonal);
    //exterior angle button
    buttonExterior = createButton('850px','150px','70px','40px','Exterior angles');
    buttonExterior.addEventListener("click", showMeMagicExterior);
    document.body.appendChild(buttonExterior);    

//texts ----------------------------------------------------------------------
    var para = document.createElement("H2");
    para.textContent = "Triangle";
    para.style.cssText = 'position:absolute;top:470px;left:600px;font-weight: bold;font-size:large;';
    document.body.appendChild(para);
   // para.addEventListener("mouseover",hola);

    //exterior angle text
    var para2 = document.createElement("H1");
    para2.textContent = "";
    para2.style.cssText = 'position:absolute;top:270px;left:250px;font-weight: bold;font-size:large;';
    document.body.appendChild(para2);


// Create Shape and add it to scene -------------------------------------------
    myBall = createShapeGeometry(countOnMe, countOnMe,0.5);
    PIEaddElement(myBall); //2, 1.5, 0.1




//my back ------------------------------------------------------------------------------
    geometry = new THREE.BoxGeometry( mySceneW * 2, mySceneH * 2, wallThickness );
    material = new THREE.MeshLambertMaterial( {color:0xF9BF3B} );
    myBack = new THREE.Mesh( geometry, material );
    myBack.position.set(myCenterX, myCenterY, -0.0001);
    //  myBack.receiveShadow = true;
    myBack.scale.set( 1.3, 1, 1 );
    myBack.name="hola"; //test
    PIEaddElement(myBack);

    /* Reset all positions */
    resetExperiment();
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
    //console.log(myBallX, myBallY, myBallZ);
    myBall.position.set(myBallX, myBallY, myBallZ);
    myBack.position.set(myCenterX, myCenterY, -0.0001);

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

