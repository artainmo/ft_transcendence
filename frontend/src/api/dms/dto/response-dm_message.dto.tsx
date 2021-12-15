export class ResponseDmMessageDto {
  id: number
  user: UserEntity
  dm: DmsEntity
  content: string
  order: number
}
