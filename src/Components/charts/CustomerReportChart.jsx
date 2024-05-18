import React, { useContext, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ReactApexChart from 'react-apexcharts';
import { LoginContext } from '../ContextProvider/Context';
import axios from 'axios';

const CustomerReportChart = () => {
    let token = localStorage.getItem("usersdatatoken");
    const { loginData, setLoginData } = useContext(LoginContext);

    // const dashValid = async () => {
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
    //     dashValid()
    //     },[])

  const options = {
    labels: ['Type A', 'Type B', 'Type C', 'Type D'],
  };

  const series = [44, 55, 13, 43]; // Replace with actual customer type counts

  return (
    <Container>
      <Row>
        <Col>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Customer Report</h5>
              <ReactApexChart options={options} series={series} type="donut" height={350} />
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CustomerReportChart;
