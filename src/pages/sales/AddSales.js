import React, { useContext, useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { useAppContext } from "../../contextApi/AppContext";
import { useParams } from "react-router-dom";
import Pagination from "react-bootstrap/Pagination";
import { toast } from "react-toastify";

// ... (your imports)

const AddSales = () => {
  const { itemdata, tableLoading, getBP, singleBPdata, SalseOrderPlace,BPdata } = useAppContext();
  const { id } = useParams();

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);
  const [quantityMap, setQuantityMap] = useState({});
  const [numAtCard, setNumAtCard] = useState('')
  const [remarks, setRemarks] = useState('')


  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentItem = itemdata.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleCheckboxChange = (itemCode, itemPrice) => {
    setSelectedItems((prevSelectedItems) => {
      const existingItemIndex = prevSelectedItems.findIndex(
        (item) => item.ItemCode === itemCode
      );

      if (existingItemIndex !== -1) {
        const updatedItems = [...prevSelectedItems];
        updatedItems.splice(existingItemIndex, 1);
        return updatedItems;
      } else {
        return [
          ...prevSelectedItems,
          {
            ItemCode: itemCode,
            Price: itemPrice,
            Quantity: parseInt(quantityMap[itemCode]) || 1,
            WhsCode: "PT-FGTG"
          },
        ];
      }
    });
  };

  const handleQuantityChange = (itemCode, event) => {
    const { value } = event.target;
    setQuantityMap((prevQuantityMap) => ({
      ...prevQuantityMap,
      [itemCode]: value,
    }));
  };

  useEffect(() => {
    getBP(id);
  }, [id]);


  const handelorder = (e) => {
    e.preventDefault()
    console.log(remarks)
    if(!remarks || !numAtCard){
      toast.info("plz fill Remarks and NumAtCard")
    }else{
      SalseOrderPlace(singleBPdata[0]?.CardCode, selectedItems,numAtCard,remarks);
      setNumAtCard("")
      setRemarks("")
      setSelectedItems([])
      setQuantityMap({})
    }
  };


  const calculateTotals = () => {
    let totalProducts = 0;
    let totalPrice = 0;

    selectedItems.forEach((item) => {
      totalProducts += item.Quantity;
      totalPrice += item.Quantity * item.Price;
    });

    return { totalProducts, totalPrice };
  };

  const { totalProducts, totalPrice } = calculateTotals();
  return (
    <>
      <div>
        <h3 className="text-center mb-3">
          Select Item for {singleBPdata[0]?.CardName}
        </h3>
        <Row>
          <div>
            <Card className="">
              <Table className="align-items-center" responsive="sm">
                <thead className="">
                  <tr>
                    <th>ItemCode</th>
                    <th>ItemName</th>
                    <th>ItemQty</th>
                    <th>ItemPrice</th>
                    <th>ItmsGrpCod</th>
                    <th>ItmsGrNam</th>
                    <th>Quantity</th>
                    <th>Select</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItem.map((element, index) => {
                    return (
                      <tr key={index}>
                        <td>{element.ItemCode}</td>
                        <td>{element.ItemName}</td>
                        <td>{element.ItemQty}</td>
                        <td>{element.ItemPrice}</td>
                        <td>{element.ItmsGrpCod}</td>
                        <td>{element.ItmsGrpNam}</td>
                        <td>
                          <div className="d-flex justify-content-between align-items-center">
                            <i
                              onClick={() =>
                                handleQuantityChange(
                                  element.ItemCode,
                                  { target: { value: quantityMap[element.ItemCode] ? parseInt(quantityMap[element.ItemCode]) - 1 : 1 } }
                                )
                              }
                              className="fa-regular fa-square-minus btn"
                            ></i>
                            <input
                              type="number"
                              value={quantityMap[element.ItemCode] || 1}
                              onChange={(event) =>
                                handleQuantityChange(
                                  element.ItemCode,
                                  event
                                )
                              }
                              style={{ width: "50px" }}
                            />
                            <i
                              onClick={() =>
                                handleQuantityChange(
                                  element.ItemCode,
                                  { target: { value: quantityMap[element.ItemCode] ? parseInt(quantityMap[element.ItemCode]) + 1 : 1 } }
                                )
                              }
                              className="fa-regular fa-square-plus btn"
                            ></i>
                          </div>
                        </td>
                        <td>
                          <Form.Check
                            type="checkbox"
                            checked={selectedItems.some(
                              (item) => item.ItemCode === element.ItemCode
                            )}
                            onChange={() =>
                              handleCheckboxChange(
                                element.ItemCode,
                                element.ItemPrice
                              )
                            }
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              {selectedItems.length > 0 ? (
                <>
                <form className="row mt-2 mx-2" onSubmit={handelorder}>
                <div className="mb-4 col-md-4">
            <label htmlFor="exampleInputEmail1" className="form-label">
            NumAtCard
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="NumAtCard"
              value={numAtCard}
              onChange={(e)=>setNumAtCard(e.target.value)}
            />
          </div>

          <div className="mb-3 col-md-4">
            <label htmlFor="exampleInputPassword1" className="form-label">
            Remarks
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              name="Remarks"
              value={remarks}
              onChange={(e)=>setRemarks(e.target.value)}
            />
          </div>
          <div className="mb-3 col-md-4">
            <div className="d-flext justify-content-between align-item-center">
              <span>
                Total :
              </span>
              <sapn>
                {totalPrice}
              </sapn>
            </div>
          </div>

                <button className="btn btn-outline-success">Place Order</button>
                </form>
                </>
              ) : null}
            </Card>

            <div className="pagination-container">
              <Pagination>
                {Array.from({
                  length: Math.ceil(itemdata.length / itemsPerPage),
                }).map((_, index) => (
                  <Pagination.Item
                    key={index}
                    active={index + 1 === currentPage}
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}
              </Pagination>
            </div>
          </div>
        </Row>
      </div>
    </>
  );
};

export default AddSales;
