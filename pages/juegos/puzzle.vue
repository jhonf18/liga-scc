<template>
<main class="py-6 sm:py-4">
  <h1 class="text-2xl sm:text-4xl font-bold text-primary text-center">
    Rompecabezas deslizante
  </h1>
  <div>

  </div>
  <div
    class="container mx-auto max-w-4xl p-4 mt-8 border rounded px-4 py-5 shadow-lg w-full-1rem transition duration-500"
    :class="{ 'bg-purple-700': step === 3,
    'px-12': step === 3 }">

    <transition name="slide" mode="out-in">
      <div v-if="step === 1" key="step-1">
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
      <div v-if="step === 2" key="step-2">
        <h4 class="font-semibold">
          Elije la categoría en la cual quieres armar la imagen
        </h4>
        <ul class="mt-6">
          <li
            @click="e => selectResponse(category, e, i)"
            class="border rounded p-2 mb-3 cursor-pointer hover:bg-gray-200 hover:border-gray-300 transition"
            v-for="(category, i) in categories" :key="i">
            <span class="font-bold text-primary mr-1" v-if="i === 0">A.</span>
            <span class="font-bold text-primary mr-1" v-else-if="i == 1">B.</span>
            <span class="font-bold text-primary mr-1" v-else>C.</span>
            {{ category.name }}
          </li>
        </ul>
      </div>
      <div v-if="step === 3" key="step-3">
        <h3 class="text-center text-2xl sm:text-4xl text-white font-semibold mb-4 mt-4">
          Rompele la cabeza al tabaquismo
        </h3>
        <div id="board" class="md:grid md:grid-cols-6">
          <div id="game-group" class="col-span-4">
            <form
              @click="handleClick"
              :aria-label="`${howManyCorrect} of ${ratioSquared} tiles correctly placed.`"
              :class="{dim: dimTiles, invertNumbers: invertNumbers, showNumbers: showNumbers}"
              class="mx-auto">
              <transition-group
                name="slide"
                id="innerBoard"
                tag="div"
                :style="{gridTemplateColumns: `repeat(${ratio}, 1fr)`, gridTemplateColumns: `repeat(${ratio}, 1fr)`}">
                <button
                  v-for="(tile, index) in tiles"
                  :key="tile.val" @keyup.prevent="handleArrow"
                  :index="index" :ref="!tile.val && 'empty'"
                  :disabled="!tile.isPossibleMove && tile.val > 0"
                  class="tile"
                  :class="{ correct: isTileCorrect(tile.val,index), possible_move: tile.isPossibleMove }"
                  :aria-label="getAccessibleTilePosition(tile.val, index)"
                  :style="{
                    backgroundPosition: getBackgroundPosition(tile.val),
                    backgroundSize: `calc(100% * ${ratio}) calc(100% * ${ratio})`
                  }"
                >
                  <span v-if="tile.val">{{showNumbers ? tile.val : ''}}</span>
                </button>
              </transition-group>

              <transition name="fade">
                <div v-if="!gameStarted" class="loader">
                  <p class="font-semibold">
                    Revolviendo el rompecabezas
                    <span class="dot">.</span><span class="dot">.</span><span class="dot">.</span>
                  </p>
                </div>
                <div v-if="winGame && gameStarted"
                  class="absolute top-0 left-0 w-full h-full bg-gray-300/[0.6] flex justify-center items-center z-10">
                  <p class="font-semibold text-center text-2xl text-black">
                    {{ nameImageSelected }}
                  </p>
                </div>
              </transition>
            </form>

            <p id="counter" class="text-center text-gray-300 mx-auto my-4 md:mt-4 block">
              <span id="progress-bar" :style="{width: howManyCorrect / ratioSquared * 100 + '%'}"></span>
              <strong>{{howManyCorrect}} / {{ratioSquared}}</strong>
            </p>

            <p aria-hidden="true" class="text-white mx-auto mb-4 text-center md:text-left">
              Juega con 🖱️, 👆, o ⌨️ ⬆️ ➡️ ⬇️ ⬅️
            </p>
            <p class="sr text-white mx-auto mb-4">
              Juega con el mouse, pantalla, o teclado.
            </p>
          </div>


          <div id="options" class="col-span-2 text-sm p-4 max-w-xl mx-auto">
            <!-- <div id="custom-image">
              <label for="custom-image-input">Custom Image:</label>
              <select v-model="imageSelect" name="imageSelect" id="imageSelect">
                <option value="https://s3-us-west-2.amazonaws.com/s.cdpn.io/240751/sanfran.jpg">Golden Gate</option>
                <option value="https://s3-us-west-2.amazonaws.com/s.cdpn.io/240751/chicago.jpg">Chicago</option>
                <option value="https://s3-us-west-2.amazonaws.com/s.cdpn.io/240751/griff.jpg">Hiding Pupper</option>
                <option value="custom">Custom URL</option>
              </select>

              <input v-if="imageSelect === `custom`" @click="highlightInput" v-model="customImage" id="custom-image-input" type="text"/>
            </div> -->

            <div v-if="showSolution"
              id="solution"
              :style="{backgroundImage: imageSelect == 'custom' ? `url(${customImage})` : `url(${imageSelect})`}"
              class="mb-8">
              <span class="text-3xl">[Solución]</span>
            </div>

            <div class="options-group mb-4">
              <input v-model="showSolution" type="checkbox" id="show-solution">
              <label for="show-solution">Mostrar solución</label>
            </div>

            <div class="options-group mb-4">
              <input v-model="dimTiles" type="checkbox" id="highlight-tiles">
              <label for="highlight-tiles">Oscurecer fichas incorrectas</label>
            </div>

            <div class="options-group mb-8">
              <div class="mb-4">
                <input v-model="showNumbers" type="checkbox" id="show-numbers">
                <label for="show-numbers">Mostrar números</label>
              </div>

              <transition name="fade">
                <div v-if="showNumbers">
                  <input v-model="invertNumbers" type="checkbox" id="invert-numbers">
                  <label for="invert-numbers">Invertir color de los números</label>
                </div>
              </transition>
            </div>

            <Button
              variant="outline-primary"
              @click="nextImage" class="mt-8">
              Siguiente Imagen
            </Button>
            <Button
              variant="outline-primary"
              @click="resetGame" class="mt-4">
              Volver a jugar
            </Button>
          </div>
        </div>
      </div>
    </transition>
  </div>

  <Toast ref="toast-puzzle" type="success" :visible-time="4">
      <p>Ya haz completado todas las imágenes de esta categoría. Dale volver a jugar y selecciona otra categoría.</p>
    </Toast>
