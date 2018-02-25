<template>
    <ul>
        <nuxt-link :to="{ path: '/signin' }">
            <li>{{ $t('header.menu.signin') }}</li>
        </nuxt-link>

        <nuxt-link :to="{ path: '/signup' }">
            <li>{{ $t('header.menu.signup') }}</li>
        </nuxt-link>

        <nuxt-link :to="{ path: '/data-protection' }">
            <li>{{ $t('header.menu.data_protection') }}</li>
        </nuxt-link>

        <nuxt-link :to="{ path: '/imprint' }">
            <li>{{ $t('header.menu.imprint') }}</li>
        </nuxt-link>
    </ul>
</template>

<script>
    export default {
        name: 'main-menu',
    };
</script>

<style lang="less">
    @import "../../assets/less/core/settings.variables.less";
    @import "../../assets/less/core/tools.mixins.less";

    .c-main-header {
        position: absolute;
        top: 0;
        width: 100%;
        height: @header-height-xs;
        padding: 0 @spacing-l;
        box-sizing: border-box;
        border-bottom: 5px solid #fff;
        box-shadow: 1px 1px 9px rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        justify-content: space-between;
        z-index: 4;
        .vitrino-gradient;

        @media @md-and-up {
            position: absolute;
            height: @header-height-md;
        }

        i, span {
            color: #fff;
            cursor: pointer;
        }

        &__logo {
            max-height: 30px;
            cursor: pointer;

            @media @md-and-up {
                max-height: 32px;
            }
        }

        &__back-navigation {
            padding-right: 12px;

            span {
                margin-left: 2px;
                white-space: nowrap;
                line-height: @header-height-xs;

                @media @md-and-up {
                    line-height: @header-height-md;
                }
            }
        }

        &__main-nav {
            float: right;

            ul {
                position: absolute;
                top: @header-height-xs;
                left: 0;
                display: block;
                height: auto;
                list-style-type: none;
                text-align: center;
                width: 100vw;
                background-color: #fff;
                margin: 0;
                padding: 0;
                box-shadow: 1px 1px 9px rgba(0, 0, 0, 0.1);

                a {
                    color: @light-grey;
                    text-decoration: none;
                    transition: all .5s ease;

                    li {
                        display: block;
                        padding: 1em 0;
                        margin: 0 24px;
                    }
                }
            }

            @media @md-and-up {
                ul {
                    position: static;
                    background-color: transparent;
                    width: 100%;
                    box-shadow: none;

                    a {
                        li {
                            display: inline;
                            margin: 0 0 0 @spacing-l;
                            background: @white;
                            box-shadow: 0 1px 2px 0 hsla(0, 0%, 48%, .5);
                            border-radius: 5px;
                            font-size: 14px;
                            padding: 8px;
                            line-height: 2;

                            &:hover {
                                background: darken(@white, 5%);
                            }
                        }
                    }
                }
            }
        }
    }
</style>
