document.write("<script language=javascript src='../scripts/components/cool-table.js'></script>");
document.write("<script language=javascript src='../scripts/components/cool-form.js'></script>");
document.write("<script language=javascript src='../scripts/components/cool-dialog.js'></script>");
Vue.component('new-or-edit', {
  template: ' <el-container class="new-header">\
  <el-header height="30px" >\
    <!-- 按钮组 -->\
    <el-button-group >\
      <el-button icon="el-icon-tickets" :size="buttonSize" @click="openNormal">常规产品</el-button>\
      <el-button icon="el-icon-star-off" :size="buttonSize">定制产品</el-button>\
      <el-button icon="el-icon-mobile-phone" :size="buttonSize">套装产品</el-button>\
      <el-button icon="el-icon-delete" :size="buttonSize" @click="deleteClick">删除产品</el-button>\
      <el-button icon="el-icon-document" :size="buttonSize" @click="saveClick"  >保存</el-button>\
      <el-button icon="el-icon-back" :size="buttonSize" @click="goBack">返回</el-button>\
    </el-button-group>\
  </el-header>\
    <!-- 组件form -->\
    <el-main style="padding-top:20px;border:1px solid #7A9973">\
    <cool-form :form-items="formItems" size="mini" :inline="true"  label-width="120px" label-position="center" \
     @update-form="getOrder" @querysearch="querySearch" @select="handleSelect"></cool-form>\
    </el-main>\
    <el-footer height="300px">\
    <!-- 产品列表 -->\
    <cool-table :columns="colunms" :data="data" border="border" highlight-current-row="highlight-current-row" @table-selection-change="handleSelectChange" height="300px" :cellStyle="cellRow" >\
      <el-table-column slot="columns" prop="qty" label="数量">\
        <template slot-scope="scope">\
          <el-input v-model="scope.row.qty" ></el-input>\
        </template>\
      </el-table-column>\
    </cool-table>\
    </el-footer>\
    <!-- 产品选择dialog -->\
    <cool-dialog :top.sync="top" name="newPrice" title="常规产品资料" width="95%" iframe-height="300px" :src.sync="newOrEditUrl" :visible.sync="dialogVisible" :fullscreen.sync="dialogFullscreen" :collapsed.sync="dialogCollapsed" @closedialog="closedialog"></cool-dialog>\
</el-container>',

// <cool-dialog :top.sync="top" name="newPrice" title="常规产品资料" width="95%" iframe-height="300px" :src.sync="newOrEditUrl" :visible.sync="dialogVisible" :fullscreen.sync="dialogFullscreen" :collapsed.sync="dialogCollapsed"></cool-dialog>
props: {
    data: Array,
    formItems: Array,
    url: String,
    currentData: Object,
    newEditVisible:Boolean
  },
  data() {
    return {
      newOrEditUrl:'../baseManage/new-product-info.html',
      dialogVisible: false,
      dialogFullscreen: false,
      dialogCollapsed: false,
      top: "20px",
      //url
      urlCustomerQuery: config + '/customer/queryByPage',

      urlGetTypes: config + '/info/queryInfo',
      // 按钮组数据
      buttonSize: 'mini',
      //dialogForm数据
      //产品列表数据
      colunms: [{
          type: 'selection',
          fixed: 'fixed'
        },
        {
          type: 'index',
          fixed: 'fixed'
        },
        {
          label: '产品名称',
          prop: 'productName',
          fixed: 'fixed',
          showOverflowTooltip: true
        },
        {
          label: '产品编码',
          prop: 'productCode',
          showOverflowTooltip: true
        },
        // { label: '数量', prop: 'qty',showOverflowTooltip:true },
        {
          label: '规格',
          prop: 'spec',
          showOverflowTooltip: true
        },
        {
          label: '主花色',
          prop: 'mainColor',
          showOverflowTooltip: true
        },
        {
          label: '主材质',
          prop: 'mainMaterial',
          showOverflowTooltip: true
        },
        {
          label: '单价',
          prop: 'price',
          showOverflowTooltip: true
        },
        {
          label: '金额',
          prop: 'amount',
          showOverflowTooltip: true
        },
        {
          label: '备注',
          prop: 'remark',
          showOverflowTooltip: true
        }
      ],
      //表格多选数据暂存
      selections: undefined,
      //产品选择dialog数据
      // dialogVisible: false,
      order: undefined,
      productType: {},
      cellRow: {
        height: '30px',
        padding: '3px 0'
      },
      //客户名称查询参数
      customers: [],
    }

  },
  mounted() {
    setInterval(() => {
    this.dialogVisible=this.newEditVisible
    }, 100)
    //获取下拉选择数据
    axios.post(this.urlGetTypes, {
        "type": "OrderType"
      })
      .then(resp => {
        this.formItems[0].options = resp.data.data
      })
    axios.post(this.urlGetTypes, {
        "type": "PayType"
      })
      .then(resp => {
        this.formItems[4].options = resp.data.data
      })
    axios.post(this.urlGetTypes, {
        "type": "DeliveryType"
      })
      .then(resp => {
        this.formItems[8].options = resp.data.data
      })
    //  获取客户信息，用于autocomplete
    axios.post(this.urlCustomerQuery, {
      current: 1,
      offset: 1000
    }).then(resp => {
      console.log(resp);
      this.customers = resp.data.data.records
    })

  },
  methods: {
    closedialog(){
      this.dialogVisible=false
      this.$emit('newedit',this.dialogVisible)
    },
    //  获取cool-form组件传出的数据
    getOrder(arg) {
      this.order = arg
    },
    //autocomplete控件事件
    querySearch(queryString, cb) {
      this.customers.forEach(p => (p.value = p.name))
      var results = queryString ?
        this.customers.filter(this.createFilter(queryString)) :
        this.customers
      cb(results)
    },
    createFilter(queryString) {
      return customer => {
        return (
          customer.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1
        )
      }
    },
    handleSelect(item) {
      this.formItems[2].value = item.code
      this.formItems[3].value = item.salesman
    },
    //保存/编辑按钮点击事件
    saveClick() {
      const loading = this.$loading({
        lock: true,
        text: '正在保存',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      var list = this.data
      list.forEach(p => {
        delete p.data
      })
      if (this.currentData != undefined) {
        this.order.id = this.currentData.id
        this.order.ts = this.currentData.ts
        this.order.formno = this.currentData.formno
      }
      axios.post(this.url, {
          order: this.order,
          list: list
        })
        .then(resp => {
          switch (resp.data.code) {
            case 5000:
              reLogin(this)
              break;
            case 0:
              loading.close()
              this.$message('保存成功')
              this.goBack()
              this.$emit('save-success')
              break;
            default:
              setTimeout(() => {
                loading.close()
                this.$message(resp.data.msg)
              }, 1000)
              break;
          }

        }).catch((error) => {
          setTimeOut(() => loading.close(), 500)
          alert('服务器异常，请联系管理员')
        })
    },
    //本地删除
    deleteClick() {
      this.selections.forEach(p => {
        this.data.splice(this.data.indexOf(p), 1)
      })
    },
    openNormal() {
      this.newOrEditUrl='../baseManage/new-product-info.html'
      this.dialogVisible=true
      this.$emit('newedit',this.dialogVisible)
      // this.newEditVisible = true
    },
    //产品页面和新建报价单选择产品页面的字段名的手动转换
    // getProducts(arg) {
        // var abc={}
        // abc=arg.filter(a=>!this.data.map(d=>d.productCode)
        // .includes(a.code)).map(a=>({productName:a.name, productCode:a.code, spec:a.spec, mainColor:a.color1, viceColor:a.color2, mainMaterial:a.meterial1, viceMaterial:a.meterial2, price:a.unitprice,}))
        // abc.forEach(p=>{
        //   this.data.push(p)
        // })
      // this.dialogVisible = false
    // },
    //table多选
    handleSelectChange(selection) {
      this.selections = selection
    },
    //返回
    goBack() {
      this.$emit('close-dialog')

    }
  }
})
