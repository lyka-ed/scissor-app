export default function LinkComponent() {
  return (
    <div className="px-6 py-4 border-y overflow-hidden flex items-center justify-between">
      <div>
        <div>
          <p className="text-[#343446] leading-6 md:text-base text-sm">Company name</p>
          <a
            className="text-[#1B48DA] md:text-sm text-xs font-medium"
            href="http://"
            target="_blank"
            rel="noopener noreferrer"
          >
            sho.rt/CompanyName
          </a>
        </div>
      </div>
      <div className="items-center flex gap-3">
        <p className="text-[#343446] font-medium text-sm md:text-base">53 clicks</p>
        <button className="text-[9px] border border-[#1B48DA] text-[#1B48DA] rounded px-3 py-1">
          Copy URL
        </button>
      </div>
    </div>
  );
}
