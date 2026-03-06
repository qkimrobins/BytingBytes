import { PitchGeneratorForm } from '@/components/dashboard/pitch-generator-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function PitchGeneratorPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Investor Pitch Generator</CardTitle>
          <CardDescription>
            Auto-generate a compelling pitch outline using your startup data. Highlight your problem, solution, traction, and roadmap.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PitchGeneratorForm />
        </CardContent>
      </Card>
    </div>
  );
}
