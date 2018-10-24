
Vue.component('product-create', {
    template: ' <div>\
    <el-container direction="vertical">\
      <el-row :gutter="10" type="flex" align="middle" style="margin-bottom:5px;font-size:14px">\
        <el-col :span="3">产品名称</el-col>\
        <el-col :span="4">\
          <el-input v-model="createRowData.infoProduct.name" size="mini"></el-input>\
        </el-col>\
        <el-col :span="3" :offset="1">系列名称</el-col>\
        <el-col :span="4">\
          <el-select v-model="createRowData.infoProduct.serial" style="width:100%" size="mini" clearable>\
            <el-option v-for="item of seriesname" :key="item.index" :label="item.label" :value="item.value"></el-option>\
          </el-select>\
        </el-col>\
        <el-col :span="3" :offset="1">产品编号</el-col>\
        <el-col :span="4">\
          <el-input v-model="createRowData.infoProduct.code" size="mini"></el-input>\
        </el-col>\
      </el-row>\
      <el-row :gutter="10" type="flex" align="middle" style="margin-bottom:5px;font-size:14px">\
        <el-col :span="3">产品花色</el-col>\
        <el-col :span="4">\
          <!-- <el-input v-model="createRowData.infoProduct.color1" size="mini"></el-input> -->\
          <el-select v-model="createRowData.infoProduct.color1" clearable size="mini">\
            <el-option v-for="item in color1" :label="item.label" :value="item.value"></el-option>\
          </el-select>\
        </el-col>\
        <el-col :span="3" :offset="1">产品副花色</el-col>\
        <el-col :span="4">\
          <!-- <el-input v-model="createRowData.infoProduct.color2" size="mini"></el-input> -->\
          <el-select v-model="createRowData.infoProduct.color2" clearable size="mini">\
            <el-option v-for="item in color2" :label="item.label" :value="item.value"></el-option>\
          </el-select>\
        </el-col>\
        <el-col :span="3" :offset="1">产品型号</el-col>\
        <el-col :span="4">\
          <!-- <el-input v-model="createRowData.infoProduct.model" size="mini"></el-input> -->\
          <el-select v-model="createRowData.infoProduct.model" clearable size="mini">\
            <el-option v-for="item in model" :label="item.label" :value="item.value"></el-option>\
          </el-select>\
        </el-col>\
      </el-row>\
      <el-row :gutter="10" type="flex" align="middle" style="margin-bottom:5px;font-size:14px">\
        <el-col :span="3">产品材质</el-col>\
        <el-col :span="4">\
          <!-- <el-input v-model="createRowData.infoProduct.meterial1" size="mini"></el-input> -->\
          <el-select v-model="createRowData.infoProduct.meterial1" clearable size="mini">\
            <el-option v-for="item in meterial1" :label="item.label" :value="item.value"></el-option>\
          </el-select>\
        </el-col>\
        <el-col :span="3" :offset="1">产品副材质</el-col>\
        <el-col :span="4">\
          <!-- <el-input v-model="createRowData.infoProduct.material2" size="mini"></el-input> -->\
          <el-select v-model="createRowData.infoProduct.meterial2" clearable size="mini">\
            <el-option v-for="item in meterial2" :label="item.label" :value="item.value"></el-option>\
          </el-select>\
        </el-col>\
        <el-col :span="3" :offset="1">是否外购</el-col>\
        <el-col :span="4">\
          <el-radio v-model="createRowData.infoProduct.isBuy" label="true" size="mini">是</el-radio>\
          <el-radio v-model="createRowData.infoProduct.isBuy" label="false" size="mini">否</el-radio>\
        </el-col>\
      </el-row>\
      <el-row :gutter="10" type="flex" align="middle" style="margin-bottom:5px;font-size:14px">\
        <el-col :span="3">长</el-col>\
        <el-col :span="4">\
          <el-input v-model="createRowData.infoProduct.length" size="mini"></el-input>\
        </el-col>\
        <el-col :span="3" :offset="1">宽</el-col>\
        <el-col :span="4">\
          <el-input v-model="createRowData.infoProduct.width" size="mini"></el-input>\
        </el-col>\
        <el-col :span="3" :offset="1">高</el-col>\
        <el-col :span="4">\
          <el-input v-model="createRowData.infoProduct.thick" size="mini"></el-input>\
        </el-col>\
      </el-row>\
      <el-row :gutter="10" type="flex" align="middle" style="margin-bottom:5px;font-size:14px">\
        <el-col :span="3">漆类</el-col>\
        <el-col :span="4">\
          <!-- <el-input v-model="createRowData.infoProduct.paint" size="mini"></el-input> -->\
           <el-select v-model="createRowData.infoProduct.paint" clearable size="mini">\
            <el-option v-for="item in paint" :label="item.label" :value="item.value"></el-option>\
          </el-select>\
        </el-col>\
        <el-col :span="3" :offset="1">造型</el-col>\
        <el-col :span="4">\
          <!-- <el-input v-model="createRowData.infoProduct.shape" size="mini"></el-input> -->\
          <el-select v-model="createRowData.infoProduct.shape" clearable  size="mini">\
            <el-option v-for="item in shape" :label="item.label" :value="item.value"></el-option>\
          </el-select>\
        </el-col>\
        <el-col :span="3" :offset="1">单位</el-col>\
        <el-col :span="4">\
          <!-- <el-input v-model="createRowData.infoProduct.unit" size="mini"></el-input> -->\
          <el-select v-model="createRowData.infoProduct.unit" clearable size="mini">\
            <el-option v-for="item in unit" :label="item.label" :value="item.value"></el-option>\
          </el-select>\
        </el-col>\
      </el-row>\
      <el-row :gutter="10" type="flex" align="middle" style="margin-bottom:5px;font-size:14px;">\
        <el-col :span="3">软包类型</el-col>\
        <el-col :span="4">\
          <el-select v-model="createRowData.infoProduct.softKind" style="width:100%" size="mini" clearable>\
            <el-option v-for="item of softKind" :key="item.index" :label="item.label" :value="item.value"></el-option>\
          </el-select>\
        </el-col>\
        <el-col :span="3" :offset="1">产品等级</el-col>\
        <el-col :span="4">\
          <el-select v-model="createRowData.infoProduct.grade" style="width:100%" size="mini" clearable>\
            <el-option v-for="item of grade" :key="item.index" :label="item.label" :value="item.value"></el-option>\
          </el-select>\
        </el-col>\
      </el-row>\
      <el-row :gutter="10" type="flex" align="middle" style="margin-bottom:5px;font-size:14px">\
        <el-col :span="3">备注\
        </el-col>\
        <el-col :span="4" style="padding-right:10px">\
          <el-input v-model="createRowData.infoProduct.description" size="mini"></el-input>\
        </el-col>\
      </el-row>\
      <el-tabs style="font-size:15px" type="card">\
        <el-tab-pane label="销售">\
          <el-container direction="vertical">\
            <el-row :gutter="10" type="flex" align="middle" style="margin-bottom:5px;font-size:14px">\
              <el-col :span="3">计价方式\
              </el-col>\
              <el-col :span="4" style="padding-right:10px">\
                <!-- <el-input v-model="createRowData.productSale.priceMethod" size="mini"></el-input> -->\
                <el-select v-model="createRowData.productSale.priceMethod" style="width:100%" size="mini" clearable>\
            <el-option v-for="item of priceMethod" :key="item.index" :label="item.label" :value="item.value"></el-option>\
          </el-select>\
              </el-col>\
            </el-row>\
            <el-row :gutter="10" type="flex" align="middle" style="font-size:15px">\
              <el-col :span="3">默认销售价\
              </el-col>\
              <el-col :span="4" style="padding-right:10px">\
                <el-input v-model="createRowData.productSale.price" size="mini"></el-input>\
              </el-col>\
            </el-row>\
          </el-container>\
        </el-tab-pane>\
        <el-tab-pane label="采购">\
          <el-container direction="vertical">\
            <el-row :gutter="10" type="flex" align="middle" style="margin-bottom:5px;font-size:14px">\
              <el-col :span="3">采购价\
              </el-col>\
              <el-col :span="4" style="padding-right:10px">\
                <el-input v-model="createRowData.productPurch.price" size="mini"></el-input>\
              </el-col>\
            </el-row>\
            <el-row :gutter="10" type="flex" align="middle" style="margin-bottom:5px;font-size:14px">\
              <el-col :span="3">供应商\
              </el-col>\
              <el-col :span="4" style="padding-right:10px">\
                <el-input v-model="createRowData.productPurch.supplierCode" size="mini"></el-input>\
              </el-col>\
            </el-row>\
            <el-row :gutter="10" type="flex" align="middle" style="font-size:15px">\
              <el-col :span="3">包装贴纸\
              </el-col>\
              <el-col :span="4" style="padding-right:10px">\
                <el-input v-model="createRowData.productPurch.logo" size="mini"></el-input>\
              </el-col>\
            </el-row>\
          </el-container>\
        </el-tab-pane>\
        <el-tab-pane label="生产">\
          <el-container direction="vertical">\
            <el-row :gutter="10" type="flex" align="middle" style="margin-bottom:5px;font-size:14px">\
              <el-col :span="3">生产周期\
              </el-col>\
              <el-col :span="4" style="padding-right:10px">\
                <el-input v-model="createRowData.productProduce.cycle" size="mini"></el-input>\
              </el-col>\
            </el-row>\
            <el-row :gutter="10" type="flex" align="middle" style="margin-bottom:5px;font-size:14px">\
              <el-col :span="3">图纸号\
              </el-col>\
              <el-col :span="4" style="padding-right:10px">\
                <el-input v-model="createRowData.productProduce.drawingNo" size="mini"></el-input>\
              </el-col>\
            </el-row>\
            <el-row :gutter="10" type="flex" align="middle" style="font-size:15px">\
              <el-col :span="3">备注\
              </el-col>\
              <el-col :span="4" style="padding-right:10px">\
                <el-input v-model="createRowData.productProduce.description" size="mini"></el-input>\
              </el-col>\
            </el-row>\
          </el-container>\
          </el-tab-pane>\
          <el-tab-pane label="附件" name="fourth">\
            <el-upload class="upload-demo" ref="upload" :auto-upload="false" :action="abc" :before-upload="beforeUpload">\
              <el-button style="margin-right: 10px;" slot="trigger" type="primary">选取文件</el-button>\
              <el-input v-model="fileName" placeholder="附件名称（不输入则是文件名）" style="width:300px" class="top-text"></el-input>\
              <el-button style="margin-left: 10px;" type="success" @click="submitUpload">上传到服务器</el-button>\
            </el-upload>\
            <el-table style="width: 100%">\
              <el-table-column type="index" width="50">\
              </el-table-column>\
              <el-table-column label="附件名称">\
              </el-table-column>\
              <el-table-column label="上传日期">\
              </el-table-column>\
              <el-table-column label="操作人">\
              </el-table-column>\
              <el-table-column label="操作">\
                <template slot-scope="scope">\
               <el-button type="text" size="small">\
                 删除\
               </el-button>\
              </template>\
              </el-table-column>\
            </el-table>\
          </el-tab-pane>\
        </el-tabs>\
      </el-form>\
    </el-container>\
  </div>',
    props: {
        createRowData: Object
    },
    data() {
        return {
            abc:'http://192.168.1.155:8080/file/uploadFile',
            uploadURL: 'http://192.168.1.155:8080/file/uploadFile',
            urlGetInfo: config + '/info/queryInfo',
            fileName: '',
            seriesname: [],
            upLoadData: {
                // upLoadFile:undefined,
                fileType: "image",
                filePurpose: "fileInfoProduct",
                fkPurposeId: "516C5BDC-B354-40C3-AD91-6DE4266E1F42"
            },
            color1: [],
            color2: [],
            meterial1: [],
            meterial2: [],
            model: [],
            paint: [],
            shape: [],
            softKind: [],
            unit: [],
            grade: [],
            priceMethod: []
        }
    },
    mounted() {
        this.updateMaintenance()
        axios.post(this.urlGetInfo, { type: 'ProductNameType' }).then(resp => { this.seriesname = resp.data.data })
        axios.post(this.urlGetInfo, { type: 'ProductColorType' }).then(resp => { this.color1 = resp.data.data })
        axios.post(this.urlGetInfo, { type: 'ProductColor2Type' }).then(resp => { this.color2 = resp.data.data })
        axios.post(this.urlGetInfo, { type: 'ProductMaterialType' }).then(resp => { this.meterial1 = resp.data.data })
        axios.post(this.urlGetInfo, { type: 'ProductMaterial2Type' }).then(resp => { this.meterial2 = resp.data.data })
        axios.post(this.urlGetInfo, { type: 'ProductModelType' }).then(resp => { this.model = resp.data.data })
        axios.post(this.urlGetInfo, { type: 'PaintType' }).then(resp => { this.paint = resp.data.data })
        axios.post(this.urlGetInfo, { type: 'ModelMakeType' }).then(resp => { this.shape = resp.data.data })
        axios.post(this.urlGetInfo, { type: 'UnitType' }).then(resp => { this.unit = resp.data.data })
        axios.post(this.urlGetInfo, { type: 'SoftBagType' }).then(resp => { this.softKind = resp.data.data })
        axios.post(this.urlGetInfo, { type: 'ProductGradeType' }).then(resp => { this.grade = resp.data.data })
        axios.post(this.urlGetInfo, { type: 'PricingMethodType' }).then(resp => { this.priceMethod = resp.data.data })
    },
    methods: {
        onPreview(file) {
            this.fileName = file.name
        },
        onSuccess(res) {
            console.log("1")
        },
        onError(res) {
            console.log("2")
        },
        submitUpload() {
            this.$refs.upload.submit()
        },
        beforeUpload(file) {
            // this.upLoadData.upLoadFile=file
            console.log(this.upLoadData.upLoadFile)
        },
        updateMaintenance() {
            this.$emit('newtabledata', {
                infoProduct: this.createRowData.infoProduct,
                productSale: this.createRowData.productSale,
                productPurch: this.createRowData.productPurch,
                productProduce: this.createRowData.productProduce
            })
        }
    },
})
