Vue.component('cool-multi-dialog', {
  template: '<div><template v-for="dialog in dialogs">\
            <cool-dialog class="rawdialog" :name="dialog.name" :visible.sync="dialog.visible" :fullscreen.sync="dialog.fullscreen" :collapsed.sync="dialog.collapsed" :width="dialog.width" :iframe-height="dialog.iframeHeight" :title="dialog.title" :src.sync="dialog.src" :top="dialog.top" ></cool-dialog>\
        </template></div>',
  props: {
    dialogs: Array
  },
  methods: {
  }
})
