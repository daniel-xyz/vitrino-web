<template>
    <transition appear name="slide-from-bottom">
        <div class="c-cookie-message" v-if="isOpen">
            <div class="c-cookie-message__content">
                Diese Webseite nutzt Cookies, um dir ein angenehmes Nutzererlebnis zu ermöglichen. Weitere Informationen dazu in unseren
                <router-link :to="{ path: '/data' }" class="c-cookie-message__link">Datenschutzbestimmungen</router-link>
            </div>

            <div class="c-cookie-message__button" @click="accept">
                Ich mag Cookies
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        data () {
            return {
                isOpen: false,
            };
        },
        mounted () {
            if (!this.getVisited()) {
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
