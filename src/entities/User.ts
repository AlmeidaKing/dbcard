import { uuid } from "uuidv4";

export class User {
  public id?: string;

  public name: string;
  public email: string;
  public password: string;

  constructor(props: User) {
    Object.assign(this, props);

    const { id } = props;

    if (!id) {
      this.id = uuid();
    }
  }
}
