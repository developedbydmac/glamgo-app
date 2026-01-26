import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, Animated } from 'react-native';
import { useState, useEffect, useRef } from 'react';

const { width, height } = Dimensions.get('window');

export default function App() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Smooth entrance animation like Instagram
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Modern gradient background */}
      <View style={styles.backgroundGradient} />
      
      {/* Main animated content */}
      <Animated.View style={[
        styles.content,
        {
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        },
      ]}>
        
        {/* Bold Modern Logo */}
        <View style={styles.logoContainer}>
          {/* Outer glow ring */}
          <View style={styles.glowRing} />
          
          {/* Main logo circle */}
          <View style={styles.logoCircle}>
            {/* Crown integrated with GG */}
            <View style={styles.logoMark}>
              {/* Realistic crown with points */}
              <View style={styles.crownIcon}>
                <View style={styles.crownPoints}>
                  <View style={styles.crownPoint} />
                  <View style={[styles.crownPoint, styles.crownPointTall]} />
                  <View style={styles.crownPoint} />
                </View>
                <View style={styles.crownBand}>
                  <View style={styles.crownJewel} />
                  <View style={styles.crownJewel} />
                  <View style={styles.crownJewel} />
                </View>
              </View>
              
              {/* Single G directly below crown */}
              <Text style={styles.bigG}>G</Text>
            </View>
            
            {/* Three dots at bottom */}
            <View style={styles.dotRow}>
              <View style={styles.dot} />
              <View style={[styles.dot, styles.dotCenter]} />
              <View style={styles.dot} />
            </View>
          </View>
        </View>

        {/* Bold Brand Name */}
        <View style={styles.brandSection}>
          <Text style={styles.brandText}>GLAMGO</Text>
          <View style={styles.accentBar} />
        </View>

        {/* Tagline */}
        <Text style={styles.taglineText}>From Roots to Doorstep</Text>

      </Animated.View>

      {/* Modern progress indicators */}
      <View style={styles.progressBar}>
        <View style={[styles.progressDot, styles.progressActive]} />
        <View style={styles.progressDot} />
        <View style={styles.progressDot} />
        <View style={styles.progressDot} />
      </View>
      
      {/* Powered by footer */}
      <Text style={styles.poweredBy}>Powered by GLAMGO</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  backgroundGradient: {
    position: 'absolute',
    width: width,
    height: height,
    backgroundColor: '#4A2663',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 48,
    position: 'relative',
  },
  glowRing: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(201, 169, 97, 0.2)',
    borderWidth: 2,
    borderColor: 'rgba(201, 169, 97, 0.4)',
  },
  logoCircle: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 15,
    borderWidth: 3,
    borderColor: '#C9A961',
  },
  logoMark: {
    alignItems: 'center',
  },
  crownIcon: {
    alignItems: 'center',
    marginBottom: 4,
  },
  crownPoints: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 3,
    marginBottom: -1,
  },
  crownPoint: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 14,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#C9A961',
  },
  crownPointTall: {
    borderBottomWidth: 18,
    borderLeftWidth: 9,
    borderRightWidth: 9,
  },
  crownBand: {
    width: 70,
    height: 8,
    backgroundColor: '#C9A961',
    borderRadius: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
  },
  crownJewel: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#FFFFFF',
    shadowColor: '#C9A961',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
  },
  bigG: {
    fontSize: 54,
    fontWeight: '900',
    color: '#4A2663',
    letterSpacing: 0,
  },
  dotRow: {
    flexDirection: 'row',
    marginTop: 4,
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#C9A961',
  },
  dotCenter: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  brandSection: {
    alignItems: 'center',
  },
  brandText: {
    fontSize: 52,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 12,
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  accentBar: {
    width: 120,
    height: 3,
    backgroundColor: '#C9A961',
    borderRadius: 1.5,
    marginBottom: 20,
  },
  taglineText: {
    fontSize: 13,
    fontWeight: '300',
    color: 'rgba(255, 255, 255, 0.9)',
    letterSpacing: 3,
    textTransform: 'uppercase',
  },
  progressBar: {
    position: 'absolute',
    bottom: 100,
    flexDirection: 'row',
    gap: 10,
  },
  progressDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  progressActive: {
    backgroundColor: '#C9A961',
    width: 30,
    borderRadius: 5,
  },
  poweredBy: {
    position: 'absolute',
    bottom: 50,
    fontSize: 9,
    fontWeight: '300',
    color: 'rgba(255, 255, 255, 0.35)',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
});

