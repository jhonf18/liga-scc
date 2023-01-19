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
        <div class="flex mt-3 sm-md:mt-6">
          <a class="mr-2 social-link"
            href="https://www.facebook.com/ligasantandereanacontraelcancer" target="_blank"
            rel="noreferrer noopener"
            aria-label="Enlace para el Facebook de La Liga Santandereana Contra el Cáncer">
            <FacebookIcon class="social-icon"/>
          </a>
          <a class="mr-2 social-link"
            href="https://api.whatsapp.com/send/?phone=573015546358&text=Hola%2C%0A%C2%BFEn+qu%C3%A9+podemos+ayudarte%3F&type=phone_number&app_absent=0" target="_blank"
            rel="noreferrer noopener"
            aria-label="Enlace para el WhatsApp de La Liga Santandereana Contra el Cáncer">
            <WhatsAppIcon class="social-icon"/>
          </a>
          <a class="mr-2 social-link fill-current"
            href="https://www.instagram.com/ligasantandereanacancer/"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Enlace para el instagram de La Liga Santandereana Contra el Cáncer">
            <InstagramIcon class="social-icon"/>
          </a>
          <a class="social-link"
            href="https://www.youtube.com/channel/UCkDtLRuTXGe36_6hCizYVHA/videos"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Enlace para el Youtube de La Liga Santandereana Contra el Cáncer">
            <YoutubeIcon class="social-icon"/>
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
            <a
              href="https://licancerbucaramanga.org/servicios/"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Enlace para redireccionar a los servicios que ofrece la Liga Santandereana Contra el Cáncer"
              >
              Nuestros servicios
            </a>
          </li>
          <li>
            <a
            href="https://licancerbucaramanga.org/historia/"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Enlace para abrir la historia de la Liga Santandereana Contra el Cáncer">
              Nuestra Historia
            </a>
          </li>
          <li>
            <a
            href="https://licancerbucaramanga.org/nuestro-equipo/"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Enlace para abrir el equipo de la Liga Santandereana Contra el Cáncer">
              Nuestro Equipo
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="flex justify-center" style="font-size: .8rem">
      <span class="text-center">
        Elaborado por Ximena Blanco practicante de Trabajo Social UIS &amp; Jhon Pérez Desarrollador Web &copy;
      </span>
    </div>
  </footer>
</template>

<script>
export default {
  components: {
    FacebookIcon: () => import('@/static/icons/facebook.svg?inline'),
    WhatsAppIcon: () => import('@/static/icons/whatsapp.svg?inline'),
    YoutubeIcon: () => import('@/static/icons/youtube.svg?inline'),
    InstagramIcon: () => import('@/static/icons/instagram.svg?inline')
  }
}
</script>

<style lang="postcss" scoped >
.container-img img {
  width: 130px;
}

.footer {
  background-color: #282b53;
}

.social-link {
  @apply h-8 w-8 inline-flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200  dark:bg-gray-500  dark:hover:bg-gray-600 transition-colors;
}

.social-icon {
  @apply w-5 stroke-current text-gray-700;
}


</style>
