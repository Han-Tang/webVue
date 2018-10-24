Vue.component('cool-table', {
  template: ' <el-container class="container cool-table" style="height:100%">\
    <slot name="title"></slot>\
    <el-header  style="padding:0px;" height="auto" >\
      <el-row>\
        <el-col :span="18">\
          <el-button-group v-if="buttons.length" ref="buttonGroup" :class="buttonGroupClass" :style="buttonGroupStyle">\
            <el-button v-for="button in buttons" :type="button.type" :size="button.size ? button.size : buttonSize" :icon="button.icon" :native-type="button.nativeType" :loading="button.loading" :disabled="button.disabled" :plain="button.plain ? button.plain : buttonPlain" :autofocus="button.autofocus" :round="button.round ? button.round : buttonRound" :key="button.key" style="border:none">{{button.text}}</el-button>\
          </el-button-group>\
\
          <el-upload v-if="uploadTool" class="upload-demo" ref="upload" multiple :auto-upload="false" :action="urlUploadAttachment" :headers="headers" :data="uploadData" :show-file-list="true" :limit="5" :on-exceed="handleExceed" style="padding:5px 0px 5px 5px"\
            :on-success="uploadSuccess" :file-list="uploadlist" :on-remove="removeChange" :on-change="uploadListChange">\
            <el-button slot="trigger" :size="size" type="primary" :disabled="upbtn1">选取文件</el-button>\
            <el-button :disabled="upbtn2" :size="size" type="success" style="margin-left:3px" @click="submitUpload">上传到服务器</el-button>\
            <el-button :size="size" type="danger" :disabled="upbtn3" @click="delUploaded" style="margin-left:0">删除</el-button>\
            <el-button :size="size" type="primary" :disabled="upbtn4" @click="downloadAttachment" style="margin-left:0" v-if="downbtn">下载</el-button>\
          </el-upload>\
        </el-col>\
          <el-col :span="6">\
            <slot name="query"></slot>\
          </el-col>\
      </el-row>\
    </el-header>\
    <el-main style="padding:0px;border:none;height:100%">\
      <el-table ref="table" :class="tableClass" v-loading="vLoading" :style="tableStyle" :data="data" :size="size" :width="width" height="100%" :max-height="maxHeight" :fit="fit" :stripe="stripe" :border="border" :row-key="rowKey" :context="context" :show-header="showHeader" :show-summary="showSummary" :sum-text="sumText" :summary-method="summaryMethod" :row-className="rowClassName" :row-style="rowStyle" :cell-class-name="cellClassName" :cell-style="cellStyle" :header-row-class-name="headerRowClassName" :header-row-style="headerRowStyle" :header-cell-class-name="headerCellClassName" :header-cell-style="headerCellStyle" :highlight-current-row="highlightCurrentRow" :current-row-key="currentRowKey" :empty-text="emptyText" :expand-row-keys="expandRowKeys" :default-expand-all="defaultExpandAll" :default-sort="defaultSort" :tooltip-effect="tooltipEffect" :span-method="spanMethod">\
        <el-table-column v-for="column in columns" :type="column.type" :label="column.label" :class-name="column.className" element-loading-text="拼命加载中"  element-loading-spinner="el-icon-loading":label-class-name="column.labelClassName" :prop="column.prop" :width="column.width" :min-width="column.minWidth" :render-header="column.renderHeader" :sortable="column.sortable" :sort-method="column.sortMethod" :sort-by="column.sortBy" :resizable="column.resizable" :column-key="column.columnKey" :align="column.align" :header-align="column.headerAlign" :show-tooltip-when-overflow="column.showTooltipWhenOverflow" :show-overflow-tooltip="true" :fixed="column.fixed" :formatter="column.formatter" :selectable="selectable" :filter-method="column.filterMethod" :filters="column.filters" :filter-placement="column.filterPlacement" :filter-multiple="column.filterMultiple" :index="column.index" :key="column.columnKey"></el-table-column>\
        <slot name="columns"></slot>\
      </el-table>\
    </el-main>\
    <el-footer height="auto" style="border:1px solid #ebeef5;border-top:0px" v-if="page">\
      <el-pagination ref="pagination" :class="paginationClass" :style="paginationStyle" :page-size="pageSize"  :total="total" :page-count="pageCount" :current-page="currentPage" :layout="layout" :page-sizes="pageSizes" :popper-class="popperClass" :prev-text="prevText" :next-text="nextText" :background="background"></el-pagination>\
    </el-footer>\
  </el-container>',
  props: {
    // 上传组件
    downbtn:{
      type: Boolean,
      default: true
    },
    urlUploadAttachment:String,
    headers:Object,
    uploadTool:Boolean,
    uploadData:Object,
    upbtn1: Boolean,
    upbtn2: Boolean,
    upbtn3: Boolean,
    upbtn4: Boolean,

    button: Boolean,
    page: Boolean,
    //classes & styles
    buttonGroupStyle: String,
    buttonGroupClass: String,
    tableClass: String,
    tableStyle: String,
    paginationClass: String,
    paginationStyle: String,

    //table
    data: {
      type: Array,
      default: function() {
        return []
      }
    },
    vLoading: Boolean,
    size: String,
    width: [String, Number],
    height: [String, Number],
    maxHeight: [String, Number],
    fit: {
      type: Boolean,
      default: true
    },
    stripe: Boolean,
    border: Boolean,
    rowKey: [String, Function],
    context: {},
    showHeader: {
      type: Boolean,
      default: true
    },
    showSummary: Boolean,
    sumText: String,
    summaryMethod: Function,
    rowClassName: [String, Function],
    rowStyle: [Object, Function],
    cellClassName: [String, Function],
    cellStyle: [Object, Function],
    headerRowClassName: [String, Function],
    headerRowStyle: [Object, Function],
    headerCellClassName: [String, Function],
    headerCellStyle: [Object, Function],
    highlightCurrentRow: Boolean,
    currentRowKey: [String, Number],
    emptyText: String,
    expandRowKeys: Array,
    defaultExpandAll: Boolean,
    defaultSort: Object,
    tooltipEffect: String,
    spanMethod: Function,

    //columns
    columns: {
      type: Array,
      default: function() {
        return []
      }
    },

    //buttonGroup
    buttonSize: String,
    buttonPlain: Boolean,
    buttonRound: Boolean,

    //buttons
    buttons: {
      type: Array,
      default: function() {
        return []
      }
    },

    //pagination
    pageSize: {
      type: Number,
      default: 10
    },
    small: Boolean,
    total: Number,
    pageCount: Number,
    currentPage: {
      type: Number,
      default: 1
    },
    layout: {
      default: 'total,prev, next, jumper'
    },
    pageSizes: {
      type: Array,
      default () {
        return [10, 20, 30, 40, 50, 100]
      }
    },
    popperClass: String,
    prevText: String,
    nextText: String,
    background: Boolean
  },
  data: function() {
    return {
      //upload数据
      uploadlist: [],
    }
  },
  mounted: function() {
    setTimeout(this.registerEvents, 0)
  },
  methods: {
    clearSelectionOuter(){
        this.$refs.table.clearSelection();
    },
    redirectEvents: function(source, target, events, prefix) {
      events.forEach(function(event) {
        if (source) {
          source.$on(event, function(args) {
            if (args != null) {
              if (args.data) {
                args.data = source
              }
            }
            target.$emit(prefix + event, args)
          })
        }
      })
    },
    registerEvents: function() {
      var table = this.$refs.table
      if (this.$refs.buttonGroup) {
        var buttons = this.$refs.buttonGroup.$children
        var buttonEvents = ['click']
        buttons.forEach(p => {
          this.redirectEvents(p, this, buttonEvents, 'button-')
        })
      }

      var tableEvents = [
        'select',
        'select-all',
        'selection-change',
        'cell-click',
        'row-click',
        'row-dblclick',
        'header-click',
        'sort-change',
        'current-change'
      ]
      this.redirectEvents(table, this, tableEvents, 'table-')
      var pagination = this.$refs.pagination
      var paginationEvents = ['size-change', 'current-change']
      this.redirectEvents(pagination, this, paginationEvents, 'pagination-')
    },
    getFullHeight: function(el) {
      return parseInt(getComputedStyle(el)['height']) + this.getOuterHeight(el)
    },
    getOuterHeight: function(el) {
      return (
        parseInt(getComputedStyle(el)['margin-top']) +
        parseInt(getComputedStyle(el)['margin-bottom']) +
        parseInt(getComputedStyle(el)['padding-top']) +
        parseInt(getComputedStyle(el)['padding-bottom']) +
        parseInt(getComputedStyle(el)['border-top-width']) +
        parseInt(getComputedStyle(el)['border-bottom-width'])
      )
    },
    selectable: function(row, index) {
      if (row.selectable === undefined) return true
      return row.selectable
    },

    // 上传个数限制
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 5 个文件，本次已选择了 ${files.length} 个文件，如有更多文件请分批上传`);
      // 共选择了 ${files.length + fileList.length} 个文件
    },
    //上传附件
    uploadSuccess(response, file, fileList) {
      this.$emit('uploadsuccess',response, file, fileList)
    },
    delUploaded(){
      this.$emit('deluploaded')
    },
    downloadAttachment(){
      this.$emit('downloadattachment')
    },
    removeChange(file, fileList) {
      this.uploadlist = fileList
    },
    uploadListChange(file, fileList) {
      this.uploadlist = fileList
    },
    submitUpload() {
      if(this.uploadlist.length!=0){
        this.$refs.upload.submit();
      }else{
        this.$message('待上传文件列表为空')
      }
    },
  }
})


// redirectEvents: function(source, target, events, prefix) {
//   events.forEach(function(event) {
//     if (source) {
//       source.$on(event, function() {
//         if (arguments[0].data) {
//           arguments[0].data = source
//         }
//         var a = [prefix + event].concat(arguments)
//         target.$emit.apply(target, a)
//       })
//     }
//   })
// },
