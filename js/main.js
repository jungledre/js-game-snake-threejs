require.config({
    baseUrl: "js",
    paths: {
        three: 'vendor/three.js/three.min',
        text: 'vendor/requirejs-text/text',
        json: 'vendor/requirejs-plugins/src/json'
    },
    shim: {
        three: {
            exports: 'THREE'
        }
    }
});

require(['three', 'json!model.js', 'json!sus.js'], function(THREE, model, sus) {
    'use strict';

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

    var renderer = new THREE.CanvasRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    var geometry = new THREE.CubeGeometry(1,1,1);
    var material = new THREE.MeshBasicMaterial({color: 0xff0000});
    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    var loader = new THREE.JSONLoader();
    var myModel = loader.parse(model);
    var cube2 = new THREE.Mesh(myModel.geometry, myModel.material);
    cube2.position.x = -2;
    scene.add(cube2);

    var myModel = loader.parse(sus);
    var sus = new THREE.Mesh(myModel.geometry, myModel.material);
    sus.position.x = 2
    scene.add(sus);


    var render = function () {
        requestAnimationFrame(render);

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        sus.rotation.y += 0.01;

        renderer.render(scene, camera);
    };

    render();
});
