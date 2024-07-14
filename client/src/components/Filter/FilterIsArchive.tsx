import React, { useState, useEffect, ChangeEvent } from "react";
import { filterIsArchive } from "../../app/slices/UsersSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

const FilterIsArchive: React.FC = () => {
  const dispatch = useAppDispatch();
  const handleSelectChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    dispatch(filterIsArchive(checked));
  };
  const check = useAppSelector((s) => s.users.filterIsArchive);
  const [value, setValue] = useState(check);
  useEffect(() => {
    setValue(check);
  }, [check]);

  return (
    <div className="col-sm-3 col-lg-2 d-flex justify-content-center align-items-center">
      <div className="form-group">
        <div className="form-check">
          <input
            type="checkbox"
            name="isArchive"
            id="archive"
            checked={value}
            onChange={handleSelectChange}
            className="form-check-input"
          />
          <label htmlFor="archive" className="form-check-label">
            в архиве
          </label>
        </div>
      </div>
    </div>
  );
};

export default FilterIsArchive;
