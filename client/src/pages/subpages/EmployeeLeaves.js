import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Alert, Button, Placeholder, Table, Tag } from "rsuite";
import axios from "axios";

import baseUrl from "../../utils/baseUrl";
import { getStatusColor, noFieldIsEmpty } from "../../utils/functions";
import AlterLeaveModal from "../../common/AlterLeaveModal";
import ConfirmationModal from "../../common/ConfirmationModal";

const { Column, HeaderCell, Cell } = Table;

const EmployeesMng = () => {
  const connectedUser = useSelector((store) => store.global.connectedUser);
  const [leaves, setLeaves] = useState(null);
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
        onClick: (savedLeave) => {
          if (noFieldIsEmpty(savedLeave)) {
            addLeave(savedLeave);
            setIsAddModalShown(false);
          } else {
            Alert.info("Tous les champs doivent être remplis.", 5000);
          }
        },
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
        onClick: (savedLeave) => {
          savedLeave._id = leaveToUpdate._id;
          if (noFieldIsEmpty(savedLeave)) {
            updateLeave(savedLeave);
            setIsUpdateModalShown(false);
          } else {
            Alert.info("Tous les champs doivent être remplis.", 5000);
          }
        },
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
    text: "Êtes-vous sûr de vouloir supprimer cette demande ?",
    btns: [
      {
        label: "Supprimer",
        appearance: "primary",
        color: "red",
        onClick: () => {
          deleteLeave(leaveToUpdate._id);
          setIsDeleteModalShown(false);
        },
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
    axios
      .get(`${baseUrl}/leaves/${connectedUser.id}`)
      .then((res) => {
        timer = setTimeout(() => {
          setLeaves(res.data.leaves);
        }, 500);
      })
      .catch((err) => {
        Alert.error("Erreur lors de la connexion au serveur.");
      });

    return () => {
      clearTimeout(timer);
    };
  }, []); // eslint-disable-line

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
        setLeaveToUpdate(leave);
        break;
      default:
        break;
    }
  };

  const addLeave = (savedLeave) => {
    axios
      .post(`${baseUrl}/leaves`, savedLeave)
      .then((res) => {
        Alert.success("Ajouté avec succès.", 5000);
        setLeaves((leaves) => [...leaves, res.data]);
      })
      .catch((err) => {
        Alert.error("Erreur lors de la connexion au serveur.");
      });
  };

  const updateLeave = (savedLeave) => {
    setLeaves((leaves) =>
      leaves.map((leave) => (leave._id === savedLeave._id ? savedLeave : leave))
    );

    axios
      .put(`${baseUrl}/leaves`, savedLeave)
      .then((res) => {
        Alert.success("Modifié avec succès.", 5000);
      })
      .catch((err) => {
        Alert.error("Erreur lors de la connexion au serveur.");
      });
  };

  const deleteLeave = (targetId) => {
    setLeaves((leaves) => {
      const newLeaves = leaves.filter(({ _id }) => _id !== targetId);
      axios
        .put(`${baseUrl}/leaves/delete`, { _id: targetId })
        .then((res) => {
          Alert.info("Congé supprimé avec succès.", 5000);
        })
        .catch((err) => {
          Alert.error("Erreur lors de la connexion au serveur.");
        });
      return newLeaves;
    });
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

      {leaves !== null ? (
        <Table
          autoHeight
          wordWrap
          height={90}
          data={leaves}
          renderEmpty={() => (
            <div
              style={{
                height: 45,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p>Aucune demande trouvée.</p>
            </div>
          )}
        >
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
                    {leave.status === "En cours de traitement" && (
                      <>
                        <a
                          onClick={() => handleAction("update", leave)}
                          style={{ cursor: "pointer" }}
                        >
                          {" "}
                          Modifier{" "}
                        </a>

                        <br />
                      </>
                    )}
                    <a
                      onClick={() => handleAction("delete", leave)}
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
