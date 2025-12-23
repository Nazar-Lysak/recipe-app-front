import { useReducer } from "react";
import {
  DndContext,
  type DragEndEvent,
  type DraggableSyntheticListeners,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";

import AddIcon from "../../../../assets/img/svg/AddIcon";
import { useCategories } from "../../../hooks/queries/useCategories";
import ButtonSimple from "../../../ui/button-simple/ButtonSimple";
import InputSelect from "../../../ui/input-select/InputSelect";
import InputText from "../../../ui/input-text/InputText";
import TextArea from "../../../ui/text-area/TextArea";

import style from "./CreateRecipeForm.module.scss";
import SortableItem from "../../SortableItem/SortableItem";
import DeleteIcon from "../../../../assets/img/svg/DeleteIcon";
import MoveXIcon from "../../../../assets/img/svg/MoveXIcon";
import {
  initialRecipeFormState,
  recipeFormReducer,
  type RecipeFormState,
} from "../../../hooks/useRecipeForm";
import { convertImageToBase64 } from "../../../utils/converImageToBase64";

interface HandleTextChangeParams {
  type: string;
  field: keyof RecipeFormState;
  value: string | number | null;
}

const CreateRecipeForm = () => {
  const [formState, dispatch] = useReducer(
    recipeFormReducer,
    initialRecipeFormState,
  );
  const categories = useCategories();

  console.log(formState);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  const handleDragEndIngredients = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = formState.ingredients.findIndex((i) => i.id === active.id);
    const newIndex = formState.ingredients.findIndex((i) => i.id === over.id);
    const reordered = arrayMove(formState.ingredients, oldIndex, newIndex);

    dispatch({ type: "REORDER_INGREDIENTS", ingredients: reordered });
  };

  const handleDragEndInstructions = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = formState.instructions.findIndex(
      (i) => i.id === active.id,
    );
    const newIndex = formState.instructions.findIndex((i) => i.id === over.id);
    const reordered = arrayMove(formState.instructions, oldIndex, newIndex);

    dispatch({ type: "REORDER_INSTRUCTIONS", instructions: reordered });
  };

  const handleTextChange = ({ type, field, value }: HandleTextChangeParams) => {
    dispatch({ type: type as any, field, value });
  };

  const handleImageChange = (file: File | null) => {
    if (!file) return;

    convertImageToBase64(file, (base64) => {
      dispatch({
        type: "SET_IMAGE",
        file: base64,
      });
    });
  };

  console.log(formState.name);

  return (
    <form className={style.form}>
      <div className={style.buttons}>
        <ButtonSimple type="button">Publish</ButtonSimple>
        <ButtonSimple
          isActive
          type="button"
          onClick={() => dispatch({ type: "RESET" })}
        >
          Clear Form
        </ButtonSimple>
      </div>
      {!formState.image && (
        <label className={style.inputFile}>
          <div className={style.icon}>
            <AddIcon />
          </div>
          <span className={style.text}>Add image recipe</span>
          <input
            type="file"
            accept="video/*,image/*"
            onChange={(e) =>
              handleImageChange(e.target.files ? e.target.files[0] : null)
            }
          />
        </label>
      )}
      {formState.image && (
        <button
          className={style.imagePreview}
          type="button"
          onClick={() => dispatch({ type: "REMOVE_IMAGE" })}
        >
          {formState.image && (
            <img
              src={formState.image}
              alt="Recipe"
              className={style.previewImage}
            />
          )}
        </button>
      )}

      <InputText
        label="Recipe Name"
        placeholder="Pina Colada"
        value={formState.name}
        onChange={(e) =>
          handleTextChange({
            type: "SET_FIELD",
            field: "name",
            value: e.target.value,
          })
        }
      />
      <TextArea
        label="Description"
        placeholder="A tropical explosion in every sip"
        value={formState.description}
        onChange={(e) =>
          handleTextChange({
            type: "SET_FIELD",
            field: "description",
            value: e.target.value,
          })
        }
      />
      <InputText
        label="Preparation Time"
        type="number"
        placeholder="30min"
        value={formState.preparationTime?.toString() || ""}
        onChange={(e) =>
          handleTextChange({
            type: "SET_FIELD",
            field: "preparationTime",
            value: e.target.value,
          })
        }
      />
      <InputSelect
        options={categories.data?.categories || []}
        value={formState.categoryId}
        onChange={(e) =>
          handleTextChange({
            type: "SET_FIELD",
            field: "categoryId",
            value: e,
          })
        }
      />

      <h2 className={style.subTitle}>Ingredients</h2>
      <DndContext
        sensors={sensors}
        modifiers={[restrictToVerticalAxis]}
        onDragEnd={handleDragEndIngredients}
      >
        <SortableContext items={formState.ingredients}>
          {formState.ingredients.map((ingredient) => (
            <SortableItem key={ingredient.id} id={ingredient.id} useDragHandle>
              {(dragHandleListeners: DraggableSyntheticListeners) => (
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
                  <InputText
                    placeholder="ingredient"
                    value={ingredient.name}
                    onChange={(e) =>
                      dispatch({
                        type: "UPDATE_INGREDIENT",
                        id: ingredient.id,
                        name: e.target.value,
                      })
                    }
                  />
                  <button
                    type="button"
                    className={style.deleteButton}
                    onClick={() =>
                      dispatch({ type: "REMOVE_INGREDIENT", id: ingredient.id })
                    }
                  >
                    <DeleteIcon />
                  </button>
                </div>
              )}
            </SortableItem>
          ))}
        </SortableContext>
      </DndContext>
      <div className={style.addElement}>
        <ButtonSimple
          type="button"
          onClick={() => dispatch({ type: "ADD_INGREDIENT" })}
        >
          + Add Ingredient
        </ButtonSimple>
      </div>
      <h2 className={style.subTitle}>Instructions</h2>

      <DndContext
        sensors={sensors}
        modifiers={[restrictToVerticalAxis]}
        onDragEnd={handleDragEndInstructions}
      >
        <SortableContext items={formState.instructions}>
          {formState.instructions.map((step) => (
            <SortableItem key={step.id} id={step.id} useDragHandle>
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
                  <InputText
                    placeholder="instruction"
                    value={step.text}
                    onChange={(e) =>
                      dispatch({
                        type: "UPDATE_INSTRUCTION",
                        id: step.id,
                        text: e.target.value,
                      })
                    }
                  />
                  <button
                    type="button"
                    className={style.deleteButton}
                    onClick={() =>
                      dispatch({ type: "REMOVE_INSTRUCTION", id: step.id })
                    }
                  >
                    <DeleteIcon />
                  </button>
                </div>
              )}
            </SortableItem>
          ))}
        </SortableContext>
      </DndContext>
      <div className={style.addElement}>
        <ButtonSimple
          type="button"
          onClick={() => dispatch({ type: "ADD_INSTRUCTION" })}
        >
          + Add Instruction
        </ButtonSimple>
      </div>
    </form>
  );
};

export default CreateRecipeForm;
