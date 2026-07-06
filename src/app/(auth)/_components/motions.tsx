'use client';

import { motion } from 'motion/react';

export const FormError = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.p
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      className="text-sm text-destructive"
    >
      {children}
    </motion.p>
  );
};
