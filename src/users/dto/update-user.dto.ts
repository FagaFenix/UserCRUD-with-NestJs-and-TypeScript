import {
    IsEmail,
    IsNotEmpty,
    IsString,
    MinLength,
    Matches
} from 'class-validator'

export class updateUserDto {

    @Matches(/.*\S.*/, { message: 'Name must not be empty or contain only spaces' })
    name?: string

    @Matches(/.*\S.*/, { message: 'Email must not be empty or contain only spaces' })
    @IsEmail()
    email?: string

    @Matches(/^(INTERN|ENGINEER|ADMIN)$/, { message: 'Role must not be empty or contain only spaces' })
    role?: string
}