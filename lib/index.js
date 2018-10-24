'use strict';

function printClicked(sender) {
  sender.disabled = true;
  coolSti.print(
      'SimpleList',
      'Report',
      Demo, {
        'Today': new Date()
      })
    .then(function() {
      sender.disabled = false;
    });
}

function viewClicked(sender) {
  sender.disabled = true;
  coolSti.view(
    'SimpleList',
    'Report',
    Demo, {
      'Today': new Date()
    },
    'onSaveReport', //这里需要使用文本的方法名, 不传这个参数则不会有设计器按钮
    '新窗口的名字'
  ).then(function() {
    sender.disabled = false;
  });
}

function viewEditClicked(sender) {
  sender.disabled = true;
  coolSti.view(
    'SimpleList',
    'Report',
    Demo, {
      'Today': new Date()
    },
    'http://192.168.1.100/CoolERP_YF/MVC/Report/Save', //此参数含“/”则会使用ajax后台提交
    '新窗口的名字',
    true
  ).then(function() {
    sender.disabled = false;
  });
}

function exportClicked(sender) {
  sender.disabled = true;
  var select = document.getElementsByTagName('select')[0];
  var fileName = 'ExportFile' + Math.random().toString().substr(1) + '.' + select.options[select.selectedIndex].value;
  var format = select.options[select.selectedIndex].innerText;
  coolSti.export(
    fileName,
    format,
    'Report',
    'SimpleList',
    Demo, {
      'Today': new Date()
    }
  ).then(function() {
    sender.disabled = false;
  });
}

function onSaveReport(e) {
  //此方法会被新窗口以.call(window, e)的方式调用，所以this是新窗口window对象
  this.console.debug(e)
  this.alert('自定义的保存表单')
}
