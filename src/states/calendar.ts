import { RiCheckboxCircleLine, RiLoader4Line, RiTimeLine } from 'react-icons/ri';

export const priorityStyles = {
  LOW: {
    dot: 'bg-emerald-500',
    text: 'text-emerald-500',
    label: 'Baixa',
  },
  MEDIUM: {
    dot: 'bg-yellow-500',
    text: 'text-yellow-500',
    label: 'Média',
  },
  HIGH: {
    dot: 'bg-red-500',
    text: 'text-red-500',
    label: 'Alta',
  },
};

export const statusStyles = {
  TODO: {
    label: 'A fazer',
    icon: RiTimeLine,
  },
  IN_PROGRESS: {
    label: 'Em andamento',
    icon: RiLoader4Line,
  },
  DONE: {
    label: 'Concluída',
    icon: RiCheckboxCircleLine,
  },
};
