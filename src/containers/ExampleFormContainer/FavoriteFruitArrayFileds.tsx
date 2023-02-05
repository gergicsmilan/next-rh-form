import { FormContextType } from "@/components/Form/Form";
import TextField from "@/components/Form/Inputs/TextField/TextField";
import { Grid, IconButton } from "@mui/material";
import { useMemo } from "react";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { ExampleFormType } from "./exampleFormTypes";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

type Props = {
  methods: UseFormReturn<ExampleFormType, FormContextType>;
};

const FavoriteFruitArrayFields = ({ methods }: Props) => {
  const { fields, remove, append } = useFieldArray<ExampleFormType>({
    name: "favoriteFruits",
    control: methods.control,
  });

  const isSumbitting = useMemo(
    () => methods.formState.isSubmitting,
    [methods.formState.isSubmitting]
  );

  const isLoading = useMemo(
    () => methods.control._options.context?.isLoading,
    [methods.control._options.context?.isLoading]
  );

  return (
    <>
      {fields.map((field, index) => (
        <Grid
          item
          container
          xs={12}
          columnSpacing={2}
          key={field.id}
          style={{ display: "flex", alignItems: "center" }}
        >
          <Grid item xs={11}>
            <TextField<ExampleFormType>
              name={`favoriteFruits.${index}.fruit`}
              label={"Gyümölcs"}
            />
          </Grid>
          <Grid
            item
            xs={1}
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            {!isLoading && !isSumbitting && (
              <>
                <IconButton
                  onClick={() => remove(index)}
                  style={{
                    display: fields.length > 1 ? "flex" : "none",
                    marginBottom: "0.5rem",
                  }}
                >
                  <RemoveCircleIcon
                    style={{ height: "1.6rem", width: "1.6rem" }}
                  />
                </IconButton>
                <IconButton
                  onClick={() => append({ fruit: "" })}
                  style={{ marginBottom: "0.5rem" }}
                >
                  <AddCircleIcon
                    style={{ height: "1.6rem", width: "1.6rem" }}
                  />
                </IconButton>
              </>
            )}
          </Grid>
        </Grid>
      ))}
    </>
  );
};

export default FavoriteFruitArrayFields;
