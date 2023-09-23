import { FC } from "react";
import { Props } from "./Modal";

const ModalHOC = (Modal: React.ComponentType<any>) => {
  return (props: Props) => {
    const { modalRef } = props;
    if (modalRef.current?.open) return <Modal {...props} />;
    else return <></>;
  };
};

export default ModalHOC;
