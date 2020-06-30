var volume = new KVS.LobsterData();
var screen = new KVS.THREEScreen();
var bounds = Bounds( volume );
var surfaces;
var isovalue;
var number=1;
var colormap=1;
function main()
{
    screen.init(volume, {
    width: window.innerWidth * 0.6,
    height: window.innerHeight,
    targetDom: document.getElementById('display'),
    enableAutoResize: false
    });

    screen.scene.add( bounds );
     isovalue=128;
     surfaces = Isosurfaces( volume, isovalue, screen, number, colormap);
    screen.scene.add( surfaces );
    document.addEventListener( 'mousemove', function() {
        screen.light.position.copy( screen.camera.position );
    });
    document.addEventListener('change',function(){
      screen.scene.remove(surfaces);
      isovalue=elem.value;
      surfaces=Isosurfaces(volume,isovalue,screen,number,colormap);
      screen.scene.add(surfaces);
    })

    window.addEventListener( 'resize', function() {
        screen.resize( [ window.innerWidth, window.innerHeight ] );
    });
    window.addEventListener('resize', function() {
    screen.resize([ window.innerWidth * 0.8, window.innerHeight ]);
    });
    screen.loop();
}
function btn1Click(){
  screen.scene.remove(surfaces);
  number=1;
  surfaces=Isosurfaces(volume,isovalue,screen,number, colormap);
  screen.scene.add(surfaces);
}
function btn2Click(){
  screen.scene.remove(surfaces);
  number=2;
  surfaces=Isosurfaces(volume,isovalue,screen,number, colormap);
  screen.scene.add(surfaces);
}
function btn3Click(){
  screen.scene.remove(surfaces);
  number=3;
  surfaces=Isosurfaces(volume,isovalue,screen,number, colormap);
  screen.scene.add(surfaces);
}
function btn4Click(){
  screen.scene.remove(surfaces);
  number=4;
  surfaces=Isosurfaces(volume,isovalue,screen,number, colormap);
  screen.scene.add(surfaces);
}
function btn5Click(){
  screen.scene.remove(surfaces);
  number=5;
  surfaces=Isosurfaces(volume,isovalue,screen,number, colormap);
  screen.scene.add(surfaces);
}
function btn6Click(){
  screen.scene.remove(surfaces);
  number=6;
  surfaces=Isosurfaces(volume,isovalue,screen,number, colormap);
  screen.scene.add(surfaces);
}
function btn7Click(){
  screen.scene.remove(surfaces);
  number=7;
  surfaces=Isosurfaces(volume,isovalue,screen,number, colormap);
  screen.scene.add(surfaces);
}
function btn8Click(){
  screen.scene.remove(surfaces);
  number=8;
  surfaces=Isosurfaces(volume,isovalue,screen,number, colormap);
  screen.scene.add(surfaces);
}
function btn9Click(){
  screen.scene.remove(surfaces);
  colormap=1;
  surfaces=Isosurfaces(volume,isovalue,screen,number,colormap);
  screen.scene.add(surfaces);
}
function btn10Click(){
  screen.scene.remove(surfaces);
  colormap=2;
  surfaces=Isosurfaces(volume,isovalue,screen,number,colormap);
  screen.scene.add(surfaces);
}
