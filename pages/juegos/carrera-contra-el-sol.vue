<template>
  <main class="py-6 sm:py-4">
    <!-- TODO: Refactorizar codigo y realizar la versión movil del juego -->
    <h1 class="text-2xl sm:text-4xl font-bold text-primary text-center">
      La carrera contra el sol
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
            Demuestra tus destrezas al volante y vence el impacto del sol para prevenir el cáncer de piel:
          </p>
          <ul class="text-sm sm:text-base pl-4 list-decimal">
            <li>
              Inicia la carrera contra el sol y evita chocar con él para que no te queme la piel.
            </li>
            <li class="hidden lg:list-item">
              Usa las teclas con flechas o las teclas <span class="italic">A</span>, <span class="italic">D</span>, <span class="italic">W</span>, <span class="italic">S</span> para mover el carro hacia la izquierda, derecha, arriba y abajo respectivamente.
            </li>
            <li class="list-item lg:hidden">
              Para manejar el carro debes mantener presionada la pantalla hacia el lado que deseas que se mueva.
            </li>
            <li>
              Obtén las sombrillas para protegerte del sol y hacer que estos vayan más lento y no chocar con ellos.
            </li>
            <li>
              Atrapa los bloqueadores para hacer que los soles desaparezcan por un tiempo y puedas manejar libremente sin el peligro de quemar tu piel.
            </li>
            <li>
              Rompe el récord en la carrera contra el sol  y obtén una puntuación alta.
            </li>
          </ul>
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
      size="2xl"
      type="playgame"
      @close="closeModalPlaygame"
      :footer="false"
    >
      <p class="my-2 text-center font-semibold lg:hidden relative text-sm">
        Puntuación: {{ score }} <br>
        Record: {{ high_score }}
      </p>
      <div class="lg:grid grid-cols-4 py-4 px-2 pr-4 lg:pr-2 lg:px-0 relative">
        <div class="col-span-1 relative p-4 hidden lg:block" style="z-index: 3;">
          <div class="mb-2 p-2 bg-blue-600 border text-white rounded border-gray-300 shadow-lg">
            <h6 class="text-center font-semibold">Tip 1</h6>
            <ul class="text-sm">
              <li>Atrapa las sombrillas para que vayas más lento.</li>
            </ul>
          </div>
          <p class="mt-4 text-center font-semibold">
            Puntuación: {{ score }} <br>
            Record: {{ high_score }}
          </p>
        </div>
        <div id="container"  style="z-index: 3;" class="col-span-2 max-w-[572px] mx-auto">
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
          <div class="sun w-13 lg:w-15 h-13 lg:h-15" :id="'sun-' + i" v-for="i in 4" :key="'sun-' + i">
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
          <div id="sombrilla" class="absolute w-15 lg:w-17">
            <img
              class="w-full h-full"
              src="~/static/images/playgames/carros/sombrilla.png"
              alt="Imagen de sombrilla">
          </div>
          <div id="bloqueador" class="absolute w-15 lg:w-17">
            <img
              class="w-full h-full"
              src="~/static/images/playgames/carros/bloqueador.png"
              alt="Imagen de bloqueador">
          </div>
          <div class="absolute top-0 left-0 h-full w-full z-20 bg-gray-500/[0.7] flex items-center justify-center"
            v-if="game_over">
            <div class="max-w-xl px-2 text-center">
              <span class="text-white font-semibold">
                Haz obtenido una puntuación de {{ score }} en la carrera contra el sol
              </span>
              <Button size="block" class="mt-2" variant="secondary" @click="resetGame">Volver a jugar</Button>
            </div>
          </div>
          <div class="absolute top-0 left-0 h-full w-full z-20 bg-gray-500/[0.7] flex items-center justify-center"
            v-if="firstGame">
            <div class="max-w-xl px-2 text-center">
              <span class="text-white font-semibold">
                Lee los tips e inicia la carrera contra el cáncer de piel
              </span>
              <Button size="block" class="mt-2" variant="secondary" @click="resetGame">
                Iniciar carrera
              </Button>
            </div>
          </div>
          <div class="absolute p-0 top-0 w-full h-full grid grid-cols-2" v-if="!game_over && !firstGame">
            <div
              class="col-span-1"
              v-touch:tap="tapLeft"
              v-touch:touchhold="touchLeft"
              v-touch:longtap="stopTouchLeft"></div>
            <div
              class="col-span-1"
              v-touch:tap="tapRight"
              v-touch:touchhold="touchRight"
              v-touch:longtap="stopTouchRight"></div>
          </div>
        </div>
        <div class="col-span-1 relative p-4 hidden lg:block" style="z-index: 3;">
          <div class="mb-2 p-2 bg-blue-600 border text-white rounded border-gray-300 shadow-lg">
            <h6 class="text-center font-semibold">Tip 2</h6>
            <ul class="text-sm">
              <li>
                Atrapa los bloqueadores para que los soles desaparezcan y no choques con ellos.
              </li>
            </ul>
          </div>
        </div>
        <div class="content absolute h-full w-full top-0 left-0">
          <div class="cloud"></div>
          <div class="cloud x"></div>
          <div class="tree" id="tree-1"></div>
          <div class="tree-big" id="tree-b-1"></div>
          <div class="tree" id="tree-2"></div>
          <div class="tree-big" id="tree-b-2"></div>
        </div>
      </div>

      <div class="px-2 pr-4 lg:hidden mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
        <div class="mb-2 p-2 bg-blue-600 border text-white rounded border-gray-300 shadow-lg">
          <h6 class="text-center font-semibold">Tip 1</h6>
          <ul class="text-sm">
            <li>Recoje las sombrillas para que vayas más lento.</li>
          </ul>
        </div>

        <div class="mb-2 p-2 bg-blue-600 border text-white rounded border-gray-300 shadow-lg">
          <h6 class="text-center font-semibold">Tip 2</h6>
          <ul class="text-sm">
            <li>Recoje los protectores solares que esconderán los soles para que no puedan perjudicarte.</li>
          </ul>
        </div>
      </div>
    </Modal>

    <keyboards-events @keydown="onKeyDown" @keyup="onKeyUp"></keyboards-events>
  </main>
