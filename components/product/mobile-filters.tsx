import { Button } from "@/components/ui/button";
import {
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  Sheet,
} from "@/components/ui/sheet";
import { Settings2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TAvailableFilters } from "@/types";
import Filters from "@/components/product/filters";

const MobileFilters = ({ filters }: { filters: TAvailableFilters }) => {
  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button>
            <Settings2 /> Filter
          </Button>
        </SheetTrigger>
        <SheetContent className="w-80">
          <SheetHeader>
            <SheetTitle>Filter</SheetTitle>
          </SheetHeader>
          <ScrollArea className="min-h-0 px-4">
            <Filters filters={filters} />
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileFilters;
