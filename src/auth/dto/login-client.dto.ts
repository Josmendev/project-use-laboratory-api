import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class LoginClientDto {
  @IsString({ message: 'El campo username debe ser una cadena de caracteres' })
  @IsNotEmpty({ message: 'El campo username no puede estar vacío' })
  username: string;

  @IsString({ message: 'El campo url debe ser una cadena de caracteres' })
  @IsOptional()
  url?: string;
}
