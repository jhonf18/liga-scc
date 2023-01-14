import Vue from 'vue';
import Vue2TouchEvents from 'vue2-touch-events';

Vue.use(Vue2TouchEvents, {
  longTapTimeInterval: 100,
  touchHoldTolerance: 100,
});
