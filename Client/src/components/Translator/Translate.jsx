// src/components/LanguageSwitcher.jsx
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLang = (lng) => {
    i18n.changeLanguage(lng);
  };

  const languages = [
    { code: "en", label: "English", flag: "🇺🇸" },
    { code: "fr", label: "Français", flag: "🇫🇷" },
    { code: "es", label: "Español", flag: "🇪🇸" },
    { code: "arabic", label: "العربية", flag: "🇸🇦" },
  ];

  const current =
    languages.find((l) => l.code === i18n.language) ?? languages[0];

    // Define styles for the dropdown and its items
  const styles = {
    dropdown: {
      fontWeight: "500",
    },

    toggle: {
      color: "#f8f9fa",
      textDecoration: "none",
    },

    menu: {
      backgroundColor: "#f0f0f0",
      border: "1px solid #ccc",
      borderRadius: "6px",
      boxShadow: "3px 3px 8px rgba(0, 0, 0, 0.15)",
      padding: "6px 0",
      minWidth: "180px",
      marginTop: "8px",
    },

    item: {
      color: "#333",
      fontSize: "0.95rem",
      padding: "8px 16px",
      transition: "all 0.2s ease",
      width: "100%",
      border: "none",
      backgroundColor: "transparent",
      textAlign: "left",
    },

    activeItem: {
      backgroundColor: "#198754",
      color: "white",
      fontWeight: "600",
    },

    check: {
      fontSize: "1.1em",
      color: "#c8f7c5",
    },
  };

  return (
    <div
      className="nav-item dropdown nav-item-animated"
      style={{
        ...styles.dropdown,
        animationDelay: "0.6s",
      }}
    >
      <a
        className="nav-link dropdown-toggle d-flex align-items-center gap-2"
        href="#"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        style={styles.toggle}
      >
        <span>{current.flag}</span>
        <span>{current.label}</span>
      </a>

      <ul
        className="dropdown-menu dropdown-menu-end"
        style={styles.menu}
      >
        {languages.map((lang) => {
          const isActive = i18n.language === lang.code;

          return (
            <li key={lang.code}>
              <button
                type="button"
                className="dropdown-item d-flex align-items-center gap-2"
                onClick={() => changeLang(lang.code)}
                style={{
                  ...styles.item,
                  ...(isActive ? styles.activeItem : {}),
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = "#316ac5";
                    e.currentTarget.style.color = "white";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "#333";
                  }
                }}
              >
                <span>{lang.flag}</span>

                <span>{lang.label}</span>

                {isActive && (
                  <i
                    className="bi bi-check2 ms-auto"
                    style={styles.check}
                  ></i>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}