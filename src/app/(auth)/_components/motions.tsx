'use client';

import { motion, AnimatePresence } from 'motion/react';

export const FormInit = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: 'easeOut',
      }}
    >
      {children}
    </motion.div>
  );
};

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
