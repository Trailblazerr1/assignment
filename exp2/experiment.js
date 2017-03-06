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
var cc = 1;
var cc2 =1;
var item;
var items = [0x03A9F4,0xF44336,0xE91E63,0x9C27B0,0x009688,0x75FF33,0xD50000];
//shape variables
var countOnMe;
var circlee;
var vertices = [];
var globalScope ={};
var sideScope = {};
var scopeOther = {};
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
};
var dotNames = {
    0: "A",
    1: "B",
    2: "C",
    3: "D",
    4: "E",
    5: "F",
    6: "G",
    7: "H",
    8: "I",
    9: "J",
    10: "K",
    11: "L",
    12: "M"
}
var dot;
//figure vars
var buttonRight;
var buttonLeft;
var buttonDiagonal;
var toggle = true;
var toggle1 =true;
var toggle4 = false;
var count1=0;
var count2=0;
var toggle2 = true;
var toggle3 = false;
var buttonExterior;
var buttonInterior;

//*************************************************************************************************************

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
    AYdefault=-9.8;            /* Y Acceleration Slider Default Value */

    /* Slider Limits */
    Xmin=leftB+myBallRadius;   /* X Position Slider Minimum Value */
    Xmax=rightB-myBallRadius;  /* X Position Slider Maximum Value */
    Ymin=bottomB+myBallRadius; /* Y Position Slider Minimum Value */
    Ymax=topB-myBallRadius;    /* Y Position Slider Maximum Value */
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
}



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
	geometry= new THREE.ShapeGeometry(shape);//0x03A9F4
    var item2 = items[Math.floor(Math.random()*items.length)];
    if(item2==item)
        item = items[Math.floor(Math.random()*items.length)];
    else
        item=item2;
    console.log(item.toString(16));
	material = new THREE.MeshBasicMaterial( { color: item } );
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
PIEchangeDisplayCheckbox('Exterior Angles', false);
PIEchangeDisplayCheckbox('Interior Angles', false);
PIEchangeDisplayCheckbox('Diagonals', false);
	if(toggle3) {
		toggle3=false;
		for(var j=0;j<countOnMe;j++) {
			scopeOther['circle'+j].scale.set(0,0,0);
		} 
	}

	if(toggle4) {
		toggle4=false
			circlee.scale.set(0,0,0);
	}
	//PIErender();
	//set slider
	var inn = document.getElementsByTagName('input');
	// console.log(inn[0]);
	inn[0].checked = false;
	inn[1].checked = false;
	count1=0;count2=0;toggle1=true;toggle2=true;
	var para = showMeMagicText("H1","","270px","250px");
	var para = showMeMagicText("H3","","270px","250px");
	// console.log(inn[0]);
	if(toggle==false) {
		toggle = true;
		var thres = countOnMe*(countOnMe-3);
		for(var i=0;i<thres;i++) {
			removeEntity(globalScope["line"+i]);
		}
	}

    //remove border
    for(var i=0;i<countOnMe;i++) {
        sideScope["edge"+i].scale.set(0,0,0);
        var elem = document.getElementById("tex"+i);
        elem.parentNode.removeChild(elem);
    }
	//this.style.border = 0;
	//change text
	PIEscene.remove(myBall);
    var newSide = Math.floor(Math.random()*(10)+3);
	if(newSide == countOnMe) 
		countOnMe = Math.floor(Math.random()*(10)+3);
    else 
        countOnMe = newSide;

	PIEscene.remove(dot);

	var para2 =showMeMagicText("H6",arrayofShapes[countOnMe],"450px","460px");
	para2.style.cssText = 'position:absolute;top:490px;left:600px;font-family: "Avant Garde", Avantgarde, "Century Gothic", CenturyGothic, "AppleGothic", sans-serif;font-size: 25px;padding: 10px -80px;text-align: center;text-transform: uppercase;text-rendering: optimizeLegibility;';
	PIErender();
	myBall = createShapeGeometry(countOnMe, countOnMe,0.7);
    myBall.position.set(myBallX, myBallY+0.2, myBallZ);
   // myBall.scale.set(1.3,1.3,1.3);
	PIEaddElement(myBall);

	//add points
	var dotGeometry = new THREE.Geometry();
	for(var i=0;i<countOnMe;i++) {
		dotGeometry.vertices.push(new THREE.Vector3( vertices[i][0] + 2.0,vertices[i][1] + 1.7, myBallZ));
	}
	var dotMaterial = new THREE.PointsMaterial( { size: 3,  transparent: true,
		depthWrite: false, sizeAttenuation: false, color:0x000000 } );
	dot = new THREE.Points( dotGeometry, dotMaterial );
	PIEaddElement(dot);

    vertices = vertices.concat(vertices);
    PIEaddButton("hey");    


