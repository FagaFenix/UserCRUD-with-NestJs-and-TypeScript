import {
    IsEmail,
    IsNotEmpty,
    IsString,
    MinLength,
    Matches
} from 'class-validator'

export class createUserDto {

    @IsNotEmpty()
    @IsString()
    @Matches(/.*\S.*/, { message: 'Name must not be empty or contain only spaces' })
    name: string

    @IsString()
    @IsEmail()
    @MinLength(1) //diferent types of validations similar to IsNotEmpty()
    @Matches(/.*\S.*/, { message: 'Email must not be empty or contain only spaces' })
    email: string

    @IsString()
    @Matches(/^(INTERN|ENGINEER|ADMIN)$/, { message: 'Role must not be empty, cannot contain only spaces and should be in the permitted list' }) // Optimal validation: we only use this one instead of MinLength and/or IsNotEmpty
    role: string
}