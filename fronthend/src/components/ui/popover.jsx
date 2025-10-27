import React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';

export const Popover = ({ children, ...props }) => (
  <PopoverPrimitive.Root {...props}>{children}</PopoverPrimitive.Root>
);

export const PopoverTrigger = ({ children, ...props }) => (
  <PopoverPrimitive.Trigger {...props}>{children}</PopoverPrimitive.Trigger>
);

export const PopoverContent = ({ children, className = '', ...props }) => (
  <PopoverPrimitive.Content className={className} {...props}>
    {children}
    <PopoverPrimitive.Arrow />
  </PopoverPrimitive.Content>
);

export default Popover;
