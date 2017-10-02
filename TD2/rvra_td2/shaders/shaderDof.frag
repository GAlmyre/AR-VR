uniform mat4 projectionMatrix2;
uniform mat4 inverseProjectionMatrix;

uniform float focusDistance;
uniform float pupilDiameter;
uniform float pixelPitch;

uniform vec2 gazePos;

uniform sampler2D colorMap;
uniform sampler2D depthMap;
uniform vec2 textureSize;

uniform float zfar;
uniform float znear;

varying vec2 vUv;

float distToFrag( float z_buffer ) {
	float normalizedZ=texture(depthMap,vUv).x;
	return ((2*zfar*znear)/(zfar-znear))*1/(normalizedZ-((zfar+znear)/(zfar-znear)));
}

// TODO: circle of confusion computation
float computeCoC( float fragDist, float focusDist ) {
 return 0.0;
}

// TODO: adaptive blur computation
vec4 computeBlur( float radius ) {
	return vec4(0,0,0,0);
}

void main() {
	gl_FragColor = texture2D( colorMap, vUv );
}
