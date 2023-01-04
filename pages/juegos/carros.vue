<template>
  <main>
    <div id="score_div">
      Score: <span id="score">0</span> High Score:
      <span id="high_score">0</span>
    </div>
    <div id="container">
      <div id="line_1" class="line"></div>
      <div id="line_2" class="line"></div>
      <div id="line_3" class="line"></div>
      <div id="car" class="car">
        <div class="f_glass"></div>
        <div class="b_glass"></div>
        <div class="f_light_l"></div>
        <div class="f_light_r"></div>
        <div class="f_tyre_l"></div>
        <div class="f_tyre_r"></div>
        <div class="b_tyre_l"></div>
        <div class="b_tyre_r"></div>
      </div>
      <div id="car_1" class="car">
        <div class="f_glass"></div>
        <div class="b_glass"></div>
        <div class="f_light_l"></div>
        <div class="f_light_r"></div>
        <div class="f_tyre_l"></div>
        <div class="f_tyre_r"></div>
        <div class="b_tyre_l"></div>
        <div class="b_tyre_r"></div>
      </div>
      <div id="car_2" class="car">
        <div class="f_glass"></div>
        <div class="b_glass"></div>
        <div class="f_light_l"></div>
        <div class="f_light_r"></div>
        <div class="f_tyre_l"></div>
        <div class="f_tyre_r"></div>
        <div class="b_tyre_l"></div>
        <div class="b_tyre_r"></div>
      </div>
      <div id="car_3" class="car">
        <div class="f_glass"></div>
        <div class="b_glass"></div>
        <div class="f_light_l"></div>
        <div class="f_light_r"></div>
        <div class="f_tyre_l"></div>
        <div class="f_tyre_r"></div>
        <div class="b_tyre_l"></div>
        <div class="b_tyre_r"></div>
      </div>
      <div id="restart_div">
        <button id="restart">
          Restart<br />
          <small class="small_text">(press Enter)</small>
        </button>
      </div>
    </div>
    <keyboards-events @keydown="onKeyDown" @keyup="onKeyUp"></keyboards-events>
  </main>
</template>

