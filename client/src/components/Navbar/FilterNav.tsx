import React, { useState } from "react";
const type: string[] = [
  "Registered Users",
  "Creators",
  "Pending Reports",
  "Reported Posts",
];
interface Props {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  handleFilter: (filter: string) => void;
}
const FilterNav: React.FC<Props> = ({ search, setSearch, handleFilter }) => {
  const [filter, setFilter] = useState<string>(type[0]);
  const handleChange = (e: React.FormEvent) => {
    const target = e.target as HTMLSelectElement;
    setFilter(target.value.toLowerCase().replaceAll(" ", "-"));
  };
  return (
    <>
      <nav className="d-flex align-items-center flex-wrap justify-content-between container gap-3">
        <div className="d-flex align-items-center gap-3">
          <select
            onChange={handleChange}
            className="form-select btn-bg"
            name="type"
          >
            {type.map((item, idx) => {
              return (
                <option key={idx + item} value={item}>
                  {item}
                </option>
              );
            })}
          </select>

          <div
            onClick={() => handleFilter(filter)}
            className="btn btn-bg btn-rounded d-flex align-items-center justify-content-center"
          >
            <span className="material-symbols-outlined">filter_alt</span>
            <span>Filter</span>
          </div>
        </div>
        <div className="d-flex align-items-center gap-2">
          {filter === "pending-reports" || filter === "reported-posts" ? (
            ""
          ) : (
            <input
              type="search"
              placeholder="Search"
              value={search}
              onChange={(e: React.FormEvent) => {
                const target = e.target as HTMLInputElement;
                setSearch(target.value);
              }}
              className="form-control invert"
            />
          )}
          {/* <span
            onClick={() => handleSearch(search)}
            className="btn btn-rounded btn-bg d-flex align-items-center justify-content-center"
          >
            <span className="material-symbols-outlined search">search</span>
          </span> */}
        </div>
      </nav>
    </>
  );
};

export default FilterNav;
