"use client";

import { usePathname } from "next/navigation";

const MENU_ITEMS = [
  { label: "자막 다운로드", href: "/" },
  { label: "최근 기록", href: "/history" },
  { label: "사용 방법", href: "/how-to-use" },
  { label: "자주 묻는 질문", href: "/faq" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-[264px] shrink-0 border-r border-(--color-border) bg-(--color-surface) px-4 py-6 lg:block">
      <p className="px-3 pb-2 text-xs font-semibold tracking-[0.03em] text-(--color-text-secondary)">
        메뉴
      </p>
      <nav className="flex flex-col gap-1">
        {MENU_ITEMS.map((item) => {
          const active = pathname === item.href;
          return (
            <a
              key={item.href}
              href={item.href}
              className={`flex h-11 items-center rounded-[10px] px-3 text-base ${
                active
                  ? "bg-(--color-primary-soft) font-semibold text-(--color-primary)"
                  : "text-(--color-text)"
              }`}
            >
              {item.label}
            </a>
          );
        })}
      </nav>
    </aside>
  );
}
