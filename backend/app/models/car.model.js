module.exports = (sequelize, Sequelize) => {
    const Car = sequelize.define("car", {
      puchaseprice: {
        type: Sequelize.STRING
      },
      downpayment: {
        type: Sequelize.STRING
      },
      tradeinvalue: {
        type: Sequelize.STRING
      },
      interestrate: {
        type: Sequelize.STRING
      },
      lengthofloan: {
        type: Sequelize.STRING
      },
      monthlypayment: {
        type: Sequelize.STRING
      },
      totalcost: {
        type: Sequelize.STRING
      },
    });
  
    return Car;
  };