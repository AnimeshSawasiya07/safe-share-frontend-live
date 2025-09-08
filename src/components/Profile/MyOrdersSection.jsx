
import { Form, Button, InputGroup } from "react-bootstrap";
import { BASE_URL } from "../../api/EndPoint";

export function MyOrdersSection({ myOrders }) {

  return (
    <div className=" my-5">
      <div className="row mb-4">
        <div className="col-12 d-flex justify-content-between align-items-center">
          <h5 className="fw-semibold mb-0">My Orders</h5>
          <div className="d-flex gap-2">
            <Button variant="light" className="d-flex align-items-center">
              <i className="bi bi-funnel me-2"></i> Filter
            </Button>
            <InputGroup>
              <InputGroup.Text>
                <i className="bi bi-search"></i>
              </InputGroup.Text>
              <Form.Control placeholder="Search" />
            </InputGroup>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          {myOrders?.map((order, index) => (
            <div
              key={index}
              className="d-flex flex-column bg-light p-3 mb-3 rounded shadow-sm"
            >
              {order?.orderItems?.map((orderItem, index) => {
                return <div className="d-flex align-items-center w-100 bg-light p-3 mb-3 " key={index}>
                  <img
                    src={orderItem?.listingId?.images[0].startsWith("http") ? orderItem?.listingId?.images[0] : BASE_URL + "/products/images/" + orderItem?.listingId?.images[0]}
                    alt={orderItem?.listingId?.title}
                    className="rounded me-3"
                    style={{ width: "55px", height: "55px", objectFit: "cover" }}
                  />
                  <div className="flex-grow-1">
                    <h6 className="mb-0 fw-semibold text-dark">{orderItem?.listingId?.title}</h6>
                    <small className="text-muted">by {orderItem?.sellerId?.name}</small>
                    <br />
                    <small className="text-muted">
                      {orderItem?.listingId?.price} Rs.
                    </small>
                  </div>
                </div>
              })}
              
              Total Amount : {order?.total}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

