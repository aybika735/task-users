import React, { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/hooks";
import { filterRole } from "../../app/slices/UsersSlice";

const FilterRole: React.FC = () => {
  const dispatch = useAppDispatch();
  const [role, setRole] = useState<string>(() => {
    return localStorage.getItem("selectedRole") || "all";
  });

  useEffect(() => {
    dispatch(filterRole(role));
  }, [dispatch, role]);

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    localStorage.setItem("selectedRole", value);
    dispatch(filterRole(value));
    setRole(value);
  };

  return (
    <div className="col-sm-4 col-lg-2 offset-lg-1">
      <select
        className="custom-select"
        value={role}
        onChange={handleSelectChange}
      >
        <option value="all">all</option>
        <option value="driver">driver</option>
        <option value="waiter">waiter</option>
        <option value="cook">cook</option>
      </select>
    </div>
  );
};

export default FilterRole;
