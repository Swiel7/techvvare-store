import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TProduct, TRatingCounts, TReviewWithAuthor } from "@/types";

type ProductTabsProps = {
  product: TProduct & { category: string };
  reviews: TReviewWithAuthor[];
  totalPages: number;
  totalReviews: number;
  ratingCounts: TRatingCounts;
};

const ProductTabs = ({
  product,
  reviews,
  totalPages,
  totalReviews,
  ratingCounts,
}: ProductTabsProps) => {
  console.log(product, reviews, totalPages, totalReviews, ratingCounts);

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
        <TabsTrigger value="reviews">Reviews ({totalReviews})</TabsTrigger>
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
      <TabsContent value="reviews">reviews</TabsContent>
    </Tabs>
  );
};

export default ProductTabs;
