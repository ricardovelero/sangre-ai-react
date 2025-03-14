type PageHeaderProps = {
  title: string;
};

export default function PageHeader({ title }: PageHeaderProps) {
  return (
    <header className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-10'>
      <h1 className='text-3xl font-bold tracking-tight text-gray-900'>
        {title}
      </h1>
    </header>
  );
}
