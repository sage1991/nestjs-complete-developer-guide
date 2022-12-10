import { SetMetadata } from "@nestjs/common"
import { ClassConstructor } from "class-transformer"

export const SerializeMetadataName = "serialize_"

export const Serialize = (Class: ClassConstructor<any>) => SetMetadata(SerializeMetadataName, Class)
