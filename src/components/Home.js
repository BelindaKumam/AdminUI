import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import EditUser from "./EditUser";
import { Box } from "@mui/system";
import TableComponent from "./TableComponent";
import { getUsers } from "./GetUsers/getUsers";
import Search from "./Search";
import PaginationComponent from "./PaginationComponent";


const tableHeaders = [
  { id: "name", label: "Name" },
  { id: "email", label: "Email" },
  { id: "role", label: "Role" },
  { id: "actions", label: "Actions" },
];

const userPerPage = 10;
const startPage = 1;

function Home() {
  const [searchText, setSearchText] = useState("");
  const [userToBeDisplayed, setUserToBeDisplayed] = useState([]);
  const [searchNotFound, setSearchNotFound] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selected, setSelected] = useState([]);
  const [users, setUsers] = useState([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectAllUser, setSelectAllUser] = useState(false);
  const [isEditUser, setIsEditUser] = useState(false);
  const [userEdit, setUserEdit] = useState(-1);

  // Get all the user
  useEffect(() => {
    getUsers()
      .then((data) => {
        setUsers(data);
        setFilteredUsers(data);
      })
      .catch((error) => console.log(error));
  }, []);

  

  // Delete Functionality
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = userToBeDisplayed.map((n) => n.name);
      setSelectAllUser(true);
      setSelected(newSelected);
      return;
    }
    setSelectAllUser(false);
    setSelected([]);
  };

  // delete by clicking icon
  const handleSingleUserDelete = (userId) => {
    const newData = users.filter((user) => user.id !== userId);
    setUsers(newData);
    setFilteredUsers(newData);
  };

  // delete user by delete button
  const handleSelectedDelete = (selected) => {
    const newData = users.filter((user) => !selected.includes(user.name));
    setUsers(newData);
    setFilteredUsers(newData);
  };

  // Select table row
  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  // Checking is row is selected or not
  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Edit Functionality
  const handleEdit = (userId) => {
    setIsEditUser(true);
    setUserEdit(userId);
  };

  // Save edit user Data
  const handleSaveEditData = (userId, userData) => {
    const newData = users.map((user) => {
      if (user.id === userId) {
        return {
          id: userId,
          name: userData.name,
          email: userData.email,
          role: userData.role,
        };
      } else {
        return user;
      }
    });
    console.log(newData);
    setUsers(newData);
    setFilteredUsers(newData);
    setIsEditUser(false);
    setUserEdit(-1);
  };

  // cancel editing
  const handleEditingCancel = () => {
    setIsEditUser(false);
    setUserEdit(-1);
  };

  

  return (
    <div className="AppContainer">
      <h3>Geektrust Assignment- Admin Dashboard</h3>
      <Box mb={2}>
        <Search searchText={searchText} setSearchText={setSearchText} users={users} setSearchNotFound={setSearchNotFound} setFilteredUsers={setFilteredUsers}></Search>
      </Box>
      {isEditUser && (
        <Box m={1}>
          <EditUser
            users={users}
            userId={userEdit}
            handleSubmit={handleSaveEditData}
            handleCancel={handleEditingCancel}
          />
        </Box>
      )}
      {searchNotFound ? (
        <Box>
          <p>No Results Found</p>
        </Box>
      ) : (
        <Box>
          <TableComponent
            headers={tableHeaders}
            users={userToBeDisplayed}
            handleSelectAllClick={handleSelectAllClick}
            handleClick={handleClick}
            isSelected={isSelected}
            selectAll={selectAllUser}
            handleEdit={handleEdit}
            handleDelete={handleSingleUserDelete}
          />
          <Box mt={2}>
            <Stack spacing={2} direction="row" justifyContent="space-between">
              <Button
                variant="contained"
                color="error"
                onClick={() => handleSelectedDelete(selected)}
              >
                Delete Selected
              </Button>
              <PaginationComponent count={count} setCount={setCount} filteredUsers={filteredUsers} userPerPage={userPerPage} setCurrentPage={setCurrentPage} startPage={startPage}
              setUserToBeDisplayed={setUserToBeDisplayed} setSelectAllUser={setSelectAllUser} setSelected={setSelected} currentPage={currentPage}></PaginationComponent>
            </Stack>
          </Box>
        </Box>
      )}
    </div>
  );
}

export default Home;
