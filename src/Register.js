import React from "react";

const Register = () => {
  return (
    <div class="container mt-5 mb-5 d-flex justify-content-center">
      <div class="card px-1 py-4">
        <div class="card-body">
          <h6 class="card-title mb-3">This appointment is for</h6>
          <div class="d-flex flex-row">
            {" "}
            <label class="radio mr-1">
              {" "}
              <input type="radio" name="add" value="anz" checked />{" "}
              <span>
                {" "}
                <i class="fa fa-user"></i> Anz CMK{" "}
              </span>{" "}
            </label>{" "}
            <label class="radio">
              {" "}
              <input type="radio" name="add" value="add" />{" "}
              <span>
                {" "}
                <i class="fa fa-plus-circle"></i> Add{" "}
              </span>{" "}
            </label>
          </div>
          <h6 class="information mt-4">
            Please provide following information about Anz CMK
          </h6>
          <div class="row">
            <div class="col-sm-12">
              <div class="form-group">
                <input class="form-control" type="text" placeholder="Name" />{" "}
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12">
              <div class="form-group">
                <div class="input-group">
                  {" "}
                  <input
                    class="form-control"
                    type="text"
                    placeholder="Mobile"
                  />{" "}
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12">
              <div class="form-group">
                <div class="input-group">
                  {" "}
                  <input
                    class="form-control"
                    type="text"
                    placeholder="Email ID"
                  />{" "}
                </div>
              </div>
            </div>
          </div>
          <div class=" d-flex flex-column text-center px-5 mt-3 mb-3">
            {" "}
            <small class="agree-text">
              By Booking this appointment you agree to the
            </small>{" "}
            <a href="#" class="terms">
              Terms & Conditions
            </a>{" "}
          </div>{" "}
          <button class="btn btn-primary btn-block confirm-button">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
