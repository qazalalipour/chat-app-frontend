import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

export default defineNuxtPlugin(() => {
    const auth = useAuthStore()

    window.Pusher = Pusher

    const echo = new Echo({
        broadcaster: 'reverb',

        key: 'er8otgt3z1oglxtjlxro',

        wsHost: 'localhost',
        wsPort: 8080,

        forceTLS: false,

        enabledTransports: ['ws'],

        authEndpoint: 'http://localhost:8000/broadcasting/auth',

        auth: {
            headers: {
                Authorization: auth.token
                    ? `Bearer ${auth.token}`
                    : '',
                Accept: 'application/json',
            },
        },
    })

    window.Echo = echo

    return {
        provide: {
            echo,
        },
    }
})