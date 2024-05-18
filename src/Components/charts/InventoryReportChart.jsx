import React, { useContext, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ReactApexChart from 'react-apexcharts';
import { LoginContext } from '../ContextProvider/Context';
import axios from 'axios';



const InventoryReportChart = () => {
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
      chart: {
        id: 'inventory-bar-chart',
      },
      xaxis: {
        categories: ['Item A', 'Item B', 'Item C', 'Item D', 'Item E'],
      },
    };
  
    const series = [
      {
        name: 'Inventory Quantity',
        data: [50, 30, 80, 45, 60],
      },
    ];
  
    return (
      <Container>
        <Row>
          <Col>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Inventory Report</h5>
                <ReactApexChart options={options} series={series} type="bar" height={350} />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  };
  
  export default InventoryReportChart;