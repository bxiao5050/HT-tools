import {
  Notification,
  MessageBox
} from 'element-ui'
// import Services from 'src/services'
// console.log(Services)
module.exports = {
  Notification,
  MessageBox,
  getElementTop: function (element) {
    var actualTop = element.offsetTop;
    var current = element.offsetParent;
    while (current !== null) {
      actualTop += current.offsetTop;
      current = current.offsetParent;
    }
    return actualTop;
  },

  tableToExcel: (function () {
    var uri = 'data:application/vnd.ms-excel;base64,',
      template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
      base64 = function (s) {
        return window.btoa(unescape(encodeURIComponent(s)))
      },
      format = function (s, c) {
        return s.replace(/{(\w+)}/g, function (m, p) {
          return c[p];
        })
      }
    var dlink = document.createElement('a')
    dlink.id = "dlink"
    dlink.style.display = "none"
    document.body.appendChild(dlink)
    return function (table, name, filename) {
      var ctx = {
        worksheet: name || 'Worksheet',
        table: table.innerHTML
      }
      dlink.href = uri + base64(format(template, ctx));
      dlink.download = filename;
      dlink.click();
    }
  })()
}