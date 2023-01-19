<template>
  <main class="py-6 sm:py-4">
    <h1 class="text-2xl sm:text-4xl font-bold text-primary text-center">
      Trivia contra el cáncer
    </h1>
    <div
    class="container mx-auto max-w-4xl p-4 mt-8 border rounded px-4 py-5 shadow-lg w-full-1rem transition duration-500"
    :class="{ 'bg-blue-100': step === 2 }">
      <transition name="slide" mode="out-in">
        <div v-if="step === 1" key="step-1">
          <h3 class="text-center text-xl sm:text-2xl font-semibold mb-8">
          Instrucciones de juego
          </h3>
          <p class="mt-4 text-sm sm:text-base">
            Para demostrar tu conocimiento sobre el cáncer y vencer la trivia, ten en cuenta:
          </p>
          <ul class="text-sm sm:text-base pl-4 list-decimal">
            <li>
              Haz girar la ruleta del cáncer y responde correctamente las preguntas para continuar venciendo la trivia del cáncer.
            </li>
            <li>
              Cada vez que respondas correctamente, estarás eliminando un color y también acercandote a salir vencedor de la trivia.
            </li>
            <li>
              Si respondes incorrectamente, tendrás que volver a girar la ruleta.
            </li>
            <li>
              Serás ganador de la trivia contra el cáncer si logras eliminar todos los colores de la ruleta.
            </li>
          </ul>
          <div class="text-right mt-8 flex justify-end">
            <Button size="lg" variant="tertiary" @click="step = 2">SIGUIENTE</Button>
          </div>
        </div>
        <div v-if="step === 2" key="step-3">
          <h3 class="text-center text-2xl sm:text-4xl text-gray-600 font-semibold mb-4 mt-4">
            ¿Qué tanto sabes sobre el cáncer?
          </h3>
          <div class="flex justify-center" v-if="rouletteVisible && !finalQuestion">
            <!-- type: image -->
            <FortuneWheel
              :duration="8500"
              :key="componentKey"
              style="width: 500px"
              :canvas="canvasOptions"
              :useWeight="true"
              :disabled="disabled"
              :prizes="prizes"
              :verify="canvasVerify"
              :angleBase="-10"
              @rotateStart="onRotateStart"
              @rotateEnd="onRotateEnd"
            >
              <!-- <img slot="wheel" src="@/assets/wheel.png" /> -->
            </FortuneWheel>
          </div>
          <div v-else-if="!rouletteVisible && !finalQuestion">
            <div class="flex justify-between items-center px-2 mt-6">
              <h4 class="font-semibold text-xl md:text-2xl">
                {{ modal.question }}
              </h4>
              <img
                class="w-11 h-11 md:w-14 md:h-14 lg:w-20 lg:h-20 mr-2"
                :src="require(`~/static/images/${modal.nameFileIcon}`)" alt="Icono de pregunta">
            </div>
            <ul class="mt-6 grid grid-cols-2 gap-4 mb-6">
              <li
                @click="e => selectResponse(response.correct, e, i)"
                class="border text-center font-semibold rounded px-4 py-3 text-gray-100 cursor-pointer transition"
                :class="{
                  'bg-red-wheel border-red-wheel': i === 0,
                  'bg-orange-wheel': i === 1 ,
                  'bg-blue-wheel': i === 2,
                  'bg-green-wheel': i === 3
                }"
                v-for="(response, i) in modal.responses" :key="i">
                <span
                  class="font-bold text-gray-300 mr-1"
                  v-if="i === 0">A.</span>
                <span class="font-bold text-gray-300 mr-1"
                  v-else-if="i == 1">B.</span>
                <span class="font-bold text-gray-300 mr-1"
                  v-else-if="i === 3">C.</span>
                <span class="font-bold text-gray-300 mr-1" v-else>D.</span>
                {{ response.text }}
              </li>
            </ul>
          </div>
          <div v-else-if="finalQuestion">
            <h4 class="font-semibold text-xl md:text-2xl text-center mt-8">
              ¡Felicitaciones! Venciste al cáncer
            </h4>

            <div class="mt-8 max-w-xl mx-auto">
              <Button @click="clickToResetGame" variant="tertiary" size="block">
                Volver a jugar
              </Button>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <Modal
      size="xl"
      id="modal-questions"
      ref="modal-questions"
      target="modal-questions"
      :title="titleModal"
      :footer="false">
      <div class="flex justify-between items-center px-2 mt-6">
        <h4 class="font-semibold text-xl md:text-2xl">
        {{ modal.question }}
      </h4>
      <img
        class="w-11 h-11 md:w-14 md:h-14 lg:w-20 lg:h-20 mr-2"
        :src="require(`~/static/images/${modal.nameFileIcon}`)" alt="Icono de pregunta">
      </div>
      <ul class="mt-6 grid grid-cols-4 gap-4 mb-6">
        <li
          @click="e => selectResponse(response.correct, e, i)"
          class="col-span-2 border text-center font-semibold rounded px-4 py-3 text-gray-100 cursor-pointer transition"
          :class="{
            'bg-red-wheel border-red-wheel': i === 0,
            'bg-orange-wheel': i === 1 ,
            'bg-blue-wheel': i === 2,
            'bg-green-wheel': i === 3,
            'col-start-2': modal.responses.length === 3 && i === 2
          }"
          v-for="(response, i) in modal.responses" :key="i">
          <span
            class="font-bold text-gray-300 mr-1"
            v-if="i === 0">A.</span>
          <span class="font-bold text-gray-300 mr-1"
            v-else-if="i == 1">B.</span>
          <span class="font-bold text-gray-300 mr-1"
            v-else-if="i === 2">C.</span>
          <span class="font-bold text-gray-300 mr-1" v-else>D.</span>
          {{ response.text }}
        </li>
      </ul>
    </Modal>

    <Toast ref="toast" :type="toast.type" :visible-time="toast.visibleTime">
      <p>
        {{ toast.message }}
      </p>
    </Toast>


  </main>