//adding names
    vertices = vertices.concat(vertices);
    for(var i=0;i<countOnMe;i++) {
        var text2 = document.createElement('div');
        text2.style.position = 'absolute';
        //text2.style.zIndex = 1;    // if you still don't see the label, try uncommenting this
        text2.style.width = 200;
        text2.style.height = 200;
        text2.style.fontWeight  =700;
        text2.style.fontSize= 700;
        text2.style.fontFamily = "Impact,Charcoal,sans-serif" ;
       // text2.style.backgroundColor = "blue";
        text2.innerHTML = dotNames[i];
        text2.style.top = -vertices[i][1]*260- vertices[i][1]*5 +320+'px';// vertices[i][1]+ (i*200)
        text2.style.left =  -vertices[i][0]*260+vertices[i][1]*5+ 680 +'px';//vertices[i][0]+ (i*200)
        text2.id = "tex"+i;
        document.body.appendChild(text2);
    }

    //add sides
    var p;
    var watch=0;
    for(p=0;p<countOnMe;p++) {
        var geometry = new THREE.Geometry();
        geometry.vertices.push(
            new THREE.Vector3( vertices[p][0], vertices[p][1], 0 ),
            new THREE.Vector3( vertices[p+1][0], vertices[p+1][1], 0 ),
            new THREE.Vector3( vertices[p+1][0], vertices[p+1][1], 0 )
        );
        var material =  new THREE.LineBasicMaterial({color: 0x000000, linewidth: 2.9});
        sideScope["edge"+watch] = new THREE.Line( geometry, material );
        sideScope["edge"+watch].position.set(myBallX, myBallY+0.2, 0.1);
        sideScope["edge"+watch].name = "edge"+watch;
        PIEaddElement(sideScope["edge"+watch]);
        sideScope["edge"+watch].receiveShadow=false;sideScope["edge"+watch].castShadow=false;
        watch+=1;
    }

	PIErender();
}



function showMeMagicDiagonal() {
	if(toggle) {
		toggle= false;
		vertices = vertices.concat(vertices);
		// console.table(vertices);
		var i,j,k,p;
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
				var material = new THREE.LineBasicMaterial({color: 0x6200EA});
				globalScope["line"+watch] = new THREE.Line( geometry, material );
				globalScope["line"+watch].position.set(myBallX, myBallY+0.2, 0.1);
				globalScope["line"+watch].name = "line"+watch;
				PIEaddElement(globalScope["line"+watch]);
				watch+=1;
			}
		}
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
	toggle4=true;
	count1+=1;
	if(toggle1) {
	//	if(count1%2==0)
			toggle1=false;
		// console.log(toggle1,count1);
		//angles
            var angle = Math.round((360/countOnMe)*100)/100;

		cc2 = cc2+1;
	//	if(cc2%2==0) {
			var iangle = Math.round((countOnMe-2) * (180 / countOnMe)*100)/100;
			var rad = iangle*Math.PI/180;
			var fact1 = rad-Math.PI/2;
			var geometry = new THREE.CircleGeometry( 0.13, 32,Math.PI/2+rad+ fact1,Math.PI-rad);
			var material = new THREE.MeshBasicMaterial( { color: 0xC0392B,transparent: true, opacity: 0.6} );
			circlee= new THREE.Mesh( geometry, material );
			circlee.position.set((myBallX)+vertices[0][0], (myBallY+0.2)+vertices[0][1], 0.1)
				PIEaddElement(circlee);
			circlee.name = 'circl';
	//	}
		PIErender();

    //text
    var para = showMeMagicText("H1",angle+"\xB0","270px","250px");   
    para.style.cssText = 'position:absolute;top:130px;left:845px;  font-family: "Avant Garde", Avantgarde, "Century Gothic", CenturyGothic, "AppleGothic", sans-serif;font-size: 22px;padding: 80px 50px;text-align: center;text-transform: uppercase;text-rendering: optimizeLegibility;';
     //   PIErender();
    }
    else {
    //    if(count1%2==0)
                toggle1=true;
        circlee.scale.set(0,0,0);
        var para = showMeMagicText("H1","","270px","250px");
    }
    PIErender();
}

