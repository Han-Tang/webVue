
Vue.component('cool-form', {
  template: ' <div>\
    <el-form :rules="rules" ref="ruleForm" :size="size" :inline="inline" :label-position="labelPosition" :label-width="labelWidth">\
      <el-form-item :label="item.label" prop="name" v-for="(item,index) in formItems" :style="item.style" :key="index">\
        <el-input v-model="item.value"  @change="updateForm" v-if="item.type==\'input\'"  :style="item.inputStyle" :size="inputSize" @click.native="itemClick" :name="item.prop" :disabled="item.disabled"></el-input>\
        <el-radio-group v-model="item.value" v-if="item.type==\'radio\'" :style="item.inputStyle"  @change="updateForm" :size="inputSize">\
          <el-radio :label="ele.value" v-for="(ele,index) in item.radioItems" :key="index">{{ele.label}}</el-radio>\
        </el-radio-group>\
        <el-select v-model="item.value" v-if="item.type==\'select\'" :style="item.inputStyle"  @change="updateForm" :size="inputSize">\
          <el-option v-for="(ele,index) in item.options" :label="ele.label" :value="ele.value" :key="index"></el-option>\
        </el-select>\
        <el-checkbox-group v-model="item.value" v-if="item.type==\'chenckbox\'" :style="item.inputStyle" :size="inputSize">\
          <el-checkbox v-for="ele in item.chenckboxItems" :key="ele.index" :label="ele.value"  @change="updateForm">{{item.label}}</el-checkbox>\
        </el-checkbox-group>\
        <el-autocomplete v-model="item.value" :fetch-suggestions="querySearch" :size="inputSize" :style="item.inputStyle" v-if="item.type==\'autocomplete\'" @select="handleSelect"  @change="updateForm"></el-autocomplete>\
        <el-date-picker type="date" v-model="item.value" :size="inputSize" :format="item.format" :value-format="item.valueFormat" v-if="item.type==\'date\'" :style="item.inputStyle"  @change="updateForm" :clearable="false" format="yyyy-MM-dd" value-format="yyyy-MM-dd 00:00:00" ></el-date-picker>\
        <el-input v-model="item.value" size="inputSize" type="textarea" :rows="item.rows"  @change="updateForm" v-if="item.type==\'textarea\'" :style="item.inputStyle"></el-input>\
      </el-form-item>\
    </el-form>\
    <slot name="otherItem"></slot>\
  </div>',
  props: {
    formItems: Array,
    size: String,
    inline: Boolean,
    itemWidth: String,
    itemStyle: Object,
    labelWidth: String,
    rules: Object,
    labelPosition: String
  },
  data() {
    return {
      inputSize: 'mini'
    }
  },
  mounted() {
    this.updateForm()
  },
  methods: {
    updateForm() {
      var obj = {}
      this.formItems.forEach(p => {
        // if(p.value!==''){}
        obj[p.name] = p.value
      })
      this.$emit('update-form', obj)
    },
    itemClick(ev) {
      this.$emit('click-events', ev)
    },
    querySearch(queryString, cb) {
      this.$emit('querysearch', queryString, cb)
    },
    handleSelect(item) {
      this.$emit('select', item)
      this.updateForm()

    }
  }
})
