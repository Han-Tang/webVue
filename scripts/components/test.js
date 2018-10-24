/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-10-18 10:46:16
 * @version $Id$
 */
Vue.component('test', {
  template: '<el-container  style="height:100%">\
                <slot name="title"></slot>\
                <el-tabs type="border-card">\
                  <el-tab-pane>\
                    <span slot="label">\ 主表</span>\
                  </el-tab-pane>\
                </el-tabs>\
                <div style="padding:0px;" height="auto">\
                    <el-form :inline="true" size="mini">\
                      <el-form-item style="margin:5px 0px 5px 5px" label="入库日期">\
                        <el-date-picker  type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>\
                      </el-form-item>\
                      <el-form-item style="margin:5px 0px 5px 5px" label="备注">\
                        <el-input type="text" style="width: 100%;" ></el-input>\
                       </el-form-item>\
                    </el-form>\
                </div>\
                <el-main style="padding:0px;border:none;height:100%">\
                    <el-table ref="table" height="100%" stripe class="table-content" :border="true" :data="data" size="mini" highlight-current-row @row-click="rowClick" @selection-change="handleSelectionChange" :cell-style="cellStyle">\
                        <el-table-column type="index" label="序号" width="45" :fixed="true">\
                        </el-table-column>\
                        <el-table-column type="selection" width="40" :fixed="true" >\
                        </el-table-column>\
                        <el-table-column v-for="column in columns" :key="column.index" :width="column.width" :fixed="column.fixed" :resizable="true" :label="column.label" :prop="column.prop" :formatter="column.formatter" :show-overflow-tooltip="true">\
                        </el-table-column>\
        \
        \
                    </el-table>\
                </el-main>\
                <el-tabs type="border-card">\
                    <el-tab-pane>\
                    <span slot="label">\ 从表</span>\
                </el-tab-pane>\
                </el-tabs>\
                <div style="padding-top:3px">\
                    <el-button-group v-if="buttons.length" ref="buttonGroup">\
                        <el-button v-for="button in buttons" :type="button.type" :size="button.size ? button.size : buttonSize" :icon="button.icon" :native-type="button.nativeType" :loading="button.loading" :disabled="button.disabled" :plain="button.plain ? button.plain : buttonPlain"\
      :autofocus="button.autofocus" :round="button.round ? button.round : buttonRound" :key="button.key" style="border:none">{{button.text}}</el-button>\
                    </el-button-group>\
                </div>\
                <el-main style="padding:0px;border:none;height:100%">\
                    <el-table ref="table" height="100%" stripe class="table-content" :border="true" :data="data" size="mini" highlight-current-row @row-click="rowClick" @selection-change="handleSelectionChange" :cell-style="cellStyle">\
                        <el-table-column type="index" label="序号" width="45" :fixed="true">\
                        </el-table-column>\
                        <el-table-column type="selection" width="40" :fixed="true" >\
                        </el-table-column>\
                        <el-table-column v-for="column in columns" :key="column.index" :width="column.width" :fixed="column.fixed" :resizable="true" :label="column.label" :prop="column.prop" :formatter="column.formatter" :show-overflow-tooltip="true">\
                        </el-table-column>\
        \
        \
                </el-table>\
              </el-main>\
              <el-footer height="auto" style="border:1px solid #ebeef5;border-top:0px">\
                  <el-row>\
                      <el-button type="primary" round>保存</el-button>\
                      <el-button type="primary" round>取消</el-button>\
                  </el-row>\
  \
              </el-footer>\
          </el-container>',
  data() {
    return {
      calcHeight: undefined,
       size: 'mini',
      cellStyle:{
          height: '30px',
          padding: "3px 0"
      }
    }
  },
  props: {
    showInput: Boolean,
    pag: Boolean,
    height: [String, Number],
    // data&column
    data: Array,
    columns: Array,
    // pagination
    total: Number,
    layout: String,
    pageSize: Number,
    pagerCount: Number,
    currentPage: Number,
    pageCount: Number,
    buttons: Array,
    buttonSize: String,
    buttonPlain: Boolean,
    buttonRound: Boolean,
  },
  methods: {
    // :selectable="selectable"
    // selectable(row) {
    //   return row.status !== '2'
    // },
    rowClick: function(rowclickdata) {
      // console.log(rowclickdata.rowclickdata);
      this.$emit('rowclick', {
        rowclickdata
      })
    },
    handleSelectionChange: function(selectionchange) {
      this.$emit('selection', {
        selectionchange
      })
    },
    handleCurrentChange: function(currentchangedata) {
      this.$emit('currentchange', {
        currentchangedata
      })
    },
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