</main>
</template>


<script>

const categories = [
  {
    name: 'Categoría 1',
    images: [
      {
        name: 'Imagen 1.1',
        url: 'https://ih0.redbubble.net/image.369334182.5732/flat,1000x1000,075,f.u2.jpg'
      },
      {
        name: 'Imagen 1.2',
        url: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/240751/sanfran.jpg'
      },
      {
        name: 'Imagen 1.3',
        url: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/240751/chicago.jpg'
      },
    ]
  },
  {
    name: 'Categoría 2',
    images: [
      {
        name: 'Imagen 2.1',
        url: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/240751/griff.jpg'
      },
      {
        name: 'Imagen 2.2',
        url: require('~/static/images/playgames/tabaquismo/imagen-1.jpg')
      },
      {
        name: 'Imagen 2.3',
        url: require('~/static/images/playgames/tabaquismo/imagen-2.jpg')
      }
    ]
  },
  {
    name: 'Categoría 3',
    images: [
      {
        name: 'Imagen 3.1',
        url: require('~/static/images/playgames/tabaquismo/imagen-3.jpg')
      }
    ]
  }
]

export default {
  data() {
    return {
      ratio: 3, //👈 A little buggy at some sizes; works best at 4, but ¯\_(ツ)_/¯
			tiles: [],
			solution: [],
			illegalMoves: [],
			invertSwipe: false,
			showNumbers: false,
			invertNumbers: false,
			dimTiles: false,
			imageSelect: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/240751/sanfran.jpg',
			customImage: 'https://ih0.redbubble.net/image.369334182.5732/flat,1000x1000,075,f.u2.jpg',
			showSolution: true,
			gameStarted: false,
      categories: JSON.parse(JSON.stringify(categories)),
      categorySelected: {},
      step: 1,
      winGame: false,
      nameImageSelected: ''
    }
  },
  watch: {
    tiles(newTiles) {
			if (this.gameStarted) {
				//We need nextTick here or the board will render legal moves based on where the empty tile *used to* be
				this.$nextTick(() => {
					const legalMoves = this.getLegalMoves();
					newTiles.forEach((tile, index) => {
						newTiles[index].isPossibleMove = legalMoves.includes(index) ? true : false;
					});
				})
			}
		},
    customImage() {
			document.querySelector('#board').style.setProperty('--backgroundImage', `url(${this.customImage})`);
		},
    imageSelect() {
			document.querySelector('#board').style.setProperty('--backgroundImage', this.imageSelect === 'custom' ? `url(${this.customImage})` : `url(${this.imageSelect})`);
		},
  },
  created() {
    //Generate a board, an answer, and a list of illegal moves based on this.ratio
		const max = this.ratioSquared;
		for(let i=0; i < max; i++) {
			this.tiles.push(i === (max -1) ? { val: '', isPossibleMove: false } : { val: i+1, isPossibleMove: false } );
			this.solution.push(i === (max -1) ? { val: '', isPossibleMove: false } : { val: i+1, isPossibleMove: false } );
			if (i % this.ratio == 0) {
				this.illegalMoves.push(i + (i-1));
			}
		}
  },
  async mounted() {

	},
  computed: {
    randomMoveQty() {
			return (this.ratio * 75);
		},
		howManyCorrect() {
			const correctlyPlacedTiles = this.tiles.filter((tile, index) => {
				return (Number(tile.val) == Number(index + 1) || Number(index + 1) == this.ratioSquared && !tile.val);
			});

			if (correctlyPlacedTiles.length === this.ratioSquared && this.gameStarted === true) {
				setTimeout(()=> {
					// win playgame
          // TODO: Mostrar modal que diga que ha ganado y el nombre de la imagen, con boton de repetir juego
          // TODO: arreglar pantalla en telefono
          this.winGame = true;
        }, 200);
			}

			return correctlyPlacedTiles.length;
		},
    ratioSquared() {
			return this.ratio * this.ratio;
		},
  },
  methods: {
    async selectResponse(category, event){
      event.currentTarget.classList.remove('hover:bg-gray-200', 'hover:border-gray-300')
      event.currentTarget.classList.add('border-green-700', 'bg-green-400', 'hover:bg-green-500', 'hover:border-green-800');
      this.step = 3;

      this.categorySelected = category;

      await this.$nextTick();
      setTimeout(() => {
        const indexRandom = Math.floor(Math.random()* this.categorySelected.images.length);
        const imageSelected = this.categorySelected.images[indexRandom];
        this.imageSelect = imageSelected.url;
        this.nameImageSelected = imageSelected.name
        this.categorySelected.images.splice(indexRandom, 1);
        this.setLoaded()
			}, 1500);
    },
    nextImage () {
      if (this.categorySelected.images.length === 0) {
        //  Show toast
        this.$refs['toast-puzzle'].show()
      } else {
        // Change image
        this.winGame = false;
        const indexRandom = Math.floor(Math.random()* this.categorySelected.images.length);
        const imageSelected = this.categorySelected.images[indexRandom];
        this.imageSelect = imageSelected.url;
        this.nameImageSelected = imageSelected.name
        this.categorySelected.images.splice(indexRandom, 1);
        this.randomizeBoard()
      }
    },
    resetGame() {
      this.categories = JSON.parse(JSON.stringify(categories));
      this.step = 2;
    },
    setLoaded() {
      //Set styles for any board size properly and randomize it to start
      //Set up swipe
      const Hammer = require('hammerjs')
      const innerBoard = document.getElementById('innerBoard');
      const touchBoard = new Hammer(innerBoard);

      touchBoard.get('swipe').set({
        direction: Hammer.DIRECTION_ALL,
      });

      touchBoard.on('swipeup swipedown swipeleft swiperight', (e) => {
        this.handleClick(e);
      });

      //Set the ratio and background image in CSS
      document.querySelector('#board').style.setProperty('--ratio', this.ratio);
      document.querySelector('#board').style.setProperty('--backgroundImage', this.imageSelect === 'custom' ? `url(${customImage})` : `url(${this.imageSelect})`);

      //Prevent arrow keys from scrolling
      innerBoard.addEventListener("keydown", function(e) {
      // space and arrow keys
        if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
          e.preventDefault();
        }
      }, false);

      this.randomizeBoard();
    },
    isTileCorrect(val, index) {
			return val - 1 == index;
		},

		highlightInput(e) {
			e.target.select();
		},

		getBackgroundPosition(val) {
			return val ? `${(100 / (this.ratio - 1)) * (val -1)}% ${Math.floor((val - 1) / this.ratio) * (100 / (this.ratio - 1))}%` : '5% 5%';
		},

		moveIsNotTheSameTile(a, b) {
			return a != b; //Can't shuffle a tile with itself
		},

		moveIsInBounds(a, b) {
			//Don't let the user try to move a tile outside the board
			return (a >= 0 && b >= 0 && a < this.ratioSquared && b < this.ratioSquared);
		},

		moveIsAdjacentTile(a, b) {
			//Tiles are either next to each other or above/below each other
			return (a + b === 1 || a - b === 1 || b - a === 1) ||
			//…And we avoid the loophole where it LOOKS like the move is valid even though it's not because the two indexes are small enough they add up to the board size
			((a + b == this.ratio && a - b >= this.ratio ) || a - b == this.ratio || b - a == this.ratio)
		},

		moveIsNotCrossRowHorizontal(a, b) {
			//Eliminates "adjacent" values on separate rows, like 4 -> 5 on a 4 × 4 grid
			return ( (a - b === 1 || b - a === 1) && !this.illegalMoves.includes(a + b) ) || (a - b !== 1 && b - a !== 1)
		},

		isValidMove(a, b) {
			a = Number(a);
			b = Number(b);
			if (this.moveIsNotTheSameTile(a, b) && this.moveIsInBounds(a, b) && this.moveIsAdjacentTile(a, b) && this.moveIsNotCrossRowHorizontal(a, b)) {
				return true;
			}

			return false;
		},

		randomizeBoard() {
			let randomized = this.randomMoveQty;
			let shuffleSpeed = 10;
			this.gameStarted = false;

			const randomMove = () => {
				if (randomized > 0) {
					const a = this.getEmptyTileIndex();
					const b = this.generateRandomMove(a);

					if (!this.isValidMove(a, b)) {
						randomMove();
					} else {
						this.swap(a, b);
						randomized--;
						if (randomized > 0) {
							this.$nextTick(() => randomMove());
						} else {
							this.gameStarted = true;
							this.focusEmptyTile();
							document.querySelector('#board').style.setProperty('--transition', 'transform .15s ease-out');
							return;
						}
					}
				}
			}

			setTimeout(() => {
				randomMove();
			}, 100);
		},

		getLegalMoves() {
			const emptyIndex = this.getEmptyTileIndex();
			const possibleMoves = [emptyIndex - 1, emptyIndex + 1, emptyIndex - this.ratio, emptyIndex + this.ratio];
			const legalMoves = possibleMoves.filter(index => {
				return this.isValidMove(index, emptyIndex);
			});
			return legalMoves;
		},

		isPossibleMove(index) {
			return this.getLegalMoves().includes(index) ? 'possible-move' : '';
		},

		generateRandomMove(x) {
			x = Number(x);
			const move = Math.floor(Math.random() * this.ratio);
			if (move === 0) {
				return x - 1;
			} else if (move === 1) {
				return x + 1;
			} else if (move === 2) {
				return x - this.ratio;
			} else if (move === 3) {
				return x + this.ratio;
			}
		},

		getAccessibleTilePosition(val, index) {
			let tileIdentifier = val ? `Tile ${val}` : `Empty tile`;
			return `${tileIdentifier} ${val -1 === index ? 'correctly placed' : ''} in position ${index + 1}: row ${Math.floor(index / this.ratio) +1}, column ${index % this.ratio +1}`
		},

		focusEmptyTile() {
			 this.$nextTick(() => this.$refs.empty[0].focus());
		},

		getEmptyTileIndex() {
			return this.$refs.empty ? Number(this.$refs.empty[0].getAttribute('index')) : this.ratioSquared -1;
		},

		handleArrow(e) {
			const emptyIndex = this.getEmptyTileIndex();
			let clickedIndex;

			if (e.which === 37) {
				clickedIndex = emptyIndex - 1;
			} else if (e.which === 38) {
				clickedIndex = emptyIndex - this.ratio;
			} else if (e.which === 39) {
				clickedIndex = emptyIndex + 1;
			} else if (e.which === 40) {
				clickedIndex = emptyIndex + this.ratio;
			} else {
				return;
			}

			if (this.isValidMove(emptyIndex, clickedIndex)) {
				this.swap(emptyIndex, clickedIndex);
				this.gameStarted && this.focusEmptyTile();
			}
		},

		handleClick(e) {
			e.preventDefault();
			//Get the empty tile and the clicked tile, then both of their index values
			const emptyIndex = this.getEmptyTileIndex();
			const wasSwipe = (e.type && e.type.includes('swipe'));
			let clicked;
			let clickedIndex;

			if (wasSwipe) {
				if (e.type === 'swiperight') {
					clickedIndex = this.invertSwipe ? emptyIndex + 1 : emptyIndex - 1;
				} else if (e.type === 'swipeleft') {
					clickedIndex = this.invertSwipe ? emptyIndex - 1 : emptyIndex + 1;
				} else if (e.type === 'swipeup') {
					clickedIndex = this.invertSwipe ? emptyIndex - this.ratio : emptyIndex + this.ratio;
				} else if (e.type === 'swipedown') {
					clickedIndex = this.invertSwipe ? emptyIndex + this.ratio : emptyIndex - this.ratio;
				}
			} else {
				clicked = e.target;
				clickedIndex = Number(clicked.getAttribute('index'));
			}

			if (!(emptyIndex || clickedIndex)) {
				return; //If we don't have a valid index value for both the empty tile and the clicked tile, exit early
			}

			//Check if the clicked move is valid
			if (this.isValidMove(emptyIndex, clickedIndex)) {
				//Shuffle the two tiles if it's a valid move
				this.swap(emptyIndex, clickedIndex);
				//Focus the empty tile if it was a click or keyboard move
				this.gameStarted && !wasSwipe && this.focusEmptyTile();
			} else {
				return; //If it's not a valid move, do nothing
			}
		},

		swap(clickedIndex, emptyIndex) {
			const a = this.tiles[clickedIndex];
			const b = this.tiles[emptyIndex];
			this.$set(this.tiles, clickedIndex, b);
			this.$set(this.tiles, emptyIndex, a);
		}
  }
}
</script>

