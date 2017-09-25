var container, stats, scene, camera, renderer, controls, clock;

function TNT() {
  var levelHalfLength = 9;

  // create the TNT cube
  // load the textures
  var loader = new THREE.TextureLoader();
  var tntTexture1 = loader.load('textures/tnt1.png');
  var tntTexture2 = loader.load('textures/tnt2.png');
  var material1 = new THREE.MeshBasicMaterial( {map: tntTexture1} );
  var material2 = new THREE.MeshBasicMaterial( {map: tntTexture2} );
  var matArray = new Array(material1,material1,material2,material2,material1,material1);
  // create the mesh from geometry and the material
  var geometry = new THREE.BoxGeometry(1, 1, 1);
  var tntCube = new THREE.Mesh(geometry, matArray);
  scene.add(tntCube);

  // create the level
  var stoneTexture = loader.load('textures/stonebrick.png');
  var mossTexture = loader.load('textures/stonebrick_mossy.png');
  var sandTexture = loader.load('textures/sand.png')
  var stoneMat = new THREE.MeshBasicMaterial( {map: stoneTexture} );
  var mossMat = new THREE.MeshBasicMaterial( {map: mossTexture} );
  var sandMat = new THREE.MeshBasicMaterial( {map: sandTexture} );

  for (var i = -levelHalfLength; i <= levelHalfLength  ; i++) {
    for (var j = -levelHalfLength; j <= levelHalfLength ; j++) {

      var randMatArray = new Array(6);
      for (var k = 0; k < randMatArray.length; k++) {
        var rand = Math.floor(Math.random() * 2);
        if (rand == 1)
          randMatArray[k] = stoneMat;
        else
          randMatArray[k] = mossMat;
      }

      var stoneCube = new THREE.Mesh(geometry, randMatArray);
      stoneCube.position.x = i;
      stoneCube.position.z = j;
      stoneCube.position.y = -1;
      scene.add(stoneCube);
    }
  }
  for (var i = -levelHalfLength; i <= levelHalfLength  ; i++) {
    for (var j = -levelHalfLength; j <= levelHalfLength ; j++) {
      var stoneCube = new THREE.Mesh(geometry, sandMat);
      stoneCube.position.x = i;
      stoneCube.position.z = j;
      stoneCube.position.y = -2;
      scene.add(stoneCube);
    }
  }
}

function init() {

  velocity = new THREE.Vector3();
  clock = new THREE.Clock();
  container = document.createElement( 'div' );
  document.body.appendChild( container );

  // stats
  stats = new Stats();
  container.appendChild( stats.dom );

  // setup the scene, camera and renderer for the app
  scene = new THREE.Scene();
  UIscene = new THREE.Scene();
  var lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });

  var lineGeometry = new THREE.Geometry();
  lineGeometry.vertices.push(new THREE.Vector3(10, 0, 0));
  lineGeometry.vertices.push(new THREE.Vector3(-10, 0, 0));
  var line = new THREE.Line(lineGeometry, lineMaterial);
  UIscene.add(line);
  var lineGeometry2 = new THREE.Geometry();
  lineGeometry2.vertices.push(new THREE.Vector3(0, 10, 0));
  lineGeometry2.vertices.push(new THREE.Vector3(0, -10, 0));
  var line2 = new THREE.Line(lineGeometry2, lineMaterial);
  UIscene.add(line2);

  width = window.innerWidth;
  height = window.innerHeight;
  camera = new THREE.PerspectiveCamera( 75, width/height, 0.1, 1000 );
  orthoCam = new THREE.OrthographicCamera(width/-2, width/2, height/2, height/-2, 0.1, 1000);
  orthoCam.position.z = 10;
  renderer = new THREE.WebGLRenderer();
  renderer.autoClear = false
  renderer.setSize(width, height);
  document.body.appendChild(renderer.domElement);

  // create the controls
  controls = new THREE.PointerLockControls( camera, renderer.domElement );
  controls.enabled = true;
  scene.add( controls.getObject() );

  TNT();

  // handles the controls to move the camera
  moveForward = moveBackward = moveLeft = moveRight = false;

  document.addEventListener("keydown", function(e){
    if (e.keyCode == 83) {
      moveForward = true;
    }
    if (e.keyCode == 90) {
      moveBackward = true;
    }
    if (e.keyCode == 68) {
      moveLeft = true;
    }
    if (e.keyCode == 81) {
      moveRight = true;
    }
  });

  document.addEventListener("keyup", function(e){
    if (e.keyCode == 83) {
      moveForward = false;
    }
    if (e.keyCode == 90) {
      moveBackward = false;
    }
    if (e.keyCode == 68) {
      moveLeft = false;
    }
    if (e.keyCode == 81) {
      moveRight = false;
    }
  });
}

function animate() {

  stats.update();
  //controls.update(clock.getDelta());

  var delta = clock.getDelta();
  velocity.x -= velocity.x * 10.0 * delta;
  velocity.z -= velocity.z * 10.0 * delta;

  if ( moveForward ) velocity.z += 40.0 * delta;
  if ( moveBackward ) velocity.z -= 40.0 * delta;
  if ( moveLeft ) velocity.x += 40.0 * delta;
  if ( moveRight ) velocity.x -= 40.0 * delta;

  controls.getObject().translateX( velocity.x * delta );
	controls.getObject().translateZ( velocity.z * delta );

  controls.getObject().rotation;
  requestAnimationFrame(animate);
  renderer.clear();
  renderer.render(scene, camera);
  renderer.clearDepth();
  renderer.render(UIscene, orthoCam);
}