</template>

<script>
import Questions from '@/helpers/questions/cancer'
import FortuneWheel from 'vue-fortune-wheel'
import 'vue-fortune-wheel/lib/vue-fortune-wheel.css'
import { getIndexOfElementInArray, suffleArray } from '~/helpers'
import metadataDynamic from '~/plugins/metadata/metadata-dynamic'

const questions = suffleArray(Questions);

let prizes = [
  {
    id: 1, //* The unique id of each prize, an integer greater than 0
    name: '1', // Prize name, display value when type is canvas (this parameter is not needed when type is image)
    value: 1, //* Prize value, return value after spinning
    bgColor: '#ef51ab', // Background color (no need for this parameter when type is image)
    color: '#ffffff', // Font color (this parameter is not required when type is image)
    probability: 12.5, //* Probability, up to 4 decimal places (the sum of the probabilities of all prizes
    weight: 1 // Weight, if useWeight is true, the probability is calculated by weight (weight must be an integer), so probability is invalid
  },
  {
    id: 2,
    name: '2',
    value: 2,
    bgColor: '#f42532',
    color: '#ffffff',
    probability: 12.5,
    weight: 1
  },
  {
    id: 3,
    name: '3',
    value: 3,
    bgColor: '#fb9504',
    color: '#ffffff',
    probability: 12.5,
    weight: 1
  },
  {
    id: 4,
    name: '4',
    value: 4,
    bgColor: '#fbde42',
    color: '#ffffff',
    probability: 12.5,
    weight: 1
  },
  {
    id: 5,
    name: '5',
    value: 5,
    bgColor: '#35c967',
    color: '#ffffff',
    probability: 12.5,
    weight: 1
  },
  {
    id: 6,
    name: '6',
    value: 6,
    bgColor: '#1675ce',
    color: '#ffffff',
    probability: 12.5,
    weight: 1
  },
  {
    id: 7,
    name: '7',
    value: 7,
    bgColor: '#8a42b1',
    color: '#ffffff',
    probability: 12.5,
    weight: 1
  },
  {
    id: 8,
    name: '8',
    value: '8',
    bgColor: '#00d699',
    color: '#ffffff',
    probability: 12.5,
    weight: 1
  }
]

