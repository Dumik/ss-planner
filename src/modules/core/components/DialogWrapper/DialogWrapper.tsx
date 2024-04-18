import { PropsWithChildren } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/core/ui';

type DialogWrapperProps = {
  openElement: React.ReactNode;
} & PropsWithChildren;

const DialogWrapper = ({ children, openElement }: DialogWrapperProps) => {
  return (
    <Dialog>
      <DialogTrigger>{openElement}</DialogTrigger>
      <DialogContent>
        <DialogHeader>{children}</DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DialogWrapper;
