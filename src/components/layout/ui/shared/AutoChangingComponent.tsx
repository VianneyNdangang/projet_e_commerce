import { Box } from "@chakra-ui/react";
import { useState, useEffect, type ReactNode } from "react";

const initialItems = [
  { id: 1, text: "Premier", color: "tomato" },
  { id: 2, text: "Deuxième", color: "skyblue" },
  { id: 3, text: "Troisième", color: "lightgreen" },
];

export const  DynamicCards = (Children: ReactNode) => {
  const [items, setItems] = useState(initialItems);

  // Changer chaque carte toutes les 3 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setItems((prev) =>
        prev.map((item) => ({
          ...item,
          color: getRandomColor(), // change la couleur
          text: getRandomText(),   // change le texte
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      {items.map((item) => (
        <Box
          style={{
            background: item.color,
            color: "white",
            padding: "20px",
            borderRadius: "8px",
            minWidth: "100px",
            textAlign: "center",
            transition: "0.5s",
          }}
        >
          {Children}
        </Box>
      ))}
    </div>
  );
}

// 🔧 Fonctions utilitaires
function getRandomColor() {
  const colors = ["tomato", "skyblue", "lightgreen", "gold", "violet"];
  return colors[Math.floor(Math.random() * colors.length)];
}

function getRandomText() {
  const texts = ["Bonjour 👋", "Salut 🌞", "Coucou 💫", "Yo 🚀", "Hey 🎉"];
  return texts[Math.floor(Math.random() * texts.length)];
}