export default {
  components: {
    FortuneWheel
  },
  head(){
    const title = this.$routesApp.trivia.name
    const url = `${this.$nuxt.$route.path}`
    const description = 'Vence la trivia del cáncer desde el conocimiento respondiendo preguntas de manera entretenida.'
    const image = 'https://res.cloudinary.com/dsvy4oeqc/image/upload/c_scale,h_750,w_1280/v1673821686/educate-cancer/trivia_cspbop.png'

    const dynamicMeta = metadataDynamic({
      title,
      description,
      url,
      image,
      widthImage: 1280,
      heightImage: 750,
    })
    return { title, meta: [...dynamicMeta] }
  },
  data() {
    return {
      componentKey: 0,
      step: 1,
      canvasVerify: false, // Whether the turntable in canvas mode is enabled for verification
      canvasOptions: {
        borderWidth: 2,
        borderColor: '#584b43',
        fontSize: 40
      },
      disabled: false,
      prizes: JSON.parse(JSON.stringify(prizes)),
      questions: JSON.parse(JSON.stringify(questions)),
      question: {},
      modal: Questions[0],
      toast: {
        type: '',
        text: '',
        visibleTime: 3
      },
      titleModal: 'Responde para avanzar',
      rouletteVisible: true,
      finalQuestion: false
    }
  },
  mounted(){
    if(process.client) {
      this.$ga.page(this.$router)
    }
  },
  methods: {
    clickToResetGame() {
      this.step = 2;
      this.resetGame();
    },
    resetGame() {
      this.titleModal = 'Responde para avanzar';
      this.prizes = JSON.parse(JSON.stringify(prizes));
      this.questions = JSON.parse(JSON.stringify(suffleArray(questions)));
      this.finalQuestion = false;
      this.rouletteVisible = true;
    },
    onRotateStart() {
      if (this.prizes.length === 1) {
        this.rouletteVisible = false;
      } else {
        const rouletteAudioFile = require(`~/assets/sounds/roulette.mp3`).default;
        const rouletteAudio = new Audio(rouletteAudioFile);
        rouletteAudio.play();
      }
    },
    onRotateEnd(prize) {
      this.modal = this.questions[prize.value - 1];
      this.$set(this.modal, 'index_question', prize.value);
      this.$refs['modal-questions'].open();
    },
    selectResponse(response, event, index) {

      // user answered correct the last question
      if (response && this.prizes.length === 1) {
        this.toast.type = 'success';
        this.toast.message = '¡Felicitaciones! Haz vencido al cáncer';
        this.playSound('correct');
        event.currentTarget.classList.remove('hover:bg-gray-200', 'hover:border-gray-300');
        this.$refs['toast'].show();
        this.finalQuestion = true;

        // show final modal and button of replay
        return;
      }

      if (!response && this.prizes.length === 1) {
        this.toast.type = 'error';
        this.toast.message = 'Respondiste incorrectamente, puedes volver a intentarlo.';
        this.playSound('fail');
        event.currentTarget.classList.remove('hover:bg-gray-200', 'hover:border-gray-300');
        this.$refs['toast'].show();
        return;
      }

      if (!response) {
        this.toast.type = 'error';
        this.toast.message = 'La respuesta ha sido incorrecta. Aún no puedes eliminar el color';
        this.playSound('fail');
        this.$refs['modal-questions'].closeByButton();
      } else {
        this.playSound('correct')
        this.toast.type = 'success';
        this.toast.message = 'La respuesta ha sido correcta, te faltan menos colores por eliminar';
        const index = getIndexOfElementInArray(this.prizes, 'object', 'id', this.modal.index_question)
        this.prizes.splice(index, 1);
        this.componentKey += 1;
        this.$refs['modal-questions'].closeByButton();
        if(this.prizes.length === 1) {
          const prize = this.prizes[0].value;
          this.modal = this.questions[prize - 1];
          this.titleModal = '¡Última pregunta!'
          this.toast.message = 'Te falta la última pregunta por responder y vencer el cáncer';
        }
      }

      event.currentTarget.classList.remove('hover:bg-gray-200', 'hover:border-gray-300');
      this.$refs['toast'].show();

    },
    playSound(type) {
      let sound;
      if (type === 'correct') {
        sound = require('@/assets/sounds/correct.mp3').default;
      } else if (type === 'fail') {
        sound = require('@/assets/sounds/fail.mp3').default;
      }
      const audio = new Audio(sound);
      audio.play();
    }
  },
}
</script>
