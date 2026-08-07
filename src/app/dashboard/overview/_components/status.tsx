import { Card, CardContent } from '@/components/ui/card';

import { RiArrowRightLine } from 'react-icons/ri';
import Link from 'next/link';

export const Status = ({ title, value, href }: { title: string; value: string; href: string }) => {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-6">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>

          <h2 className="mt-1 text-3xl font-bold">{value}</h2>
        </div>
        <Link href={href}>
          <RiArrowRightLine className="text-3xl text-muted-foreground" />
        </Link>
      </CardContent>
    </Card>
  );
};
