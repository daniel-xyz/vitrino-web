-<template>
  <transition appear :name="transitionName">
    <div class="Cookie" :class="[containerPosition]" v-if="isOpen">
      <div class="Cookie__content">
        Diese Webseite nutzt sogenannte Cookies, um dir ein angenehmes Nutzererlebnis zu ermöglichen. Weitere Informationen in unseren <router-link :to="{ path: '/data' }" class="Cookie__link">Datenschutzbestimmungen</router-link>.
      </div>
      <div class="Cookie__button" @click="accept">
        Ich mag Cookies
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    props: {
      /**
       * Cookie Container position
       * bottom, top
       * @type {Object}
       */
      position: {
        type: String,
        default: 'bottom',
      },
      /**
       * Transition name has following possibilities
       * slideFromBottom
       * slideFromTop
       * fade
       * @type {Object}
       */
      transitionName: {
        type: String,
        default: 'slideFromBottom',
      },
    },
    data () {
      return {
        isOpen: false,
      };
    },
    computed: {
      containerPosition () {
        return `Cookie--${this.position}`;
      },
      cookieTheme () {
        return `Cookie--${this.theme}`;
      },
    },
    created () {
      if (!this.getVisited() === true) {
        this.isOpen = true;
      }
    },
    methods: {
      setVisited () {
        localStorage.setItem('cookie:accepted', true);
      },
      getVisited () {
        return localStorage.getItem('cookie:accepted');
      },
      accept () {
        this.setVisited();
        this.isOpen = false;
      },
    },
  };
</script>
