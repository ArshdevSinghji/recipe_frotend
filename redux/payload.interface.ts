export interface RecipePayloadInterface {
  title: string;
  description: string;
  ingredients: string[];
  instructions: string;
  createdBy: string;
}

export interface SignInPayloadInterface {
  email: string;
  password: string;
}

export interface SignUpPayloadInterface {
  username: string;
  email: string;
  password: string;
}
