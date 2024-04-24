export class LoginModel {
  token: string;
  user: {
    id: '';
    name: '';
    lastname: '';
    email: '';
    remember_token: '';
    created_at: '';
    updated_at: '';
  };

  constructor() {
    this.token = '';
    this.user = {
      id: '',
      name: '',
      lastname: '',
      email: '',
      remember_token: '',
      created_at: '',
      updated_at: '',
    };
  }
}
