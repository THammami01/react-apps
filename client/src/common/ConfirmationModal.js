const { Modal, Icon, Button } = require("rsuite");

const ConfirmationModal = ({ text, isShown, btns, onClose }) => {
  return (
    <Modal backdrop="static" show={isShown} onHide={onClose} size="xs">
      <Modal.Body>
        <Icon
          icon="remind"
          style={{
            color: "#ffb300",
            fontSize: 24,
            marginRight: ".75rem",
          }}
        />
        {text}
      </Modal.Body>
      <Modal.Footer>
        {btns.map(({ label, appearance, color, onClick }, index) => (
          <Button
            key={index}
            onClick={onClick}
            appearance={appearance}
            color={color}
          >
            {label}
          </Button>
        ))}
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;
