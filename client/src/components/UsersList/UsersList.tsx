import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  toggleSortBirthday,
  toggleSortName,
} from "../../app/slices/UsersSlice";
import { fetchUsers } from "../../app/api/userApi";
import { Users } from "../../app/types";
import FilterRole from "../Filter/FilterRole";
import FilterIsArchive from "../Filter/FilterIsArchive";
import UserListItem from "../UserListItem/UserListItem";
import "./UserList.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

const UsersList: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const employeesState = useAppSelector((state) => state.users);
  const [NewEmployees, setNewEmployees] = useState<Users[]>(
    employeesState.users
  );

  console.log(employeesState);
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  const { filterRole, filterIsArchive, sortName, sortBirthday, isLoading } =
    employeesState;

  useEffect(() => {
    const filterEmployees = (
      employees: Users[] | null | undefined,
      role: string,
      isArchive: boolean
    ) => {
      return employees?.filter(
        (e) => (e.role === role || role === "all") && e.isArchive === isArchive
      );
    };

    let employees = filterEmployees(
      employeesState.users,
      filterRole,
      filterIsArchive
    );
    const sortByName = (employees: Users[]) => {
      return employees.sort((a, b) => (a.name > b.name ? 1 : -1));
    };

    const sortByBirthday = (employees: Users[]) => {
      return employees.sort((a, b) => {
        const dateA = new Date(a.birthday.split(".").reverse().join("-"));
        const dateB = new Date(b.birthday.split(".").reverse().join("-"));
        return dateA.getTime() - dateB.getTime();
      });
    };
    if (sortName) {
      employees = sortByName(employees);
      if (sortBirthday) {
        dispatch(toggleSortBirthday());
      }
    }

    if (sortBirthday) {
      employees = sortByBirthday(employees);
      if (sortName) {
        dispatch(toggleSortName());
      }
    }
    setNewEmployees(employees);
  }, [
    employeesState.users,
    filterRole,
    filterIsArchive,
    sortName,
    sortBirthday,
    dispatch,
  ]);

  const elements = NewEmployees?.map((item: Users) => (
    <li key={item.id} className="list-group-item">
      <UserListItem users={item} />
    </li>
  ));

  return isLoading ? (
    <div className="d-flex justify-content-center">
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  ) : (
    <>
      <div className="row mt-3">
        <div className="col-sm-5 offset-lg-2 col-lg-3">
          <span>Сортировать по:</span>
          <div className="d-flex mt-4">
            <button
              type="button"
              className="btn btn-outline-success mx-2"
              onClick={() => dispatch(toggleSortName())}
            >
              имени
            </button>
            <button
              type="button"
              className="btn btn-outline-success mx-2"
              onClick={() => dispatch(toggleSortBirthday())}
            >
              дате
            </button>
          </div>
        </div>
        <FilterRole />
        <FilterIsArchive />
      </div>
      <hr className="col-11 col-lg-8" />
      <div className="row">
        <ul className="col-12 offset-lg-2 col-lg-8 list-group">{elements}</ul>
      </div>
      <button
        type="button"
        className="btn btn-success offset-lg-2 mt-2"
        onClick={() => navigate("/users/new")}
      >
        Добавить
      </button>
    </>
  );
};
export default UsersList;
