class Blob {
    
  constructor (p, x, y, size){
    this.p = p;
    this.pos = p.createVector(x, y);
    this.size = 0;
    this.finalSize = size;
    this.display = false;

    this.col = p.color(255, 255, 0);

    this.leftOffset = p.random(4125123125123);
    this.rightOffset = p.random(4125123125123);
    this.genOffset = p.random(4125123125123);
  }

  computeDisplay(){
    var diff = this.finalSize - this.size;
    var vel = this.p.map(diff, this.finalSize, 0, 50, 15);
    if(this.display && this.size < this.finalSize){
      this.size += vel;
    }
    if(!this.display && this.size > 0){
      this.size -= vel;
    }
  }

  draw(){
    var { p, pos, size } = this;
    if(size <= 0) return;

    var mov = 40;
    this.genOffset += 0.01;
    pos = pos.copy().add(p.noise(this.genOffset + 45145) * mov - mov/2, p.noise(this.genOffset + 249999) * mov - mov/2);
    size = size + p.noise(this.genOffset + 65135135) * 150;

    // izquierda
    this.leftOffset += 0.01;
    var left = this.getSideVars(this.leftOffset, -.5, pos, size);
    
    // derecha
    this.rightOffset += 0.01;
    var right = this.getSideVars(this.rightOffset, .5, pos, size);

    p.fill(this.col, 0, 0);
    //p.stroke(0);
    //p.strokeWeight(4);
    p.noStroke();

    // mitad abajo
    p.bezier(left.center.x, left.center.y,
              left.bottom.x, left.bottom.y,
              right.bottom.x, right.bottom.y,
              right.center.x, right.center.y);

    left.center.y++;
    left.top.y++;
    right.center.y++;
    right.top.y++;
    // mitad arriba
    p.bezier(left.center.x, left.center.y,
              left.top.x, left.top.y,
              right.top.x, right.top.y,
              right.center.x, right.center.y);
    
    return
    p.fill(255);
    [left, right].forEach(function (side) {
      ['top', 'bottom', 'center'].forEach(function (key){
        p.ellipse(side[key].x, side[key].y, 20, 20);
      })
    })
  }

  getSideVars(offset, mov, pos, size){
    var { p } = this;

    var rot = p.noise(offset) * p.PI / 4 - p.PI / 8;

    var posMov = 10;
    pos = pos.copy().add(p.noise(offset + 2532) * posMov - posMov/2, p.noise(offset + 25231245123) * posMov - posMov/2);

    var bottom = p.createVector(0, size * .50 + p.noise(offset + 65125265) * 100);
    bottom.rotate(rot);
    bottom.add(pos);
    bottom.add(size * mov, 0);

    var top = p.createVector(0, size * .5 + p.noise(offset + 211512) * 100);
    top.rotate(rot + p.PI);
    top.add(pos);
    top.add(size * mov, 0);
    
    var center = p.createVector(pos.x - size * mov * -1, pos.y);

    return {
      top: top,
      center: center,
      bottom: bottom
    }
  }

  move(x, y){
    this.pos.set(x, y);
  }

  toggle(){
    this.display = !this.display;
  }

}