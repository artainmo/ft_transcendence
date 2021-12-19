export class CreateDmMessageDto {
  user: UserEntity
  dm: DmsEntity
  content: string
  order: number
}
