import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MVP - Demo Product",
  description: "Mediclear's Demo Product Page",
  // other metadata
};

const DemoPage = () => {
  return (
    <section className="overflow-hidden pb-25 pt-45 lg:pb-32.5 lg:pt-50 xl:pb-37.5 xl:pt-55">
      {/* <div className="animate_top mx-auto max-w-[518px] text-center"> */}
      <div className="animate_top mx-auto max-w-[1000px] text-center">
        <h2 className="mb-5 text-2xl font-semibold text-black dark:text-white md:text-4xl">
          Product Demo
        </h2>
        <p className="mb-7.5">
          Generate ICD-10-CM codes by entering a clinical note or a description of a diagnosis.
        </p>

        <div className="mb-7.5">
          <textarea
            id="personalized-input"
            name="personalized-input"
            className="block w-full rounded-md border border-gray-300 p-2 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white resize-y"
            placeholder="Type here..."
            rows={4}
          ></textarea>
        </div>

        <a
          href="/"
          className="inline-flex items-center gap-2.5 rounded-full bg-black px-6 py-3 font-medium text-white duration-300 ease-in-out hover:bg-blackho dark:bg-btndark dark:hover:bg-blackho"
        >
          Generate Code
        </a>
      </div>
    </section>
  );
};

export default DemoPage;
