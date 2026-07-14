import { useEffect, useRef, type PropsWithChildren } from 'react';
import styles from './Modal.module.scss';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export const Modal = ({
  isOpen,
  children,
  onClose,
  className,
}: PropsWithChildren<ModalProps>) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    Object.assign(dialog, { closedBy: 'any' });
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    void (isOpen ? dialog.showModal() : dialog.close());
  }, [isOpen]);

  return createPortal(
    <dialog
      className={`${styles.modal} ${className || ''}`}
      ref={dialogRef}
      onClose={onClose}
      onCancel={onClose}
    >
      {children}
    </dialog>,
    document.body
  );
};
