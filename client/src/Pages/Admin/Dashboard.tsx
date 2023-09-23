import { FC, useEffect, useState, useRef } from "react";
import ItemCard from "../../components/Cards/ItemCard";
import Error from "../../components/Error/Error";
import NotFound from "../../components/Error/NotFound";
import Modal from "../../components/Modals/Modal";
import BrandNav from "../../components/Navbar/BrandNav";
import Spinner from "../../components/Spinners/Spinner";
import axios from "../../config";
import { Card } from "../../interfaces/Dashboard";
import { handleOpenModal } from "../../utils/modalControls";

const Dashboard: FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  function fetchData() {
    axios
      .get("/admin/")
      .then((res) => {
        const { status, error: err, data } = res.data;
        switch (status) {
          case "error":
            setError(err);
            break;
          case "ok":
            setCards(data);
            break;
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response.data.error);
        setLoading(false);
      });
  }
  useEffect(() => {
    fetchData();
  }, []);
  const modalRef = useRef<HTMLDialogElement>(null);
  const openModal = (e: any) => {
    setTitle(e.target.dataset.name as string);
    handleOpenModal(modalRef);
  };
  return (
    <>
      {error ? <Error setError={setError} error={error} /> : ""}
      <BrandNav admin />
      <Modal id="" title={title} modalRef={modalRef} />
      <br />
      <br />
      <div className="container d-flex flex-wrap gap-4 align-items-center justify-content-center">
        {loading ? (
          <div className=" w-100 d-flex flex-column align-items-center justify-content-center ">
            <Spinner size="lg" />
            <span className="my-2">loading..</span>
          </div>
        ) : cards && cards.length > 0 ? (
          cards.map((card) => {
            return <ItemCard onClick={openModal} data={card} key={card.name} />;
          })
        ) : (
          <NotFound admin err="Dashboard" />
        )}
      </div>
    </>
  );
};

export default Dashboard;
