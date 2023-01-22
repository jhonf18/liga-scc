<template>
  <header class="sm:py-1.5 ">
    <!-- header mobile -->
    <div class="bg-primary block py-2 sm:hidden flex items-center">
      <div class="ml-2" @click="isShowMenu = true">
        <MenuIcon style="color: #fff" />
      </div>
        <nuxt-img
          src="/logo-blanco.png"
          :placeholder="[90, 50, 40]"
          width="90" height="50"
          format="webp"
          class="mx-auto"
          title="Logotipo de la Liga Santandereana Contra el Cáncer"
          alt="Logotipo en blanco de la Liga Santandereana Contra el Cáncer"/>
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
          <span class="font-bold ml-1 text-sm sm:text-base">MENÚ</span>
          <div class="ml-auto" @click="isShowMenu = false">
            <XIcon />
          </div>
        </div>
        <!-- Links lateral menu -->
        <div class="pt-4 pl-4">
          <div>
            <ul>
              <li @click="isShowMenu = false" class="flex items-center">
                <nuxt-link to="/" exact class="py-2 w-full">INICIO</nuxt-link>
              </li>
              <li class="pr-3">
                <Accordion>
                  <template v-slot:title>
                    <div class="flex items-center">
                      <span class="py-2">
                        ETAPAS DE VIDA
                      </span>
                    </div>
                  </template>
                  <template v-slot:content>
                    <ul class="block pl-3">
                      <li @click="isShowMenu = false">
                        <nuxt-link to="/etapas/ninos" class="py-2 w-full block">NIÑO Y NIÑA</nuxt-link>
                      </li>
                      <li @click="isShowMenu = false">
                        <nuxt-link to="/etapas/adolescente" class="py-2 w-full block">ADOLESCENTE</nuxt-link>
                      </li>
                      <li class="">
                        <Accordion>
                          <template v-slot:title>
                            <span class="py-2"> ADULTO </span>
                          </template>
                          <template v-slot:content>
                            <ul class="ml-3">
                              <li @click="isShowMenu = false" >
                                <nuxt-link class="py-2 w-full block" to="/etapas/adulto/mujer">
                                  MUJER
                                </nuxt-link>
                              </li>
                              <li @click="isShowMenu = false">
                                <nuxt-link class="py-2 w-full block" to="/etapas/adulto/hombre">
                                  HOMBRE
                                </nuxt-link>
                              </li>
                            </ul>
                          </template>
                        </Accordion>
                      </li>
                    </ul>
                  </template>
                </Accordion>
              </li>
              <li @click="isShowMenu = false" class="flex items-center">
                <nuxt-link to="/videos" class="py-2 w-full block">VIDEOS</nuxt-link>
              </li>
              <li @click="isShowMenu = false" class="flex items-center">
                <nuxt-link to="/infografias" class="py-2 w-full block">INFOGRAFÍA</nuxt-link>
              </li>
              <li @click="isShowMenu = false" class="flex items-center">
                <nuxt-link to="/juegos" class="py-2 w-full block">JUEGOS</nuxt-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- header desktop -->
    <div class="hidden sm:block">
      <div class="container-img">
        <nuxt-link to="/" class="inline-block">
        <nuxt-img
          src="/logo.png"
          :placeholder="[130, 71, 40]"
          width="130" height="71"
          quality="75"
          format="webp"
          title="Logotipo de la Liga Santandereana Contra el Cáncer"
          alt="Logotipo de la Liga Santandereana Contra el Cáncer"/>
        </nuxt-link>
      </div>
      <nav class="menu">
        <ul class="menu-ul">
          <li class="menu-item">
            <nuxt-link to="/" exact>
              INICIO
            </nuxt-link>
            </li>
          <li class="item-ciclo-vida menu-item">
            <span>
              ETAPAS DE VIDA
            </span>
            <ul class="dropdown-ciclo-vida">
              <li>
                <nuxt-link class="li-link" to="/etapas/ninos">
                  <RightIcon class="icon-right" />
                  <span>NIÑO Y NIÑA</span>
                </nuxt-link>
                </li>
              <li>
                <nuxt-link class="li-link" exact to="/etapas/adolescente">
                  <RightIcon class="icon-right" />
                  <span>ADOLESCENTE</span>
                </nuxt-link>
              </li>
              <li>
                <span class="li-link">
                  <RightIcon class="icon-right" />
                  <span> ADULTO </span>
                </span>
                <ul class="bg-white flex flex-col w-48">
                  <li>
                    <nuxt-link class="li-link" to="/etapas/adulto/mujer">
                      <RightIcon class="icon-right" />
                      MUJER
                    </nuxt-link>
                  </li>
                  <li>
                    <nuxt-link class="li-link" to="/etapas/adulto/hombre">
                      <RightIcon class="icon-right" />
                      HOMBRE
                    </nuxt-link>
                  </li>
                </ul>
              </li>
            </ul>
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
          <li class="menu-item">
            <nuxt-link  to="/juegos">
              JUEGOS
            </nuxt-link>
          </li>
        </ul>
        <!-- TODO: agregar submenu de adulto en version movil -->
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
  position: fixed;
  top: 0;
  z-index: 29;
  background: #fff;
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

li:has( a.nuxt-link-active) > span,
li:has( a.nuxt-link-active) > div > button > span,
li:has( a.nuxt-link-active) > div > button > div > span {
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


nav ul ul ul {
  position: absolute;
  top: 0;
  left: 100%;
  display: flex;
  z-index: 1000;
}

</style>
