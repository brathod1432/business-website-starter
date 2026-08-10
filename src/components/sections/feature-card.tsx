import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Icon } from '@/lib/icons';
import { cn } from '@/lib/utils';

export type FeatureCardProps = {
  title: string;
  description: string;
  icon: string;
  className?: string;
};

export function FeatureCard({ title, description, icon, className }: FeatureCardProps) {
  return (
    <Card className={cn('h-full hover:shadow-elevated', className)}>
      <CardHeader>
        <span
          className="mb-2 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary"
          aria-hidden="true"
        >
          <Icon name={icon} className="h-5 w-5" />
        </span>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base leading-relaxed">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
