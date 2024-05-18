import React, { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ReactApexChart from 'react-apexcharts';
import { LoginContext } from '../ContextProvider/Context';
import axios from 'axios';
import { useEffect } from 'react';

const InvoiceReportChart = () => {

    let token = localStorage.getItem("usersdatatoken");
    const { loginData, setLoginData } = useContext(LoginContext);


  const options = {
    chart: {
      id: 'invoice-bar-chart',
    },
    xaxis: {
      categories: ['Invoice 001', 'Invoice 002', 'Invoice 003', 'Invoice 004', 'Invoice 005'],
    },
  };

  const series = [
    {
      name: 'Invoice Amount',
      data: [2000, 3500, 2700, 4100, 3000],
    },
  ];

//   const dashValid = async () => {
//     await axios.get("/validUser", {
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": token
//         }
//     })
//         .then((res) => {
//             console.log(res.data);
//             setLoginData(res.data.validUserOne);

//         })
//         .catch(err => {
//             console.log(err)
//             // navigate("*");
//         });
// };

// useEffect(()=>{
// dashValid()
// },[])



  return (
    <Container>
      <Row>
        <Col>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Invoice Report</h5>
              <ReactApexChart options={options} series={series} type="bar" height={350} />
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default InvoiceReportChart;
