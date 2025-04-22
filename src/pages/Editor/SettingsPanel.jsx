import React from 'react';
import { freeThemes, proThemes } from '../../resources/editorThemes';
import { dracula } from '@uiw/codemirror-themes-all';
import { freeFonts, proFonts } from '../../resources/Fonts';
import { useUser } from '@clerk/clerk-react';

function SettingsPanel({ theme, setTheme, language, setLanguage, fontSize, setFontSize, fontFamily, setFontFamily }) {
  const { user, isLoaded } = useUser();
  const isPro = isLoaded && user && (user.unsafeMetadata.plan === 'Pro' || user.unsafeMetadata.plan === 'Team');
  
  // Get all theme and font names, but we'll control which ones can be selected
  const allThemeNames = Object.keys({...freeThemes, ...proThemes});
  const allFontNames = [...freeFonts, ...proFonts];
  
  // Helper function to check if a theme is a pro theme
  const isProTheme = (name) => Object.keys(proThemes).includes(name);
  
  // Helper function to check if a font is a pro font
  const isProFont = (name) => proFonts.includes(name);
  
  const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' }
  ];

  const fontSizes = [10, 12, 14, 16, 18, 20, 24];

  // Helper function to get the current theme name
  const getCurrentThemeName = () => {
    const currentThemeName = Object.entries({...freeThemes, ...proThemes}).find(
      ([_, themeObj]) => themeObj === theme
    )?.[0] || 'Dracula';
    
    // If current theme is a pro theme but user is on free plan, reset to default
    if (!isPro && isProTheme(currentThemeName)) {
      // Reset to a free theme
      setTheme(freeThemes.Dracula || Object.values(freeThemes)[0]);
      return 'Dracula';
    }
    
    return currentThemeName;
  };

  // Handle theme change
  const handleThemeChange = (e) => {
    const selectedThemeName = e.target.value;
    
    // Prevent selecting pro themes for free users
    if (!isPro && isProTheme(selectedThemeName)) {
      return;
    }
    
    const selectedTheme = isPro 
      ? {...freeThemes, ...proThemes}[selectedThemeName]
      : freeThemes[selectedThemeName];
      
    if (selectedTheme) {
      setTheme(selectedTheme);
    } else {
      // Fallback to dracula if theme not found
      setTheme(dracula);
    }
  };

  // Handle font change
  const handleFontChange = (e) => {
    const selectedFont = e.target.value;
    
    // Prevent selecting pro fonts for free users
    if (!isPro && isProFont(selectedFont)) {
      return;
    }
    
    setFontFamily(selectedFont);
  };

  // Check if current font family is a pro font and user is on free plan
  React.useEffect(() => {
    if (!isPro && isProFont(fontFamily)) {
      setFontFamily(freeFonts[0] || 'monospace');
    }
  }, [isPro, fontFamily, setFontFamily]);

  return (
    <div>
      <h3 className="panel-title">Settings</h3>
      
      <div className="panel-section">
        <label className="panel-label">Theme</label>
        <select 
          className="panel-select"
          value={getCurrentThemeName()} 
          onChange={handleThemeChange}
        >
          {allThemeNames.map(name => (
            <option 
              key={name} 
              value={name}
              disabled={!isPro && isProTheme(name)}
            >
              {!isPro && isProTheme(name) ? `🔒 ${name} (Pro)` : name}
            </option>
          ))}
        </select>
        {!isPro && (
          <div className="pro-feature-lock">
            <span>Upgrade to Pro plan to unlock premium themes</span>
          </div>
        )}
      </div>

      <div className="panel-section">
        <label className="panel-label">Language</label>
        <select 
          className="panel-select"
          value={language} 
          onChange={(e) => setLanguage(e.target.value)}
        >
          {languages.map(lang => (
            <option key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>

      <div className="panel-section">
        <label className="panel-label">Font Size</label>
        <select 
          className="panel-select"
          value={fontSize} 
          onChange={(e) => setFontSize(Number(e.target.value))}
        >
          {fontSizes.map(size => (
            <option key={size} value={size}>
              {size}px
            </option>
          ))}
        </select>
      </div>

      <div className="panel-section">
        <label className="panel-label">Font Family</label>
        <select 
          className="panel-select"
          value={fontFamily} 
          onChange={handleFontChange}
        >
          {allFontNames.map((name) => (
            <option 
              key={name} 
              value={name}
              disabled={!isPro && isProFont(name)}
            >
              {!isPro && isProFont(name) ? `🔒 ${name} (Pro)` : name}
            </option>
          ))}
        </select>
        {!isPro && (
          <div className="pro-feature-lock">
            <span>Upgrade to Pro plan to unlock premium fonts</span>
          </div>
        )}
      </div>

      <button className="panel-button primary" onClick={() => setTheme(dracula)}>
        Reset Settings
      </button>
    </div>
  );
}

export default SettingsPanel; 