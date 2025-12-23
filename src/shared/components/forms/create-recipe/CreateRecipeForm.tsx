import { useReducer, useState } from "react";
import { useTranslation } from "react-i18next";
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
import Drawer from "../../drawer/Drawer";
import { useSession } from "../../../../context/useSession";
import { AxiosError } from "axios";
import Popup from "../../popup/Popup";
import SadSmile from "../../../../assets/img/svg/SadSmile";
import PagePrealoader from "../../../ui/page-prealoader/PagePrealoader";
import CheckIcon from "../../../../assets/img/svg/CheckIcon";
import { Link } from "react-router";
import { useCreateRecipe } from "../../../hooks/mutations/useCreateRecipe";

interface HandleTextChangeParams {
  type: string;
  field: keyof RecipeFormState;
  value: string | number | null;
}

const CreateRecipeForm = () => {
  const { t } = useTranslation("recipe");
  const { t: tCommon } = useTranslation("common");
  const [clearForm, setClearForm] = useState(false);
  const [formState, dispatch] = useReducer(
    recipeFormReducer,
    initialRecipeFormState,
  );
  const categories = useCategories();
  const { token } = useSession();

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

    const oldIndex = formState.steps.findIndex((i) => i.id === active.id);
    const newIndex = formState.steps.findIndex((i) => i.id === over.id);
    const reordered = arrayMove(formState.steps, oldIndex, newIndex);

    dispatch({ type: "REORDER_INSTRUCTIONS", steps: reordered });
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

  const createRecipeMutation = useCreateRecipe({
    token,
  });

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    createRecipeMutation.mutate(formState);
    console.log(formState);
  };

  return (
    <form className={style.form} onSubmit={submitForm}>
      <div className={style.buttons}>
        <ButtonSimple type="submit">{tCommon("publish")}</ButtonSimple>
        <ButtonSimple isActive type="button" onClick={() => setClearForm(true)}>
          {t("createRecipe.clearForm")}
        </ButtonSimple>
      </div>
      {!formState.image && (
        <label className={style.inputFile}>
          <div className={style.icon}>
            <AddIcon />
          </div>
          <span className={style.text}>{t("createRecipe.addImage")}</span>
          <input
            type="file"
            accept="video/*,image/*"
            required
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
        label={t("createRecipe.recipeName")}
        placeholder={t("createRecipe.recipeNamePlaceholder")}
        required
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
        label={t("description")}
        placeholder={t("createRecipe.recipeNamePlaceholder")}
        value={formState.description}
        required
        onChange={(e) =>
          handleTextChange({
            type: "SET_FIELD",
            field: "description",
            value: e.target.value,
          })
        }
      />
      <InputText
        label={t("createRecipe.preparationTime")}
        type="number"
        placeholder={t("createRecipe.preparationTimePlaceholder")}
        required
        value={formState.time?.toString() || ""}
        onChange={(e) =>
          handleTextChange({
            type: "SET_FIELD",
            field: "time",
            value: e.target.value,
          })
        }
      />
      <InputSelect
        options={categories.data?.categories || []}
        value={formState.category}
        placeholder={t("createRecipe.categoryPlaceholder")}
        required
        onChange={(e) =>
          handleTextChange({
            type: "SET_FIELD",
            field: "category",
            value: e,
          })
        }
      />

      <h2 className={style.subTitle}>{t("ingredients")}</h2>
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
                    placeholder={t("createRecipe.ingredientPlaceholder")}
                    value={ingredient.name}
                    required
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
          + {t("createRecipe.addIngredient")}
        </ButtonSimple>
      </div>
      <h2 className={style.subTitle}>{t("createRecipe.instructions")}</h2>

      <DndContext
        sensors={sensors}
        modifiers={[restrictToVerticalAxis]}
        onDragEnd={handleDragEndInstructions}
      >
        <SortableContext items={formState.steps}>
          {formState.steps.map((step) => (
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
                    placeholder={t("createRecipe.instructionPlaceholder")}
                    value={step.text}
                    required
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
          + {t("createRecipe.addInstruction")}
        </ButtonSimple>
      </div>
      {createRecipeMutation.isPending && (
        <PagePrealoader variant="transparent" />
      )}

      <Popup
        variant="success"
        onClose={() => {}}
        isOpen={createRecipeMutation.isSuccess}
      >
        <h2>{t("createRecipe.success")}</h2>
        <CheckIcon />
        <Link to="/">{tCommon("goToHome")}</Link>
      </Popup>

      <Popup
        variant="error"
        onClose={() => createRecipeMutation.reset()}
        isOpen={createRecipeMutation.isError}
      >
        <h2>{t("createRecipe.errorCreating")}</h2>
        <SadSmile />
        <div>
          {createRecipeMutation.error instanceof AxiosError &&
            createRecipeMutation.error.response?.data?.message?.map(
              (msg: string, index: number) => (
                <p key={index} style={{ margin: 0 }}>
                  {msg}
                </p>
              ),
            )}
        </div>

        <ButtonSimple
          type="button"
          onClick={() => createRecipeMutation.reset()}
        >
          {tCommon("close")}
        </ButtonSimple>
      </Popup>

      <Drawer isOpen={clearForm} onClose={() => setClearForm(false)}>
        <h2>{t("createRecipe.clearForm")}</h2>
        <p>{t("createRecipe.clearFormMessage")}</p>
        <div className={style.drawerButtons}>
          <ButtonSimple type="button" onClick={() => setClearForm(false)}>
            {tCommon("cancel")}
          </ButtonSimple>
          <ButtonSimple
            isActive
            type="button"
            onClick={() => {
              dispatch({ type: "RESET" });
              setClearForm(false);
            }}
          >
            {tCommon("clear")}
          </ButtonSimple>
        </div>
      </Drawer>
    </form>
  );
};

export default CreateRecipeForm;
