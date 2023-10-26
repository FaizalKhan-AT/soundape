import { FC, useEffect, useState, useRef, useMemo } from "react";
import Error from "../../components/Error/Error";
import Modal from "../../components/Modals/Modal";
import BrandNav from "../../components/Navbar/BrandNav";
import Spinner from "../../components/Spinners/Spinner";
import axios from "../../config";
import { handleOpenModal } from "../../utils/modalControls";
import FilterNav from "../../components/Navbar/FilterNav";
import { User } from "../../interfaces/User";
import AdminPostCard from "../../components/Cards/AdminPostCard";
import { Post } from "../../interfaces/Post";
import UserCard from "../../components/Cards/UserCard";
import NotFoundCard from "../../components/Error/NotFoundCard";

const Dashboard: FC = () => {
  const [error, setError] = useState<string>("");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [filterName, setFilterName] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  function fetchData(filter: string) {
    setFilterName(filter.toLocaleUpperCase().split("-")[1]);
    setLoading(true);
    setData([]);
    axios
      .get(`/admin/${filter}`)
      .then((res) => {
        const { status, error: err, data: d } = res.data;
        switch (status) {
          case "error":
            setError(err);
            break;
          case "ok":
            setData(d);
            break;
        }
        setLoading(false);
      })
      .catch((err) => {
        console.warn(err.response.data.error);
        setLoading(false);
      });
  }
  useEffect(() => {
    fetchData("registered-users");
  }, []);
  const modalRef = useRef<HTMLDialogElement>(null);
  const openModal = (e: any) => {
    setTitle(e.target.dataset.name as string);
    setId(e.target.dataset.id as string);

    handleOpenModal(modalRef);
  };

  let searchItems = useMemo(() => {
    return data.filter((d) => {
      if (d.username && d.username.toLowerCase().includes(search)) return d;
    });
  }, [data, search]);
  return (
    <>
      {error ? <Error setError={setError} error={error} /> : ""}
      <Modal id={id} title={title} modalRef={modalRef} />
      <BrandNav admin />
      <br />
      <FilterNav
        handleFilter={fetchData}
        search={search}
        setSearch={setSearch}
      />
      <br />
      <div className="container">
        {loading ? (
          <div className="my-2 text-center">
            <Spinner size="lg" />
          </div>
        ) : searchItems && searchItems.length > 0 ? (
          searchItems.map((item) => {
            return (
              <ItemCard
                filter={filterName}
                key={item._id}
                item={item}
                openModal={openModal}
              />
            );
          })
        ) : (
          <NotFoundCard />
        )}
      </div>
      <br />
    </>
  );
};
interface Props {
  filter: string;
  item: User | Post;
  openModal: (e: any) => void;
}
const ItemCard: FC<Props> = ({ filter, item, openModal }) => {
  return filter === "POSTS" || filter === "REPORTS" ? (
    <AdminPostCard item={item as Post} openModal={openModal} />
  ) : (
    <UserCard item={item as User} openModal={openModal} />
  );
};
export default Dashboard;
