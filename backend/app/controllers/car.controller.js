const db = require("../models");
const Car = db.car
const Excel = require('exceljs');

const FormulaParser = require('hot-formula-parser').Parser;
const parser = new FormulaParser();

function getCellResult(worksheet, cellLabel) {
  if (worksheet.getCell(cellLabel).formula) {
    return parser.parse(worksheet.getCell(cellLabel).formula).result;
  } else {
    return worksheet.getCell(cellCoord.label).value;
  }
}

exports.exceladd = async (req, res) => {
  // console.log(__dirname)

  var workbook = new Excel.Workbook();
  var workval = await workbook.xlsx.readFile(__dirname+'/calculate.xlsx').then(function() {
    var worksheet = workbook.getWorksheet(1);

    parser.on('callCellValue', function(cellCoord, done) {
      if (worksheet.getCell(cellCoord.label).formula) {
        done(parser.parse(worksheet.getCell(cellCoord.label).formula).result);
      } else {
        done(worksheet.getCell(cellCoord.label).value);
      }
    });
  
    parser.on('callRangeValue', function(startCellCoord, endCellCoord, done) {
      var fragment = [];
  
      for (var row = startCellCoord.row.index; row <= endCellCoord.row.index; row++) {
        var colFragment = [];
  
        for (var col = startCellCoord.column.index; col <= endCellCoord.column.index; col++) {
          colFragment.push(worksheet.getRow(row + 1).getCell(col + 1).value);
        }
  
        fragment.push(colFragment);
      }
  
      if (fragment) {
        done(fragment);
      }
    });

    
    worksheet.getCell('B2').value = req.body.puchaseprice; // B2's value set

    worksheet.getCell('B3').value = req.body.downpayment; // B3's value set

    worksheet.getCell('B4').value  = req.body.tradeinvalue; // B4's value set

    worksheet.getCell('B5').value  = parseFloat(req.body.interestrate); // B5's value set
    
    worksheet.getCell('B6').value  = req.body.lengthofloan; // B6's value set
    console.log(worksheet.getCell('B9').value);
    var month = getCellResult(worksheet, 'B8');
    var tot = getCellResult(worksheet, 'B9');

    worksheet.getCell('B8').value  = { formula: 'PMT(B5/12,B6,B2-(B3+B4))', result: getCellResult(worksheet, 'B8') };
    worksheet.getCell('B9').value  = { formula: '-(B8*B6)+(B3+B4)', result: getCellResult(worksheet, 'B9') };

    
    return {monthly : month, total : tot};
  
  });
  await workbook.xlsx.writeFile(__dirname+'/calculate.xlsx');                            

  // return true;
  // console.log(workval.monthly)

    
  try {
    const result = await Car.create({
      puchaseprice: req.body.puchaseprice,
      downpayment: req.body.downpayment,
      tradeinvalue: req.body.tradeinvalue,
      interestrate: req.body.interestrate,
      lengthofloan: req.body.lengthofloan,
      monthlypayment: workval.monthly,
      totalcost: workval.total,
    });

    
      if (result) res.status(200).send({ status: "Car Added successfully!", total:workval });
    
  } catch (error) {
     res.status(200).send({ status: error.message });
  }

};

exports.excelget = async (req, res) => {
  // console.log(__dirname)

  var workbook = new Excel.Workbook();
  var workval = await workbook.xlsx.readFile(__dirname+'/calculate.xlsx').then(function() {
    var worksheet = workbook.getWorksheet(1);
 
    var B2 = worksheet.getCell('B2').value; // B2's value set

    var B3 = worksheet.getCell('B3').value; // B3's value set

    var B4 = worksheet.getCell('B4').value; // B4's value set

    var B5 = worksheet.getCell('B5').value; // B5's value set
    
    var B6 = worksheet.getCell('B6').value; // B6's value set
    
    var B8 = worksheet.getCell('B8').value.result;
    var B9 = worksheet.getCell('B9').value.result;

    
    return {puchaseprice: B2, downpayment: B3, tradeinvalue: B4, interestrate: B5, lengthofloan: B6, monthly : B8, total : B9};
  
  });

  // return true;
  // console.log(workval.monthly)
  res.status(200).send({ status: "success", total:workval });
    
  

};

