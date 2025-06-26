import NotFound from "@/components/ui/not-found";

const NotFoundPage = () => {
  return (
    <section className="flex min-h-[calc(100vh/1.5)] items-center justify-center">
      <div className="wrapper">
        <NotFound />
      </div>
    </section>
  );
};

export default NotFoundPage;
