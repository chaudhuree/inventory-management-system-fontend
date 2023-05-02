import React, { Fragment, useEffect, useState } from 'react';
import { Modal, Button } from 'antd';
import { SaleListRequest, SaleDetailsByID } from "../../APIRequest/SaleAPIRequest";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlineEdit, AiOutlineEye } from "react-icons/all";
import ReactPaginate from "react-paginate";
import CurrencyFormat from "react-currency-format";
import moment from "moment/moment";


const SalesList = () => {
  let [searchKeyword, setSearchKeyword] = useState("0");
  let [perPage, setPerPage] = useState(20);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  // modal related code start
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // modal related code end
  useEffect(() => {
    (async () => {
      await SaleListRequest(1, perPage, searchKeyword);
    })();
  }, [])

  let DataList = useSelector((state) => (state.sale.List));
  let TotalData = useSelector((state) => (state.sale.ListTotal))

  const handlePageClick = async (event) => {
    await SaleListRequest(event.selected + 1, perPage, searchKeyword)
  };
  const searchData = async () => {
    await SaleListRequest(1, perPage, searchKeyword)
  }
  const perPageOnChange = async (e) => {
    setPerPage(parseInt(e.target.value))
    await SaleListRequest(1, e.target.value, searchKeyword)
  }
  const searchKeywordOnChange = async (e) => {
    setSearchKeyword(e.target.value)
    if ((e.target.value).length === 0) {
      setSearchKeyword("0")
      await SaleListRequest(1, perPage, "0")
    }
  }

  const TextSearch = (e) => {
    const rows = document.querySelectorAll('tbody tr')
    rows.forEach(row => {
      row.style.display = (row.innerText.toLowerCase().includes(e.target.value.toLowerCase())) ? '' : 'none'
    })
  }


  const DetailsPopUp = async (saleID) => {

    const data = await SaleDetailsByID(saleID)

    const resultData = data.map((item, index) => {
      return (
        {
          Qty: item.Qty,
          UnitCost: item.UnitCost,
          BrandName: item.brands[0].Name,
          ProductName: item.products[0].Name

        }
      )
    })
    setModalData(resultData)
    console.log('modalData', modalData);

    showModal()

  }
  return (
    <Fragment>

      <div className="container-fluid my-5">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-4 col-12">
                      <h5>Sales List</h5>
                    </div>

                    <div className="col-md-2 col-6">
                      <input onKeyUp={TextSearch} placeholder="Text Filter" className="form-control form-control-sm" />
                    </div>

                    <div className="col-md-2 col-6">
                      <select onChange={perPageOnChange} className="form-control mx-2 form-select-sm form-select form-control-sm" >
                        <option value="20">20 Per Page</option>
                        <option value="30">30 Per Page</option>
                        <option value="50">50 Per Page</option>
                        <option value="100">100 Per Page</option>
                        <option value="100">200 Per Page</option>
                      </select>
                    </div>
                    <div className="col-md-4 col-12 mt-4 mt-md-0">
                      <div className="input-group mb-3">
                        <input onChange={searchKeywordOnChange} type="text" className="form-control form-control-sm" placeholder="Search.." aria-label="Recipient's username" aria-describedby="button-addon2" />
                        <button onClick={searchData} className="btn  btn-success btn-sm mb-0" type="button">Search</button>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <div className="table-responsive table-section">
                        <table className="table ">
                          <thead className="sticky-top bg-white">
                            <tr>
                              <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Customer</td>
                              <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Grand Total</td>
                              <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Shipping Cost</td>
                              <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Vat/Tax</td>
                              <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Other Cost</td>
                              <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Discount</td>
                              <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Date</td>
                              <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Action</td>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              DataList.map((item, i) =>
                                <tr key={i}>
                                  <td>
                                    <p className="text-xs text-start">{item.customers[0]['CustomerName']}</p>
                                  </td>

                                  <td>
                                    <p className="text-xs text-start">
                                      <CurrencyFormat value={item.GrandTotal} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                    </p>
                                  </td>

                                  <td>
                                    <p className="text-xs text-start">
                                      <CurrencyFormat value={item.ShippingCost} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                    </p>
                                  </td>

                                  <td>
                                    <p className="text-xs text-start">
                                      <CurrencyFormat value={item.VatTax} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                    </p>
                                  </td>

                                  <td>
                                    <p className="text-xs text-start">
                                      <CurrencyFormat value={item.OtherCost} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                    </p>
                                  </td>

                                  <td>
                                    <p className="text-xs text-start">
                                      <CurrencyFormat value={item.Discount} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                    </p>
                                  </td>


                                  <td>
                                    <p className="text-xs text-start">{moment(item.CreatedDate).format('MMMM Do YYYY')}</p>
                                  </td>

                                  <td>
                                    <button onClick={DetailsPopUp.bind(this, item._id)} className="btn btn-outline-light text-success p-2 mb-0 btn-sm ms-2">
                                      <AiOutlineEye size={15} />
                                    </button>
                                  </td>
                                </tr>
                              )
                            }

                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="col-12 mt-5">
                      <nav aria-label="Page navigation example">
                        <ReactPaginate
                          previousLabel="<"
                          nextLabel=">"
                          pageClassName="page-item"
                          pageLinkClassName="page-link"
                          previousClassName="page-item"
                          previousLinkClassName="page-link"
                          nextClassName="page-item"
                          nextLinkClassName="page-link"
                          breakLabel="..."
                          breakClassName="page-item"
                          breakLinkClassName="page-link"
                          pageCount={Math.ceil(TotalData / perPage)}
                          marginPagesDisplayed={2}
                          pageRangeDisplayed={5}
                          onPageChange={handlePageClick}
                          containerClassName="pagination"
                          activeClassName="active"
                        />
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="row">

          <div className="col-12">
          <Modal title={`${modalData?.length} ${modalData?.length % 2 === 0 ? 'items' : 'item'}`} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>

          <table className="table">
            <thead>
              <tr>
                <th scope="col">Qty</th>
                <th scope="col">UnitCost</th>
                <th scope="col">BrandName</th>
                <th scope="col">ProductName</th>
              </tr>
            </thead>
            <tbody>
              {
                modalData?.map((item, i) =>
                  <tr key={i} className="text-center">
                    <td>{item.Qty}</td>
                    <td>{item.UnitCost}</td>
                    <td>{item.BrandName}</td>
                    <td>{item.ProductName}</td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </Modal>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SalesList;