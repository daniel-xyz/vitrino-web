<template>
  <div class="popover" v-bind:class="{ open: isOpen, [name]: true }">
    <v-touch class="popover__face" :aria-owns="id" @tap="onPopoverToggle">
      <slot name="face" >
        <a href="#">popover</a>
      </slot>
    </v-touch>

    <v-touch class="popover__container" :id="id" v-if="isOpen">
      <slot name="content"></slot>
    </v-touch>
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
    },

    data () {
      return {
        isOpen: false,
      };
    },

    methods: {
      onPopoverToggle () {
        // e.stopPropagation();

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
//        document.documentElement.addEventListener('click', this.onDocumentClick, false);
        this.$emit('popover:open');
      },

      onDocumentClick () {
        this.isOpen = false;
        this.$emit('popover:close');
      },

      onPopoverContentClick () {
        // e.stopPropagation();

        if (this.closeOnContentClick) {
          this.isOpen = false;
          this.$emit('popover:close');
        }
      },

      removeDocumentEvent () {
//        document.documentElement.removeEventListener('touchstart', this.onDocumentClick, false);
      },
    },

    computed: {
      id () {
        return `popover-${this.name}`;
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

    &__container {
      position: absolute;
      z-index: 4;
      left: 0;
      bottom: 0;
      padding: 8px;
      background: #FFFFFF;
      box-shadow: 0 1px 8px 0 rgba(0,0,0,0.50);
      border-radius: 8px;
    }
  }
</style>
