export class DmMessageDto {
  id: number
  user: UserEntity
  dm: DmsEntity
  content: string
  order: number
}
