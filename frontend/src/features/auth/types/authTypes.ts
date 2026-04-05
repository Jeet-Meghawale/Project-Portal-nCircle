export interface User{
    id:string;
    name:string;
    email:string;
    role:"STUDENT" | "COORDINATOR" | "ADMIN"
}

export interface LoginRequest{
    email:string;
    password:string;
}

export interface AuthResponse{
    success:boolean;
    user:User;
    accessToken:string;
}