'use client';

import { motion } from 'motion/react';
import { FieldDescription } from '@/components/ui/field';

export const FadeIn = ({ children }: { children: React.ReactNode }) => {
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
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{
        duration: 0.2,
      }}
    >
      <FieldDescription className="text-destructive">{children}</FieldDescription>
    </motion.div>
  );
};
