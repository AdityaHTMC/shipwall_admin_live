import React, { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ReactApexChart from 'react-apexcharts';
import { LoginContext } from '../ContextProvider/Context';
import axios from 'axios';
import { useEffect } from 'react';

const SalesReportChart = () => {

    let token = localStorage.getItem("usersdatatoken");
    const { loginData, setLoginData } = useContext(LoginContext);

  const options = {
    chart: {
      id: 'sales-line-chart',
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    },
  };

  const series = [
    {
      name: 'Sales',
      data: [50, 80, 60, 90, 75, 110, 100, 120, 95],
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
              <h5 className="card-title">Sales Report</h5>
              <ReactApexChart options={options} series={series} type="line" height={350} />
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SalesReportChart;
