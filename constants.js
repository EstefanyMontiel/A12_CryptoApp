    // constants.js - Constantes de la aplicación

    // Configuración de la API
    export const API_CONFIG = {
    BASE_URL: 'https://api.coingecko.com/api/v3',
    ENDPOINT: '/simple/price',
    PARAMS: {
        ids: 'bitcoin,ethereum,dogecoin,solana',
        vs_currencies: 'usd',
        include_24h_change: true,
    },
    };

    // URL completa de la API
    export const API_URL = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINT}?ids=${API_CONFIG.PARAMS.ids}&vs_currencies=${API_CONFIG.PARAMS.vs_currencies}&include_24hr_change=${API_CONFIG.PARAMS.include_24h_change}`;

    // Configuración de caché
    export const CACHE_CONFIG = {
    KEY: '@crypto_prices_cache',
    EXPIRY_TIME: 5 * 60 * 1000, // 5 minutos (opcional, por si quieres implementarlo)
    };

    // Información de las criptomonedas
    export const CRYPTO_INFO = {
    bitcoin: {
        id: 'bitcoin',
        name: 'Bitcoin',
        symbol: 'BTC',
        color: '#F7931A',
        icon: '₿',
        description: 'La primera criptomoneda descentralizada',
    },
    ethereum: {
        id: 'ethereum',
        name: 'Ethereum',
        symbol: 'ETH',
        color: '#627EEA',
        icon: 'Ξ',
        description: 'Plataforma de contratos inteligentes',
    },
    dogecoin: {
        id: 'dogecoin',
        name: 'Dogecoin',
        symbol: 'DOGE',
        color: '#C2A633',
        icon: 'Ð',
        description: 'La criptomoneda del meme',
    },
    solana: {
        id: 'solana',
        name: 'Solana',
        symbol: 'SOL',
        color: '#14F195',
        icon: '◎',
        description: 'Blockchain de alto rendimiento',
    },
    };

    // Textos de la aplicación (para fácil internacionalización)
    export const TEXTS = {
    APP_TITLE: 'CryptoApp',
    LOADING: 'Cargando precios...',
    UPDATING: 'Actualizando precios...',
    LAST_UPDATE: 'Última actualización:',
    OFFLINE_MODE: 'Modo Offline - Mostrando datos en caché',
    ERROR_PREFIX: 'Error:',
    ERROR_FALLBACK: 'Mostrando últimos datos guardados',
    NO_DATA: 'No hay datos disponibles',
    PULL_TO_REFRESH: 'Desliza para actualizar',
    };

    // Configuración de animaciones
    export const ANIMATION_CONFIG = {
    DURATION: 300,
    TYPE: 'timing',
    };

    // Configuración de refresco
    export const REFRESH_CONFIG = {
    COLORS: ['#4ECDC4'],
    TINT_COLOR: '#4ECDC4',
    TITLE_COLOR: '#4ECDC4',
    };