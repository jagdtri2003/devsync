import React, { useState } from 'react'
import { FaCopy, FaShare } from 'react-icons/fa'
import { socket } from '../../socket/socket'
import { useUser } from '@clerk/clerk-react'

function InviteUsers() {
  const [inviteLink, setInviteLink] = useState('')
  const [copied, setCopied] = useState(false)
  const [linkGenerated, setLinkGenerated] = useState(false);
  const {user} = useUser();

  const generateInviteLink = () => {
    if(linkGenerated){
      return;
    }
    // Generate a random string for the invite link
    const randomString = Math.random().toString(36).substring(2, 15) + 
                         Math.random().toString(36).substring(2, 15)
    const link = `${window.location.origin}/editor/shared/${randomString}`
    setInviteLink(link)
    setLinkGenerated(true)
    socket.emit("joinRoom",{roomId:randomString,user:user.username});
    sessionStorage.setItem("roomId",randomString);
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
    <div>
      <h3 className="panel-title">Invite Users</h3>
      
      <div className="panel-section">
        <p>Generate a link to invite others to collaborate on your code.</p>
        <button 
          className="panel-button primary"
          onClick={generateInviteLink}
        >
          Generate Invite Link
        </button>
      </div>
      
      {inviteLink && (
        <div className="panel-section">
          <div className="invite-link-container">
            <input
              type="text"
              className="panel-input"
              readOnly
              value={inviteLink}
            />
            <div className="invite-actions">
              <button 
                onClick={copyToClipboard}
                className="panel-button"
                title="Copy to clipboard"
              >
                <FaCopy /> Copy
              </button>
              <button 
                onClick={handleShare}
                className="panel-button"
                title="Share link"
              >
                <FaShare /> Share
              </button>
            </div>
          </div>
          
          <div className="panel-warning">
            <p>
              <strong>Warning:</strong> Anyone with this link can view and edit your code. Share it only with trusted collaborators.
            </p>
          </div>
        </div>
      )}
      
      {copied && (
        <div className="copy-notification">
          Link copied to clipboard!
        </div>
      )}
    </div>
  )
}

export default InviteUsers