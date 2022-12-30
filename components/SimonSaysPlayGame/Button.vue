<template>
  <div class="game-lights-button">
    <button ref="btn" :style="`background-color:${color}`" @click='click($event)' :data-light-button="shortkey">
        {{shortkey}}
    </button>
  </div>
</template>

<script>
export default {
  name: 'LightsButton',
  props: {
    shortkey: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    },
    sound: {
      type: String,
      required: true
    }
  },
  methods: {
    click ($event) {
      const turn = this.$store.state.state;
      if (turn != 'listening' && (!$event || $event.isTrusted)) {
        // if user triggered an action when is not its turn
        // the action will be ignored.
        return;
      }
      const $btn = this.$refs.btn;
      const key = $btn?.dataset?.lightButton.toLowerCase();
      $btn.classList.add('click');
      setTimeout(() => { $btn.classList.remove('click'); }, 200);
      this.playSound(require(`~/static/sounds/${this.sound}`));
      this.checkSequence(key);
    },
    checkSequence (key) {
      if (window.$gamelights.getState() === 'listening') {
        this.$store.state.hits.push(key);
        const keymap = {"e": 0, "i": 1, "f": 2, "j": 3};
        const keyindex = keymap[key.toLowerCase()];
        const expected = window.$gamelights.shiftSequence();
        if (expected == keyindex) {
          if (!window.$gamelights.sequence().length) {
            setTimeout(() => {
              if (this.$store.state.state == "gameover") return;
              window.$gamelights.setState('waiting');
              window.$gamelights.levelUp();
            }, 1000);
          }
        } else {
          window.$gamelights.gameOver();
        }
      }
    },
    playSound (sound) {
      const audio = new Audio(sound);
      audio.play();
    }
  },
  mounted () {
    document.addEventListener('keypress', e => {
      const shortkey = this.shortkey.toLowerCase();
      if (e.key.toLowerCase() == shortkey || e.code.toLowerCase() == `key${shortkey}`) {
        this.click();
      }
    });
  }
}
</script>
<style scoped lang="postcss">
  .game-lights-button {
    outline: none;
    user-selection: none;
    animation: effect_dylan 800ms;
    -webkit-tap-highlight-color: transparent;
    button {
      position: relative;
      display: inline-block;
      cursor: pointer;
      margin: 0 auto;
      width: 56px;
      height: 56px;
      border-radius: 100%;
      outline: none;
      overflow: visible;
      transition: all 100ms ease-in;
      color: #ffffff;
      font-weight: 700;
      opacity: .5;
      cursor: pointer;
      border: dotted 1px transparent;
      box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
      span {
        font-size: 18px;
        opacity: .8;
      }
      &:before {
        content: '';
        background-color: currentColor;
        border-radius: 50%;
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        transform: scale(0.001, 0.001);
      }
      &.click {
        opacity: 1;
        pointer-events: none;
        user-select: none;
        &:before {
          outline: none;
          user-selection: none;
          pointer-events: none;
          animation: effect_dylan 800ms;
        }
      }
    }
    @keyframes effect_dylan {
      50% {
        will-change: scale;
        transform: scale(3, 3);
        opacity: 0;
      }
      99% {
        will-change: scale;
        transform: scale(0.001, 0.001);
        opacity: 0;
      }
      100% {
        will-change: scale;
        transform: scale(0.001, 0.001);
        opacity: 1;
      }
    }
  }
</style>
