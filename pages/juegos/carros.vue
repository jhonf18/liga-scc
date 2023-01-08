<template>
  <main>
    <h1 class="text-2xl sm:text-4xl font-bold text-primary text-center">
      Carros
    </h1>
    <div
      class="
        container
        mx-auto
        max-w-4xl
        p-4
        mt-8
        border
        rounded
        px-4
        py-5
        shadow-lg
        w-full-1rem
        transition
        duration-500
      "
      :class="{ 'bg-blue-100': step === 2 }"
    >
      <transition name="slide" mode="out-in">
        <div v-if="step === 1" key="step-1">
          <h3 class="text-center text-xl sm:text-2xl font-semibold mb-8">
            Instrucciones de juego
          </h3>
          <p class="mt-4 text-sm sm:text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit nihil
            quaerat iste fugiat quidem, nesciunt quasi quia harum tempore illum
            doloribus impedit assumenda eaque, quibusdam sunt natus deleniti,
            praesentium optio? Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Possimus aliquam, cupiditate, delectus magnam ut
            doloremque odit adipisci nihil blanditiis suscipit deleniti quasi ad
            porro reprehenderit explicabo quod vitae eveniet quidem.
          </p>
          <div class="text-right mt-8 flex justify-end">
            <Button size="lg" variant="tertiary" @click="clickPlayGame"
              >JUGAR</Button
            >
          </div>
        </div>
      </transition>
    </div>
    <Modal
      id="modal-content"
      ref="modal-content"
      target="modal-content"
      size="xl"
      :footer="false"
    >
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
        <div class="sun" :id="'sun-' + i" v-for="i in 3" :key="'sun-' + i">
          <div class="sun-face">
            <div class="sun-hlight"></div>
            <div class="sun-leye"></div>
            <div class="sun-reye"></div>
            <div class="sun-lred"></div>
            <div class="sun-rred"></div>
            <div class="sun-nose"></div>
          </div>
          <div class="sun-anime">
            <div class="sun-ball"></div>
            <div class="sun-light">
              <b></b>
              <s></s>
            </div>
            <div class="sun-light">
              <b></b>
              <s></s>
            </div>
            <div class="sun-light">
              <b></b>
              <s></s>
            </div>
            <div class="sun-light">
              <b></b>
              <s></s>
            </div>
            <div class="sun-light">
              <b></b>
              <s></s>
            </div>
            <div class="sun-light">
              <b></b>
              <s></s>
            </div>
            <div class="sun-light">
              <b></b>
              <s></s>
            </div>
            <div class="sun-light">
              <b></b>
              <s></s>
            </div>
            <div class="sun-light">
              <b></b>
              <s></s>
            </div>
            <div class="sun-light">
              <b></b>
              <s></s>
            </div>
            <div class="sun-light">
              <b></b>
              <s></s>
            </div>
            <div class="sun-light">
              <b></b>
              <s></s>
            </div>
          </div>
        </div>
        <div id="sombrilla" style="width: 70px; height: 70px" class="absolute">
          <img
            class="w-full h-full"
            src="~/static/images/playgames/carros/sombrilla.png"
            alt="Imagen de sombrilla">
        </div>
        <div id="bloqueador" style="width: 70px; height: 70px" class="absolute">
          <img
            class="w-full h-full"
            src="~/static/images/playgames/carros/bloqueador.png"
            alt="Imagen de bloqueador">
        </div>
        <div id="car_3" v-if="false" class="car">
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
    </Modal>
    <div id="score_div" v-show="false">
      Score: <span id="score">0</span> High Score:
      <span id="high_score">0</span>
    </div>

    <keyboards-events @keydown="onKeyDown" @keyup="onKeyUp"></keyboards-events>
  </main>
</template>

