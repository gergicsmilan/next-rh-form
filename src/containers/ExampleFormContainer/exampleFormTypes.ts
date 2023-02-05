export type FileParameter = {
  data: any;
  fileName: string;
};

export type ExampleFormType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  colorPickAvailable: boolean;
  favoriteColor: string;
  carIds: string[];
  dayId: string;
  profilePicture: FileParameter | string;
  favoriteFruits: { fruit: string }[];
};
