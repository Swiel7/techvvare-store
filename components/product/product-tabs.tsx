import ProductReviews from "@/components/product/product-reviews";
import Loading from "@/components/ui/loading";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TProduct } from "@/types";
import { Suspense } from "react";

const ProductTabs = ({
  product,
  page,
}: {
  product: TProduct & { category: string };
  page: string;
}) => {
  const tableData = [
    { title: "Brand", value: product.brand },
    { title: "Model", value: product.model },
    { title: "Category", value: product.category },
    {
      title: "Color",
      value: product.variants.map(({ colorName }) => colorName).join(",  "),
    },
    { title: "Dimensions", value: product.dimensions },
    { title: "Weight", value: product.weight + " g" },
  ];

  return (
    <Tabs defaultValue="description">
      <TabsList>
        <TabsTrigger value="description">Description</TabsTrigger>
        <TabsTrigger value="specification">Specification</TabsTrigger>
        <TabsTrigger value="reviews">
          Reviews ({product.numReviews})
        </TabsTrigger>
      </TabsList>
      <TabsContent value="description">
        <p>{product.description}</p>
      </TabsContent>
      <TabsContent value="specification">
        <Table>
          <TableBody>
            {tableData.map(({ title, value }) => (
              <TableRow key={title} className="hover:bg-background text-base">
                <TableCell className="text-muted-foreground">{title}</TableCell>
                <TableCell className="font-medium">{value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TabsContent>
      <TabsContent value="reviews">
        <Suspense fallback={<Loading />}>
          <ProductReviews product={product} page={page} />
        </Suspense>
      </TabsContent>
    </Tabs>
  );
};

export default ProductTabs;
