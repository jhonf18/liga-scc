<template>
  <header class="sm:py-1.5 ">
    <!-- header mobile -->
    <div class="bg-primary block py-2 sm:hidden flex items-center">
      <div class="ml-2" @click="isShowMenu = true">
        <MenuIcon style="color: #fff" />
      </div>
      <img
        class="mx-auto"
        width="90px"
        src="https://licancerbucaramanga.org/wp-content/uploads/2021/02/Logo-Blanco.png"
        alt="Logotipo en blanco de la Liga Santandereana Contra el Cáncer">
    </div>

    <!-- Lateral menu -->
    <div
      class="fixed top-0 right-0 h-screen z-10 w-full transition-transform transform delay-100 duration-300"
      :class="{ 'translate-x-0': isShowMenu, '-translate-x-full': !isShowMenu }">
      <div class="absolute top-0 left-0 h-full w-full bg-aside-menu"
      :class="{ 'aside-menu-visible': isShowMenu, 'aside-menu-invisible': !isShowMenu }">
      </div>
      <div class="relative w-100 mr-auto xs:w-10/12 md:w-2/5 bg-white h-screen py-3">
        <!-- Header lateral menu -->
        <div class="flex items-center px-2">
          <FourPIcon width="32" class="sm:hidden" />
          <span class="font-bold ml-1 text-sm sm:text-base">MENÚ</span>
          <div class="ml-auto" @click="isShowMenu = false">
            <XIcon />
          </div>
        </div>
        <!-- Links lateral menu -->
        <div class="pt-4 pl-4">
          <div>
            <ul>
              <li @click="isShowMenu = false" class="flex items-center py-2">
                <RightIcon class="icon-right" />
                <nuxt-link to="/" exact>INICIO</nuxt-link>
              </li>
              <li class="py-2">
                <div class="flex items-center">
                  <RightIcon class="icon-right" />
                  ETAPAS DE VIDA
                </div>
                <ul class="block pl-8">
                  <li @click="isShowMenu = false" class="py-2">
                    <nuxt-link to="/ninos">NIÑO Y NIÑA</nuxt-link>
                  </li>
                  <li @click="isShowMenu = false" class="py-2">
                    <nuxt-link to="/adolescente">ADOLESCENTE</nuxt-link>
                  </li>
                  <li @click="isShowMenu = false" class="py-2">
                    <nuxt-link to="/adulto">ADULTO</nuxt-link>
                  </li>
                </ul>
              </li>
              <li @click="isShowMenu = false" class="flex items-center py-2">
                <RightIcon class="icon-right" />
                <nuxt-link to="/juegos">JUEGOS</nuxt-link>
              </li>
              <li @click="isShowMenu = false" class="flex items-center py-2">
                <RightIcon class="icon-right" />
                <nuxt-link to="/videos">VIDEOS</nuxt-link>
              </li>
              <li @click="isShowMenu = false" class="flex items-center py-2">
                <RightIcon class="icon-right" />
                <nuxt-link to="/infografias">INFOGRAFÍA</nuxt-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- header desktop -->
    <div class="hidden sm:block">
      <div class="container-img">
        <img
          src="https://licancerbucaramanga.org/wp-content/uploads/2021/02/cropped-Logo_LSCC-Normal.png"
          alt="Logotipo Liga Santandereana Contra el Cáncer">
      </div>
      <nav class="menu">
        <ul class="menu-ul">
          <li class="menu-item">
            <nuxt-link to="/" exact>
              INICIO
            </nuxt-link>
            </li>
          <li class="item-ciclo-vida menu-item">
            ETAPAS DE VIDA
            <ul class="dropdown-ciclo-vida">
              <li>
                <nuxt-link class="li-link" to="/ninos">
                  <RightIcon class="icon-right" />
                  <span>NIÑO Y NIÑA</span>
                </nuxt-link>
                </li>
              <li>
                <nuxt-link class="li-link" to="/adolescente">
                  <RightIcon class="icon-right" />
                  <span>ADOLESCENTE</span>
                </nuxt-link>
              </li>
              <li>
                <nuxt-link class="li-link" to="/adulto">
                  <RightIcon class="icon-right" />
                  <span> ADULTO </span>
                </nuxt-link>
              </li>
            </ul>
          </li>
          <li class="menu-item">
            <nuxt-link  to="/juegos">
              JUEGOS
            </nuxt-link>
          </li>
          <li class="menu-item">
            <nuxt-link to="/videos">
              VIDEOS
            </nuxt-link>
          </li>
          <li class="menu-item">
            <nuxt-link to="/infografias">
              INFOGRAFÍAS
            </nuxt-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  components: {
    RightIcon: () => import('@/static/icons/right.svg?inline'),
    MenuIcon: () => import('@/static/icons/menu.svg?inline'),
    XIcon: () => import('@/static/icons/x.svg?inline'),
  },
  data() {
    return {
      isShowMenu: false,
    }
  },
  methods: {

  }
}
</script>

<style  lang="postcss" scoped>

/*General styles*/

header {
  width: 100%;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
}

.menu {
  display: flex;
  justify-content: center;
  padding: .5em 0;
}

.container-img img{
 width: 130px;
 margin-left: 1rem;
}

/* First level */
.menu-ul {
  display: flex;
}

nav li {
  margin-right: 1.5em;
  font-weight: 600;
  position: relative;
  cursor: pointer;
}

a.nuxt-link-active {
  color: #282b53;
  font-weight: bold;
}

nav ul ul{
  position: absolute;
  max-width: 300px;
}

.bg-aside-menu {
  background-color: #021030c4;
}


/* Second level */

nav li li {
  background: #fff;
}

nav li li {
  display: flex;
  margin-right: 0;
  max-height: 0;
  overflow: hidden;
  transition: max-height .4s;
}

nav li .li-link {
  padding: .7em .3em;
  display: flex;
  overflow: hidden;
}

nav li:hover > ul > li {
  max-height: 1000px;
  overflow: visible;
}

nav > ul > li > ul {
  top: 150%;
  left: -.5em
}


.item-ciclo-vida .icon-right {
  margin-right: 5px;
  margin-left: -22px;
  transition: all .3s;
}

.li-link:hover > .icon-right {
  margin-left: 0;
}

.dropdown-ciclo-vida {
  width: 200px;
}


</style>
