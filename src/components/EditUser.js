import { useState } from "react";
import { Button, TextField } from "@mui/material";
import Stack from "@mui/material/Stack";

export default function EditUser({
  users,
  userId,
  handleSubmit,
  handleCancel,
}) {
  // Storing user information in state variable
  const [userEditData, setUserEditData] = useState({
    name: getUserName(users, userId),
    email: getUserEmail(users, userId),
    role: getUserRole(users, userId),
  });

  // will return the username
  function getUserName(users, userId) {
    for (let i = 0; i < users.length; i++) {
      if (users[i].id === userId) {
        return users[i].name;
      }
    }
  }

  // will return the userEmail
  function getUserEmail(users, userId) {
    for (let i = 0; i < users.length; i++) {
      if (users[i].id === userId) {
        return users[i].email;
      }
    }
  }

  // will return the userRole
  function getUserRole(users, userId) {
    for (let i = 0; i < users.length; i++) {
      if (users[i].id === userId) {
        return users[i].role;
      }
    }
  }

  // replace the current data with new data
  const handleEditData = (event) => {
    setUserEditData({ ...userEditData, [event.target.name]: event.target.value });
  };

  return (
    <Stack spacing={2} direction="row">
      <TextField
        variant="outlined"
        size="small"
        label="Name"
        name="name"
        value={userEditData.name}
        onChange={handleEditData}
      />
      <TextField
        variant="outlined"
        size="small"
        label="Email"
        name="email"
        value={userEditData.email}
        onChange={handleEditData}
      />
      <TextField
        variant="outlined"
        size="small"
        label="Role"
        name="role"
        value={userEditData.role}
        onChange={handleEditData}
      />
      <Button
        variant="contained"
        size="small"
        onClick={() => handleSubmit(userId, userEditData)}
      >
        Save
      </Button>
      <Button variant="contained" size="small" onClick={handleCancel}>
        Cancel
      </Button>
    </Stack>
  );
}
