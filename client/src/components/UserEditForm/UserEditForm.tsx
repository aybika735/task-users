import React, { useState, useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";
import "./UserEditForm.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { updateUser } from "../../app/api/userApi";
import { Users } from "../../app/types";

const EditEmployee: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((s) => s.users.userById);
  console.log(user);
  const isLoading = useAppSelector((s) => s.users.isLoading);
  const [values, setValues] = useState<Users>({
    id: 0,
    name: "",
    phone: "",
    birthday: "",
    role: "cook",
    isArchive: false,
  });

  useEffect(() => {
    if (user) {
      setValues(user);
    }
  }, [user]);

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateUser(values));
    setValues({
      id: 0,
      name: "",
      phone: "",
      birthday: "",
      role: "cook",
      isArchive: false,
    });
    navigate("/users");
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setValues({ ...values, [name]: checked });
    } else {
      setValues({ ...values, [name]: value });
    }
  };

  return isLoading ? (
    <div className="d-flex justify-content-center">
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  ) : (
    <div className="d-flex justify-content-center mt-3">
      <form onSubmit={submitForm} className="edit-employee-form">
        <div className="form-group">
          <label htmlFor="name" className="edit-employee-input">
            Имя:
            <input
              id="name"
              name="name"
              type="text"
              className="form-control"
              value={values.name}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="phone" className="edit-employee-input">
            Номер телефона:
            <InputMask
              mask="+7 (999) 999-9999"
              id="phone"
              name="phone"
              type="tel"
              className="form-control"
              value={values.phone}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="date" className="edit-employee-input">
            День рождения:
            <InputMask
              mask="99.99.9999"
              className="form-control"
              id="date"
              name="birthday"
              value={values.birthday}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="role">
            <select
              id="role"
              name="role"
              className="form-control"
              value={values.role}
              onChange={handleInputChange}
              required
            >
              <option value="cook">Повар</option>
              <option value="waiter">Официант</option>
              <option value="driver">Водитель</option>
            </select>
          </label>
        </div>
        <div className="form-group form-check">
          <input
            type="checkbox"
            name="isArchive"
            id="archive"
            className="form-check-input"
            checked={values.isArchive}
            onChange={handleInputChange}
          />
          <label htmlFor="archive" className="form-check-label">
            в архиве
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Обновить
        </button>
      </form>
    </div>
  );
};
export default EditEmployee;
