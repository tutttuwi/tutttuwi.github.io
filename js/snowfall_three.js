var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;

//three.jsを利用するために変数をいくつか設定
var container;
var particle;
var camera;
var scene;
var renderer;

var mouseX = 0;
var mouseY = 0;
var snownum = 20;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var particles = [];

function init(event, type) {
  //画像設定
  var particleImage = new Image();
  if (!type) type = judgeNowParticle();
  switch (type) {
    case PARTICLE_SPRING:
      particleImage.src = "img/spring_30_30.png";
      break;
    case PARTICLE_SUMMER:
      particleImage.src = "img/summer_30_30.png";
      break;
    case PARTICLE_FALL:
      particleImage.src = "img/fall_30_23.png";
      break;
    case PARTICLE_WINTER:
      particleImage.src = "img/snow.png";
      break;
  }

  container = document.createElement("div");
  //自動で作成されるdiv要素にid追加
  container.id = "snow_canvas";
  // body要素の中にdivを追加
  document.body.appendChild(container);
  camera = new THREE.PerspectiveCamera(75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000);
  //カメラの位置を設定
  camera.position.z = 1000;

  scene = new THREE.Scene();
  scene.add(camera);

  renderer = new THREE.CanvasRenderer();
  //rendererのサイズを画面サイズにする
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
  var material = new THREE.ParticleBasicMaterial({ map: new THREE.Texture(particleImage) });

  for (var i = 0; i < snownum; i++) {
    particle = new Particle3D(material);
    particle.position.x = Math.random() * 2500 - 1000;
    particle.position.y = Math.random() * 2500 - 1800;
    particle.position.z = Math.random() * 2500 - 1050;
    particle.scale.x = particle.scale.y = 1;
    scene.add(particle);

    particles.push(particle);
  }

  container.appendChild(renderer.domElement);
  container.addEventListener("mousemove", onDocumentMouseMove, false);
  container.addEventListener("touchstart", onDocumentTouchStart, false);
  container.addEventListener("touchmove", onDocumentTouchMove, false);
  window.particle_interval = setInterval(loop, 1000 / 60);
}

function onDocumentMouseMove(event) {
  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;
}

function onDocumentTouchStart(event) {
  if (event.touches.length == 1) {
    event.preventDefault();
    mouseX = event.touches[0].pageX - windowHalfX;
    mouseY = event.touches[0].pageY - windowHalfY;
  }
}

function onDocumentTouchMove(event) {
  if (event.touches.length == 1) {
    event.preventDefault();
    mouseX = event.touches[0].pageX - windowHalfX;
    mouseY = event.touches[0].pageY - windowHalfY;
  }
}

function loop() {
  for (var i = 0; i < particles.length; i++) {
    var particle = particles[i];
    particle.updatePhysics();

    with (particle.position) {
      if (y < -1000) y += 2000;
      if (x > 1000) x -= 2000;
      else if (x < -1000) x += 2000;
      if (z > 1000) z -= 2000;
      else if (z < -1000) z += 2000;
    }
  }

  camera.position.x += (mouseX - camera.position.x) * 0.05;
  camera.position.y += (-mouseY - camera.position.y) * 0.05;
  camera.lookAt(scene.position);

  renderer.render(scene, camera);
}
//initの呼び出し
if (window.addEventListener) {
  window.addEventListener("load", init, false);
} else if (window.attachEvent) {
  window.attachEvent("onload", init);
} else {
  window.onload = init;
}

// 個別設定
var PARTICLE_SPRING = "spring";
var PARTICLE_SUMMER = "summer";
var PARTICLE_FALL = "fall";
var PARTICLE_WINTER = "winter";

/**
 * パーティクル削除処理
 */
function removeParticle() {
  $("#snow_canvas").remove();
  clearInterval(window.particle_interval);
}

/**
 * パーティクル切替処理
 */
function changeParticle(type) {
  removeParticle();
  switch (type) {
    case PARTICLE_SPRING:
      init(null, PARTICLE_SPRING);
      break;
    case PARTICLE_SUMMER:
      init(null, PARTICLE_SUMMER);
      break;
    case PARTICLE_FALL:
      init(null, PARTICLE_FALL);
      break;
    case PARTICLE_WINTER:
      init(null, PARTICLE_WINTER);
      break;
    default:
      changeNowParticle();
      break;
  }
}

function judgeNowParticle() {
  var mm = new Date().getMonth() + 1; // ajust month number
  if (4 <= mm && mm <= 6) {
    return PARTICLE_SPRING;
  } else if (7 <= mm && mm <= 9) {
    return PARTICLE_SUMMER;
  } else if (10 <= mm && mm <= 12) {
    return PARTICLE_FALL;
  } else if (1 <= mm && mm <= 3) {
    return PARTICLE_WINTER;
  } else {
    return PARTICLE_SPRING;
  }
}

function changeNowParticle() {
  removeParticle();
  init();
}
