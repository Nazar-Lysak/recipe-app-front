import { type ReactNode } from "react";
import style from "./Tabs.module.scss";

interface Tab<T extends string> {
  value: T;
  label: ReactNode;
}

interface TabsProps<T extends string> {
  tabs: Tab<T>[];
  activeTab: T;
  onTabChange: (value: T) => void;
  className?: string;
}

const Tabs = <T extends string>({
  tabs,
  activeTab,
  onTabChange,
  className = "",
}: TabsProps<T>) => {
  const getActiveIndex = () => {
    return tabs.findIndex((tab) => tab.value === activeTab);
  };

  const tabWidth = 100 / tabs.length;
  const activeIndex = getActiveIndex();

  return (
    <div
      className={`${style.tabs} ${className}`}
      data-active={activeIndex}
      style={
        {
          "--tab-width": `${tabWidth}%`,
          "--active-index": activeIndex,
        } as React.CSSProperties
      }
    >
      {tabs.map((tab) => (
        <button
          key={tab.value}
          className={style.tab}
          onClick={() => onTabChange(tab.value)}
          data-active={tab.value === activeTab}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
