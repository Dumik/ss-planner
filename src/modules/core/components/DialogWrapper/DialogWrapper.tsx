import { PropsWithChildren } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/core/ui';
import classNames from 'classnames';

type DialogWrapperProps = {
  openElement: React.ReactNode;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
} & PropsWithChildren;

const DialogWrapper = ({
  children,
  openElement,
  isOpen,
  onOpenChange,
  className,
}: DialogWrapperProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger className={classNames(className)}>{openElement}</DialogTrigger>
      <DialogContent>
        <DialogHeader>{children}</DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DialogWrapper;
