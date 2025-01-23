import Link from "next/link";
interface BreadcrumbProps {
  pageName: string;
}

const Breadcrumb = ({ pageName }: BreadcrumbProps) => {
  return (
    <div className="p-4 bg-white border rounded-lg mb-6 flex flex-col gap-3 lg:items-center sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-title-md2 font-semibold text-pg dark:text-white">
        {pageName}
      </h2>

      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link className="font-medium" href="/">
              Dashboard 
            </Link>
          </li>
          <li className="font-medium text-pandit">{pageName}</li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
