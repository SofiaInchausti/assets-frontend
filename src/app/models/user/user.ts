export class User {
  id?: string | null;
  username?: string | undefined;
  password!: string;
  active: boolean | undefined;
}
