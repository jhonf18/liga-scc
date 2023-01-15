<template>
  <div class="py-6 sm:py-4">
    <h1 class="text-2xl sm:text-4xl font-bold text-primary text-center">Tres en raya</h1>

    <div class="mt-8 container mx-auto max-w-4xl border rounded px-4 py-5 shadow-lg w-full-1rem transition duration-500"
      :class="{ 'bg-purple-400': step === 3 }" >
      <transition name="slide" mode="out-in" >
        <div v-if="step === 1" key="step1">
          <h3 class="text-center text-xl sm:text-2xl font-semibold mb-8">
            Instrucciones de juego
          </h3>
          <p class="mt-4 text-sm sm:text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit nihil quaerat iste fugiat quidem, nesciunt quasi quia harum tempore illum doloribus impedit assumenda eaque, quibusdam sunt natus deleniti, praesentium optio?
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus aliquam, cupiditate, delectus magnam ut doloremque odit adipisci nihil blanditiis suscipit deleniti quasi ad porro reprehenderit explicabo quod vitae eveniet quidem.
          </p>
          <div class="text-right mt-8 flex justify-end">
            <Button size="lg" variant="tertiary" @click="step = 2">SIGUIENTE</Button>
          </div>
        </div>
        <div v-if="step === 2" key="step2">

          <h3 class="text-center font-semibold text-lg sm:text-xl mb-6 text-tertiary">
            Responde esta pregunta para definir el saque inicial
          </h3>

          <h4 class="font-semibold">
            {{ questions[0].question }}
          </h4>
          <ul class="mt-6">
            <li
              @click="e => selectResponse(response.correct, e, i)"
              class="border rounded p-2 mb-3 cursor-pointer hover:bg-gray-200 hover:border-gray-300 transition"
              v-for="(response, i) in questions[0].responses" :key="i">
              <span class="font-bold text-primary mr-1" v-if="i === 0">A.</span>
              <span class="font-bold text-primary mr-1" v-else-if="i == 1">B.</span>
              <span class="font-bold text-primary mr-1" v-else-if="i == 2">C.</span>
              <span class="font-bold text-primary mr-1" v-else>D.</span>
              {{ response.text }}
            </li>
          </ul>
        </div>
        <div v-if="step === 3" key="step3">
          <h3 class="text-center text-2xl sm:text-4xl text-white font-semibold mb-5 mt-8">
            Combate al tabaquismo
          </h3>
          <div class="container flex items-center justify-center mt-5">
            <div class="bg-white rounded relative">
              <div class="absolute w-full h-full top-0 left-0 bg-gray-400/[0.6]" v-if="disabledGame">
              </div>
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
          <div class="mt-8 max-w-xl mx-auto">
            <Button
              v-if="disabledGame"
              @click="reset"
              variant="tertiary" size="block">
              Volver a jugar
            </Button>
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

    <Toast ref="toast-tic-tac" :type="toast.type" :visibleTime="toast.visibleTime">
      <p>{{ toast.message }}</p>
    </Toast>

    <Modal
      id="modal-questions"
      ref="modal-questions"
      target="modal-questions"
      title="Responde para avanzar"
      :footer="false">
      <h4 class="font-semibold">
        {{ modal.question }}
      </h4>
      <ul class="mt-6">
        <li
          @click="e => selectResponse(response.correct, e, i, true)"
          class="border rounded p-2 mb-3 cursor-pointer hover:bg-gray-200 hover:border-gray-300 transition"
          v-for="(response, i) in modal.responses" :key="i">
          <span class="font-bold text-primary mr-1" v-if="i === 0">A.</span>
          <span class="font-bold text-primary mr-1" v-else-if="i == 1">B.</span>
          <span class="font-bold text-primary mr-1" v-else-if="i == 2">C.</span>
          <span class="font-bold text-primary mr-1" v-else>D.</span>
          {{ response.text }}
        </li>
      </ul>
    </Modal>

    <Modal
      id="modal-result"
      ref="modal-result"
      target="modal-result"
      :title="modalResult.title"
      :footer="false">
      <p class="text-center fonf-semibold text-xl">
        {{ modalResult.content }}
      </p>
      <div class="flex justify-center items-center mt-8">
        <Button @click="repeatGame" size="md" variant="outline-primary">
          Repetir juego
        </Button>
      </div>
    </Modal>


  </div>
