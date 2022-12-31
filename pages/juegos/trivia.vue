<template>
  <div class="flex items-center justify-center">
    <canvas id='canvas' width='880' height='500'
    data-responsiveMinWidth="180"
    data-responsiveScaleHeight="true"
    data-responsiveMargin="50">
        </canvas>
  </div>
</template>

<script>
export default {
  mounted() {
        //const Winwheel = require('@/static/js/Winwheel.js')
        //console.log(Winwheel)
    let theWheel = new Winwheel({
      'numSegments'  : 8,
        'textFontSize' : 28,
        'outerRadius': 200,
        'responsive'   : true,  // This wheel is responsive!
        'segments'     :
        [
            {'fillStyle' : '#eae56f', 'text' : 'Prize 1'},
            {'fillStyle' : '#89f26e', 'text' : 'Prize 2'},
            {'fillStyle' : '#7de6ef', 'text' : 'Prize 3'},
            {'fillStyle' : '#e7706f', 'text' : 'Prize 4'},
            {'fillStyle' : '#eae56f', 'text' : 'Prize 5'},
            {'fillStyle' : '#89f26e', 'text' : 'Prize 6'},
            {'fillStyle' : '#7de6ef', 'text' : 'Prize 7'},
            {'fillStyle' : '#e7706f', 'text' : 'Prize 8'}
        ],
        'pins' :
        {
            'outerRadius': 6,
            'responsive' : true, // This must be set to true if pin size is to be responsive.
        },
        'animation' :
        {
            'type'     : 'spinToStop',
            'duration' : 5,
            'spins'    : 8,
        }
    });
  },
  head() {
    return {
      script: [
        { src: '/js/Winwheel.min.js' }
      ]
    }
  }
}
</script>