</template>

<script>
import metadataDynamic from '~/plugins/metadata/metadata-dynamic';
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
      collisionBlocker: false,
      lastUmbrellaShowed: null,
      lastBlockerShowed: null,
      nextUmbrellaShowed: null,
      nextBlockerShowed: null,
      timeLastCollisionUmbrella: null,
      lastTimeCollisionBlocker: null,
      racingCarAudio: null,
      failAudio: null,
      winAudio: null,
      high_score: 0,
      score: 0,
      firstGame: true
      //requestAnimationFrame
    };
  },
  mounted() {
    if(process.client) {
      this.$ga.page(this.$router)
    }
  },
  methods: {
    tapLeft(){
      const car = $("#car");
      if (this.game_over === false && parseInt(car.css("left")) > 0) {
        car.css("left", parseInt(car.css("left")) - 10);
      }
    },
    stopTouchLeft() {
      cancelAnimationFrame(this.move_left);
      this.move_left = false;
    },
    touchLeft() {
      this.move_left = requestAnimationFrame(this.left);
    },
    tapRight() {
      const car = $("#car");
      var container = $("#container");
      var container_width = parseInt(container.width());
      var car_width = parseInt(car.width());

      if (
        this.game_over === false &&
        parseInt(car.css("left")) < container_width - car_width
      ) {
        car.css("left", parseInt(car.css("left")) + 5);
      }
    },
    touchRight(){
      this.move_right = requestAnimationFrame(this.right);
    },
    stopTouchRight(){
      cancelAnimationFrame(this.move_right);
      this.move_right = false;
    },
    resetGame() {
      this.nextUmbrellaShowed = this.$moment().add(5, 's');
      this.lastUmbrellaShowed = this.$moment().add(10, 's');
      this.nextBlockerShowed = this.$moment().add(20, 's');
      this.lastBlockerShowed = this.$moment().add(25, 's');
      this.racingCarAudio.loop = true;
      this.racingCarAudio.volume = 0.2;
      this.racingCarAudio.play();

      this.line_speed = 5;
      this.speed = 5;
      this.score = 0;
      this.game_over = false;
      this.anim_id = requestAnimationFrame(this.repeat);

      this.move_left = false;
      this.move_right = false;
      this.move_up =  false;
      this.move_down = false;

      let car_1 = $("#sun-1");
      let car_2 = $("#sun-2");
      let car_3 = $("#sun-3");
      let car_4 = $("#sun-4");
      let sombrilla = $('#sombrilla');
      let bloqueador = $('#bloqueador');

      car_1.css("top", -100);
      car_2.css("top", -200);
      car_3.css("top", -350);
      car_4.css("top", -500);
      sombrilla.css('top', -90);
      bloqueador.css('top', -150)
    },
    closeModalPlaygame() {
      this.racingCarAudio.pause();
      this.winAudio.pause();
      this.failAudio.pause();
      this.firstGame = true;
      this.game_over = false;
      this.score = 0;
    },
    clickPlayGame() {
      this.$refs["modal-content"].open();
      this.failAudio = new Audio(require(`~/assets/sounds/fail.mp3`).default)
      this.winAudio = new Audio(require(`~/assets/sounds/correct.mp3`).default)
      const racingCarAudioFile = require(`~/assets/sounds/racing-car.mp3`).default;
      this.racingCarAudio = new Audio(racingCarAudioFile);
      //this.resetGame();
      this.firstGame = true;
      this.high_score = localStorage.getItem('high_score') || 0;
    },
    onKeyUp(e) {
      if (this.game_over === false) {
        var key = e.keyCode;
        if (key === 37 || key === 65) {
          cancelAnimationFrame(this.move_left);
          this.move_left = false;
        } else if (key === 39 || key === 68) {
          cancelAnimationFrame(this.move_right);
          this.move_right = false;
        } else if (key === 38 || key === 87) {
          cancelAnimationFrame(this.move_up);
          this.move_up = false;
        } else if (key === 40 || key === 83 ) {
          cancelAnimationFrame(this.move_down);
          this.move_down = false;
        }
      }
    },
    onKeyDown(e) {
      if (!this.game_over) {
        let key = e.keyCode;
        if ((key === 37 || key === 65) && this.move_left === false) {
          this.move_left = requestAnimationFrame(this.left);
        } else if ((key === 39 || key === 68 )&& this.move_right === false) {
          this.move_right = requestAnimationFrame(this.right);
        } else if ( ( key === 38 || key === 87 ) && this.move_up === false) {
          this.move_up = requestAnimationFrame(this.up);
        } else if (( key === 40 || key === 83 ) && this.move_down === false) {
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
      this.firstGame = false;
      let car = $("#car");
      let car_1 = $("#sun-1");
      let car_2 = $("#sun-2");
      let car_3 = $("#sun-3");
      let car_4 = $("#sun-4");
      let sombrilla = $('#sombrilla');
      let bloqueador = $('#bloqueador');
      let line_1 = $("#line_1");
      let line_2 = $("#line_2");
      let line_3 = $("#line_3");

      if (
        this.collision(car, car_1) ||
        this.collision(car, car_2) ||
        this.collision(car, car_3) ||
        this.collision(car, car_4)
      ) {
        this.racingCarAudio.pause()
        this.failAudio.play()
        localStorage.setItem('high_score', this.high_score);
        this.game_over = true;
        this.firstGame = false;
        cancelAnimationFrame(this.repeat);
        return;
      }

      if (this.collision(car, sombrilla) && !this.collisionUmbrella) {
        this.winAudio.play()
        this.timeLastCollisionUmbrella = this.$moment().add(12, 's');
        this.speed = this.speed - 2;
        this.line_speed = this.line_speed - 2;
        this.collisionUmbrella = true;
        sombrilla.hide();
      }

      if (this.collision(car, bloqueador) && !this.collisionBlocker) {
        this.winAudio.play()
        this.lastTimeCollisionBlocker = this.$moment().add(5, 's');
        this.car_down(car_1, true, -100)
        this.car_down(car_2, true, -200)
        this.car_down(car_3, true, -350)
        this.car_down(car_4, true, -500)
        car_1.hide()
        car_2.hide()
        car_3.hide()
        this.collisionBlocker = true;
        bloqueador.hide();
        sombrilla.hide();
      }

      this.score_counter++;

      if (this.score_counter % 20 == 0) {
        this.score++;
        if (this.score >= this.high_score) {
          this.high_score = this.score;
        }
        //score.text(parseInt(score.text()) + 1);
      }

      if (this.score_counter % 300 == 0) {
        this.speed++;
        this.line_speed++;
      }

      if (!this.collisionBlocker) {
        this.car_down(car_1);
        this.car_down(car_2);
        this.car_down(car_3);
        this.car_down(car_4);
      }

      if (this.$moment().isSameOrAfter(this.nextUmbrellaShowed) &&
        this.$moment().isSameOrBefore(this.lastUmbrellaShowed) && !this.collisionUmbrella && !this.collisionBlocker) {
        this.car_down(sombrilla);
        sombrilla.show();
      } else if (this.$moment().isSameOrAfter(this.lastUmbrellaShowed) ) {
        this.nextUmbrellaShowed = this.$moment().add(10, 's');
        this.lastUmbrellaShowed = this.$moment().add(15, 's');
        sombrilla.hide();
      }

      if (this.$moment().isSameOrAfter(this.nextBlockerShowed) &&
        this.$moment().isSameOrBefore(this.lastBlockerShowed) && !this.collisionBlocker) {
        this.car_down(bloqueador)
        bloqueador.show();
      } else if (this.$moment().isSameOrAfter(this.lastBlockerShowed) ) {
        this.nextBlockerShowed = this.$moment().add(20, 's');
        this.lastBlockerShowed = this.$moment().add(25, 's');
        car_1.show();
        car_2.show();
        car_3.show();
        bloqueador.hide();
      }

      if (this.lastTimeCollisionBlocker &&
        this.$moment().isSameOrAfter(this.lastTimeCollisionBlocker) &&
        this.collisionBlocker) {
        this.collisionBlocker = false;
      }

      if (this.timeLastCollisionUmbrella &&
        this.$moment().isSameOrAfter(this.timeLastCollisionUmbrella) &&
        this.collisionUmbrella) {
        this.collisionUmbrella = false;
      }

      this.line_down(line_1);
      this.line_down(line_2);
      this.line_down(line_3);

      this.anim_id = requestAnimationFrame(this.repeat);
    },
    car_down(car, newObject, numberCurrentTop) {
      let container = $("#container");
      let carD = $("#car");
      let container_width = parseInt(container.width());
      let container_height = parseInt(container.height());
      let car_width = parseInt(carD.width());

      let car_current_top;
      if (newObject) {
        car_current_top = numberCurrentTop;
        let car_left = parseInt(Math.random() * (container_width - car_width));
        car.css("left", car_left);
      } else {
        car_current_top = parseInt(car.css("top"));
        if (car_current_top > container_height) {
          car_current_top = -200;
          var car_left = parseInt(Math.random() * (container_width - car_width));
          car.css("left", car_left);
        }
      }

      car.css("top", car_current_top + this.speed);
    },
    line_down(line) {
      let container = $("#container");
      let container_height = parseInt(container.height());
      let line_current_top = parseInt(line.css("top"));
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
    const title = this.$routesApp.cars.name
    const url = `${this.$nuxt.$route.path}`
    const description = 'Compite esquivando los efectos del sol y usa tu destreza al volante para obtener elementos de protección contra el sol.'
    const image = 'https://res.cloudinary.com/dsvy4oeqc/image/upload/c_scale,h_720,w_1280/v1673823659/educate-cancer/carros_z9nqbe.png'

    const dynamicMeta = metadataDynamic({
      title,
      description,
      url,
      image,
      widthImage: 1280,
      heightImage: 720,
    })

    return {
      script: [{ src: "https://code.jquery.com/jquery-3.6.3.min.js" }],
      title, meta: [...dynamicMeta]
    };
  },
};
</script>

<style lang="postcss" scoped>

.content {
  background:skyblue;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.cloud {
  display:inline-block;
  background:white;
  width:120px;
  height:120px;
  border-radius:50%;
  position:relative;
  top:-30px;
  -webkit-filter: blur(6px);
  z-index:2;
  left:-50px;
  animation: 15000ms cloudAnimation linear infinite;
  opacity:0.76;
}
.cloud:before {
  content:"";
  display:inline-block;
  background:white;
  width:100px;
  height:100px;
  -webkit-filter: blur(3px);
  position:relative;
  border-radius:50%;
  top:-30px;
  left:60px;
}
.cloud:after {
  content:"";
  display:inline-block;
  background:white;
  width:200px;
  height:100px;
  -webkit-filter: blur(3px);
  position:relative;
  border-radius:50%;
  top:-80px;
  left:70px;
}

.cloud:first-child {zoom:1.5;}

@keyframes cloudAnimation {
  0%{
    transform: translate(-100px, 0);
  }
  100% {
    transform: translate(600px, 0);
  }
}

.tree-big {
  display:inline-block;
  width:10px;
  height:120px;
  background:#444;
  position:absolute;
  bottom:0;
}

.tree-big:before {
  content:"";
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 40px 120px 40px;
  border-color: transparent transparent #1bb845 transparent;
  position:absolute;
  bottom:60px;
  left:-30px;
}

#tree-b-1 {
  right: 5%;
}

#tree-b-2 {
  right: 15%;
}

.tree {
  display:inline-block;
  width:10px;
  height:100px;
  background:#444;
  position:absolute;
  bottom:0;
}

.tree:before {
  content:"";
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 30px 100px 30px;
  border-color: transparent transparent #1bb845 transparent;
  position:absolute;
  bottom:30px;
  left:-25px;
}

#tree-1 { left: 5%; }
#tree-2 { right: 10%; }

#container {
  position: relative;
  height: 70vh;
  width: 100%;
  margin: 0 auto;
  background-color: #707070;
  overflow: hidden;
}
.line {
  position: absolute;
  height: 150px;
  width: 2.5%;
  margin-left: 48.75%;
  background-color: rgb(255, 255, 255);
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

@media (min-width: 1024px) {
  .car {
    height: 75px;
    width: 50px;
  }
}


#car {
  bottom: 8%;
  left: 60%;
  background-color: #d32424;
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
  top: -90px;
  left: 80%;
}

