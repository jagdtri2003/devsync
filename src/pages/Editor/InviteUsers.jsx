import React, { useState, useContext } from 'react'
import { FaCopy, FaShare } from 'react-icons/fa'
import { ThemeContext } from '../../App'

function InviteUsers() {
  const { theme } = useContext(ThemeContext)
  const [inviteLink, setInviteLink] = useState('')
  const [copied, setCopied] = useState(false)

  const generateInviteLink = () => {
    // Generate a random string for the invite link
    const randomString = Math.random().toString(36).substring(2, 15) + 
                         Math.random().toString(36).substring(2, 15)
    const link = `${window.location.origin}/editor/shared/${randomString}`
    setInviteLink(link)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(inviteLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Collaborate on code',
          text: 'Join me to collaborate on this code',
          url: inviteLink,
        })
      } catch (error) {
        console.error('Error sharing:', error)
      }
    } else {
      copyToClipboard()
    }
  }

  return (
    <div className={`invite-container ${theme}`} style={{ 
      maxWidth: '450px',
      margin: '0 auto',
      padding: '20px'
    }}>
      <div className="invite-card card" style={{
        padding: '20px',
      }}>
        <h2 style={{ marginBottom: '16px' }}>Invite Users</h2>
        
        <p style={{ marginBottom: '16px' }}>
          Generate a link to invite others to collaborate on your code.
        </p>
        
        <div style={{ marginBottom: '16px' }}>
          <button 
            className="btn btn-primary"
            onClick={generateInviteLink}
            style={{
              width: '100%'
            }}
          >
            Generate Invite Link
          </button>
        </div>
        
        {inviteLink && (
          <>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              marginBottom: '16px',
              padding: '10px',
              border: `1px solid ${theme === 'dark' ? 'var(--dark-border)' : 'var(--light-border)'}`,
              borderRadius: 'var(--border-radius)',
              backgroundColor: theme === 'dark' ? 'var(--dark-card-bg)' : 'var(--light-card-bg)'
            }}>
              <input
                type="text"
                readOnly
                value={inviteLink}
                style={{
                  flex: 1,
                  border: 'none',
                  padding: '4px',
                  outline: 'none',
                  fontSize: '14px',
                  backgroundColor: 'transparent',
                  color: theme === 'dark' ? 'var(--dark-text)' : 'var(--light-text)'
                }}
              />
              <button 
                onClick={copyToClipboard} 
                style={{
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  padding: '4px',
                  marginLeft: '8px',
                  color: 'var(--primary-color)'
                }}
                title="Copy to clipboard"
              >
                <FaCopy />
              </button>
              <button 
                onClick={handleShare} 
                style={{
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  padding: '4px',
                  marginLeft: '8px',
                  color: 'var(--primary-color)'
                }}
                title="Share link"
              >
                <FaShare />
              </button>
            </div>
            
            <div style={{
              backgroundColor: theme === 'dark' ? 'rgba(243, 156, 18, 0.2)' : 'var(--warning-color, #f39c12, 0.1)',
              color: theme === 'dark' ? '#f39c12' : '#856404',
              padding: '12px 16px',
              borderRadius: 'var(--border-radius)',
              marginBottom: '16px',
              border: `1px solid ${theme === 'dark' ? 'rgba(243, 156, 18, 0.3)' : 'rgba(243, 156, 18, 0.2)'}`
            }}>
              <p style={{ fontSize: '14px', margin: 0 }}>
                <strong>Warning:</strong> Anyone with this link can view and edit your code. Share it only with trusted collaborators.
              </p>
            </div>
          </>
        )}
      </div>
      
      {copied && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'var(--success-color)',
          color: 'white',
          padding: '10px 20px',
          borderRadius: 'var(--border-radius)',
          boxShadow: 'var(--shadow)',
          zIndex: 1000
        }}>
          Link copied to clipboard!
        </div>
      )}
    </div>
  )
}

export default InviteUsers