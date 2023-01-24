const db = require("../models");
const Car = db.car



exports.add = async (req, res) => {
  console.log(req.body)
  
  try {
    const result = await Car.create({
      puchaseprice: req.body.puchaseprice,
      downpayment: req.body.downpayment,
      tradeinvalue: req.body.tradeinvalue,
      interestrate: req.body.interestrate,
      lengthofloan: req.body.lengthofloan,
      monthlypayment: req.body.monthlypayment,
      totalcost: req.body.totalcost,
    });

    
      if (result) res.send({ status: "Car Added successfully!" });
    
  } catch (error) {
     res.status(200).send({ status: error.message });
  }

};