<script>
export default {
  data() {
    return {
      step: 1,
      game_over: false,
      speed: 5,
      line_speed: 5,
      score_counter: 1,
      move_left: false,
      move_right: false,
      move_up: false,
      move_down: false,
      anim_id: null,
      collisionUmbrella: false,
      collisionBlocker: false
      //requestAnimationFrame
    };
  },
  mounted() {
    if (process.client) {
      /* Move the cars and lines */
      //this.anim_id = requestAnimationFrame(this.repeat);
      //this.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    }
  },
  methods: {
    clickPlayGame() {
      this.$refs["modal-content"].open();
      this.anim_id = requestAnimationFrame(this.repeat);
    },
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
      const car = $("#car");
      if (this.game_over === false && parseInt(car.css("left")) > 0) {
        car.css("left", parseInt(car.css("left")) - 5);
        this.move_left = requestAnimationFrame(this.left);
      }
    },
    right() {
      const car = $("#car");
      var container = $("#container");
      var container_width = parseInt(container.width());
      var car_width = parseInt(car.width());

      if (
        this.game_over === false &&
        parseInt(car.css("left")) < container_width - car_width
      ) {
        car.css("left", parseInt(car.css("left")) + 5);
        this.move_right = requestAnimationFrame(this.right);
      }
    },
    up() {
      const car = $("#car");
      if (this.game_over === false && parseInt(car.css("top")) > 0) {
        car.css("top", parseInt(car.css("top")) - 3);
        this.move_up = requestAnimationFrame(this.up);
      }
    },
    down() {
      const car = $("#car");
      var container = $("#container");
      var container_height = parseInt(container.height());
      var car_height = parseInt(car.height());
      if (
        this.game_over === false &&
        parseInt(car.css("top")) < container_height - car_height
      ) {
        car.css("top", parseInt(car.css("top")) + 3);
        this.move_down = requestAnimationFrame(this.down);
      }
    },
    repeat() {
      var container = $("#container");
      var car = $("#car");
      var car_1 = $("#sun-1");
      var car_2 = $("#sun-2");
      var car_3 = $("#sun-3");
      var sombrilla = $('#sombrilla');
      var bloqueador = $('#bloqueador')
      var line_1 = $("#line_1");
      var line_2 = $("#line_2");
      var line_3 = $("#line_3");
      var score = $("#score");

      if (
        this.collision(car, car_1) ||
        this.collision(car, car_2) ||
        this.collision(car, car_3)
      ) {
        console.log("stop game");
        //stop_the_game();
        return;
      }

      if (this.collision(car, sombrilla) && !this.collisionUmbrella) {
        console.log(this.speed)
        this.speed = this.speed - 1;
        this.collisionUmbrella = true;
        sombrilla.hide();
      }

      if (this.collision(car, bloqueador) && !this.collisionBlocker) {
        car_1.hide()
        car_2.hide()
        car_3.hide()
        this.collisionBlocker = true;
        bloqueador.hide();
        sombrilla.hide();
      }

      this.score_counter++;

      if (this.score_counter % 20 == 0) {
        score.text(parseInt(score.text()) + 1);
      }
      if (this.score_counter % 500 == 0) {
        this.speed++;
        this.line_speed++;
      }

      //const sun = $('#sun')

      this.car_down(car_1);
      this.car_down(car_2);
      this.car_down(car_3);
      this.car_down(sombrilla)
      this.car_down(bloqueador);
      //this.car_down(sun)

      this.line_down(line_1);
      this.line_down(line_2);
      this.line_down(line_3);

      this.anim_id = requestAnimationFrame(this.repeat);
    },
    car_down(car) {
      var container = $("#container");
      var carD = $("#car");
      var container_width = parseInt(container.width());
      var container_height = parseInt(container.height());
      var car_width = parseInt(carD.width());

      var car_current_top = parseInt(car.css("top"));
      if (car_current_top > container_height) {
        car_current_top = -200;
        var car_left = parseInt(Math.random() * (container_width - car_width));
        car.css("left", car_left);
      }
      car.css("top", car_current_top + this.speed);
    },
    line_down(line) {
      var container = $("#container");
      var container_height = parseInt(container.height());
      var line_current_top = parseInt(line.css("top"));
      if (line_current_top > container_height) {
        line_current_top = -300;
      }
      line.css("top", line_current_top + this.line_speed);
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
    },
  },
  head() {
    return {
      script: [{ src: "https://code.jquery.com/jquery-3.6.3.min.js" }],
    };
  },
};
</script>

<style lang="postcss" scoped>
#container {
  position: relative;
  height: 70vh;
  width: 40%;
  margin: 0 auto;
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

#sun-1 {
  top: -100px;
  left: 60%;
}

#bloqueador {
  position: absolute;
  top: -150px;
  left: 40%;
}

#sombrilla {
  position: absolute;
  top: 50px;
  left: 80%;
}

#car_1 {
  top: -100px;
  left: 60%;
  background-color: #26c5ff;
}

