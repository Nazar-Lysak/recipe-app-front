import { DndContext, type DragEndEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import {
  restrictToVerticalAxis,
} from "@dnd-kit/modifiers";

import AddIcon from "../../../../assets/img/svg/AddIcon";
import { useCategories } from "../../../hooks/queries/useCategories";
import ButtonSimple from "../../../ui/button-simple/ButtonSimple";
import InputSelect from "../../../ui/input-select/InputSelect";
import InputText from "../../../ui/input-text/InputText";
import TextArea from "../../../ui/text-area/TextArea";

import style from "./CreateRecipeForm.module.scss";
import { useState } from "react";
import SortableItem from "../../SortableItem/SortableItem";
import DeleteIcon from "../../../../assets/img/svg/DeleteIcon";
import MoveXIcon from "../../../../assets/img/svg/MoveXIcon";

const CreateRecipeForm = () => {
  const [items, setItems] = useState<string[]>(["1", "2", "3"]);
  const categories = useCategories();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id as string);
        const newIndex = items.indexOf(over?.id as string);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <form className={style.form}>
      <div className={style.buttons}>
        <ButtonSimple type="button">Publish</ButtonSimple>
        <ButtonSimple isActive type="button">
          Delete
        </ButtonSimple>
      </div>
      <label className={style.inputFile}>
        <div className={style.icon}>
          <AddIcon />
        </div>
        <span className={style.text}>Add image recipe</span>
        <input type="file" accept="video/*,image/*" />
      </label>
      <InputText label="Recipe Name" placeholder="Pina Colada" />
      <TextArea
        label="Description"
        placeholder="A tropical explosion in every sip"
      />
      <InputText label="Preparation Time" type="number" placeholder="30min" />
      <InputSelect options={categories.data?.categories || []} />

      <h2 className={style.subTitle}>Ingredients</h2>
      <DndContext
        sensors={sensors}
        modifiers={[restrictToVerticalAxis]}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items}>
          {items.map((item) => (
            <SortableItem key={item} id={item} useDragHandle>
              {(dragHandleListeners: any) => (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <button
                    type="button"
                    className={style.deleteButton}
                    {...dragHandleListeners}
                    style={{ touchAction: "none" }}
                  >
                    <MoveXIcon />
                  </button>
                  <InputText placeholder="ingredient" />
                  <button type="button" className={style.deleteButton}>
                    <DeleteIcon />
                  </button>
                </div>
              )}
            </SortableItem>
          ))}
        </SortableContext>
      </DndContext>
      <div className={style.addElement}>
        <ButtonSimple type="button">+ Add Ingredient</ButtonSimple>
      </div>
      <h2 className={style.subTitle}>Instructions</h2>

      <DndContext
        sensors={sensors}
        modifiers={[restrictToVerticalAxis]}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items}>
          {items.map((item) => (
            <SortableItem key={item} id={item} useDragHandle>
              {(dragHandleListeners: any) => (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <button
                    type="button"
                    className={style.deleteButton}
                    {...dragHandleListeners}
                    style={{ touchAction: "none" }}
                  >
                    <MoveXIcon />
                  </button>
                  <InputText placeholder="ingredient" />
                  <button type="button" className={style.deleteButton}>
                    <DeleteIcon />
                  </button>
                </div>
              )}
            </SortableItem>
          ))}
        </SortableContext>
      </DndContext>
      <div className={style.addElement}>
        <ButtonSimple type="button">+ Add Instruction</ButtonSimple>
      </div>
    </form>
  );
};

export default CreateRecipeForm;
