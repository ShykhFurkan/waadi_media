'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setThemeState] = useState<Theme>('dark');
    const [mounted, setMounted] = useState(false);

    const updateDomTheme = (newTheme: Theme) => {
        if (typeof window === 'undefined') return;
        const root = document.documentElement;
        root.setAttribute('data-theme', newTheme);
        if (newTheme === 'dark') {
            root.classList.add('dark');
            root.classList.remove('light');
        } else {
            root.classList.remove('dark');
            root.classList.add('light');
        }
    };

    useEffect(() => {
        setMounted(true);
        const storedTheme = localStorage.getItem('waadi_theme') as Theme | null;
        const initialTheme = storedTheme === 'light' ? 'light' : 'dark';
        setThemeState(initialTheme);
        updateDomTheme(initialTheme);
    }, []);

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
        if (typeof window !== 'undefined') {
            localStorage.setItem('waadi_theme', newTheme);
        }
        updateDomTheme(newTheme);
    };

    const toggleTheme = () => {
        const nextTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(nextTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
