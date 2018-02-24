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

<style lang="less">
    @import "../../assets/less/core/settings.variables.less";

    .c-cookie-message {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        overflow: hidden;
        box-sizing: border-box;
        z-index: 9999;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        flex-wrap: wrap;
        background: #10cffe;
        color: @white;

        &__content {
            margin: 16px 24px;
        }

        &__link {
            color: @white;
            text-decoration: underline;

            &:hover {
                color: darken(@white, 5%);
            }
        }

        &__button {
            margin: 16px 24px;
            cursor: pointer;
            background: @light-green;
            padding: 0.625em 3.125em;
            color: @white;
            border-radius: 5px;

            &:hover {
                background: darken(#a0e080, 5%);
            }
        }
    }
</style>
