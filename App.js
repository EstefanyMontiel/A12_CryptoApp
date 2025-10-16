import React, { useState, useEffect, useCallback } from 'react';
import {
  Text,
  View,
  FlatList,
  RefreshControl,
  StatusBar,
  ActivityIndicator,
  Animated,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';

const CACHE_KEY = '@crypto_prices_cache';
const API_URL = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,dogecoin,solana&vs_currencies=usd&include_24hr_change=true';

const CRYPTO_INFO = {
  bitcoin: { name: 'Bitcoin', symbol: 'BTC', color: '#F7931A', icon: '₿' },
  ethereum: { name: 'Ethereum', symbol: 'ETH', color: '#627EEA', icon: 'Ξ' },
  dogecoin: { name: 'Dogecoin', symbol: 'DOGE', color: '#C2A633', icon: 'Ð' },
  solana: { name: 'Solana', symbol: 'SOL', color: '#14F195', icon: '◎' },
};

export default function App() {
  const [cryptoData, setCryptoData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [isOffline, setIsOffline] = useState(false);

  // Cargar datos desde caché
  const loadFromCache = async () => {
    try {
      const cachedData = await AsyncStorage.getItem(CACHE_KEY);
      if (cachedData) {
        const parsed = JSON.parse(cachedData);
        setCryptoData(parsed.data);
        setLastUpdate(new Date(parsed.timestamp));
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error loading cache:', err);
      return false;
    }
  };

  // Guardar datos en caché
  const saveToCache = async (data) => {
    try {
      const cacheObject = {
        data,
        timestamp: new Date().toISOString(),
      };
      await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(cacheObject));
    } catch (err) {
      console.error('Error saving cache:', err);
    }
  };

  // Fetch datos desde la API
  const fetchCryptoData = async (isBackgroundFetch = false) => {
    try {
      const response = await fetch(API_URL);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Transformar datos al formato deseado
      const formattedData = Object.keys(data).map(id => ({
        id,
        name: CRYPTO_INFO[id].name,
        symbol: CRYPTO_INFO[id].symbol,
        icon: CRYPTO_INFO[id].icon,
        color: CRYPTO_INFO[id].color,
        price: data[id].usd,
        change24h: data[id].usd_24h_change,
      }));

      setCryptoData(formattedData);
      setLastUpdate(new Date());
      setError(null);
      setIsOffline(false);
      
      // Guardar en caché
      await saveToCache(formattedData);
      
      return true;
    } catch (err) {
      console.error('Error fetching data:', err);
      
      if (!isBackgroundFetch) {
        setError(err.message);
      }
      
      setIsOffline(true);
      return false;
    }
  };

  // Cargar datos al iniciar la app
  useEffect(() => {
    const initializeApp = async () => {
      setIsLoading(true);
      
      // Primero cargar desde caché (instantáneo)
      const hasCache = await loadFromCache();
      
      if (hasCache) {
        setIsLoading(false);
        // Actualizar en segundo plano
        await fetchCryptoData(true);
      } else {
        // Si no hay caché, hacer fetch normal
        await fetchCryptoData(false);
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  // Pull to refresh
  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await fetchCryptoData(false);
    setIsRefreshing(false);
  }, []);

  // Renderizar cada item de crypto
  const renderCryptoItem = ({ item, index }) => {
    const isPositive = item.change24h >= 0;
    
    return (
      <Animated.View style={[styles.cryptoCard, { borderLeftColor: item.color }]}>
        <View style={styles.cryptoHeader}>
          <View style={styles.cryptoTitleContainer}>
            <Text style={[styles.cryptoIcon, { color: item.color }]}>
              {item.icon}
            </Text>
            <View>
              <Text style={styles.cryptoName}>{item.name}</Text>
              <Text style={styles.cryptoSymbol}>{item.symbol}</Text>
            </View>
          </View>
        </View>

        <View style={styles.cryptoDetails}>
          <Text style={styles.cryptoPrice}>
            ${item.price.toLocaleString('en-US', { 
              minimumFractionDigits: 2,
              maximumFractionDigits: 2 
            })}
          </Text>
          
          <View style={[
            styles.changeContainer,
            { backgroundColor: isPositive ? '#D4EDDA' : '#F8D7DA' }
          ]}>
            <Text style={[
              styles.changeText,
              { color: isPositive ? '#155724' : '#721C24' }
            ]}>
              {isPositive ? '▲' : '▼'} {Math.abs(item.change24h).toFixed(2)}%
            </Text>
          </View>
        </View>
      </Animated.View>
    );
  };

  // Renderizar header
  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.title}>CryptoApp</Text>
      
      {isOffline && (
        <View style={styles.offlineBanner}>
          <Text style={styles.offlineText}>
          Modo Offline - Mostrando datos en caché
          </Text>
        </View>
      )}
      
      {lastUpdate && (
        <Text style={styles.lastUpdate}>
          Última actualización: {lastUpdate.toLocaleTimeString('es-ES')}
        </Text>
      )}
      
      {error && !isOffline && (
        <View style={styles.errorBanner}>
          <Text style={styles.errorText}> Error: {error}</Text>
          <Text style={styles.errorSubtext}>
            Mostrando últimos datos guardados
          </Text>
        </View>
      )}
    </View>
  );

  // Pantalla de carga inicial
  if (isLoading && cryptoData.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />
        <ActivityIndicator size="large" color="#4ECDC4" />
        <Text style={styles.loadingText}>Cargando precios...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />
      
      <FlatList
        data={cryptoData}
        renderItem={renderCryptoItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            colors={['#4ECDC4']}
            tintColor="#4ECDC4"
            title="Actualizando precios..."
            titleColor="#4ECDC4"
          />
        }
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}