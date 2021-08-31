import { useEffect, useState } from "react";
import { Alert, Button, Placeholder, Table } from "rsuite";
import axios from "axios";

import baseUrl from "../../utils/baseUrl";
import AlterEmployeeModal from "../../common/AlterEmployeeModal";
import ConfirmationModal from "../../common/ConfirmationModal";

const { Column, HeaderCell, Cell } = Table;

const EmployeesMng = () => {
  const [users, setUsers] = useState(null);
  const [isAddModalShown, setIsAddModalShown] = useState(false);
  const [isUpdateModalShown, setIsUpdateModalShown] = useState(false);
  const [isDeleteModalShown, setIsDeleteModalShown] = useState(false);
  const [personToUpdate, setPersonToUpdate] = useState({});

  const addModalContent = {
    title: "Ajout d'un employé",
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
    title: "Modification des details d'un employé",
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
    personToUpdate: personToUpdate,
    onClose: () => setIsUpdateModalShown(false),
  };

  const deleteModalContent = {
    text: "Êtes-vous sûr de vouloir supprimer cet employé ?",
    btns: [
      {
        label: "Supprimer",
        appearance: "primary",
        color: "red",
        onClick: () => {
          deleteEmployee(personToUpdate._id);
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
      .get(`${baseUrl}/employees`)
      .then((res) => {
        timer = setTimeout(() => {
          setUsers(res.data.employees);
        }, 500);
      })
      .catch((err) => {
        Alert.error("Erreur lors de la connexion au serveur.");
      });

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const deleteEmployee = (targetPerson) => {
    setUsers((users) => {
      const newUsers = users.filter(({ _id }) => _id !== targetPerson);
      axios
        .put(`${baseUrl}/employees/delete`, { _id: targetPerson })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          Alert.error("Erreur lors de la connexion au serveur.");
        });
      return newUsers;
    });
  };

  const handleAction = (action, person) => {
    switch (action) {
      case "add":
        setIsAddModalShown(true);
        break;
      case "update":
        setIsUpdateModalShown(true);
        setPersonToUpdate(person);
        break;
      case "delete":
        setIsDeleteModalShown(true);
        setPersonToUpdate(person);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <h1 style={{ marginBottom: "2.5rem" }}>Gestion des Employés</h1>
      {/* <p>CONNECTED USER: {JSON.stringify(connectedUser)}</p> */}

      <Button
        size="lg"
        style={{ marginBottom: "2.5rem" }}
        onClick={() => handleAction("add")}
      >
        Ajouter un employé
      </Button>

      {users !== null ? (
        <Table
          autoHeight
          wordWrap
          height={90}
          data={users}
          renderEmpty={() => (
            <div
              style={{
                height: 45,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p>Aucun employé trouvé.</p>
            </div>
          )}
        >
          <Column width={100} align="center" fixed>
            <HeaderCell>Id</HeaderCell>
            <Cell dataKey="id" />
          </Column>

          <Column width={200}>
            <HeaderCell>Nom</HeaderCell>
            <Cell dataKey="lastname" />
          </Column>

          <Column width={200}>
            <HeaderCell>Prénom</HeaderCell>
            <Cell dataKey="firstname" />
          </Column>

          <Column width={200}>
            <HeaderCell>Grade</HeaderCell>
            <Cell dataKey="level" />
          </Column>

          <Column width={200}>
            <HeaderCell>Téléphone</HeaderCell>
            <Cell dataKey="phoneNb" />
          </Column>

          <Column width={300}>
            <HeaderCell>Email</HeaderCell>
            <Cell dataKey="email" />
          </Column>

          <Column width={200}>
            <HeaderCell>Mot de passe</HeaderCell>
            <Cell dataKey="password" />
          </Column>

          <Column width={120} fixed="right">
            <HeaderCell>Action</HeaderCell>

            <Cell>
              {(person) => {
                return (
                  <span>
                    <a
                      onClick={() => handleAction("update", person)}
                      style={{ cursor: "pointer" }}
                    >
                      {" "}
                      Modifier{" "}
                    </a>
                    <br />
                    <a
                      onClick={() => handleAction("delete", person)}
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

      {isAddModalShown && <AlterEmployeeModal {...addModalContent} />}
      {isUpdateModalShown && <AlterEmployeeModal {...updateModalContent} />}
      <ConfirmationModal {...deleteModalContent} />
    </>
  );
};

export default EmployeesMng;
