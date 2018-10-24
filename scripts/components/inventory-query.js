Vue.component('inventory-query', {
  template: '<div>\
  <el-main style="font-size:12px;padding:10px 10px 10px 0px;">\
    <el-row :gutter="5" type="flex" justify="center" align="middle" style="margin-bottom:10px;text-align:center" v-for="item in originCondition" :key="item.index">\
      <el-col :span="7">{{item.name}}</el-col>\
      <el-col :span="17">\
\
        <el-input :size="size" v-model="item.value" @change="updateCondition" v-if="item.form==\'input\'" clearable :disabled="item.disabled"></el-input>\
\
        <el-row v-if="item.form==\'radio\'">\
          <el-col :span="12">\
            <el-radio label="true" v-model="item.value" :size="size" @change="updateCondition" v-if="item.form==\'radio\'">是</el-radio>\
          </el-col>\
          <el-col :span="12">\
            <el-radio label="false" v-model="item.value" :size="size" @change="updateCondition" v-if="item.form==\'radio\'">否</el-radio>\
            </el-radio>\
          </el-col>\
        </el-row>\
\
        <el-select :clearable="item.clearable" v-model="item.value" v-if="item.form==\'select\'" :size="size" @change="updateCondition">\
          <el-option v-for="option in item.options" :key="option.value" :value="option" :label="option.label"></el-option>\
        </el-select>\
\
        <el-date-picker style="width:100%;font-size:10px" v-model="item.value[0]" type="date" :size="size" @change="updateCondition" v-if="item.form==\'date\'" value-format="yyyy-MM-dd HH:mm:ss"><br></el-date-picker>\
        <el-date-picker style="width:100%;font-size:10px" v-model="item.value[1]" type="date" :size="size" @change="updateCondition" v-if="item.form==\'date\'" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>\
        <el-input-number v-model="item.value" :size="size" :controls="true" @change="updateCondition" v-if="item.form==\'number\'" style="width:100%" clearable></el-input-number>\
      </el-col>\
    </el-row>\
  </el-main>\
</div>',
  props: {
    originCondition: Array
  },
  data() {
    return {
      size: 'mini',
    }
  },
  mounted() {
    this.updateCondition()
  },
  methods: {
    updateCondition() {
      var obj = {}
      this.originCondition.forEach(p => {
        if (p.name == "仓库"|| p.name == "仓库名称") {
          obj.storeName = p.value.label
        }
        // else if (p.name == "类别") {
        //   obj.kind = p.value.label
        // } 
        else if (p.name == "状态") {
          obj.status = p.value.value
        } else obj[p.fieldName] = p.value
      })
      // console.log(obj);
      this.$emit('getcondition', obj)
    },
  }
})
