import { CardHeader, CardTitle } from "./card";

type FormHeaderProps = {
  title: string;
};

export default function FormHeader({ title }: FormHeaderProps) {
  return (
    <CardHeader>
      <CardTitle className="text-center text-xl font-bold">
        {title}
      </CardTitle>
    </CardHeader>
  );
}
