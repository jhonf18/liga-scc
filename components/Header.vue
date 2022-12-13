<template>
  <header>
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
  </header>
</template>

<script>
export default {
  components: {
    RightIcon: () => import('@/static/icons/right.svg?inline')
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
  padding: .3em 0;
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


.icon-right {
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
