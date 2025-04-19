import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";
import { LuFiles, LuMessagesSquare, LuUsers, LuPlay, LuSettings } from "react-icons/lu";
import { MdKeyboardBackspace } from "react-icons/md";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { ThemeContext } from "../../App";

const Sidebar = ({ onSelect, selected }) => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  
  const items = [
    { name: "Files", icon: <LuFiles /> },
    { name: "Chat", icon: <LuMessagesSquare /> },
    { name: "Users", icon: <LuUsers /> },
    { name: "Run", icon: <LuPlay /> },
    { name: "Settings", icon: <LuSettings /> }, 
    { name: "Invite Users", icon: <AiOutlineUsergroupAdd /> },
  ];

  return (
    <div className={`sidebar ${theme}`}>
      <div 
        className="sidebar-icon" 
        title="Dashboard" 
        onClick={() => navigate("/")}
      >
        <MdKeyboardBackspace />
      </div>
      {items.map((item, index) => (
        <div
          key={index}
          className={`sidebar-icon ${selected === item.name ? "active" : ""}`}
          title={item.name.charAt(0).toUpperCase() + item.name.slice(1)}
          onClick={() => onSelect(item.name)}
        >
          {item.icon}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
