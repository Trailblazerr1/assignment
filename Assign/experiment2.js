var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


// var geometry = new THREE.Geometry();
// geometry.vertices.push(
//     new THREE.Vector3(-5,5,0),
//     new THREE.Vector3(-5,-5,0),
//     new THREE.Vector3(5,-5,0)
// );
// geometry.faces.push(new THREE.Face3(0,1,2));

// var geometry = new THREE.BufferGeometry();
// var vertices = new Float32Array([
//     -10.0,-10.0,0.0,
//     10.0,-10.0,0.0,
//     10.0,10.0,0.0,
//     10.0,10.0,10.0,0.0
// ]);
// geometry.addAttribute('position',new THREE.BufferAttribute(vertices, 4));


/*var geometry = new THREE.PlaneGeometry(10,10);
*/

    var x = 0;
    var y = 0;
    var heartShape = new THREE.Shape();
    heartShape.moveTo( x + 25, y + 25 );
    heartShape.bezierCurveTo( x + 25, y + 25, x + 20, y, x, y );
    heartShape.bezierCurveTo( x - 30, y, x - 30, y + 35,x - 30,y + 35 );
    heartShape.bezierCurveTo( x - 30, y + 55, x - 10, y + 77, x + 25, y + 95 );
    heartShape.bezierCurveTo( x + 60, y + 77, x + 80, y + 55, x + 80, y + 35 );
    heartShape.bezierCurveTo( x + 80, y + 35, x + 80, y, x + 50, y );
    heartShape.bezierCurveTo( x + 35, y, x + 25, y + 25, x + 25, y + 25 );
    var extrudeSettings = { amount: 8, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
    //var geometry = new THREE.ExtrudeGeometry( heartShape, extrudeSettings );    //ExtrudeGeometry(shapes, options)
    var geometry = new THREE.ShapeGeometry( heartShape, extrudeSettings );          //ShapeGeometry(shapes, options)

var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

var render = function () {
    requestAnimationFrame( render );

    renderer.render(scene, camera);
};

render();