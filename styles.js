    import { StyleSheet } from 'react-native';

    // Paleta de colores
    const COLORS = {
    background: '#0f0f1e',
    cardBackground: '#1a1a2e',
    primary: '#4ECDC4',
    textPrimary: '#FFFFFF',
    textSecondary: '#8B8B9A',
    error: '#1c81c0ff',
    errorLight: '#FFE5E5',
    positiveBackground: '#D4EDDA',
    positiveText: '#155724',
    negativeBackground: '#F8D7DA',
    negativeText: '#721C24',
    };

    // Espaciado consistente
    const SPACING = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
    };

    // Tamaños de fuente
    const FONT_SIZES = {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 28,
    xxl: 32,
    xxxl: 36,
    };

    // Border radius
    const RADIUS = {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    };

    const styles = StyleSheet.create({

    // Contenedores principales
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        paddingTop: SPACING.md,     
    },
    
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.background,
    },
    
    listContainer: {
        padding: SPACING.md,
    },

    // Header
    header: {
        marginBottom: SPACING.sm,
        paddingTop: SPACING.xxxl, // Espacio para evitar la isla/notch
    },
    
    title: {
        fontSize: FONT_SIZES.xxxl,
        fontWeight: 'bold',
        color: COLORS.textPrimary,
        marginBottom: SPACING.sm,
        textAlign: 'center', // Centrar el título
        marginTop: SPACING.lg, // Espacio adicional desde arriba
    },
    
    lastUpdate: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.textSecondary,
        marginTop: SPACING.sm,
    },

    // Banners de estado
    offlineBanner: {
        backgroundColor: COLORS.error,
        padding: SPACING.md,
        borderRadius: RADIUS.sm,
        marginTop: SPACING.md,
    },
    
    offlineText: {
        color: COLORS.textPrimary,
        fontSize: FONT_SIZES.sm,
        fontWeight: '600',
        textAlign: 'center',
    },
    
    errorBanner: {
        backgroundColor: COLORS.error,
        padding: SPACING.md,
        borderRadius: RADIUS.sm,
        marginTop: SPACING.md,
    },
    
    errorText: {
        color: COLORS.textPrimary,
        fontSize: FONT_SIZES.sm,
        fontWeight: '600',
        marginBottom: SPACING.xs,
    },
    
    errorSubtext: {
        color: COLORS.errorLight,
        fontSize: FONT_SIZES.xs,
    },

    // Loading
    loadingText: {
        color: COLORS.primary,
        fontSize: SPACING.lg,
        marginTop: SPACING.lg,
        fontWeight: '600',
    },

    // Tarjetas de criptomonedas
    cryptoCard: {
        backgroundColor: COLORS.cardBackground,
        borderRadius: RADIUS.lg,
        padding: SPACING.xl,
        marginBottom: SPACING.lg,
        borderLeftWidth: 6,
        // Sombra para iOS
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        // Sombra para Android
        elevation: 8,
    },
    
    cryptoHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.lg,
    },
    
    cryptoTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    
    cryptoIcon: {
        fontSize: FONT_SIZES.xxxl,
        marginRight: SPACING.md,
        fontWeight: 'bold',
    },
    
    cryptoName: {
        fontSize: FONT_SIZES.lg,
        fontWeight: 'bold',
        color: COLORS.textPrimary,
    },
    
    cryptoSymbol: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.textSecondary,
        marginTop: 2,
    },
    
    cryptoDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    
    cryptoPrice: {
        fontSize: FONT_SIZES.xl,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    
    changeContainer: {
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        borderRadius: RADIUS.sm,
    },
    
    changeText: {
        fontSize: SPACING.lg,
        fontWeight: 'bold',
    },
    });

    // Exportar también las constantes para uso en otros componentes si es necesario
    export const colors = COLORS;
    export const spacing = SPACING;
    export const fontSizes = FONT_SIZES;
    export const radius = RADIUS;

    export default styles;