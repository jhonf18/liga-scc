<template>
  <div>
    <section class="mt-12 mb-4 mx-auto sm:mb-12 p-6 sm:container sm:p-0 lg:p-4 ">
      <h1 class="text-center text-3xl sm:text-5xl font-bold mb-12 text-primary">
        Cáncer de piel
      </h1>
      <div class="md:grid md:grid-cols-5 md:gap-4">
        <div
          @click="openContent"
          class="container-video col-span-3">
          <div
            class="container-video cursor-pointer h-full flex justify-center items-center">
            <div class="filter-container">
              <div class="filter-content flex justify-center items-center w-full h-full">
                <span class="m-auto text-gray-300 text-2xl font-medium">ABRIR</span>
              </div>
            </div>
          </div>
        </div>
        <div class="container-info mt-6 md:mt-0 col-span-2 md:p-4">
          <div>
            <p class="mt-4 mb-8">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Odit dolore molestias natus nulla possimus, perferendis magni numquam.
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias a ratione quam animi odit voluptas, voluptatem optio, maxime at, voluptatum tempore inventore culpa molestiae repellat debitis id tempora dolorem! Doloremque!
              Aut repudiandae, eligendi quo, at eveniet consequatur deleniti perspiciatis, rerum voluptates quae ex.
            </p>
            <p class="mt-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit dolore molestias natus nulla possimus, perferendis magni numquam. Aut repudiandae, eligendi quo, at eveniet consequatur deleniti perspiciatis, rerum voluptates quae ex.
            </p>
          </div>
        </div>
      </div>
    </section>

    <div>
      <div class="border-t border-gray-400 w-2/5 h-1 mx-auto"></div>
      <div class="border-t border-gray-400 w-1/5 h-1 mx-auto mt-4"></div>
    </div>

    <section class="p-6 sm:mt-12 sm:container sm:p-0 lg:p-4 mx-auto  md:mt-8">
      <h2 class="text-2xl sm:text-4xl font-bold text-primary text-center">
        Instruyete sobre el cáncer de piel
      </h2>
      <div class="max-w-screen-lg mx-auto mt-12">
        <Tabs />
      </div>
    </section>

    <Modal
      id="modal-content"
      ref="modal-content"
      target="modal-content"
      type="image"
      link-multimedia="https://ciencia.unam.mx/uploads/infografias/if_cancer_piel_26062018.jpg"
      >
    </Modal>


  </div>
</template>

<script>
export default {
  methods: {
    openContent() {
      this.$refs['modal-content'].open()
    }
  }
}
</script>

<style lang="postcss" scoped>
.container-video {
  background: url('https://ciencia.unam.mx/uploads/infografias/if_cancer_piel_26062018.jpg');
  background-position: top center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  transition: all .4s;
  min-height: 14rem;
}

.container-video:hover .filter-container {
  background-color: #282b53ad;
}

.container-video:hover .filter-content {
  display: flex;
}

.filter-container {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: #282b5360;
}

.filter-content {
  display: none;
}
</style>
