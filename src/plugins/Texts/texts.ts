const texts = {
  save: "Mentés",
  name: "Név",
  email: "Email",
  password: "Jelszó",
  confirmPassword: "Jelszó mégegyszer",
  cars: "Autók",
  day: "Nap",
  favoriteColor: "Kedvenc szín",
  pickColor: "Szín választása",
  validatorTexts: {
    notCorrectFileFormat: "Nem megfelelő fájl formátum.",
    required: "Kötelező mező.",
    password:
      "A jelszónak min 8 karakterből kell állnia, és tartalmaznia kell kis és nagy betűket valamint számot.",
    equalsTo: "Eltérő jelszavak",
    email: "Nem megfelelő e-mail formátum.",
    minLength: (minLength: number) =>
      `A megadott szöveg nem lehet rövidebb mint ${minLength} karakter.`,
    maxLength: (maxLength: number) =>
      `A megadott szöveg nem lehet hosszabb mint ${maxLength} karakter.`,
    min: (minValue: number) =>
      `A megadott érték nem lehet kisebb mint ${minValue}.`,
    max: (maxValue: number) =>
      `A megadott érték nem lehet nagyobb mint ${maxValue}.`,
  },
  fileUploadTitle: "Húzza a keretbe, vagy válassza ki a feltöltendő fájlt:",
  selectFile: "Fájl kiválasztása",
  noData: "Nincs adat",
};

export default texts;
