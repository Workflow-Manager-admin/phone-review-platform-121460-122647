import React from "react";
import {useTheme} from "./Theme";
import {FiSearch, FiPlusCircle} from "react-icons/fi";

export const Header: React.FC<{
  onSearch: (value: string) => void;
  search: string;
  onOpenModal: () => void;
}> = ({onSearch, search, onOpenModal}) => {
  const theme = useTheme();
  return (
    <header
      style={{
        background: theme.primary,
        padding: "1.2rem 0.6rem",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
      }}>
      <div style={{fontWeight: 700, fontSize: 27, letterSpacing: 0.6}}>
        📱 Phone Review Platform
      </div>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        flex: 1,
        marginLeft: 32,
        maxWidth: 440,
      }}>
        <FiSearch size={22} />
        <input
          style={{
            flex: 1,
            fontSize: 17,
            border: "none",
            outline: "none",
            padding: "0.5em",
            borderRadius: 6,
            background: "#fff",
            color: "#111",
          }}
          type="search"
          value={search}
          placeholder="Search phones, authors..."
          onChange={e => onSearch(e.target.value)}
        />
      </div>
      <button
        style={{
          marginLeft: 32,
          background: theme.accent,
          color: "#fff",
          border: "none",
          padding: "0.7em 1.5em",
          borderRadius: 6,
          fontWeight: 600,
          fontSize: 16,
          boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={onOpenModal}
      >
        <FiPlusCircle size={22} style={{marginRight: 6}} />
        Add Review
      </button>
    </header>
  );
};
