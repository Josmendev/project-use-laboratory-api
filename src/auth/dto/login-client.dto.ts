import { IsNotEmpty, IsOptional, IsString, Max, Min } from 'class-validator';

export class LoginClientDto {
  @IsString({ message: 'El campo username debe ser una cadena de caracteres' })
  @IsNotEmpty({ message: 'El campo username no puede estar vacío' })
  @Min(6, { message: 'El campo username debe tener al menos 6 caracteres' })
  @Max(15, { message: 'El campo username no puede tener más de 15 caracteres' })
  username: string;

  @IsString({ message: 'El campo url debe ser una cadena de caracteres' })
  @IsOptional()
  url?: string;
}
