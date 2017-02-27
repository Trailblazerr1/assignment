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
var line;
var MAX_POINTS = 500;
var drawCount;
/* Room Variables */
var leftB;              /* Left Barrier */
var rightB;             /* Right Barrier */
var bottomB;            /* Bottom Barrier */
var topB;               /* Top Barrier */
var backB=-4.0;         /* Back Barrier */
var wallThickness;      /* Wall Thickness */
var myBallX;
var myBallY;
var myBallAX;
var myBallAY;
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
var dot;
//figure vars
var buttonRight;
var buttonLeft;
var buttonDiagonal;
var toggle = true;
var toggle1 =true;
var count1=0;
var count2=0;
var toggle2 = true;
var buttonExterior;
var buttonInterior;

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
    myBallX      = myCenterX;
    myBallY      = myCenterY;
    myBallAX     = gravityX;
    myBallAY     = gravityY;

    //figure vars
    toggle = true;
}

// *******************************************************************************************************************
function animate() {
    requestAnimationFrame( animate );
    drawCount = ( drawCount + 1 ) % MAX_POINTS;
    line.geometry.setDrawRange( 0, drawCount );
    if ( drawCount === 0 ) {
        // periodically, generate new data
        updatePositions();
        line.geometry.attributes.position.needsUpdate = true; // required after the first render
        line.material.color.setHSL( Math.random(), 1, 0.5 );
    }
    PIErender();
}


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
    //console.log(index);
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
//set slider
    var inn = document.getElementsByTagName('input');
    console.log(inn[0]);
    inn[0].checked = false;
    inn[1].checked = false;
    count1=0;count2=0;toggle1=true;toggle2=true;
    var para = showMeMagicText("H1","","270px","250px");
    var para = showMeMagicText("H3","","270px","250px");
    console.log(inn[0]);
    if(toggle==false) {
        toggle = true;
        var thres = countOnMe*(countOnMe-3);
        for(var i=0;i<thres;i++) {
            removeEntity(globalScope["line"+i])
        }
    }
        this.style.border = 0;
//change text
    console.log(countOnMe);
        PIEscene.remove(myBall);
        if(countOnMe<12) 
            countOnMe+=1;
        var para2 =showMeMagicText("H2",arrayofShapes[countOnMe],"450px","460px");
        para2.style.cssText = 'position:absolute;top:450px;left:410px;font-family: "Avant Garde", Avantgarde, "Century Gothic", CenturyGothic, "AppleGothic", sans-serif;font-size: 25px;padding: 10px -80px;text-align: center;text-transform: uppercase;text-rendering: optimizeLegibility;';
//        PIErender();
        myBall = createShapeGeometry(countOnMe, countOnMe,0.5);
        myBall.position.set(myBallX-0.8, myBallY+0.3, myBallZ);
        PIEaddElement(myBall);
//add points
    PIEscene.remove(dot);
    var dotGeometry = new THREE.Geometry();
    for(var i=0;i<countOnMe;i++) {
        dotGeometry.vertices.push(new THREE.Vector3( vertices[i][0] + 1.2,vertices[i][1] + 1.8, myBallZ));
    }
    var dotMaterial = new THREE.PointsMaterial( { size: 3,  transparent: true,
  depthWrite: false, sizeAttenuation: false, color:0x000000 } );
    dot = new THREE.Points( dotGeometry, dotMaterial );
    PIEaddElement(dot);

        PIErender();
}

