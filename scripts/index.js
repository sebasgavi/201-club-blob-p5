(function() {

  class Blob {
    
    constructor (p, x, y, size){
      this.p = p;
      this.pos = p.createVector(x, y);
      this.size = size;

      this.leftOffset = 0;
    }

    draw(){
      var { p, pos, size } = this;

      this.leftOffset += 0.01;
      var rotLeft = p.noise(this.leftOffset) * p.PI / 4 - p.PI / 8;
      //console.log(rotLeft, );

      var leftBottom = p.createVector(0, size * .50 + p.noise(this.leftOffset + 600) * 10);
      leftBottom.rotate(rotLeft);
      leftBottom.add(pos);
      leftBottom.add(size * -.5, 0);

      var leftTop = p.createVector(0, size * .75);
      leftTop.rotate(rotLeft + p.PI);
      leftTop.add(pos);
      leftTop.add(size * -.5, 0);

      var pts = [
        p.createVector(pos.x - size / 2, pos.y), // punto izquierda
        leftBottom, // manija izquierda abajo // leftBottom
        p.createVector(pos.x + size / 2, pos.y + size * .75), // manija derecha abajo
        p.createVector(pos.x + size / 2, pos.y), // punto derecha

        leftTop, // manija izquierda arriba
        p.createVector(pos.x + size / 2, pos.y - size * .75), // manija derecha arriba
      ];
  
      p.fill(255, 0, 0);
      p.stroke(0);
      p.strokeWeight(4);
      p.bezier(pts[0].x, pts[0].y,
             pts[1].x, pts[1].y,
             pts[2].x, pts[2].y,
             pts[3].x, pts[3].y);

      p.bezier(pts[0].x, pts[0].y,
              pts[4].x, pts[4].y,
              pts[5].x, pts[5].y,
              pts[3].x, pts[3].y);
      
      p.noStroke();
      p.fill(255);
      for (let pt of pts) {
        //p.ellipse(pt.x, pt.y, 20, 20);
      }    
    }

    move(x, y){
      this.pos.set(x, y);
    }

  }

  new p5(function(p){
    
    var b1 = new Blob(p, 500, 500, 200);
    
    p.setup = function () {
      var canvas = p.createCanvas(p.windowWidth, p.windowHeight);
      canvas.parent('p5parent');
    }

    p.draw = function () {
      p.background(220);
      
      b1.draw();


      //b1.move(p.mouseX, p.mouseY);
    }

  });

  

})();