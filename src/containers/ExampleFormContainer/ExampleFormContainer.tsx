import SubmitButton from "@/components/Form/Buttons/SubmitButton";
import Form from "@/components/Form/Form";
import Check from "@/components/Form/Inputs/Check/Check";
import ColorPicker from "@/components/Form/Inputs/ColorPicker/ColorPicker";
import FileDrop from "@/components/Form/Inputs/FileDrop/FileDrop";
import MultiSelect from "@/components/Form/Inputs/MultiSelect";
import PasswordField from "@/components/Form/Inputs/PasswordField/PasswordField";
import SingleSelect from "@/components/Form/Inputs/SingleSelect/SingleSelect";
import TextField from "@/components/Form/Inputs/TextField/TextField";
import {
  equalsTo,
  isValidEmail,
  password,
  required,
} from "@/components/Form/Validators/validators";
import texts from "@/plugins/Texts/texts";
import { Grid, Typography } from "@mui/material";
import { useCallback, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { ExampleFormType } from "./exampleFormTypes";
import FavoriteFruitArrayFields from "./FavoriteFruitArrayFileds";
import useDefaultData from "./_hooks/useDefaultData";
import useOptions from "./_hooks/useOptions";

const ExampleFormContainer = () => {
  const { carOptions, dayOptions, isOptionsLoading } = useOptions();
  const { defaultData, isDefaultDataLoading } = useDefaultData();
  const methods = useForm<ExampleFormType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      colorPickAvailable: false,
      favoriteColor: "",
      carIds: [],
      dayId: "",
      profilePicture: "",
      favoriteFruits: [{ fruit: "" }],
    } as ExampleFormType,
    context: { isLoading: isDefaultDataLoading },
  });

  useEffect(
    () => defaultData && methods.reset(defaultData),
    [methods, defaultData]
  );

  const onSubmit = useCallback(async (values: ExampleFormType) => {
    const fakeApiCall = new Promise((resolve) => {
      setTimeout(() => {
        resolve(console.log(values));
        // methods.reset({
        //   name: "",
        //   email: "",
        //   password: "",
        //   confirmPassword: "",
        //   colorPickAvailable: false,
        //   favoriteColor: "",
        //   carIds: [],
        //   dayId: "",
        //   profilePicture: "",
        //   favoriteFruits: [{ fruit: "" }],
        // });
      }, 3000);
    });

    await fakeApiCall;
  }, []);

  const passwordField = useWatch({
    control: methods.control,
    name: "password",
  });

  const canPickColor = useWatch({
    control: methods.control,
    name: "colorPickAvailable",
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography>TODO: number field, date and timepickers</Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField<ExampleFormType>
            name="name"
            label={texts.name}
            rules={{ required }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField<ExampleFormType>
            name="email"
            label={texts.email}
            rules={{ required, pattern: isValidEmail }}
          />
        </Grid>
        <Grid item xs={6}>
          <PasswordField<ExampleFormType>
            name="password"
            label={texts.password}
            rules={{ required, pattern: password }}
          />
        </Grid>
        <Grid item xs={6}>
          <PasswordField<ExampleFormType>
            name="confirmPassword"
            label={texts.confirmPassword}
            rules={{
              required,
              validate: (value) => equalsTo(value, passwordField),
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <MultiSelect<ExampleFormType>
            name="carIds"
            label={texts.cars}
            options={carOptions}
            isLoading={isOptionsLoading}
            rules={{ required }}
          />
        </Grid>
        <Grid item xs={6}>
          <SingleSelect<ExampleFormType>
            name="dayId"
            label={texts.day}
            options={dayOptions}
            isLoading={isOptionsLoading}
          />
        </Grid>
        <Grid item xs={2}>
          <Check<ExampleFormType>
            name="colorPickAvailable"
            label={texts.pickColor}
            hideError
          />
        </Grid>
        <Grid item xs={10}>
          <ColorPicker<ExampleFormType>
            name="favoriteColor"
            label={texts.favoriteColor}
            disabled={!canPickColor}
          />
        </Grid>
        <Grid item xs={12}>
          <FileDrop<ExampleFormType>
            name="profilePicture"
            accept={{
              "image/*": [".jpeg", ".png", ".gif", ".svg"],
            }}
            rules={{ required }}
          />
        </Grid>
        <FavoriteFruitArrayFields methods={methods} />
        <Grid item xs={12}>
          <SubmitButton text={texts.save} style={{ margin: "auto auto" }} />
        </Grid>
      </Grid>
    </Form>
  );
};

export default ExampleFormContainer;
