export interface UserSummary {
    id: string
    Display_name: string
    Email: string
    Role: string
}
export interface User extends UserSummary {
    Created_at: string
    Is_blocked: boolean
    Password_hash: string 
}
export interface UserRegister {
    Display_name: string
    Email: string
    Role: string
    Created_at: string
    Is_blocked: boolean
    Password_hash: string 

}
