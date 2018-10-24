Vue.component('cool-dialog', {
  template: '<el-dialog :top.sync="top" :visible.sync="visible" :width="width" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" @close="closedialog" append-to-body>\
    <div slot="title">\
        {{title}}\
        <el-button-group style="float: right">\
            <el-button :disabled="fullscreen" style="width:24px; padding:4px;" size="mini" icon="el-icon-d-caret" @click="collapsedClicked"></el-button>\
            <el-button style="width:24px; padding:4px;" size="mini" icon="el-icon-close" type="danger" @click="closeClicked"></el-button>\
        </el-button-group>\
    </div>\
    <el-collapse-transition>\
        <div v-show="!collapsed" style="overflow: hidden;border:1px solid #7a9973;">\
            <iframe ref="iframe" :src="src+\'?name=\'+name" style="width:100%;border:none;height:80vh;    vertical-align:bottom;"></iframe>\
        </div>\
    </el-collapse-transition>\
</el-dialog>',
  mounted: function() {
    var _this = this
    // setInterval(function() {
    //   if (_this.$refs.iframe)
    //     _this.$refs.iframe.style.height = parseInt(_this.iframeHeight) + 'px'
    // }, 100)
    //todo: use binding
  },
  props: {
    name: String,
    visible: Boolean,
    width: String,
    iframeHeight: String,
    fullscreen: Boolean,
    collapsed: Boolean,
    title: String,
    src: String,
    top: String
  },
  methods: {
    collapsedClicked: function() {
      this.$emit('update:collapsed', !this.collapsed) //emit for sync
    },
    closeClicked: function() {
      this.$emit('update:visible', !this.visible) //emit for sync
    },
    closedialog() {
      this.$emit('closedialog')
      this.$emit('update:src', '')  //emit for sync
    }
  },
})