<script>
export default {
  data() {
    return {
      game_over: false,
      speed: 2,
      line_speed: 5,
      score_counter: 1,
      move_left: false,
      move_right: false,
      move_up: false,
      move_down: false,
      anim_id: null
      //requestAnimationFrame
    };
  },
  mounted() {
    if (process.client) {
      /* Move the cars and lines */
      this.anim_id = requestAnimationFrame(this.repeat);
      //this.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    }
  },
  methods: {
    onKeyUp(e) {
      if (this.game_over === false) {
        var key = e.keyCode;
        if (key === 37) {
            cancelAnimationFrame(this.move_left);
            this.move_left = false;
        } else if (key === 39) {
            cancelAnimationFrame(this.move_right);
            this.move_right = false;
        } else if (key === 38) {
            cancelAnimationFrame(this.move_up);
            this.move_up = false;
        } else if (key === 40) {
            cancelAnimationFrame(this.move_down);
            this.move_down = false;
        }
    }
    },
    onKeyDown(e) {
      if (!this.game_over) {
        let key = e.keyCode;
        if (key === 37 && this.move_left === false) {
          this.move_left = requestAnimationFrame(this.left);
        } else if (key === 39 && this.move_right === false) {
          this.move_right = requestAnimationFrame(this.right);
        } else if (key === 38 && this.move_up === false) {
          this.move_up = requestAnimationFrame(this.up);
        } else if (key === 40 && this.move_down === false) {
          this.move_down = requestAnimationFrame(this.down);
        }
      }
    },
    left() {
      const car = $('#car');
      if (this.game_over === false && parseInt(car.css('left')) > 0) {
        car.css('left', parseInt(car.css('left')) - 5);
        this.move_left = requestAnimationFrame(this.left);
      }
    },
    right() {
      const car = $('#car');
      var container = $('#container');
      var container_width = parseInt(container.width());
      var car_width = parseInt(car.width());

      if (this.game_over === false && parseInt(car.css('left')) < container_width - car_width) {
        car.css('left', parseInt(car.css('left')) + 5);
        this.move_right = requestAnimationFrame(this.right);
      }
    },
    up() {
      const car = $('#car');
      if (this.game_over === false && parseInt(car.css('top')) > 0) {
        car.css('top', parseInt(car.css('top')) - 3);
        this.move_up = requestAnimationFrame(this.up);
      }
    },
    down() {
      const car = $('#car');
      var container = $('#container');
      var container_height = parseInt(container.height());
      var car_height = parseInt(car.height());
      if (this.game_over === false && parseInt(car.css('top')) < container_height - car_height) {
        car.css('top', parseInt(car.css('top')) + 3);
        this.move_down = requestAnimationFrame(this.down);
      }
    },
    repeat() {
        var container = $('#container');
        var car = $('#car');
        var car_1 = $('#car_1');
        var car_2 = $('#car_2');
        var car_3 = $('#car_3');
        var line_1 = $('#line_1');
        var line_2 = $('#line_2');
        var line_3 = $('#line_3');
        var score = $('#score');

        if (this.collision(car, car_1) || this.collision(car, car_2) || this.collision(car, car_3)) {
            console.log('stop game')
            //stop_the_game();
            return;
        }

        this.score_counter++;

        if (this.score_counter % 20 == 0) {
            score.text(parseInt(score.text()) + 1);
        }
        if (this.score_counter % 500 == 0) {
            this.speed++;
            this.line_speed++;
        }

        this.car_down(car_1);
        this.car_down(car_2);
        this.car_down(car_3);

        this.line_down(line_1);
        this.line_down(line_2);
        this.line_down(line_3);

        this.anim_id = requestAnimationFrame(this.repeat);
    },
    car_down(car) {
      var container = $('#container');
      var carD = $('#car');
      var container_width = parseInt(container.width());
      var container_height = parseInt(container.height());
      var car_width = parseInt(carD.width());

      var car_current_top = parseInt(car.css('top'));
      if (car_current_top > container_height) {
          car_current_top = -200;
          var car_left = parseInt(Math.random() * (container_width - car_width));
          car.css('left', car_left);
      }
      car.css('top', car_current_top + this.speed);
    },
    line_down(line) {
      var container = $('#container');
      var container_height = parseInt(container.height());
      var line_current_top = parseInt(line.css('top'));
      if (line_current_top > container_height) {
          line_current_top = -300;
      }
      line.css('top', line_current_top + this.line_speed);
    },
    collision($div1, $div2) {
      var x1 = $div1.offset().left;
      var y1 = $div1.offset().top;
      var h1 = $div1.outerHeight(true);
      var w1 = $div1.outerWidth(true);
      var b1 = y1 + h1;
      var r1 = x1 + w1;
      var x2 = $div2.offset().left;
      var y2 = $div2.offset().top;
      var h2 = $div2.outerHeight(true);
      var w2 = $div2.outerWidth(true);
      var b2 = y2 + h2;
      var r2 = x2 + w2;

      if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
      return true;
    }
  },
  head() {
    return {
      script: [
        { src: 'https://code.jquery.com/jquery-3.6.3.min.js' }
      ]
    }
  }
};
</script>

<style lang="postcss" scoped>
body {
  height: 100%;
  width: 100%;
  margin: 0;
  background-color: #45d678;
  font-family: sans-serif;
}

#container {
  position: relative;
  height: 90vh;
  width: 25%;
  left: 35%;
  margin-top: 20px;
  background-color: #292929;
  overflow: hidden;
}
.line {
  position: absolute;
  height: 150px;
  width: 4%;
  margin-left: 48%;
  background-color: rgba(255, 255, 255, 0.5);
}
#line_1 {
  top: -150px;
}
#line_2 {
  top: 150px;
}
#line_3 {
  top: 450px;
}
.car {
  position: absolute;
  height: 60px;
  width: 40px;
  border-radius: 5px;
  box-shadow: 0px 1px 8px 0px black;
}
#car {
  bottom: 8%;
  left: 60%;
  background-color: #ffdf5a;
}
.f_glass {
  position: absolute;
  height: 20%;
  width: 60%;
  margin-left: 20%;
  top: 15%;
  border-radius: 0px 0px 5px 5px;
  background-color: #484848;
}
.b_glass {
  position: absolute;
  height: 20%;
  width: 60%;
  margin-left: 20%;
  bottom: 15%;
  border-radius: 5px 5px 0px 0px;
  background-color: #484848;
}
.f_light_l {
  position: absolute;
  height: 10%;
  width: 20%;
  margin-left: 10%;
  top: -6%;
  border-radius: 5px 5px 0px 0px;
  background-color: #efefef;
}
.f_light_r {
  position: absolute;
  height: 10%;
  width: 20%;
  margin-left: 70%;
  top: -6%;
  border-radius: 5px 5px 0px 0px;
  background-color: #efefef;
}
.f_tyre_l {
  position: absolute;
  height: 20%;
  width: 10%;
  background-color: grey;
  top: 20%;
  left: -10%;
  border-radius: 5px 0px 0px 5px;
}
.f_tyre_r {
  position: absolute;
  height: 20%;
  width: 10%;
  background-color: grey;
  top: 20%;
  left: 100%;
  border-radius: 0px 5px 5px 0px;
}
.b_tyre_l {
  position: absolute;
  height: 20%;
  width: 10%;
  background-color: grey;
  top: 70%;
  left: -10%;
  border-radius: 5px 0px 0px 5px;
}
.b_tyre_r {
  position: absolute;
  height: 20%;
  width: 10%;
  background-color: grey;
  top: 70%;
  left: 100%;
  border-radius: 0px 5px 5px 0px;
}
#car_1 {
  top: -100px;
  left: 60%;
  background-color: #26c5ff;
}
#car_2 {
  top: -200px;
  left: 40%;
  background-color: #26c5ff;
}
#car_3 {
  top: -350px;
  left: 50%;
  background-color: #26c5ff;
}
#restart_div {
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: #292929;
  color: white;
  font-family: sans-serif;
  font-size: 40px;
  text-align: center;
  display: none;
}

#restart {
  border: none;
  padding: 25px;
  color: white;
  background-color: #8a64ff;
  font-size: 30px;
  margin-top: 30%;
}
.small_text {
  font-size: 15px;
}
#score_div {
  position: absolute;
  margin-top: 20%;
  margin-left: 10%;
  font-size: 35px;
  background-color: white;
  color: #454545;
  padding: 10px;
  box-shadow: 4px 4px 0px 1px #808080;
}
#help {
  text-align: center;
}
#donate {
  position: absolute;
  right: 10px;
  top: 25px;
  background: rgba(255, 255, 255, 0.8);
  padding: 12px;
}
</style>
