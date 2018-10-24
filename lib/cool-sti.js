'use strict';

var coolSti = function () {
    var getUrlParam = function getUrlParam(name) {
        return window.location.search ? window.location.search.substr(1).split('&').filter(function (p) {
            return p.split('=').length > 1;
        }).filter(function (p) {
            return p.split('=')[0] === name;
        })[0].split('=')[1] : '';
    }; //获取Url参数

    var loadScript = function loadScript(name, targetWindow) {
        return new Promise(function (resolve) {
            var startAt = new Date().getTime();
            if (!targetWindow) targetWindow = window;
            if (!Array.from(targetWindow.document.getElementsByTagName('script')).some(function (p) {
                return p.src.includes(prefix + name + '.js');
            })) {
                var scriptTag = targetWindow.document.createElement('script');
                scriptTag.src = prefix + name + '.js';
                scriptTag.onload = function () {
                    if (debug) console.debug('异步加载脚本 ' + prefix + name + '.js 耗时：' + (new Date().getTime() - startAt) + ' 毫秒');
                    resolve();
                };
                targetWindow.document.body.appendChild(scriptTag);
            } else {
                if (debug) console.debug('无需加载脚本 ' + prefix + name + '.js 耗时：' + (new Date().getTime() - startAt) + ' 毫秒');
                resolve();
            }
        });
    }; //加载脚本

    var loadCss = function loadCss(name, targetWindow) {
        return new Promise(function (resolve) {
            var startAt = new Date().getTime();
            if (!targetWindow) targetWindow = window;
            if (!Array.from(targetWindow.document.getElementsByTagName('link')).some(function (p) {
                return p.href.includes(prefix + name + '.css');
            })) {
                var linkTag = targetWindow.document.createElement('link');
                linkTag.rel = 'stylesheet';
                linkTag.href = prefix + name + '.css';
                linkTag.onload = function () {
                    if (debug) console.debug('异步加载样式表 ' + prefix + name + '.css 耗时：' + (new Date().getTime() - startAt) + ' 毫秒');
                    resolve();
                };
                targetWindow.document.body.appendChild(linkTag);
            } else {
                if (debug) console.debug('无需加载样式表 ' + prefix + name + '.css 耗时：' + (new Date().getTime() - startAt) + ' 毫秒');
                resolve();
            }
        });
    }; //加载样式表

    var createReport = function createReport(reportName, template, data, variables) {
        return loadScript('stimulsoft/Scripts/stimulsoft.reports').then(function () {
            var startAt = new Date().getTime();
            var report = new Stimulsoft.Report.StiReport();
            report.loadFile(prefix + 'template/' + reportName + '/' + template + '.mrt');
            var dataSet = new Stimulsoft.System.Data.DataSet('默认数据源');
            dataSet.readJson(data);
            report.regData('默认数据源', '默认数据源', dataSet);
            for (var key in variables) {
                report.setVariable(key, variables[key]);
            }report.render();
            if (debug) console.debug('创建report 耗时：' + (new Date().getTime() - startAt) + ' 毫秒');
            return report;
        });
    }; //创建报表

    var createViewer = function createViewer(onSaveReportName) {
        return loadCss('stimulsoft/Css/stimulsoft.viewer.office2013.whitegreen').then(function () {
            return loadScript('stimulsoft/Scripts/stimulsoft.reports');
        }).then(function () {
            return loadScript('stimulsoft/Scripts/stimulsoft.viewer');
        }).then(function () {
            Stimulsoft.Base.Localization.StiLocalization.setLocalizationFile(prefix + 'stimulsoft/Localization/zh-CHS.xml', false);
            var options = new Stimulsoft.Viewer.StiViewerOptions();
            options.height = '100%';
            options.appearance.scrollbarsMode = true;
            options.toolbar.showDesignButton = onSaveReportName;
            options.toolbar.printDestination = Stimulsoft.Viewer.StiPrintDestination.Pdf;
            options.appearance.htmlRenderMode = Stimulsoft.Report.Export.StiHtmlExportMode.Table;
            options.toolbar.showAboutButton = false;
            options.exports.showExportToDocument = false;
            options.exports.showExportToHtml = false;
            options.exports.showExportToXml = false;
            options.exports.showExportToXps = false;
            options.exports.showExportToHtml5 = false;
            var viewer = new Stimulsoft.Viewer.StiViewer(options, 'StiViewer', false);
            window.viewerInstance = viewer;
            viewer.onDesignReport = function (e) {
                document.getElementById('loader').className = 'js_viewer_loader';
                viewer.visible = false;
                document.getElementById('viewer').style.display = 'none';
                var onSaveReport = onSaveReportName.includes('/') ? function (e) {
                    loadScript('axios.min') //默认的保存方法，动态加载ajax库
                    .then(function () {
                        return axios.post(onSaveReportName, {
                            report: e.report.reportAlias, //用别名作为报表名称
                            template: e.report.reportName, //用报表名作为模板名称
                            json: e.report.saveToJsonString() //模板json字符串化
                        });
                    }).then(function () {
                        return alert('保存成功');
                    }).catch(function () {
                        return alert('保存失败');
                    });
                } : opener[onSaveReportName];
                createDesigner(onSaveReport).then(function (designer) {
                    designer.report = e.report;
                    designer.visible = true;
                    document.getElementById('designer').style.display = 'block';
                    designer.renderHtml('designer');
                    document.getElementById('loader').className = '';
                });
            };
            return viewer;
        });
    }; //创建预览器

    var createDesigner = function createDesigner(onSaveReport) {
        return loadCss('stimulsoft/Css/stimulsoft.designer.office2013.whitegreen').then(function () {
            return loadScript('stimulsoft/Scripts/stimulsoft.reports');
        }).then(function () {
            return loadScript('stimulsoft/Scripts/stimulsoft.designer');
        }).then(function () {
            Stimulsoft.Base.Localization.StiLocalization.setLocalizationFile(prefix + 'stimulsoft/Localization/zh-CHS.xml', false);
            var options = new Stimulsoft.Designer.StiDesignerOptions();
            options.appearance.fullScreenMode = true;
            options.appearance.htmlRenderMode = Stimulsoft.Report.Export.StiHtmlExportMode.Table;
            options.appearance.showSaveDialog = false;
            options.appearance.showTooltipsHelp = false;
            // Create an instance of the designer
            var designer = new Stimulsoft.Designer.StiDesigner(options, 'StiDesigner', false);

            // Add the exit menu item event
            designer.onExit = function () {
                designer.visible = false;
                document.getElementById('designer').style.display = 'none';
                window.viewerInstance.visible = true;
                document.getElementById('viewer').style.display = 'block';
                document.title = window.pageTitle;
            };
            designer.onSaveReport = function (e) {
                if (!onSaveReport) return alert('主窗口方法已不可用\r\n如需使用不依赖主窗口的保存方法，onSaveReportName请填入后端保存的完整URL');
                return onSaveReport.call(window, e);
            };
            return designer;
        });
    }; //创建设计器

    var loadViewer = function loadViewer() {
        return loadScript('localforage.min').then(function () {
            return localforage.getItem(localforageId).then(function (c) {
                document.title = c.pageTitle;
                cache = c;
                return createReport(cache.report, cache.template, cache.data, cache.variables);
            }).then(function (r) {
                report = r;
                return createViewer(cache.onSaveReportName);
            }).then(function (viewer) {
                viewer.report = report;
                document.getElementById('loader').className = '';
                if (cache.isDirectEdit) viewer.onDesignReport({ report: viewer.report });
                viewer.renderHtml('viewer');
            });
        });
    }; //加载预览数据和容器

    var unloadViewer = function unloadViewer() {
        return localforage.removeItem(localforageId);
    };

    var localforageSize = 100;
    var debug = false;
    var prefix = '';
    var cache = undefined;
    var report = undefined;

    //获取当前运行js所在路径
    var src = document.getElementsByTagName('script')[document.getElementsByTagName('script').length - 1].getAttribute('src');
    prefix = src.substring(0, src.lastIndexOf('/'));
    if (prefix.length > 0) prefix += '/';
    if (prefix.indexOf('://') < 0) {
        if (prefix.substr(0, 1) === '/') prefix = window.location.protocol + '//' + window.location.host + prefix;else prefix = window.location.href.substring(0, window.location.href.lastIndexOf('/')) + '/' + prefix;
    }

    var localforageId = getUrlParam('localforageId');
    if (localforageId) {
        window.addEventListener('load', loadViewer);
        window.addEventListener('unload', unloadViewer);
    }
    return {
        print: function print(report, template, data, variables) {
            return createReport(report, template, data, variables).then(function (report) {
                return report.printToPdf();
            });
        }, //PDF格式打印报表

        view: function view(report, template, data, variables, onSaveReportName, pageTitle, isDirectEdit) {
            var localforageId = Math.random().toString().substr(2);
            return loadScript('localforage.min').then(function () {
                return localforage.length().then(function (length) {
                    return length > localforageSize ? localforage.clear() : undefined;
                }).then(function () {
                    return localforage.setItem(localforageId, { report: report, template: template, data: data, variables: variables, onSaveReportName: onSaveReportName, pageTitle: pageTitle, isDirectEdit: isDirectEdit });
                }).catch(function (e) {
                    return e.name === 'QuotaExceededError' ? localforage.clear().then(function () {
                        return localforage.setItem(localforageId, { report: report, template: template, data: data, variables: variables, onSaveReportName: onSaveReportName, pageTitle: pageTitle, isDirectEdit: isDirectEdit });
                    }) : undefined;
                }).then(function () {
                    return window.open(prefix + 'cool-sti-viewer.html?localforageId=' + localforageId);
                });
            });
        }, //新窗口打开报表

        export: function _export(filename, format, report, template, data, variables) {
            return createReport(report, template, data, variables).then(function (report) {
                return Object.saveAs(report.exportDocument(Stimulsoft.Report.StiExportFormat[format]), filename);
            });
        }, //导出报表

        get debug() {
            return debug;
        },
        set debug(val) {
            debug = val;
        },
        get localforageSize() {
            return localforageSize;
        },
        set localforageSize(val) {
            localforageSize = val;
        }
    };
}();
