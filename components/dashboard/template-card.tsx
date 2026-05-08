import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TemplateSeed } from "@/types";

export function TemplateCard({ template }: { template: TemplateSeed }) {
  return (
    <Card className="overflow-hidden">
      <div className="rounded-[22px] border border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-700 p-5 text-white">
        <p className="text-xs uppercase tracking-[0.25em] text-emerald-200">{template.category}</p>
        <h3 className="mt-4 text-xl font-semibold">{template.name}</h3>
        <p className="mt-2 text-sm text-slate-200">{template.previewLabel}</p>
      </div>
      <p className="mt-5 text-sm text-slate-600">{template.description}</p>
      <p className="mt-3 text-sm font-medium text-slate-900">{template.suggestedUseCase}</p>
      <Button href={`/dashboard/new?template=${template.id}`} className="mt-6 w-full">
        Use template
      </Button>
    </Card>
  );
}
