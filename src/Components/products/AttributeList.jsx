import React, { useEffect } from 'react'
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import { useAppContext } from '../../contextApi/AppContext';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Select from "react-select";
import { useNavigate } from 'react-router-dom';



const AttributeList = () => {
    const {itemMatrixList, itemGroupdata, getItemMatrixList, attributeList, getAttributeList, AttributeAdd,getsecondItemMatrices,
      seconditemMatrics} = useAppContext()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [groupCodeOptions, setGroupCodeOptions] = useState([]);
  const [itemMatrixOptions, setItemMatrixOptions] = useState([]);
  const [groupCodeOptions1, setGroupCodeOptions1] = useState([]);
  const [itemMatrixOptions1, setItemMatrixOptions1] = useState([]);
  const [itemMatrixOptions2, setItemMatrixOptions2] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState({})
  const [selectedMatrix, setSelectedMatrix] = useState({})
  const [selectedGroup1, setSelectedGroup1] = useState('')
  const [selectedMatrix1, setSelectedMatrix1] = useState('')
  const [selectedMatrix2, setSelectedMatrix2] = useState('')
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    attribute: '',
    u_PROPRT1: '',
    u_PROPRT2: '',
    u_PROPRT3: '',
    u_PROPRT4: '',
    u_PROPRT5: '',
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    setGroupCodeOptions(
      itemGroupdata.map((item) => ({
        value: item.itmsGrpCod,
        label: item.itmsGrpNam,
      }))
    );
    setGroupCodeOptions1(
      itemGroupdata.map((item) => ({
        value: item.itmsGrpCod,
        label: item.itmsGrpNam,
      }))
    );
  }, [itemGroupdata]);

  useEffect(() => {
    setItemMatrixOptions(
      itemMatrixList.map((item) => ({
        value: item.pcode,
        label: item.pname,
      }))
    );
    setItemMatrixOptions1(
      itemMatrixList.map((item) => ({
        value: item.pcode,
        label: item.pname,
      }))
    );
  }, [itemMatrixList]);


  useEffect(() => {
    setItemMatrixOptions2(
      seconditemMatrics.map((item) => ({
        value: item.pcode,
        label: item.pname,
      }))
    );
  }, [seconditemMatrics]);

  useEffect(() => {
    const fetchdata = async()=>{
      await getAttributeList()
    }
    fetchdata()
  }, []);

  const filterItemmatrix = async (selectedOption) => {
    if (selectedOption) {
      // resetValues()
      setSelectedGroup({
        itmsGrpCod: selectedOption.value,
        itmsGrpNam: selectedOption.label,
      });
      getItemMatrixList(selectedOption.value);
      getAttributeList(selectedOption.value);
    } else {
      setSelectedGroup({});
      getItemMatrixList();
      getAttributeList();
    }
  };

  const filterItemmatrix1 = async (selectedOption) => {
    setSelectedGroup1(selectedOption?.value);
    getItemMatrixList(selectedOption.value);

    setItemMatrixOptions1(
      itemMatrixList.map((item) => ({
        value: item.pcode,
        label: item.pname,
      }))
    );
  };
  

  const filterItemmatrix2 = async (selectedOption) => {
    setSelectedMatrix1(selectedOption);
    getsecondItemMatrices(selectedGroup1,selectedOption);
    setItemMatrixOptions2(
      seconditemMatrics.map((item) => ({
        value: item.pcode,
        label: item.pname,
      }))
    );
  };
  
  const resetValues = () => {
    setSelectedGroup1('');
    setSelectedMatrix1('');
    setSelectedMatrix2('');
    setItemMatrixOptions1([]);
    setItemMatrixOptions2([]);
  };
  

  const filerAttributeList = async(selectedOption)=>{
    setSelectedMatrix({
      pcode: selectedOption?.value,
      pname:selectedOption?.label
    })
    getAttributeList(selectedGroup?.value,selectedOption?.value)
  }

  console.log("sele",selectedMatrix1)

