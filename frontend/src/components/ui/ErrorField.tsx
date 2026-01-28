type ErrorFieldProps = {
  error?: string | null;
};

export default function ErrorField({ error }: ErrorFieldProps) {
  return <>{error && <p className="text-red-400 text-sm">{error}</p>}</>;
}
