Vue.component('button-group', {
  template: '<div>\
  <el-button-group v-if="buttons.length" ref="buttonGroup">\
    <el-button v-for="button in buttons" :type="button.type" :size="button.size ? button.size : buttonSize" :icon="button.icon" :native-type="button.nativeType" :loading="button.loading" :disabled="button.disabled" :plain="button.plain ? button.plain : buttonPlain"\
      :autofocus="button.autofocus" :round="button.round ? button.round : buttonRound" :key="button.key" style="border:none">{{button.text}}</el-button>\
  </el-button-group>\
</div>',
  props: {
    buttons: Array,
    buttonSize: String,
    buttonPlain: Boolean,
    buttonRound: Boolean,
  },
  data() {
    return {
      size: 'mini',
    }
  },
  methods: {
    redirectEvents: function(source, target, events, prefix) {
      events.forEach(function(event) {
        source.$on(event, function(args) {
          args.data = source
          target.$emit(prefix + event, args)
        })
      })
    },
    registerEvents: function() {
      if (this.$refs.buttonGroup) {
        var buttons = this.$refs.buttonGroup.$children
        var buttonEvents = ['click']
        buttons.forEach(p => {
          this.redirectEvents(p, this, buttonEvents, 'button-')
        })
      }
    },
  },
  mounted: function() {
    setTimeout(this.registerEvents, 0)
  },
})
