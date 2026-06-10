import type { IncidentStatus } from "../types/bmw";

type Props = {
  status: IncidentStatus;
};

const steps: IncidentStatus[] = [
  "Open",
  "Investigating",
  "CAPA Assigned",
  "Awaiting Closure",
  "Closed",
];

export function IncidentWorkflow({ status }: Props) {
  return (
    <div className="workflow-strip incident-workflow">
      {steps.map((step) => (
        <div
          key={step}
          className={`workflow-step ${status === step ? "active" : ""}`}
        >
          {step}
        </div>
      ))}
    </div>
  );
}