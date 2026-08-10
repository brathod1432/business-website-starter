import {
  ArrowRight,
  BarChart3,
  Briefcase,
  Building2,
  CheckCircle2,
  Cloud,
  Code2,
  Compass,
  CreditCard,
  Gauge,
  HeartPulse,
  Layers,
  LifeBuoy,
  LineChart,
  type LucideIcon,
  type LucideProps,
  Megaphone,
  Palette,
  Rocket,
  Scale,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Truck,
  Users,
  Workflow,
} from 'lucide-react';

/**
 * Central icon registry so content (mock data or future CMS) can reference
 * icons by string name while keeping the bundle tree-shakeable.
 */
export const iconMap = {
  arrowRight: ArrowRight,
  barChart: BarChart3,
  briefcase: Briefcase,
  building: Building2,
  check: CheckCircle2,
  cloud: Cloud,
  code: Code2,
  compass: Compass,
  creditCard: CreditCard,
  gauge: Gauge,
  health: HeartPulse,
  layers: Layers,
  support: LifeBuoy,
  lineChart: LineChart,
  megaphone: Megaphone,
  palette: Palette,
  rocket: Rocket,
  scale: Scale,
  search: Search,
  shield: ShieldCheck,
  sparkles: Sparkles,
  target: Target,
  truck: Truck,
  users: Users,
  workflow: Workflow,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof iconMap;

export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const Cmp = iconMap[name as IconName] ?? Sparkles;
  return <Cmp {...props} />;
}
