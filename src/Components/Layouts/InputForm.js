import React from 'react'
import {
    Button,
    Form,
    InputGroup,
    Container,
    Row,
    Col,
  } from 'react-bootstrap';

  import { jsPDF } from 'jspdf';

  import axios from 'axios';

export default class InputForm extends React.Component{

    constructor(props) {
        super(props);
       
    }

    state = {
        puchaseprice: 19700,
        downpayment: 1000,
        tradeinvalue: 500,
        interestrate: 0.03,
        lengthofloan: 1,
        monthlypayment: 0,
        totalcost : 0,
        selectorRef : React.createRef(null)

    }

    changeHandler = event => {
        const name = event.target.name;
        const value = event.target.value;
    
        if (value) {
          this.setState({
            [name]: value,
          });
          var B2 = this.state.puchaseprice
          if(name === "puchaseprice"){
            B2=value
          }
          var B3 = this.state.downpayment
          if(name === "downpayment"){
            B3=value
          }
          var B4 = this.state.tradeinvalue
          if(name === "tradeinvalue"){
            B4=value
          }
          var B5 = this.state.interestrate
          if(name === "interestrate"){
            B5=value
          }
          var B6 = this.state.lengthofloan
          if(name === "lengthofloan"){
            B6=value
          }
        //   const amount = (B2-(B3+B4))
        //   var principal = parseFloat(amount);
        //   var interest = parseFloat(B5) / 100 / 12;
        //   var payments = parseFloat(B6) * 12;
  
        //   // compute the monthly payment figure
        //   var x = Math.pow(1 + interest, payments); //Math.pow computes powers
        //   var monthly = (principal*x*interest)/(x-1);
        //   if (!isNaN(monthly) && (monthly !== Number.POSITIVE_INFINITY) && (monthly !== Number.NEGATIVE_INFINITY)) {
        //     this.setState({monthlypayment:monthly.toFixed(2)})
        //     this.setState({totalcost:(monthly * payments).toFixed(2)})

        //   }
        //   var mp = (((B2-(B3+B4))/B6)+(((B2-(B3+B4))*(B5))/B6))
        //   var mp = ((B2-(B3+B4))*(B5/12))/(1 - ((1 + (B5/12))^(-1 * B6 * 12)))

        //   var mp = 


        }
      };
    //   submitForm = () => {
    //     console.log('true');

    //     this.props.onSubmit(this.state);
    //   };

    handleDownload = () => {
        // console.log(this.state);

        axios.post('http://localhost:8082/api/car/add', {
            puchaseprice: this.state.puchaseprice,
            downpayment: this.state.downpayment,
            tradeinvalue: this.state.tradeinvalue,
            interestrate: this.state.interestrate,
            lengthofloan: this.state.lengthofloan,
            monthlypayment: this.state.monthlypayment,
            totalcost: this.state.totalcost,
        })
            .then((res) => {
                console.log(res.data)
                this.setState({monthlypayment:res.data.total.monthly.toFixed(2)})
                this.setState({totalcost:res.data.total.total.toFixed(2)})

            }).catch((error) => {
                console.log(error)
            });

       

        
        
        const content = `
        <table style="width:20%;border:1px solid black;font-size:18px;">
            <tr>
                 <th style="border:1px solid black;font-size:18px;">Name</th>
                 <th style="border:1px solid black;font-size:18px;">Quotation</th>
            </tr>
            <tr>
                <td style="border:1px solid black;font-size:18px;">Purchase Price</td>
                <td style="border:1px solid black;font-size:18px;">`+this.state.puchaseprice+`</td>
            </tr>
            <tr>
                <td style="border:1px solid black;font-size:18px;">Down Payment</td>
                <td style="border:1px solid black;font-size:18px;">`+this.state.downpayment+`</td>
            </tr>
            <tr>
                <td style="border:1px solid black;font-size:18px;">Trade in value</td>
                <td style="border:1px solid black;font-size:18px;">`+this.state.tradeinvalue+`</td>
            </tr>
            <tr>
                <td style="border:1px solid black;font-size:18px;">Interest Rate</td>
                <td style="border:1px solid black;font-size:18px;">`+this.state.interestrate+`</td>
            </tr>
            <tr>
                <td style="border:1px solid black;font-size:18px;">Length of Loan(Years)</td>
                <td style="border:1px solid black;font-size:18px;">`+this.state.lengthofloan+`</td>
            </tr>
            <tr>
                <td style="border:1px solid black;font-size:18px;">Monthly Payment</td>
                <td style="border:1px solid black;font-size:18px;">`+this.state.monthlypayment+`</td>
            </tr>
            <tr>
                <td style="border:1px solid black;font-size:18px;">Total Cost</td>
                <td style="border:1px solid black;font-size:18px;">`+this.state.totalcost+`</td>
            </tr>
  
        </table>`;
        console.log(content);

        const doc = new jsPDF();
        doc.html(content, {
            callback: function (doc) {
                doc.save('sample.pdf');
            }
        });



    };
    
