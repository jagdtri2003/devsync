import React from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";
import { LuFiles,LuMessagesSquare,LuUsers,LuPlay,LuSettings } from "react-icons/lu";
import { MdKeyboardBackspace } from "react-icons/md";

const Sidebar = ({ onSelect, selected }) => {
  const navigate = useNavigate();
  const items = [
    { name: "files", icon: <LuFiles /> },
    { name: "chat", icon: <LuMessagesSquare /> },
    { name: "users", icon: <LuUsers /> },
    { name: "run", icon: <LuPlay /> },
    { name: "settings", icon: <LuSettings /> },
  ];

  return (
    <div className="sidebar">
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",fontSize:"20px",fontWeight:"bold",padding:"10px",color:"#fff",marginBottom:"20px",cursor:"pointer"}}>
        <MdKeyboardBackspace title="Dashboard" onClick={() => navigate("/")} />
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