function showMeMagicLeft() {
//slider reset
    var inn = document.getElementsByTagName('input');
    console.log(inn[0]);
    inn[0].checked = false;
    inn[1].checked = false;
    count1=0;count2=0;toggle1=true;toggle2=true;
    var para = showMeMagicText("H1","","270px","250px");
    var para = showMeMagicText("H3","","270px","250px");

    if(toggle==false) {
        toggle = true;
        var thres = countOnMe*(countOnMe-3);
        for(var i=0;i<thres;i++) {
            removeEntity(globalScope["line"+i])
        }
    }
        this.style.border = 0;
//change text
        PIEscene.remove(myBall);
        if(countOnMe>3)
            countOnMe-=1;
        var para2 =showMeMagicText("H2",arrayofShapes[countOnMe],"450px","460px");
        para2.style.cssText = 'position:absolute;top:450px;left:410px;font-family: "Avant Garde", Avantgarde, "Century Gothic", CenturyGothic, "AppleGothic", sans-serif;font-size: 25px;padding: 10px -80px;text-align: center;text-transform: uppercase;text-rendering: optimizeLegibility;';
       // PIErender();
        myBall = createShapeGeometry(countOnMe, countOnMe,0.5);
        myBall.position.set(myBallX-0.8, myBallY+0.3, myBallZ);
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
                globalScope["line"+watch].position.set(myBallX-0.8, myBallY+0.3, 0.1);
                globalScope["line"+watch].name = "line"+watch;
                PIEaddElement(globalScope["line"+watch]);
                watch+=1;
            }
        }
       console.table(globalScope);
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
    count1+=1;
    if(toggle1) {
            if(count1%2==0)
                toggle1=false;
    console.log(toggle1,count1);
//angles
                    // var angle = Math.round((360/countOnMe)*100)/100;
                    // var rad = angle*Math.PI/180;
                    // //circle
                    // var geometry = new THREE.CircleGeometry( 0.13, 32,0,rad);
                    // var material = new THREE.MeshBasicMaterial( { color: 'red' } );
                    // var circle = new THREE.Mesh( geometry, material );
                    // console.log(rad);
                    // circle.position.set((myBallX-0.8)+vertices[0][0], (myBallY+0.3)+vertices[0][1], 0.1)
                    // PIEaddElement( circle );
                    // PIErender();

    //text
    var para = showMeMagicText("H1",angle,"270px","250px");   
    para.style.cssText = 'position:absolute;top:180px;left:750px;  font-family: "Avant Garde", Avantgarde, "Century Gothic", CenturyGothic, "AppleGothic", sans-serif;font-size: 32px;padding: 80px 50px;text-align: center;text-transform: uppercase;text-rendering: optimizeLegibility;';
     //   PIErender();
    }
    else {
            if(count1%2==0)
                toggle1=true;
        var para = showMeMagicText("H1","","270px","250px");
       // PIErender();
    }
}

function showMeMagicInterior() {
    count2+=1;
    if(toggle2) {
            if(count2%2==0)
                toggle2=false;
    var angle = Math.round((countOnMe-2) * (180 / countOnMe)*100)/100;
    var para = showMeMagicText("H3",angle,"270px","250px");   
    para.style.cssText = 'position:absolute;top:80px;left:750px; font-family: "Avant Garde", Avantgarde, "Century Gothic", CenturyGothic, "AppleGothic", sans-serif;font-size: 32px;padding: 80px 50px;text-align: center;text-transform: uppercase;text-rendering: optimizeLegibility;';
    }
    else {
            if(count2%2==0)
                toggle2=true;
        var para = showMeMagicText("H3","","270px","250px");
                    }
}

