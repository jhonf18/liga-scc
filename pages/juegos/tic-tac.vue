<template>
  <div>
    <h1 class="text-4xl font-bold text-primary text-center">Tres en raya</h1>
    <div
      id="cabecera"
      class="container flex items-center justify-center mt-1"
    >
      <div id="opcion2" class="flex row mt-5" hidden="true" v-show="false">
        <button type="button" @click="playing(1)" class="btn btn-warning m-2">
          Quiero X (empiezo yo)
        </button>
        <button type="button" @click="playing(2)" class="btn btn-warning m-2">
          Quiero O (empieza el ordenador)
        </button>
      </div>
    </div>

    <div class="mt-8 container mx-auto max-w-4xl border rounded px-4 py-5 shadow-lg w-full-1rem"
      :class="{ 'bg-primary': step === 3 }" >
      <transition name="slide" mode="out-in" >
        <div v-if="step === 1" key="step1">
          <h3 class="text-center text-2xl font-semibold mb-8">
            Instrucciones de juego
          </h3>
          <p class="mt-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit nihil quaerat iste fugiat quidem, nesciunt quasi quia harum tempore illum doloribus impedit assumenda eaque, quibusdam sunt natus deleniti, praesentium optio?
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus aliquam, cupiditate, delectus magnam ut doloremque odit adipisci nihil blanditiis suscipit deleniti quasi ad porro reprehenderit explicabo quod vitae eveniet quidem.
          </p>
          <div class="text-right mt-8 flex justify-end">
            <Button size="lg" variant="tertiary" @click="step = 2">SIGUIENTE</Button>
          </div>
        </div>
        <div v-if="step === 2" key="step2">
          <h4 class="font-semibold">
            {{ questions[0].question }}
          </h4>
          <ul class="mt-6">
            <li
              @click="e => selectResponse(response.correct, e)"
              class="border rounded p-2 mb-3 cursor-pointer hover:bg-gray-200 hover:border-gray-300 transition"
              v-for="(response, i) in questions[0].responses" :key="i">
              <span class="font-bold text-primary mr-1" v-if="i === 0">A.</span>
              <span class="font-bold text-primary mr-1" v-else-if="i == 1">B.</span>
              <span class="font-bold text-primary mr-1" v-else>C.</span>
              {{ response.text }}
            </li>
          </ul>
        </div>
        <div v-if="step === 3" key="step3">
          <h3 class="text-center text-2xl text-white font-semibold mb-8 mt-8">
            Vence al cáncer de próstata
          </h3>
          <div
            class="container flex items-center justify-center mt-5">
            <div class="bg-white rounded">
              <table class="rounded">
                <tr>
                  <td v-for="(num, i) in 3"
                    :key="i"
                    :id="i"
                    v-html="cells[i]"
                    :style="cellsStyles[i]"
                    @click="fcell(i)"></td>
                </tr>
                <tr>
                  <td
                    v-for="(num,i) in 3"
                    :key="i + 3"
                    :id="i+3"
                    v-html="cells[i + 3]"
                    :style="cellsStyles[i + 3]"
                    @click="fcell(i + 3)"></td>
                </tr>
                <tr>
                  <td
                    v-for="(num,i) in 3"
                    :key="i + 6"
                    :id="i+6"
                    v-html="cells[i + 6]"
                    :style="cellsStyles[i + 6]"
                    @click="fcell(i + 6)"></td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </transition>

    </div>


    <div v-if="false"
      class="
        container
        flex
        flex-col-reverse
        items-center
        justify-center
        mb-5
        mt-2
      "
    >
      <div id="final"></div>
      <div id="mensaje" v-show="false" >
        {{ message }}
      </div>
    </div>

    <Toast ref="toast-tic-tac" :type="toast.type" :visibleTime="5">
      <p>{{ toast.message }}</p>
    </Toast>
  </div>
</template>

<script>

import Questions from '@/helpers/questions/cancer_mama';
import { suffleArray } from '@/helpers';
import cancerIcon from '@/static/icons/cancer.svg.js';
import germIcon from '@/static/icons/germ.svg.js';

let questions = [];
for (let i = 0; i < Questions.length; i++) {
  questions[i] = Questions[i];
  questions[i].responses = suffleArray(questions[i].responses);
  questions[i].id = i;
}
questions = suffleArray(questions);

