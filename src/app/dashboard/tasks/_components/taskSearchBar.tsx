'use client';

import { RiSearchLine } from 'react-icons/ri';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { startTransition } from 'react';

export const TaskSearchBar = () => {
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      const current = searchParams.get('search') ?? '';
      if (current === search) return;

      const params = new URLSearchParams(searchParams);
      if (search) {
        params.set('search', search);
      } else {
        params.delete('search');
      }

      startTransition(() => {
        router.replace(`${pathName}?${params.toString()}`);
      });
    }, 1000);
    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <div className="relative w-full md:max-w-sm">
      <RiSearchLine className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />

      <Input
        placeholder="Pesquisar tarefas..."
        className="pl-9"
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};
