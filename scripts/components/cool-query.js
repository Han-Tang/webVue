
Vue.component('cool-query', {
  template: '<div>\
  <el-main style="font-size:13px;padding:10px;">\
    <el-row :gutter="5" type="flex" justify="center" align="middle" style="margin-bottom:10px;text-align:center" v-for="(item,index) in originCondition" :key="index">\
      <el-col :span="10">{{item.name}}</el-col>\
      <el-col :span="14">\
        <el-input :size="size" v-model="item.value" @change="updateCondition" v-if="item.form==\'input\'"></el-input>\
        <el-row v-if="item.form==\'radio\'">\
          <el-col :span="12">\
            <el-radio label="true" v-model="item.value" :size="size" @change="updateCondition" v-if="item.form==\'radio\'">是</el-radio>\
          </el-col>\
          <el-col :span="12">\
            <el-radio label="false" v-model="item.value" :size="size" @change="updateCondition" v-if="item.form==\'radio\'">否</el-radio>\
            </el-radio>\
          </el-col>\
        </el-row>\
        <el-select v-model="item.value" v-if="item.form==\'select\'" :size="size" clearable  @change="updateCondition">\
          <el-option v-for="option in item.options" :key="option.value" :value="option.value" :label="option.label"></el-option>\
        </el-select>\
        <el-date-picker style="width:100%;font-size:10px" v-model="item.value[0]" type="date" :size="size" @change="updateCondition" v-if="item.form==\'date\'" value-format="yyyy-MM-dd HH:mm:ss"><br></el-date-picker>\
        <el-date-picker style="width:100%;font-size:10px" v-model="item.value[1]" type="date" :size="size" @change="updateCondition" v-if="item.form==\'date\'" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>\
        <el-input-number v-model="item.value" :size="size" :controls="true" @change="updateCondition" v-if="item.form==\'number\'" style="width:100%"></el-input-number>\
      </el-col>\
    </el-row>\
  </el-main>\
</div>',
props:{
  originCondition:Object
},
  data() {
      return {
        size: 'mini',
        condition: [],
      }
    },
    mounted() {
      this.updateCondition()
    },
    methods: {
      updateCondition() {
        this.condition = []
        var obj={}
        for (var prop in this.originCondition) { 
          if(this.originCondition[prop].value!=''){this.condition.push(this.originCondition[prop]) }                         
            this.condition.forEach(p=>{
                obj[p.fieldName]=p.value
            })
        }
        this.$emit('get-condition', obj)
      },    
    }
  })
