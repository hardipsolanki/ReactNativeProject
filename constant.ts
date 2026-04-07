export const OtpMin = 100000;
export const otpMax = 999999;

export const contex = {
    login: {
        heading: "Welcome Back",
        title: "Login",
        emailLabel: "Your Email",
        emailPlaceholder: "Enter your email",
        passwordLabel: "Your Password",
        passwordPlaceholder: "Enter your password",
        forgotPassword: "Forget Password?",
        loginButton: "Login",
        signupQuestion: "Are you new here?",
        signupText: "Sign Up",
        // Errors
        emailRequiredErr: "Email is required",
        passwordRequiredErr: "Password is required",
        userNotFoundErr: "User not found...!",
        invalidPasswordErr: "Invalid password...!",
    },

    signup: {
        heading: "Create Account",
        title: "Sign Up",
        fullNameLabel: "Your Full Name",
        fullNamePlaceholder: "Enter your full name",
        emailLabel: "Your Email",
        emailPlaceholder: "Enter your email",
        passwordLabel: "Your Password",
        passwordPlaceholder: "Enter your password",
        signupButton: "Sign Up",
        loginQuestion: "Already have an account?",
        loginText: "Login",
        // Errors
        fullNameRequiredErr: "Full name is required",
        emailRequiredErr: "Email is required",
        passwordRequiredErr: "Password is required",
    },
    resetPassword: {
        heading: "Reset Password",
        description: "Change your password to something you can remember",
        newPasswordLabel: "Your New Password",
        newPasswordPlaceholder: "Enter your new password",
        confirmPasswordLabel: "Your Confirm Password",
        confirmPasswordPlaceholder: "Enter your confirm password",
        resetButton: "Reset Password",
        // Errors
        passwordRequiredErr: "Password is required",
        confirmPasswordRequiredErr: "Confirm password is required",
        passwordMismatchErr: "Passwords do not match",
    },
    forgotPassword: {
        heading: "Forgot Password",
        descriptionLine1: "Confirm your email and we'll send",
        descriptionLine2: "the instructions.",
        emailLabel: "Your Email",
        emailPlaceholder: "Enter your email",
        otpLabel: "OTP",
        otpPlaceholder: "Enter otp",
        sendButton: "Send Reset Instructions",
        verifyButton: "Verify",
        checkEmailText: "Please check your email",
        // Errors
        emailRequiredErr: "Email is required",
        userNotFoundErr: "User not found...!",
        invalidOtpErr: "Invalid OTP...!",
    },
    tabs: {
        profile: {
            heading: "Profile",
            defaultBio: "Passionate developer exploring React Native.",
            logoutButton: "Log Out",
            about: "  Passionate developer exploring React Native.",
        },
        home: {
            status: {
                all: "all",
                completed: "completed",
                pending: "pending"
            },
            searchPlaceholder: "Search todo..."

        },
        addTodo: {
            heading: "Add Todo",
            title: "Title",
            Description: "Description",
            titlePlaceholder: "Enter todo title",
            descriptionPlaceholder: "Enter todo description",
            addButton: "Add Todo",
            requiredErr: "Todo is required",
        },
        updateTodo: {
            heading: "Update Todo",
            updateButton: "Update Todo",
            notFoundErr: "Todo not found...!",
        },
        deleteTodo: {
            deleteTodoMsg: "Todo deleted successfully",
            deleteTodoText: "Delete"
        }
    }
}

export enum ROUTES {
    TABS = '(tabs)',
    HOME = 'home',
    UPDATE_TODO = 'UpdateTodo',
    LOGIN = 'Login',
    SIGNUP = 'Signup',
    FORGOT_PASSWORD = 'ForgotPassword',
    RESET_PASSWORD = 'ResetPassword',
    ADD_TODO = 'addTodo',
    PROFILE = 'profile'
}