function showMeMagicInterior() {
	toggle3=true;
//	count2+=1;
	if(toggle2) {
		//if(count2%2==0)
			toggle2=false;

		var angle = Math.round((countOnMe-2) * (180 / countOnMe)*100)/100;
		cc=cc+1;
		//if(cc%2==0) {
			scopeOther ={};
			var rad = angle*Math.PI/180;
			//circle
			var fact1 = 1/2;
			var fact2 = 0;
			for(i=0;i<countOnMe;i++) {
				var geometry = new THREE.CircleGeometry( 0.13, 32,(fact1*Math.PI+(fact2+(rad-Math.PI/2))),rad);
				var material = new THREE.MeshBasicMaterial( { color: 0x000000,transparent: true, opacity: 0.2} );
				scopeOther["circle"+i]= new THREE.Mesh( geometry, material );
				fact1=fact1-1/2;
				// if(fact2==1)
				fact2=fact2+(rad-Math.PI/2);
				scopeOther["circle"+i].position.set(myBallX+vertices[i][0], (myBallY+0.2)+vertices[i][1], 0.1)
					PIEaddElement(scopeOther["circle"+i]);
		//	}
		}
		PIErender();

		var para = showMeMagicText("H3",angle+"\xB0","270px","250px");   
		para.style.cssText = 'position:absolute;top:150px;left:540px; font-family: "Avant Garde", Avantgarde, "Century Gothic", CenturyGothic, "AppleGothic", sans-serif;font-size: 22px;padding: 80px 50px;text-align: center;text-transform: uppercase;text-rendering: optimizeLegibility;';
	}
	else {
	//	if(count2%2==0)
			toggle2=true;
        for(var j=0;j<countOnMe;j++) {
            scopeOther['circle'+j].scale.set(0,0,0);
        } 
		var para = showMeMagicText("H3","","270px","250px");
        PIErender();
	}
}



//***********************************************************************************************************
function initialiseControls()
{
    initialiseControlVariables();
    /* Create Input Panel */
    PIEaddDualCheckbox('Exterior Angles', false,showMeMagicExterior);
    PIEaddDualCheckbox('Interior Angles', false,showMeMagicInterior);
    PIEaddInputCommand('Show Diagonals',showMeMagicDiagonal);
    PIEaddInputCommand('Change',showMeMagicRight);
   // PIEaddInputCommand('Back',showMeMagicLeft);
}

