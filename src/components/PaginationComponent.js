import { Pagination } from "@mui/material";
import React, { useEffect } from "react";

const PaginationComponent = ({
  count,
  setCount,
  filteredUsers,
  userPerPage,
  setCurrentPage,
  startPage,
  setUserToBeDisplayed,
  setSelectAllUser,
  setSelected,
  currentPage,
}) => {
  // Pagination
  useEffect(() => {
    setCount(Math.ceil(filteredUsers.length / userPerPage));
    setCurrentPage(startPage);
    setUserToBeDisplayed(prepareUserToBeDisplayed(filteredUsers, startPage));
  }, [filteredUsers]);

  // will return new user based on the page
  const prepareUserToBeDisplayed = (userList, pageNumber) => {
    setSelectAllUser(false);
    setSelected([]);
    const endIndex = pageNumber * userPerPage;
    const startIndex = endIndex - userPerPage;
    return userList.slice(startIndex, endIndex);
  };

  // will show diff pages based on page number
  const handlePage = (event, value, userList) => {
    setCurrentPage(value);
    setSelectAllUser(false);
    setUserToBeDisplayed(prepareUserToBeDisplayed(userList, value));
  };
  return (
    <>
      <Pagination
        count={count}
        showFirstButton
        showLastButton
        onChange={(event, value) => handlePage(event, value, filteredUsers)}
        page={currentPage}
      />
    </>
  );
};

export default PaginationComponent;