<style lang="postcss">
:root {
  --dark: #a7a8aa;
  --light: #a7a8aa;
  --highlight: #282b53;
  --background: #b7aeca;
  --loaderColor: #655191;
  --transition: transform .15s;
  --ratio: 3;
  --maxBoardWidth: calc(100vw - 8rem);
  --smallColumn: calc(240px + 2em);
  --backgroundImage: "";
  --radius: 8px;
}


@media (min-width: 480px) {
  :root {
    --maxBoardWidth: calc(100vw - 8rem);
  }
}

@media (min-width: 576px) {
  :root {
    --maxBoardWidth: calc(100vh - 8rem);
  }
}

@media (min-width: 767px) {
  :root {
    --maxBoardWidth: 70vh;
  }
}

@media (min-width: 1020px) {
  :root {
    --maxBoardWidth: 70vh;
  }
}


form, button, input {
  font-family: Nunito, sans-serif;
  color: var(--dark);
  cursor: pointer;
}

#custom-image {
  width: 100%;
  max-width: 40em;
  align-items: center;
}
#custom-image input {
  width: 100%;
  padding: 0.25em;
  font-size: 0.8em;
  margin: 0.5em 0 0;
  border: none;
}
#custom-image + #solution {
  margin-top: 0.5em;
}

#board {
  position: relative;
  min-height: 100%;
}

