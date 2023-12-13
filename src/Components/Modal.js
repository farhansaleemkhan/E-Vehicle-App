import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Modaal({ showModal, setShowModal, callback, slots, selectedSlot, setSelectedSlot }) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => {
      setShow(false); // Update local state
      setShowModal(false); // Update parent component state
    };

    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

  //   useEffect(() => {
  //     console.log("slotssss ", slots);
  //   }, [slots]);

  const handleCheckboxChange = (index) => {
    setSelectedSlot(index);
  };

  return (
    <>
      {/* <Button variant="primary">Launch demo modal</Button> */}

      <Modal show={showModal}>
        {/* <Modal.Header closeButton> */}
        <div style={{ margin: "1rem" }}>
          <Modal.Title>Select Slot:</Modal.Title>
        </div>
        {/* </Modal.Header> */}
        <Modal.Body>
          <div className="checkboxGroup">
            {new Array(slots?.totalSlots).fill(undefined).map((item, index) => (
              <div style={{ width: "5rem" }} key={index + 1}>
                {slots?.bookedSlots?.includes((index + 1).toString()) ? (
                  <div>
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        // handlePermission(item, e, index);
                      }}
                      checked={true}
                      disabled={true}
                      style={{ margin: ".6rem", color: "red" }}
                    />
                    {index + 1}
                  </div>
                ) : (
                  <div>
                    <input
                      type="checkbox"
                      onChange={(e) => handleCheckboxChange(index + 1)}
                      checked={selectedSlot === index + 1}
                      //   onChange={(e) => {
                      //     console.log("loge", e.target.checked);
                      //     // handlePermission(item, e, index);
                      //   }}
                      //   checked={false}
                      style={{ margin: ".6rem" }}
                    />
                    {index + 1}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => setShowModal(false)}>
            Confirm Slot
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Modaal;
