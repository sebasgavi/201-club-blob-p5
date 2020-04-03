(function() {

  new p5(function(p){
    
    var blobs;
    var blobGraph;
    var bg;

    p.preload = function () {
      bg = p.loadImage('./images/gato.jpg');
    }
    
    p.setup = function () {
      var canvas = p.createCanvas(p.windowWidth, p.windowHeight);
      canvas.parent('p5parent');

      blobGraph = p.createGraphics(p.windowWidth, p.windowHeight);      

      blobs = [
        new Blob(blobGraph, 200, 150, 800),
        new Blob(blobGraph, p.windowWidth * .4, p.windowHeight / 2, 700),
        new Blob(blobGraph, p.windowWidth * .3, p.windowHeight - 100, 650),
      ];
    }

    p.draw = function () {
      p.clear();
      
      blobGraph.clear();
      blobs.forEach(function (blob) {
        blob.draw();
        blob.computeDisplay();
      });

      //p.image(blobGraph, 0, 0);
      var copy = p.createImage(p.windowWidth, p.windowHeight);
      copy.copy(bg, 0, 0, bg.width, bg.height, 0, 0, p.windowWidth, p.windowHeight);
      copy.mask(blobGraph);
      p.image(copy, 0, 0);

      //b1.move(p.mouseX, p.mouseY);
    }

    p.mouseClicked = function() {
      blobs.forEach(function(blob){
        blob.toggle();
      });
    }

  });

  

})();