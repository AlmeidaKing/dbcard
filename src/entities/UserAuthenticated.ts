import { User } from './User';

export class UserAuthenticated extends User {
  public token: string;

  constructor (props) {
    super(props);
    this.token = props.token;
  }
}