import React from "react";
import { connect } from "react-redux";
import { removeAlert } from "./actions/alert";

const Alert = ({ alert: { msg, alertType, timeout }, removeAlert }) => {
  const closeBtnRef = React.useRef(null);

  React.useEffect(() => {
    let time = null;
    if (msg.length > 0) {
      time = setTimeout(() => {
        //closeBtnRef.current?.click(); // current can't be accessed when the modal is not visible so need to use *if condn*
        removeAlert(); // alert.msg is changed
      }, timeout);
    }
    // If manually clicked Interval will be cleared, this also prevents Memory Leak
    return () => {
      if (time) {
        clearInterval(time);
      }
    };
  }, [msg]);

  return (
    msg.length > 0 && (
      <div
        className="mx-2  fixed-top-20 text-center d-inline"
        style={{ zIndex: "1030" }}
      >
        <div
          className={`alert py-2 alert-contain ${alertType} fade show my-0`}
          role="alert"
        >
          {msg}
          <button
            ref={closeBtnRef}
            type="button"
            className="btn-close-uni-alert ml-4 float-right"
            onClick={() => removeAlert()}
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      </div>
    )
  );
};

const mapStateToProps = (state) => ({
  alert: state.alert,
});

export default connect(mapStateToProps, { removeAlert })(Alert);