function updatePositions() {
    var positions = line.geometry.attributes.position.array;
    var x = y = z = index = 0;
    for ( var i = 0, l = MAX_POINTS; i < l; i ++ ) {

        positions[ index ++ ] = x;
        positions[ index ++ ] = y;
        positions[ index ++ ] = z;

        x += ( Math.random() - 0.5 ) * 30;
        y += ( Math.random() - 0.5 ) * 30;
        z += ( Math.random() - 0.5 ) * 30;

    }

}
// ********************************************************************************************************************
function initialiseHelp()
{
    helpContent="";
    helpContent = helpContent + "<h2> Regular polygons help</h2>";
    helpContent = helpContent + "<h3>About the experiment</h3>";
    helpContent = helpContent + "<p>The experiment shows polygons of different sides.</p>";
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
    infoContent = infoContent + "<h2> Regular polygons concepts</h2>";
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
//=============================================================================================
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
    initialiseInfo();
    initialiseHelp();
    /* initialise help and info content */

    /* initialise Scene */
    initialiseScene();

    /* initialise Other Variables */
    initialiseOtherVariables();


// buttons --------------------------------------------------------------------
function createLabel(lft,topp,w,h,name) {
    var lab = document.createElement('span');
    lab.innerHTML = '<label class="switch"> <input type="checkbox"> <div class="slider round"></div> <style scoped>.switch{position:relative;display:inline-block;width:60px;height:34px}.switch input{display:none}.slider{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:#ccc;-webkit-transition: .4s;transition: .4s}.slider:before{position:absolute;content:"";height:26px;width:26px;left:4px;bottom:4px;background-color:white;-webkit-transition: .4s;transition: .4s}input:checked+.slider{background-color:#2196F3}input:focus+.slider{box-shadow:0 0 1px #2196F3}input:checked+.slider:before{-webkit-transform:translateX(26px);-ms-transform:translateX(26px);transform:translateX(26px)}.slider.round{border-radius:34px}.slider.round:before{border-radius:50%}</style> </label>';
    return lab;
}
    
    function createButton(lft,topp,w,h,name) {
        var button = document.createElement('button');
        button.type = 'button';
        button.innerHTML=name;
        //button.style.position = 'absolute';
       // button.style.left = lft;
        // button.style.top = top;
        // button.style.width = w; //size of button    
        // button.style.height = h; //size of buttonRight.    

        //button.style.padding = '10px';
        return button;
    }

function mouseOver() {
              this.style.backgroundColor = "#9933ff";
}
function mouseOut() {
              this.style.backgroundColor = "#e8e8e8";
              this.style.border = " 2px solid #444";
}

    //right button
    buttonRight = createButton('850px','450px','50px','40px','Go on');
    buttonRight.style.cssText = 'top:480px;left:650px;width: 72px;height: 72px;line-height: 72px;display: block;position: relative;-moz-border-radius: 50%;-webkit-border-radius: 50%;border-radius: 50%;border: 2px solid #444;text-align: center;display: inline-block;vertical-align: middle;position: absolute;z-index: 10;color: #333;  outline: none;cursor: pointer;';
    buttonRight.addEventListener("mouseover", mouseOver, false);
    buttonRight.addEventListener("mouseout", mouseOut, false);
    buttonRight.addEventListener("click", showMeMagicRight);
    document.body.appendChild(buttonRight);

    //left button
    buttonLeft = createButton('450px','450px','50px','40px','Back');
    buttonLeft.style.cssText = 'top:480px;left:270px;width: 72px;height: 72px;line-height: 72px;display: block;position: relative;-moz-border-radius: 50%;-webkit-border-radius: 50%;border-radius: 50%;border: 2px solid #444;text-align: center;display: inline-block;vertical-align: middle;position: absolute;z-index: 10;color: #333;  outline: none;cursor: pointer;';
    buttonLeft.addEventListener("mouseover", mouseOver, false);
    buttonLeft.addEventListener("mouseout", mouseOut, false);
    buttonLeft.addEventListener("click", showMeMagicLeft);
    document.body.appendChild(buttonLeft);

    //diagonal button
    buttonDiagonal = createButton('850px','250px','70px','40px','Diagonal');
    buttonDiagonal.style.cssText = 'position:absolute;top:340px;left:990px; width:70px; height:40px; font-size: 11px;text-decoration: none;margin: 20px;color: #fff;display: inline-block;  background-color: #55acee;cursor: pointer;outline: none;';
    buttonDiagonal.addEventListener("click", showMeMagicDiagonal);
    document.body.appendChild(buttonDiagonal);

    //exterior angle button
    buttonExterior = createLabel('850px','150px','70px','40px','Exterior angles');
    buttonExterior.style.cssText = 'position:absolute;top:270px;left:990px;cursor: pointer;';
    buttonExterior.addEventListener("click", showMeMagicExterior);
    document.body.appendChild(buttonExterior); 
    //interior angle button
    buttonInterior = createLabel('850px','120px','70px','40px','Interior angles');
    buttonInterior.style.cssText = 'position:absolute;top:200px;left:990px; cursor: pointer;';
    buttonInterior.addEventListener("click", showMeMagicInterior);
    document.body.appendChild(buttonInterior);   

//texts ----------------------------------------------------------------------
    var para = document.createElement("H2");
    para.textContent = "quadrilateral";
    para.style.cssText = 'position:absolute;top:450px;left:410px;font-family: "Avant Garde", Avantgarde, "Century Gothic", CenturyGothic, "AppleGothic", sans-serif;font-size: 22px;padding: 10px -80px;text-align: center;text-transform: uppercase;text-rendering: optimizeLegibility;';
    document.body.appendChild(para);
   // para.addEventListener("mouseover",hola);

    //exterior angle text
    var para2 = document.createElement("H1");
    para2.textContent = "";
    para2.style.cssText = 'position:absolute;top:270px;left:750px;font-weight: bold;font-size:large;';
    document.body.appendChild(para2);
    //-------
    var para4 = document.createElement("H4");
    para4.textContent = "Exterior Angles";
    para4.style.cssText = 'position:absolute;top:185px;left:1030px; font-family: "Avant Garde", Avantgarde, "Century Gothic", CenturyGothic, "AppleGothic", sans-serif;font-size: 12px;padding: 80px 50px;text-align: center;text-transform: uppercase;text-rendering: optimizeLegibility;color:#880E4F;';
    document.body.appendChild(para4);

    //interior angle text
    var para2 = document.createElement("H3");
    para2.textContent = "";
    para2.style.cssText = 'position:absolute;top:250px;left:750px;font-weight: bold;font-size:large;';
    document.body.appendChild(para2);
    //------
    var para3 = document.createElement("H5");
    para3.textContent = "Interior Angles";
    para3.style.cssText = 'position:absolute;top:105px;left:1030px; font-family: "Avant Garde", Avantgarde, "Century Gothic", CenturyGothic, "AppleGothic", sans-serif;font-size: 12px;padding: 80px 50px;text-align: center;text-transform: uppercase;text-rendering: optimizeLegibility;color:#880E4F;';
    document.body.appendChild(para3);

// Create Shape and add it to scene -------------------------------------------
    myBall = createShapeGeometry(countOnMe, countOnMe,0.5);
        //myBall.position.set(myBallX-0.8, myBallY+0.3, myBallZ);
        myBall.position.set(myBallX-0.8, myBallY+0.3, myBallZ);
    PIEaddElement(myBall); //2, 1.5, 0.1

// dots ---------------------------------------------------------------------------------
    var dotGeometry = new THREE.Geometry();
    for(var i=0;i<countOnMe;i++) {
        dotGeometry.vertices.push(new THREE.Vector3( vertices[i][0] + 1.2,vertices[i][1] + 1.8, myBallZ));
    }
  //  console.table(vertices);
    var dotMaterial = new THREE.PointsMaterial( { size: 3,  transparent: true,
  depthWrite: false, sizeAttenuation: false, color:0x000000 } );
    dot = new THREE.Points( dotGeometry, dotMaterial );
    PIEaddElement(dot);



//my back ------------------------------------------------------------------------------
    geometry = new THREE.BoxGeometry( mySceneW * 2, mySceneH * 2, wallThickness );
    material = new THREE.MeshLambertMaterial( {color:0xF9BF3B} );
    myBack = new THREE.Mesh( geometry, material );
    myBack.position.set(myCenterX, myCenterY, -0.0001);
    //  myBack.receiveShadow = true;
    myBack.scale.set( 1.3, 1, 1 );
    myBack.name="hola"; //test
    PIEaddElement(myBack);

//interior angles ------------------------------------------------------------------------
    x = y = 0;
    var fishShape = new THREE.Shape();
    console.table(vertices);
    fishShape.moveTo(0.3536,-0.3536);
    fishShape.lineTo(0.2536,-0.3536);
    fishShape.quadraticCurveTo(0.2536,-0.3536 ,0.3536,-0.2536);
    fishShape.lineTo(0.3536,-0.3536);
    geometry = new THREE.ShapeGeometry( fishShape );
    material = new THREE.MeshBasicMaterial( { color: 0xd7608d, overdraw: 0.5 } );
    var myballoon = new THREE.Mesh( geometry, material );
    myballoon.position.set( (myBallX-0.8), myBallY+0.3, 0.2);
    myballoon.scale.set( 1, 1, 1 );
    PIEaddElement(myballoon);

    /* Reset all positions */
    //resetExperiment();
    PIEsetAreaOfInterest(mySceneTLX, mySceneTLY, mySceneBRX, mySceneBRY);


            // var geometry = new THREE.BufferGeometry();
            // // attributes
            // var positions = new Float32Array( MAX_POINTS * 3 ); // 3 vertices per point
            // geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );

            // // drawcalls
            // drawCount = 2; // draw the first 2 points, only
            // geometry.setDrawRange( 0, drawCount );

            // // material
            // var material = new THREE.LineBasicMaterial( { color: 0xff0000, linewidth: 2 } );

            // // line
            // line = new THREE.Line( geometry,  material );
            // PIEaddElement( line );

            // // update positions
            //     updatePositions();
}