// ********************************************************************************************************************
function initialiseHelp()
{
	helpContent="";
	helpContent = helpContent + "<h2> Regular polygons help</h2>";
	helpContent = helpContent + "<p> &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;<b>About the experiment: </b>The experiment shows regular polygons with different sides, their interior and exterior angles and their diagonals.</p>";
	helpContent = helpContent + "<h2>Controls</h2>";
	helpContent = helpContent + "<p> &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;<b>Reset: </b>It resets the experiment.</p>";
    helpContent = helpContent + "<p> &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;<b>Change: </b>To Change the number of sides.</p>";
    helpContent = helpContent + "<p> &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;<b>Interior Angles: </b>It shows all the interior angles in the polygon and displays its value.</p>";
    helpContent = helpContent + "<p> &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;<b>Exterior Angles: </b>It shows all the exterior angles in the polygon and displays its value.</p>";
	helpContent = helpContent + "<p> &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;<b>Diagonal: </b>It displays all the diagonals of the polygon.</p>";
	helpContent = helpContent + "<h2>Happy Experimenting</h2>";
	PIEupdateHelp(helpContent);
}

var infoContent;
function initialiseInfo()
{
	infoContent =  "";
	infoContent = infoContent + "<h2> Regular polygons concepts</h2>";
	infoContent = infoContent + "<b>About the experiment:</b>";
	infoContent = infoContent + "<p> &nbsp;&nbsp;&nbsp;A polygon is any 2-dimensional shape formed with straight lines. A regular polygon has all angles equal and all sides equal.</p>";
	infoContent = infoContent + "<p><b>Examples: &nbsp;&nbsp;&nbsp;</b>Triangles(3-sides), quadrilaterals(4-sides), pentagons(5-sides) and hexagons are all examples of regular polygons.</p>";
	infoContent = infoContent + "<p><b>Exterior Angle:</b> &nbsp;&nbsp;&nbsp; Each exterior angle of regular polygon is 360°/n (where n is the number of sides)</p>";
	infoContent = infoContent + "<p><b>Interior Angles:</b> &nbsp;&nbsp;&nbsp;Each interior angle of regular polygon is 180° − 360°/n (where n is the number of sides)</p>";
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
 

	//texts ----------------------------------------------------------------------
	var para = document.createElement("H6");
	para.textContent = "quadrilateral";
    para.style.cssText = 'position:absolute;top:490px;left:580px;font-family: "Avant Garde", Avantgarde, "Century Gothic", CenturyGothic, "AppleGothic", sans-serif;font-size: 25px;padding: 10px -80px;text-align: center;text-transform: uppercase;text-rendering: optimizeLegibility;';
	document.body.appendChild(para);
	// para.addEventListener("mouseover",hola);

	//exterior angle text
	var para2 = document.createElement("H1");
	para2.textContent = "";
	para2.style.cssText = 'position:absolute;top:270px;left:1200px;font-weight: bold;font-size:large;';
	document.body.appendChild(para2);
	//-------
	//interior angle text
	var para2 = document.createElement("H3");
	para2.textContent = "";
	para2.style.cssText = 'position:absolute;top:200px;left:300px;font-weight: bold;font-size:large;';
	document.body.appendChild(para2);
	//------
    //regular polygons
    var para4 = document.createElement("H4");
    para4.textContent = "Regular polygons";
    para4.style.cssText = 'position:absolute;top:70px;left:120px; font-family: "Avant Garde", Avantgarde, "Century Gothic", CenturyGothic, "AppleGothic", sans-serif;font-size: 32px;padding: 18px 1   5px;text-align: center;text-transform: uppercase;text-rendering: optimizeLegibility;color:#880E4F;';
    document.body.appendChild(para4);

    //vertices
    var para3 = document.createElement("H8");
    para3.textContent = "Vertices";
    para3.style.cssText = 'position:absolute;top:580px;left:355px; font-family: "Avant Garde", Avantgarde, "Century Gothic", CenturyGothic, "AppleGothic", sans-serif;font-size: 12px;padding: 8px 5px;text-align: center;text-transform: uppercase;text-rendering: optimizeLegibility;color:#880E4F;';
   // document.body.appendChild(para3);

	// Create Shape and add it to scene -------------------------------------------
	myBall = createShapeGeometry(countOnMe, countOnMe,0.7);
	myBall.position.set(myBallX, myBallY+0.2, myBallZ);
    myBall.receiveShadow = false;
    myBall.castShadow = false;
    	PIEaddElement(myBall); //2, 1.5, 0.1

	// dots ---------------------------------------------------------------------------------
	var dotGeometry = new THREE.Geometry();
	for(var i=0;i<countOnMe;i++) {
		dotGeometry.vertices.push(new THREE.Vector3( vertices[i][0] + 2.0,vertices[i][1] + 1.7, myBallZ));
	}
	//  console.table(vertices);
	var dotMaterial = new THREE.PointsMaterial( { size: 3,  transparent: true,
		depthWrite: false, sizeAttenuation: false, color:0x000000 } );
	dot = new THREE.Points( dotGeometry, dotMaterial );
	PIEaddElement(dot);

//adding names
     vertices = vertices.concat(vertices);
    for(var i=countOnMe-1;i>=0;i--) {
        var text2 = document.createElement('div');
        text2.style.position = 'absolute';
        text2.style.width = 200;
        text2.style.height = 200;
        text2.style.fontWeight  =700;
        text2.style.fontSize= 700;
        text2.style.fontFamily = "Impact,Charcoal,sans-serif" ;
       // text2.style.backgroundColor = "blue";
        text2.innerHTML = dotNames[i];
        text2.style.top = -vertices[i][1]*260- vertices[i][1]*5 +320+'px';// vertices[i][1]+ (i*200)
        text2.style.left =  -vertices[i][0]*260+vertices[i][1]*5+ 680 +'px';//vertices[i][0]+ (i*200)
        text2.id = "tex"+i;
        document.body.appendChild(text2);
    }


//drawing sides border---------------------------------------------------------------------------------------
    var p;
    var watch=0;
    for(p=0;p<countOnMe;p++) {
        var geometry = new THREE.Geometry();
        geometry.vertices.push(
            new THREE.Vector3( vertices[p][0], vertices[p][1], 0 ),
            new THREE.Vector3( vertices[p+1][0], vertices[p+1][1], 0 ),
            new THREE.Vector3( vertices[p+1][0], vertices[p+1][1], 0 )
        );
        var material =  new THREE.LineBasicMaterial({color: 0x000000, linewidth: 2.9});
        sideScope["edge"+watch] = new THREE.Line( geometry, material );
        sideScope["edge"+watch].position.set(myBallX, myBallY+0.2, 0.1);
        sideScope["edge"+watch].name = "edge"+watch;
        PIEaddElement(sideScope["edge"+watch]);
        sideScope["edge"+watch].receiveShadow=false;sideScope["edge"+watch].castShadow=false;
        watch+=1;
    }
        console.table(sideScope);

	//my back ------------------------------------------------------------------------------
	geometry = new THREE.BoxGeometry( mySceneW * 2, mySceneH * 2, wallThickness );
	material = new THREE.MeshLambertMaterial( {color:0xF9BF3B} );
	myBack = new THREE.Mesh( geometry, material );
	myBack.position.set(myCenterX, myCenterY, -0.0001);
	myBack.scale.set( 1.3, 1, 1);
	myBack.name="hola"; //test
	PIEaddElement(myBack);
    myBack.receiveShadow = false;
    myBack.castShadow = false;

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
	//resetExperiment();
    initialiseControls();
	// // update positions
	//     updatePositions();
	//  initialiseInfo();
	//  initialiseHelp();
}