#sun-2 {
  top: -200px;
  left: 40%;
}

#sun-3 {
  top: -350px;
  left: 50%;
}

#sun-4 {
  top: -500px;
  left: 30%;
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
  top: 0.55em;
  left: 0.65em;
  width: 0.25em;
  height: 0.4em;
  background: #565656;
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
  transform: rotate(45deg);
}
.sun-reye {
  left: auto;
  right: 0.75em;
}
.sun-lred,
.sun-rred {
  position: absolute;
  top: .9em;
  left: -0.2em;
  width: 0.5em;
  height: 0.35em;
  opacity: 0.6;
  background: #ff5e00;
  border-radius: 0.7em / 0.35em;
}

.sun-rred {
  left: auto;
  right: -0.2em;
}
.sun-nose {
  position: absolute;
  bottom: 0.75em;
  left: 50%;
  margin-left: -0.2em;
  width: 0.3em;
  height: 0.1em;
  background: #565656;
  border-radius: 0.2em 0.2em 0 0 / 0.1em 0.1em 0 0;
}

.sun-nose:after {
  position: absolute;
  bottom: -0.2em;
  left: 0;
  width: 0.3em;
  height: 0.2em;
  background: #565656;
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
  border-radius: 0.35em;
}
.sun-anime {
  width: 100%;
  height: 100%;
  animation: sunrolling 30s infinite;
}
.sun-ball {
  width: 100%;
  height: 100%;
  border-radius: 100%;
  background: #ffcf11;
  background-image: radial-gradient(circle, #ffdf05, #ffdf05);
  box-shadow: 0 0 20px #ffdf05;
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
  transform: rotate(18deg);
}
.sun-light:nth-child(10n + 3) {
  transform: rotate(36deg);
}
.sun-light:nth-child(10n + 4) {
  transform: rotate(54deg);
}
.sun-light:nth-child(10n + 5) {
  transform: rotate(72deg);
}
.sun-light:nth-child(10n + 6) {
  transform: rotate(90deg);
}
.sun-light:nth-child(10n + 7) {
  transform: rotate(108deg);
}
.sun-light:nth-child(10n + 8) {
  transform: rotate(126deg);
}
.sun-light:nth-child(10n + 9) {
  transform: rotate(144deg);
}
.sun-light:nth-child(10n + 10) {
  transform: rotate(162deg);
}

@media (min-width: 1024px) {
  .sun-leye,
  .sun-reye {
    top: 0.85em;
    left: 0.75em;
    width: 0.35em;
    height: 0.6em;
  }

  .sun-lred,
  .sun-rred {
    top: 1.3em;
    left: -0.2em;
    width: 0.7em;
    height: 0.35em;
  }

  .sun-nose {
    bottom: 0.8em;
  }
}

.sun-rred {
  left: auto;
  right: -0.2em;
}

.sun-reye {
  left: auto;
  right: 0.75em;
}

</style>
