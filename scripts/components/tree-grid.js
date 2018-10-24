document.write("<script language=javascript src='../scripts/components/utils/dataTranslate.js'></script>");
Vue.component('tree-grid', {
  template: ' <el-container style="height:100%"><el-table :data="data" border style="width: 100%;overflow:auto;height:100%" :row-style="showTr" :cell-style="cellStyle"  class="treeTable" @row-click="handleRowClick" @selection-change="handleSelectionChange" highlight-current-row  stripe  >\
    <el-table-column type="selection" width="55"></el-table-column>\
    <el-table-column v-for="(column, index) in columns" :key="column.dataIndex" :label="column.text" :type="column.type" :formatter="column.formatter" >\
      <template scope="scope">\
        <span v-if="spaceIconShow(index)" v-for="(space, levelIndex) in scope.row._level" class="ms-tree-space"></span>\
        <button style="border:0;background:transparent;outline:none;" class="button is-outlined is-primary is-small " v-if="toggleIconShow(index,scope.row)" @click="toggle(scope.$index)">\
          <i v-if="!scope.row._expanded" class="el-icon el-icon-arrow-right" aria-hidden="true"></i>\
          <i v-if="scope.row._expanded" class="el-icon el-icon-arrow-right el-table__expand-icon--expanded" aria-hidden="true"></i>\
        </button>\
        <span v-else-if="index===0" class="ms-tree-space"></span>\
        {{scope.row[column.dataIndex]}}\
      </template>\
    </el-table-column>\
   <slot name="column"></slot>\
  </el-table></el-container>',
  props: {
    // 该属性是确认父组件传过来的数据是否已经是树形结构了，如果是，则不需要进行树形格式化
    treeStructure: {
      type: Boolean,
      default: function () {
        return false
      }
    },
    // 这是相应的字段展示
    columns: {
      type: Array,
      default: function () {
        return []
      }
    },
    // 这是数据源
    dataSource: {
      type: Array,
      default: function () {
        return []
      }
    },
    // 这个作用是根据自己需求来的，比如在操作中涉及相关按钮编辑，删除等，需要向服务端发送请求，则可以把url传过来
    requestUrl: {
      type: String,
      default: function () {
        return ''
      }
    },
    // 这个是是否展示操作列
    treeType: {
      type: String,
      default: function () {
        return 'normal'
      }
    },
    // 是否默认展开所有树
    defaultExpandAll: {
      type: Boolean,
      default: function () {
        return false
      }
    },
    height: String,
  },
  data() {
    return {
      checked: false
    }
  },
  computed: {
    // 格式化数据源
    data: function () {
      let me = this
      if (me.treeStructure) {
        let data = DataTransfer.treeToArray(
          me.dataSource,
          null,
          null,
          me.defaultExpandAll
        )
        console.log(data)
        return data
      }
      return me.dataSource
    }
  },
  methods: {
    // 显示行
    showTr: function ({ row, index }) {
      let show = row._parent ? row._parent._expanded && row._parent._show : true
      row._show = show
      return show ? '' : 'display:none;'
    },
    //每一行显示层级,但是最多只能展开两层，多一层就无法判断，会跑到最右边
    cellStyle({row}) {
      var sty=''
      if (row.hasParent&&row.children.length==0) {
        sty = "padding-left:120px"
      } else if(row.hasParent&&row.children.length!=0){
        sty='padding-left:60px'
      }
      return sty
    },
    // 展开下级
    toggle: function (trIndex) {
      let me = this
      let record = me.data[trIndex]
      record._expanded = !record._expanded
    },
    // 显示层级关系的空格和图标
    spaceIconShow(index) {
      let me = this
      if (me.treeStructure && index === 0) {
        return true
      }
      return false
    },
    // 点击展开和关闭的时候，图标的切换
    toggleIconShow(index, record) {
      let me = this
      if (
        me.treeStructure &&
        index === 0 &&
        record.children &&
        record.children.length > 0
      ) {
        return true
      }
      return false
    },
    handleDelete() {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    handleRowClick(arg) {
      this.$emit('row-click', arg)
    },
    handleSelectionChange(arg) {
      this.$emit('selection-change', arg)
    }
  }
})
