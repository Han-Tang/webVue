var getItemById = (menu, id) => {
  var items = []
  menu.forEach(sub => sub.children.forEach(item => items.push(item)))
  return items.filter(item => item.id === id)[0]
}

onload = () => {
  window.vue = new Vue({
    el: '#root',
    data: {
      index:true,
      menu: [],
      tabs: [{
                'id': 'home',
                'text': '首页',
                'attributes': { 'url': 'homepage.html' },
                closable: false,
            }],
      currentTab: 'home',
      isMenuCollapse: false,
      isHeaderCollapse: false,
      user: undefined,
      urlMenu: config + '/menu/nav',
      // urlGetUser: config + '/user/info',
    },
    methods: {
      selectMenu(index) {
        var menuItem = getItemById(this.menu, index);
        if (!this.tabs.includes(menuItem))
          this.tabs.push(menuItem)
        this.currentTab = menuItem.id
      },
      removeTab(targetName) {
        // var index = this.tabs.indexOf(this.tabs.filter(tab => tab.id === targetName)[0])
        // if (index >= 0) {
        //   this.tabs.splice(index, 1)
        //   if (this.tabs.length === 0)
        //     this.currentTab = 'default'
        //   else
        //     this.currentTab = this.tabs[index - 1].id
        // }
        var index = this.tabs.findIndex(tab => tab.id === targetName)
                if (index >= 0) {
                    this.tabs.splice(index, 1)
                    if (!this.tabs.map(tab => tab.id).includes(this.currentTab))
                        this.currentTab = 'home'
                }
                else {
                    console.error('targetName not exists')
                }
      },
      handleCommand(command) {
        if (command == 'loginout') {
          this.removeCookie('JSSESSIONID')
          localStorage.removeItem('token')
          localStorage.removeItem('username')
          window.location.href = 'login.html'
        }
      },
      removeCookie(name) {
        this.setCookie(name, 1, -1)
      },
      setCookie(cname, cvalue, exdays) {
        var d = new Date()
        d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
        var expires = 'expires=' + d.toUTCString()
        document.cookie = cname + '=' + cvalue + '; ' + expires
      }
    },
    mounted() {
      initial()
      if (window.localStorage.token === undefined) {
        window.location.href = 'login.html'
      }
      this.$el.style.visibility = 'visible'
      axios.post(this.urlMenu).then(resp => {
        switch (resp.data.code) {
          case 5000:
            reLogin(this)
            break;
          case 0:
            this.menu = resp.data.data
            break;
          default:
            defaultError(resp.data.msg, this)
            break;
        }
      }).catch(error => {
        this.$message.error('请求异常，请联系管理员')
      })

      this.user = localStorage.getItem('name')
      //根据用户名得到用户的名字，username和name不一样
      // axios.post(this.urlGetUser, {
      //   name: '',
      //   current: 1,
      //   offset: 1000
      // }).then(resp => {
      //   var users = resp.data.data
      //   this.user = users.name
      // var users = resp.data.data.records
      // var username = localStorage.getItem('username')
      // users.forEach(p => {
      //   if (p.username == username) {
      //     this.user = p.name
      //   }
      // })
      // })
    },
  })
}
