export function Footer() {
  return (
    <footer className="flex flex-col gap-1.5 bg-(--color-bg-footer) px-4 pt-5 pb-7 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:py-0 lg:h-[72px]">
      <div className="flex flex-col gap-1.5 lg:flex-row lg:items-center lg:gap-6">
        <p className="text-[13px] font-semibold text-(--color-text) lg:font-normal lg:text-(--color-text-secondary)">
          자막 다운로더
        </p>
        <p className="text-[13px] text-(--color-text-secondary)">
          © {new Date().getFullYear()} 자막 다운로더. All rights reserved.
        </p>
      </div>
      <div className="flex gap-4 lg:gap-5">
        <a
          href="/terms"
          className="text-[13px] text-(--color-primary) underline underline-offset-2"
        >
          이용약관
        </a>
        <a
          href="/privacy"
          className="text-[13px] text-(--color-primary) underline underline-offset-2"
        >
          개인정보처리방침
        </a>
      </div>
    </footer>
  );
}
