<template>
  <footer class="footer text-white">
    <div class="sm:container mx-auto mt-16 sm:grid sm:grid-cols-6 sm:gap-4 p-4 py-8 mb-2">
      <div class="col-span-2">
        <div class="container-img">
          <a href="https://licancerbucaramanga.org/" target="_blank">
            <nuxt-img
              src="/logo-blanco.png"
              :placeholder="[130, 72, 40]"
              width="130" height="72"
              quality="75"
              format="webp"
              loading="lazy"
              title="Logotipo de la Liga Santandereana Contra el Cáncer"
              alt="Logotipo en blanco de la Liga Santandereana Contra el Cáncer"/>
          </a>
        </div>
      </div>
      <div class="mt-5 lg:col-start-4 col-span-2">
        <h4 class="font-semibold">Conoce nuestras herramientas</h4>
        <ul class="pl-1">
          <li>
            <nuxt-link to="/juegos">Juegos</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/videos">Videos</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/infografias">Infografías</nuxt-link>
          </li>
        </ul>
      </div>
      <div class="mt-5 col-span-2 lg:col-start-6 lg:col-span-1">
        <h4 class="font-semibold">Conoce la liga</h4>
        <ul class="pl-1">
          <li>
            <a href="https://licancerbucaramanga.org/servicios/" target="_blank">
              Nuestros servicios
            </a>
          </li>
          <li>
            <a href="https://licancerbucaramanga.org/historia/" target="_blank">
              Nuestra Historia
            </a>
          </li>
          <li>
            <a href="https://licancerbucaramanga.org/nuestro-equipo/" target="_blank">
              Nuestro Equipo
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="flex justify-center" style="font-size: .8rem">
      <span class="text-center">Creado por Ximena Blanco &amp; Jhon Pérez &copy;</span>
    </div>
  </footer>
</template>

<script>
export default {

}
</script>

<style lang="postcss" scoped >
.container-img img {
  width: 130px;
}

.footer {
  background-color: #282b53;
}
</style>
