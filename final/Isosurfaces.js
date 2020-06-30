function Isosurfaces( volume, isovalue, screen, number,colormap)
{
    var cmap = [];

    switch(colormap){
      case 1:
    for ( var i = 0; i < 256; i++ )
    {
    var S = i / 255.0; // [0,1]
    var R = Math.max( Math.cos( ( S - 1.0 )*Math.PI ), 0.0 );
    var G = Math.max( Math.cos( ( S - 0.5 )*Math.PI ), 0.0 );
    var B = Math.max( Math.cos( S * Math.PI ), 0.0 );
    var color = new THREE.Color( R, G, B );
    cmap.push( [ S, '0x' + color.getHexString() ] );
    }
    break;
      case 2:
   for ( var i = 0; i < 256; i++ )
   {
       var S = i / 255.0; // [0,1]
       var R = 1-S;
       var B = 1-S;
       var color = new THREE.Color( R, 1, B );
       cmap.push( [ S, '0x' + color.getHexString() ] );
   }
   break;
 }

    var geometry = new THREE.Geometry();
    switch(number){

      case 1: //PhongShading-PhongReflection
      var material = new THREE.ShaderMaterial({
          vertexColors: THREE.VertexColors,
          vertexShader: document.getElementById('phong1.vert').text,
          fragmentShader: document.getElementById('phong1.frag').text,
          uniforms: {
          light_position: { type: 'v3', value: screen.light.position },
          camera_position: { type: 'v3', value: screen.camera.position},
          mcolor: {type: 'v3', value: new THREE.Color().setHex(cmap[isovalue][1])}
          }
      });
      break;

      case 2: //GouraudShading-PhongReflection
      var material = new THREE.ShaderMaterial({
          vertexColors: THREE.VertexColors,
          vertexShader: document.getElementById('gouraud1.vert').text,
          fragmentShader: document.getElementById('gouraud1.frag').text,
          uniforms: {
          light_position: { type: 'v3', value: screen.light.position },
          camera_position: { type: 'v3', value: screen.camera.position},
          mcolor: {type: 'v3', value: new THREE.Color().setHex(cmap[isovalue][1])}
          }
      });
      break;

      case 3: //PhongShading-LambertianReflection
      var material = new THREE.ShaderMaterial({
          vertexColors: THREE.VertexColors,
          vertexShader: document.getElementById('phong2.vert').text,
          fragmentShader: document.getElementById('phong2.frag').text,
          uniforms: {
          light_position: { type: 'v3', value: screen.light.position },
          mcolor: {type: 'v3', value: new THREE.Color().setHex(cmap[isovalue][1])}
          }
      });
      break;

      case 4: //GouraudShading-LambertianReflection
      var material = new THREE.ShaderMaterial({
          vertexColors: THREE.VertexColors,
          vertexShader: document.getElementById('gouraud2.vert').text,
          fragmentShader: document.getElementById('gouraud2.frag').text,
          uniforms: {
          light_position: { type: 'v3', value: screen.light.position },
          mcolor: {type: 'v3', value: new THREE.Color().setHex(cmap[isovalue][1])}
          }
      });
      break;

      case 5: //
      var material = new THREE.ShaderMaterial({
          vertexColors: THREE.VertexColors,
          vertexShader: document.getElementById('phong3.vert').text,
          fragmentShader: document.getElementById('phong3.frag').text,
          uniforms: {
          light_position: { type: 'v3', value: screen.light.position },
          camera_position: { type: 'v3', value: screen.camera.position},
          mcolor: {type: 'v3', value: new THREE.Color().setHex(cmap[isovalue][1])}
          }
      });
      break;

      case 6: //GouraudShading-PhongReflection
      var material = new THREE.ShaderMaterial({
          vertexColors: THREE.VertexColors,
          vertexShader: document.getElementById('gouraud3.vert').text,
          fragmentShader: document.getElementById('gouraud3.frag').text,
          uniforms: {
          light_position: { type: 'v3', value: screen.light.position },
          camera_position: { type: 'v3', value: screen.camera.position},
          mcolor: {type: 'v3', value: new THREE.Color().setHex(cmap[isovalue][1])}
          }
      });
      break;

      case 7: //
      var material = new THREE.ShaderMaterial({
          vertexColors: THREE.VertexColors,
          vertexShader: document.getElementById('phong4.vert').text,
          fragmentShader: document.getElementById('phong4.frag').text,
          uniforms: {
          light_position: { type: 'v3', value: screen.light.position },
          camera_position: { type: 'v3', value: screen.camera.position},
          mcolor: {type: 'v3', value: new THREE.Color().setHex(cmap[isovalue][1])}
          }
      });
      break;

      case 8: //GouraudShading-PhongReflection
      var material = new THREE.ShaderMaterial({
          vertexColors: THREE.VertexColors,
          vertexShader: document.getElementById('gouraud4.vert').text,
          fragmentShader: document.getElementById('gouraud4.frag').text,
          uniforms: {
          light_position: { type: 'v3', value: screen.light.position },
          camera_position: { type: 'v3', value: screen.camera.position},
          mcolor: {type: 'v3', value: new THREE.Color().setHex(cmap[isovalue][1])}
          }
      });
      break;
    }
    var smin = volume.min_value;
    var smax = volume.max_value;
    isovalue = KVS.Clamp( isovalue, smin, smax );

    var lut = new KVS.MarchingCubesTable();
    var cell_index = 0;
    var counter = 0;
    for ( var z = 0; z < volume.resolution.z - 1; z++ )
    {
        for ( var y = 0; y < volume.resolution.y - 1; y++ )
        {
            for ( var x = 0; x < volume.resolution.x - 1; x++ )
            {
                var indices = cell_node_indices( cell_index++ );
                var index = table_index( indices );
                if ( index == 0 ) { continue; }
                if ( index == 255 ) { continue; }

                for ( var j = 0; lut.edgeID[index][j] != -1; j += 3 )
                {
                    var eid0 = lut.edgeID[index][j];
                    var eid1 = lut.edgeID[index][j+2];
                    var eid2 = lut.edgeID[index][j+1];

                    var vid0 = lut.vertexID[eid0][0];
                    var vid1 = lut.vertexID[eid0][1];
                    var vid2 = lut.vertexID[eid1][0];
                    var vid3 = lut.vertexID[eid1][1];
                    var vid4 = lut.vertexID[eid2][0];
                    var vid5 = lut.vertexID[eid2][1];

                    var v0 = new THREE.Vector3( x + vid0[0], y + vid0[1], z + vid0[2] );
                    var v1 = new THREE.Vector3( x + vid1[0], y + vid1[1], z + vid1[2] );
                    var v2 = new THREE.Vector3( x + vid2[0], y + vid2[1], z + vid2[2] );
                    var v3 = new THREE.Vector3( x + vid3[0], y + vid3[1], z + vid3[2] );
                    var v4 = new THREE.Vector3( x + vid4[0], y + vid4[1], z + vid4[2] );
                    var v5 = new THREE.Vector3( x + vid5[0], y + vid5[1], z + vid5[2] );

                    var v01 = interpolated_vertex( v0, v1, isovalue );
                    var v23 = interpolated_vertex( v2, v3, isovalue );
                    var v45 = interpolated_vertex( v4, v5, isovalue );

                    geometry.vertices.push( v01 );
                    geometry.vertices.push( v23 );
                    geometry.vertices.push( v45 );

                    var id0 = counter++;
                    var id1 = counter++;
                    var id2 = counter++;
                    geometry.faces.push( new THREE.Face3( id0, id1, id2 ) );
                }
            }
            cell_index++;
        }
        cell_index += volume.resolution.x;
    }

    geometry.computeVertexNormals();


      material.color = new THREE.Color().setHex(cmap[isovalue][1]);

    return new THREE.Mesh( geometry, material );


    function cell_node_indices( cell_index )
    {
        var lines = volume.resolution.x;
        var slices = volume.resolution.x * volume.resolution.y;

        var id0 = cell_index;
        var id1 = id0 + 1;
        var id2 = id1 + lines;
        var id3 = id0 + lines;
        var id4 = id0 + slices;
        var id5 = id1 + slices;
        var id6 = id2 + slices;
        var id7 = id3 + slices;

        return [ id0, id1, id2, id3, id4, id5, id6, id7 ];
    }

    function table_index( indices )
    {
        var s0 = volume.values[ indices[0] ][0];
        var s1 = volume.values[ indices[1] ][0];
        var s2 = volume.values[ indices[2] ][0];
        var s3 = volume.values[ indices[3] ][0];
        var s4 = volume.values[ indices[4] ][0];
        var s5 = volume.values[ indices[5] ][0];
        var s6 = volume.values[ indices[6] ][0];
        var s7 = volume.values[ indices[7] ][0];

        var index = 0;
        if ( s0 > isovalue ) { index |=   1; }
        if ( s1 > isovalue ) { index |=   2; }
        if ( s2 > isovalue ) { index |=   4; }
        if ( s3 > isovalue ) { index |=   8; }
        if ( s4 > isovalue ) { index |=  16; }
        if ( s5 > isovalue ) { index |=  32; }
        if ( s6 > isovalue ) { index |=  64; }
        if ( s7 > isovalue ) { index |= 128; }

        return index;
    }

    function interpolated_vertex( v0, v1, s )
    {
      var i0 = v0.x + (v0.y* volume.resolution.x) + (v0.z*volume.resolution.x * volume.resolution.y);
    	var i1 = v1.x + (v1.y* volume.resolution.x) + (v1.z*volume.resolution.x * volume.resolution.y);

    	var s0 = volume.values[i0][0];
    	var s1 = volume.values[i1][0];

    	var t = (s-s0)/(s1-s0);

    	return new THREE.Vector3().addVectors(v0.multiplyScalar(1-t),v1.multiplyScalar(t));

    }
}
