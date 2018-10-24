//这里再不同路径下跳转的相对路径不同，所以我写了两个总有一个用得上，此处报错先不理，最后建议这里用绝对路径
document.write("<script language=javascript src='scripts/axios/dist/axios.js'></script>");
document.write("<script language=javascript src='../scripts/axios/dist/axios.js'></script>");
// var config = 'http://192.168.1.156:8888'
var config = 'http://198.168.1.110:8888'
// var config = 'http://198.168.1.199:8081'
// var config = 'http://198.168.1.98:8888'
// var testConfig = 'http://198.168.1.42:8081'
// var config = 'http://gzxunhang.f3322.net:8888'
// var config ='http://tx968.iplink.com.cn:9998'
var headers = {
  headers: {
    token: localStorage.token,
    Authorization: localStorage.token,
    AccessControlAllowCredentials: true
  }
}
//code校验
function checkCode(code,msg,root,loading) {
    switch (code) {
        //登录超时，重新登录
        case 5000:
            reLogin(this);
            return false;
            break;
        case 500:
            defaultError("系统错误", root, loading);
            return false;
            break;
        case 100:
        console.log(root);
            defaultError(msg, root, loading);
            return false;
            break;
        case 0:
            return true;
            break;
        default:
            defaultError(msg, root, loading);
            return false;
            break;
    }
}
// 登录超时，提醒重新登录
function reLogin(root) {
  root.$message('登录超时，请重新登录')
  //在index.html页跳转和在tab打开的iframe分页跳转的相对路径是不一样的，所以这里要写绝对路径,但是也有问题，iframe页会跳转成登录页，层层嵌套，暂时是给了index页面一个index的布尔值参数来判断是否是主页和tab页，不过只是权宜之计
  if (root.index === true) {
    window.location.href = 'login.html'
  } else {
  window.parent.location.href = '../login.html'
  }
}
//返回code除了5000和0之外的情况的处理方法,两种情况下的loading处理，一种是查询时表格loading，一种是保存/删除时的loading
function defaultError(msg, root, loading) {
  setTimeout(() => {
    if (typeof(loading) == 'string') {
      root[loading] = false
    } else {
      loading.close()
    }
    root.$message.error(msg)
  }, 1000)
}
//在mounted的时候给axios赋予默认axios值，之前用全局变量headers，但是withCredentials不好处理，每个新文件mounted的时候都要执行此方法
function initial() {
  axios.defaults.headers.post['token'] = localStorage.token;
  axios.defaults.withCredentials = true
}
//table分页index连续的方法，一般用于getData方法给data赋值的时候。
function formatIndex(arr, page, size) {
  arr.forEach((item, index) => { //res.data.data.records 表格数据     forEach为每一项添加数据
    item.index = (index + 1) + (page - 1) * size;
    // this.currentPage当前页 this.pageParams.size 每页显示多少 :page-sizes="[10,20,30,50]" 分页大小
  });
  return arr
}
// 保存/编辑/删除操作loading
function setLoading(root) {
  var loading = root.$loading({
    lock: true,
    text: '正在操作',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  });
  return loading
}
//删除行公共方法
function delTab(url, param, root, func) {
  if (confirm('确定要删除选定的记录')) {
    var loading = setLoading(root)
    axios.post(url, param)
      .then(resp => {
        switch (resp.data.code) {
          case 5000:
            reLogin(root)
            break;
          case 0:
            setTimeout(() => {
              root.$message(resp.data.msg);
              loading.close()
            }, 500)
            func()
            break;
          default:
            defaultError(resp.data.msg, root, loading)
            break;
        }
      }).catch((error) => {
        setTimeout(() => {
          root.$message.error('请求异常，请联系管理员');
          loading.close()
        }, 500)
      })
  }
}
