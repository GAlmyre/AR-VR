var displayParameters = {

  // parameters for stereo rendering
  // physical screen diagonal -- in mm
  screenDiagonal: 610,
  screenResolutionWidth: 1920,

  aspectRatio: 1.78,

  // inter pupillar distance -- in mm
  ipd: 64,

  // distance bewteen the viewer and the screen -- in mm
  distanceScreenViewer: 500,

  pixelPitch: function() {
    height = this.screenResolutionWidth*this.aspectRatio;
    diagResolution = Math.sqrt(height*height+this.screenResolutionWidth*this.screenResolutionWidth);

    return this.screenDiagonal/diagResolution;
  },

  screenSize: function() {
    return new THREE.Vector2(531,299);
  }

  // confusion circle : (value in pixels, to multiply by pixelPitch)
  // 25cm : b = (|250-500|*4)/250 = 4
  // 50cm : b = 0
  // 75cm : b = 1.3333
  // 100cm : b = 2
  // 250cm : b = 4
};