</template>

<script>

import Questions from '@/helpers/questions/tabaquismo';
import { suffleArray } from '@/helpers';
import cancerIcon from '@/static/icons/cancer.svg.js';
import noSmokingIcon from '@/static/icons/no-smoking.svg.js'

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
      cell: -1,
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
      userResponseQuestion: false,
      toast: {
        type: 'error',
        message: 'La respuesta ha sido incorrecta',
        visibleTime: 5
      },
      modal: {
        question : '',
        responses: []
      },
      modalResult: {
        title: '',
        content: '',
        textFooter: 'Repetir'
      },
      disabledGame: false
    }
  },
  mounted(){
    if(process.client) {
      this.$ga.page(this.$router)
    }
  },
  methods: {
    reset() {
      this.disabledGame = false
      this.player = 1;
      this.NumberOfPlayers = 0;
      this.choice = 0;
      this.step = 2;
      this.cell = -1;
      this.map = [0,0,0,0,0,0,0,0,0];
      this.cells = ['', '', '', '', '', '', '', '', ''],
      this.cellsStyles = [{}, {}, {}, {}, {}, {}, {}, {}, {}]
      this.message = 'Haz tu primer movimiento';
      this.turn = 0;
      this.resultResponse = false;
      this.draw();
    },
    draw(){

      for (let i = 0; i < 9; i++) {
        if ( this.map[i] === 0 ){
          this.cells[i] = '';
        } else if ( this.map[i] === 1 ) {
          if (this.resultResponse) {
            this.$set(this.cells, i, cancerIcon);
            this.cellsStyles[i] = { fill: "#282b53" };
          } else {
            this.$set(this.cells, i, noSmokingIcon );
            this.cellsStyles[i] = { fill: "#999c9e" };
          }

        } else {
          if(this.resultResponse) {
            this.$set(this.cells, i, noSmokingIcon );
            this.cellsStyles[i] = { fill: "#999c9e" };
          } else {
            this.$set(this.cells, i, cancerIcon);
            this.cellsStyles[i] = { fill: "#282b53" };
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
        if(this.map[i] == 0) espacios++;
      }

      for(let a = 0; a < 8; a+=3) {
        if(this.map[a] == this.map[a+1] &&
          this.map[a+1] == this.map[a+2] &&
          this.map[a] > 0) return this.map[a];
      }

      for(let b = 0; b < 3; b++) {
        if(this.map[b] == this.map[b+3] &&
          this.map[b+3] == this.map[b+6] &&
          this.map[b] > 0) return this.map[b];
      }

      if(this.map[0] == this.map[4] &&
        this.map[4] == this.map[8] &&
        this.map[0] > 0) return this.map[0];

      if(this.map[2] == this.map[4] &&
        this.map[4] == this.map[6] &&
        this.map[2] > 0) return this.map[2];

      if(espacios == 9) return 9;
      if(espacios == 0) return 0;
    },
    isEqual(a1, a2){
      let equal = true;
      for (let i = 0; i < a1.length; i++) {
        if( a1[i] != a2[i] ) equal = false;
      }
      return equal;
    },
    fcell(cell){

      console.log(this.map);

      this.cell = cell;

      const lengthQuestions = this.questions.length;

      if (lengthQuestions !== 0) {

        if (this.turn !== 0 && this.choice === this.player) {

          const index = Math.floor( Math.random() * lengthQuestions); //Random index
          const question = this.questions[index];
          this.modal = {
            question: question.question,
            responses: question.responses
          }

          this.$refs['modal-questions'].open();

          this.turn++;

        } else {
          this.turn++;
          this.continousFcell(cell);
        }

      } else {
        this.questions = this.shuffleQuestions();
        this.fcell(cell);
      }
    },
    continousFcell(cell) {

      if (this.choice == this.player ) this.message = "Juego yo";
      else this.message = "Juegas tú";

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

      switch ( this.final() ){
        case 0:
          this.showFinalModal('TIE');
        break;
        case 1:
          if (this.choice == 1) {
            this.showFinalModal('WINNER');
          }
          else {
            this.showFinalModal('LOSE');
          }
        break;
        case 2:
          if (this.choice == 2) this.showFinalModal('WINNER');
          else this.showFinalModal('LOSE');
        break;
        default:
          if ( this.player != this.choice){ this.play() }
      }
    },
    winningMove(num) {
      if (new Date().getTime() % 9 !== 0) {
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
      } else {
        let index = -1;
        for (let i = 0; i < 9; i++) {
          if (this.map[i] === 0) {
            index = i;
            break;
          }
        }
        if (index > -1 ) {
          this.fcell(index);
          return true;
        }
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
    selectResponse(response, event, index, playing) {

      if (!playing) {
        if (!response) {
          this.toast.type = 'error';
          this.toast.message = 'La respuesta ha sido incorrecta, comenzará el cáncer jugando.'
        } else {
          this.toast.type = 'success';
          this.toast.message = 'La respuesta ha sido correcta, comenzarás jugando.'
        }
      } else {
        this.toast.visibleTime = 3;
        if (!response) {
          this.toast.type = 'error';
          this.toast.message = 'Has respondido incorrectamente, vuelve a intentarlo para que sigas luchando contra el cáncer.'
        } else {
          this.toast.type = 'success';
          this.toast.message = 'Perfecto, has respondido correctamente.'
        }
      }


      this.$refs['modal-questions'].closeByButton();

      event.currentTarget.classList.remove('hover:bg-gray-200', 'hover:border-gray-300')

      if (!response) {
        event.currentTarget.classList.add('border-red-700', 'bg-red-400', 'hover:bg-red-500', 'hover:border-red-800')
        this.userResponseQuestion = false;
      } else {
        event.currentTarget.classList.add('border-green-700', 'bg-green-400', 'hover:bg-green-500', 'hover:border-green-800')
        this.userResponseQuestion = true;
        this.continousFcell(this.cell)
      }

      if (this.turn === 0 && response) {
        this.resultResponse = true
      }

      this.$refs['toast-tic-tac'].show();

      if (!playing) {
        this.step = 3;
        if (this.turn === 0 && response ) {
          this.playing(1)
        } else {
          this.playing(2)
        }
      }

      this.questions.splice(index, 1);

    },
    shuffleQuestions(){
      let questions = [];
      for (let i = 0; i < Questions.length; i++) {
        questions[i] = Questions[i];
        questions[i].responses = suffleArray(questions[i].responses);
        questions[i].id = i;
      }
      questions = suffleArray(questions);
      return questions;
    },
    showFinalModal(result) {
      this.modalResult.result = result;
      this.disabledGame = true;

      if (result === 'TIE') {
        this.modalResult.title = 'Empate';
        this.modalResult.content ="Vuelve a competir contra el cáncer para que lo puedas vencer.";
      } else if (result === 'WINNER') {
        this.modalResult.title = '¡Ganaste!';
        this.modalResult.content ="¡Felicitaciones! Haz vencido al cáncer.";
      } else {
        this.modalResult.title = 'Perdiste';
        this.modalResult.content ="El cáncer te ha vencido, pero no te preocupes, intenta ganarle al cáncer nuevamente.";
      }
      this.$refs['modal-result'].open();
    },
    repeatGame() {
      this.$refs['modal-result'].closeByButton();
      this.reset();
    }
  }
}
</script>


<style lang="postcss" scoped>


td {
  width: 100px;
  height: 100px;
  font-size: 60px;
  @apply hover:bg-gray-300 border-4 border-purple-500 cursor-pointer text-center;
}

td svg {
  width: 50px;
  height: 50px;
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
