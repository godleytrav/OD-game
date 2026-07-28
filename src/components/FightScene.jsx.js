import React, { useState, useEffect } from 'react';

export const FightScene = ({ heroImage, onFightComplete }) => {
  const [heroHp, setHeroHp] = useState(100);
  const [monsterHp, setMonsterHp] = useState(100);
  const [battleLog, setBattleLog] = useState("A wild Format Friction appeared!");
  const [isFighting, setIsFighting] = useState(false);

  // Path to monster video & static image
  const monsterVideoSrc = "/images/videos/format_friction.mp4";
  const monsterImgSrc = "/images/monsters/format_friction.png"; // Fallback/Static asset if needed

  const startBattle = () => {
    setIsFighting(true);
    setBattleLog("Attacking Format Friction...");

    // Quick auto-battle animation sequence
    const interval = setInterval(() => {
      setMonsterHp((prev) => {
        if (prev <= 20) {
          clearInterval(interval);
          setBattleLog("Format Friction defeated!");
          setTimeout(() => {
            onFightComplete(); // Trigger transition to parallax / base page
          }, 1500);
          return 0;
        }
        return prev - 20;
      });
    }, 600);
  };

  return (
    <div style={styles.container}>
      {/* Background Boss Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={styles.bgVideo}
        src={monsterVideoSrc}
      />

      {/* Overlay Content */}
      <div style={styles.overlay}>
        <h1 style={styles.title}>BOSS BATTLE</h1>
        
        {/* Arena Stage */}
        <div style={styles.arena}>
          {/* Hero Side */}
          <div style={styles.fighterCard}>
            <h3>YOUR HERO</h3>
            <img src={heroImage} alt="Hero" style={styles.avatar} />
            <div style={styles.hpBarContainer}>
              <div style={{ ...styles.hpBarFill, width: `${heroHp}%`, backgroundColor: '#4CAF50' }} />
            </div>
            <p>HP: {heroHp}/100</p>
          </div>

          <div style={styles.vsText}>VS</div>

          {/* Monster Side */}
          <div style={styles.fighterCard}>
            <h3>FORMAT FRICTION</h3>
            <img src={monsterImgSrc} alt="Format Friction" style={styles.avatar} />
            <div style={styles.hpBarContainer}>
              <div style={{ ...styles.hpBarFill, width: `${monsterHp}%`, backgroundColor: '#E53935' }} />
            </div>
            <p>HP: {monsterHp}/100</p>
          </div>
        </div>

        {/* Action HUD */}
        <div style={styles.hud}>
          <p style={styles.log}>{battleLog}</p>
          {!isFighting ? (
            <button style={styles.fightButton} onClick={startBattle}>
              ATTACK! ⚔️
            </button>
          ) : (
            <button style={{ ...styles.fightButton, opacity: 0.6 }} disabled>
              FIGHTING...
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Quick Inline Styles (Replace with Tailwind or CSS Modules as needed)
const styles = {
  container: {
    position: 'relative',
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    fontFamily: 'sans-serif',
  },
  bgVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: 1,
  },
  overlay: {
    position: 'relative',
    zIndex: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    padding: '30px',
    borderRadius: '16px',
    textAlign: 'center',
    maxWidth: '800px',
    width: '90%',
  },
  title: { fontSize: '2.5rem', marginBottom: '20px', letterSpacing: '2px' },
  arena: { display: 'flex', justifyContent: 'space-around', alignItems: 'center', margin: '20px 0' },
  fighterCard: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
  avatar: { width: '140px', height: '140px', objectFit: 'contain', borderRadius: '12px', margin: '10px 0' },
  vsText: { fontSize: '2rem', fontWeight: 'bold', color: '#FFD700' },
  hpBarContainer: { width: '120px', height: '12px', backgroundColor: '#333', borderRadius: '6px', overflow: 'hidden' },
  hpBarFill: { height: '100%', transition: 'width 0.3s ease' },
  hud: { marginTop: '20px' },
  log: { fontSize: '1.2rem', marginBottom: '15px', minHeight: '1.5em' },
  fightButton: {
    padding: '12px 36px',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#FF5722',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  }
};