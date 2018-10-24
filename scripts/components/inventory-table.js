Vue.component('inventory-table', {
  template: '<el-container  style="height:100%">\
    <el-main style="padding:0px;border:none;height:100%">\
      <el-table ref="table" height="100%" stripe class="table-content" :border="true" :data="data" size="mini" highlight-current-row @row-click="rowClick" @selection-change="handleSelectionChange" :cell-style="cellStyle">\
        <el-table-column type="index" label="序号" width="45" :fixed="true">\
        </el-table-column>\
        <el-table-column type="selection" width="40" :fixed="true" >\
        </el-table-column>\
        <el-table-column v-for="column in columns" :key="column.index" :width="column.width" :fixed="column.fixed" :resizable="true" :label="column.label" :prop="column.prop" :formatter="column.formatter" :show-overflow-tooltip="true">\
        </el-table-column>\
        <el-table-column label="入库数量" width="150" fixed="right" v-if="showInput">\
          <template  slot-scope="scope">\
          <el-input-number v-model="scope.row.qty" size="mini" :min="0" :max="scope.row.rest"></el-input-number>\
          </template>\
        </el-table-column>\
        <el-table-column label="入库包装数量" width="150" fixed="right" v-if="showInput">\
          <template  slot-scope="scope">\
          <el-input-number v-model="scope.row.inPackQty" size="mini" :min="0" :max="scope.row.inPackLeave"></el-input-number>\
          </template>\
        </el-table-column>\
      </el-table>\
  </el-main>\
  <el-footer height="auto" style="border:1px solid #ebeef5;border-top:0px" v-if="pag">\
  <el-pagination  ref="pagination"  class="table-pagination" :page-size="pageSize" :page-sizes="pageSizes" :total="total" :page-count="pageCount" :current-page="currentPage" :layout="layout" pager-count:="pagerCount" @current-change="handleCurrentChange" @size-change="sizeChange"></el-pagination>\
  </el-footer>\
</el-container>',
  data() {
    return {
      calcHeight: undefined,
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
    pageSizes: {
      type: Array,
      default () {
        return [10, 20, 30, 40, 50, 100]
      }
    },
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
    sizeChange(arg){
      this.$emit('sizechange',arg)
    }
  },
})
