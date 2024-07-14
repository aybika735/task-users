import React from 'react';
import {Route, Routes, Navigate} from "react-router-dom";
import UserEditForm from "../components/UserEditForm/UserEditForm"
import UsersList from "../components/UsersList/UsersList"
import UserAddForm from '../components/UserAddForm/UserAddForm';

const AppRouter = () => {
    return (
        <>
        <Routes>
    <Route path="/users/new" element={<UserAddForm/>}/>
      <Route path="/users/:id/edit" element={<UserEditForm />}/>
      <Route path="/users" element={<UsersList/>}/>
      <Route path="/"element={<Navigate to="/users" />} />
        </Routes>
        </>
    );
};
export default AppRouter


