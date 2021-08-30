import { useEffect, useState } from "react";
import { Button, Modal, Whisper, Input, Tooltip } from "rsuite";

const AlterEmloyeeModal = ({
  title,
  isShown,
  onClose,
  btns,
  personToUpdate,
}) => {
  const [formValues, setFormValues] = useState([
    { id: "id", label: "Id", width: 100, value: "" },
    { id: "lastname", label: "Nom", width: 300, value: "" },
    { id: "firstname", label: "Prénom", width: 300, value: "" },
    { id: "level", label: "Grade", width: 300, value: "" },
    { id: "phoneNb", label: "Téléphone", width: 300, value: "" },
    { id: "email", label: "Email", width: 300, value: "" },
    { id: "password", label: "Mot de passe", width: 300, value: "" },
  ]);

  useEffect(() => {
    if (personToUpdate)
      setFormValues((formValues) => {
        return formValues.map((formValue) => {
          const newFormValue = {
            ...formValue,
            value: personToUpdate[formValue.id],
          };
          return newFormValue;
        });
      });
  }, []); // eslint-disable-line

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
              <Tooltip style={{ visibility: formValues[id] ? "hidden" : "" }}>
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
          <Button key={index} onClick={onClick} appearance={appearance}>
            {label}
          </Button>
        ))}
      </Modal.Footer>
    </Modal>
  );
};

export default AlterEmloyeeModal;
