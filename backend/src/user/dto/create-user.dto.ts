export class CreateUserDto {
  name: string;
  login: string;
  avatar: string;
  hasTwoFactorAuthentication?: boolean;
  twoFactorAuthenticationSecret: string;
  status: boolean;
  nbrVicotry: number;
  nbrLoss: number;
}
