import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";
import { useAppDispatch } from "../../hooks/hooks";
import { addUser } from "../../app/api/userApi";
import { Users } from "../../app/types";
import "./UserAddForm.scss";

const UserAddForm: React.FC = () => {
  const [values, setValues] = useState<Users>({
    id: 0,
    name: "",
    phone: "",
    birthday: "",
    role: "cook",
    isArchive: false,
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addUser(values));

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
    const { name, value, checked } = e.target as HTMLInputElement;

    if (name === "isArchive") {
      setValues({ ...values, [name]: checked });
    } else {
      setValues({ ...values, [name]: value });
    }
  };

  return (
    <div className="d-flex justify-content-center mt-3">
      <form onSubmit={submitForm} className="new-employee-form">
        <div className="form-group">
          <label htmlFor="name" className="new-employee-input">
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
          <label htmlFor="phone" className="new-employee-input">
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
          <label htmlFor="date" className="new-employee-input">
            День рождения:
            <InputMask
              mask="99.99.9999"
              id="date"
              name="birthday"
              className="form-control"
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
          Добавить
        </button>
      </form>
    </div>
  );
};
export default UserAddForm;
