import { Component, OnInit } from '@angular/core';
const pdfMake = require('pdfmake/build/pdfmake.js');
//import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
declare var html2pdf: any;
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    html2pdf
  }
  downloadPDF(){
    var element = document.getElementById('invoice');
var opt = {
  margin:       .4,
  filename:     'myfile.pdf',
  image:        { type: 'jpeg', quality: 0.98 },
  html2canvas:  { scale: 2 },
  jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
};

// New Promise-based usage:
html2pdf().set(opt).from(element).save();

  }
  download2(){
    let element = <HTMLElement>document.getElementById('invoice');
    html2canvas(element).then(canvas => {
      // Few necessary setting options
       
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      var width = pdf.internal.pageSize.getWidth();
      var height = canvas.height * width / canvas.width;
      pdf.addImage(contentDataURL, 'PNG', 0, 0, width, height)
      pdf.save('output.pdf'); // Generated PDF
      });
      
  }

  download3(){
    const docDefinition = {
    
      content: [
        {
          style: "mainTable",
          table: {
            body: [
                [	{
                  style: "row_1",
                  table: {
                    body: [                
                      ['INVOICE'],
                    ]
                  },
                }],
                [	{
                  style: "row_2",
                  table: {
                    body: [                      
                      ['MAHINDRA TRANS LOGISTICS'],
                    ]
                  },
                }],
                

            ]
          }
        }
      ],

      styles: {
        row_1: {
          fontSize: 18,


        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        mainTable: {
          margin: [0, 5, 0, 15],
        }
      }
    };

    pdfMake.createPdf(docDefinition).download("test.pdf");
  }
  // downloadPDF() {
  //   pdfMake.fonts = {
  //     Graphik: {
  //       normal: 'Segoe-Ui.ttf',
  //       bold: 'Segoe-Ui-bold.ttf',
  //       semibold: 'Graphik-Semibold-Webb.ttf',
  //       italics: 'Graphik-Regular Italic.ttf',
  //       bolditalics: 'Graphik-Bold Italic.ttf',
  //       black: 'Graphik-Black.ttf'
  //     },
  //     Roboto: {
  //       normal: 'Roboto-Regular.ttf',
  //       bold: 'Roboto-Medium.ttf',
  //       italics: 'Roboto-Italic.ttf',
  //       bolditalics: 'Roboto-MediumItalic.ttf'
  //     }
  //   };
  //   const pdfTable = this.recommendation.nativeElement;
  //   var html = htmlToPdfmake(pdfTable.innerHTML);

  //   for (var i = 0; i < html.length; i++) {
  //     var sample = {
  //       "nodeName": "TABLE",
  //       "marginBottom": 5,
  //       "style": [
  //         "html-table",
  //         "html-div",
  //         "sub_div",
  //         "header_data"
  //       ],
  //       "table": {
  //         "body": [
  //           [
  //             {
  //               "text": "Technology | Network | Green Data",
  //               "noWrap": true,
  //               "nodeName": "TD",
  //               "fillColor": "#eeeaee",
  //               "color": "#7a2581",
  //               "style": [
  //                 "html-td",
  //                 "html-tr",
  //                 "html-tbody",
  //                 "html-table",
  //                 "html-div",
  //                 "sub_div",
  //                 "header_data",
  //                 "category_name"
  //               ]
  //             },
  //             {
  //               "text": "",
  //               "nodeName": "TD",
  //               "fillColor": "#ffffff",
  //               "color": "#ffffff",
  //               "style": [
  //                 "html-td",
  //                 "html-tr",
  //                 "html-tbody",
  //                 "html-table",
  //                 "html-div",
  //                 "sub_div",
  //                 "header_data",
  //                 "ptp"
  //               ]
  //             },
  //             {
  //               "text": "Project disruption Score | Low",
  //               "noWrap": true,
  //               "nodeName": "TD",
  //               "fillColor": "#556933",
  //               "color": "#ffffff",
  //               "style": [
  //                 "html-td",
  //                 "html-tr",
  //                 "html-tbody",
  //                 "html-table",
  //                 "html-div",
  //                 "sub_div",
  //                 "header_data",
  //                 "ptp"
  //               ]
  //             },
  //             {
  //               "text": "Typical emission Saving | -56%",
  //               "noWrap": true,
  //               "nodeName": "TD",
  //               "fillColor": "#556933",
  //               "color": "#ffffff",
  //               "style": [
  //                 "html-td",
  //                 "html-tr",
  //                 "html-tbody",
  //                 "html-table",
  //                 "html-div",
  //                 "sub_div",
  //                 "header_data",
  //                 "ptp"
  //               ]
  //             },
  //             {
  //               "text": "Predection Adoption Time | Low",
  //               "noWrap": true,
  //               "nodeName": "TD",
  //               "fillColor": "#556933",
  //               "color": "#ffffff",
  //               "style": [
  //                 "html-td",
  //                 "html-tr",
  //                 "html-tbody",
  //                 "html-table",
  //                 "html-div",
  //                 "sub_div",
  //                 "header_data",
  //                 "ptp"
  //               ]
  //             }
  //           ]
  //         ]
  //       },
  //       "layout": "headerLayout"
  //     }
  //     if (i != (html.length - 1)) {
  //       html[i].pageBreak = 'after'
  //     }
  //     html[i].stack[0].stack[2].stack[1].layout = "recomedationLayout"
  //     html[i].stack[0].stack[2].stack[1].table.widths = ['*', '*']
  //     var cat_name = html[i].stack[0].stack[0].stack[0].text
  //     var scoring = [html[i].stack[0].stack[0].stack[1].stack[0].text, html[i].stack[0].stack[0].stack[1].stack[1].text, html[i].stack[0].stack[0].stack[1].stack[2].text]
  //     html[i].stack[0].stack[0] = sample
  //     html[i].stack[0].stack[0].table.body[0][0].text = cat_name
  //     html[i].stack[0].stack[0].table.body[0][2].text = scoring[0]
  //     html[i].stack[0].stack[0].table.body[0][3].text = scoring[1]
  //     html[i].stack[0].stack[0].table.body[0][4].text = scoring[2]
  //     html[i].stack[0].stack[0].table.widths = ['auto', '*', 'auto', 'auto', 'auto']

  //   }
  //   var docDefinition = {
  //     pageSize: {
  //       width: 900,
  //       height: 500
  //     },
  //     //pageOrientation: 'portrait',
  //     defaultStyle: {
  //       font: 'Graphik'
  //     },
  //     content: [
  //       html
  //     ],
  //     pageBreakBefore: function (currentNode, followingNodesOnPage, nodesOnNextPage, previousNodesOnPage) {
  //       return currentNode.style && currentNode.style.indexOf('pdf-pagebreak-before') > -1;
  //     },

  //     styles: {
  //       desc_header: {
  //         fontSize: 10,
  //         bold: true,
  //         padding: [10, 10, 10, 10],
  //         margin: [0, 0, 0, 8],
  //       },
  //       desc_data: {
  //         fontSize: 10,
  //         margin: [0, 0, 0, 15]
  //       },
  //       sub_tabe: {
  //         bold: true,
  //         margin: [0, 0, 0, 5],
  //       },
  //       rec_table: {
  //         fontSize: 10,
  //       },
  //       header_data: {
  //         fontSize: 10,
  //       },
  //       category_name: {
  //         bold: true,
  //       },
  //       ptp: {
  //         bold: true,
  //       }
  //     }
  //   };

  //   pdfMake.createPdf(docDefinition, {
  //     recomedationLayout: {
  //       hLineColor: function (rowIndex, node, colIndex) {
  //         if (rowIndex === node.table.body.length) return '#0095ff';
  //         return rowIndex == 0 ? '#0095ff' : '#ffffff';
  //       },
  //       vLineColor: function (colIndex, node, rowIndex) {
  //         if (rowIndex === 0) return '#0095ff';
  //         return rowIndex > 0 && (colIndex === 0 || colIndex === node.table.body[0].length) ? '#0095ff' : '#ffffff';
  //       }
  //     },
  //     headerLayout: {
  //       hLineColor: function (rowIndex, node, colIndex) {
  //         return rowIndex >= 0 ? '#ffffff' : '#ffffff';
  //       },
  //       vLineColor: function (colIndex, node, rowIndex) {
  //         if (rowIndex >= 0) return '#ffffff';
  //         return rowIndex > 0 && (colIndex === 0 || colIndex === node.table.body[0].length) ? '#ffffff' : '#ffffff';
  //       },
  //       vLineWidth: function (i, node) {
  //         return (i === 1) ? 1 : (i > 2 && (i != node.table.body.length) ? 5 : 1);
  //       }
  //     }
  //   }, pdfMake.fonts).download('PGQRecommendation.pdf');

  // }

}
