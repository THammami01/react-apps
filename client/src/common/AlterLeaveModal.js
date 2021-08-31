import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Modal, Whisper, Input, Tooltip } from "rsuite";

const AlterEmloyeeModal = ({
  title,
  isShown,
  onClose,
  btns,
  leaveToUpdate,
}) => {
  const [formValues, setFormValues] = useState([
    { id: "departureDate", label: "Date départ", width: 300, value: "" },
    { id: "returnDate", label: "Date retour", width: 300, value: "" },
  ]);

  const connectedUser = useSelector((store) => store.global.connectedUser);

  useEffect(() => {
    if (leaveToUpdate)
      setFormValues((formValues) => {
        return [
          { ...formValues[0], value: leaveToUpdate.departureDate },
          { ...formValues[1], value: leaveToUpdate.returnDate },
        ];
      });
  }, []); // eslint-disable-line

  const getLeave = () => {
    const savedLeave = {
      employeeId: connectedUser.id,
      lastname: connectedUser.lastname,
      firstname: connectedUser.firstname,
      level: connectedUser.level,
      status: "En cours de traitement",
    };

    formValues.forEach((formValue) => {
      savedLeave[formValue.id] = formValue.value;
    });
    return savedLeave;
  };

  return (
    <Modal
      overflow
      show={isShown}
      onHide={onClose}
      style={{ width: 400, marginLeft: "auto", marginRight: "auto" }}
    >
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {formValues.map(({ id, label, width, value }) => (
          <Whisper
            trigger="focus"
            key={label}
            speaker={
              <Tooltip style={{ visibility: value ? "hidden" : "" }}>
                {"Obligatoire"}
              </Tooltip>
            }
          >
            <Input
              style={{ width, marginBottom: ".25rem" }}
              value={value}
              onChange={(v) =>
                setFormValues((formValues) =>
                  formValues.map((formValue) =>
                    formValue.id === id ? { ...formValue, value: v } : formValue
                  )
                )
              }
              placeholder={label}
            />
          </Whisper>
        ))}
      </Modal.Body>
      <Modal.Footer>
        {btns.map(({ label, appearance, onClick }, index) => (
          <Button
            key={index}
            onClick={() => onClick(getLeave())}
            appearance={appearance}
          >
            {label}
          </Button>
        ))}
      </Modal.Footer>
    </Modal>
  );
};

export default AlterEmloyeeModal;
