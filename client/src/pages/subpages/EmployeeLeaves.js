import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Alert, Button, Placeholder, Table, Tag } from "rsuite";
import axios from "axios";

import baseUrl from "../../utils/baseUrl";
import { getStatusColor } from "../../utils/functions";
import AlterLeaveModal from "../../common/AlterLeaveModal";
import ConfirmationModal from "../../common/ConfirmationModal";

const { Column, HeaderCell, Cell } = Table;

const EmployeesMng = () => {
  const connectedUser = useSelector((store) => store.global.connectedUser);
  const [users, setUsers] = useState(null);
  const [isAddModalShown, setIsAddModalShown] = useState(false);
  const [isUpdateModalShown, setIsUpdateModalShown] = useState(false);
  const [isDeleteModalShown, setIsDeleteModalShown] = useState(false);
  const [leaveToUpdate, setLeaveToUpdate] = useState({});

  const addModalContent = {
    title: "Ajout d'une demande de congé",
    btns: [
      {
        label: "Ajouter",
        appearance: "primary",
        onClick: () => setIsAddModalShown(false),
      },
      {
        label: "Annuler",
        appearance: "subtle",
        onClick: () => setIsAddModalShown(false),
      },
    ],
    isShown: isAddModalShown,
    onClose: () => setIsAddModalShown(false),
  };

  const updateModalContent = {
    title: "Modification d'une demande de congé",
    btns: [
      {
        label: "Modifier",
        appearance: "primary",
        onClick: () => setIsUpdateModalShown(false),
      },
      {
        label: "Annuler",
        appearance: "subtle",
        onClick: () => setIsUpdateModalShown(false),
      },
    ],
    isShown: isUpdateModalShown,
    leaveToUpdate: leaveToUpdate,
    onClose: () => setIsUpdateModalShown(false),
  };

  const deleteModalContent = {
    text: "Êtes-vous sûr de vouloir supprimer cette demande de congé ?",
    btns: [
      {
        label: "Supprimer",
        appearance: "primary",
        color: "red",
        onClick: () => setIsDeleteModalShown(false),
      },
      {
        label: "Annuler",
        appearance: "subtle",
        onClick: () => setIsDeleteModalShown(false),
      },
    ],
    isShown: isDeleteModalShown,
    onClose: () => setIsDeleteModalShown(false),
  };

  useEffect(() => {
    let timer;
    console.log("BR1")
    console.log(connectedUser)
    axios
      .get(`${baseUrl}/leaves/${connectedUser.id}`)
      .then((res) => {
        timer = setTimeout(() => {
          setUsers(res.data.leaves);
        }, 500);
      })
      .catch((err) => {
        Alert.error("Erreur lors de la connexion au serveur.");
      });

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleAction = (action, leave) => {
    switch (action) {
      case "add":
        setIsAddModalShown(true);
        break;
      case "update":
        setIsUpdateModalShown(true);
        setLeaveToUpdate(leave);
        break;
      case "delete":
        setIsDeleteModalShown(true);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <h1 style={{ marginBottom: "2.5rem" }}>Liste des Congés</h1>

      <Button
        size="lg"
        style={{ marginBottom: "2.5rem" }}
        onClick={() => handleAction("add")}
      >
        Ajouter un congé
      </Button>

      {users !== null ? (
        <Table autoHeight wordWrap height={400} data={users}>
          <Column width={200}>
            <HeaderCell>Date départ</HeaderCell>
            <Cell dataKey="departureDate" />
          </Column>

          <Column width={200}>
            <HeaderCell>Date retour</HeaderCell>
            <Cell dataKey="returnDate" />
          </Column>

          <Column width={200}>
            <HeaderCell>État</HeaderCell>
            <Cell>
              {({ status }) => (
                <Tag color={getStatusColor(status)}>{status}</Tag>
              )}
            </Cell>
          </Column>

          <Column width={120} fixed="right">
            <HeaderCell>Action</HeaderCell>

            <Cell>
              {(leave) => {
                return (
                  <span>
                    <a
                      onClick={() => handleAction("update", leave)}
                      style={{ cursor: "pointer" }}
                    >
                      {" "}
                      Modifier{" "}
                    </a>
                    <br />
                    <a
                      onClick={() => handleAction("delete")}
                      style={{ cursor: "pointer" }}
                    >
                      {" "}
                      Supprimer{" "}
                    </a>
                  </span>
                );
              }}
            </Cell>
          </Column>
        </Table>
      ) : (
        <Placeholder.Grid rows={6} columns={4} active />
      )}

      {isAddModalShown && <AlterLeaveModal {...addModalContent} />}
      {isUpdateModalShown && <AlterLeaveModal {...updateModalContent} />}
      <ConfirmationModal {...deleteModalContent} />
    </>
  );
};

export default EmployeesMng;
