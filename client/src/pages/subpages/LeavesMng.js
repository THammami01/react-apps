import { useEffect, useState } from "react";
import { Alert, Placeholder, Table, Tag } from "rsuite";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import { getStatusColor } from "../../utils/functions";
import ConfirmationModal from "../../common/ConfirmationModal";

const { Column, HeaderCell, Cell } = Table;

const LeavesMng = () => {
  const [leaves, setLeaves] = useState(null);
  const [isAcceptModalShown, setIsAcceptModalShown] = useState(false);
  const [isRefuseModalShown, setIsRefuseModalShown] = useState(false);

  const acceptModalContent = {
    text: "Êtes-vous sûr de vouloir accepter cette demande ?",
    btns: [
      {
        label: "Accepter",
        appearance: "primary",
        color: "green",
        onClick: () => setIsAcceptModalShown(false),
      },
      {
        label: "Annuler",
        appearance: "subtle",
        onClick: () => setIsAcceptModalShown(false),
      },
    ],
    isShown: isAcceptModalShown,
    onClose: () => setIsAcceptModalShown(false),
  };

  const refuseModalContent = {
    text: "Êtes-vous sûr de vouloir réfuser cette demande ?",
    btns: [
      {
        label: "Réfuser",
        appearance: "primary",
        color: "red",
        onClick: () => setIsRefuseModalShown(false),
      },
      {
        label: "Annuler",
        appearance: "subtle",
        onClick: () => setIsRefuseModalShown(false),
      },
    ],
    isShown: isRefuseModalShown,
    onClose: () => setIsRefuseModalShown(false),
  };

  const handleAction = (action) => {
    if (action === "accept") {
      setIsAcceptModalShown(true);
    } else if (action === "refuse") {
      setIsRefuseModalShown(true);
    }
  };

  useEffect(() => {
    let timer;
    axios
      .get(`${baseUrl}/leaves`)
      .then((res) => {
        timer = setTimeout(() => {
          setLeaves(res.data.leaves);
        }, 500);
      })
      .catch(() => {
        Alert.error("Erreur.");
      });

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <h1 style={{ marginBottom: "2.5rem" }}>Gestion des Congés</h1>

      {leaves !== null ? (
        <Table
          autoHeight
          wordWrap
          height={400}
          data={leaves}
        >
          <Column width={100} align="center" fixed>
            <HeaderCell>Id Employé</HeaderCell>
            <Cell dataKey="employeeId" />
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
            <HeaderCell>Date Départ</HeaderCell>
            <Cell dataKey="departureDate" />
          </Column>

          <Column width={200}>
            <HeaderCell>Date Retour</HeaderCell>
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
              {({ status }) => {
                return (
                  <span>
                    {status !== "Acceptée" && (
                      <a
                        onClick={() => handleAction("accept")}
                        style={{ cursor: "pointer" }}
                      >
                        {" "}
                        Accepter{" "}
                      </a>
                    )}

                    {status === "En cours de traitement" && <br />}

                    {status !== "Réfusée" && (
                      <a
                        onClick={() => handleAction("refuse")}
                        style={{ cursor: "pointer" }}
                      >
                        {" "}
                        Réfuser{" "}
                      </a>
                    )}
                  </span>
                );
              }}
            </Cell>
          </Column>
        </Table>
      ) : (
        <Placeholder.Grid rows={6} columns={4} active />
      )}

      <ConfirmationModal {...acceptModalContent} />
      <ConfirmationModal {...refuseModalContent} />
    </>
  );
};

export default LeavesMng;
