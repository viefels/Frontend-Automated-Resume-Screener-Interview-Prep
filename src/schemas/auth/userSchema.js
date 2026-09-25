import { object, string, pipe, minLength, email, literal, forward, partialCheck, picklist } from "valibot";

export const register = pipe(
    object({
        role: picklist(["candidate", "recruiter"], "Please select a valid role"),
        fullname: pipe(
            string(),
            minLength(4, "Please provide fullname with at least 4 characters")
        ),
        email: pipe(
            string(),
            minLength(4, "Email is required"), 
            email("Please enter a valid email address")
        ),
        password: pipe(
            string(),
            minLength(8, "Password must be at least 8 characters")
        ),
        confirmPsw: pipe(
            string(),
            minLength(8, "Please confirm your password")
        ),
        agreeTerms: literal(true, "You must agree to the terms")
    }),
    forward(
        partialCheck([["password"], ["confirmPsw"]], 
            (input)=> input.password === input.confirmPsw, "Passwords do not match."
        ), ["confirmPsw"]
    )
)

export const login = pipe(
    object({
        email: pipe(
            string(),
            minLength(4, "Email is required"), 
            email("Please enter a valid email address")
        ),
        password: pipe(
            string(),
            minLength(8, "Password must be at least 8 characters")
        )
    })
)