import React from "react";
import PropTypes, { Validator } from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { fetchUserById } from "../../app/api/userApi";
import { Users } from "../../app/types";
import { useAppDispatch } from "../../hooks/hooks";

interface UsersListItemProps {
  users: Users;
}
const UserListItem: React.FC<UsersListItemProps> = ({ users }) => {
  const dispatch = useAppDispatch();
  const { name, phone, birthday, id } = users;

  const navigate = useNavigate();

  const editPage = (id: number) => {
    dispatch(fetchUserById(id));
    navigate(`/users/${id}/edit`);
  };

  return (
    <div className="row">
      <Link
        to={`/users/${id}/edit`}
        onClick={() => editPage(id)}
        role="button"
        tabIndex={0}
        aria-pressed="false"
        className="col text-center"
      >
        {name}
      </Link>
      <div className="col text-center">{phone}</div>
      <div className="col text-center">{birthday}</div>
    </div>
  );
};

UserListItem.propTypes = {
  users: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    phone: PropTypes.string,
    birthday: PropTypes.string,
    role: PropTypes.string,
    isArchive: PropTypes.bool,
  }) as Validator<Users>,
};
export default UserListItem;
