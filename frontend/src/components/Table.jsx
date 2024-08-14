import TableRow from "./TableRow";

export default function Table() {
  return (
    <div>
      <div className="hidden font-medium md:grid lg:grid-cols-table md:grid-cols-3 grid-cols-1 gap-3 md:gap-0 p-6 border-y">
        <p>Short Link</p>
        <p>Original Link</p>
        <p>QR Code</p>
        <p className="md:hidden lg:block">Clicks</p>
        <p className="md:hidden lg:block">Location</p>
        <p className="md:hidden lg:block">Date</p>
      </div>
      <div>
        {Array.from({ length: 4 }, (_, i) => (
          <TableRow key={i} />
        ))}
      </div>
    </div>
  );
}
