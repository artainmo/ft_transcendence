import { CreateDmDto } from './create-dm.dto';
import { PartialType } from "@nestjs/mapped-types";

export class UpdateDmDto extends PartialType(CreateDmDto) {}