    calculate = () => {
        var B2 = this.state.puchaseprice
          
           var B3 = this.state.downpayment
          
           var B4 = this.state.tradeinvalue
          
           var B5 = this.state.interestrate
          
           var B6 = this.state.lengthofloan
          
          const amount = (B2-(B3+B4))
           var principal = parseFloat(amount);
           var interest = parseFloat(B5) / 100 / 12;
           var payments = parseFloat(B6) * 12;
  
          // compute the monthly payment figure
           var x = Math.pow(1 + interest, payments); //Math.pow computes powers
          var monthly = (principal*x*interest)/(x-1);
          if (!isNaN(monthly) && (monthly !== Number.POSITIVE_INFINITY) && (monthly !== Number.NEGATIVE_INFINITY)) {
            this.setState({monthlypayment:monthly.toFixed(2)})
            this.setState({totalcost:(monthly * payments).toFixed(2)})

          }
    }

    render(){
    
        return (
        <Container>
            <Form style={{marginTop:"40px"}} ref={this.state.selectorRef}>
                <Form.Group as={Row} controlId="formPurchasePrice">
                    <Form.Label column sm="2">Purchase Price</Form.Label>
                    <Col sm="10">
                        <InputGroup>
                            <InputGroup.Text id="basic-addon1">Rs.</InputGroup.Text>
                            <Form.Control
                                name="puchaseprice"
                                type="number"
                                placeholder="Purchase Price"
                                value={this.state.puchaseprice}
                                onChange={this.changeHandler}
                                aria-label="Purchase Price"
                                aria-describedby="basic-addon1"
                                />
                        </InputGroup>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formDownPayment" style={{marginTop:"30px"}}>
                    <Form.Label column sm="2">Down Payment</Form.Label>
                    <Col sm="10">
                        <InputGroup>
                            <InputGroup.Text id="basic-addon1">Rs.</InputGroup.Text>
                            <Form.Control
                                name="downpayment"
                                type="number"
                                placeholder="Down Payment"
                                value={this.state.downpayment}
                                onChange={this.changeHandler}
                                aria-label="Down Payment"
                                aria-describedby="basic-addon1"
                                />
                        </InputGroup>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formTradeinvalue" style={{marginTop:"30px"}}>
                    <Form.Label column sm="2">Trade in value</Form.Label>
                    <Col sm="10">
                        <InputGroup>
                            <InputGroup.Text id="basic-addon1">Rs.</InputGroup.Text>
                            <Form.Control
                                name="tradeinvalue"
                                type="number"
                                placeholder="Trade in value"
                                value={this.state.tradeinvalue}
                                onChange={this.changeHandler}
                                aria-label="Trade in value"
                                aria-describedby="basic-addon1"
                                />
                        </InputGroup>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formInterestrate" style={{marginTop:"30px"}}>
                    <Form.Label column sm="2">Interest Rate</Form.Label>
                    <Col sm="10">
                        <InputGroup>
                            <InputGroup.Text id="basic-addon1">%</InputGroup.Text>
                            <Form.Control
                                name="interestrate"
                                type="number"
                                placeholder="Interest Rate"
                                value={this.state.interestrate}
                                onChange={this.changeHandler}
                                aria-label="Interest Rate"
                                aria-describedby="basic-addon1"
                                />
                        </InputGroup>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formlengthofloan" style={{marginTop:"30px"}}>
                    <Form.Label column sm="2">Length of Loan</Form.Label>
                    <Col sm="10">
                        <InputGroup>
                            <InputGroup.Text id="basic-addon1">years</InputGroup.Text>
                            <Form.Control
                                name="lengthofloan"
                                type="number"
                                placeholder="Length of Loan"
                                value={this.state.lengthofloan}
                                onChange={this.changeHandler}
                                aria-label="Length of Loan"
                                aria-describedby="basic-addon1"
                                />
                        </InputGroup>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formMonthlyPayment" style={{marginTop:"30px"}}>
                    <Form.Label column sm="2">Monthly Payment</Form.Label>
                    <Col sm="10">
                        <InputGroup>
                            <InputGroup.Text id="basic-addon1">Rs.</InputGroup.Text>
                            <Form.Control
                                name="monthlypayment"
                                type="number"
                                placeholder="Monthly Payment"
                                value={this.state.monthlypayment}
                                onChange={this.changeHandler}
                                aria-label="Monthly Payment"
                                aria-describedby="basic-addon1"
                                disabled="disabled"
                                />
                        </InputGroup>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formTotalCost" style={{marginTop:"30px"}}>
                    <Form.Label column sm="2">Total Cost</Form.Label>
                    <Col sm="10">
                        <InputGroup>
                            <InputGroup.Text id="basic-addon1">Rs.</InputGroup.Text>
                            <Form.Control
                                name="totalcost"
                                type="number"
                                placeholder="Total Cost"
                                value={this.state.totalcost}
                                onChange={this.changeHandler}
                                aria-label="Total Cost"
                                aria-describedby="basic-addon1"
                                disabled="disabled"
                                />
                        </InputGroup>
                    </Col>
                </Form.Group>
                <Col sm="12" 
                   style={{textAlign:"center", margin:"40px"}}
                   >
                  <Button
                   variant="primary"
                   color="primary"
                   className="full-width"
                   onClick={this.handleDownload}
                   >Submit & Download PDF
                   </Button>
                </Col>
            </Form>
        </Container>
        )
    }
}