import { CreateMatchHistoryDto } from './create-match-history.dto';
import { PartialType } from "@nestjs/mapped-types";

export class UpdateMatchHistoryDto extends PartialType(CreateMatchHistoryDto) {}