@media (min-width: 769px) {
}
#board #counter {
  font-size: 1.5em;
  width: var(--maxBoardWidth);
  background: var(--background);
  position: relative;
  line-height: 1.6;
  border-radius: 5vmin;
  overflow: hidden;
}
#board #counter #progress-bar {
  width: 46%;
  height: 100%;
  content: "";
  background: var(--loaderColor) ;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 0;
  transition: width 0.4s ease-in-out;
}
#board #counter strong {
  position: relative;
  z-index: 2;
}
#board label {
  cursor: pointer;
}
#board form {
  width: var(--maxBoardWidth);
  height: var(--maxBoardWidth);
  border-radius: var(--radius);
  border: 1.5vmin solid var(--dark);
  background: var(--dark);
  color: var(--dark);
  cursor: pointer;
  display: flex;
  justify-content: center;
  position: relative;
  overflow: hidden;
}
#board form.dim .tile span:before {
  content: "";
  width: 100%;
  height: 100%;
  padding: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  left: -50%;
  top: -50%;
  z-index: -1;
}
#board form.dim .tile.correct span:before {
  background: transparent;
}
#board form.invertNumbers .tile {
  color: #fff;
}
#board form.invertNumbers .tile.correct {
  color: var(--highlight);
}
#board form.showNumbers .square.possible-move:hover span {
  transform: scale(1.3);
}
#board > p {
  font-size: 1.4rem;
}
#board #options {
  text-align: left;
  position: relative;
  background: var(--background);
  border-radius: var(--radius);
}
@media (min-width: 769px) {
  #board #options {
    width: 100%;
  }
}
#board #options select {
  width: 100%;
  padding: 0.5em;
  font-size: 1em;
  font-family: "Nunito", sans-serif;
  color: #53565a;
  background: #fff;
  margin-top: 0.25em;
  cursor: pointer;
}
#board #options #solution {
  width: 100%;
  height: 0;
  padding: 50% 0;
  opacity: 0.8;
  background-size: 100% 100%;
  position: relative;
  transition: opacity 0.3s ease;
  display: grid;
  line-height: 0;
  place-items: center;
  text-align: center;

  color: rgba(255, 255, 255, 0.5);
  text-shadow: 0px 0px 0.5em rgba(0, 0, 0, 0.5);
  border: 1px solid #000;
}
#board #options #solution:hover {
  opacity: 1;
}
#board #options #solution:after {
  content: "";
  position: absolute;
  display: block;
  width: calc(100% / var(--ratio));
  height: calc(100% / var(--ratio));
  background: var(--dark);
  bottom: 0;
  right: 0;
}

