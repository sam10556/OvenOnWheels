export default function SectionHeaders({ subHeader, mainHeader }) {
  return (
    <>
      <div className="m-8">
        <h3 className="uppercase text-gray-600 text-xl md:text-2xl font-semibold leading-4 ">
          {subHeader}
        </h3>
        <h2 className="text-primary font-bold text-3xl md:text-5xl italic font-hlo p-1">
          {mainHeader}
        </h2>
      </div>
    </>
  );
}