#sun-2 {
  top: -200px;
  left: 40%;
}

#car_2 {
  top: -200px;
  left: 40%;
  background-color: #26c5ff;
}

#sun-3 {
  top: -350px;
  left: 50%;
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

/* sun */
@-webkit-keyframes sunrolling {
  0% {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    -ie-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    -o-transform: rotate(180deg);
    -ie-transform: rotate(180deg);
    transform: rotate(180deg);
  }
}
@-moz-keyframes sunrolling {
  0% {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    -ie-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    -o-transform: rotate(180deg);
    -ie-transform: rotate(180deg);
    transform: rotate(180deg);
  }
}
@-ms-keyframes sunrolling {
  0% {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    -ie-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    -o-transform: rotate(180deg);
    -ie-transform: rotate(180deg);
    transform: rotate(180deg);
  }
}
@keyframes sunrolling {
  0% {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    -ie-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    -o-transform: rotate(180deg);
    -ie-transform: rotate(180deg);
    transform: rotate(180deg);
  }
}

.sun {
  float: left;
  position: relative;
  /* margin: 30px; */
  width: 60px;
  height: 60px;
}
.sun-face {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  line-height: 80px;
  text-align: center;
  font-size: 1.5em;
  text-align: center;
  color: #4e0404;
}
.sun-leye,
.sun-reye {
  position: absolute;
  top: 0.85em;
  left: 0.75em;
  width: 0.35em;
  height: 0.6em;
  background: #565656;
  -webkit-border-radius: 0.4em / 0.8em;
  -moz-border-radius: 0.4em / 0.8em;
  -o-border-radius: 0.4em / 0.8em;
  -ms-border-radius: 0.4em / 0.8em;
  border-radius: 0.4em / 0.8em;
}
.sun-leye:after,
.sun-reye:after {
  position: absolute;
  top: 0;
  left: 0;
  width: 0.4em;
  height: 0.1em;
  background: #ffdf05;
  content: "";
}
.sun-leye:before,
.sun-reye:before {
  position: absolute;
  bottom: 0.1em;
  right: -0.1em;
  width: 0.2em;
  height: 0.2em;
  background: #ffdf05;
  content: "";
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  transform: rotate(45deg);
}
.sun-reye {
  left: auto;
  right: 0.75em;
}
.sun-lred,
.sun-rred {
  position: absolute;
  top: 1.3em;
  left: -0.2em;
  width: 0.7em;
  height: 0.35em;
  opacity: 0.6;
  background: #ff5e00;
  -webkit-border-radius: 0.7em / 0.35em;
  -moz-border-radius: 0.7em / 0.35em;
  -ms-border-radius: 0.7em / 0.35em;
  -o-border-radius: 0.7em / 0.35em;
  border-radius: 0.7em / 0.35em;
}
.sun-rred {
  left: auto;
  right: -0.2em;
}
.sun-nose {
  position: absolute;
  bottom: 0.8em;
  left: 50%;
  margin-left: -0.2em;
  width: 0.3em;
  height: 0.1em;
  background: #565656;
  -webkit-border-radius: 0.2em 0.2em 0 0 / 0.1em 0.1em 0 0;
  -moz-border-radius: 0.2em 0.2em 0 0 / 0.1em 0.1em 0 0;
  -ms-border-radius: 0.2em 0.2em 0 0 / 0.1em 0.1em 0 0;
  -o-border-radius: 0.2em 0.2em 0 0 / 0.1em 0.1em 0 0;
  border-radius: 0.2em 0.2em 0 0 / 0.1em 0.1em 0 0;
}
.sun-nose:after {
  position: absolute;
  bottom: -0.2em;
  left: 0;
  width: 0.3em;
  height: 0.2em;
  background: #565656;
  -webkit-border-radius: 0 0 0.2em 0.2em;
  -moz-border-radius: 0 0 0.2em 0.2em;
  -ms-border-radius: 0 0 0.2em 0.2em;
  -o-border-radius: 0 0 0.2em 0.2em;
  border-radius: 0 0 0.2em 0.2em;
  content: "";
}
.sun-nose:before {
  position: absolute;
  top: 0;
  left: 50%;
  margin-left: -0.03125em;
  width: 0.0625em;
  height: 0.35em;
  background: #565656;
  content: "";
}
.sun-hlight {
  position: absolute;
  top: 0.6em;
  right: 0.6em;
  width: 0.35em;
  height: 0.35em;
  opacity: 0.8;
  background: #fcf0a3;
  -webkit-border-radius: 0.35em;
  -moz-border-radius: 0.35em;
  -ms-border-radius: 0.35em;
  -o-border-radius: 0.35em;
  border-radius: 0.35em;
}
.sun-anime {
  width: 100%;
  height: 100%;
  -webkit-animation: sunrolling 30s infinite;
  -moz-animation: sunrolling 30s infinite;
  -ie-animation: sunrolling 30s infinite;
  -o-animation: sunrolling 30s infinite;
  animation: sunrolling 30s infinite;
}
.sun-ball {
  width: 100%;
  height: 100%;
  -webkit-border-radius: 100%;
  -moz-border-radius: 100%;
  -ie-border-radius: 100%;
  -o-border-radius: 100%;
  border-radius: 100%;
  background: #ffcf11;
  background-image: -webkit-radial-gradient(
    circle,
    #ffdf05,
    #ffcf11
  ); /* Chrome 10+, Saf5.1+ */
  background-image: -moz-radial-gradient(circle, #ffdf05, #ffcf11);
  background-image: -o-radial-gradient(circle, #ffdf05, #ffcf11);
  background-image: -ie-radial-gradient(circle, #ffdf05, #ffcf11);
  background-image: radial-gradient(circle, #ffdf05, #ffdf05);
  -webkit-box-shadow: 0 0 100px #ffdf05;
  -moz-box-shadow: 0 0 100px #ffdf05;
  -ie-box-shadow: 0 0 100px #ffdf05;
  -o-box-shadow: 0 0 100px #ffdf05;
  box-shadow: 0 0 100px #ffdf05;
}
.sun-light {
  position: absolute;
  top: -30%;
  left: 50%;
  width: 2px;
  height: 160%;
}
.sun-light b,
.sun-light s {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 12%; /* 100*30/100=18.75 */
  background: #fed65b;
}
.sun-light s {
  top: auto;
  bottom: 0;
}
.sun-light:nth-child(10n + 2) {
  -webkit-transform: rotate(18deg);
  -moz-transform: rotate(18deg);
  -o-transform: rotate(18deg);
  -ie-transform: rotate(18deg);
  transform: rotate(18deg);
}
.sun-light:nth-child(10n + 3) {
  -webkit-transform: rotate(36deg);
  -moz-transform: rotate(36deg);
  -o-transform: rotate(36deg);
  -ie-transform: rotate(36deg);
  transform: rotate(36deg);
}
.sun-light:nth-child(10n + 4) {
  -webkit-transform: rotate(54deg);
  -moz-transform: rotate(54deg);
  -o-transform: rotate(54deg);
  -ie-transform: rotate(54deg);
  transform: rotate(54deg);
}
.sun-light:nth-child(10n + 5) {
  -webkit-transform: rotate(72deg);
  -moz-transform: rotate(72deg);
  -o-transform: rotate(72deg);
  -ie-transform: rotate(72deg);
  transform: rotate(72deg);
}
.sun-light:nth-child(10n + 6) {
  -webkit-transform: rotate(90deg);
  -moz-transform: rotate(90deg);
  -o-transform: rotate(90deg);
  -ie-transform: rotate(90deg);
  transform: rotate(90deg);
}
.sun-light:nth-child(10n + 7) {
  -webkit-transform: rotate(108deg);
  -moz-transform: rotate(108deg);
  -o-transform: rotate(108deg);
  -ie-transform: rotate(108deg);
  transform: rotate(108deg);
}
.sun-light:nth-child(10n + 8) {
  -webkit-transform: rotate(126deg);
  -moz-transform: rotate(126deg);
  -o-transform: rotate(126deg);
  -ie-transform: rotate(126deg);
  transform: rotate(126deg);
}
.sun-light:nth-child(10n + 9) {
  -webkit-transform: rotate(144deg);
  -moz-transform: rotate(144deg);
  -o-transform: rotate(144deg);
  -ie-transform: rotate(144deg);
  transform: rotate(144deg);
}
.sun-light:nth-child(10n + 10) {
  -webkit-transform: rotate(162deg);
  -moz-transform: rotate(162deg);
  -o-transform: rotate(162deg);
  -ie-transform: rotate(162deg);
  transform: rotate(162deg);
}
</style>
