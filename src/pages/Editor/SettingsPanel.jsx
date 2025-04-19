import React from 'react';
import { freeThemes, proThemes } from '../../resources/editorThemes';
import { dracula } from '@uiw/codemirror-themes-all';
import { useUser } from '@clerk/clerk-react';
import { freeFonts, proFonts } from '../../resources/Fonts';

function SettingsPanel({ theme, setTheme, language, setLanguage, fontSize, setFontSize, fontFamily, setFontFamily }) {
  // For displaying theme names
  const themeNames = Object.keys({...freeThemes, ...proThemes});
  const { user } = useUser();
  
  const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' }
  ];

  const fontSizes = [10, 12, 14, 16, 18, 20, 24];

  // Helper function to get the current theme name
  const getCurrentThemeName = () => {
    return Object.entries({...freeThemes, ...proThemes}).find(
      ([_, themeObj]) => themeObj === theme
    )?.[0] || 'Dracula';
  };

  // Handle theme change
  const handleThemeChange = (e) => {
    const selectedThemeName = e.target.value;
    const selectedTheme = {...freeThemes, ...proThemes}[selectedThemeName];
    if (selectedTheme) {
      setTheme(selectedTheme);
    } else {
      // Fallback to dracula if theme not found
      setTheme(dracula);
    }
  };

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
          {themeNames.map(name => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
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
          onChange={(e) => setFontFamily(e.target.value)}
        >
          {Object.entries({...freeFonts, ...proFonts}).map(([name, value]) => (
            <option key={name} value={value}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <button className="panel-button primary" onClick={() => setTheme(dracula)}>
        Reset Settings
      </button>
    </div>
  );
}

export default SettingsPanel; 