export default {
  data() {
    return {
      map: [0,0,0,0,0,0,0,0,0],
      cells: ['', '', '', '', '', '', '', '', ''],
      cellsStyles: [{}, {}, {}, {}, {}, {}, {}, {}, {}],
      player: 1,
      NumberOfPlayers: 1,
      choice: 0,
      corners: [0,2,6,8],
      message: 'Haz tu primer movimiento',
      step: 1,
      questions: questions,
      questionsDisplayed: [],
      turn: 0,
      resultResponse: false,
      toast: {
        type: 'error',
        message: 'La respuesta ha sido incorrecta'
      }
    }
  },
  methods: {
    reset() {
      this.player = 1;
      this.NumberOfPlayers = 0;
      this.choice = 0;
      this.map = [0,0,0,0,0,0,0,0,0];
      this.message = 'Haz tu primer movimiento';
      this.draw();
    },
    draw(){

      for (let i = 0; i < 9; i++) {
        if ( this.map[i] === 0 ){
          this.cells[i] = '';
        } else if ( this.map[i] === 1 ) {
          if (this.resultResponse) {
            this.$set(this.cells, i, cancerIcon);
            this.cellsStyles[i] = { fill: "#037dc4" };
          } else {
            this.$set(this.cells, i, germIcon);
            this.cellsStyles[i] = { fill: "#999c9e" };
          }

        } else {
          if(this.resultResponse) {
            this.$set(this.cells, i, germIcon);
            this.cellsStyles[i] = { fill: "#999c9e" };
          } else {
            this.$set(this.cells, i, cancerIcon);
            this.cellsStyles[i] = { fill: "#037dc4" };
          }
        }
      }
    },
    playing(turn) {
      this.choice = turn;
      this.play();
    },
    final() {
      let espacios = 0;
      for(let i = 0; i < this.map.length; i++) {
        if(this.map[i]==0) espacios++;
      }
      for(let a = 0; a < 8; a+=3) {
        if(this.map[a] == this.map[a+1] &&
          this.map[a+1] == this.map[a+2] &&
          this.map[a]>0) return this.map[a];
      }

      for(let b = 0; b < 3; b++) {
        if(this.map[b] == this.map[b+3] &&
          this.map[b+3]== this.map[b+6] &&
          this.map[b]>0) return this.map[b];
      }

      if(this.map[0] == this.map[4] &&
        this.map[4] == this.map[8] &&
        this.map[0] > 0) return this.map[0];

      if(this.map[2] == this.map[4] &&
        this.map[4] == this.map[6] &&
        this.map[2]>0) return this.map[2];

      if(espacios==9) return 9;
      if(espacios==0) return 0;
    },
    isEqual(a1, a2){
      let equal = true;
      for (let i = 0; i < a1.length; i++) {
        if( a1[i] != a2[i] ) equal = false;
      }
      return equal;
    },
    fcell(cell){

      if (this.NumberOfPlayers==1){
        if (this.choice == this.player ) this.message = "Juego yo";
        else this.message = "Juegas tú";
      }

      if (this.map[cell] != 0) {
        this.message ="Esa celda ya está ocupada";
      }
      else if(this.player == 1) {
        this.map[cell] = 1;
        this.player = 2;
      }
      else {
        this.map[cell] = 2;
        this.player = 1;
      }

      this.draw();

      switch (this.final()){
        case 0:
          this.message ="Empate, no hay movimientos";
        //pregunta();
        break;
        case 1:
          if (this.NumberOfPlayers == 1){
            if (this.choice == 1) this.message ="Has ganado!!!";
            else this.message ="Ordenador gana";
          }
        break;
        case 2:
          if (this.NumberOfPlayers == 1){
            if (this.choice == 2) this.message="Has ganado!!!";
            else this.message="Ordenador gana";;
          }
        break;
        default:
          if ( this.player != this.choice){ this.play() }
      }
    },
    winningMove(num) {
      let trio=[0,0,0];

      for (let a = 0; a < 8; a+=3) {
        trio[0] = this.map[a];
        trio[1] = this.map[a+1];
        trio[2] = this.map[a+2];

        let first = trio.indexOf(num);
        let last = trio.lastIndexOf(num);
        var zero= trio.indexOf(0);

        if (first != last && zero != -1){
          this.fcell(a + zero);
          return true;
        }
      }
      for (let b = 0; b < 3; b++) {
        trio[0]= this.map[b];
        trio[1]= this.map[b+3];
        trio[2]= this.map[b+6];

        let first = trio.indexOf(num);
        let last = trio.lastIndexOf(num);
        let zero =trio.indexOf(0);

        if (first != last && zero != -1){
          this.fcell(b + zero * 3);
          return true;
        }

      }
      trio[0] = this.map[0];
      trio[1] = this.map[4];
      trio[2] = this.map[8];
      let zerof = trio.indexOf(0);

      if ( trio.indexOf(num) != trio.lastIndexOf(num) && zerof !=-1){
        this.fcell(zerof * 4);
        return true;
      }

      trio[0] = this.map[2];
      trio[1] = this.map[4];
      trio[2] = this.map[6];
      zerof = trio.indexOf(0);
      if (trio.indexOf(num) != trio.lastIndexOf(num) && zerof != -1){
        this.fcell(2 * zerof +2);
        return true;
      }
    },
    play() {
      if (this.choice == 2){ // casos en los que empieza el ordenador
        if (this.player != this.choice){
          if (this.final() == 9){
            this.fcell(8);
          } else {
            if (!this.winningMove(1)){
              if(!this.winningMove(2)){
                if (
                  this.isEqual(this.map,[0,2,0,0,0,0,0,0,1])||
                  this.isEqual(this.map,[0,0,0,2,0,0,0,0,1])||
                  this.isEqual(this.map,[0,0,0,0,0,2,0,0,1])) this.fcell(6);
                else if (
                  this.isEqual(this.map,[0,0,0,0,0,0,0,2,1])) this.fcell(2);
                else if (
                  this.isEqual(this.map,[2,0,0,0,0,0,0,0,1])||
                  this.isEqual(this.map,[0,0,2,0,0,0,0,0,1])) this.fcell(6);
                else if ( this.isEqual(this.map,[0,0,0,0,0,0,2,0,1]) ) this.fcell(2);
                else if (this.map [4] ==0) {
                  if (this.map[8] == 1 && (this.map[6] == 1 || this.map[2] == 1)) this.fcell(4);
                }
                else if ( this.isEqual(this.map,[0,0,0,0,2,0,0,0,1]) ) this.fcell(0);
                else if ( this.isEqual(this.map,[1,0,2,0,2,0,0,0,1]) ) this.fcell(6);
                else if ( this.isEqual(this.map,[1,0,0,0,2,0,2,0,1]) ) this.fcell(2);
                else {
                  this.isEqual(this.map.indexOf(0));
                }
              }
            }
          }
        }
      } else if (this.player == 2){
        if ( !this.winningMove(2) ) {
              if ( !this.winningMove(1) ) {
                if ( this.map[4] == 0) this.fcell(4);
                else if ( this.isEqual(this.map,[0,0,0,0,1,0,0,0,0]) ) this.fcell(8);
                else if((
                  this.map[0] == 1 ||
                  this.map[2] == 1 ||
                  this.map[6] == 1 ||
                  this.map[8] == 1 ) && this.map[1] == 0) this.fcell(1);
                else if((
                  this.map[0] == 1 ||
                  this.map[2] == 1 ||
                  this.map[6] == 1 ||
                  this.map[8] == 1 ) && this.map[3] == 0) this.fcell(3);
                else if (
                  this.isEqual(this.map,[0,1,0,0,2,0,0,1,0]) ||
                  this.isEqual(this.map,[0,0,0,1,2,1,0,0,0]) ) this.fcell(2);
                else{
                  this.fcell(this.map.indexOf(0));
                }
              }

        }
      }
    },
    selectResponse(response, event) {
      event.currentTarget.classList.remove('hover:bg-gray-200', 'hover:border-gray-300')
      if (!response) {
        event.currentTarget.classList.add('border-red-700', 'bg-red-400', 'hover:bg-red-500', 'hover:border-red-800')
        this.toast.type = 'error';
        this.toast.message = 'La respuesta ha sido incorrecta, comenzará el cáncer jugando.'

      } else {
        event.currentTarget.classList.add('border-green-700', 'bg-green-400', 'hover:bg-green-500', 'hover:border-green-800')
        this.toast.type = 'success';
        this.toast.message = 'La respuesta ha sido correcta, comenzarás jugando.'
      }

      if (this.turn === 0 && response) {
        this.resultResponse = true
      }


      this.$refs['toast-tic-tac'].show();
      // await setTimeout(() => {
      //   this.step = 3;
      // }, 1000)
      this.step = 3;
      if (this.turn === 0 && response ) {
        this.playing(1)
      } else {
        this.playing(2)
      }

      console.log(this.cells, this.cellsStyles)

    }
  }
}
</script>


<style lang="postcss" scoped>


td {
  width: 100px;
  height: 100px;
  border: 4px solid #1c74a7;
  font-size: 60px;
  color: #ff0000;
  color: #999c9e;
  @apply hover:bg-gray-400 cursor-pointer text-center;
}

td svg {
  width: 40px;
  height: 40px;
}



#mensaje {
  font-size: 1.5em;
  color: red;
}

.slide-enter {
  transform: translateX(100%);
  opacity: 0;
}
.slide-enter-to { transform: translateX(0), }
.slide-slide-enter-active { position: absolute }

.slide-leave { transform: translateX(0) }
.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active { transition: all .35s linear }
</style>
