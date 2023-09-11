export const handleOpenModal = (ref: React.RefObject<HTMLDialogElement>) => {
  ref.current?.showModal();
};
export const handleCloseModal = (ref: React.RefObject<HTMLDialogElement>) => {
  ref.current?.close();
};
