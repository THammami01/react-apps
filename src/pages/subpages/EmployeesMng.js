import { Table } from "rsuite";
import users from "../../utils/users";

const { Column, HeaderCell, Cell } = Table;

const EmployeesMng = () => {
  return (
    <>
      <h1 style={{ marginBottom: "3rem" }}>Gestion des Employés</h1>
      {/* <p>CONNECTED USER: {JSON.stringify(connectedUser)}</p> */}

      <Table
        autoHeight
        wordWrap
        height={400}
        data={users}
        onRowClick={(data) => {
          console.log(data);
        }}
      >
        <Column width={70} align="center" fixed>
          <HeaderCell>Id</HeaderCell>
          <Cell dataKey="id" />
        </Column>

        <Column width={200}>
          <HeaderCell>First Name</HeaderCell>
          <Cell dataKey="firstName" />
        </Column>

        <Column width={200}>
          <HeaderCell>Last Name</HeaderCell>
          <Cell dataKey="lastName" />
        </Column>

        <Column width={200}>
          <HeaderCell>City</HeaderCell>
          <Cell dataKey="city" />
        </Column>

        <Column width={200}>
          <HeaderCell>Street</HeaderCell>
          <Cell dataKey="street" />
        </Column>

        <Column width={300}>
          <HeaderCell>Company Name</HeaderCell>
          <Cell dataKey="companyName" />
        </Column>

        <Column width={300}>
          <HeaderCell>Email</HeaderCell>
          <Cell dataKey="email" />
        </Column>
        <Column width={120} fixed="right">
          <HeaderCell>Action</HeaderCell>

          <Cell>
            {(rowData) => {
              function handleAction() {
                alert(`id:${rowData.id}`);
              }
              return (
                <span>
                  <a onClick={handleAction} style={{cursor: "pointer"}}> Modifier </a><br/>
                  <a onClick={handleAction} style={{cursor: "pointer"}}> Supprimer </a>
                </span>
              );
            }}
          </Cell>
        </Column>
      </Table>
    </>
  );
};

export default EmployeesMng;
