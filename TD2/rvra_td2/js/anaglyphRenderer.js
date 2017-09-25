function AnaglyphRenderer ( renderer ) {

  // left and right cameras
  this.cameraLeft  = new THREE.Camera();
  this.cameraLeft.matrixAutoUpdate = false;
  this.cameraRight = new THREE.Camera();
  this.cameraRight.matrixAutoUpdate = false;


	this.update = function ( camera ) {

    var ipd = displayParameters.ipd;
    camera.updateMatrixWorld();
    // 29*41.5

    var viewMatLeft = camera.matrixWorld.clone();
    var viewMatRight = camera.matrixWorld.clone();

    var w = displayParameters.screenSize().x;
    var h = displayParameters.screenSize().y;
    var distanceScreenViewer = displayParameters.distanceScreenViewer;
    var znear = camera.near;
    var zfar = camera.far;
    var top = znear*(1.*h/(2*distanceScreenViewer));
    var bottom = -znear*(1.*h/(2*distanceScreenViewer));
    var rightL = znear*((1.*(w+ipd)/(2*distanceScreenViewer)));
    var leftL = -znear*((1.*(w-ipd)/(2*distanceScreenViewer)));
    var rightR = znear*((1.*(w-ipd)/(2*distanceScreenViewer)));
    var leftR = -znear*((1.*(w+ipd)/(2*distanceScreenViewer)));

    this.cameraLeft.matrixWorld = viewMatLeft;
    this.cameraLeft.translateX(1.*(-ipd)/2);
    this.cameraRight.matrixWorld = viewMatRight;
    this.cameraRight.translateX(1.*ipd/2);

		var projMatLeft = new THREE.Matrix4().makePerspective( leftL, rightL, top, bottom, znear, zfar );
		var projMatRight = new THREE.Matrix4().makePerspective( leftR, rightR, top, bottom, znear, zfar );

		this.cameraLeft.projectionMatrix = projMatLeft;
		this.cameraRight.projectionMatrix = projMatRight;
	}

  this.render = function ( scene, camera) {
    this.update(camera);
    var gl = renderer.domElement.getContext('webgl');
    gl.colorMask(true, false, false, false);
    renderer.render(scene, this.cameraRight);
    renderer.clearDepth();
    gl.colorMask(false, true, true, false);
    renderer.render(scene, this.cameraLeft);
  }

}
