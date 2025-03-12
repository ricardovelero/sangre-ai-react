import { Button } from "@/components/ui/button";

export default function PageNotFound() {
  return (
    <main className='grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8'>
      <div className='text-center'>
        <p className='text-base font-semibold text-indigo-600'>404</p>
        <h1 className='mt-4 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl'>
          Page not found
        </h1>
        <p className='mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8'>
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className='mt-10 flex items-center justify-center gap-x-6'>
          <Button onClick={() => window.history.back()}>Go back home</Button>
          <Button
            variant={"outline"}
            onClick={() => (window.location.href = "/contact")}
          >
            Contact support <span aria-hidden='true'>&rarr;</span>
          </Button>
        </div>
      </div>
    </main>
  );
}
