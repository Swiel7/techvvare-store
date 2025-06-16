import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="grid py-6">
      <Loader2 className="m-auto size-12 animate-spin" />
    </div>
  );
};

export default Loading;
