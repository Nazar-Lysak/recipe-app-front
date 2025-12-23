import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { type ElementType, type ReactNode } from "react";

interface SortableItemProps {
  as?: ElementType;
  id: string;
  children: ReactNode | ((listeners: any) => ReactNode);
  useDragHandle?: boolean;
}

function SortableItem({
  as: Element = "div",
  id,
  children,
  useDragHandle = false,
}: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (useDragHandle) {
    return (
      <Element ref={setNodeRef} style={style} {...attributes}>
        {typeof children === "function" ? children(listeners) : children}
      </Element>
    );
  }

  return (
    <Element ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </Element>
  );
}

export default SortableItem;
