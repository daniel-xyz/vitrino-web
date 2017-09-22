<template>
    <div class="popover" :class="{ open: isOpen, [name]: true }">
        <div class="popover__face" :aria-owns="id" @click="onPopoverToggle">
            <slot name="face">
                <a href="#">popover</a>
            </slot>
        </div>

        <div class="popover__container"
             :class="{left: left, right: right}"
             :id="id"
             v-if="isOpen"
             @click="onPopoverContentClick">
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script>
    const popovers = [];

    export default {
        props: {
            name: {
                type: String,
                required: true,
            },
            closeOnContentClick: {
                default: true,
                type: Boolean,
                required: false,
            },
            left: {
                default: false,
                type: Boolean,
                required: false,
            },
            right: {
                default: false,
                type: Boolean,
                required: false,
            },
        },

        data () {
            return {
                isOpen: false,
            };
        },

        computed: {
            id () {
                return `popover-${this.name}`;
            },
        },

        watch: {
            isOpen (boolean) {
                const element = document.documentElement;

                if (boolean) {
                    element.classList.add('click-area');
                } else {
                    element.classList.remove('click-area');
                }
            },
        },

        methods: {
            onPopoverToggle (e) {
                e.stopPropagation();

                if (this.isOpen) {
                    this.isOpen = false;
                    this.$emit('popover:close');
                    return;
                }

                const length = popovers.length;

                if (length > 1) {
                    popovers.forEach((popover) => {
                        if (popover.isOpen) {
                            popover.isOpen = false;
                            this.$emit('popover:close');
                        }
                    });
                }

                this.isOpen = true;
                document.documentElement.addEventListener('click', this.onDocumentClick, false);
                this.$emit('popover:open');
            },

            onDocumentClick (e) {
                e.stopPropagation();
                this.isOpen = false;
                this.$emit('popover:close');
            },

            onPopoverContentClick (e) {
                e.stopPropagation();

                if (this.closeOnContentClick) {
                    this.isOpen = false;
                    this.$emit('popover:close');
                }
            },

            removeDocumentEvent () {
                document.documentElement.removeEventListener('click', this.onDocumentClick, false);
            },
        },

        mounted () {
            popovers.push(this);
            this.$on('popover:close', this.removeDocumentEvent);
        },

        beforeDestroy () {
            this.removeDocumentEvent();
            popovers.length = 0;
        },
    };
</script>

<style lang="less">
    .popover {
        position: relative;
        -webkit-tap-highlight-color: transparent;

        &__container {
            position: absolute;
            z-index: 4;
            bottom: 0;
            padding: 8px;
            background: #FFFFFF;
            box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.50);
            border-radius: 8px;

            &.left {
                left: 0;
            }

            &.right {
                right: 0;
            }
        }
    }
</style>
