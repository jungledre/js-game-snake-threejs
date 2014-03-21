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

require(['three', 'json!meshes/monky.json'], function(THREE, MonkyModel) {
    'use strict';

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    var renderer = new THREE.CanvasRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    camera.position.z = 5;

    var loader = new THREE.JSONLoader();
    var model = loader.parse(MonkyModel, 'js/meshes');
    var monky = new THREE.Mesh(model.geometry, new THREE.MeshFaceMaterial(model.materials));
    scene.add(monky);

    var render = function () {
        requestAnimationFrame(render);
        monky.rotation.y += 0.01;

        renderer.render(scene, camera);
    };

    render();
});