// ********************************************************************************************************************


function resetExperiment()
{
    /* initialise Other Variables */
    initialiseOtherVariables();
   // loadExperimentElements()
    /* Initialise Ball variables */
    myBallX      = myCenterX;
    myBallY      = myCenterY;
    myBallAX     = gravityX;
    myBallAY     = gravityY;

    /* Reset Ball position */
    PIEscene.remove(myBall);
    PIEscene.remove(dot);
    myBall = createShapeGeometry(countOnMe, countOnMe,0.5);
    PIEaddElement(myBall);

    //text underneath
    var para2 =showMeMagicText("H2",arrayofShapes[countOnMe],"450px","460px");
    para2.style.cssText = 'position:absolute;top:450px;left:410px;font-family: "Avant Garde", Avantgarde, "Century Gothic", CenturyGothic, "AppleGothic", sans-serif;font-size: 25px;padding: 10px -80px;text-align: center;text-transform: uppercase;text-rendering: optimizeLegibility;';

    myBall.position.set(myBallX-0.8, myBallY+0.3, myBallZ);
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
  //  console.log(t,dt);

    var boundaryT;      /* Boundary Event Time */
    var tempT;          /* Temporary time */
  //  animate();

    /* Intialise for boundary detection */
    changeX   = 1;
    changeY   = 1;
    boundaryT = dt / 1000.0;    /* convert to seconds */


}

