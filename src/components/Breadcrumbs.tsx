import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  name: string;
  href: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-slate-500">
      <Link
        href="/"
        className="flex items-center gap-1 transition-colors hover:text-blue-600"
      >
        <Home className="h-4 w-4" />
        <span>Home</span>
      </Link>
      {items.map((item, idx) => (
        <div key={item.href} className="flex items-center gap-2">
          <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
          {idx === items.length - 1 ? (
            <span className="font-medium text-slate-900">{item.name}</span>
          ) : (
            <Link
              href={item.href}
              className="transition-colors hover:text-blue-600"
            >
              {item.name}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
