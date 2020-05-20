function main()
{
    var width = 500;
    var height = 500;

    var scene = new THREE.Scene();

    var fov = 45;
    var aspect = width / height;
    var near = 1;
    var far = 1000;
    var camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
    camera.position.set( 0, 0, 5 );
    scene.add( camera );

    var light = new THREE.PointLight();
    light.position.set( 5, 5, 5 );
    scene.add( light );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( width, height );
    document.body.appendChild( renderer.domElement );

    var vertices = [
        [ 1, 1, 1 ], // v0
        [ -1, 1, 1 ], // v1
        [ -1, -1, 1 ],  // v2
        [ 1, -1, 1 ],  // v3
        [ 1, 1, -1 ],  // v4
        [ -1, 1, -1 ],  // v5
        [ -1, -1, -1 ],  // v6
        [ 1, -1, -1 ]  // v7
    ];

    var faces =[
    [ 1, 0, 4 ], // f0
    [ 1, 4, 5 ], // f1
    [ 2, 1, 5 ], // f2
    [ 2, 5, 6 ], // f3
    [ 5, 4, 6 ], // f4
    [ 6, 4, 7 ], // f5
    [ 4, 0, 7 ], // f6
    [ 0, 3, 7 ], // f7
    [ 6, 7, 2 ], // f8
    [ 7, 3, 2 ], // f9
    [ 1, 2, 3 ], // f10
    [ 3, 0, 1 ], // f11
  ];

    var geometry = new THREE.Geometry();
    for( var i=0;i<vertices.length;i++){
      var v= new THREE.Vector3().fromArray( vertices[i]);
      geometry.vertices.push(v);
    }
    for( var i=0;i<faces.length;i++){
      var id =faces[i];
      var f=new THREE.Face3(id[0],id[1],id[2]);
      geometry.faces.push(f);
    }

    //    var material = new THREE.MeshBasicMaterial();
    var material = new THREE.MeshLambertMaterial();
    material.vertexColors=THREE.FaceColors;
    for ( var i = 0; i < faces.length; i++ )
      {
          geometry.faces[i].color = new THREE.Color( 1, 1, 1 );
      }

    geometry.computeFaceNormals();

    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    loop();

    function loop()
    {
        requestAnimationFrame( loop );
        cube.rotation.x += 0.005;
        cube.rotation.y += 0.02;
        renderer.render( scene, camera );
    }
}
