import { AnimatePresence, motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { useSession } from "../../context/useSession";

import style from "./ChatPage.module.scss";
import Tabs from "../../shared/ui/tabs/Tabs";
import { useState } from "react";
import PagePrealoader from "../../shared/ui/page-prealoader/PagePrealoader";
import ChatItem from "../../shared/components/chat-item/ChatItem";

const tabContentVariants = {
  initial: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 100 : -100,
  }),
  animate: {
    opacity: 1,
    x: 0,
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -100 : 100,
  }),
};

const tabContentTransition = {
  duration: 0.3,
};

const tabContentAnimation = {
  variants: tabContentVariants,
  initial: "initial" as const,
  animate: "animate" as const,
  exit: "exit" as const,
  transition: tabContentTransition,
};

type TabType = "Chats" | "Users";

const ChatPage = () => {
  const { token } = useSession();
  const [searchParams, setSearchParams] = useSearchParams();

  const [activeTab, setActiveTab] = useState<TabType>(
    (searchParams.get("tab") as TabType) || "Chats",
  );
  const direction = activeTab === "Chats" ? -1 : 1;

  const chatsQuery = useQuery({
    queryKey: ["chats"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3000/chats/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  const handleActiveTab = (activeTab: TabType) => {
    setActiveTab(activeTab);
    setSearchParams({ tab: activeTab });
  };

  return (
    <div className={style.chatPage}>
      <Tabs
        tabs={[
          { value: "Chats", label: "Existing chats" },
          { value: "Users", label: "New chat" },
        ]}
        activeTab={activeTab}
        onTabChange={handleActiveTab}
      />

      <AnimatePresence mode="wait" custom={direction}>
        {activeTab === "Chats" ? (
          <motion.div
            key="Chats"
            custom={direction}
            {...tabContentAnimation}
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            {chatsQuery.data?.chats.map((chat: any) => (
              <ChatItem key={chat.id} chat={chat} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="Users"
            custom={direction}
            {...tabContentAnimation}
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            Users
          </motion.div>
        )}
      </AnimatePresence>
      {chatsQuery.isLoading && <PagePrealoader variant="transparent" />}
    </div>
  );
};

export default ChatPage;