const handleSubmit = async()=>{
 await AttributeAdd(selectedGroup1.toString() ,formData.attribute,selectedMatrix1 || "",selectedMatrix2 || "")
 setShow(false)
 setFormData({})
 setSelectedGroup1('')
 setSelectedMatrix1('')
 setSelectedMatrix2('')
//  setGroupCodeOptions({})
//  setItemMatrixOptions({})
}


  return (
    <>
    <div>
      <Row>
      <div className="d-flex justify-content-between align-item-center">
            <div className="mb-2 col-md-4 z-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Filter by Categories
              </label>
              <Select
                options={groupCodeOptions}
                value={groupCodeOptions.find(
                  (option) => option.value === selectedGroup.itmsGrpCod
                )}
                onChange={(selectedOption) =>
                  filterItemmatrix(selectedOption)
                }
              />
            </div>
            <div className="mb-2 mx-2 col-md-4 z-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Filter by ItemMatrix
              </label>
              <Select
                options={itemMatrixOptions}
                value={itemMatrixOptions.find(
                  (option) => option.value === selectedMatrix.pcode
                )}
                onChange={(selectedOption) =>
                  filerAttributeList(selectedOption)
                }
              />
            </div>
            {/* <div className="mb-2 mt-4 col-md-4 z-3 "> */}
              <button onClick={handleShow} className='btn btn-primary mb-2 mt-4 col-md-2 z-3 '>Add Attribute</button>
            {/* </div> */}
          </div>
      </Row>
        <Row>
          <div>
            <Card className="">
              <Table className="align-items-center" responsive="sm">
                <thead className="">
                  <tr>
                    <th>ID</th>
                    {/* <th>Pcode</th> */}
                    <th>Group Name</th>
                    <th>Attribute</th>
                    {/* <th>u_PROPRT1</th>
                    <th>u_PROPRT2</th>
                    <th>u_PROPRT3</th>
                    <th>u_PROPRT4</th>
                    <th>u_PROPRT5</th> */}
                    {/* <th>Action</th> */}
                  </tr>
                </thead>
                <tbody>
                  {attributeList ? (
                      attributeList.map((element, index) => {
                          return (
                              <tr key={index}>
                          <td>{element._id.slice(0,9)}</td>
                          <td>{element.itmsGrpNam }</td>
                            <td>
                                {element.attribute}
                            </td>
                        </tr>
                      );
                    })
                  ) : (
                    <div>No Data Found</div>
                  )}
                </tbody>
              </Table>
            </Card>
          </div>
          <Row>
          <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Categories
              </label>
              <Select
                options={groupCodeOptions1}
                value={groupCodeOptions1.find(
                  (option) => option.value === selectedGroup1
                )}
                onChange={(selectedOption) =>
                  filterItemmatrix1(selectedOption)
                  
                }
              />
            </div>
            {itemMatrixOptions1.length > 0 && (
                  <div className="">
                    <label htmlFor="exampleInputPassword1" className="form-label">
                      Sub Categories
                    </label>
                    <Select
                      options={itemMatrixOptions1}
                      value={itemMatrixOptions1.find(
                        (option) => option.value === selectedMatrix1
                      )}
                      onChange={(selectedOption) => filterItemmatrix2(selectedOption?.value)}
                    />
                  </div>
                )}


             {itemMatrixOptions2.length > 0 && (
                  <div className="">
                    <label htmlFor="exampleInputPassword1" className="form-label">
                      Sub Categories 1
                    </label>
                    <Select
                      options={itemMatrixOptions2}
                      value={itemMatrixOptions2.find(
                        (option) => option.value === selectedMatrix2
                      )}
                      onChange={(selectedOption) => setSelectedMatrix2(selectedOption?.value)}
                    />
                  </div>
                )}
        <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Attribute</Form.Label>
        <Form.Control  type="text"
                placeholder="Enter Attribute"
                name="attribute"
                value={formData.attribute}
                onChange={handleInputChange} />
      </Form.Group>
    </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit}>
            Save Attribute
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
          </Row>
          
        </Row>
      </div>
    </>
  )
}

export default AttributeList