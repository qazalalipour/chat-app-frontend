import { defineStore } from 'pinia'
import { authService } from '~/services/auth.service'

export const useAuthStore = defineStore('auth', () => {
    const token = useCookie<string | null>('auth_token')

    const user = ref<any>(null)
    const loading = ref(false)
    const errors = ref<any[]>([])
    const generalError = ref<string | null>(null)

    async function login(data: { email: string; password: string }) {
        loading.value = true
        errors.value = []
        generalError.value = null

        try {
            const response: any = await authService.login(data)

            token.value = response.token
            user.value = response.user

            return { success: true, data: response }
        } catch (err: any) {
            if (err.statusCode === 422) {
                if (err.data?.errors) {
                    errors.value = Object.entries(err.data.errors).map(([field, messages]) => ({
                        field,
                        message: Array.isArray(messages) ? messages[0] : messages as string
                    }))
                } else if (err.data?.message) {
                    generalError.value = err.data.message
                }
            }
            else if (err.statusCode === 401) {
                generalError.value = 'Invalid email or password'
            }
            else if (err.statusCode === 429) {
                generalError.value = 'Too many attempts. Please try again later.'
            }
            else {
                generalError.value = err.data?.message || 'An error occurred during login'
            }

            return {
                success: false,
                statusCode: err.statusCode,
                errors: errors.value,
                generalError: generalError.value
            }
        } finally {
            loading.value = false
        }
    }

    async function register(data: { name: string; email: string; password: string }) {
        loading.value = true
        errors.value = []
        generalError.value = null

        try {
            const response: any = await authService.register(data)

            if (response.token) {
                token.value = response.token
                user.value = response.user
            }

            return { success: true, data: response }
        } catch (err: any) {
            if (err.statusCode === 422) {
                if (err.data?.errors) {
                    errors.value = Object.entries(err.data.errors).map(([field, messages]) => ({
                        field,
                        message: Array.isArray(messages) ? messages[0] : messages as string
                    }))
                }
            }
            else if (err.statusCode === 409) {
                generalError.value = 'User already exists'
            }
            else {
                generalError.value = err.data?.message || 'Registration failed'
            }

            return {
                success: false,
                errors: errors.value,
                generalError: generalError.value
            }
        } finally {
            loading.value = false
        }
    }

    async function me() {
        if (!token.value) return

        loading.value = true
        try {
            const response: any = await authService.me()
            user.value = response.data
            return response
        } catch (err: any) {
            if (err.statusCode === 401) {
                logout()
            }
            return null
        } finally {
            loading.value = false
        }
    }

    function logout() {
        token.value = null
        user.value = null
        errors.value = []
        generalError.value = null
    }

    function clearErrors() {
        errors.value = []
        generalError.value = null
    }

    function getFieldError(field: string): string | null {
        const error = errors.value.find(e => e.field === field)
        return error?.message || null
    }

    return {
        token,
        user,
        loading,
        errors,
        generalError,
        login,
        register,
        me,
        logout,
        clearErrors,
        getFieldError
    }
})