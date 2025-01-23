import Link from "next/link";

interface BreadcrumbProps {
  pageName: string;
}

const Breadcrumb = ({ pageName }: BreadcrumbProps) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between bg-white p-5 rounded-lg ">
      <h2 className="text-[26px] font-bold leading-[30px] text-pg dark:text-white">
        {pageName}
      </h2>

      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link className="font-medium" href="/pandit">
              User/dashboard/
            </Link>
          </li>
          <li className="font-medium text-pg">{pageName}</li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
