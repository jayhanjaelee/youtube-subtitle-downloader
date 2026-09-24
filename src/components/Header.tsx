import { MenuIcon } from "./icons";

export function Header({ onMenuClick }: { onMenuClick?: () => void }) {
  return (
    <header className="flex h-[45px] items-center gap-2 border-b border-(--color-border) bg-(--color-surface) pr-2 pl-1 lg:h-[72px] lg:gap-3 lg:px-8">
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="메뉴 열기"
        className="flex size-11 items-center justify-center rounded-[10px] text-(--color-text) lg:hidden"
      >
        <MenuIcon className="size-[22px]" />
      </button>
      <div className="flex size-8 items-center justify-center rounded-lg bg-(--color-primary) text-[10px] font-bold tracking-wide text-white lg:size-10 lg:rounded-[10px] lg:text-[11px]">
        LOGO
      </div>
      <h1 className="text-[17px] font-bold tracking-tight text-(--color-text) lg:text-xl">
        자막 다운로더
      </h1>
    </header>
  );
}