// ********************************************************************************************************************


function resetExperiment()
{
PIEchangeDisplayCheckbox('Show Diagonals', false);
PIEchangeDisplayCheckbox('Exterior Angles', false);
PIEchangeDisplayCheckbox('Interior Angles', false);
     for(var i=0;i<countOnMe;i++) {
        sideScope["edge"+i].scale.set(0,0,0);
        var elem = document.getElementById("tex"+i);
        elem.parentNode.removeChild(elem);
    }
    //angles
    if(toggle3) {
        toggle3=false;
        for(var j=0;j<countOnMe;j++) {
            scopeOther['circle'+j].scale.set(0,0,0);} }
    if(toggle4) {
        toggle4=false
            circlee.scale.set(0,0,0);}
    //diagonals
        if(toggle==false) {
        toggle = true;
        var thres = countOnMe*(countOnMe-3);
        for(var i=0;i<thres;i++) {
            removeEntity(globalScope["line"+i]);
        }
    }

//toggle button
    var inn = document.getElementsByTagName('input');
    // console.log(inn[0]);
    inn[0].checked = false;
    inn[1].checked = false;

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
	myBall = createShapeGeometry(countOnMe, countOnMe,0.7);
	PIEaddElement(myBall);


    //dots
    var dotGeometry = new THREE.Geometry();
    for(var i=0;i<countOnMe;i++) {
        dotGeometry.vertices.push(new THREE.Vector3( vertices[i][0] + 2.0,vertices[i][1] + 1.7, myBallZ));
    }
    //  console.table(vertices);
    var dotMaterial = new THREE.PointsMaterial( { size: 3,  transparent: true,
        depthWrite: false, sizeAttenuation: false, color:0x000000 } );
    dot = new THREE.Points( dotGeometry, dotMaterial );
    PIEaddElement(dot);
    console.log(vertices);



	//text underneath
	var para2 =showMeMagicText("H6",arrayofShapes[countOnMe],"450px","460px");
    para2.style.cssText = 'position:absolute;top:490px;left:600px;font-family: "Avant Garde", Avantgarde, "Century Gothic", CenturyGothic, "AppleGothic", sans-serif;font-size: 25px;padding: 10px -80px;text-align: center;text-transform: uppercase;text-rendering: optimizeLegibility;';
    var para = showMeMagicText("H1","","270px","250px");
    var para = showMeMagicText("H3","","270px","250px");
    myBall.position.set(myBallX, myBallY+0.2, myBallZ);
	myBack.position.set(myCenterX, myCenterY, -0.0001);

	/* Reset Wall position */
	/* Floor */
//adding names
     vertices = vertices.concat(vertices);
    for(var i=countOnMe-1;i>=0;i--) {
        var text2 = document.createElement('div');
        text2.style.position = 'absolute';
        text2.style.width = 200;
        text2.style.height = 200;
        text2.style.fontWeight  =700;
        text2.style.fontSize= 700;
        text2.style.fontFamily = "Impact,Charcoal,sans-serif" ;
       // text2.style.backgroundColor = "blue";
        text2.innerHTML = dotNames[i];
        text2.style.top = -vertices[i][1]*260- vertices[i][1]*5 +320+'px';// vertices[i][1]+ (i*200)
        text2.style.left =  -vertices[i][0]*260+vertices[i][1]*5+ 680 +'px';//vertices[i][0]+ (i*200)
        text2.id = "tex"+i;
        document.body.appendChild(text2);
    }


//drawing sides border---------------------------------------------------------------------------------------
    var p;
    var watch=0;
    for(p=0;p<countOnMe;p++) {
        var geometry = new THREE.Geometry();
        geometry.vertices.push(
            new THREE.Vector3( vertices[p][0], vertices[p][1], 0 ),
            new THREE.Vector3( vertices[p+1][0], vertices[p+1][1], 0 ),
            new THREE.Vector3( vertices[p+1][0], vertices[p+1][1], 0 )
        );
        var material =  new THREE.LineBasicMaterial({color: 0x000000, linewidth: 2.9    });
        sideScope["edge"+watch] = new THREE.Line( geometry, material );
        sideScope["edge"+watch].position.set(myBallX, myBallY+0.2, 0.1);
        sideScope["edge"+watch].name = "edge"+watch;
        PIEaddElement(sideScope["edge"+watch]);
        sideScope["edge"+watch].receiveShadow=false;sideScope["edge"+watch].castShadow=false;
        watch+=1;
    }

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

