import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Fragment } from "react";

export type TBreadcrumbItem = { label: string; href?: string };

const SectionBreadcrumb = ({ items }: { items: TBreadcrumbItem[] }) => {
  return (
    <Breadcrumb className="pt-4 pb-8 lg:pt-8 [&_+_section]:!pt-0">
      <div className="wrapper">
        <BreadcrumbList>
          {items.map(({ label, href }, index) => (
            <Fragment key={index}>
              <BreadcrumbItem>
                {href ? (
                  <BreadcrumbLink asChild>
                    <Link href={href} className="capitalize">
                      {label}
                    </Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{label}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {index < items.length - 1 && <BreadcrumbSeparator />}
            </Fragment>
          ))}
        </BreadcrumbList>
      </div>
    </Breadcrumb>
  );
};

export default SectionBreadcrumb;
