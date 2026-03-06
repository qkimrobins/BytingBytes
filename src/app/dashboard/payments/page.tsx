import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Hobby',
    price: '₹0',
    period: '/ month',
    description: 'For individuals and small projects getting started.',
    features: [
      'Up to 5 team members',
      'Basic task management',
      'AI Idea Validation (3 credits/mo)',
      'Community support',
    ],
    cta: 'Get Started',
    variant: 'secondary',
  },
  {
    name: 'Pro',
    price: '₹1,500',
    period: '/ month',
    description: 'For growing startups that need more power and collaboration.',
    features: [
      'Up to 20 team members',
      'Advanced task & project management',
      'Unlimited AI Insights & Pitch Generation',
      'Priority email support',
      'Advanced analytics',
    ],
    cta: 'Upgrade to Pro',
    variant: 'default',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For large teams requiring advanced security and dedicated support.',
    features: [
      'Unlimited team members',
      'Custom roles & permissions',
      'Dedicated account manager',
      'On-premise deployment option',
      '24/7 priority support',
    ],
    cta: 'Contact Sales',
    variant: 'outline',
  },
];

export default function PaymentsPage() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline">Choose Your Plan</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Select the perfect plan to help your startup grow.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <Card key={plan.name} className={`flex flex-col ${plan.name === 'Pro' ? 'border-primary ring-2 ring-primary' : ''}`}>
            <CardHeader>
              <CardTitle className="font-headline">{plan.name}</CardTitle>
              <div className="flex items-baseline">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
              </div>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-chart-1 mr-2 shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant={plan.variant as any}>
                {plan.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