#board #options .options-group input[type=checkbox] {
  transform: scale(1.5);
  margin-right: 0.5em;
}
#board #options .options-group label {
  vertical-align: middle;
}


#innerBoard {
  display: grid;
  height: 100%;
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
}
#innerBoard .tile {
  cursor: initial;
  padding: 0;
  font-size: calc(4.2vmin - (var(--ratio) * .1vmin));
  display: grid;
  text-align: center;
  place-items: center;
  align-content: stretch;
  border: none;
  background: #fff;
  background: var(--backgroundImage);
  position: relative;
  z-index: 1;
  background-size: calc(100% * var(--ratio));
  background-position: 0% 0%;
  overflow: hidden;
}
@media (min-width: 480px) {
  #innerBoard .tile {
    font-size: calc(4vmin - (var(--ratio) * .2vmin));
  }
}
#innerBoard .tile span {
  transition: transform 0.1s;
  pointer-events: none !important;
}
#innerBoard .tile span:before {
  content: "";
  width: 100%;
  height: 100%;
  padding: 100%;
  background: transparent;
  position: absolute;
  left: -50%;
  top: -50%;
  z-index: -1;
}
#innerBoard .tile:focus {
  outline: none;
}
#innerBoard .tile:focus span {
  transform: scale(1.5);
}
#innerBoard .tile.possible-move {
  cursor: pointer;
}
#innerBoard .tile.correct {
  color: var(--highlight) !important;
}
#innerBoard .tile:empty {
  background: var(--dark) !important;
  border-color: var(--dark);
  border: none;
  z-index: 0;
}
#innerBoard .tile:empty:focus {
  outline: none;
  border-radius: 8px;
  outline-offset: -1vmin;
  animation: swell 0.7s infinite alternate ease-in-out;
}
#innerBoard .tile:empty:focus:before {
  width: 40%;
  height: 40%;
  content: "";
  background-color: var(--highlight);
  position: absolute;
  top: calc(50% - 20%);
  left: calc(50% - 20%);
  transform: rotate(45deg);
}
#innerBoard .tile:empty:focus:after {
  content: "";
  width: 35%;
  height: 35%;
  background-color: var(--dark);
  position: absolute;
  top: calc(50% - 17.5%);
  left: calc(50% - 17.5%);
  z-index: 3;
}

.loader {
  display: flex;
  align-items: center;
  position: absolute;
  text-align: left;
  top: -0.5em;
  left: -0.5em;
  width: calc(100% + 1em);
  height: calc(100% + 1em);
  color: #fff;
  background: var(--dark);
  opacity: 0.9;
  z-index: 10;
  text-transform: uppercase;
}
.loader p {
  font-size: calc(.6em + 4vmin);
  padding: 0 1.5em;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateY(0.5em);
}

.dot {
  animation: pulse 0.6s infinite reverse;
  animation-delay: 0;
}
.dot + .dot {
  animation-delay: 0.2s;
}
.dot:last-of-type {
  animation-delay: 0.4s;
}

.sr {
  position: absolute;
  left: -100vw;
  width: 1px;
  height: 1px;
  overflow: hidden;
  opacity: 0;
}

.slide-move {
  transition: var(--transition);
  filter: blur(0.3vmin);
}
.slide-move span:before {
  transition: all 0.3s ease;
}

@-webkit-keyframes swell {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.15);
  }
}

@keyframes swell {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.15);
  }
}
@-webkit-keyframes pulse {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes pulse {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
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
